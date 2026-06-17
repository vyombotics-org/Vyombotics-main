var yoctoQueue;
var hasRequiredYoctoQueue;
function requireYoctoQueue() {
  if (hasRequiredYoctoQueue) return yoctoQueue;
  hasRequiredYoctoQueue = 1;
  class Node {
    /// value;
    /// next;
    constructor(value) {
      this.value = value;
      this.next = void 0;
    }
  }
  class Queue {
    // TODO: Use private class fields when targeting Node.js 12.
    // #_head;
    // #_tail;
    // #_size;
    constructor() {
      this.clear();
    }
    enqueue(value) {
      const node = new Node(value);
      if (this._head) {
        this._tail.next = node;
        this._tail = node;
      } else {
        this._head = node;
        this._tail = node;
      }
      this._size++;
    }
    dequeue() {
      const current = this._head;
      if (!current) {
        return;
      }
      this._head = this._head.next;
      this._size--;
      return current.value;
    }
    clear() {
      this._head = void 0;
      this._tail = void 0;
      this._size = 0;
    }
    get size() {
      return this._size;
    }
    *[Symbol.iterator]() {
      let current = this._head;
      while (current) {
        yield current.value;
        current = current.next;
      }
    }
  }
  yoctoQueue = Queue;
  return yoctoQueue;
}
export {
  requireYoctoQueue as r
};
