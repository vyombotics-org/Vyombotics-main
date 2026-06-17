var limiter = {};
var tokenBucket;
var hasRequiredTokenBucket;
function requireTokenBucket() {
  if (hasRequiredTokenBucket) return tokenBucket;
  hasRequiredTokenBucket = 1;
  var TokenBucket = function(bucketSize, tokensPerInterval, interval, parentBucket) {
    this.bucketSize = bucketSize;
    this.tokensPerInterval = tokensPerInterval;
    if (typeof interval === "string") {
      switch (interval) {
        case "sec":
        case "second":
          this.interval = 1e3;
          break;
        case "min":
        case "minute":
          this.interval = 1e3 * 60;
          break;
        case "hr":
        case "hour":
          this.interval = 1e3 * 60 * 60;
          break;
        case "day":
          this.interval = 1e3 * 60 * 60 * 24;
          break;
        default:
          throw new Error("Invaid interval " + interval);
      }
    } else {
      this.interval = interval;
    }
    this.parentBucket = parentBucket;
    this.content = 0;
    this.lastDrip = +/* @__PURE__ */ new Date();
  };
  TokenBucket.prototype = {
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1e3,
    parentBucket: null,
    content: 0,
    lastDrip: 0,
    /**
     * Remove the requested number of tokens and fire the given callback. If the
     * bucket (and any parent buckets) contains enough tokens this will happen
     * immediately. Otherwise, the removal and callback will happen when enough
     * tokens become available.
     * @param {Number} count The number of tokens to remove.
     * @param {Function} callback(err, remainingTokens)
     * @returns {Boolean} True if the callback was fired immediately, otherwise
     *  false.
     */
    removeTokens: function(count, callback) {
      var self = this;
      if (!this.bucketSize) {
        process.nextTick(callback.bind(null, null, count, Number.POSITIVE_INFINITY));
        return true;
      }
      if (count > this.bucketSize) {
        process.nextTick(callback.bind(null, "Requested tokens " + count + " exceeds bucket size " + this.bucketSize, null));
        return false;
      }
      this.drip();
      if (count > this.content)
        return comeBackLater();
      if (this.parentBucket) {
        return this.parentBucket.removeTokens(count, function(err, remainingTokens) {
          if (err) return callback(err, null);
          if (count > self.content)
            return comeBackLater();
          self.content -= count;
          callback(null, Math.min(remainingTokens, self.content));
        });
      } else {
        this.content -= count;
        process.nextTick(callback.bind(null, null, this.content));
        return true;
      }
      function comeBackLater() {
        var waitInterval = Math.ceil(
          (count - self.content) * (self.interval / self.tokensPerInterval)
        );
        setTimeout(function() {
          self.removeTokens(count, callback);
        }, waitInterval);
        return false;
      }
    },
    /**
     * Attempt to remove the requested number of tokens and return immediately.
     * If the bucket (and any parent buckets) contains enough tokens this will
     * return true, otherwise false is returned.
     * @param {Number} count The number of tokens to remove.
     * @param {Boolean} True if the tokens were successfully removed, otherwise
     *  false.
     */
    tryRemoveTokens: function(count) {
      if (!this.bucketSize)
        return true;
      if (count > this.bucketSize)
        return false;
      this.drip();
      if (count > this.content)
        return false;
      if (this.parentBucket && !this.parentBucket.tryRemoveTokens(count))
        return false;
      this.content -= count;
      return true;
    },
    /**
     * Add any new tokens to the bucket since the last drip.
     * @returns {Boolean} True if new tokens were added, otherwise false.
     */
    drip: function() {
      if (!this.tokensPerInterval) {
        this.content = this.bucketSize;
        return;
      }
      var now = +/* @__PURE__ */ new Date();
      var deltaMS = Math.max(now - this.lastDrip, 0);
      this.lastDrip = now;
      var dripAmount = deltaMS * (this.tokensPerInterval / this.interval);
      this.content = Math.min(this.content + dripAmount, this.bucketSize);
    }
  };
  tokenBucket = TokenBucket;
  return tokenBucket;
}
var clock;
var hasRequiredClock;
function requireClock() {
  if (hasRequiredClock) return clock;
  hasRequiredClock = 1;
  var getMilliseconds = function() {
    if (typeof process !== "undefined" && process.hrtime) {
      var hrtime = process.hrtime();
      var seconds = hrtime[0];
      var nanoseconds = hrtime[1];
      return seconds * 1e3 + Math.floor(nanoseconds / 1e6);
    }
    return (/* @__PURE__ */ new Date()).getTime();
  };
  clock = getMilliseconds;
  return clock;
}
var rateLimiter;
var hasRequiredRateLimiter;
function requireRateLimiter() {
  if (hasRequiredRateLimiter) return rateLimiter;
  hasRequiredRateLimiter = 1;
  var TokenBucket = requireTokenBucket();
  var getMilliseconds = requireClock();
  var RateLimiter = function(tokensPerInterval, interval, fireImmediately) {
    this.tokenBucket = new TokenBucket(
      tokensPerInterval,
      tokensPerInterval,
      interval,
      null
    );
    this.tokenBucket.content = tokensPerInterval;
    this.curIntervalStart = getMilliseconds();
    this.tokensThisInterval = 0;
    this.fireImmediately = fireImmediately;
  };
  RateLimiter.prototype = {
    tokenBucket: null,
    curIntervalStart: 0,
    tokensThisInterval: 0,
    fireImmediately: false,
    /**
     * Remove the requested number of tokens and fire the given callback. If the
     * rate limiter contains enough tokens and we haven't spent too many tokens
     * in this interval already, this will happen immediately. Otherwise, the
     * removal and callback will happen when enough tokens become available.
     * @param {Number} count The number of tokens to remove.
     * @param {Function} callback(err, remainingTokens)
     * @returns {Boolean} True if the callback was fired immediately, otherwise
     *  false.
     */
    removeTokens: function(count, callback) {
      if (count > this.tokenBucket.bucketSize) {
        process.nextTick(callback.bind(
          null,
          "Requested tokens " + count + " exceeds maximum tokens per interval " + this.tokenBucket.bucketSize,
          null
        ));
        return false;
      }
      var self = this;
      var now = getMilliseconds();
      if (now < this.curIntervalStart || now - this.curIntervalStart >= this.tokenBucket.interval) {
        this.curIntervalStart = now;
        this.tokensThisInterval = 0;
      }
      if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) {
        if (this.fireImmediately) {
          process.nextTick(callback.bind(null, null, -1));
        } else {
          var waitInterval = Math.ceil(
            this.curIntervalStart + this.tokenBucket.interval - now
          );
          setTimeout(function() {
            self.tokenBucket.removeTokens(count, afterTokensRemoved);
          }, waitInterval);
        }
        return false;
      }
      return this.tokenBucket.removeTokens(count, afterTokensRemoved);
      function afterTokensRemoved(err, tokensRemaining) {
        if (err) return callback(err, null);
        self.tokensThisInterval += count;
        callback(null, tokensRemaining);
      }
    },
    /**
     * Attempt to remove the requested number of tokens and return immediately.
     * If the bucket (and any parent buckets) contains enough tokens and we
     * haven't spent too many tokens in this interval already, this will return
     * true. Otherwise, false is returned.
     * @param {Number} count The number of tokens to remove.
     * @param {Boolean} True if the tokens were successfully removed, otherwise
     *  false.
     */
    tryRemoveTokens: function(count) {
      if (count > this.tokenBucket.bucketSize)
        return false;
      var now = getMilliseconds();
      if (now < this.curIntervalStart || now - this.curIntervalStart >= this.tokenBucket.interval) {
        this.curIntervalStart = now;
        this.tokensThisInterval = 0;
      }
      if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval)
        return false;
      var removed = this.tokenBucket.tryRemoveTokens(count);
      if (removed) {
        this.tokensThisInterval += count;
      }
      return removed;
    },
    /**
     * Returns the number of tokens remaining in the TokenBucket.
     * @returns {Number} The number of tokens remaining.
     */
    getTokensRemaining: function() {
      this.tokenBucket.drip();
      return this.tokenBucket.content;
    }
  };
  rateLimiter = RateLimiter;
  return rateLimiter;
}
var hasRequiredLimiter;
function requireLimiter() {
  if (hasRequiredLimiter) return limiter;
  hasRequiredLimiter = 1;
  limiter.RateLimiter = requireRateLimiter();
  limiter.TokenBucket = requireTokenBucket();
  return limiter;
}
export {
  requireLimiter as r
};
