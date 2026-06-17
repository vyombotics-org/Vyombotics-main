import { b as getAugmentedNamespace } from "./react.mjs";
var extendStatics = function(e, r) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e2, r2) {
    e2.__proto__ = r2;
  } || function(e2, r2) {
    for (var t in r2) if (Object.prototype.hasOwnProperty.call(r2, t)) e2[t] = r2[t];
  };
  return extendStatics(e, r);
};
function __extends(e, r) {
  if (typeof r !== "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  extendStatics(e, r);
  function __() {
    this.constructor = e;
  }
  e.prototype = r === null ? Object.create(r) : (__.prototype = r.prototype, new __());
}
function __generator(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (s[0] & 1) throw s[1];
      return s[1];
    },
    trys: [],
    ops: []
  }, i, n, s, h;
  return h = {
    next: verb(0),
    throw: verb(1),
    return: verb(2)
  }, typeof Symbol === "function" && (h[Symbol.iterator] = function() {
    return this;
  }), h;
  function verb(e2) {
    return function(r2) {
      return step([e2, r2]);
    };
  }
  function step(a) {
    if (i) throw new TypeError("Generator is already executing.");
    while (h && (h = 0, a[0] && (t = 0)), t) try {
      if (i = 1, n && (s = a[0] & 2 ? n["return"] : a[0] ? n["throw"] || ((s = n["return"]) && s.call(n), 0) : n.next) && !(s = s.call(n, a[1])).done) return s;
      if (n = 0, s) a = [a[0] & 2, s.value];
      switch (a[0]) {
        case 0:
        case 1:
          s = a;
          break;
        case 4:
          t.label++;
          return {
            value: a[1],
            done: false
          };
        case 5:
          t.label++;
          n = a[1];
          a = [0];
          continue;
        case 7:
          a = t.ops.pop();
          t.trys.pop();
          continue;
        default:
          if (!(s = t.trys, s = s.length > 0 && s[s.length - 1]) && (a[0] === 6 || a[0] === 2)) {
            t = 0;
            continue;
          }
          if (a[0] === 3 && (!s || a[1] > s[0] && a[1] < s[3])) {
            t.label = a[1];
            break;
          }
          if (a[0] === 6 && t.label < s[1]) {
            t.label = s[1];
            s = a;
            break;
          }
          if (s && t.label < s[2]) {
            t.label = s[2];
            t.ops.push(a);
            break;
          }
          if (s[2]) t.ops.pop();
          t.trys.pop();
          continue;
      }
      a = r.call(e, t);
    } catch (e2) {
      a = [6, e2];
      n = 0;
    } finally {
      i = s = 0;
    }
    if (a[0] & 5) throw a[1];
    return {
      value: a[0] ? a[1] : void 0,
      done: true
    };
  }
}
typeof SuppressedError === "function" ? SuppressedError : function(e, r, t) {
  var i = new Error(t);
  return i.name = "SuppressedError", i.error = e, i.suppressed = r, i;
};
var TreeNode = (function() {
  function TreeNode2(e, r, t) {
    if (t === void 0) {
      t = 1;
    }
    this.t = void 0;
    this.i = void 0;
    this.h = void 0;
    this.u = e;
    this.o = r;
    this.l = t;
  }
  TreeNode2.prototype.v = function() {
    var e = this;
    var r = e.h.h === e;
    if (r && e.l === 1) {
      e = e.i;
    } else if (e.t) {
      e = e.t;
      while (e.i) {
        e = e.i;
      }
    } else {
      if (r) {
        return e.h;
      }
      var t = e.h;
      while (t.t === e) {
        e = t;
        t = e.h;
      }
      e = t;
    }
    return e;
  };
  TreeNode2.prototype.p = function() {
    var e = this;
    if (e.i) {
      e = e.i;
      while (e.t) {
        e = e.t;
      }
      return e;
    } else {
      var r = e.h;
      while (r.i === e) {
        e = r;
        r = e.h;
      }
      if (e.i !== r) {
        return r;
      } else return e;
    }
  };
  TreeNode2.prototype.T = function() {
    var e = this.h;
    var r = this.i;
    var t = r.t;
    if (e.h === this) e.h = r;
    else if (e.t === this) e.t = r;
    else e.i = r;
    r.h = e;
    r.t = this;
    this.h = r;
    this.i = t;
    if (t) t.h = this;
    return r;
  };
  TreeNode2.prototype.I = function() {
    var e = this.h;
    var r = this.t;
    var t = r.i;
    if (e.h === this) e.h = r;
    else if (e.t === this) e.t = r;
    else e.i = r;
    r.h = e;
    r.i = this;
    this.h = r;
    this.t = t;
    if (t) t.h = this;
    return r;
  };
  return TreeNode2;
})();
var TreeNodeEnableIndex = (function(e) {
  __extends(TreeNodeEnableIndex2, e);
  function TreeNodeEnableIndex2() {
    var r = e !== null && e.apply(this, arguments) || this;
    r.O = 1;
    return r;
  }
  TreeNodeEnableIndex2.prototype.T = function() {
    var r = e.prototype.T.call(this);
    this.M();
    r.M();
    return r;
  };
  TreeNodeEnableIndex2.prototype.I = function() {
    var r = e.prototype.I.call(this);
    this.M();
    r.M();
    return r;
  };
  TreeNodeEnableIndex2.prototype.M = function() {
    this.O = 1;
    if (this.t) {
      this.O += this.t.O;
    }
    if (this.i) {
      this.O += this.i.O;
    }
  };
  return TreeNodeEnableIndex2;
})(TreeNode);
var ContainerIterator = (function() {
  function ContainerIterator2(e) {
    if (e === void 0) {
      e = 0;
    }
    this.iteratorType = e;
  }
  ContainerIterator2.prototype.equals = function(e) {
    return this.C === e.C;
  };
  return ContainerIterator2;
})();
var Base = (function() {
  function Base2() {
    this._ = 0;
  }
  Object.defineProperty(Base2.prototype, "length", {
    get: function() {
      return this._;
    },
    enumerable: false,
    configurable: true
  });
  Base2.prototype.size = function() {
    return this._;
  };
  Base2.prototype.empty = function() {
    return this._ === 0;
  };
  return Base2;
})();
var Container = (function(e) {
  __extends(Container2, e);
  function Container2() {
    return e !== null && e.apply(this, arguments) || this;
  }
  return Container2;
})(Base);
function throwIteratorAccessError() {
  throw new RangeError("Iterator access denied!");
}
var TreeContainer = (function(e) {
  __extends(TreeContainer2, e);
  function TreeContainer2(r, t) {
    if (r === void 0) {
      r = function(e2, r2) {
        if (e2 < r2) return -1;
        if (e2 > r2) return 1;
        return 0;
      };
    }
    if (t === void 0) {
      t = false;
    }
    var i = e.call(this) || this;
    i.N = void 0;
    i.g = r;
    i.enableIndex = t;
    i.S = t ? TreeNodeEnableIndex : TreeNode;
    i.A = new i.S();
    return i;
  }
  TreeContainer2.prototype.m = function(e2, r) {
    var t = this.A;
    while (e2) {
      var i = this.g(e2.u, r);
      if (i < 0) {
        e2 = e2.i;
      } else if (i > 0) {
        t = e2;
        e2 = e2.t;
      } else return e2;
    }
    return t;
  };
  TreeContainer2.prototype.B = function(e2, r) {
    var t = this.A;
    while (e2) {
      var i = this.g(e2.u, r);
      if (i <= 0) {
        e2 = e2.i;
      } else {
        t = e2;
        e2 = e2.t;
      }
    }
    return t;
  };
  TreeContainer2.prototype.j = function(e2, r) {
    var t = this.A;
    while (e2) {
      var i = this.g(e2.u, r);
      if (i < 0) {
        t = e2;
        e2 = e2.i;
      } else if (i > 0) {
        e2 = e2.t;
      } else return e2;
    }
    return t;
  };
  TreeContainer2.prototype.k = function(e2, r) {
    var t = this.A;
    while (e2) {
      var i = this.g(e2.u, r);
      if (i < 0) {
        t = e2;
        e2 = e2.i;
      } else {
        e2 = e2.t;
      }
    }
    return t;
  };
  TreeContainer2.prototype.R = function(e2) {
    while (true) {
      var r = e2.h;
      if (r === this.A) return;
      if (e2.l === 1) {
        e2.l = 0;
        return;
      }
      if (e2 === r.t) {
        var t = r.i;
        if (t.l === 1) {
          t.l = 0;
          r.l = 1;
          if (r === this.N) {
            this.N = r.T();
          } else r.T();
        } else {
          if (t.i && t.i.l === 1) {
            t.l = r.l;
            r.l = 0;
            t.i.l = 0;
            if (r === this.N) {
              this.N = r.T();
            } else r.T();
            return;
          } else if (t.t && t.t.l === 1) {
            t.l = 1;
            t.t.l = 0;
            t.I();
          } else {
            t.l = 1;
            e2 = r;
          }
        }
      } else {
        var t = r.t;
        if (t.l === 1) {
          t.l = 0;
          r.l = 1;
          if (r === this.N) {
            this.N = r.I();
          } else r.I();
        } else {
          if (t.t && t.t.l === 1) {
            t.l = r.l;
            r.l = 0;
            t.t.l = 0;
            if (r === this.N) {
              this.N = r.I();
            } else r.I();
            return;
          } else if (t.i && t.i.l === 1) {
            t.l = 1;
            t.i.l = 0;
            t.T();
          } else {
            t.l = 1;
            e2 = r;
          }
        }
      }
    }
  };
  TreeContainer2.prototype.G = function(e2) {
    if (this._ === 1) {
      this.clear();
      return;
    }
    var r = e2;
    while (r.t || r.i) {
      if (r.i) {
        r = r.i;
        while (r.t) r = r.t;
      } else {
        r = r.t;
      }
      var t = e2.u;
      e2.u = r.u;
      r.u = t;
      var i = e2.o;
      e2.o = r.o;
      r.o = i;
      e2 = r;
    }
    if (this.A.t === r) {
      this.A.t = r.h;
    } else if (this.A.i === r) {
      this.A.i = r.h;
    }
    this.R(r);
    var n = r.h;
    if (r === n.t) {
      n.t = void 0;
    } else n.i = void 0;
    this._ -= 1;
    this.N.l = 0;
    if (this.enableIndex) {
      while (n !== this.A) {
        n.O -= 1;
        n = n.h;
      }
    }
  };
  TreeContainer2.prototype.P = function(e2) {
    var r = typeof e2 === "number" ? e2 : void 0;
    var t = typeof e2 === "function" ? e2 : void 0;
    var i = typeof e2 === "undefined" ? [] : void 0;
    var n = 0;
    var s = this.N;
    var h = [];
    while (h.length || s) {
      if (s) {
        h.push(s);
        s = s.t;
      } else {
        s = h.pop();
        if (n === r) return s;
        i && i.push(s);
        t && t(s, n, this);
        n += 1;
        s = s.i;
      }
    }
    return i;
  };
  TreeContainer2.prototype.q = function(e2) {
    while (true) {
      var r = e2.h;
      if (r.l === 0) return;
      var t = r.h;
      if (r === t.t) {
        var i = t.i;
        if (i && i.l === 1) {
          i.l = r.l = 0;
          if (t === this.N) return;
          t.l = 1;
          e2 = t;
          continue;
        } else if (e2 === r.i) {
          e2.l = 0;
          if (e2.t) {
            e2.t.h = r;
          }
          if (e2.i) {
            e2.i.h = t;
          }
          r.i = e2.t;
          t.t = e2.i;
          e2.t = r;
          e2.i = t;
          if (t === this.N) {
            this.N = e2;
            this.A.h = e2;
          } else {
            var n = t.h;
            if (n.t === t) {
              n.t = e2;
            } else n.i = e2;
          }
          e2.h = t.h;
          r.h = e2;
          t.h = e2;
          t.l = 1;
        } else {
          r.l = 0;
          if (t === this.N) {
            this.N = t.I();
          } else t.I();
          t.l = 1;
          return;
        }
      } else {
        var i = t.t;
        if (i && i.l === 1) {
          i.l = r.l = 0;
          if (t === this.N) return;
          t.l = 1;
          e2 = t;
          continue;
        } else if (e2 === r.t) {
          e2.l = 0;
          if (e2.t) {
            e2.t.h = t;
          }
          if (e2.i) {
            e2.i.h = r;
          }
          t.i = e2.t;
          r.t = e2.i;
          e2.t = t;
          e2.i = r;
          if (t === this.N) {
            this.N = e2;
            this.A.h = e2;
          } else {
            var n = t.h;
            if (n.t === t) {
              n.t = e2;
            } else n.i = e2;
          }
          e2.h = t.h;
          r.h = e2;
          t.h = e2;
          t.l = 1;
        } else {
          r.l = 0;
          if (t === this.N) {
            this.N = t.T();
          } else t.T();
          t.l = 1;
          return;
        }
      }
      if (this.enableIndex) {
        r.M();
        t.M();
        e2.M();
      }
      return;
    }
  };
  TreeContainer2.prototype.D = function(e2, r, t) {
    if (this.N === void 0) {
      this._ += 1;
      this.N = new this.S(e2, r, 0);
      this.N.h = this.A;
      this.A.h = this.A.t = this.A.i = this.N;
      return this._;
    }
    var i;
    var n = this.A.t;
    var s = this.g(n.u, e2);
    if (s === 0) {
      n.o = r;
      return this._;
    } else if (s > 0) {
      n.t = new this.S(e2, r);
      n.t.h = n;
      i = n.t;
      this.A.t = i;
    } else {
      var h = this.A.i;
      var a = this.g(h.u, e2);
      if (a === 0) {
        h.o = r;
        return this._;
      } else if (a < 0) {
        h.i = new this.S(e2, r);
        h.i.h = h;
        i = h.i;
        this.A.i = i;
      } else {
        if (t !== void 0) {
          var u = t.C;
          if (u !== this.A) {
            var f = this.g(u.u, e2);
            if (f === 0) {
              u.o = r;
              return this._;
            } else if (f > 0) {
              var o = u.v();
              var d = this.g(o.u, e2);
              if (d === 0) {
                o.o = r;
                return this._;
              } else if (d < 0) {
                i = new this.S(e2, r);
                if (o.i === void 0) {
                  o.i = i;
                  i.h = o;
                } else {
                  u.t = i;
                  i.h = u;
                }
              }
            }
          }
        }
        if (i === void 0) {
          i = this.N;
          while (true) {
            var c = this.g(i.u, e2);
            if (c > 0) {
              if (i.t === void 0) {
                i.t = new this.S(e2, r);
                i.t.h = i;
                i = i.t;
                break;
              }
              i = i.t;
            } else if (c < 0) {
              if (i.i === void 0) {
                i.i = new this.S(e2, r);
                i.i.h = i;
                i = i.i;
                break;
              }
              i = i.i;
            } else {
              i.o = r;
              return this._;
            }
          }
        }
      }
    }
    if (this.enableIndex) {
      var l = i.h;
      while (l !== this.A) {
        l.O += 1;
        l = l.h;
      }
    }
    this.q(i);
    this._ += 1;
    return this._;
  };
  TreeContainer2.prototype.F = function(e2, r) {
    while (e2) {
      var t = this.g(e2.u, r);
      if (t < 0) {
        e2 = e2.i;
      } else if (t > 0) {
        e2 = e2.t;
      } else return e2;
    }
    return e2 || this.A;
  };
  TreeContainer2.prototype.clear = function() {
    this._ = 0;
    this.N = void 0;
    this.A.h = void 0;
    this.A.t = this.A.i = void 0;
  };
  TreeContainer2.prototype.updateKeyByIterator = function(e2, r) {
    var t = e2.C;
    if (t === this.A) {
      throwIteratorAccessError();
    }
    if (this._ === 1) {
      t.u = r;
      return true;
    }
    var i = t.p().u;
    if (t === this.A.t) {
      if (this.g(i, r) > 0) {
        t.u = r;
        return true;
      }
      return false;
    }
    var n = t.v().u;
    if (t === this.A.i) {
      if (this.g(n, r) < 0) {
        t.u = r;
        return true;
      }
      return false;
    }
    if (this.g(n, r) >= 0 || this.g(i, r) <= 0) return false;
    t.u = r;
    return true;
  };
  TreeContainer2.prototype.eraseElementByPos = function(e2) {
    if (e2 < 0 || e2 > this._ - 1) {
      throw new RangeError();
    }
    var r = this.P(e2);
    this.G(r);
    return this._;
  };
  TreeContainer2.prototype.eraseElementByKey = function(e2) {
    if (this._ === 0) return false;
    var r = this.F(this.N, e2);
    if (r === this.A) return false;
    this.G(r);
    return true;
  };
  TreeContainer2.prototype.eraseElementByIterator = function(e2) {
    var r = e2.C;
    if (r === this.A) {
      throwIteratorAccessError();
    }
    var t = r.i === void 0;
    var i = e2.iteratorType === 0;
    if (i) {
      if (t) e2.next();
    } else {
      if (!t || r.t === void 0) e2.next();
    }
    this.G(r);
    return e2;
  };
  TreeContainer2.prototype.getHeight = function() {
    if (this._ === 0) return 0;
    function traversal(e2) {
      if (!e2) return 0;
      return Math.max(traversal(e2.t), traversal(e2.i)) + 1;
    }
    return traversal(this.N);
  };
  return TreeContainer2;
})(Container);
var TreeIterator = (function(e) {
  __extends(TreeIterator2, e);
  function TreeIterator2(r, t, i) {
    var n = e.call(this, i) || this;
    n.C = r;
    n.A = t;
    if (n.iteratorType === 0) {
      n.pre = function() {
        if (this.C === this.A.t) {
          throwIteratorAccessError();
        }
        this.C = this.C.v();
        return this;
      };
      n.next = function() {
        if (this.C === this.A) {
          throwIteratorAccessError();
        }
        this.C = this.C.p();
        return this;
      };
    } else {
      n.pre = function() {
        if (this.C === this.A.i) {
          throwIteratorAccessError();
        }
        this.C = this.C.p();
        return this;
      };
      n.next = function() {
        if (this.C === this.A) {
          throwIteratorAccessError();
        }
        this.C = this.C.v();
        return this;
      };
    }
    return n;
  }
  Object.defineProperty(TreeIterator2.prototype, "index", {
    get: function() {
      var e2 = this.C;
      var r = this.A.h;
      if (e2 === this.A) {
        if (r) {
          return r.O - 1;
        }
        return 0;
      }
      var t = 0;
      if (e2.t) {
        t += e2.t.O;
      }
      while (e2 !== r) {
        var i = e2.h;
        if (e2 === i.i) {
          t += 1;
          if (i.t) {
            t += i.t.O;
          }
        }
        e2 = i;
      }
      return t;
    },
    enumerable: false,
    configurable: true
  });
  TreeIterator2.prototype.isAccessible = function() {
    return this.C !== this.A;
  };
  return TreeIterator2;
})(ContainerIterator);
var OrderedMapIterator = (function(e) {
  __extends(OrderedMapIterator2, e);
  function OrderedMapIterator2(r, t, i, n) {
    var s = e.call(this, r, t, n) || this;
    s.container = i;
    return s;
  }
  Object.defineProperty(OrderedMapIterator2.prototype, "pointer", {
    get: function() {
      if (this.C === this.A) {
        throwIteratorAccessError();
      }
      var e2 = this;
      return new Proxy([], {
        get: function(r, t) {
          if (t === "0") return e2.C.u;
          else if (t === "1") return e2.C.o;
          r[0] = e2.C.u;
          r[1] = e2.C.o;
          return r[t];
        },
        set: function(r, t, i) {
          if (t !== "1") {
            throw new TypeError("prop must be 1");
          }
          e2.C.o = i;
          return true;
        }
      });
    },
    enumerable: false,
    configurable: true
  });
  OrderedMapIterator2.prototype.copy = function() {
    return new OrderedMapIterator2(this.C, this.A, this.container, this.iteratorType);
  };
  return OrderedMapIterator2;
})(TreeIterator);
var OrderedMap = (function(e) {
  __extends(OrderedMap2, e);
  function OrderedMap2(r, t, i) {
    if (r === void 0) {
      r = [];
    }
    var n = e.call(this, t, i) || this;
    var s = n;
    r.forEach((function(e2) {
      s.setElement(e2[0], e2[1]);
    }));
    return n;
  }
  OrderedMap2.prototype.begin = function() {
    return new OrderedMapIterator(this.A.t || this.A, this.A, this);
  };
  OrderedMap2.prototype.end = function() {
    return new OrderedMapIterator(this.A, this.A, this);
  };
  OrderedMap2.prototype.rBegin = function() {
    return new OrderedMapIterator(this.A.i || this.A, this.A, this, 1);
  };
  OrderedMap2.prototype.rEnd = function() {
    return new OrderedMapIterator(this.A, this.A, this, 1);
  };
  OrderedMap2.prototype.front = function() {
    if (this._ === 0) return;
    var e2 = this.A.t;
    return [e2.u, e2.o];
  };
  OrderedMap2.prototype.back = function() {
    if (this._ === 0) return;
    var e2 = this.A.i;
    return [e2.u, e2.o];
  };
  OrderedMap2.prototype.lowerBound = function(e2) {
    var r = this.m(this.N, e2);
    return new OrderedMapIterator(r, this.A, this);
  };
  OrderedMap2.prototype.upperBound = function(e2) {
    var r = this.B(this.N, e2);
    return new OrderedMapIterator(r, this.A, this);
  };
  OrderedMap2.prototype.reverseLowerBound = function(e2) {
    var r = this.j(this.N, e2);
    return new OrderedMapIterator(r, this.A, this);
  };
  OrderedMap2.prototype.reverseUpperBound = function(e2) {
    var r = this.k(this.N, e2);
    return new OrderedMapIterator(r, this.A, this);
  };
  OrderedMap2.prototype.forEach = function(e2) {
    this.P((function(r, t, i) {
      e2([r.u, r.o], t, i);
    }));
  };
  OrderedMap2.prototype.setElement = function(e2, r, t) {
    return this.D(e2, r, t);
  };
  OrderedMap2.prototype.getElementByPos = function(e2) {
    if (e2 < 0 || e2 > this._ - 1) {
      throw new RangeError();
    }
    var r = this.P(e2);
    return [r.u, r.o];
  };
  OrderedMap2.prototype.find = function(e2) {
    var r = this.F(this.N, e2);
    return new OrderedMapIterator(r, this.A, this);
  };
  OrderedMap2.prototype.getElementByKey = function(e2) {
    var r = this.F(this.N, e2);
    return r.o;
  };
  OrderedMap2.prototype.union = function(e2) {
    var r = this;
    e2.forEach((function(e3) {
      r.setElement(e3[0], e3[1]);
    }));
    return this._;
  };
  OrderedMap2.prototype[Symbol.iterator] = function() {
    var e2, r, t, i;
    return __generator(this, (function(n) {
      switch (n.label) {
        case 0:
          e2 = this._;
          r = this.P();
          t = 0;
          n.label = 1;
        case 1:
          if (!(t < e2)) return [3, 4];
          i = r[t];
          return [4, [i.u, i.o]];
        case 2:
          n.sent();
          n.label = 3;
        case 3:
          ++t;
          return [3, 1];
        case 4:
          return [2];
      }
    }));
  };
  return OrderedMap2;
})(TreeContainer);
const esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  OrderedMap
});
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(esm);
export {
  require$$1 as r
};
