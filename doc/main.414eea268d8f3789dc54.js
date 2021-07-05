(self.webpackChunkweb_di_ld = self.webpackChunkweb_di_ld || []).push([
  [179],
  {
    314: (t) => {
      function e(t) {
        return Promise.resolve().then(() => {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        });
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 314), (t.exports = e);
    },
    77: (t, e, n) => {
      'use strict';
      function s(t) {
        return 'function' == typeof t;
      }
      let r = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
                t.stack
            );
          } else
            r &&
              console.log(
                'RxJS: Back to a better error behavior. Thank you. <3'
              );
          r = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return r;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = Array.isArray || ((t) => t && 'number' == typeof t.length);
      function c(t) {
        return null !== t && 'object' == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join('\n  ')}`
              : ''),
            (this.name = 'UnsubscriptionError'),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class h {
        constructor(t) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
        }
        unsubscribe() {
          let t;
          if (this.closed) return;
          let {
            _parentOrParents: e,
            _ctorUnsubscribe: n,
            _unsubscribe: r,
            _subscriptions: i,
          } = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            e instanceof h)
          )
            e.remove(this);
          else if (null !== e)
            for (let s = 0; s < e.length; ++s) e[s].remove(this);
          if (s(r)) {
            n && (this._unsubscribe = void 0);
            try {
              r.call(this);
            } catch (o) {
              t = o instanceof u ? d(o.errors) : [o];
            }
          }
          if (l(i)) {
            let e = -1,
              n = i.length;
            for (; ++e < n; ) {
              const n = i[e];
              if (c(n))
                try {
                  n.unsubscribe();
                } catch (o) {
                  (t = t || []),
                    o instanceof u ? (t = t.concat(d(o.errors))) : t.push(o);
                }
            }
          }
          if (t) throw new u(t);
        }
        add(t) {
          let e = t;
          if (!t) return h.EMPTY;
          switch (typeof t) {
            case 'function':
              e = new h(t);
            case 'object':
              if (e === this || e.closed || 'function' != typeof e.unsubscribe)
                return e;
              if (this.closed) return e.unsubscribe(), e;
              if (!(e instanceof h)) {
                const t = e;
                (e = new h()), (e._subscriptions = [t]);
              }
              break;
            default:
              throw new Error(
                'unrecognized teardown ' + t + ' added to Subscription.'
              );
          }
          let { _parentOrParents: n } = e;
          if (null === n) e._parentOrParents = this;
          else if (n instanceof h) {
            if (n === this) return e;
            e._parentOrParents = [n, this];
          } else {
            if (-1 !== n.indexOf(this)) return e;
            n.push(this);
          }
          const s = this._subscriptions;
          return null === s ? (this._subscriptions = [e]) : s.push(e), e;
        }
        remove(t) {
          const e = this._subscriptions;
          if (e) {
            const n = e.indexOf(t);
            -1 !== n && e.splice(n, 1);
          }
        }
      }
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      h.EMPTY = (function (t) {
        return (t.closed = !0), t;
      })(new h());
      const p =
        'function' == typeof Symbol
          ? Symbol('rxSubscriber')
          : '@@rxSubscriber_' + Math.random();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ('object' == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const s = new f(t, e, n);
          return (s.syncErrorThrowable = !1), s;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, r) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          s(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (r = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = r);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error('bad call');
          try {
            e.call(this._context, n);
          } catch (s) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = s), (t.syncErrorThrown = !0), !0)
              : (o(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m =
        ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function y(t) {
        return t;
      }
      let _ = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: s } = this,
              r = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (r.add(
                s
                  ? s.call(r, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !r.syncErrorThrowable)
                  ? this._subscribe(r)
                  : this._trySubscribe(r)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                r.syncErrorThrowable &&
                ((r.syncErrorThrowable = !1), r.syncErrorThrown))
            )
              throw r.syncErrorValue;
            return r;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: s } = t;
                    if (e || s) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = v(e))((e, n) => {
              let s;
              s = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (r) {
                    n(r), s && s.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = v(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function v(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error('no Promise impl found');
        return t;
      }
      const b = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = 'object unsubscribed'),
            (this.name = 'ObjectUnsubscribedError'),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class S extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let C = (() => {
        class t extends _ {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new S(this);
          }
          lift(t) {
            const e = new E(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new b();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                s = e.slice();
              for (let r = 0; r < n; r++) s[r].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new b();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              s = e.slice();
            for (let r = 0; r < n; r++) s[r].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new b();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let s = 0; s < e; s++) n[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new b();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new b();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new _();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new E(t, e)), t;
      })();
      class E extends C {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function T(t) {
        return t && 'function' == typeof t.schedule;
      }
      function x(t, e) {
        return function (n) {
          if ('function' != typeof t)
            throw new TypeError(
              'argument is not a function. Are you looking for `mapTo()`?'
            );
          return n.lift(new A(t, e));
        };
      }
      class A {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new k(t, this.project, this.thisArg));
        }
      }
      class k extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const O = (t) => (e) => {
          for (let n = 0, s = t.length; n < s && !e.closed; n++) e.next(t[n]);
          e.complete();
        },
        I =
          'function' == typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : '@@iterator',
        R = (t) => t && 'number' == typeof t.length && 'function' != typeof t;
      function P(t) {
        return (
          !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then
        );
      }
      const N = (t) => {
        if (t && 'function' == typeof t[m])
          return (
            (n = t),
            (t) => {
              const e = n[m]();
              if ('function' != typeof e.subscribe)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              return e.subscribe(t);
            }
          );
        if (R(t)) return O(t);
        if (P(t))
          return ((t) => (e) => (
            t
              .then(
                (t) => {
                  e.closed || (e.next(t), e.complete());
                },
                (t) => e.error(t)
              )
              .then(null, o),
            e
          ))(t);
        if (t && 'function' == typeof t[I])
          return (
            (e = t),
            (t) => {
              const n = e[I]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (s) {
                  return t.error(s), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                'function' == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? 'an invalid object' : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n;
      };
      function D(t, e) {
        return new _((n) => {
          const s = new h();
          let r = 0;
          return (
            s.add(
              e.schedule(function () {
                r !== t.length
                  ? (n.next(t[r++]), n.closed || s.add(this.schedule()))
                  : n.complete();
              })
            ),
            s
          );
        });
      }
      function L(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && 'function' == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new _((n) => {
                      const s = new h();
                      return (
                        s.add(
                          e.schedule(() => {
                            const r = t[m]();
                            s.add(
                              r.subscribe({
                                next(t) {
                                  s.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  s.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  s.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        s
                      );
                    });
                  })(t, e);
                if (P(t))
                  return (function (t, e) {
                    return new _((n) => {
                      const s = new h();
                      return (
                        s.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                s.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      s.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                s.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        s
                      );
                    });
                  })(t, e);
                if (R(t)) return D(t, e);
                if (
                  (function (t) {
                    return t && 'function' == typeof t[I];
                  })(t) ||
                  'string' == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error('Iterable cannot be null');
                    return new _((n) => {
                      const s = new h();
                      let r;
                      return (
                        s.add(() => {
                          r && 'function' == typeof r.return && r.return();
                        }),
                        s.add(
                          e.schedule(() => {
                            (r = t[I]()),
                              s.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = r.next();
                                    (t = n.value), (e = n.done);
                                  } catch (s) {
                                    return void n.error(s);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        s
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + ' is not observable'
              );
            })(t, e)
          : t instanceof _
          ? t
          : new _(N(t));
      }
      class j extends f {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class F extends f {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function V(t, e) {
        if (e.closed) return;
        if (t instanceof _) return t.subscribe(e);
        let n;
        try {
          n = N(t)(e);
        } catch (s) {
          e.error(s);
        }
        return n;
      }
      function M(t, e, n = Number.POSITIVE_INFINITY) {
        return 'function' == typeof e
          ? (s) =>
              s.pipe(
                M((n, s) => L(t(n, s)).pipe(x((t, r) => e(n, t, s, r))), n)
              )
          : ('number' == typeof e && (n = e), (e) => e.lift(new U(t, n)));
      }
      class U {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new H(t, this.project, this.concurrent));
        }
      }
      class H extends F {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new j(this),
            n = this.destination;
          n.add(e);
          const s = V(t, e);
          s !== e && n.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function $(t = Number.POSITIVE_INFINITY) {
        return M(y, t);
      }
      function B(t, e) {
        return e ? D(t, e) : new _(O(t));
      }
      function q() {
        return function (t) {
          return t.lift(new z(t));
        };
      }
      class z {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const s = new W(t, n),
            r = e.subscribe(s);
          return s.closed || (s.connection = n.connect()), r;
        }
      }
      class W extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            s = t._connection;
          (this.connection = null), !s || (n && s !== n) || s.unsubscribe();
        }
      }
      class Q extends _ {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new G(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return q()(this);
        }
      }
      const K = (() => {
        const t = Q.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class G extends S {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function Z() {
        return new C();
      }
      function Y(t) {
        for (let e in t) if (t[e] === Y) return e;
        throw Error('Could not find renamed property on target object.');
      }
      function J(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function X(t) {
        if ('string' == typeof t) return t;
        if (Array.isArray(t)) return '[' + t.map(X).join(', ') + ']';
        if (null == t) return '' + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return '' + e;
        const n = e.indexOf('\n');
        return -1 === n ? e : e.substring(0, n);
      }
      function tt(t, e) {
        return null == t || '' === t
          ? null === e
            ? ''
            : e
          : null == e || '' === e
          ? t
          : t + ' ' + e;
      }
      const et = Y({ __forward_ref__: Y });
      function nt(t) {
        return (
          (t.__forward_ref__ = nt),
          (t.toString = function () {
            return X(this());
          }),
          t
        );
      }
      function st(t) {
        return rt(t) ? t() : t;
      }
      function rt(t) {
        return (
          'function' == typeof t &&
          t.hasOwnProperty(et) &&
          t.__forward_ref__ === nt
        );
      }
      class it extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ''}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function ot(t) {
        return 'string' == typeof t ? t : null == t ? '' : String(t);
      }
      function at(t) {
        return 'function' == typeof t
          ? t.name || t.toString()
          : 'object' == typeof t && null != t && 'function' == typeof t.type
          ? t.type.name || t.type.toString()
          : ot(t);
      }
      function lt(t, e) {
        const n = e ? ` in ${e}` : '';
        throw new it('201', `No provider for ${at(t)} found${n}`);
      }
      function ct(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      const ut = ct;
      function ht(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function dt(t) {
        return pt(t, gt) || pt(t, yt);
      }
      function pt(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function ft(t) {
        return t && (t.hasOwnProperty(mt) || t.hasOwnProperty(_t))
          ? t[mt]
          : null;
      }
      const gt = Y({ '\u0275prov': Y }),
        mt = Y({ '\u0275inj': Y }),
        yt = Y({ ngInjectableDef: Y }),
        _t = Y({ ngInjectorDef: Y });
      var vt = (() => (
        ((vt = vt || {})[(vt.Default = 0)] = 'Default'),
        (vt[(vt.Host = 1)] = 'Host'),
        (vt[(vt.Self = 2)] = 'Self'),
        (vt[(vt.SkipSelf = 4)] = 'SkipSelf'),
        (vt[(vt.Optional = 8)] = 'Optional'),
        vt
      ))();
      let bt;
      function wt(t) {
        const e = bt;
        return (bt = t), e;
      }
      function St(t, e, n) {
        const s = dt(t);
        return s && 'root' == s.providedIn
          ? void 0 === s.value
            ? (s.value = s.factory())
            : s.value
          : n & vt.Optional
          ? null
          : void 0 !== e
          ? e
          : void lt(X(t), 'Injector');
      }
      function Ct(t) {
        return { toString: t }.toString();
      }
      var Et = (() => (
          ((Et = Et || {})[(Et.OnPush = 0)] = 'OnPush'),
          (Et[(Et.Default = 1)] = 'Default'),
          Et
        ))(),
        Tt = (() => (
          ((Tt = Tt || {})[(Tt.Emulated = 0)] = 'Emulated'),
          (Tt[(Tt.None = 2)] = 'None'),
          (Tt[(Tt.ShadowDom = 3)] = 'ShadowDom'),
          Tt
        ))();
      const xt = 'undefined' != typeof globalThis && globalThis,
        At = 'undefined' != typeof window && window,
        kt =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ot = 'undefined' != typeof global && global,
        It = xt || Ot || At || kt,
        Rt = {},
        Pt = [],
        Nt = Y({ '\u0275cmp': Y }),
        Dt = Y({ '\u0275dir': Y }),
        Lt = Y({ '\u0275pipe': Y }),
        jt = Y({ '\u0275mod': Y }),
        Ft = Y({ '\u0275loc': Y }),
        Vt = Y({ '\u0275fac': Y }),
        Mt = Y({ __NG_ELEMENT_ID__: Y });
      let Ut = 0;
      function Ht(t) {
        return Ct(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Et.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || Pt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || Tt.Emulated,
              id: 'c',
              styles: t.styles || Pt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            s = t.directives,
            r = t.features,
            i = t.pipes;
          return (
            (n.id += Ut++),
            (n.inputs = Wt(t.inputs, e)),
            (n.outputs = Wt(t.outputs)),
            r && r.forEach((t) => t(n)),
            (n.directiveDefs = s
              ? () => ('function' == typeof s ? s() : s).map($t)
              : null),
            (n.pipeDefs = i
              ? () => ('function' == typeof i ? i() : i).map(Bt)
              : null),
            n
          );
        });
      }
      function $t(t) {
        return (
          Gt(t) ||
          (function (t) {
            return t[Dt] || null;
          })(t)
        );
      }
      function Bt(t) {
        return (function (t) {
          return t[Lt] || null;
        })(t);
      }
      const qt = {};
      function zt(t) {
        return Ct(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || Pt,
            declarations: t.declarations || Pt,
            imports: t.imports || Pt,
            exports: t.exports || Pt,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (qt[t.id] = t.type), e;
        });
      }
      function Wt(t, e) {
        if (null == t) return Rt;
        const n = {};
        for (const s in t)
          if (t.hasOwnProperty(s)) {
            let r = t[s],
              i = r;
            Array.isArray(r) && ((i = r[1]), (r = r[0])),
              (n[r] = s),
              e && (e[r] = i);
          }
        return n;
      }
      const Qt = Ht;
      function Kt(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function Gt(t) {
        return t[Nt] || null;
      }
      function Zt(t, e) {
        const n = t[jt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${X(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Yt = 20,
        Jt = 10;
      function Xt(t) {
        return Array.isArray(t) && 'object' == typeof t[1];
      }
      function te(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function ee(t) {
        return 0 != (8 & t.flags);
      }
      function ne(t) {
        return 2 == (2 & t.flags);
      }
      function se(t) {
        return 1 == (1 & t.flags);
      }
      function re(t) {
        return null !== t.template;
      }
      function ie(t, e) {
        return t.hasOwnProperty(Vt) ? t[Vt] : null;
      }
      class oe {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ae() {
        return le;
      }
      function le(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = ue), ce;
      }
      function ce() {
        const t = he(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === Rt) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function ue(t, e, n, s) {
        const r =
            he(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: Rt, current: null }),
          i = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new oe(l && l.currentValue, e, o === Rt)), (t[s] = e);
      }
      function he(t) {
        return t.__ngSimpleChanges__ || null;
      }
      let de;
      function pe(t) {
        return !!t.listen;
      }
      ae.ngInherit = !0;
      const fe = {
        createRenderer: (t, e) =>
          void 0 !== de
            ? de
            : 'undefined' != typeof document
            ? document
            : void 0,
      };
      function ge(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function me(t, e) {
        return ge(e[t]);
      }
      function ye(t, e) {
        return ge(e[t.index]);
      }
      function _e(t, e) {
        return t.data[e];
      }
      function ve(t, e) {
        return t[e];
      }
      function be(t, e) {
        const n = e[t];
        return Xt(n) ? n : n[0];
      }
      function we(t) {
        return 4 == (4 & t[2]);
      }
      function Se(t) {
        return 128 == (128 & t[2]);
      }
      function Ce(t, e) {
        return null == e ? null : t[e];
      }
      function Ee(t) {
        t[18] = 0;
      }
      function Te(t, e) {
        t[5] += e;
        let n = t,
          s = t[3];
        for (
          ;
          null !== s && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (s[5] += e), (n = s), (s = s[3]);
      }
      const xe = {
        lFrame: Ke(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Ae() {
        return xe.bindingsEnabled;
      }
      function ke() {
        return xe.lFrame.lView;
      }
      function Oe() {
        return xe.lFrame.tView;
      }
      function Ie() {
        let t = Re();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Re() {
        return xe.lFrame.currentTNode;
      }
      function Pe(t, e) {
        const n = xe.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function Ne() {
        return xe.lFrame.isParent;
      }
      function De() {
        xe.lFrame.isParent = !1;
      }
      function Le() {
        return xe.isInCheckNoChangesMode;
      }
      function je(t) {
        xe.isInCheckNoChangesMode = t;
      }
      function Fe() {
        const t = xe.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function Ve() {
        return xe.lFrame.bindingIndex++;
      }
      function Me(t) {
        const e = xe.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function Ue(t, e) {
        const n = xe.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), He(e);
      }
      function He(t) {
        xe.lFrame.currentDirectiveIndex = t;
      }
      function $e() {
        return xe.lFrame.currentQueryIndex;
      }
      function Be(t) {
        xe.lFrame.currentQueryIndex = t;
      }
      function qe(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function ze(t, e, n) {
        if (n & vt.SkipSelf) {
          let s = e,
            r = t;
          for (
            ;
            (s = s.parent),
              !(
                null !== s ||
                n & vt.Host ||
                ((s = qe(r)), null === s) ||
                ((r = r[15]), 10 & s.type)
              );

          );
          if (null === s) return !1;
          (e = s), (t = r);
        }
        const s = (xe.lFrame = Qe());
        return (s.currentTNode = e), (s.lView = t), !0;
      }
      function We(t) {
        const e = Qe(),
          n = t[1];
        (xe.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Qe() {
        const t = xe.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Ke(t) : e;
      }
      function Ke(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Ge() {
        const t = xe.lFrame;
        return (
          (xe.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const Ze = Ge;
      function Ye() {
        const t = Ge();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Je() {
        return xe.lFrame.selectedIndex;
      }
      function Xe(t) {
        xe.lFrame.selectedIndex = t;
      }
      function tn() {
        const t = xe.lFrame;
        return _e(t.tView, t.selectedIndex);
      }
      function en(t, e) {
        for (let n = e.directiveStart, s = e.directiveEnd; n < s; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: r,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          s && (t.contentHooks || (t.contentHooks = [])).push(-n, s),
            r &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, r),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, r)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function nn(t, e, n) {
        on(t, e, 3, n);
      }
      function sn(t, e, n, s) {
        (3 & t[2]) === n && on(t, e, n, s);
      }
      function rn(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function on(t, e, n, s) {
        const r = null != s ? s : -1,
          i = e.length - 1;
        let o = 0;
        for (let a = void 0 !== s ? 65535 & t[18] : 0; a < i; a++)
          if ('number' == typeof e[a + 1]) {
            if (((o = e[a]), null != s && o >= s)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < r || -1 == r) &&
                (an(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function an(t, e, n, s) {
        const r = n[s] < 0,
          i = n[s + 1],
          o = t[r ? -n[s] : n[s]];
        if (r) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              i.call(o);
            } finally {
            }
          }
        } else
          try {
            i.call(o);
          } finally {
          }
      }
      const ln = -1;
      class cn {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function un(t, e, n) {
        const s = pe(t);
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ('number' == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              a = n[r++],
              l = n[r++];
            s ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++r];
            dn(o)
              ? s && t.setProperty(e, o, a)
              : s
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function hn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function dn(t) {
        return 64 === t.charCodeAt(0);
      }
      function pn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let s = 0; s < e.length; s++) {
            const r = e[s];
            'number' == typeof r
              ? (n = r)
              : 0 === n ||
                fn(t, n, r, null, -1 === n || 2 === n ? e[++s] : null);
          }
        }
        return t;
      }
      function fn(t, e, n, s, r) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ('number' == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ('number' == typeof e) break;
          if (e === n) {
            if (null === s) return void (null !== r && (t[i + 1] = r));
            if (s === t[i + 1]) return void (t[i + 2] = r);
          }
          i++, null !== s && i++, null !== r && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== s && t.splice(i++, 0, s),
          null !== r && t.splice(i++, 0, r);
      }
      function gn(t) {
        return t !== ln;
      }
      function mn(t) {
        return 32767 & t;
      }
      function yn(t, e) {
        let n = t >> 16,
          s = e;
        for (; n > 0; ) (s = s[15]), n--;
        return s;
      }
      let _n = !0;
      function vn(t) {
        const e = _n;
        return (_n = t), e;
      }
      let bn = 0;
      function wn(t, e) {
        const n = Cn(t, e);
        if (-1 !== n) return n;
        const s = e[1];
        s.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Sn(s.data, t),
          Sn(e, null),
          Sn(s.blueprint, null));
        const r = En(t, e),
          i = t.injectorIndex;
        if (gn(r)) {
          const t = mn(r),
            n = yn(r, e),
            s = n[1].data;
          for (let r = 0; r < 8; r++) e[i + r] = n[t + r] | s[t + r];
        }
        return (e[i + 8] = r), i;
      }
      function Sn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Cn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function En(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          s = null,
          r = e;
        for (; null !== r; ) {
          const t = r[1],
            e = t.type;
          if (((s = 2 === e ? t.declTNode : 1 === e ? r[6] : null), null === s))
            return ln;
          if ((n++, (r = r[15]), -1 !== s.injectorIndex))
            return s.injectorIndex | (n << 16);
        }
        return ln;
      }
      function Tn(t, e, n) {
        !(function (t, e, n) {
          let s;
          'string' == typeof n
            ? (s = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Mt) && (s = n[Mt]),
            null == s && (s = n[Mt] = bn++);
          const r = 255 & s;
          e.data[t + (r >> 5)] |= 1 << r;
        })(t, e, n);
      }
      function xn(t, e, n) {
        if (n & vt.Optional) return t;
        lt(e, 'NodeInjector');
      }
      function An(t, e, n, s) {
        if (
          (n & vt.Optional && void 0 === s && (s = null),
          0 == (n & (vt.Self | vt.Host)))
        ) {
          const r = t[9],
            i = wt(void 0);
          try {
            return r ? r.get(e, s, n & vt.Optional) : St(e, s, n & vt.Optional);
          } finally {
            wt(i);
          }
        }
        return xn(s, e, n);
      }
      function kn(t, e, n, s = vt.Default, r) {
        if (null !== t) {
          const i = (function (t) {
            if ('string' == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Mt) ? t[Mt] : void 0;
            return 'number' == typeof e ? (e >= 0 ? 255 & e : In) : e;
          })(n);
          if ('function' == typeof i) {
            if (!ze(e, t, s)) return s & vt.Host ? xn(r, n, s) : An(e, n, s, r);
            try {
              const t = i(s);
              if (null != t || s & vt.Optional) return t;
              lt(n);
            } finally {
              Ze();
            }
          } else if ('number' == typeof i) {
            let r = null,
              o = Cn(t, e),
              a = ln,
              l = s & vt.Host ? e[16][6] : null;
            for (
              (-1 === o || s & vt.SkipSelf) &&
              ((a = -1 === o ? En(t, e) : e[o + 8]),
              a !== ln && Ln(s, !1)
                ? ((r = e[1]), (o = mn(a)), (e = yn(a, e)))
                : (o = -1));
              -1 !== o;

            ) {
              const t = e[1];
              if (Dn(i, o, t.data)) {
                const t = Rn(o, e, n, r, s, l);
                if (t !== On) return t;
              }
              (a = e[o + 8]),
                a !== ln && Ln(s, e[1].data[o + 8] === l) && Dn(i, o, e)
                  ? ((r = t), (o = mn(a)), (e = yn(a, e)))
                  : (o = -1);
            }
          }
        }
        return An(e, n, s, r);
      }
      const On = {};
      function In() {
        return new jn(Ie(), ke());
      }
      function Rn(t, e, n, s, r, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = Pn(
            a,
            o,
            n,
            null == s ? ne(a) && _n : s != o && 0 != (3 & a.type),
            r & vt.Host && i === a
          );
        return null !== l ? Nn(e, o, l, a) : On;
      }
      function Pn(t, e, n, s, r) {
        const i = t.providerIndexes,
          o = e.data,
          a = 1048575 & i,
          l = t.directiveStart,
          c = i >> 20,
          u = r ? a + c : t.directiveEnd;
        for (let h = s ? a : a + c; h < u; h++) {
          const t = o[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (r) {
          const t = o[l];
          if (t && re(t) && t.type === n) return l;
        }
        return null;
      }
      function Nn(t, e, n, s) {
        let r = t[n];
        const i = e.data;
        if (r instanceof cn) {
          const o = r;
          o.resolving &&
            (function (t, e) {
              throw new it(
                '200',
                `Circular dependency in DI detected for ${t}`
              );
            })(at(i[n]));
          const a = vn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? wt(o.injectImpl) : null;
          ze(t, s, vt.Default);
          try {
            (r = t[n] = o.factory(void 0, i, t, s)),
              e.firstCreatePass &&
                n >= s.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: s,
                    ngOnInit: r,
                    ngDoCheck: i,
                  } = e.type.prototype;
                  if (s) {
                    const s = le(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s);
                  }
                  r &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, r),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== l && wt(l), vn(a), (o.resolving = !1), Ze();
          }
        }
        return r;
      }
      function Dn(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function Ln(t, e) {
        return !(t & vt.Self || (t & vt.Host && e));
      }
      class jn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return kn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Fn(t) {
        return Ct(() => {
          const e = t.prototype.constructor,
            n = e[Vt] || Vn(e),
            s = Object.prototype;
          let r = Object.getPrototypeOf(t.prototype).constructor;
          for (; r && r !== s; ) {
            const t = r[Vt] || Vn(r);
            if (t && t !== n) return t;
            r = Object.getPrototypeOf(r);
          }
          return (t) => new t();
        });
      }
      function Vn(t) {
        return rt(t)
          ? () => {
              const e = Vn(st(t));
              return e && e();
            }
          : ie(t);
      }
      const Mn = '__parameters__';
      function Un(t, e, n) {
        return Ct(() => {
          const s = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function r(...t) {
            if (this instanceof r) return s.apply(this, t), this;
            const e = new r(...t);
            return (n.annotation = e), n;
            function n(t, n, s) {
              const r = t.hasOwnProperty(Mn)
                ? t[Mn]
                : Object.defineProperty(t, Mn, { value: [] })[Mn];
              for (; r.length <= s; ) r.push(null);
              return (r[s] = r[s] || []).push(e), t;
            }
          }
          return (
            n && (r.prototype = Object.create(n.prototype)),
            (r.prototype.ngMetadataName = t),
            (r.annotationCls = r),
            r
          );
        });
      }
      class Hn {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ct({
                  token: this,
                  providedIn: e.providedIn || 'root',
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const $n = new Hn('AnalyzeForEntryComponents'),
        Bn = Function;
      function qn(t, e) {
        void 0 === e && (e = t);
        for (let n = 0; n < t.length; n++) {
          let s = t[n];
          Array.isArray(s)
            ? (e === t && (e = t.slice(0, n)), qn(s, e))
            : e !== t && e.push(s);
        }
        return e;
      }
      function zn(t, e) {
        t.forEach((t) => (Array.isArray(t) ? zn(t, e) : e(t)));
      }
      function Wn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Qn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function Kn(t, e) {
        const n = [];
        for (let s = 0; s < t; s++) n.push(e);
        return n;
      }
      function Gn(t, e, n) {
        let s = Yn(t, e);
        return (
          s >= 0
            ? (t[1 | s] = n)
            : ((s = ~s),
              (function (t, e, n, s) {
                let r = t.length;
                if (r == e) t.push(n, s);
                else if (1 === r) t.push(s, t[0]), (t[0] = n);
                else {
                  for (r--, t.push(t[r - 1], t[r]); r > e; )
                    (t[r] = t[r - 2]), r--;
                  (t[e] = n), (t[e + 1] = s);
                }
              })(t, s, e, n)),
          s
        );
      }
      function Zn(t, e) {
        const n = Yn(t, e);
        if (n >= 0) return t[1 | n];
      }
      function Yn(t, e) {
        return (function (t, e, n) {
          let s = 0,
            r = t.length >> 1;
          for (; r !== s; ) {
            const n = s + ((r - s) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (r = n) : (s = n + 1);
          }
          return ~(r << 1);
        })(t, e);
      }
      const Jn = {},
        Xn = /\n/gm,
        ts = '__source',
        es = Y({ provide: String, useValue: Y });
      let ns;
      function ss(t) {
        const e = ns;
        return (ns = t), e;
      }
      function rs(t, e = vt.Default) {
        if (void 0 === ns)
          throw new Error('inject() must be called from an injection context');
        return null === ns
          ? St(t, void 0, e)
          : ns.get(t, e & vt.Optional ? null : void 0, e);
      }
      function is(t, e = vt.Default) {
        return (bt || rs)(st(t), e);
      }
      const os = is;
      function as(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const s = st(t[n]);
          if (Array.isArray(s)) {
            if (0 === s.length)
              throw new Error('Arguments array must have arguments.');
            let t,
              n = vt.Default;
            for (let e = 0; e < s.length; e++) {
              const r = s[e],
                i = r.__NG_DI_FLAG__;
              'number' == typeof i
                ? -1 === i
                  ? (t = r.token)
                  : (n |= i)
                : (t = r);
            }
            e.push(is(t, n));
          } else e.push(is(s));
        }
        return e;
      }
      function ls(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t;
      }
      const cs = ls(
          Un('Inject', (t) => ({ token: t })),
          -1
        ),
        us = ls(Un('Optional'), 8),
        hs = ls(Un('SkipSelf'), 4);
      let ds;
      function ps(t) {
        var e;
        return (
          (null ===
            (e = (function () {
              if (void 0 === ds && ((ds = null), It.trustedTypes))
                try {
                  ds = It.trustedTypes.createPolicy('angular', {
                    createHTML: (t) => t,
                    createScript: (t) => t,
                    createScriptURL: (t) => t,
                  });
                } catch (e) {}
              return ds;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(t)) || t
        );
      }
      class fs {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class gs extends fs {
        getTypeName() {
          return 'HTML';
        }
      }
      class ms extends fs {
        getTypeName() {
          return 'Style';
        }
      }
      class ys extends fs {
        getTypeName() {
          return 'Script';
        }
      }
      class _s extends fs {
        getTypeName() {
          return 'URL';
        }
      }
      class vs extends fs {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function bs(t) {
        return t instanceof fs ? t.changingThisBreaksApplicationSecurity : t;
      }
      function ws(t, e) {
        const n = Ss(t);
        if (null != n && n !== e) {
          if ('ResourceURL' === n && 'URL' === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      function Ss(t) {
        return (t instanceof fs && t.getTypeName()) || null;
      }
      class Cs {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const e = new window.DOMParser().parseFromString(ps(t), 'text/html')
              .body;
            return null === e
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (e.removeChild(e.firstChild), e);
          } catch (e) {
            return null;
          }
        }
      }
      class Es {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              'sanitization-inert'
            )),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement('html');
            this.inertDocument.appendChild(t);
            const e = this.inertDocument.createElement('body');
            t.appendChild(e);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement('template');
          if ('content' in e) return (e.innerHTML = ps(t)), e;
          const n = this.inertDocument.createElement('body');
          return (
            (n.innerHTML = ps(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
            n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let s = e.length - 1; 0 < s; s--) {
            const n = e.item(s).name;
            ('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Ts = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        xs = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function As(t) {
        return (t = String(t)).match(Ts) || t.match(xs) ? t : 'unsafe:' + t;
      }
      function ks(t) {
        const e = {};
        for (const n of t.split(',')) e[n] = !0;
        return e;
      }
      function Os(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const Is = ks('area,br,col,hr,img,wbr'),
        Rs = ks('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        Ps = ks('rp,rt'),
        Ns = Os(Ps, Rs),
        Ds = Os(
          Is,
          Os(
            Rs,
            ks(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          Os(
            Ps,
            ks(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Ns
        ),
        Ls = ks('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        js = ks('srcset'),
        Fs = Os(
          Ls,
          js,
          ks(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          ks(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        Vs = ks('script,style,template');
      class Ms {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Ds.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !Vs.hasOwnProperty(e);
          this.buf.push('<'), this.buf.push(e);
          const n = t.attributes;
          for (let r = 0; r < n.length; r++) {
            const t = n.item(r),
              e = t.name,
              i = e.toLowerCase();
            if (!Fs.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            Ls[i] && (o = As(o)),
              js[i] &&
                ((s = o),
                (o = (s = String(s))
                  .split(',')
                  .map((t) => As(t.trim()))
                  .join(', '))),
              this.buf.push(' ', e, '="', $s(o), '"');
          }
          var s;
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Ds.hasOwnProperty(e) &&
            !Is.hasOwnProperty(e) &&
            (this.buf.push('</'), this.buf.push(e), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push($s(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const Us = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Hs = /([^\#-~ |!])/g;
      function $s(t) {
        return t
          .replace(/&/g, '&amp;')
          .replace(Us, function (t) {
            return (
              '&#' +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ';'
            );
          })
          .replace(Hs, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let Bs;
      function qs(t) {
        return 'content' in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      var zs = (() => (
        ((zs = zs || {})[(zs.NONE = 0)] = 'NONE'),
        (zs[(zs.HTML = 1)] = 'HTML'),
        (zs[(zs.STYLE = 2)] = 'STYLE'),
        (zs[(zs.SCRIPT = 3)] = 'SCRIPT'),
        (zs[(zs.URL = 4)] = 'URL'),
        (zs[(zs.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        zs
      ))();
      function Ws(t) {
        const e = (function () {
          const t = ke();
          return t && t[12];
        })();
        return e
          ? e.sanitize(zs.URL, t) || ''
          : ws(t, 'URL')
          ? bs(t)
          : As(ot(t));
      }
      function Qs(t, e) {
        t.__ngContext__ = e;
      }
      function Ks(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Gs(t) {
        return t.ngDebugContext;
      }
      function Zs(t) {
        return t.ngOriginalError;
      }
      function Ys(t, ...e) {
        t.error(...e);
      }
      class Js {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            s = (function (t) {
              return t.ngErrorLogger || Ys;
            })(t);
          s(this._console, 'ERROR', t),
            e && s(this._console, 'ORIGINAL ERROR', e),
            n && s(this._console, 'ERROR CONTEXT', n);
        }
        _findContext(t) {
          return t ? (Gs(t) ? Gs(t) : this._findContext(Zs(t))) : null;
        }
        _findOriginalError(t) {
          let e = Zs(t);
          for (; e && Zs(e); ) e = Zs(e);
          return e;
        }
      }
      const Xs = (() =>
        (
          ('undefined' != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(It))();
      function tr(t) {
        return t.ownerDocument.defaultView;
      }
      function er(t) {
        return t instanceof Function ? t() : t;
      }
      var nr = (() => (
        ((nr = nr || {})[(nr.Important = 1)] = 'Important'),
        (nr[(nr.DashCase = 2)] = 'DashCase'),
        nr
      ))();
      function sr(t, e) {
        return (void 0)(t, e);
      }
      function rr(t) {
        const e = t[3];
        return te(e) ? e[3] : e;
      }
      function ir(t) {
        return ar(t[13]);
      }
      function or(t) {
        return ar(t[4]);
      }
      function ar(t) {
        for (; null !== t && !te(t); ) t = t[4];
        return t;
      }
      function lr(t, e, n, s, r) {
        if (null != s) {
          let i,
            o = !1;
          te(s) ? (i = s) : Xt(s) && ((o = !0), (s = s[0]));
          const a = ge(s);
          0 === t && null !== n
            ? null == r
              ? mr(e, n, a)
              : gr(e, n, a, r || null, !0)
            : 1 === t && null !== n
            ? gr(e, n, a, r || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const s = _r(t, e);
                s &&
                  (function (t, e, n, s) {
                    pe(t) ? t.removeChild(e, n, s) : e.removeChild(n);
                  })(t, s, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, s, r) {
                const i = n[7];
                i !== ge(n) && lr(e, t, s, i, r);
                for (let o = Jt; o < n.length; o++) {
                  const r = n[o];
                  xr(r[1], r, t, e, s, i);
                }
              })(e, t, i, n, r);
        }
      }
      function cr(t, e, n) {
        return pe(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function ur(t, e) {
        const n = t[9],
          s = n.indexOf(e),
          r = e[3];
        1024 & e[2] && ((e[2] &= -1025), Te(r, -1)), n.splice(s, 1);
      }
      function hr(t, e) {
        if (t.length <= Jt) return;
        const n = Jt + e,
          s = t[n];
        if (s) {
          const i = s[17];
          null !== i && i !== t && ur(i, s), e > 0 && (t[n - 1][4] = s[4]);
          const o = Qn(t, Jt + e);
          xr(s[1], (r = s), r[11], 2, null, null), (r[0] = null), (r[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (s[3] = null),
            (s[4] = null),
            (s[2] &= -129);
        }
        var r;
        return s;
      }
      function dr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          pe(n) && n.destroyNode && xr(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return pr(t[1], t);
              for (; e; ) {
                let n = null;
                if (Xt(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Xt(e) && pr(e[1], e), (e = e[3]);
                  null === e && (e = t), Xt(e) && pr(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function pr(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let s = 0; s < n.length; s += 2) {
                  const t = e[n[s]];
                  if (!(t instanceof cn)) {
                    const e = n[s + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2) {
                        const s = t[e[n]],
                          r = e[n + 1];
                        try {
                          r.call(s);
                        } finally {
                        }
                      }
                    else
                      try {
                        e.call(t);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                s = e[7];
              let r = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const t = n[i + 1],
                      o = 'function' == typeof t ? t(e) : ge(e[t]),
                      a = s[(r = n[i + 2])],
                      l = n[i + 3];
                    'boolean' == typeof l
                      ? o.removeEventListener(n[i], a, l)
                      : l >= 0
                      ? s[(r = l)]()
                      : s[(r = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const t = s[(r = n[i + 1])];
                    n[i].call(t);
                  }
              if (null !== s) {
                for (let t = r + 1; t < s.length; t++) (0, s[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && pe(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && te(e[3])) {
            n !== e[3] && ur(n, e);
            const s = e[19];
            null !== s && s.detachView(t);
          }
        }
      }
      function fr(t, e, n) {
        return (function (t, e, n) {
          let s = e;
          for (; null !== s && 40 & s.type; ) s = (e = s).parent;
          if (null === s) return n[0];
          if (2 & s.flags) {
            const e = t.data[s.directiveStart].encapsulation;
            if (e === Tt.None || e === Tt.Emulated) return null;
          }
          return ye(s, n);
        })(t, e.parent, n);
      }
      function gr(t, e, n, s, r) {
        pe(t) ? t.insertBefore(e, n, s, r) : e.insertBefore(n, s, r);
      }
      function mr(t, e, n) {
        pe(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function yr(t, e, n, s, r) {
        null !== s ? gr(t, e, n, s, r) : mr(t, e, n);
      }
      function _r(t, e) {
        return pe(t) ? t.parentNode(e) : e.parentNode;
      }
      function vr(t, e, n) {
        return br(t, e, n);
      }
      let br = function (t, e, n) {
        return 40 & t.type ? ye(t, n) : null;
      };
      function wr(t, e, n, s) {
        const r = fr(t, s, e),
          i = e[11],
          o = vr(s.parent || e[6], s, e);
        if (null != r)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) yr(i, r, n[a], o, !1);
          else yr(i, r, n, o, !1);
      }
      function Sr(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return ye(e, t);
          if (4 & n) return Er(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return Sr(t, n);
            {
              const n = t[e.index];
              return te(n) ? Er(-1, n) : ge(n);
            }
          }
          if (32 & n) return sr(e, t)() || ge(t[e.index]);
          {
            const n = Cr(t, e);
            return null !== n
              ? Array.isArray(n)
                ? n[0]
                : Sr(rr(t[16]), n)
              : Sr(t, e.next);
          }
        }
        return null;
      }
      function Cr(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function Er(t, e) {
        const n = Jt + t + 1;
        if (n < e.length) {
          const t = e[n],
            s = t[1].firstChild;
          if (null !== s) return Sr(t, s);
        }
        return e[7];
      }
      function Tr(t, e, n, s, r, i, o) {
        for (; null != n; ) {
          const a = s[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && Qs(ge(a), s), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Tr(t, e, n.child, s, r, i, !1), lr(e, t, r, a, i);
            else if (32 & l) {
              const o = sr(n, s);
              let l;
              for (; (l = o()); ) lr(e, t, r, l, i);
              lr(e, t, r, a, i);
            } else 16 & l ? Ar(t, e, s, n, r, i) : lr(e, t, r, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function xr(t, e, n, s, r, i) {
        Tr(n, s, t.firstChild, e, r, i, !1);
      }
      function Ar(t, e, n, s, r, i) {
        const o = n[16],
          a = o[6].projection[s.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) lr(e, t, r, a[l], i);
        else Tr(t, e, a, o[3], r, i, !0);
      }
      function kr(t, e, n) {
        pe(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
      }
      function Or(t, e, n) {
        pe(t)
          ? '' === n
            ? t.removeAttribute(e, 'class')
            : t.setAttribute(e, 'class', n)
          : (e.className = n);
      }
      function Ir(t, e, n) {
        let s = t.length;
        for (;;) {
          const r = t.indexOf(e, n);
          if (-1 === r) return r;
          if (0 === r || t.charCodeAt(r - 1) <= 32) {
            const n = e.length;
            if (r + n === s || t.charCodeAt(r + n) <= 32) return r;
          }
          n = r + 1;
        }
      }
      const Rr = 'ng-template';
      function Pr(t, e, n) {
        let s = 0;
        for (; s < t.length; ) {
          let r = t[s++];
          if (n && 'class' === r) {
            if (((r = t[s]), -1 !== Ir(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; s < t.length && 'string' == typeof (r = t[s++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Nr(t) {
        return 4 === t.type && t.value !== Rr;
      }
      function Dr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Rr);
      }
      function Lr(t, e, n) {
        let s = 4;
        const r = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (hn(t[e])) return e;
            return t.length;
          })(r);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ('number' != typeof l) {
            if (!o)
              if (4 & s) {
                if (
                  ((s = 2 | (1 & s)),
                  ('' !== l && !Dr(t, l, n)) || ('' === l && 1 === e.length))
                ) {
                  if (jr(s)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & s ? l : e[++a];
                if (8 & s && null !== t.attrs) {
                  if (!Pr(t.attrs, c, n)) {
                    if (jr(s)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = Fr(8 & s ? 'class' : l, r, Nr(t), n);
                if (-1 === u) {
                  if (jr(s)) return !1;
                  o = !0;
                  continue;
                }
                if ('' !== c) {
                  let t;
                  t = u > i ? '' : r[u + 1].toLowerCase();
                  const e = 8 & s ? t : null;
                  if ((e && -1 !== Ir(e, c, 0)) || (2 & s && c !== t)) {
                    if (jr(s)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !jr(s) && !jr(l)) return !1;
            if (o && jr(l)) continue;
            (o = !1), (s = l | (1 & s));
          }
        }
        return jr(s) || o;
      }
      function jr(t) {
        return 0 == (1 & t);
      }
      function Fr(t, e, n, s) {
        if (null === e) return -1;
        let r = 0;
        if (s || !n) {
          let n = !1;
          for (; r < e.length; ) {
            const s = e[r];
            if (s === t) return r;
            if (3 === s || 6 === s) n = !0;
            else {
              if (1 === s || 2 === s) {
                let t = e[++r];
                for (; 'string' == typeof t; ) t = e[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const s = t[n];
              if ('number' == typeof s) return -1;
              if (s === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Vr(t, e, n = !1) {
        for (let s = 0; s < e.length; s++) if (Lr(t, e[s], n)) return !0;
        return !1;
      }
      function Mr(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const s = e[n];
          if (t.length === s.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== s[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function Ur(t, e) {
        return t ? ':not(' + e.trim() + ')' : e;
      }
      function Hr(t) {
        let e = t[0],
          n = 1,
          s = 2,
          r = '',
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ('string' == typeof o)
            if (2 & s) {
              const e = t[++n];
              r += '[' + o + (e.length > 0 ? '="' + e + '"' : '') + ']';
            } else 8 & s ? (r += '.' + o) : 4 & s && (r += ' ' + o);
          else
            '' === r || jr(o) || ((e += Ur(i, r)), (r = '')),
              (s = o),
              (i = i || !jr(s));
          n++;
        }
        return '' !== r && (e += Ur(i, r)), e;
      }
      const $r = {};
      function Br(t) {
        qr(Oe(), ke(), Je() + t, Le());
      }
      function qr(t, e, n, s) {
        if (!s)
          if (3 == (3 & e[2])) {
            const s = t.preOrderCheckHooks;
            null !== s && nn(e, s, n);
          } else {
            const s = t.preOrderHooks;
            null !== s && sn(e, s, 0, n);
          }
        Xe(n);
      }
      function zr(t, e) {
        return (t << 17) | (e << 2);
      }
      function Wr(t) {
        return (t >> 17) & 32767;
      }
      function Qr(t) {
        return 2 | t;
      }
      function Kr(t) {
        return (131068 & t) >> 2;
      }
      function Gr(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Zr(t) {
        return 1 | t;
      }
      function Yr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) {
            const r = n[s],
              i = n[s + 1];
            if (-1 !== i) {
              const n = t.data[i];
              Be(r), n.contentQueries(2, e[i], i);
            }
          }
      }
      function Jr(t, e, n, s, r, i, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | s),
          Ee(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Xr(t, e, n, s, r) {
        let i = t.data[e];
        if (null === i)
          (i = (function (t, e, n, s, r) {
            const i = Re(),
              o = Ne(),
              a = (t.data[e] = (function (t, e, n, s, r, i) {
                return {
                  type: n,
                  index: s,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, e, s, r));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            );
          })(t, e, n, s, r)),
            xe.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = s), (i.attrs = r);
          const t = (function () {
            const t = xe.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return Pe(i, !0), i;
      }
      function ti(t, e, n, s) {
        if (0 === n) return -1;
        const r = e.length;
        for (let i = 0; i < n; i++)
          e.push(s), t.blueprint.push(s), t.data.push(null);
        return r;
      }
      function ei(t, e, n) {
        We(e);
        try {
          const s = t.viewQuery;
          null !== s && Ii(1, s, n);
          const r = t.template;
          null !== r && ri(t, e, r, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Yr(t, e),
            t.staticViewQueries && Ii(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Ti(t, e[n]);
            })(e, i);
        } catch (s) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), s);
        } finally {
          (e[2] &= -5), Ye();
        }
      }
      function ni(t, e, n, s) {
        const r = e[2];
        if (256 == (256 & r)) return;
        We(e);
        const i = Le();
        try {
          Ee(e),
            (xe.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && ri(t, e, n, 2, s);
          const o = 3 == (3 & r);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && nn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && sn(e, n, 0, null), rn(e, 0);
            }
          if (
            ((function (t) {
              for (let e = ir(t); null !== e; e = or(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    s = n[3];
                  0 == (1024 & n[2]) && Te(s, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = ir(t); null !== e; e = or(e))
                for (let t = Jt; t < e.length; t++) {
                  const n = e[t],
                    s = n[1];
                  Se(n) && ni(s, n, s.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Yr(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && nn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && sn(e, n, 1), rn(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const s = n[t];
                  if (s < 0) Xe(~s);
                  else {
                    const r = s,
                      i = n[++t],
                      o = n[++t];
                    Ue(i, r), o(2, e[r]);
                  }
                }
              } finally {
                Xe(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Ci(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && Ii(2, l, s), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && nn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && sn(e, n, 2), rn(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Te(e[3], -1));
        } finally {
          Ye();
        }
      }
      function si(t, e, n, s) {
        const r = e[10],
          i = !Le(),
          o = we(e);
        try {
          i && !o && r.begin && r.begin(), o && ei(t, e, s), ni(t, e, n, s);
        } finally {
          i && !o && r.end && r.end();
        }
      }
      function ri(t, e, n, s, r) {
        const i = Je(),
          o = 2 & s;
        try {
          Xe(-1), o && e.length > Yt && qr(t, e, Yt, Le()), n(s, r);
        } finally {
          Xe(i);
        }
      }
      function ii(t, e, n) {
        if (ee(e)) {
          const s = e.directiveEnd;
          for (let r = e.directiveStart; r < s; r++) {
            const e = t.data[r];
            e.contentQueries && e.contentQueries(1, n[r], r);
          }
        }
      }
      function oi(t, e, n) {
        Ae() &&
          ((function (t, e, n, s) {
            const r = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || wn(n, e), Qs(s, e);
            const o = n.initialInputs;
            for (let a = r; a < i; a++) {
              const s = t.data[a],
                i = re(s);
              i && vi(e, n, s);
              const l = Nn(e, t, a, n);
              Qs(l, e),
                null !== o && bi(0, a - r, l, s, 0, o),
                i && (be(n.index, e)[8] = l);
            }
          })(t, e, n, ye(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const s = n.directiveStart,
                r = n.directiveEnd,
                i = n.index,
                o = xe.lFrame.currentDirectiveIndex;
              try {
                Xe(i);
                for (let n = s; n < r; n++) {
                  const s = t.data[n],
                    r = e[n];
                  He(n),
                    (null === s.hostBindings &&
                      0 === s.hostVars &&
                      null === s.hostAttrs) ||
                      fi(s, r);
                }
              } finally {
                Xe(-1), He(o);
              }
            })(t, e, n));
      }
      function ai(t, e, n = ye) {
        const s = e.localNames;
        if (null !== s) {
          let r = e.index + 1;
          for (let i = 0; i < s.length; i += 2) {
            const o = s[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[r++] = a;
          }
        }
      }
      function li(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = ci(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function ci(t, e, n, s, r, i, o, a, l, c) {
        const u = Yt + s,
          h = u + r,
          d = (function (t, e) {
            const n = [];
            for (let s = 0; s < e; s++) n.push(s < t ? null : $r);
            return n;
          })(u, h),
          p = 'function' == typeof c ? c() : c;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function ui(t, e, n, s) {
        const r = Pi(e);
        null === n
          ? r.push(s)
          : (r.push(n), t.firstCreatePass && Ni(t).push(s, r.length - 1));
      }
      function hi(t, e, n) {
        for (let s in t)
          if (t.hasOwnProperty(s)) {
            const r = t[s];
            (n = null === n ? {} : n).hasOwnProperty(s)
              ? n[s].push(e, r)
              : (n[s] = [e, r]);
          }
        return n;
      }
      function di(t, e, n, s) {
        let r = !1;
        if (Ae()) {
          const i = (function (t, e, n) {
              const s = t.directiveRegistry;
              let r = null;
              if (s)
                for (let i = 0; i < s.length; i++) {
                  const o = s[i];
                  Vr(n, o.selectors, !1) &&
                    (r || (r = []),
                    Tn(wn(n, e), t, o.type),
                    re(o) ? (gi(t, n), r.unshift(o)) : r.push(o));
                }
              return r;
            })(t, e, n),
            o = null === s ? null : { '': -1 };
          if (null !== i) {
            (r = !0), yi(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            let s = !1,
              a = !1,
              l = ti(t, e, i.length, null);
            for (let r = 0; r < i.length; r++) {
              const c = i[r];
              (n.mergedAttrs = pn(n.mergedAttrs, c.hostAttrs)),
                _i(t, n, e, l, c),
                mi(l, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const u = c.type.prototype;
              !s &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (s = !0)),
                a ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (a = !0)),
                l++;
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                s = t.data,
                r = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = s[l],
                  n = t.inputs,
                  c = null === r || Nr(e) ? null : wi(n, r);
                i.push(c), (o = hi(n, l, o)), (a = hi(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty('class') && (e.flags |= 16),
                o.hasOwnProperty('style') && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const s = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const r = n[e[t + 1]];
                  if (null == r)
                    throw new it(
                      '301',
                      `Export of name '${e[t + 1]}' not found!`
                    );
                  s.push(e[t], r);
                }
              }
            })(n, s, o);
        }
        return (n.mergedAttrs = pn(n.mergedAttrs, n.attrs)), r;
      }
      function pi(t, e, n, s, r, i) {
        const o = i.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const i = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ('number' == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(s, r, o);
        }
      }
      function fi(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function gi(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function mi(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let s = 0; s < e.exportAs.length; s++) n[e.exportAs[s]] = t;
          re(e) && (n[''] = t);
        }
      }
      function yi(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function _i(t, e, n, s, r) {
        t.data[s] = r;
        const i = r.factory || (r.factory = ie(r.type)),
          o = new cn(i, re(r), null);
        (t.blueprint[s] = o),
          (n[s] = o),
          pi(t, e, 0, s, ti(t, n, r.hostVars, $r), r);
      }
      function vi(t, e, n) {
        const s = ye(e, t),
          r = li(n),
          i = t[10],
          o = xi(
            t,
            Jr(
              t,
              r,
              null,
              n.onPush ? 64 : 16,
              s,
              e,
              i,
              i.createRenderer(s, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function bi(t, e, n, s, r, i) {
        const o = i[e];
        if (null !== o) {
          const t = s.setInput;
          for (let e = 0; e < o.length; ) {
            const r = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? s.setInput(n, a, r, i) : (n[i] = a);
          }
        }
      }
      function wi(t, e) {
        let n = null,
          s = 0;
        for (; s < e.length; ) {
          const r = e[s];
          if (0 !== r)
            if (5 !== r) {
              if ('number' == typeof r) break;
              t.hasOwnProperty(r) &&
                (null === n && (n = []), n.push(r, t[r], e[s + 1])),
                (s += 2);
            } else s += 2;
          else s += 4;
        }
        return n;
      }
      function Si(t, e, n, s) {
        return new Array(t, !0, !1, e, null, 0, s, n, null, null);
      }
      function Ci(t, e) {
        const n = be(e, t);
        if (Se(n)) {
          const t = n[1];
          80 & n[2] ? ni(t, n, t.template, n[8]) : n[5] > 0 && Ei(n);
        }
      }
      function Ei(t) {
        for (let n = ir(t); null !== n; n = or(n))
          for (let t = Jt; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              ni(t, e, t.template, e[8]);
            } else e[5] > 0 && Ei(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const s = be(e[n], t);
            Se(s) && s[5] > 0 && Ei(s);
          }
      }
      function Ti(t, e) {
        const n = be(e, t),
          s = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(s, n),
          ei(s, n, n[8]);
      }
      function xi(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Ai(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = rr(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e;
        }
        return null;
      }
      function ki(t, e, n) {
        const s = e[10];
        s.begin && s.begin();
        try {
          ni(t, e, t.template, n);
        } catch (r) {
          throw (Di(e, r), r);
        } finally {
          s.end && s.end();
        }
      }
      function Oi(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              s = Ks(n),
              r = s[1];
            si(r, s, r.template, n);
          }
        })(t[8]);
      }
      function Ii(t, e, n) {
        Be(0), e(t, n);
      }
      const Ri = (() => Promise.resolve(null))();
      function Pi(t) {
        return t[7] || (t[7] = []);
      }
      function Ni(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Di(t, e) {
        const n = t[9],
          s = n ? n.get(Js, null) : null;
        s && s.handleError(e);
      }
      function Li(t, e, n, s, r) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, r, s, a) : (l[a] = r);
        }
      }
      function ji(t, e, n) {
        let s = n ? t.styles : null,
          r = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            'number' == typeof t
              ? (i = t)
              : 1 == i
              ? (r = tt(r, t))
              : 2 == i && (s = tt(s, t + ': ' + e[++o] + ';'));
          }
        n ? (t.styles = s) : (t.stylesWithoutHost = s),
          n ? (t.classes = r) : (t.classesWithoutHost = r);
      }
      const Fi = new Hn('INJECTOR', -1);
      class Vi {
        get(t, e = Jn) {
          if (e === Jn) {
            const e = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw ((e.name = 'NullInjectorError'), e);
          }
          return e;
        }
      }
      const Mi = new Hn('Set Injector scope.'),
        Ui = {},
        Hi = {};
      let $i;
      function Bi() {
        return void 0 === $i && ($i = new Vi()), $i;
      }
      function qi(t, e = null, n = null, s) {
        return new zi(t, n, e || Bi(), s);
      }
      class zi {
        constructor(t, e, n, s = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const r = [];
          e && zn(e, (n) => this.processProvider(n, t, e)),
            zn([t], (t) => this.processInjectorType(t, [], r)),
            this.records.set(Fi, Ki(void 0, this));
          const i = this.records.get(Mi);
          (this.scope = null != i ? i.value : null),
            (this.source = s || ('object' == typeof t ? null : X(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Jn, n = vt.Default) {
          this.assertNotDestroyed();
          const s = ss(this);
          try {
            if (!(n & vt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ('function' == typeof (r = t) ||
                    ('object' == typeof r && r instanceof Hn)) &&
                  dt(t);
                (e = n && this.injectableDefInScope(n) ? Ki(Wi(t), Ui) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & vt.Self ? Bi() : this.parent).get(
              t,
              (e = n & vt.Optional && e === Jn ? null : e)
            );
          } catch (i) {
            if ('NullInjectorError' === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(X(t)), s)
              )
                throw i;
              return (function (t, e, n, s) {
                const r = t.ngTempTokenPath;
                throw (
                  (e[ts] && r.unshift(e[ts]),
                  (t.message = (function (t, e, n, s = null) {
                    t =
                      t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let r = X(e);
                    if (Array.isArray(e)) r = e.map(X).join(' -> ');
                    else if ('object' == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let s = e[n];
                          t.push(
                            n +
                              ':' +
                              ('string' == typeof s ? JSON.stringify(s) : X(s))
                          );
                        }
                      r = `{${t.join(', ')}}`;
                    }
                    return `${n}${s ? '(' + s + ')' : ''}[${r}]: ${t.replace(
                      Xn,
                      '\n  '
                    )}`;
                  })('\n' + t.message, r, n, s)),
                  (t.ngTokenPath = r),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, 'R3InjectorError', this.source);
            }
            throw i;
          } finally {
            ss(s);
          }
          var r;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(X(n))),
            `R3Injector[${t.join(', ')}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error('Injector has already been destroyed.');
        }
        processInjectorType(t, e, n) {
          if (!(t = st(t))) return !1;
          let s = ft(t);
          const r = (null == s && t.ngModule) || void 0,
            i = void 0 === r ? t : r,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== r && (s = ft(r)), null == s)) return !1;
          if (null != s.imports && !o) {
            let t;
            n.push(i);
            try {
              zn(s.imports, (s) => {
                this.processInjectorType(s, e, n) &&
                  (void 0 === t && (t = []), t.push(s));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: s } = t[e];
                zn(s, (t) => this.processProvider(t, n, s || Pt));
              }
          }
          this.injectorDefTypes.add(i);
          const a = ie(i) || (() => new i());
          this.records.set(i, Ki(a, Ui));
          const l = s.providers;
          if (null != l && !o) {
            const e = t;
            zn(l, (t) => this.processProvider(t, e, l));
          }
          return void 0 !== r && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let s = Zi((t = st(t))) ? t : st(t && t.provide);
          const r = (function (t, e, n) {
            return Gi(t) ? Ki(void 0, t.useValue) : Ki(Qi(t), Ui);
          })(t);
          if (Zi(t) || !0 !== t.multi) this.records.get(s);
          else {
            let e = this.records.get(s);
            e ||
              ((e = Ki(void 0, Ui, !0)),
              (e.factory = () => as(e.multi)),
              this.records.set(s, e)),
              (s = t),
              e.multi.push(t);
          }
          this.records.set(s, r);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Ui && ((e.value = Hi), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              'object' == typeof n &&
              'function' == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = st(t.providedIn);
          return 'string' == typeof e
            ? 'any' === e || e === this.scope
            : this.injectorDefTypes.has(e);
        }
      }
      function Wi(t) {
        const e = dt(t),
          n = null !== e ? e.factory : ie(t);
        if (null !== n) return n;
        if (t instanceof Hn)
          throw new Error(`Token ${X(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = Kn(e, '?');
              throw new Error(
                `Can't resolve all parameters for ${X(t)}: (${n.join(', ')}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[gt] || t[yt]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty('name')) return t.name;
                  const e = ('' + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? '' : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error('unreachable');
      }
      function Qi(t, e, n) {
        let s;
        if (Zi(t)) {
          const e = st(t);
          return ie(e) || Wi(e);
        }
        if (Gi(t)) s = () => st(t.useValue);
        else if ((r = t) && r.useFactory)
          s = () => t.useFactory(...as(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          s = () => is(st(t.useExisting));
        else {
          const e = st(t && (t.useClass || t.provide));
          if (
            !(function (t) {
              return !!t.deps;
            })(t)
          )
            return ie(e) || Wi(e);
          s = () => new e(...as(t.deps));
        }
        var r;
        return s;
      }
      function Ki(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Gi(t) {
        return null !== t && 'object' == typeof t && es in t;
      }
      function Zi(t) {
        return 'function' == typeof t;
      }
      const Yi = function (t, e, n) {
        return (function (t, e = null, n = null, s) {
          const r = qi(t, e, n, s);
          return r._resolveInjectorDefTypes(), r;
        })({ name: n }, e, t, n);
      };
      class Ji {
        static create(t, e) {
          return Array.isArray(t)
            ? Yi(t, e, '')
            : Yi(t.providers, t.parent, t.name || '');
        }
      }
      function Xi(t, e) {
        en(Ks(t)[1], Ie());
      }
      function to(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const s = [t];
        for (; e; ) {
          let r;
          if (re(t)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error('Directives cannot inherit Components');
            r = e.ɵdir;
          }
          if (r) {
            if (n) {
              s.push(r);
              const e = t;
              (e.inputs = eo(t.inputs)),
                (e.declaredInputs = eo(t.declaredInputs)),
                (e.outputs = eo(t.outputs));
              const n = r.hostBindings;
              n && ro(t, n);
              const i = r.viewQuery,
                o = r.contentQueries;
              if (
                (i && no(t, i),
                o && so(t, o),
                J(t.inputs, r.inputs),
                J(t.declaredInputs, r.declaredInputs),
                J(t.outputs, r.outputs),
                re(r) && r.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(r.data.animation);
              }
            }
            const e = r.features;
            if (e)
              for (let s = 0; s < e.length; s++) {
                const r = e[s];
                r && r.ngInherit && r(t), r === to && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let s = t.length - 1; s >= 0; s--) {
            const r = t[s];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = pn(r.hostAttrs, (n = pn(n, r.hostAttrs))));
          }
        })(s);
      }
      function eo(t) {
        return t === Rt ? {} : t === Pt ? [] : t;
      }
      function no(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, s) => {
              e(t, s), n(t, s);
            }
          : e;
      }
      function so(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, s, r) => {
              e(t, s, r), n(t, s, r);
            }
          : e;
      }
      function ro(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, s) => {
              e(t, s), n(t, s);
            }
          : e;
      }
      (Ji.THROW_IF_NOT_FOUND = Jn),
        (Ji.NULL = new Vi()),
        (Ji.ɵprov = ct({
          token: Ji,
          providedIn: 'any',
          factory: () => is(Fi),
        })),
        (Ji.__NG_ELEMENT_ID__ = -1);
      let io = null;
      function oo() {
        if (!io) {
          const t = It.Symbol;
          if (t && t.iterator) io = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              'entries' !== n &&
                'size' !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (io = n);
            }
          }
        }
        return io;
      }
      class ao {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new ao(t);
        }
        static unwrap(t) {
          return ao.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof ao;
        }
      }
      function lo(t) {
        return (
          !!co(t) && (Array.isArray(t) || (!(t instanceof Map) && oo() in t))
        );
      }
      function co(t) {
        return null !== t && ('function' == typeof t || 'object' == typeof t);
      }
      function uo(t, e, n) {
        return (t[e] = n);
      }
      function ho(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function po(t, e, n, s) {
        const r = ho(t, e, n);
        return ho(t, e + 1, s) || r;
      }
      function fo(t, e, n, s, r, i) {
        const o = po(t, e, n, s);
        return po(t, e + 2, r, i) || o;
      }
      function go(t, e, n, s) {
        const r = ke();
        return (
          ho(r, Ve(), e) &&
            (Oe(),
            (function (t, e, n, s, r, i) {
              const o = ye(t, e);
              !(function (t, e, n, s, r, i, o) {
                if (null == i)
                  pe(t) ? t.removeAttribute(e, r, n) : e.removeAttribute(r);
                else {
                  const a = null == o ? ot(i) : o(i, s || '', r);
                  pe(t)
                    ? t.setAttribute(e, r, a, n)
                    : n
                    ? e.setAttributeNS(n, r, a)
                    : e.setAttribute(r, a);
                }
              })(e[11], o, i, t.value, n, s, r);
            })(tn(), r, t, e, n, s)),
          go
        );
      }
      function mo(t, e, n, s, r, i, o, a) {
        const l = ke(),
          c = Oe(),
          u = t + Yt,
          h = c.firstCreatePass
            ? (function (t, e, n, s, r, i, o, a, l) {
                const c = e.consts,
                  u = Xr(e, t, 4, o || null, Ce(c, a));
                di(e, n, u, Ce(c, l)), en(e, u);
                const h = (u.tViews = ci(
                  2,
                  u,
                  s,
                  r,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  c
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, e, n, s, r, i, o)
            : c.data[u];
        Pe(h, !1);
        const d = l[11].createComment('');
        wr(c, l, d, h),
          Qs(d, l),
          xi(l, (l[u] = Si(d, l, d, h))),
          se(h) && oi(c, l, h),
          null != o && ai(l, h, a);
      }
      function yo(t, e = vt.Default) {
        const n = ke();
        return null === n ? is(t, e) : kn(Ie(), n, st(t), e);
      }
      function _o(t, e, n) {
        const s = ke();
        return (
          ho(s, Ve(), e) &&
            (function (t, e, n, s, r, i, o, a) {
              const l = ye(e, n);
              let c,
                u = e.inputs;
              var h;
              null != u && (c = u[s])
                ? (Li(t, n, c, s, r),
                  ne(e) &&
                    (function (t, e) {
                      const n = be(e, t);
                      16 & n[2] || (n[2] |= 64);
                    })(n, e.index))
                : 3 & e.type &&
                  ((s =
                    'class' === (h = s)
                      ? 'className'
                      : 'for' === h
                      ? 'htmlFor'
                      : 'formaction' === h
                      ? 'formAction'
                      : 'innerHtml' === h
                      ? 'innerHTML'
                      : 'readonly' === h
                      ? 'readOnly'
                      : 'tabindex' === h
                      ? 'tabIndex'
                      : h),
                  (r = null != o ? o(r, e.value || '', s) : r),
                  pe(i)
                    ? i.setProperty(l, s, r)
                    : dn(s) ||
                      (l.setProperty ? l.setProperty(s, r) : (l[s] = r)));
            })(Oe(), tn(), s, t, e, s[11], n),
          _o
        );
      }
      function vo(t, e, n, s, r) {
        const i = r ? 'class' : 'style';
        Li(t, n, e.inputs[i], i, s);
      }
      function bo(t, e, n, s) {
        const r = ke(),
          i = Oe(),
          o = Yt + t,
          a = r[11],
          l = (r[o] = cr(a, e, xe.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function (t, e, n, s, r, i, o) {
                const a = e.consts,
                  l = Xr(e, t, 2, r, Ce(a, i));
                return (
                  di(e, n, l, Ce(a, o)),
                  null !== l.attrs && ji(l, l.attrs, !1),
                  null !== l.mergedAttrs && ji(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(o, i, r, 0, e, n, s)
            : i.data[o];
        Pe(c, !0);
        const u = c.mergedAttrs;
        null !== u && un(a, l, u);
        const h = c.classes;
        null !== h && Or(a, l, h);
        const d = c.styles;
        null !== d && kr(a, l, d),
          64 != (64 & c.flags) && wr(i, r, l, c),
          0 === xe.lFrame.elementDepthCount && Qs(l, r),
          xe.lFrame.elementDepthCount++,
          se(c) && (oi(i, r, c), ii(i, c, r)),
          null !== s && ai(r, c);
      }
      function wo() {
        let t = Ie();
        Ne() ? De() : ((t = t.parent), Pe(t, !1));
        const e = t;
        xe.lFrame.elementDepthCount--;
        const n = Oe();
        n.firstCreatePass && (en(n, t), ee(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            vo(n, e, ke(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            vo(n, e, ke(), e.stylesWithoutHost, !1);
      }
      function So(t, e, n, s) {
        bo(t, e, n, s), wo();
      }
      function Co(t, e, n) {
        const s = ke(),
          r = Oe(),
          i = t + Yt,
          o = r.firstCreatePass
            ? (function (t, e, n, s, r) {
                const i = e.consts,
                  o = Ce(i, s),
                  a = Xr(e, t, 8, 'ng-container', o);
                return (
                  null !== o && ji(a, o, !0),
                  di(e, n, a, Ce(i, r)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(i, r, s, e, n)
            : r.data[i];
        Pe(o, !0);
        const a = (s[i] = s[11].createComment(''));
        wr(r, s, a, o),
          Qs(a, s),
          se(o) && (oi(r, s, o), ii(r, o, s)),
          null != n && ai(s, o);
      }
      function Eo() {
        let t = Ie();
        const e = Oe();
        Ne() ? De() : ((t = t.parent), Pe(t, !1)),
          e.firstCreatePass && (en(e, t), ee(t) && e.queries.elementEnd(t));
      }
      function To(t) {
        return !!t && 'function' == typeof t.then;
      }
      function xo(t) {
        return !!t && 'function' == typeof t.subscribe;
      }
      const Ao = xo;
      function ko(t, e, n, s) {
        const r = ke(),
          i = Oe(),
          o = Ie();
        return (
          (function (t, e, n, s, r, i, o, a) {
            const l = se(s),
              c = t.firstCreatePass && Ni(t),
              u = Pi(e);
            let h = !0;
            if (3 & s.type || a) {
              const d = ye(s, e),
                p = a ? a(d) : d,
                f = u.length,
                g = a ? (t) => a(ge(t[s.index])) : s.index;
              if (pe(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (t, e, n, s) {
                      const r = t.cleanup;
                      if (null != r)
                        for (let i = 0; i < r.length - 1; i += 2) {
                          const t = r[i];
                          if (t === n && r[i + 1] === s) {
                            const t = e[7],
                              n = r[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          'string' == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, r, s.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = Io(s, e, 0, i, !1);
                  const t = n.listen(p, r, i);
                  u.push(i, t), c && c.push(r, g, f, f + 1);
                }
              } else
                (i = Io(s, e, 0, i, !0)),
                  p.addEventListener(r, i, o),
                  u.push(i),
                  c && c.push(r, g, f, o);
            } else i = Io(s, e, 0, i, !1);
            const d = s.outputs;
            let p;
            if (h && null !== d && (p = d[r])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = u.length;
                  u.push(i, t), c && c.push(r, s.index, o, -(o + 1));
                }
            }
          })(i, r, r[11], o, t, e, !!n, s),
          ko
        );
      }
      function Oo(t, e, n, s) {
        try {
          return !1 !== n(s);
        } catch (r) {
          return Di(t, r), !1;
        }
      }
      function Io(t, e, n, s, r) {
        return function n(i) {
          if (i === Function) return s;
          const o = 2 & t.flags ? be(t.index, e) : e;
          0 == (32 & e[2]) && Ai(o);
          let a = Oo(e, 0, s, i),
            l = n.__ngNextListenerFn__;
          for (; l; ) (a = Oo(e, 0, l, i) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function Ro(t = 1) {
        return (function (t) {
          return (xe.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, xe.lFrame.contextLView))[8];
        })(t);
      }
      function Po(t, e) {
        let n = null;
        const s = (function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let r = 0; r < e.length; r++) {
          const i = e[r];
          if ('*' !== i) {
            if (null === s ? Vr(t, i, !0) : Mr(s, i)) return r;
          } else n = r;
        }
        return n;
      }
      function No(t) {
        const e = ke()[16][6];
        if (!e.projection) {
          const n = (e.projection = Kn(t ? t.length : 1, null)),
            s = n.slice();
          let r = e.child;
          for (; null !== r; ) {
            const e = t ? Po(r, t) : 0;
            null !== e &&
              (s[e] ? (s[e].projectionNext = r) : (n[e] = r), (s[e] = r)),
              (r = r.next);
          }
        }
      }
      function Do(t, e = 0, n) {
        const s = ke(),
          r = Oe(),
          i = Xr(r, Yt + t, 16, null, n || null);
        null === i.projection && (i.projection = e),
          De(),
          64 != (64 & i.flags) &&
            (function (t, e, n) {
              Ar(e[11], 0, e, n, fr(t, n, e), vr(n.parent || e[6], n, e));
            })(r, s, i);
      }
      function Lo(t, e, n, s, r) {
        const i = t[n + 1],
          o = null === e;
        let a = s ? Wr(i) : Kr(i),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          jo(t[a], e) && ((l = !0), (t[a + 1] = s ? Zr(n) : Qr(n))),
            (a = s ? Wr(n) : Kr(n));
        }
        l && (t[n + 1] = s ? Qr(i) : Zr(i));
      }
      function jo(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || 'string' != typeof e) && Yn(t, e) >= 0)
        );
      }
      const Fo = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Vo(t) {
        return t.substring(Fo.key, Fo.keyEnd);
      }
      function Mo(t, e) {
        const n = Fo.textEnd;
        return n === e
          ? -1
          : ((e = Fo.keyEnd = (function (t, e, n) {
              for (; e < n && t.charCodeAt(e) > 32; ) e++;
              return e;
            })(t, (Fo.key = e), n)),
            Uo(t, e, n));
      }
      function Uo(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function Ho(t, e) {
        return (
          (function (t, e, n, s) {
            const r = ke(),
              i = Oe(),
              o = Me(2);
            i.firstUpdatePass && zo(i, t, o, true),
              e !== $r &&
                ho(r, o, e) &&
                Ko(
                  i,
                  i.data[Je()],
                  r,
                  r[11],
                  t,
                  (r[o + 1] = (function (t, e) {
                    return (
                      null == t || ('object' == typeof t && (t = X(bs(t)))), t
                    );
                  })(e)),
                  true,
                  o
                );
          })(t, e),
          Ho
        );
      }
      function $o(t) {
        !(function (t, e, n, s) {
          const r = Oe(),
            i = Me(2);
          r.firstUpdatePass && zo(r, null, i, s);
          const o = ke();
          if (n !== $r && ho(o, i, n)) {
            const a = r.data[Je()];
            if (Yo(a, s) && !qo(r, i)) {
              let t = a.classesWithoutHost;
              null !== t && (n = tt(t, n || '')), vo(r, a, o, n, s);
            } else
              !(function (t, e, n, s, r, i, o, a) {
                r === $r && (r = Pt);
                let l = 0,
                  c = 0,
                  u = 0 < r.length ? r[0] : null,
                  h = 0 < i.length ? i[0] : null;
                for (; null !== u || null !== h; ) {
                  const o = l < r.length ? r[l + 1] : void 0,
                    d = c < i.length ? i[c + 1] : void 0;
                  let p,
                    f = null;
                  u === h
                    ? ((l += 2), (c += 2), o !== d && ((f = h), (p = d)))
                    : null === h || (null !== u && u < h)
                    ? ((l += 2), (f = u))
                    : ((c += 2), (f = h), (p = d)),
                    null !== f && Ko(t, e, n, s, f, p, true, a),
                    (u = l < r.length ? r[l] : null),
                    (h = c < i.length ? i[c] : null);
                }
              })(
                r,
                a,
                o,
                o[11],
                o[i + 1],
                (o[i + 1] = (function (t, e, n) {
                  if (null == n || '' === n) return Pt;
                  const s = [],
                    r = bs(n);
                  if (Array.isArray(r))
                    for (let i = 0; i < r.length; i++) t(s, r[i], !0);
                  else if ('object' == typeof r)
                    for (const i in r) r.hasOwnProperty(i) && t(s, i, r[i]);
                  else 'string' == typeof r && e(s, r);
                  return s;
                })(t, e, n)),
                0,
                i
              );
          }
        })(Gn, Bo, t, !0);
      }
      function Bo(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (Fo.key = 0),
                  (Fo.keyEnd = 0),
                  (Fo.value = 0),
                  (Fo.valueEnd = 0),
                  (Fo.textEnd = t.length);
              })(t),
              Mo(t, Uo(t, 0, Fo.textEnd))
            );
          })(e);
          n >= 0;
          n = Mo(e, n)
        )
          Gn(t, Vo(e), !0);
      }
      function qo(t, e) {
        return e >= t.expandoStartIndex;
      }
      function zo(t, e, n, s) {
        const r = t.data;
        if (null === r[n + 1]) {
          const i = r[Je()],
            o = qo(t, n);
          Yo(i, s) && null === e && !o && (e = !1),
            (e = (function (t, e, n, s) {
              const r = (function (t) {
                const e = xe.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let i = s ? e.residualClasses : e.residualStyles;
              if (null === r)
                0 === (s ? e.classBindings : e.styleBindings) &&
                  ((n = Qo((n = Wo(null, t, e, n, s)), e.attrs, s)),
                  (i = null));
              else {
                const o = e.directiveStylingLast;
                if (-1 === o || t[o] !== r)
                  if (((n = Wo(r, t, e, n, s)), null === i)) {
                    let n = (function (t, e, n) {
                      const s = n ? e.classBindings : e.styleBindings;
                      if (0 !== Kr(s)) return t[Wr(s)];
                    })(t, e, s);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = Wo(null, t, e, n[1], s)),
                      (n = Qo(n, e.attrs, s)),
                      (function (t, e, n, s) {
                        t[Wr(n ? e.classBindings : e.styleBindings)] = s;
                      })(t, e, s, n));
                  } else
                    i = (function (t, e, n) {
                      let s;
                      const r = e.directiveEnd;
                      for (let i = 1 + e.directiveStylingLast; i < r; i++)
                        s = Qo(s, t[i].hostAttrs, n);
                      return Qo(s, e.attrs, n);
                    })(t, e, s);
              }
              return (
                void 0 !== i &&
                  (s ? (e.residualClasses = i) : (e.residualStyles = i)),
                n
              );
            })(r, i, e, s)),
            (function (t, e, n, s, r, i) {
              let o = i ? e.classBindings : e.styleBindings,
                a = Wr(o),
                l = Kr(o);
              t[s] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const t = n;
                (c = t[1]), (null === c || Yn(t, c) > 0) && (u = !0);
              } else c = n;
              if (r)
                if (0 !== l) {
                  const e = Wr(t[a + 1]);
                  (t[s + 1] = zr(e, a)),
                    0 !== e && (t[e + 1] = Gr(t[e + 1], s)),
                    (t[a + 1] = (131071 & t[a + 1]) | (s << 17));
                } else
                  (t[s + 1] = zr(a, 0)),
                    0 !== a && (t[a + 1] = Gr(t[a + 1], s)),
                    (a = s);
              else
                (t[s + 1] = zr(l, 0)),
                  0 === a ? (a = s) : (t[l + 1] = Gr(t[l + 1], s)),
                  (l = s);
              u && (t[s + 1] = Qr(t[s + 1])),
                Lo(t, c, s, !0),
                Lo(t, c, s, !1),
                (function (t, e, n, s, r) {
                  const i = r ? t.residualClasses : t.residualStyles;
                  null != i &&
                    'string' == typeof e &&
                    Yn(i, e) >= 0 &&
                    (n[s + 1] = Zr(n[s + 1]));
                })(e, c, t, s, i),
                (o = zr(a, l)),
                i ? (e.classBindings = o) : (e.styleBindings = o);
            })(r, i, e, n, o, s);
        }
      }
      function Wo(t, e, n, s, r) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (s = Qo(s, i.hostAttrs, r)), i !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), s;
      }
      function Qo(t, e, n) {
        const s = n ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            'number' == typeof o
              ? (r = o)
              : r === s &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ['', t]),
                Gn(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function Ko(t, e, n, s, r, i, o, a) {
        if (!(3 & e.type)) return;
        const l = t.data,
          c = l[a + 1];
        Zo(1 == (1 & c) ? Go(l, e, n, r, Kr(c), o) : void 0) ||
          (Zo(i) || (2 == (2 & c) && (i = Go(l, null, n, r, a, o))),
          (function (t, e, n, s, r) {
            const i = pe(t);
            if (e)
              r
                ? i
                  ? t.addClass(n, s)
                  : n.classList.add(s)
                : i
                ? t.removeClass(n, s)
                : n.classList.remove(s);
            else {
              let e = -1 === s.indexOf('-') ? void 0 : nr.DashCase;
              if (null == r)
                i ? t.removeStyle(n, s, e) : n.style.removeProperty(s);
              else {
                const o = 'string' == typeof r && r.endsWith('!important');
                o && ((r = r.slice(0, -10)), (e |= nr.Important)),
                  i
                    ? t.setStyle(n, s, r, e)
                    : n.style.setProperty(s, r, o ? 'important' : '');
              }
            }
          })(s, o, me(Je(), n), r, i));
      }
      function Go(t, e, n, s, r, i) {
        const o = null === e;
        let a;
        for (; r > 0; ) {
          const e = t[r],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            c = null === l;
          let u = n[r + 1];
          u === $r && (u = c ? Pt : void 0);
          let h = c ? Zn(u, s) : l === s ? u : void 0;
          if ((i && !Zo(h) && (h = Zn(e, s)), Zo(h) && ((a = h), o))) return a;
          const d = t[r + 1];
          r = o ? Wr(d) : Kr(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = Zn(t, s));
        }
        return a;
      }
      function Zo(t) {
        return void 0 !== t;
      }
      function Yo(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function Jo(t, e = '') {
        const n = ke(),
          s = Oe(),
          r = t + Yt,
          i = s.firstCreatePass ? Xr(s, r, 1, e, null) : s.data[r],
          o = (n[r] = (function (t, e) {
            return pe(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        wr(s, n, o, i), Pe(i, !1);
      }
      function Xo(t) {
        return ta('', t, ''), Xo;
      }
      function ta(t, e, n) {
        const s = ke(),
          r = (function (t, e, n, s) {
            return ho(t, Ve(), n) ? e + ot(n) + s : $r;
          })(s, t, e, n);
        return (
          r !== $r &&
            (function (t, e, n) {
              const s = me(e, t);
              !(function (t, e, n) {
                pe(t) ? t.setValue(e, n) : (e.textContent = n);
              })(t[11], s, n);
            })(s, Je(), r),
          ta
        );
      }
      const ea = void 0;
      var na = [
        'en',
        [['a', 'p'], ['AM', 'PM'], ea],
        [['AM', 'PM'], ea, ea],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        ea,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        ea,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', ea, "{1} 'at' {0}", ea],
        [
          '.',
          ',',
          ';',
          '%',
          '+',
          '-',
          'E',
          '\xd7',
          '\u2030',
          '\u221e',
          'NaN',
          ':',
        ],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let sa = {};
      function ra(t) {
        return (
          t in sa ||
            (sa[t] =
              It.ng &&
              It.ng.common &&
              It.ng.common.locales &&
              It.ng.common.locales[t]),
          sa[t]
        );
      }
      var ia = (() => (
        ((ia = ia || {})[(ia.LocaleId = 0)] = 'LocaleId'),
        (ia[(ia.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (ia[(ia.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (ia[(ia.DaysFormat = 3)] = 'DaysFormat'),
        (ia[(ia.DaysStandalone = 4)] = 'DaysStandalone'),
        (ia[(ia.MonthsFormat = 5)] = 'MonthsFormat'),
        (ia[(ia.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (ia[(ia.Eras = 7)] = 'Eras'),
        (ia[(ia.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (ia[(ia.WeekendRange = 9)] = 'WeekendRange'),
        (ia[(ia.DateFormat = 10)] = 'DateFormat'),
        (ia[(ia.TimeFormat = 11)] = 'TimeFormat'),
        (ia[(ia.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (ia[(ia.NumberSymbols = 13)] = 'NumberSymbols'),
        (ia[(ia.NumberFormats = 14)] = 'NumberFormats'),
        (ia[(ia.CurrencyCode = 15)] = 'CurrencyCode'),
        (ia[(ia.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (ia[(ia.CurrencyName = 17)] = 'CurrencyName'),
        (ia[(ia.Currencies = 18)] = 'Currencies'),
        (ia[(ia.Directionality = 19)] = 'Directionality'),
        (ia[(ia.PluralCase = 20)] = 'PluralCase'),
        (ia[(ia.ExtraData = 21)] = 'ExtraData'),
        ia
      ))();
      const oa = 'en-US';
      let aa = oa;
      function la(t) {
        var e, n;
        (n = 'Expected localeId to be defined'),
          null == (e = t) &&
            (function (t, e, n, s) {
              throw new Error(
                `ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          'string' == typeof t && (aa = t.toLowerCase().replace(/_/g, '-'));
      }
      function ca(t, e, n, s, r) {
        if (((t = st(t)), Array.isArray(t)))
          for (let i = 0; i < t.length; i++) ca(t[i], e, n, s, r);
        else {
          const i = Oe(),
            o = ke();
          let a = Zi(t) ? t : st(t.provide),
            l = Qi(t);
          const c = Ie(),
            u = 1048575 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 20;
          if (Zi(t) || !t.multi) {
            const s = new cn(l, r, yo),
              p = da(a, e, r ? u : u + d, h);
            -1 === p
              ? (Tn(wn(c, o), i, a),
                ua(i, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                n.push(s),
                o.push(s))
              : ((n[p] = s), (o[p] = s));
          } else {
            const p = da(a, e, u + d, h),
              f = da(a, e, u, u + d),
              g = p >= 0 && n[p],
              m = f >= 0 && n[f];
            if ((r && !m) || (!r && !g)) {
              Tn(wn(c, o), i, a);
              const u = (function (t, e, n, s, r) {
                const i = new cn(t, n, yo);
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  ha(i, r, s && !n),
                  i
                );
              })(r ? fa : pa, n.length, r, s, l);
              !r && m && (n[f].providerFactory = u),
                ua(i, t, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                n.push(u),
                o.push(u);
            } else ua(i, t, p > -1 ? p : f, ha(n[r ? f : p], l, !r && s));
            !r && s && m && n[f].componentProviders++;
          }
        }
      }
      function ua(t, e, n, s) {
        const r = Zi(e);
        if (r || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy;
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!r && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [s, i]) : o[t + 1].push(s, i);
            } else o.push(n, i);
          }
        }
      }
      function ha(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function da(t, e, n, s) {
        for (let r = n; r < s; r++) if (e[r] === t) return r;
        return -1;
      }
      function pa(t, e, n, s) {
        return ga(this.multi, []);
      }
      function fa(t, e, n, s) {
        const r = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Nn(n, n[1], this.providerFactory.index, s);
          (i = e.slice(0, t)), ga(r, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), ga(r, i);
        return i;
      }
      function ga(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function ma(t, e = []) {
        return (n) => {
          n.providersResolver = (n, s) =>
            (function (t, e, n) {
              const s = Oe();
              if (s.firstCreatePass) {
                const r = re(t);
                ca(n, s.data, s.blueprint, r, !0),
                  ca(e, s.data, s.blueprint, r, !1);
              }
            })(n, s ? s(t) : t, e);
        };
      }
      class ya {}
      class _a {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${X(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      class va {}
      function ba(...t) {}
      function wa(t, e) {
        return new Ca(ye(t, e));
      }
      va.NULL = new _a();
      const Sa = function () {
        return wa(Ie(), ke());
      };
      let Ca = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = Sa), t;
      })();
      function Ea(t) {
        return t instanceof Ca ? t.nativeElement : t;
      }
      class Ta {}
      let xa = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Aa()), t;
      })();
      const Aa = function () {
        const t = ke(),
          e = be(Ie().index, t);
        return (function (t) {
          return t[11];
        })(Xt(e) ? e : t);
      };
      let ka = (() => {
        class t {}
        return (
          (t.ɵprov = ct({ token: t, providedIn: 'root', factory: () => null })),
          t
        );
      })();
      class Oa {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const Ia = new Oa('12.1.0');
      class Ra {
        constructor() {}
        supports(t) {
          return lo(t);
        }
        create(t) {
          return new Na(t);
        }
      }
      const Pa = (t, e) => e;
      class Na {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Pa);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            s = 0,
            r = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < Fa(n, s, r)) ? e : n,
              o = Fa(i, s, r),
              a = i.currentIndex;
            if (i === n) s--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) s++;
            else {
              r || (r = []);
              const t = o - s,
                e = a - s;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const s = n < r.length ? r[n] : (r[n] = 0),
                    i = s + n;
                  e <= i && i < t && (r[n] = s + 1);
                }
                r[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !lo(t)))
            throw new Error(
              `Error trying to diff '${X(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            s,
            r = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (s = this._trackByFn(e, n)),
                null !== r && Object.is(r.trackById, s)
                  ? (i && (r = this._verifyReinsertion(r, n, s, e)),
                    Object.is(r.item, n) || this._addIdentityChange(r, n))
                  : ((r = this._mismatch(r, n, s, e)), (i = !0)),
                (r = r._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[oo()]();
                  let s;
                  for (; !(s = n.next()).done; ) e(s.value);
                }
              })(t, (t) => {
                (s = this._trackByFn(e, t)),
                  null !== r && Object.is(r.trackById, s)
                    ? (i && (r = this._verifyReinsertion(r, t, s, e)),
                      Object.is(r.item, t) || this._addIdentityChange(r, t))
                    : ((r = this._mismatch(r, t, s, e)), (i = !0)),
                  (r = r._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, s) {
          let r;
          return (
            null === t ? (r = this._itTail) : ((r = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, r, s))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, s))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, r, s))
              : (t = this._addAfter(new Da(e, n), r, s)),
            t
          );
        }
        _verifyReinsertion(t, e, n, s) {
          let r =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== r
              ? (t = this._reinsertAfter(r, t._prev, s))
              : t.currentIndex != s &&
                ((t.currentIndex = s), this._addToMoves(t, s)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const s = t._prevRemoved,
            r = t._nextRemoved;
          return (
            null === s ? (this._removalsHead = r) : (s._nextRemoved = r),
            null === r ? (this._removalsTail = s) : (r._prevRemoved = s),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const s = null === e ? this._itHead : e._next;
          return (
            (t._next = s),
            (t._prev = e),
            null === s ? (this._itTail = t) : (s._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new ja()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ja()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Da {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class La {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class ja {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new La()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Fa(t, e, n) {
        const s = t.previousIndex;
        if (null === s) return s;
        let r = 0;
        return n && s < n.length && (r = n[s]), s + e + r;
      }
      class Va {
        constructor() {}
        supports(t) {
          return t instanceof Map || co(t);
        }
        create() {
          return new Ma();
        }
      }
      class Ma {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || co(t)))
              throw new Error(
                `Error trying to diff '${X(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const s = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, s);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const s = n._prev,
              r = n._next;
            return (
              s && (s._next = r),
              r && (r._prev = s),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new Ua(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class Ua {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Ha() {
        return new $a([new Ra()]);
      }
      let $a = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || Ha()),
              deps: [[t, new hs(), new us()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (null != e) return e;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${
                ((n = t), n.name || typeof n)
              }'`
            );
            var n;
          }
        }
        return (t.ɵprov = ct({ token: t, providedIn: 'root', factory: Ha })), t;
      })();
      function Ba() {
        return new qa([new Va()]);
      }
      let qa = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || Ba()),
              deps: [[t, new hs(), new us()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (t.ɵprov = ct({ token: t, providedIn: 'root', factory: Ba })), t;
      })();
      function za(t, e, n, s, r = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && s.push(ge(i)), te(i)))
            for (let t = Jt; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild;
              null !== n && za(e[1], e, n, s);
            }
          const o = n.type;
          if (8 & o) za(t, e, n.child, s);
          else if (32 & o) {
            const t = sr(n, e);
            let r;
            for (; (r = t()); ) s.push(r);
          } else if (16 & o) {
            const t = Cr(e, n);
            if (Array.isArray(t)) s.push(...t);
            else {
              const n = rr(e[16]);
              za(n[1], n, t, s, !0);
            }
          }
          n = r ? n.projectionNext : n.next;
        }
        return s;
      }
      class Wa {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return za(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (te(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (hr(t, n), Qn(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          dr(this._lView[1], this._lView);
        }
        onDestroy(t) {
          ui(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Ai(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          ki(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            je(!0);
            try {
              ki(t, e, n);
            } finally {
              je(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              'This view is already attached directly to the ApplicationRef!'
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            xr(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error(
              'This view is already attached to a ViewContainer!'
            );
          this._appRef = t;
        }
      }
      class Qa extends Wa {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Oi(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            je(!0);
            try {
              Oi(t);
            } finally {
              je(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Ka = function (t) {
        return (function (t, e, n) {
          if (ne(t) && !n) {
            const n = be(t.index, e);
            return new Wa(n, n);
          }
          return 47 & t.type ? new Wa(e[16], e) : null;
        })(Ie(), ke(), 16 == (16 & t));
      };
      let Ga = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Ka), t;
      })();
      const Za = [new Va()],
        Ya = new $a([new Ra()]),
        Ja = new qa(Za),
        Xa = function () {
          return sl(Ie(), ke());
        };
      let tl = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Xa), t;
      })();
      const el = tl,
        nl = class extends el {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = Jr(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null
              );
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (n[19] = s.createEmbeddedView(e)),
              ei(e, n, t),
              new Wa(n)
            );
          }
        };
      function sl(t, e) {
        return 4 & t.type ? new nl(e, t, wa(t, e)) : null;
      }
      class rl {}
      class il {}
      const ol = function () {
        return dl(Ie(), ke());
      };
      let al = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = ol), t;
      })();
      const ll = al,
        cl = class extends ll {
          constructor(t, e, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = n);
          }
          get element() {
            return wa(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new jn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = En(this._hostTNode, this._hostLView);
            if (gn(t)) {
              const e = yn(t, this._hostLView),
                n = mn(t);
              return new jn(e[1].data[n + 8], e);
            }
            return new jn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = ul(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - Jt;
          }
          createEmbeddedView(t, e, n) {
            const s = t.createEmbeddedView(e || {});
            return this.insert(s, n), s;
          }
          createComponent(t, e, n, s, r) {
            const i = n || this.parentInjector;
            if (!r && null == t.ngModule && i) {
              const t = i.get(rl, null);
              t && (r = t);
            }
            const o = t.create(i, s, void 0, r);
            return this.insert(o.hostView, e), o;
          }
          insert(t, e) {
            const n = t._lView,
              s = n[1];
            if (te(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  s = new cl(e, e[6], e[3]);
                s.detach(s.indexOf(t));
              }
            }
            const r = this._adjustIndex(e),
              i = this._lContainer;
            !(function (t, e, n, s) {
              const r = Jt + s,
                i = n.length;
              s > 0 && (n[r - 1][4] = e),
                s < i - Jt
                  ? ((e[4] = n[r]), Wn(n, Jt + s, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(s, n, i, r);
            const o = Er(r, i),
              a = n[11],
              l = _r(a, i[7]);
            return (
              null !== l &&
                (function (t, e, n, s, r, i) {
                  (s[0] = r), (s[6] = e), xr(t, s, n, 1, r, i);
                })(s, i[6], a, n, l, o),
              t.attachToViewContainerRef(),
              Wn(hl(i), r, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = ul(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = hr(this._lContainer, e);
            n && (Qn(hl(this._lContainer), e), dr(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = hr(this._lContainer, e);
            return n && null != Qn(hl(this._lContainer), e) ? new Wa(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function ul(t) {
        return t[8];
      }
      function hl(t) {
        return t[8] || (t[8] = []);
      }
      function dl(t, e) {
        let n;
        const s = e[t.index];
        if (te(s)) n = s;
        else {
          let r;
          if (8 & t.type) r = ge(s);
          else {
            const n = e[11];
            r = n.createComment('');
            const s = ye(t, e);
            gr(
              n,
              _r(n, s),
              r,
              (function (t, e) {
                return pe(t) ? t.nextSibling(e) : e.nextSibling;
              })(n, s),
              !1
            );
          }
          (e[t.index] = n = Si(s, e, r, t)), xi(e, n);
        }
        return new cl(n, t, e);
      }
      const pl = {};
      class fl extends va {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = Gt(t);
          return new yl(e, this.ngModule);
        }
      }
      function gl(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const ml = new Hn('SCHEDULER_TOKEN', {
        providedIn: 'root',
        factory: () => Xs,
      });
      class yl extends ya {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Hr).join(',')),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return gl(this.componentDef.inputs);
        }
        get outputs() {
          return gl(this.componentDef.outputs);
        }
        create(t, e, n, s) {
          const r = (s = s || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, s, r) => {
                      const i = t.get(n, pl, r);
                      return i !== pl || s === pl ? i : e.get(n, s, r);
                    },
                  };
                })(t, s.injector)
              : t,
            i = r.get(Ta, fe),
            o = r.get(ka, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || 'div',
            c = n
              ? (function (t, e, n) {
                  if (pe(t)) return t.selectRootElement(e, n === Tt.ShadowDom);
                  let s = 'string' == typeof e ? t.querySelector(e) : e;
                  return (s.textContent = ''), s;
                })(a, n, this.componentDef.encapsulation)
              : cr(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function (t) {
                    const e = t.toLowerCase();
                    return 'svg' === e
                      ? 'http://www.w3.org/2000/svg'
                      : 'math' === e
                      ? 'http://www.w3.org/1998/MathML/'
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: Xs,
              clean: Ri,
              playerHandler: null,
              flags: 0,
            },
            d = ci(0, null, null, 1, 0, null, null, null, null, null),
            p = Jr(null, d, h, u, null, null, i, a, o, r);
          let f, g;
          We(p);
          try {
            const t = (function (t, e, n, s, r, i) {
              const o = n[1];
              n[20] = t;
              const a = Xr(o, 20, 2, '#host', null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (ji(a, l, !0),
                null !== t &&
                  (un(r, t, l),
                  null !== a.classes && Or(r, t, a.classes),
                  null !== a.styles && kr(r, t, a.styles)));
              const c = s.createRenderer(t, e),
                u = Jr(
                  n,
                  li(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  s,
                  c,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Tn(wn(a, n), o, e.type), gi(o, a), yi(a, n.length, 1)),
                xi(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, p, i, a);
            if (c)
              if (n) un(a, c, ['ng-version', Ia.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let s = 1,
                    r = 2;
                  for (; s < t.length; ) {
                    let i = t[s];
                    if ('string' == typeof i)
                      2 === r
                        ? '' !== i && e.push(i, t[++s])
                        : 8 === r && n.push(i);
                    else {
                      if (!jr(r)) break;
                      r = i;
                    }
                    s++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && un(a, c, t), e && e.length > 0 && Or(a, c, e.join(' '));
              }
            if (((g = _e(d, Yt)), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const s = e[n];
                t.push(null != s ? Array.from(s) : null);
              }
            }
            (f = (function (t, e, n, s, r) {
              const i = n[1],
                o = (function (t, e, n) {
                  const s = Ie();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    _i(t, s, e, ti(t, e, 1, null), n));
                  const r = Nn(e, t, s.directiveStart, s);
                  Qs(r, e);
                  const i = ye(s, e);
                  return i && Qs(i, e), r;
                })(i, n, e);
              if (
                (s.components.push(o),
                (t[8] = o),
                r && r.forEach((t) => t(o, e)),
                e.contentQueries)
              ) {
                const t = Ie();
                e.contentQueries(1, o, t.directiveStart);
              }
              const a = Ie();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Xe(a.index),
                  pi(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  fi(e, o)),
                o
              );
            })(t, this.componentDef, p, h, [Xi])),
              ei(d, p, null);
          } finally {
            Ye();
          }
          return new _l(this.componentType, f, wa(g, p), p, g);
        }
      }
      class _l extends class {} {
        constructor(t, e, n, s, r) {
          super(),
            (this.location = n),
            (this._rootLView = s),
            (this._tNode = r),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Qa(s)),
            (this.componentType = t);
        }
        get injector() {
          return new jn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const vl = new Map();
      class bl extends rl {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new fl(this));
          const n = Zt(t),
            s = t[Ft] || null;
          s && la(s),
            (this._bootstrapComponents = er(n.bootstrap)),
            (this._r3Injector = qi(
              t,
              e,
              [
                { provide: rl, useValue: this },
                { provide: va, useValue: this.componentFactoryResolver },
              ],
              X(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = Ji.THROW_IF_NOT_FOUND, n = vt.Default) {
          return t === Ji || t === rl || t === Fi
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class wl extends il {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Zt(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const s = Zt(n, !0),
                    r = s.id;
                  null !== r &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${X(
                            e
                          )} vs ${X(e.name)}`
                        );
                    })(r, vl.get(r), n),
                    vl.set(r, n));
                  const i = er(s.imports);
                  for (const o of i) e.has(o) || (e.add(o), t(o));
                })(t);
              })(t);
        }
        create(t) {
          return new bl(this.moduleType, t);
        }
      }
      function Sl(t, e) {
        const n = t[e];
        return n === $r ? void 0 : n;
      }
      function Cl(t, e) {
        const n = Oe();
        let s;
        const r = t + Yt;
        n.firstCreatePass
          ? ((s = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const s = e[n];
                  if (t === s.name) return s;
                }
              throw new it('302', `The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[r] = s),
            s.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(r, s.onDestroy))
          : (s = n.data[r]);
        const i = s.factory || (s.factory = ie(s.type)),
          o = wt(yo);
        try {
          const t = vn(!1),
            e = i();
          return (
            vn(t),
            (function (t, e, n, s) {
              n >= t.data.length &&
                ((t.data[n] = null), (t.blueprint[n] = null)),
                (e[n] = s);
            })(n, ke(), r, e),
            e
          );
        } finally {
          wt(o);
        }
      }
      function El(t, e, n) {
        const s = t + Yt,
          r = ke(),
          i = ve(r, s);
        return (function (t, e) {
          return (
            ao.isWrapped(e) &&
              ((e = ao.unwrap(e)), (t[xe.lFrame.bindingIndex] = $r)),
            e
          );
        })(
          r,
          (function (t, e) {
            return t[1].data[e].pure;
          })(r, s)
            ? (function (t, e, n, s, r, i) {
                const o = e + n;
                return ho(t, o, r)
                  ? uo(t, o + 1, i ? s.call(i, r) : s(r))
                  : Sl(t, o + 1);
              })(r, Fe(), e, i.transform, n, i)
            : i.transform(n)
        );
      }
      function Tl(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const xl = class extends C {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          var s, r, i;
          let o = t,
            a = e || (() => null),
            l = n;
          if (t && 'object' == typeof t) {
            const e = t;
            (o = null === (s = e.next) || void 0 === s ? void 0 : s.bind(e)),
              (a = null === (r = e.error) || void 0 === r ? void 0 : r.bind(e)),
              (l =
                null === (i = e.complete) || void 0 === i ? void 0 : i.bind(e));
          }
          this.__isAsync && ((a = Tl(a)), o && (o = Tl(o)), l && (l = Tl(l)));
          const c = super.subscribe({ next: o, error: a, complete: l });
          return t instanceof h && t.add(c), c;
        }
      };
      function Al() {
        return this._results[oo()]();
      }
      class kl {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = oo(),
            n = kl.prototype;
          n[e] || (n[e] = Al);
        }
        get changes() {
          return this._changes || (this._changes = new xl());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          const n = this;
          n.dirty = !1;
          const s = qn(t);
          (this._changesDetected = !(function (t, e, n) {
            if (t.length !== e.length) return !1;
            for (let s = 0; s < t.length; s++) {
              let r = t[s],
                i = e[s];
              if ((n && ((r = n(r)), (i = n(i))), i !== r)) return !1;
            }
            return !0;
          })(n._results, s, e)) &&
            ((n._results = s),
            (n.length = s.length),
            (n.last = s[this.length - 1]),
            (n.first = s[0]));
        }
        notifyOnChanges() {
          !this._changes ||
            (!this._changesDetected && this._emitDistinctChangesOnly) ||
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      class Ol {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ol(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Il {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              s = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              s.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new Il(s);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== Hl(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Rl {
        constructor(t, e, n = null) {
          (this.predicate = t), (this.flags = e), (this.read = n);
        }
      }
      class Pl {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const s = null !== e ? e.length : 0,
              r = this.getByIndex(n).embeddedTView(t, s);
            r &&
              ((r.indexInDeclarationView = n),
              null !== e ? e.push(r) : (e = [r]));
          }
          return null !== e ? new Pl(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Nl {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Nl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let s = 0; s < n.length; s++) {
              const r = n[s];
              this.matchTNodeWithReadOption(t, e, Dl(e, r)),
                this.matchTNodeWithReadOption(t, e, Pn(e, t, r, !1, !1));
            }
          else
            n === tl
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Pn(e, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const s = this.metadata.read;
            if (null !== s)
              if (s === Ca || s === al || (s === tl && 4 & e.type))
                this.addMatch(e.index, -2);
              else {
                const n = Pn(e, t, s, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function Dl(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) if (n[s] === e) return n[s + 1];
        return null;
      }
      function Ll(t, e, n, s) {
        return -1 === n
          ? (function (t, e) {
              return 11 & t.type ? wa(t, e) : 4 & t.type ? sl(t, e) : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === Ca
                ? wa(e, t)
                : n === tl
                ? sl(e, t)
                : n === al
                ? dl(e, t)
                : void 0;
            })(t, e, s)
          : Nn(t, t[1], n, e);
      }
      function jl(t, e, n, s) {
        const r = e[19].queries[s];
        if (null === r.matches) {
          const s = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const r = i[t];
            o.push(r < 0 ? null : Ll(e, s[r], i[t + 1], n.metadata.read));
          }
          r.matches = o;
        }
        return r.matches;
      }
      function Fl(t, e, n, s) {
        const r = t.queries.getByIndex(n),
          i = r.matches;
        if (null !== i) {
          const o = jl(t, e, r, n);
          for (let t = 0; t < i.length; t += 2) {
            const n = i[t];
            if (n > 0) s.push(o[t / 2]);
            else {
              const r = i[t + 1],
                o = e[-n];
              for (let t = Jt; t < o.length; t++) {
                const e = o[t];
                e[17] === e[3] && Fl(e[1], e, r, s);
              }
              if (null !== o[9]) {
                const t = o[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  Fl(n[1], n, r, s);
                }
              }
            }
          }
        }
        return s;
      }
      function Vl(t) {
        const e = ke(),
          n = Oe(),
          s = $e();
        Be(s + 1);
        const r = Hl(n, s);
        if (t.dirty && we(e) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) t.reset([]);
          else {
            const i = r.crossesNgTemplate ? Fl(n, e, s, []) : jl(n, e, r, s);
            t.reset(i, Ea), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Ml(t, e, n, s) {
        const r = Oe();
        if (r.firstCreatePass) {
          const i = Ie();
          (function (t, e, n) {
            null === t.queries && (t.queries = new Pl()),
              t.queries.track(new Nl(e, n));
          })(r, new Rl(e, n, s), i.index),
            (function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (n.length ? n[n.length - 1] : -1) &&
                n.push(t.queries.length - 1, e);
            })(r, t),
            2 == (2 & n) && (r.staticContentQueries = !0);
        }
        !(function (t, e, n) {
          const s = new kl(4 == (4 & n));
          ui(t, e, s, s.destroy),
            null === e[19] && (e[19] = new Il()),
            e[19].queries.push(new Ol(s));
        })(r, ke(), n);
      }
      function Ul() {
        return (t = ke()), (e = $e()), t[19].queries[e].queryList;
        var t, e;
      }
      function Hl(t, e) {
        return t.queries.getByIndex(e);
      }
      const $l = new Hn('Application Initializer');
      let Bl = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = ba),
              (this.reject = ba),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                if (To(e)) t.push(e);
                else if (Ao(e)) {
                  const n = new Promise((t, n) => {
                    e.subscribe({ complete: t, error: n });
                  });
                  t.push(n);
                }
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is($l, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ql = new Hn('AppId'),
        zl = {
          provide: ql,
          useFactory: function () {
            return `${Wl()}${Wl()}${Wl()}`;
          },
          deps: [],
        };
      function Wl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Ql = new Hn('Platform Initializer'),
        Kl = new Hn('Platform ID'),
        Gl = new Hn('appBootstrapListener');
      let Zl = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Yl = new Hn('LocaleId'),
        Jl = new Hn('DefaultCurrencyCode');
      class Xl {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const tc = function (t) {
          return new wl(t);
        },
        ec = tc,
        nc = function (t) {
          return Promise.resolve(tc(t));
        },
        sc = function (t) {
          const e = tc(t),
            n = er(Zt(t).declarations).reduce((t, e) => {
              const n = Gt(e);
              return n && t.push(new yl(n)), t;
            }, []);
          return new Xl(e, n);
        },
        rc = sc,
        ic = function (t) {
          return Promise.resolve(sc(t));
        };
      let oc = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = ec),
              (this.compileModuleAsync = nc),
              (this.compileModuleAndAllComponentsSync = rc),
              (this.compileModuleAndAllComponentsAsync = ic);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ac = (() => Promise.resolve(0))();
      function lc(t) {
        'undefined' == typeof Zone
          ? ac.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', t);
      }
      class cc {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new xl(!1)),
            (this.onMicrotaskEmpty = new xl(!1)),
            (this.onStable = new xl(!1)),
            (this.onError = new xl(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js');
          Zone.assertZonePatched();
          const s = this;
          (s._nesting = 0),
            (s._outer = s._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
            (s.shouldCoalesceEventChangeDetection = !n && e),
            (s.shouldCoalesceRunChangeDetection = n),
            (s.lastRequestAnimationFrameId = -1),
            (s.nativeRequestAnimationFrame = (function () {
              let t = It.requestAnimationFrame,
                e = It.cancelAnimationFrame;
              if ('undefined' != typeof Zone && t && e) {
                const n = t[Zone.__symbol__('OriginalDelegate')];
                n && (t = n);
                const s = e[Zone.__symbol__('OriginalDelegate')];
                s && (e = s);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                      It,
                      () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                dc(t),
                                (t.isCheckStableRunning = !0),
                                hc(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      }
                    )),
                    dc(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, s, r, i, o, a) => {
                  try {
                    return pc(t), n.invokeTask(r, i, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      fc(t);
                  }
                },
                onInvoke: (n, s, r, i, o, a, l) => {
                  try {
                    return pc(t), n.invoke(r, i, o, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), fc(t);
                  }
                },
                onHasTask: (e, n, s, r) => {
                  e.hasTask(s, r),
                    n === s &&
                      ('microTask' == r.change
                        ? ((t._hasPendingMicrotasks = r.microTask),
                          dc(t),
                          hc(t))
                        : 'macroTask' == r.change &&
                          (t.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (e, n, s, r) => (
                  e.handleError(s, r),
                  t.runOutsideAngular(() => t.onError.emit(r)),
                  !1
                ),
              });
            })(s);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!cc.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
        static assertNotInAngularZone() {
          if (cc.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, s) {
          const r = this._inner,
            i = r.scheduleEventTask('NgZoneEvent: ' + s, t, uc, ba, ba);
          try {
            return r.runTask(i, e, n);
          } finally {
            r.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const uc = {};
      function hc(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function dc(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function pc(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function fc(t) {
        t._nesting--, hc(t);
      }
      class gc {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new xl()),
            (this.onMicrotaskEmpty = new xl()),
            (this.onStable = new xl()),
            (this.onError = new xl());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, s) {
          return t.apply(e, n);
        }
      }
      let mc = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone
                      ? null
                      : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      cc.assertNotInAngularZone(),
                        lc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                lc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let s = -1;
              e &&
                e > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(cc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        yc = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), bc.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return bc.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class _c {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let vc,
        bc = new _c(),
        wc = !0,
        Sc = !1;
      const Cc = new Hn('AllowMultipleToken');
      class Ec {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Tc(t, e, n = []) {
        const s = `Platform: ${e}`,
          r = new Hn(s);
        return (e = []) => {
          let i = xc();
          if (!i || i.injector.get(Cc, !1))
            if (t) t(n.concat(e).concat({ provide: r, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: Mi, useValue: 'platform' }
                );
              !(function (t) {
                if (vc && !vc.destroyed && !vc.injector.get(Cc, !1))
                  throw new Error(
                    'There can be only one platform. Destroy the previous one to create a new one.'
                  );
                vc = t.get(Ac);
                const e = t.get(Ql, null);
                e && e.forEach((t) => t());
              })(Ji.create({ providers: t, name: s }));
            }
          return (function (t) {
            const e = xc();
            if (!e) throw new Error('No platform exists!');
            if (!e.injector.get(t, null))
              throw new Error(
                'A platform with a different configuration has been created. Please destroy it first.'
              );
            return e;
          })(r);
        };
      }
      function xc() {
        return vc && !vc.destroyed ? vc : null;
      }
      let Ac = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    'noop' === t
                      ? new gc()
                      : ('zone.js' === t ? void 0 : t) ||
                        new cc({
                          enableLongStackTrace: ((Sc = !0), wc),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              s = [{ provide: cc, useValue: n }];
            return n.run(() => {
              const e = Ji.create({
                  providers: s,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                r = t.create(e),
                i = r.injector.get(Js, null);
              if (!i)
                throw new Error(
                  'No ErrorHandler. Is platform module (BrowserModule) included?'
                );
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  });
                  r.onDestroy(() => {
                    Ic(this._modules, r), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const s = n();
                    return To(s)
                      ? s.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : s;
                  } catch (s) {
                    throw (e.runOutsideAngular(() => t.handleError(s)), s);
                  }
                })(i, n, () => {
                  const t = r.injector.get(Bl);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        la(r.injector.get(Yl, oa) || oa),
                        this._moduleDoBootstrap(r),
                        r
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = kc({}, e);
            return (function (t, e, n) {
              const s = new wl(n);
              return Promise.resolve(s);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Oc);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${X(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error('The platform has already been destroyed!');
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Ji));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function kc(t, e) {
        return Array.isArray(e)
          ? e.reduce(kc, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Oc = (() => {
        class t {
          constructor(t, e, n, s, r) {
            (this._zone = t),
              (this._injector = e),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = s),
              (this._initStatus = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe(
                {
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }
              ));
            const i = new _((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              o = new _((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    cc.assertNotInAngularZone(),
                      lc(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  cc.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                s = t[t.length - 1];
              return (
                T(s)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      'number' == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : 'number' == typeof s && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof _
                  ? t[0]
                  : $(e)(B(t, n))
              );
            })(
              i,
              o.pipe((t) => {
                return q()(
                  ((e = Z),
                  function (t) {
                    let n;
                    n =
                      'function' == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const s = Object.create(t, K);
                    return (s.source = t), (s.subjectFactory = n), s;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
              );
            let n;
            (n =
              t instanceof ya
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const s = n.isBoundToModule ? void 0 : this._injector.get(rl),
              r = n.create(Ji.NULL, [], e || n.selector, s),
              i = r.location.nativeElement,
              o = r.injector.get(mc, null),
              a = o && r.injector.get(yc);
            return (
              o && a && a.registerApplication(i, o),
              r.onDestroy(() => {
                this.detachView(r.hostView),
                  Ic(this.components, r),
                  a && a.unregisterApplication(i);
              }),
              this._loadComponent(r),
              r
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error('ApplicationRef.tick is called recursively');
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Ic(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Gl, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(cc), is(Ji), is(Js), is(va), is(Bl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Ic(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Rc {}
      class Pc {}
      const Nc = { factoryPathPrefix: '', factoryPathSuffix: '.ngfactory' };
      let Dc = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Nc);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, s] = t.split('#');
            return (
              void 0 === s && (s = 'default'),
              n(314)(e)
                .then((t) => t[s])
                .then((t) => Lc(t, e, s))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, s] = t.split('#'),
              r = 'NgFactory';
            return (
              void 0 === s && ((s = 'default'), (r = '')),
              n(314)(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[s + r])
                .then((t) => Lc(t, e, s))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(oc), is(Pc, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Lc(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const jc = Tc(null, 'core', [
          { provide: Kl, useValue: 'unknown' },
          { provide: Ac, deps: [Ji] },
          { provide: yc, deps: [] },
          { provide: Zl, deps: [] },
        ]),
        Fc = [
          { provide: Oc, useClass: Oc, deps: [cc, Ji, Js, va, Bl] },
          {
            provide: ml,
            deps: [cc],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: Bl, useClass: Bl, deps: [[new us(), $l]] },
          { provide: oc, useClass: oc, deps: [] },
          zl,
          {
            provide: $a,
            useFactory: function () {
              return Ya;
            },
            deps: [],
          },
          {
            provide: qa,
            useFactory: function () {
              return Ja;
            },
            deps: [],
          },
          {
            provide: Yl,
            useFactory: function (t) {
              return (
                la(
                  (t =
                    t ||
                    ('undefined' != typeof $localize && $localize.locale) ||
                    oa)
                ),
                t
              );
            },
            deps: [[new cs(Yl), new us(), new hs()]],
          },
          { provide: Jl, useValue: 'USD' },
        ];
      let Vc = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Oc));
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ providers: Fc })),
            t
          );
        })(),
        Mc = null;
      function Uc() {
        return Mc;
      }
      const Hc = new Hn('DocumentToken');
      let $c = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: Bc, token: t, providedIn: 'platform' })),
          t
        );
      })();
      function Bc() {
        return is(zc);
      }
      const qc = new Hn('Location Initialized');
      let zc = (() => {
        class t extends $c {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Uc().getBaseHref(this._doc);
          }
          onPopState(t) {
            const e = Uc().getGlobalEventTarget(this._doc, 'window');
            return (
              e.addEventListener('popstate', t, !1),
              () => e.removeEventListener('popstate', t)
            );
          }
          onHashChange(t) {
            const e = Uc().getGlobalEventTarget(this._doc, 'window');
            return (
              e.addEventListener('hashchange', t, !1),
              () => e.removeEventListener('hashchange', t)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            Wc() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            Wc()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Hc));
          }),
          (t.ɵprov = ct({ factory: Qc, token: t, providedIn: 'platform' })),
          t
        );
      })();
      function Wc() {
        return !!window.history.pushState;
      }
      function Qc() {
        return new zc(is(Hc));
      }
      function Kc(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith('/') && n++,
          e.startsWith('/') && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
        );
      }
      function Gc(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function Zc(t) {
        return t && '?' !== t[0] ? '?' + t : t;
      }
      let Yc = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: Jc, token: t, providedIn: 'root' })),
          t
        );
      })();
      function Jc(t) {
        const e = is(Hc).location;
        return new tu(is($c), (e && e.origin) || '');
      }
      const Xc = new Hn('appBaseHref');
      let tu = (() => {
          class t extends Yc {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
                );
              this._baseHref = e;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return Kc(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  Zc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, s) {
              const r = this.prepareExternalUrl(n + Zc(s));
              this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, s) {
              const r = this.prepareExternalUrl(n + Zc(s));
              this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) ||
                void 0 === n ||
                n.call(e, t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is($c), is(Xc, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        eu = (() => {
          class t extends Yc {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != e && (this._baseHref = e);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = '#'), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = Kc(this._baseHref, t);
              return e.length > 0 ? '#' + e : e;
            }
            pushState(t, e, n, s) {
              let r = this.prepareExternalUrl(n + Zc(s));
              0 == r.length && (r = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, s) {
              let r = this.prepareExternalUrl(n + Zc(s));
              0 == r.length && (r = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformLocation).historyGo) ||
                void 0 === n ||
                n.call(e, t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is($c), is(Xc, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        nu = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new xl()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = Gc(ru(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = '') {
              return this.path() == this.normalize(t + Zc(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, ru(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && '/' !== t[0] && (t = '/' + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = '', n = null) {
              this._platformStrategy.pushState(n, '', t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Zc(e)),
                  n
                );
            }
            replaceState(t, e = '', n = null) {
              this._platformStrategy.replaceState(n, '', t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Zc(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(t = 0) {
              var e, n;
              null === (n = (e = this._platformStrategy).historyGo) ||
                void 0 === n ||
                n.call(e, t);
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = '', e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Yc), is($c));
            }),
            (t.normalizeQueryParams = Zc),
            (t.joinWithSlash = Kc),
            (t.stripTrailingSlash = Gc),
            (t.ɵprov = ct({ factory: su, token: t, providedIn: 'root' })),
            t
          );
        })();
      function su() {
        return new nu(is(Yc), is($c));
      }
      function ru(t) {
        return t.replace(/\/index.html$/, '');
      }
      var iu = (() => (
        ((iu = iu || {})[(iu.Zero = 0)] = 'Zero'),
        (iu[(iu.One = 1)] = 'One'),
        (iu[(iu.Two = 2)] = 'Two'),
        (iu[(iu.Few = 3)] = 'Few'),
        (iu[(iu.Many = 4)] = 'Many'),
        (iu[(iu.Other = 5)] = 'Other'),
        iu
      ))();
      class ou {}
      let au = (() => {
        class t extends ou {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, '-');
                  })(t);
                  let n = ra(e);
                  if (n) return n;
                  const s = e.split('-')[0];
                  if (((n = ra(s)), n)) return n;
                  if ('en' === s) return na;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[ia.PluralCase];
              })(e || this.locale)(t)
            ) {
              case iu.Zero:
                return 'zero';
              case iu.One:
                return 'one';
              case iu.Two:
                return 'two';
              case iu.Few:
                return 'few';
              case iu.Many:
                return 'many';
              default:
                return 'other';
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Yl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function lu(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(';')) {
          const t = n.indexOf('='),
            [s, r] = -1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)];
          if (s.trim() === e) return decodeURIComponent(r);
        }
        return null;
      }
      let cu = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = e),
              (this._ngEl = n),
              (this._renderer = s),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                'string' == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (lo(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachChangedItem((t) =>
                this._toggleClass(t.key, t.currentValue)
              ),
              t.forEachRemovedItem((t) => {
                t.previousValue && this._toggleClass(t.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((t) => {
              if ('string' != typeof t.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${X(
                    t.item
                  )}`
                );
              this._toggleClass(t.item, !0);
            }),
              t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !0))
                : Object.keys(t).forEach((e) => this._toggleClass(e, !!t[e])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !1))
                : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
          }
          _toggleClass(t, e) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((t) => {
                e
                  ? this._renderer.addClass(this._ngEl.nativeElement, t)
                  : this._renderer.removeClass(this._ngEl.nativeElement, t);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(yo($a), yo(qa), yo(Ca), yo(xa));
          }),
          (t.ɵdir = Qt({
            type: t,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
          })),
          t
        );
      })();
      class uu {
        constructor(t, e, n, s) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = s);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let hu = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, s) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new uu(null, this._ngForOf, -1, -1),
                    null === s ? void 0 : s
                  ),
                  r = new du(t, n);
                e.push(r);
              } else if (null == s)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const r = this._viewContainer.get(n);
                this._viewContainer.move(r, s);
                const i = new du(t, r);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, s = this._viewContainer.length; n < s; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = s),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(yo(al), yo(tl), yo($a));
          }),
          (t.ɵdir = Qt({
            type: t,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
          })),
          t
        );
      })();
      class du {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let pu = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new fu()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            gu('ngIfThen', t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            gu('ngIfElse', t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(yo(al), yo(tl));
          }),
          (t.ɵdir = Qt({
            type: t,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
          })),
          t
        );
      })();
      class fu {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function gu(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${X(e)}'.`
          );
      }
      let mu = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngEl = t),
                (this._differs = e),
                (this._renderer = n),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(t) {
              (this._ngStyle = t),
                !this._differ &&
                  t &&
                  (this._differ = this._differs.find(t).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const t = this._differ.diff(this._ngStyle);
                t && this._applyChanges(t);
              }
            }
            _setStyle(t, e) {
              const [n, s] = t.split('.');
              null != (e = null != e && s ? `${e}${s}` : e)
                ? this._renderer.setStyle(this._ngEl.nativeElement, n, e)
                : this._renderer.removeStyle(this._ngEl.nativeElement, n);
            }
            _applyChanges(t) {
              t.forEachRemovedItem((t) => this._setStyle(t.key, null)),
                t.forEachAddedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                ),
                t.forEachChangedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(Ca), yo(qa), yo(xa));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'ngStyle', '']],
              inputs: { ngStyle: 'ngStyle' },
            })),
            t
          );
        })(),
        yu = (() => {
          class t {
            constructor(t) {
              (this._viewContainerRef = t),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null);
            }
            ngOnChanges(t) {
              if (t.ngTemplateOutlet) {
                const t = this._viewContainerRef;
                this._viewRef && t.remove(t.indexOf(this._viewRef)),
                  (this._viewRef = this.ngTemplateOutlet
                    ? t.createEmbeddedView(
                        this.ngTemplateOutlet,
                        this.ngTemplateOutletContext
                      )
                    : null);
              } else
                this._viewRef &&
                  t.ngTemplateOutletContext &&
                  this.ngTemplateOutletContext &&
                  (this._viewRef.context = this.ngTemplateOutletContext);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(al));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'ngTemplateOutlet', '']],
              inputs: {
                ngTemplateOutletContext: 'ngTemplateOutletContext',
                ngTemplateOutlet: 'ngTemplateOutlet',
              },
              features: [ae],
            })),
            t
          );
        })();
      class _u {
        createSubscription(t, e) {
          return t.subscribe({
            next: e,
            error: (t) => {
              throw t;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
        onDestroy(t) {
          t.unsubscribe();
        }
      }
      class vu {
        createSubscription(t, e) {
          return t.then(e, (t) => {
            throw t;
          });
        }
        dispose(t) {}
        onDestroy(t) {}
      }
      const bu = new vu(),
        wu = new _u();
      let Su = (() => {
          class t {
            constructor(t) {
              (this._ref = t),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(
                  t,
                  (e) => this._updateLatestValue(t, e)
                ));
            }
            _selectStrategy(e) {
              if (To(e)) return bu;
              if (xo(e)) return wu;
              throw Error(`InvalidPipeArgument: '${e}' for pipe '${X(t)}'`);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, e) {
              t === this._obj &&
                ((this._latestValue = e), this._ref.markForCheck());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(Ga, 16));
            }),
            (t.ɵpipe = Kt({ name: 'async', type: t, pure: !1 })),
            t
          );
        })(),
        Cu = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ providers: [{ provide: ou, useClass: au }] })),
            t
          );
        })(),
        Eu = (() => {
          class t {}
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: 'root',
              factory: () => new Tu(is(Hc), window),
            })),
            t
          );
        })();
      class Tu {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = (function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if (
              'function' == typeof t.createTreeWalker &&
              t.body &&
              (t.body.createShadowRoot || t.body.attachShadow)
            ) {
              const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let s = n.currentNode;
              for (; s; ) {
                const t = s.shadowRoot;
                if (t) {
                  const n =
                    t.getElementById(e) || t.querySelector(`[name="${e}"]`);
                  if (n) return n;
                }
                s = n.nextNode();
              }
            }
            return null;
          })(this.document, t);
          e && (this.scrollToElement(e), this.attemptFocus(e));
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            s = e.top + this.window.pageYOffset,
            r = this.offset();
          this.window.scrollTo(n - r[0], s - r[1]);
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              xu(this.window.history) ||
              xu(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              'pageXOffset' in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function xu(t) {
        return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
      }
      class Au {}
      class ku extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          var t;
          (t = new ku()), Mc || (Mc = t);
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e
            ? window
            : 'document' === e
            ? t
            : 'body' === e
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const e =
            ((Iu = Iu || document.querySelector('base')),
            Iu ? Iu.getAttribute('href') : null);
          return null == e
            ? null
            : (function (t) {
                (Ou = Ou || document.createElement('a')),
                  Ou.setAttribute('href', t);
                const e = Ou.pathname;
                return '/' === e.charAt(0) ? e : `/${e}`;
              })(e);
        }
        resetBaseElement() {
          Iu = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return lu(document.cookie, t);
        }
      }
      let Ou,
        Iu = null;
      const Ru = new Hn('TRANSITION_ID'),
        Pu = [
          {
            provide: $l,
            useFactory: function (t, e, n) {
              return () => {
                n.get(Bl).donePromise.then(() => {
                  const n = Uc();
                  Array.prototype.slice
                    .apply(e.querySelectorAll('style[ng-transition]'))
                    .filter((e) => e.getAttribute('ng-transition') === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [Ru, Hc, Ji],
            multi: !0,
          },
        ];
      class Nu {
        static init() {
          var t;
          (t = new Nu()), (bc = t);
        }
        addToWindow(t) {
          (It.getAngularTestability = (e, n = !0) => {
            const s = t.findTestabilityInTree(e, n);
            if (null == s)
              throw new Error('Could not find testability for element.');
            return s;
          }),
            (It.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (It.getAllAngularRootElements = () => t.getAllRootElements()),
            It.frameworkStabilizers || (It.frameworkStabilizers = []),
            It.frameworkStabilizers.push((t) => {
              const e = It.getAllAngularTestabilities();
              let n = e.length,
                s = !1;
              const r = function (e) {
                (s = s || e), n--, 0 == n && t(s);
              };
              e.forEach(function (t) {
                t.whenStable(r);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const s = t.getTestability(e);
          return null != s
            ? s
            : n
            ? Uc().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      let Du = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Lu = new Hn('EventManagerPlugins');
      let ju = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let s = 0; s < n.length; s++) {
              const e = n[s];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Lu), is(cc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Fu {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const s = Uc().getGlobalEventTarget(this._doc, t);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${e}`);
          return this.addEventListener(s, e, n);
        }
      }
      let Vu = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Mu = (() => {
          class t extends Vu {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, e, n) {
              t.forEach((t) => {
                const s = this._doc.createElement('style');
                (s.textContent = t), n.push(e.appendChild(s));
              });
            }
            addHost(t) {
              const e = [];
              this._addStylesToHost(this._stylesSet, t, e),
                this._hostNodes.set(t, e);
            }
            removeHost(t) {
              const e = this._hostNodes.get(t);
              e && e.forEach(Uu), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e, n) => {
                this._addStylesToHost(t, n, e);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(Uu));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Hc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function Uu(t) {
        Uc().remove(t);
      }
      const Hu = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
        },
        $u = /%COMP%/g;
      function Bu(t, e, n) {
        for (let s = 0; s < e.length; s++) {
          let r = e[s];
          Array.isArray(r) ? Bu(t, r, n) : ((r = r.replace($u, t)), n.push(r));
        }
        return n;
      }
      function qu(t) {
        return (e) => {
          if ('__ngUnwrap__' === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let zu = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Wu(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case Tt.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new Qu(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case Tt.ShadowDom:
                return new Ku(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Bu(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(ju), is(Mu), is(ql));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Wu {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Hu[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = 'string' == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ''), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, s) {
          if (s) {
            e = s + ':' + e;
            const r = Hu[s];
            r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const s = Hu[n];
            s ? t.removeAttributeNS(s, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, s) {
          s & (nr.DashCase | nr.Important)
            ? t.style.setProperty(e, n, s & nr.Important ? 'important' : '')
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & nr.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, qu(n))
            : this.eventManager.addEventListener(t, e, qu(n));
        }
      }
      class Qu extends Wu {
        constructor(t, e, n, s) {
          super(t), (this.component = n);
          const r = Bu(s + '-' + n.id, n.styles, []);
          e.addStyles(r),
            (this.contentAttr = '_ngcontent-%COMP%'.replace(
              $u,
              s + '-' + n.id
            )),
            (this.hostAttr = '_nghost-%COMP%'.replace($u, s + '-' + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ''), n;
        }
      }
      class Ku extends Wu {
        constructor(t, e, n, s) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = Bu(s.id, s.styles, []);
          for (let i = 0; i < r.length; i++) {
            const t = document.createElement('style');
            (t.textContent = r[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Gu = (() => {
        class t extends Fu {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Hc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Zu = ['alt', 'control', 'meta', 'shift'],
        Yu = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Ju = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        Xu = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let th = (() => {
          class t extends Fu {
            constructor(t) {
              super(t);
            }
            supports(e) {
              return null != t.parseEventName(e);
            }
            addEventListener(e, n, s) {
              const r = t.parseEventName(n),
                i = t.eventCallback(r.fullKey, s, this.manager.getZone());
              return this.manager
                .getZone()
                .runOutsideAngular(() =>
                  Uc().onAndCancel(e, r.domEventName, i)
                );
            }
            static parseEventName(e) {
              const n = e.toLowerCase().split('.'),
                s = n.shift();
              if (0 === n.length || ('keydown' !== s && 'keyup' !== s))
                return null;
              const r = t._normalizeKey(n.pop());
              let i = '';
              if (
                (Zu.forEach((t) => {
                  const e = n.indexOf(t);
                  e > -1 && (n.splice(e, 1), (i += t + '.'));
                }),
                (i += r),
                0 != n.length || 0 === r.length)
              )
                return null;
              const o = {};
              return (o.domEventName = s), (o.fullKey = i), o;
            }
            static getEventFullKey(t) {
              let e = '',
                n = (function (t) {
                  let e = t.key;
                  if (null == e) {
                    if (((e = t.keyIdentifier), null == e))
                      return 'Unidentified';
                    e.startsWith('U+') &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === t.location && Ju.hasOwnProperty(e) && (e = Ju[e]));
                  }
                  return Yu[e] || e;
                })(t);
              return (
                (n = n.toLowerCase()),
                ' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
                Zu.forEach((s) => {
                  s != n && (0, Xu[s])(t) && (e += s + '.');
                }),
                (e += n),
                e
              );
            }
            static eventCallback(e, n, s) {
              return (r) => {
                t.getEventFullKey(r) === e && s.runGuarded(() => n(r));
              };
            }
            static _normalizeKey(t) {
              switch (t) {
                case 'esc':
                  return 'escape';
                default:
                  return t;
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Hc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        eh = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return is(sh);
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })();
      function nh(t) {
        return new sh(t.get(Hc));
      }
      let sh = (() => {
        class t extends eh {
          constructor(t) {
            super(), (this._doc = t);
          }
          sanitize(t, e) {
            if (null == e) return null;
            switch (t) {
              case zs.NONE:
                return e;
              case zs.HTML:
                return ws(e, 'HTML')
                  ? bs(e)
                  : (function (t, e) {
                      let n = null;
                      try {
                        Bs =
                          Bs ||
                          (function (t) {
                            const e = new Es(t);
                            return (function () {
                              try {
                                return !!new window.DOMParser().parseFromString(
                                  ps(''),
                                  'text/html'
                                );
                              } catch (t) {
                                return !1;
                              }
                            })()
                              ? new Cs(e)
                              : e;
                          })(t);
                        let s = e ? String(e) : '';
                        n = Bs.getInertBodyElement(s);
                        let r = 5,
                          i = s;
                        do {
                          if (0 === r)
                            throw new Error(
                              'Failed to sanitize html because the input is unstable'
                            );
                          r--,
                            (s = i),
                            (i = n.innerHTML),
                            (n = Bs.getInertBodyElement(s));
                        } while (s !== i);
                        return ps(new Ms().sanitizeChildren(qs(n) || n));
                      } finally {
                        if (n) {
                          const t = qs(n) || n;
                          for (; t.firstChild; ) t.removeChild(t.firstChild);
                        }
                      }
                    })(this._doc, String(e)).toString();
              case zs.STYLE:
                return ws(e, 'Style') ? bs(e) : e;
              case zs.SCRIPT:
                if (ws(e, 'Script')) return bs(e);
                throw new Error('unsafe value used in a script context');
              case zs.URL:
                return Ss(e), ws(e, 'URL') ? bs(e) : As(String(e));
              case zs.RESOURCE_URL:
                if (ws(e, 'ResourceURL')) return bs(e);
                throw new Error(
                  'unsafe value used in a resource URL context (see https://g.co/ng/security#xss)'
                );
              default:
                throw new Error(
                  `Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`
                );
            }
          }
          bypassSecurityTrustHtml(t) {
            return new gs(t);
          }
          bypassSecurityTrustStyle(t) {
            return new ms(t);
          }
          bypassSecurityTrustScript(t) {
            return new ys(t);
          }
          bypassSecurityTrustUrl(t) {
            return new _s(t);
          }
          bypassSecurityTrustResourceUrl(t) {
            return new vs(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Hc));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return nh(is(Fi));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      const rh = Tc(jc, 'browser', [
          { provide: Kl, useValue: 'browser' },
          {
            provide: Ql,
            useValue: function () {
              ku.makeCurrent(), Nu.init();
            },
            multi: !0,
          },
          {
            provide: Hc,
            useFactory: function () {
              return (
                (function (t) {
                  de = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        ih = [
          [],
          { provide: Mi, useValue: 'root' },
          {
            provide: Js,
            useFactory: function () {
              return new Js();
            },
            deps: [],
          },
          { provide: Lu, useClass: Gu, multi: !0, deps: [Hc, cc, Kl] },
          { provide: Lu, useClass: th, multi: !0, deps: [Hc] },
          [],
          { provide: zu, useClass: zu, deps: [ju, Mu, ql] },
          { provide: Ta, useExisting: zu },
          { provide: Vu, useExisting: Mu },
          { provide: Mu, useClass: Mu, deps: [Hc] },
          { provide: mc, useClass: mc, deps: [cc] },
          { provide: ju, useClass: ju, deps: [Lu, cc] },
          { provide: Au, useClass: Du, deps: [] },
          [],
        ];
      let oh = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ql, useValue: e.appId },
                { provide: Ru, useExisting: ql },
                Pu,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(t, 12));
          }),
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = ht({ providers: ih, imports: [Cu, Vc] })),
          t
        );
      })();
      function ah(...t) {
        if (1 === t.length) {
          const e = t[0];
          if (l(e)) return lh(e, null);
          if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
            const t = Object.keys(e);
            return lh(
              t.map((t) => e[t]),
              t
            );
          }
        }
        if ('function' == typeof t[t.length - 1]) {
          const e = t.pop();
          return lh((t = 1 === t.length && l(t[0]) ? t[0] : t), null).pipe(
            x((t) => e(...t))
          );
        }
        return lh(t, null);
      }
      function lh(t, e) {
        return new _((n) => {
          const s = t.length;
          if (0 === s) return void n.complete();
          const r = new Array(s);
          let i = 0,
            o = 0;
          for (let a = 0; a < s; a++) {
            const l = L(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), o++), (r[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  i++,
                    (i !== s && c) ||
                      (o === s &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = r[n]), t), {}) : r
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      'undefined' != typeof window && window;
      let ch = (() => {
          class t {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {});
            }
            setProperty(t, e) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, e);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            setDisabledState(t) {
              this.setProperty('disabled', t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(xa), yo(Ca));
            }),
            (t.ɵdir = Qt({ type: t })),
            t
          );
        })(),
        uh = (() => {
          class t extends ch {}
          return (
            (t.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = Fn(t)))(n || t);
              };
            })()),
            (t.ɵdir = Qt({ type: t, features: [to] })),
            t
          );
        })();
      const hh = new Hn('NgValueAccessor'),
        dh = { provide: hh, useExisting: nt(() => fh), multi: !0 },
        ph = new Hn('CompositionEventMode');
      let fh = (() => {
        class t extends ch {
          constructor(t, e, n) {
            super(t, e),
              (this._compositionMode = n),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function () {
                  const t = Uc() ? Uc().getUserAgent() : '';
                  return /android (\d+)/.test(t.toLowerCase());
                })());
          }
          writeValue(t) {
            this.setProperty('value', null == t ? '' : t);
          }
          _handleInput(t) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(yo(xa), yo(Ca), yo(ph, 8));
          }),
          (t.ɵdir = Qt({
            type: t,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                ko('input', function (t) {
                  return e._handleInput(t.target.value);
                })('blur', function () {
                  return e.onTouched();
                })('compositionstart', function () {
                  return e._compositionStart();
                })('compositionend', function (t) {
                  return e._compositionEnd(t.target.value);
                });
            },
            features: [ma([dh]), to],
          })),
          t
        );
      })();
      function gh(t) {
        return null == t || 0 === t.length;
      }
      function mh(t) {
        return null != t && 'number' == typeof t.length;
      }
      const yh = new Hn('NgValidators'),
        _h = new Hn('NgAsyncValidators'),
        vh = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class bh {
        static min(t) {
          return (function (t) {
            return (e) => {
              if (gh(e.value) || gh(t)) return null;
              const n = parseFloat(e.value);
              return !isNaN(n) && n < t
                ? { min: { min: t, actual: e.value } }
                : null;
            };
          })(t);
        }
        static max(t) {
          return (function (t) {
            return (e) => {
              if (gh(e.value) || gh(t)) return null;
              const n = parseFloat(e.value);
              return !isNaN(n) && n > t
                ? { max: { max: t, actual: e.value } }
                : null;
            };
          })(t);
        }
        static required(t) {
          return (function (t) {
            return gh(t.value) ? { required: !0 } : null;
          })(t);
        }
        static requiredTrue(t) {
          return (function (t) {
            return !0 === t.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function (t) {
            return gh(t.value) || vh.test(t.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function (t) {
            return (e) =>
              gh(e.value) || !mh(e.value)
                ? null
                : e.value.length < t
                ? {
                    minlength: {
                      requiredLength: t,
                      actualLength: e.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function (t) {
            return (e) =>
              mh(e.value) && e.value.length > t
                ? {
                    maxlength: {
                      requiredLength: t,
                      actualLength: e.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function (t) {
            if (!t) return wh;
            let e, n;
            return (
              'string' == typeof t
                ? ((n = ''),
                  '^' !== t.charAt(0) && (n += '^'),
                  (n += t),
                  '$' !== t.charAt(t.length - 1) && (n += '$'),
                  (e = new RegExp(n)))
                : ((n = t.toString()), (e = t)),
              (t) => {
                if (gh(t.value)) return null;
                const s = t.value;
                return e.test(s)
                  ? null
                  : { pattern: { requiredPattern: n, actualValue: s } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return Ah(t);
        }
        static composeAsync(t) {
          return Oh(t);
        }
      }
      function wh(t) {
        return null;
      }
      function Sh(t) {
        return null != t;
      }
      function Ch(t) {
        const e = To(t) ? L(t) : t;
        return Ao(e), e;
      }
      function Eh(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function Th(t, e) {
        return e.map((e) => e(t));
      }
      function xh(t) {
        return t.map((t) =>
          (function (t) {
            return !t.validate;
          })(t)
            ? t
            : (e) => t.validate(e)
        );
      }
      function Ah(t) {
        if (!t) return null;
        const e = t.filter(Sh);
        return 0 == e.length
          ? null
          : function (t) {
              return Eh(Th(t, e));
            };
      }
      function kh(t) {
        return null != t ? Ah(xh(t)) : null;
      }
      function Oh(t) {
        if (!t) return null;
        const e = t.filter(Sh);
        return 0 == e.length
          ? null
          : function (t) {
              return ah(Th(t, e).map(Ch)).pipe(x(Eh));
            };
      }
      function Ih(t) {
        return null != t ? Oh(xh(t)) : null;
      }
      function Rh(t, e) {
        return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
      }
      function Ph(t) {
        return t._rawValidators;
      }
      function Nh(t) {
        return t._rawAsyncValidators;
      }
      let Dh = (() => {
          class t {
            constructor() {
              (this._rawValidators = []),
                (this._rawAsyncValidators = []),
                (this._onDestroyCallbacks = []);
            }
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            _setValidators(t) {
              (this._rawValidators = t || []),
                (this._composedValidatorFn = kh(this._rawValidators));
            }
            _setAsyncValidators(t) {
              (this._rawAsyncValidators = t || []),
                (this._composedAsyncValidatorFn = Ih(this._rawAsyncValidators));
            }
            get validator() {
              return this._composedValidatorFn || null;
            }
            get asyncValidator() {
              return this._composedAsyncValidatorFn || null;
            }
            _registerOnDestroy(t) {
              this._onDestroyCallbacks.push(t);
            }
            _invokeOnDestroyCallbacks() {
              this._onDestroyCallbacks.forEach((t) => t()),
                (this._onDestroyCallbacks = []);
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = Qt({ type: t })),
            t
          );
        })(),
        Lh = (() => {
          class t extends Dh {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = (function () {
              let e;
              return function (n) {
                return (e || (e = Fn(t)))(n || t);
              };
            })()),
            (t.ɵdir = Qt({ type: t, features: [to] })),
            t
          );
        })();
      class jh extends Dh {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      let Fh = (() => {
        class t extends class {
          constructor(t) {
            this._cd = t;
          }
          is(t) {
            var e, n, s;
            return 'submitted' === t
              ? !!(null === (e = this._cd) || void 0 === e
                  ? void 0
                  : e.submitted)
              : !!(null ===
                  (s =
                    null === (n = this._cd) || void 0 === n
                      ? void 0
                      : n.control) || void 0 === s
                  ? void 0
                  : s[t]);
          }
        } {
          constructor(t) {
            super(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(yo(jh, 2));
          }),
          (t.ɵdir = Qt({
            type: t,
            selectors: [
              ['', 'formControlName', ''],
              ['', 'ngModel', ''],
              ['', 'formControl', ''],
            ],
            hostVars: 14,
            hostBindings: function (t, e) {
              2 & t &&
                Ho('ng-untouched', e.is('untouched'))(
                  'ng-touched',
                  e.is('touched')
                )('ng-pristine', e.is('pristine'))('ng-dirty', e.is('dirty'))(
                  'ng-valid',
                  e.is('valid')
                )('ng-invalid', e.is('invalid'))('ng-pending', e.is('pending'));
            },
            features: [to],
          })),
          t
        );
      })();
      function Vh(t, e) {
        (function (t, e) {
          const n = Ph(t);
          null !== e.validator
            ? t.setValidators(Rh(n, e.validator))
            : 'function' == typeof n && t.setValidators([n]);
          const s = Nh(t);
          null !== e.asyncValidator
            ? t.setAsyncValidators(Rh(s, e.asyncValidator))
            : 'function' == typeof s && t.setAsyncValidators([s]);
          const r = () => t.updateValueAndValidity();
          Uh(e._rawValidators, r), Uh(e._rawAsyncValidators, r);
        })(t, e),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                'change' === t.updateOn && Hh(t, e);
            });
          })(t, e),
          (function (t, e) {
            const n = (t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            };
            t.registerOnChange(n),
              e._registerOnDestroy(() => {
                t._unregisterOnChange(n);
              });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                'blur' === t.updateOn && t._pendingChange && Hh(t, e),
                'submit' !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          (function (t, e) {
            if (e.valueAccessor.setDisabledState) {
              const n = (t) => {
                e.valueAccessor.setDisabledState(t);
              };
              t.registerOnDisabledChange(n),
                e._registerOnDestroy(() => {
                  t._unregisterOnDisabledChange(n);
                });
            }
          })(t, e);
      }
      function Mh(t, e, n = !0) {
        const s = () => {};
        e.valueAccessor &&
          (e.valueAccessor.registerOnChange(s),
          e.valueAccessor.registerOnTouched(s)),
          (function (t, e) {
            let n = !1;
            if (null !== t) {
              if (null !== e.validator) {
                const s = Ph(t);
                if (Array.isArray(s) && s.length > 0) {
                  const r = s.filter((t) => t !== e.validator);
                  r.length !== s.length && ((n = !0), t.setValidators(r));
                }
              }
              if (null !== e.asyncValidator) {
                const s = Nh(t);
                if (Array.isArray(s) && s.length > 0) {
                  const r = s.filter((t) => t !== e.asyncValidator);
                  r.length !== s.length && ((n = !0), t.setAsyncValidators(r));
                }
              }
            }
            const s = () => {};
            Uh(e._rawValidators, s), Uh(e._rawAsyncValidators, s);
          })(t, e),
          t &&
            (e._invokeOnDestroyCallbacks(),
            t._registerOnCollectionChange(() => {}));
      }
      function Uh(t, e) {
        t.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e);
        });
      }
      function Hh(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function $h(t, e) {
        if (!t.hasOwnProperty('model')) return !1;
        const n = t.model;
        return !!n.isFirstChange() || !Object.is(e, n.currentValue);
      }
      function Bh(t, e) {
        if (!e) return null;
        let n, s, r;
        return (
          Array.isArray(e),
          e.forEach((t) => {
            t.constructor === fh
              ? (n = t)
              : Object.getPrototypeOf(t.constructor) === uh
              ? (s = t)
              : (r = t);
          }),
          r || s || n || null
        );
      }
      function qh(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const zh = 'VALID',
        Wh = 'INVALID',
        Qh = 'PENDING',
        Kh = 'DISABLED';
      function Gh(t) {
        return (Xh(t) ? t.validators : t) || null;
      }
      function Zh(t) {
        return Array.isArray(t) ? kh(t) : t || null;
      }
      function Yh(t, e) {
        return (Xh(e) ? e.asyncValidators : t) || null;
      }
      function Jh(t) {
        return Array.isArray(t) ? Ih(t) : t || null;
      }
      function Xh(t) {
        return null != t && !Array.isArray(t) && 'object' == typeof t;
      }
      class td {
        constructor(t, e) {
          (this._hasOwnPendingAsyncValidator = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = e),
            (this._composedValidatorFn = Zh(this._rawValidators)),
            (this._composedAsyncValidatorFn = Jh(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === zh;
        }
        get invalid() {
          return this.status === Wh;
        }
        get pending() {
          return this.status == Qh;
        }
        get disabled() {
          return this.status === Kh;
        }
        get enabled() {
          return this.status !== Kh;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : 'change';
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = Zh(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = Jh(t));
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Qh),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = Kh),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = zh),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status !== zh && this.status !== Qh) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Kh : zh;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Qh), (this._hasOwnPendingAsyncValidator = !0);
            const e = Ch(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(e, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split('.')),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let s = t;
            return (
              e.forEach((t) => {
                s =
                  s instanceof nd
                    ? s.controls.hasOwnProperty(t)
                      ? s.controls[t]
                      : null
                    : (s instanceof sd && s.at(t)) || null;
              }),
              s
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new xl()), (this.statusChanges = new xl());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Kh
            : this.errors
            ? Wh
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Qh)
            ? Qh
            : this._anyControlsHaveStatus(Wh)
            ? Wh
            : zh;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            'object' == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            'value' in t &&
            'disabled' in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Xh(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class ed extends td {
        constructor(t = null, e, n) {
          super(Gh(e), Yh(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          qh(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          qh(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class nd extends td {
        constructor(t, e, n) {
          super(Gh(e), Yh(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e, n = {}) {
          this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, e = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, e, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (Object.keys(t).forEach((n) => {
              this.controls[n] &&
                this.controls[n].patchValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, s) => {
            n.reset(t[s], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof ed ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => {
            const n = this.controls[e];
            n && t(n, e);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const e of Object.keys(this.controls)) {
            const n = this.controls[e];
            if (this.contains(e) && t(n)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, s) => {
              n = e(n, t, s);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class sd extends td {
        constructor(t, e, n) {
          super(Gh(e), Yh(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[t];
        }
        push(t, e = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, e, n = {}) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        removeAt(t, e = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity({ emitEvent: e.emitEvent });
        }
        setControl(t, e, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (t.forEach((t, n) => {
              this.at(n) &&
                this.at(n).patchValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, s) => {
            n.reset(t[s], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof ed ? t.value : t.getRawValue()
          );
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error(`Cannot find form control at index ${t}`);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const rd = { provide: jh, useExisting: nt(() => od) },
        id = (() => Promise.resolve(null))();
      let od = (() => {
          class t extends jh {
            constructor(t, e, n, s) {
              super(),
                (this.control = new ed()),
                (this._registered = !1),
                (this.update = new xl()),
                (this._parent = t),
                this._setValidators(e),
                this._setAsyncValidators(n),
                (this.valueAccessor = Bh(0, s));
            }
            ngOnChanges(t) {
              this._checkForErrors(),
                this._registered || this._setUpControl(),
                'isDisabled' in t && this._updateDisabled(t),
                $h(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._parent
                ? [...this._parent.path, this.name]
                : [this.name];
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Vh(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(t) {
              id.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 });
              });
            }
            _updateDisabled(t) {
              const e = t.isDisabled.currentValue,
                n = '' === e || (e && 'false' !== e);
              id.then(() => {
                n && !this.control.disabled
                  ? this.control.disable()
                  : !n && this.control.disabled && this.control.enable();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                yo(Lh, 9),
                yo(yh, 10),
                yo(_h, 10),
                yo(hh, 10)
              );
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [
                [
                  '',
                  'ngModel',
                  '',
                  3,
                  'formControlName',
                  '',
                  3,
                  'formControl',
                  '',
                ],
              ],
              inputs: {
                name: 'name',
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model'],
                options: ['ngModelOptions', 'options'],
              },
              outputs: { update: 'ngModelChange' },
              exportAs: ['ngModel'],
              features: [ma([rd]), to, ae],
            })),
            t
          );
        })(),
        ad = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({})),
            t
          );
        })();
      const ld = new Hn('NgModelWithFormControlWarning'),
        cd = { provide: jh, useExisting: nt(() => ud) };
      let ud = (() => {
          class t extends jh {
            constructor(t, e, n, s) {
              super(),
                (this._ngModelWarningConfig = s),
                (this.update = new xl()),
                (this._ngModelWarningSent = !1),
                this._setValidators(t),
                this._setAsyncValidators(e),
                (this.valueAccessor = Bh(0, n));
            }
            set isDisabled(t) {}
            ngOnChanges(t) {
              if (this._isControlChanged(t)) {
                const e = t.form.previousValue;
                e && Mh(e, this, !1),
                  Vh(this.form, this),
                  this.control.disabled &&
                    this.valueAccessor.setDisabledState &&
                    this.valueAccessor.setDisabledState(!0),
                  this.form.updateValueAndValidity({ emitEvent: !1 });
              }
              $h(t, this.viewModel) &&
                (this.form.setValue(this.model), (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.form && Mh(this.form, this, !1);
            }
            get path() {
              return [];
            }
            get control() {
              return this.form;
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _isControlChanged(t) {
              return t.hasOwnProperty('form');
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                yo(yh, 10),
                yo(_h, 10),
                yo(hh, 10),
                yo(ld, 8)
              );
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'formControl', '']],
              inputs: {
                isDisabled: ['disabled', 'isDisabled'],
                form: ['formControl', 'form'],
                model: ['ngModel', 'model'],
              },
              outputs: { update: 'ngModelChange' },
              exportAs: ['ngForm'],
              features: [ma([cd]), to, ae],
            })),
            (t._ngModelWarningSentOnce = !1),
            t
          );
        })(),
        hd = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[ad]] })),
            t
          );
        })(),
        dd = (() => {
          class t {
            static withConfig(e) {
              return {
                ngModule: t,
                providers: [
                  { provide: ld, useValue: e.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [hd] })),
            t
          );
        })();
      var pd = n(808),
        fd = n.n(pd);
      const gd = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = 'argument out of range'),
              (this.name = 'ArgumentOutOfRangeError'),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        md = new _((t) => t.complete());
      function yd(t) {
        return t
          ? (function (t) {
              return new _((e) => t.schedule(() => e.complete()));
            })(t)
          : md;
      }
      function _d(t) {
        return (e) => (0 === t ? yd() : e.lift(new vd(t)));
      }
      class vd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new gd();
        }
        call(t, e) {
          return e.subscribe(new bd(t, this.total));
        }
      }
      class bd extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      class wd {
        constructor(t, e) {
          (this.count = t), (this.source = e);
        }
        call(t, e) {
          return e.subscribe(new Sd(t, this.count, this.source));
        }
      }
      class Sd extends f {
        constructor(t, e, n) {
          super(t), (this.count = e), (this.source = n);
        }
        error(t) {
          if (!this.isStopped) {
            const { source: e, count: n } = this;
            if (0 === n) return super.error(t);
            n > -1 && (this.count = n - 1),
              e.subscribe(this._unsubscribeAndRecycle());
          }
        }
      }
      function Cd() {}
      function Ed(t, e, n) {
        return function (s) {
          return s.lift(new Td(t, e, n));
        };
      }
      class Td {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new xd(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class xd extends f {
        constructor(t, e, n, r) {
          super(t),
            (this._tapNext = Cd),
            (this._tapError = Cd),
            (this._tapComplete = Cd),
            (this._tapError = n || Cd),
            (this._tapComplete = r || Cd),
            s(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || Cd),
                (this._tapError = e.error || Cd),
                (this._tapComplete = e.complete || Cd));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      function Ad(t) {
        return function (e) {
          const n = new kd(t),
            s = e.lift(n);
          return (n.caught = s);
        };
      }
      class kd {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new Od(t, this.selector, this.caught));
        }
      }
      class Od extends F {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const s = new j(this);
            this.add(s);
            const r = V(n, s);
            r !== s && this.add(r);
          }
        }
      }
      class Id extends h {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class Rd extends Id {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            s = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(s, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(s, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n,
            s = !1;
          try {
            this.work(t);
          } catch (r) {
            (s = !0), (n = (!!r && r) || new Error(r));
          }
          if (s) return this.unsubscribe(), n;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            s = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== s && n.splice(s, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      let Pd = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class Nd extends Pd {
        constructor(t, e = Pd.now) {
          super(t, () =>
            Nd.delegate && Nd.delegate !== this ? Nd.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return Nd.delegate && Nd.delegate !== this
            ? Nd.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      const Dd = new (class extends Nd {})(
        class extends Rd {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          schedule(t, e = 0) {
            return e > 0
              ? super.schedule(t, e)
              : ((this.delay = e),
                (this.state = t),
                this.scheduler.flush(this),
                this);
          }
          execute(t, e) {
            return e > 0 || this.closed
              ? super.execute(t, e)
              : this._execute(t, e);
          }
          requestAsyncId(t, e, n = 0) {
            return (null !== n && n > 0) || (null === n && this.delay > 0)
              ? super.requestAsyncId(t, e, n)
              : t.flush(this);
          }
        }
      );
      function Ld(...t) {
        let e = t[t.length - 1];
        return T(e) ? (t.pop(), D(t, e)) : B(t);
      }
      class jd {
        constructor(t, e, n) {
          (this.kind = t),
            (this.value = e),
            (this.error = n),
            (this.hasValue = 'N' === t);
        }
        observe(t) {
          switch (this.kind) {
            case 'N':
              return t.next && t.next(this.value);
            case 'E':
              return t.error && t.error(this.error);
            case 'C':
              return t.complete && t.complete();
          }
        }
        do(t, e, n) {
          switch (this.kind) {
            case 'N':
              return t && t(this.value);
            case 'E':
              return e && e(this.error);
            case 'C':
              return n && n();
          }
        }
        accept(t, e, n) {
          return t && 'function' == typeof t.next
            ? this.observe(t)
            : this.do(t, e, n);
        }
        toObservable() {
          switch (this.kind) {
            case 'N':
              return Ld(this.value);
            case 'E':
              return (t = this.error), new _((e) => e.error(t));
            case 'C':
              return yd();
          }
          var t;
          throw new Error('unexpected notification kind value');
        }
        static createNext(t) {
          return void 0 !== t ? new jd('N', t) : jd.undefinedValueNotification;
        }
        static createError(t) {
          return new jd('E', void 0, t);
        }
        static createComplete() {
          return jd.completeNotification;
        }
      }
      (jd.completeNotification = new jd('C')),
        (jd.undefinedValueNotification = new jd('N', void 0));
      class Fd extends f {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(
            this.scheduler.schedule(
              Fd.dispatch,
              this.delay,
              new Vd(t, this.destination)
            )
          );
        }
        _next(t) {
          this.scheduleMessage(jd.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(jd.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(jd.createComplete()), this.unsubscribe();
        }
      }
      class Vd {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
      class Md extends C {
        constructor(
          t = Number.POSITIVE_INFINITY,
          e = Number.POSITIVE_INFINITY,
          n
        ) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0),
                (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          if (!this.isStopped) {
            const e = this._events;
            e.push(t), e.length > this._bufferSize && e.shift();
          }
          super.next(t);
        }
        nextTimeWindow(t) {
          this.isStopped ||
            (this._events.push(new Ud(this._getNow(), t)),
            this._trimBufferThenGetEvents()),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            s = this.scheduler,
            r = n.length;
          let i;
          if (this.closed) throw new b();
          if (
            (this.isStopped || this.hasError
              ? (i = h.EMPTY)
              : (this.observers.push(t), (i = new w(this, t))),
            s && t.add((t = new Fd(t, s))),
            e)
          )
            for (let o = 0; o < r && !t.closed; o++) t.next(n[o]);
          else for (let o = 0; o < r && !t.closed; o++) t.next(n[o].value);
          return (
            this.hasError
              ? t.error(this.thrownError)
              : this.isStopped && t.complete(),
            i
          );
        }
        _getNow() {
          return (this.scheduler || Dd).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            s = this._events,
            r = s.length;
          let i = 0;
          for (; i < r && !(t - s[i].time < n); ) i++;
          return r > e && (i = Math.max(i, r - e)), i > 0 && s.splice(0, i), s;
        }
      }
      class Ud {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
      function Hd(t, e, n) {
        let s;
        return (
          (s =
            t && 'object' == typeof t
              ? t
              : { bufferSize: t, windowTime: e, refCount: !1, scheduler: n }),
          (t) =>
            t.lift(
              (function ({
                bufferSize: t = Number.POSITIVE_INFINITY,
                windowTime: e = Number.POSITIVE_INFINITY,
                refCount: n,
                scheduler: s,
              }) {
                let r,
                  i,
                  o = 0,
                  a = !1,
                  l = !1;
                return function (c) {
                  let u;
                  o++,
                    !r || a
                      ? ((a = !1),
                        (r = new Md(t, e, s)),
                        (u = r.subscribe(this)),
                        (i = c.subscribe({
                          next(t) {
                            r.next(t);
                          },
                          error(t) {
                            (a = !0), r.error(t);
                          },
                          complete() {
                            (l = !0), (i = void 0), r.complete();
                          },
                        })),
                        l && (i = void 0))
                      : (u = r.subscribe(this)),
                    this.add(() => {
                      o--,
                        u.unsubscribe(),
                        (u = void 0),
                        i &&
                          !l &&
                          n &&
                          0 === o &&
                          (i.unsubscribe(), (i = void 0), (r = void 0));
                    });
                };
              })(s)
            )
        );
      }
      function $d(t, e) {
        return 'function' == typeof e
          ? (n) =>
              n.pipe($d((n, s) => L(t(n, s)).pipe(x((t, r) => e(n, t, s, r)))))
          : (e) => e.lift(new Bd(t));
      }
      class Bd {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new qd(t, this.project));
        }
      }
      class qd extends F {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new j(this),
            s = this.destination;
          s.add(n),
            (this.innerSubscription = V(t, n)),
            this.innerSubscription !== n && s.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      class zd extends C {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new b();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      class Wd extends f {
        notifyNext(t, e, n, s, r) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      class Qd extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function Kd(t, e, n, s, r = new Qd(t, n, s)) {
        if (!r.closed) return e instanceof _ ? e.subscribe(r) : N(e)(r);
      }
      const Gd = {};
      function Zd(...t) {
        let e, n;
        return (
          T(t[t.length - 1]) && (n = t.pop()),
          'function' == typeof t[t.length - 1] && (e = t.pop()),
          1 === t.length && l(t[0]) && (t = t[0]),
          B(t, n).lift(new Yd(e))
        );
      }
      class Yd {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Jd(t, this.resultSelector));
        }
      }
      class Jd extends Wd {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(Gd), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) this.add(Kd(this, t[n], void 0, n));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n) {
          const s = this.values,
            r = this.toRespond
              ? s[n] === Gd
                ? --this.toRespond
                : this.toRespond
              : 0;
          (s[n] = e),
            0 === r &&
              (this.resultSelector
                ? this._tryResultSelector(s)
                : this.destination.next(s.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      class Xd {
        constructor(t) {
          this.translations = t;
        }
        getTranslation(t) {
          return Ld(this.translations.get(t) || {});
        }
      }
      const tp = new Hn('TRANSLOCO_LOADER');
      function ep(t, e) {
        return t && t.hasOwnProperty(e)
          ? t[e]
          : e.split('.').reduce((t, e) => t && t[e], t);
      }
      function np(t) {
        return t
          ? Array.isArray(t)
            ? t.length
            : rp(t)
            ? Object.keys(t).length
            : t
            ? t.length
            : 0
          : 0;
      }
      function sp(t) {
        return 'string' == typeof t;
      }
      function rp(t) {
        return t && 'object' == typeof t && !Array.isArray(t);
      }
      function ip(t) {
        return null == t;
      }
      function op(t) {
        return !1 === ip(t);
      }
      function ap(t) {
        return fd()(t, { safe: !0 });
      }
      const lp = new Hn('TRANSLOCO_CONFIG', {
          providedIn: 'root',
          factory: () => ({}),
        }),
        cp = {
          defaultLang: 'en',
          reRenderOnLangChange: !1,
          prodMode: !1,
          failedRetries: 2,
          availableLangs: [],
          missingHandler: {
            logMissingKey: !0,
            useFallbackTranslation: !1,
            allowEmpty: !1,
          },
          flatten: { aot: !1 },
          interpolation: ['{{', '}}'],
        };
      function up(t = cp) {
        return Object.assign({}, cp, t);
      }
      const hp = new Hn('TRANSLOCO_TRANSPILER'),
        dp = new Hn('TRANSLOCO_MISSING_HANDLER');
      let pp = (() => {
        class t {
          handle(t, e) {
            return (
              e.missingHandler.logMissingKey &&
                !e.prodMode &&
                console.warn(
                  `%c Missing translation for '${t}'`,
                  'font-size: 12px; color: red'
                ),
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const fp = new Hn('TRANSLOCO_INTERCEPTOR');
      let gp = (() => {
        class t {
          preSaveTranslation(t, e) {
            return t;
          }
          preSaveTranslationKey(t, e, n) {
            return e;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const mp = new Hn('TRANSLOCO_FALLBACK_STRATEGY');
      function yp(t) {
        if (!t) return '';
        const e = t.split('/');
        return e.pop(), e.join('/');
      }
      function _p(t) {
        return t ? t.split('/').pop() : '';
      }
      function vp(t) {
        return { scope: yp(t) || null, langName: _p(t), lang: t };
      }
      function bp(t, e, n, s) {
        if (n) {
          if (0 == ('function' == typeof n[t]))
            throw `You're using an inline loader but didn't provide a loader for ${t}`;
          return n[t]().then((t) => (t.default ? t.default : t));
        }
        return e.getTranslation(t, s);
      }
      let wp;
      class Sp {
        constructor(t, e, n, s, r, i) {
          (this.loader = t),
            (this.parser = e),
            (this.missingHandler = n),
            (this.interceptor = s),
            (this.userConfig = r),
            (this.fallbackStrategy = i),
            (this.translations = new Map()),
            (this.cache = new Map()),
            (this.firstFallbackLang = null),
            (this.availableLangs = []),
            (this.isResolvedMissingOnce = !1),
            (this.events = new C()),
            (this.events$ = this.events.asObservable()),
            (this.failedLangs = new Set()),
            this.loader || (this.loader = new Xd(this.translations)),
            (wp = this),
            (this.mergedConfig = (function (t, e) {
              return Object.assign({}, t, e, {
                missingHandler: Object.assign(
                  {},
                  t.missingHandler,
                  e.missingHandler
                ),
                flatten: Object.assign({}, t.flatten, e.flatten),
              });
            })(cp, r)),
            this.setAvailableLangs(this.mergedConfig.availableLangs),
            this.setFallbackLangForMissingTranslation(this.mergedConfig),
            this.setDefaultLang(this.mergedConfig.defaultLang),
            (this.lang = new zd(this.getDefaultLang())),
            (this.langChanges$ = this.lang.asObservable()),
            (this.subscription = this.events$.subscribe((t) => {
              if ('translationLoadSuccess' === t.type && t.wasFailure) {
                const e = _p(t.payload.lang);
                this.setActiveLang(e);
              }
            }));
        }
        get config() {
          return this.mergedConfig;
        }
        getDefaultLang() {
          return this.defaultLang;
        }
        setDefaultLang(t) {
          this.defaultLang = t;
        }
        getActiveLang() {
          return this.lang.getValue();
        }
        setActiveLang(t) {
          return (
            this.lang.next(t),
            this.parser.onLangChanged && this.parser.onLangChanged(t),
            this
          );
        }
        setAvailableLangs(t) {
          this.availableLangs = t;
        }
        getAvailableLangs() {
          return this.availableLangs;
        }
        load(t, e = {}) {
          if (!1 === this.cache.has(t)) {
            let i;
            const o = this._isLangScoped(t),
              a = o ? yp(t) : null;
            i = this.useFallbackTranslation(t)
              ? ah(
                  ((n = this.loader),
                  (s = e.inlineLoader),
                  (r = { scope: a }),
                  [
                    t,
                    o
                      ? `${a}/${this.firstFallbackLang}`
                      : this.firstFallbackLang,
                  ].map((t) =>
                    L(bp(t, n, s, r)).pipe(
                      x((e) => ({ translation: e, lang: t }))
                    )
                  ))
                )
              : L(bp(t, this.loader, e.inlineLoader, { scope: a }));
            const l = i.pipe(
              (function (t = -1) {
                return (e) => e.lift(new wd(t, e));
              })(this.config.failedRetries),
              Ed((e) => {
                Array.isArray(e)
                  ? e.forEach((e) => {
                      this.handleSuccess(e.lang, e.translation),
                        e.lang !== t && this.cache.set(e.lang, Ld({}));
                    })
                  : this.handleSuccess(t, e);
              }),
              Ad(() => this.handleFailure(t, e)),
              Hd(1)
            );
            this.cache.set(t, l);
          }
          var n, s, r;
          return this.cache.get(t);
        }
        translate(t, e = {}, n = this.getActiveLang()) {
          if (!t) return t;
          const { scope: s, resolveLang: r } = this.resolveLangAndScope(n);
          if (Array.isArray(t))
            return t.map((t) => this.translate(s ? `${s}.${t}` : t, e, r));
          t = s ? `${s}.${t}` : t;
          const i = this.getTranslation(r),
            o = i[t];
          return o
            ? this.parser.transpile(o, e, i)
            : this._handleMissingKey(t, o, e);
        }
        selectTranslate(t, e, n, s = !1) {
          let r = null;
          const i = (n, r) =>
            this.load(n, r).pipe(
              x(() =>
                s ? this.translateObject(t, e, n) : this.translate(t, e, n)
              )
            );
          if (ip(n)) return this.langChanges$.pipe($d((t) => i(t)));
          if ((o = n) && 'string' == typeof o.scope) {
            const t = n;
            (n = t.scope),
              (r = (function (t, e) {
                return (n = t) && rp(n.loader)
                  ? (function (t, e) {
                      return Object.keys(t).reduce(
                        (n, s) => ((n[`${e}/${s}`] = t[s]), n),
                        {}
                      );
                    })(t.loader, e)
                  : null;
                var n;
              })(t, t.scope));
          }
          var o;
          if (this.isLang((n = n)) || this.isScopeWithLang(n)) return i(n);
          const a = n;
          return this.langChanges$.pipe(
            $d((t) => i(`${a}/${t}`, { inlineLoader: r }))
          );
        }
        isScopeWithLang(t) {
          return this.isLang(_p(t));
        }
        translateObject(t, e, n = this.getActiveLang()) {
          if (sp(t) || Array.isArray(t)) {
            if (Array.isArray(t))
              return t.map((t) =>
                this.translateObject(i ? `${i}.${t}` : t, e, r)
              );
            const { resolveLang: r, scope: i } = this.resolveLangAndScope(n),
              o = this.getTranslation(r),
              a =
                ((s = this.getObjectByKey(o, (t = i ? `${i}.${t}` : t))),
                fd().unflatten(s, { safe: !0 }));
            return 0 === np(a)
              ? this.translate(t, e, n)
              : this.parser.transpile(a, e, o);
          }
          var s;
          const r = [];
          for (const [i, o] of this.getEntries(t))
            r.push(this.translateObject(i, o, n));
          return r;
        }
        selectTranslateObject(t, e, n) {
          if (sp(t) || Array.isArray(t))
            return this.selectTranslate(t, e, n, !0);
          const [[s, r], ...i] = this.getEntries(t);
          return this.selectTranslateObject(s, r, n).pipe(
            x((t) => {
              const e = [t];
              for (const [s, r] of i) e.push(this.translateObject(s, r, n));
              return e;
            })
          );
        }
        getTranslation(t) {
          if (t) {
            if (this.isLang(t)) return this.translations.get(t) || {};
            {
              const { scope: e, resolveLang: n } = this.resolveLangAndScope(t),
                s = this.translations.get(n) || {};
              return this.getObjectByKey(s, e);
            }
          }
          return this.translations;
        }
        selectTranslation(t) {
          let e = this.langChanges$;
          if (t) {
            const n = _p(t) !== t;
            e =
              this.isLang(t) || n
                ? Ld(t)
                : this.langChanges$.pipe(x((e) => `${t}/${e}`));
          }
          return e.pipe(
            $d((t) => this.load(t).pipe(x(() => this.getTranslation(t))))
          );
        }
        setTranslation(t, e = this.getActiveLang(), n = {}) {
          const s = Object.assign({}, { merge: !0, emitChange: !0 }, n),
            r = yp(e);
          let i = t;
          r && (i = ap({ [this.getMappedScope(r)]: t }));
          const o = r ? _p(e) : e,
            a = Object.assign({}, s.merge && this.getTranslation(o), i),
            l = this.mergedConfig.flatten.aot ? a : ap(a),
            c = this.interceptor.preSaveTranslation(l, o);
          this.translations.set(o, c),
            s.emitChange && this.setActiveLang(this.getActiveLang());
        }
        setTranslationKey(t, e, n = this.getActiveLang()) {
          const s = this.interceptor.preSaveTranslationKey(t, e, n),
            r = Object.assign({}, this.getTranslation(n), { [t]: s });
          this.setTranslation(r, n);
        }
        setFallbackLangForMissingTranslation({ fallbackLang: t }) {
          const e = Array.isArray(t) ? t[0] : t;
          this.useFallbackTranslation(e) && t && (this.firstFallbackLang = e);
        }
        _handleMissingKey(t, e, n) {
          if (this.config.missingHandler.allowEmpty && '' === e) return '';
          if (this.useFallbackTranslation() && !this.isResolvedMissingOnce) {
            this.isResolvedMissingOnce = !0;
            const e = this.translate(t, n, this.firstFallbackLang);
            return (this.isResolvedMissingOnce = !1), e;
          }
          return this.missingHandler.handle(t, this.getMissingHandlerData(), n);
        }
        _isLangScoped(t) {
          return -1 === this.getAvailableLangsIds().indexOf(t);
        }
        isLang(t) {
          return -1 !== this.getAvailableLangsIds().indexOf(t);
        }
        _loadDependencies(t, e) {
          const n = _p(t);
          return this._isLangScoped(t) && !this.isLoadedTranslation(n)
            ? Zd(this.load(n), this.load(t, { inlineLoader: e }))
            : this.load(t, { inlineLoader: e });
        }
        _completeScopeWithLang(t) {
          return this._isLangScoped(t) && !this.isLang(_p(t))
            ? `${t}/${this.getActiveLang()}`
            : t;
        }
        _setScopeAlias(t, e) {
          this.mergedConfig.scopeMapping ||
            (this.mergedConfig.scopeMapping = {}),
            (this.mergedConfig.scopeMapping[t] = e);
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        isLoadedTranslation(t) {
          return np(this.getTranslation(t));
        }
        getAvailableLangsIds() {
          return sp(this.getAvailableLangs()[0])
            ? this.getAvailableLangs()
            : this.getAvailableLangs().map((t) => t.id);
        }
        getMissingHandlerData() {
          return Object.assign({}, this.config, {
            activeLang: this.getActiveLang(),
            availableLangs: this.availableLangs,
            defaultLang: this.defaultLang,
          });
        }
        useFallbackTranslation(t) {
          return (
            this.config.missingHandler.useFallbackTranslation &&
            t !== this.firstFallbackLang
          );
        }
        handleSuccess(t, e) {
          this.setTranslation(e, t, { emitChange: !1 }),
            this.events.next({
              wasFailure: !!this.failedLangs.size,
              type: 'translationLoadSuccess',
              payload: vp(t),
            }),
            this.failedLangs.forEach((t) => this.cache.delete(t)),
            this.failedLangs.clear();
        }
        handleFailure(t, e) {
          ip(e.failedCounter) &&
            ((e.failedCounter = 0),
            e.fallbackLangs ||
              (e.fallbackLangs = this.fallbackStrategy.getNextLangs(t)));
          const n = t.split('/'),
            s = e.fallbackLangs[e.failedCounter];
          if ((this.failedLangs.add(t), this.cache.has(s)))
            return this.handleSuccess(s, this.getTranslation(s)), md;
          if (!s || s === n[n.length - 1]) {
            let t = 'Unable to load translation and all the fallback languages';
            throw (
              (n.length > 1 && (t += ', did you misspelled the scope name?'),
              new Error(t))
            );
          }
          let r = s;
          return (
            n.length > 1 && ((n[n.length - 1] = s), (r = n.join('/'))),
            e.failedCounter++,
            this.events.next({
              type: 'translationLoadFailure',
              payload: vp(t),
            }),
            this.load(r, e)
          );
        }
        getMappedScope(t) {
          const { scopeMapping: e = {} } = this.config;
          return (
            e[t] ||
            t
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (t, e) =>
                0 == e ? t.toLowerCase() : t.toUpperCase()
              )
              .replace(/\s+|_|-|\//g, '')
          );
        }
        resolveLangAndScope(t) {
          let e,
            n = t;
          if (this._isLangScoped(t)) {
            const s = _p(t),
              r = this.isLang(s);
            (n = r ? s : this.getActiveLang()),
              (e = this.getMappedScope(r ? yp(t) : t));
          }
          return { scope: e, resolveLang: n };
        }
        getObjectByKey(t, e) {
          const n = {},
            s = `${e}.`;
          for (const r in t) r.startsWith(s) && (n[r.replace(s, '')] = t[r]);
          return n;
        }
        getEntries(t) {
          return t instanceof Map ? t.entries() : Object.entries(t);
        }
      }
      (Sp.ɵfac = function (t) {
        return new (t || Sp)(is(tp, 8), is(hp), is(dp), is(fp), is(lp), is(mp));
      }),
        (Sp.ɵprov = ct({ token: Sp, factory: Sp.ɵfac, providedIn: 'root' })),
        (Sp.ngInjectableDef = ut({
          factory: function () {
            return new Sp(os(tp, 8), os(hp), os(dp), os(fp), os(lp), os(mp));
          },
          token: Sp,
          providedIn: 'root',
        })),
        new Hn('TRANSLOCO_LANG'),
        new Hn('TRANSLOCO_LOADING_TEMPLATE');
      const Cp = new Hn('TRANSLOCO_SCOPE'),
        Ep = [
          {
            provide: hp,
            useClass: class {
              constructor(t) {
                this.interpolationMatcher = (function (t) {
                  const [e, n] =
                    t && t.interpolation ? t.interpolation : cp.interpolation;
                  return new RegExp(`${e}(.*?)${n}`, 'g');
                })(t);
              }
              transpile(t, e = {}, n) {
                return sp(t)
                  ? t.replace(
                      this.interpolationMatcher,
                      (t, s) => (
                        (s = s.trim()),
                        op(e[s])
                          ? e[s]
                          : op(n[s])
                          ? this.transpile(n[s], e, n)
                          : ''
                      )
                    )
                  : (e &&
                      (rp(t)
                        ? (t = this.handleObject(t, e, n))
                        : Array.isArray(t) && (t = this.handleArray(t, e, n))),
                    t);
              }
              handleObject(t, e = {}, n) {
                let s = t;
                return (
                  Object.keys(e).forEach((t) => {
                    const r = ep(s, t),
                      i = ep(e, t),
                      o = this.transpile(r, i, n);
                    s = (function (t, e, n) {
                      t = Object.assign({}, t);
                      const s = e.split('.'),
                        r = s.length - 1;
                      return (
                        s.reduce(
                          (t, e, s) => (
                            (t[e] =
                              s === r
                                ? n
                                : Array.isArray(t[e])
                                ? t[e].slice()
                                : Object.assign({}, t[e])),
                            t && t[e]
                          ),
                          t
                        ),
                        t
                      );
                    })(s, t, o);
                  }),
                  s
                );
              }
              handleArray(t, e = {}, n) {
                return t.map((t) => this.transpile(t, e, n));
              }
            },
            deps: [lp],
          },
          { provide: dp, useClass: pp },
          { provide: fp, useClass: gp },
          {
            provide: mp,
            useClass: class {
              constructor(t) {
                this.userConfig = t;
              }
              getNextLangs(t) {
                const e = this.userConfig.fallbackLang;
                if (!e)
                  throw new Error(
                    'When using the default fallback, a fallback language must be provided in the config!'
                  );
                return Array.isArray(e) ? e : [e];
              }
            },
            deps: [lp],
          },
        ];
      let Tp = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = ht({ providers: [Ep] })),
          t
        );
      })();
      function xp(t, e) {
        return M(t, e, 1);
      }
      function Ap(t, e) {
        return function (n) {
          return n.lift(new kp(t, e));
        };
      }
      new Hn('TRANSLOCO_TEST_LANGS - Available testing languages'),
        new Hn('TRANSLOCO_TEST_OPTIONS - Testing options');
      class kp {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Op(t, this.predicate, this.thisArg));
        }
      }
      class Op extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      class Ip {}
      class Rp {}
      class Pp {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split('\n').forEach((t) => {
                            const e = t.indexOf(':');
                            if (e > 0) {
                              const n = t.slice(0, e),
                                s = n.toLowerCase(),
                                r = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(r)
                                  : this.headers.set(s, [r]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const s = e.toLowerCase();
                            'string' == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(s, n),
                                this.maybeSetNormalizedName(e, s));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: 'a' });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: 'd' });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Pp
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new Pp();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof Pp
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case 'a':
            case 's':
              let n = t.value;
              if (('string' == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const s = ('a' === t.op ? this.headers.get(e) : void 0) || [];
              s.push(...n), this.headers.set(e, s);
              break;
            case 'd':
              const r = t.value;
              if (r) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === r.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class Np {
        encodeKey(t) {
          return Dp(t);
        }
        encodeValue(t) {
          return Dp(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function Dp(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/gi, '$')
          .replace(/%2C/gi, ',')
          .replace(/%3B/gi, ';')
          .replace(/%2B/gi, '+')
          .replace(/%3D/gi, '=')
          .replace(/%3F/gi, '?')
          .replace(/%2F/gi, '/');
      }
      function Lp(t) {
        return `${t}`;
      }
      class jp {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new Np()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((t) => {
                      const s = t.indexOf('='),
                        [r, i] =
                          -1 == s
                            ? [e.decodeKey(t), '']
                            : [
                                e.decodeKey(t.slice(0, s)),
                                e.decodeValue(t.slice(s + 1)),
                              ],
                        o = n.get(r) || [];
                      o.push(i), n.set(r, o);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: 'a' });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach((n) => {
              const s = t[n];
              Array.isArray(s)
                ? s.forEach((t) => {
                    e.push({ param: n, value: t, op: 'a' });
                  })
                : e.push({ param: n, value: s, op: 'a' });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: 's' });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + '=' + this.encoder.encodeValue(t))
                  .join('&');
              })
              .filter((t) => '' !== t)
              .join('&')
          );
        }
        clone(t) {
          const e = new jp({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat(t)),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const e =
                      ('a' === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(Lp(t.value)), this.map.set(t.param, e);
                    break;
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(Lp(t.value));
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Fp {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        keys() {
          return this.map.keys();
        }
      }
      function Vp(t) {
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function Mp(t) {
        return 'undefined' != typeof Blob && t instanceof Blob;
      }
      function Up(t) {
        return 'undefined' != typeof FormData && t instanceof FormData;
      }
      class Hp {
        constructor(t, e, n, s) {
          let r;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || s
              ? ((this.body = void 0 !== n ? n : null), (r = s))
              : (r = n),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.context && (this.context = r.context),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new Pp()),
            this.context || (this.context = new Fp()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf('?');
              this.urlWithParams =
                e + (-1 === n ? '?' : n < e.length - 1 ? '&' : '') + t;
            }
          } else (this.params = new jp()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Vp(this.body) ||
              Mp(this.body) ||
              Up(this.body) ||
              ('undefined' != typeof URLSearchParams &&
                this.body instanceof URLSearchParams) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof jp
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Up(this.body)
            ? null
            : Mp(this.body)
            ? this.body.type || null
            : Vp(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof jp
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              'boolean' == typeof this.body
            ? 'application/json'
            : null;
        }
        clone(t = {}) {
          var e;
          const n = t.method || this.method,
            s = t.url || this.url,
            r = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            o =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = null !== (e = t.context) && void 0 !== e ? e : this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                c
              )),
            new Hp(n, s, i, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: o,
            })
          );
        }
      }
      var $p = (() => (
        (($p = $p || {})[($p.Sent = 0)] = 'Sent'),
        ($p[($p.UploadProgress = 1)] = 'UploadProgress'),
        ($p[($p.ResponseHeader = 2)] = 'ResponseHeader'),
        ($p[($p.DownloadProgress = 3)] = 'DownloadProgress'),
        ($p[($p.Response = 4)] = 'Response'),
        ($p[($p.User = 5)] = 'User'),
        $p
      ))();
      class Bp {
        constructor(t, e = 200, n = 'OK') {
          (this.headers = t.headers || new Pp()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class qp extends Bp {
        constructor(t = {}) {
          super(t), (this.type = $p.ResponseHeader);
        }
        clone(t = {}) {
          return new qp({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class zp extends Bp {
        constructor(t = {}) {
          super(t),
            (this.type = $p.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new zp({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Wp extends Bp {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Qp(t, e) {
        return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let Kp = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let s;
            if (t instanceof Hp) s = t;
            else {
              let r, i;
              (r = n.headers instanceof Pp ? n.headers : new Pp(n.headers)),
                n.params &&
                  (i =
                    n.params instanceof jp
                      ? n.params
                      : new jp({ fromObject: n.params })),
                (s = new Hp(t, e, void 0 !== n.body ? n.body : null, {
                  headers: r,
                  context: n.context,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || 'json',
                  withCredentials: n.withCredentials,
                }));
            }
            const r = Ld(s).pipe(xp((t) => this.handler.handle(t)));
            if (t instanceof Hp || 'events' === n.observe) return r;
            const i = r.pipe(Ap((t) => t instanceof zp));
            switch (n.observe || 'body') {
              case 'body':
                switch (s.responseType) {
                  case 'arraybuffer':
                    return i.pipe(
                      x((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return t.body;
                      })
                    );
                  case 'blob':
                    return i.pipe(
                      x((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error('Response is not a Blob.');
                        return t.body;
                      })
                    );
                  case 'text':
                    return i.pipe(
                      x((t) => {
                        if (null !== t.body && 'string' != typeof t.body)
                          throw new Error('Response is not a string.');
                        return t.body;
                      })
                    );
                  case 'json':
                  default:
                    return i.pipe(x((t) => t.body));
                }
              case 'response':
                return i;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request('DELETE', t, e);
          }
          get(t, e = {}) {
            return this.request('GET', t, e);
          }
          head(t, e = {}) {
            return this.request('HEAD', t, e);
          }
          jsonp(t, e) {
            return this.request('JSONP', t, {
              params: new jp().append(e, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(t, e = {}) {
            return this.request('OPTIONS', t, e);
          }
          patch(t, e, n = {}) {
            return this.request('PATCH', t, Qp(n, e));
          }
          post(t, e, n = {}) {
            return this.request('POST', t, Qp(n, e));
          }
          put(t, e, n = {}) {
            return this.request('PUT', t, Qp(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Ip));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Gp {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Zp = new Hn('HTTP_INTERCEPTORS');
      let Yp = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Jp = /^\)\]\}',?\n/;
      let Xp = (() => {
        class t {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ('JSONP' === t.method)
              throw new Error(
                'Attempted to construct Jsonp request without HttpClientJsonpModule installed.'
              );
            return new _((e) => {
              const n = this.xhrFactory.build();
              if (
                (n.open(t.method, t.urlWithParams),
                t.withCredentials && (n.withCredentials = !0),
                t.headers.forEach((t, e) => n.setRequestHeader(t, e.join(','))),
                t.headers.has('Accept') ||
                  n.setRequestHeader(
                    'Accept',
                    'application/json, text/plain, */*'
                  ),
                !t.headers.has('Content-Type'))
              ) {
                const e = t.detectContentTypeHeader();
                null !== e && n.setRequestHeader('Content-Type', e);
              }
              if (t.responseType) {
                const e = t.responseType.toLowerCase();
                n.responseType = 'json' !== e ? e : 'text';
              }
              const s = t.serializeBody();
              let r = null;
              const i = () => {
                  if (null !== r) return r;
                  const e = 1223 === n.status ? 204 : n.status,
                    s = n.statusText || 'OK',
                    i = new Pp(n.getAllResponseHeaders()),
                    o =
                      (function (t) {
                        return 'responseURL' in t && t.responseURL
                          ? t.responseURL
                          : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                          ? t.getResponseHeader('X-Request-URL')
                          : null;
                      })(n) || t.url;
                  return (
                    (r = new qp({
                      headers: i,
                      status: e,
                      statusText: s,
                      url: o,
                    })),
                    r
                  );
                },
                o = () => {
                  let { headers: s, status: r, statusText: o, url: a } = i(),
                    l = null;
                  204 !== r &&
                    (l = void 0 === n.response ? n.responseText : n.response),
                    0 === r && (r = l ? 200 : 0);
                  let c = r >= 200 && r < 300;
                  if ('json' === t.responseType && 'string' == typeof l) {
                    const t = l;
                    l = l.replace(Jp, '');
                    try {
                      l = '' !== l ? JSON.parse(l) : null;
                    } catch (u) {
                      (l = t), c && ((c = !1), (l = { error: u, text: l }));
                    }
                  }
                  c
                    ? (e.next(
                        new zp({
                          body: l,
                          headers: s,
                          status: r,
                          statusText: o,
                          url: a || void 0,
                        })
                      ),
                      e.complete())
                    : e.error(
                        new Wp({
                          error: l,
                          headers: s,
                          status: r,
                          statusText: o,
                          url: a || void 0,
                        })
                      );
                },
                a = (t) => {
                  const { url: s } = i(),
                    r = new Wp({
                      error: t,
                      status: n.status || 0,
                      statusText: n.statusText || 'Unknown Error',
                      url: s || void 0,
                    });
                  e.error(r);
                };
              let l = !1;
              const c = (s) => {
                  l || (e.next(i()), (l = !0));
                  let r = { type: $p.DownloadProgress, loaded: s.loaded };
                  s.lengthComputable && (r.total = s.total),
                    'text' === t.responseType &&
                      n.responseText &&
                      (r.partialText = n.responseText),
                    e.next(r);
                },
                u = (t) => {
                  let n = { type: $p.UploadProgress, loaded: t.loaded };
                  t.lengthComputable && (n.total = t.total), e.next(n);
                };
              return (
                n.addEventListener('load', o),
                n.addEventListener('error', a),
                n.addEventListener('timeout', a),
                n.addEventListener('abort', a),
                t.reportProgress &&
                  (n.addEventListener('progress', c),
                  null !== s &&
                    n.upload &&
                    n.upload.addEventListener('progress', u)),
                n.send(s),
                e.next({ type: $p.Sent }),
                () => {
                  n.removeEventListener('error', a),
                    n.removeEventListener('abort', a),
                    n.removeEventListener('load', o),
                    n.removeEventListener('timeout', a),
                    t.reportProgress &&
                      (n.removeEventListener('progress', c),
                      null !== s &&
                        n.upload &&
                        n.upload.removeEventListener('progress', u)),
                    n.readyState !== n.DONE && n.abort();
                }
              );
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Au));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const tf = new Hn('XSRF_COOKIE_NAME'),
        ef = new Hn('XSRF_HEADER_NAME');
      class nf {}
      let sf = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ''),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ('server' === this.platform) return null;
              const t = this.doc.cookie || '';
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = lu(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Hc), is(Kl), is(tf));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        rf = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                'GET' === t.method ||
                'HEAD' === t.method ||
                n.startsWith('http://') ||
                n.startsWith('https://')
              )
                return e.handle(t);
              const s = this.tokenService.getToken();
              return (
                null === s ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, s) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(nf), is(ef));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        of = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(Zp, []);
                this.chain = t.reduceRight(
                  (t, e) => new Gp(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Rp), is(Ji));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        af = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: rf, useClass: Yp }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: tf, useValue: e.cookieName } : [],
                  e.headerName ? { provide: ef, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({
              providers: [
                rf,
                { provide: Zp, useExisting: rf, multi: !0 },
                { provide: nf, useClass: sf },
                { provide: tf, useValue: 'XSRF-TOKEN' },
                { provide: ef, useValue: 'X-XSRF-TOKEN' },
              ],
            })),
            t
          );
        })(),
        lf = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({
              providers: [
                Kp,
                { provide: Ip, useClass: of },
                Xp,
                { provide: Rp, useExisting: Xp },
              ],
              imports: [
                [
                  af.withOptions({
                    cookieName: 'XSRF-TOKEN',
                    headerName: 'X-XSRF-TOKEN',
                  }),
                ],
              ],
            })),
            t
          );
        })();
      function cf(t) {
        return new _((e) => {
          let n;
          try {
            n = t();
          } catch (s) {
            return void e.error(s);
          }
          return (n ? L(n) : yd()).subscribe(e);
        });
      }
      const uf = new Nd(Rd);
      class hf {
        constructor(t, e) {
          (this.delay = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new df(t, this.delay, this.scheduler));
        }
      }
      class df extends f {
        constructor(t, e, n) {
          super(t),
            (this.delay = e),
            (this.scheduler = n),
            (this.queue = []),
            (this.active = !1),
            (this.errored = !1);
        }
        static dispatch(t) {
          const e = t.source,
            n = e.queue,
            s = t.scheduler,
            r = t.destination;
          for (; n.length > 0 && n[0].time - s.now() <= 0; )
            n.shift().notification.observe(r);
          if (n.length > 0) {
            const e = Math.max(0, n[0].time - s.now());
            this.schedule(t, e);
          } else this.unsubscribe(), (e.active = !1);
        }
        _schedule(t) {
          (this.active = !0),
            this.destination.add(
              t.schedule(df.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: t,
              })
            );
        }
        scheduleNotification(t) {
          if (!0 === this.errored) return;
          const e = this.scheduler,
            n = new pf(e.now() + this.delay, t);
          this.queue.push(n), !1 === this.active && this._schedule(e);
        }
        _next(t) {
          this.scheduleNotification(jd.createNext(t));
        }
        _error(t) {
          (this.errored = !0),
            (this.queue = []),
            this.destination.error(t),
            this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(jd.createComplete()), this.unsubscribe();
        }
      }
      class pf {
        constructor(t, e) {
          (this.time = t), (this.notification = e);
        }
      }
      function ff(t) {
        return (e) => e.lift(new gf(t));
      }
      class gf {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new mf(t, this.callback));
        }
      }
      class mf extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      let yf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ht({
              type: t,
              selectors: [['web-di-ld-ui-loading']],
              decls: 6,
              vars: 0,
              consts: [
                [1, 'modal'],
                [1, 'lds-ring'],
              ],
              template: function (t, e) {
                1 & t &&
                  (bo(0, 'div', 0),
                  bo(1, 'div', 1),
                  So(2, 'div'),
                  So(3, 'div'),
                  So(4, 'div'),
                  So(5, 'div'),
                  wo(),
                  wo());
              },
              styles: [
                '.modal[_ngcontent-%COMP%]{display:grid;position:fixed;width:100%;height:100vh;top:0;left:0;background-color:rgba(0,0,0,.3);z-index:99999;place-content:center}.lds-ring[_ngcontent-%COMP%]{display:inline-block;position:relative;width:80px;height:80px}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border:8px solid transparent;border-top-color:#e01e1e}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child{animation-delay:-.45s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){animation-delay:-.3s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}',
              ],
            })),
            t
          );
        })(),
        _f = (() => {
          class t {
            constructor(t, e, n, s) {
              (this.application = t),
                (this.resolver = e),
                (this.injector = n),
                (this.document = s),
                (this.tearDown = () => {});
            }
            loading() {
              const t = this.resolver
                .resolveComponentFactory(yf)
                .create(this.injector);
              this.application.attachView(t.hostView),
                this.document.body.appendChild(t.location.nativeElement),
                (this.tearDown = () => {
                  this.document.body.removeChild(t.location.nativeElement),
                    this.application.detachView(t.hostView);
                });
            }
            unloading() {
              this.tearDown();
            }
            onLoading() {
              return (t) =>
                cf(
                  () => (
                    this.loading(),
                    t.pipe(
                      (function (t, e = uf) {
                        var n;
                        const s =
                          (n = t) instanceof Date && !isNaN(+n)
                            ? +t - e.now()
                            : Math.abs(t);
                        return (t) => t.lift(new hf(s, e));
                      })(500),
                      ff(() => this.unloading())
                    )
                  )
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Oc), is(va), is(Ji), is(Hc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        vf = (() => {
          class t {
            constructor(t, e) {
              (this.http = t),
                (this.uiLoading = e),
                (this.stateAction = new zd({ limit: 10, offset: 0 })),
                (this.pokemon$ = this.stateAction.pipe(
                  $d(({ limit: t, offset: e }) =>
                    this.http
                      .get(
                        `https://pokeapi.co/api/v2/pokemon?limit=${t}&offset=${e}`
                      )
                      .pipe(this.uiLoading.onLoading())
                  )
                ));
            }
            reducerState(t) {
              const e = this.stateAction.getValue();
              this.stateAction.next(t(e));
            }
            nextPage() {
              this.reducerState((t) => ((t.offset += t.limit), t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Kp), is(_f));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          );
        })(),
        bf = (() => {
          class t {
            static addClass(t, e) {
              t.classList ? t.classList.add(e) : (t.className += ' ' + e);
            }
            static addMultipleClasses(t, e) {
              if (t.classList) {
                let n = e.trim().split(' ');
                for (let e = 0; e < n.length; e++) t.classList.add(n[e]);
              } else {
                let n = e.split(' ');
                for (let e = 0; e < n.length; e++) t.className += ' ' + n[e];
              }
            }
            static removeClass(t, e) {
              t.classList
                ? t.classList.remove(e)
                : (t.className = t.className.replace(
                    new RegExp(
                      '(^|\\b)' + e.split(' ').join('|') + '(\\b|$)',
                      'gi'
                    ),
                    ' '
                  ));
            }
            static hasClass(t, e) {
              return t.classList
                ? t.classList.contains(e)
                : new RegExp('(^| )' + e + '( |$)', 'gi').test(t.className);
            }
            static siblings(t) {
              return Array.prototype.filter.call(
                t.parentNode.children,
                function (e) {
                  return e !== t;
                }
              );
            }
            static find(t, e) {
              return Array.from(t.querySelectorAll(e));
            }
            static findSingle(t, e) {
              return t ? t.querySelector(e) : null;
            }
            static index(t) {
              let e = t.parentNode.childNodes,
                n = 0;
              for (var s = 0; s < e.length; s++) {
                if (e[s] == t) return n;
                1 == e[s].nodeType && n++;
              }
              return -1;
            }
            static indexWithinGroup(t, e) {
              let n = t.parentNode ? t.parentNode.childNodes : [],
                s = 0;
              for (var r = 0; r < n.length; r++) {
                if (n[r] == t) return s;
                n[r].attributes &&
                  n[r].attributes[e] &&
                  1 == n[r].nodeType &&
                  s++;
              }
              return -1;
            }
            static relativePosition(t, e) {
              let n = t.offsetParent
                ? { width: t.offsetWidth, height: t.offsetHeight }
                : this.getHiddenElementDimensions(t);
              const s = e.offsetHeight,
                r = e.getBoundingClientRect(),
                i = this.getViewport();
              let o, a;
              r.top + s + n.height > i.height
                ? ((o = -1 * n.height),
                  (t.style.transformOrigin = 'bottom'),
                  r.top + o < 0 && (o = -1 * r.top))
                : ((o = s), (t.style.transformOrigin = 'top')),
                (a =
                  n.width > i.width
                    ? -1 * r.left
                    : r.left + n.width > i.width
                    ? -1 * (r.left + n.width - i.width)
                    : 0),
                (t.style.top = o + 'px'),
                (t.style.left = a + 'px');
            }
            static absolutePosition(t, e) {
              let n,
                s,
                r = t.offsetParent
                  ? { width: t.offsetWidth, height: t.offsetHeight }
                  : this.getHiddenElementDimensions(t),
                i = r.height,
                o = r.width,
                a = e.offsetHeight,
                l = e.offsetWidth,
                c = e.getBoundingClientRect(),
                u = this.getWindowScrollTop(),
                h = this.getWindowScrollLeft(),
                d = this.getViewport();
              c.top + a + i > d.height
                ? ((n = c.top + u - i),
                  (t.style.transformOrigin = 'bottom'),
                  n < 0 && (n = u))
                : ((n = a + c.top + u), (t.style.transformOrigin = 'top')),
                (s =
                  c.left + o > d.width
                    ? Math.max(0, c.left + h + l - o)
                    : c.left + h),
                (t.style.top = n + 'px'),
                (t.style.left = s + 'px');
            }
            static getParents(t, e = []) {
              return null === t.parentNode
                ? e
                : this.getParents(t.parentNode, e.concat([t.parentNode]));
            }
            static getScrollableParents(t) {
              let e = [];
              if (t) {
                let n = this.getParents(t);
                const s = /(auto|scroll)/,
                  r = (t) => {
                    let e = window.getComputedStyle(t, null);
                    return (
                      s.test(e.getPropertyValue('overflow')) ||
                      s.test(e.getPropertyValue('overflowX')) ||
                      s.test(e.getPropertyValue('overflowY'))
                    );
                  };
                for (let t of n) {
                  let n = 1 === t.nodeType && t.dataset.scrollselectors;
                  if (n) {
                    let s = n.split(',');
                    for (let n of s) {
                      let s = this.findSingle(t, n);
                      s && r(s) && e.push(s);
                    }
                  }
                  9 !== t.nodeType && r(t) && e.push(t);
                }
              }
              return e;
            }
            static getHiddenElementOuterHeight(t) {
              (t.style.visibility = 'hidden'), (t.style.display = 'block');
              let e = t.offsetHeight;
              return (
                (t.style.display = 'none'), (t.style.visibility = 'visible'), e
              );
            }
            static getHiddenElementOuterWidth(t) {
              (t.style.visibility = 'hidden'), (t.style.display = 'block');
              let e = t.offsetWidth;
              return (
                (t.style.display = 'none'), (t.style.visibility = 'visible'), e
              );
            }
            static getHiddenElementDimensions(t) {
              let e = {};
              return (
                (t.style.visibility = 'hidden'),
                (t.style.display = 'block'),
                (e.width = t.offsetWidth),
                (e.height = t.offsetHeight),
                (t.style.display = 'none'),
                (t.style.visibility = 'visible'),
                e
              );
            }
            static scrollInView(t, e) {
              let n = getComputedStyle(t).getPropertyValue('borderTopWidth'),
                s = n ? parseFloat(n) : 0,
                r = getComputedStyle(t).getPropertyValue('paddingTop'),
                i = r ? parseFloat(r) : 0,
                o = t.getBoundingClientRect(),
                a =
                  e.getBoundingClientRect().top +
                  document.body.scrollTop -
                  (o.top + document.body.scrollTop) -
                  s -
                  i,
                l = t.scrollTop,
                c = t.clientHeight,
                u = this.getOuterHeight(e);
              a < 0
                ? (t.scrollTop = l + a)
                : a + u > c && (t.scrollTop = l + a - c + u);
            }
            static fadeIn(t, e) {
              t.style.opacity = 0;
              let n = +new Date(),
                s = 0,
                r = function () {
                  (s =
                    +t.style.opacity.replace(',', '.') +
                    (new Date().getTime() - n) / e),
                    (t.style.opacity = s),
                    (n = +new Date()),
                    +s < 1 &&
                      ((window.requestAnimationFrame &&
                        requestAnimationFrame(r)) ||
                        setTimeout(r, 16));
                };
              r();
            }
            static fadeOut(t, e) {
              var n = 1,
                s = 50 / e;
              let r = setInterval(() => {
                (n -= s) <= 0 && ((n = 0), clearInterval(r)),
                  (t.style.opacity = n);
              }, 50);
            }
            static getWindowScrollTop() {
              let t = document.documentElement;
              return (window.pageYOffset || t.scrollTop) - (t.clientTop || 0);
            }
            static getWindowScrollLeft() {
              let t = document.documentElement;
              return (window.pageXOffset || t.scrollLeft) - (t.clientLeft || 0);
            }
            static matches(t, e) {
              var n = Element.prototype;
              return (
                n.matches ||
                n.webkitMatchesSelector ||
                n.mozMatchesSelector ||
                n.msMatchesSelector ||
                function (t) {
                  return (
                    -1 !== [].indexOf.call(document.querySelectorAll(t), this)
                  );
                }
              ).call(t, e);
            }
            static getOuterWidth(t, e) {
              let n = t.offsetWidth;
              if (e) {
                let e = getComputedStyle(t);
                n += parseFloat(e.marginLeft) + parseFloat(e.marginRight);
              }
              return n;
            }
            static getHorizontalPadding(t) {
              let e = getComputedStyle(t);
              return parseFloat(e.paddingLeft) + parseFloat(e.paddingRight);
            }
            static getHorizontalMargin(t) {
              let e = getComputedStyle(t);
              return parseFloat(e.marginLeft) + parseFloat(e.marginRight);
            }
            static innerWidth(t) {
              let e = t.offsetWidth,
                n = getComputedStyle(t);
              return (
                (e += parseFloat(n.paddingLeft) + parseFloat(n.paddingRight)), e
              );
            }
            static width(t) {
              let e = t.offsetWidth,
                n = getComputedStyle(t);
              return (
                (e -= parseFloat(n.paddingLeft) + parseFloat(n.paddingRight)), e
              );
            }
            static getInnerHeight(t) {
              let e = t.offsetHeight,
                n = getComputedStyle(t);
              return (
                (e += parseFloat(n.paddingTop) + parseFloat(n.paddingBottom)), e
              );
            }
            static getOuterHeight(t, e) {
              let n = t.offsetHeight;
              if (e) {
                let e = getComputedStyle(t);
                n += parseFloat(e.marginTop) + parseFloat(e.marginBottom);
              }
              return n;
            }
            static getHeight(t) {
              let e = t.offsetHeight,
                n = getComputedStyle(t);
              return (
                (e -=
                  parseFloat(n.paddingTop) +
                  parseFloat(n.paddingBottom) +
                  parseFloat(n.borderTopWidth) +
                  parseFloat(n.borderBottomWidth)),
                e
              );
            }
            static getWidth(t) {
              let e = t.offsetWidth,
                n = getComputedStyle(t);
              return (
                (e -=
                  parseFloat(n.paddingLeft) +
                  parseFloat(n.paddingRight) +
                  parseFloat(n.borderLeftWidth) +
                  parseFloat(n.borderRightWidth)),
                e
              );
            }
            static getViewport() {
              let t = window,
                e = document,
                n = e.documentElement,
                s = e.getElementsByTagName('body')[0];
              return {
                width: t.innerWidth || n.clientWidth || s.clientWidth,
                height: t.innerHeight || n.clientHeight || s.clientHeight,
              };
            }
            static getOffset(t) {
              var e = t.getBoundingClientRect();
              return {
                top:
                  e.top +
                  (window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0),
                left:
                  e.left +
                  (window.pageXOffset ||
                    document.documentElement.scrollLeft ||
                    document.body.scrollLeft ||
                    0),
              };
            }
            static replaceElementWith(t, e) {
              let n = t.parentNode;
              if (!n) throw "Can't replace element";
              return n.replaceChild(e, t);
            }
            static getUserAgent() {
              return navigator.userAgent;
            }
            static isIE() {
              var t = window.navigator.userAgent;
              return (
                t.indexOf('MSIE ') > 0 ||
                (t.indexOf('Trident/') > 0
                  ? (t.indexOf('rv:'), !0)
                  : t.indexOf('Edge/') > 0)
              );
            }
            static isIOS() {
              return (
                /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
              );
            }
            static isAndroid() {
              return /(android)/i.test(navigator.userAgent);
            }
            static appendChild(t, e) {
              if (this.isElement(e)) e.appendChild(t);
              else {
                if (!e.el || !e.el.nativeElement)
                  throw 'Cannot append ' + e + ' to ' + t;
                e.el.nativeElement.appendChild(t);
              }
            }
            static removeChild(t, e) {
              if (this.isElement(e)) e.removeChild(t);
              else {
                if (!e.el || !e.el.nativeElement)
                  throw 'Cannot remove ' + t + ' from ' + e;
                e.el.nativeElement.removeChild(t);
              }
            }
            static removeElement(t) {
              'remove' in Element.prototype
                ? t.remove()
                : t.parentNode.removeChild(t);
            }
            static isElement(t) {
              return 'object' == typeof HTMLElement
                ? t instanceof HTMLElement
                : t &&
                    'object' == typeof t &&
                    null !== t &&
                    1 === t.nodeType &&
                    'string' == typeof t.nodeName;
            }
            static calculateScrollbarWidth(t) {
              if (t) {
                let e = getComputedStyle(t);
                return (
                  t.offsetWidth -
                  t.clientWidth -
                  parseFloat(e.borderLeftWidth) -
                  parseFloat(e.borderRightWidth)
                );
              }
              {
                if (null !== this.calculatedScrollbarWidth)
                  return this.calculatedScrollbarWidth;
                let t = document.createElement('div');
                (t.className = 'p-scrollbar-measure'),
                  document.body.appendChild(t);
                let e = t.offsetWidth - t.clientWidth;
                return (
                  document.body.removeChild(t),
                  (this.calculatedScrollbarWidth = e),
                  e
                );
              }
            }
            static calculateScrollbarHeight() {
              if (null !== this.calculatedScrollbarHeight)
                return this.calculatedScrollbarHeight;
              let t = document.createElement('div');
              (t.className = 'p-scrollbar-measure'),
                document.body.appendChild(t);
              let e = t.offsetHeight - t.clientHeight;
              return (
                document.body.removeChild(t),
                (this.calculatedScrollbarWidth = e),
                e
              );
            }
            static invokeElementMethod(t, e, n) {
              t[e].apply(t, n);
            }
            static clearSelection() {
              if (window.getSelection)
                window.getSelection().empty
                  ? window.getSelection().empty()
                  : window.getSelection().removeAllRanges &&
                    window.getSelection().rangeCount > 0 &&
                    window.getSelection().getRangeAt(0).getClientRects()
                      .length > 0 &&
                    window.getSelection().removeAllRanges();
              else if (document.selection && document.selection.empty)
                try {
                  document.selection.empty();
                } catch (t) {}
            }
            static getBrowser() {
              if (!this.browser) {
                let t = this.resolveUserAgent();
                (this.browser = {}),
                  t.browser &&
                    ((this.browser[t.browser] = !0),
                    (this.browser.version = t.version)),
                  this.browser.chrome
                    ? (this.browser.webkit = !0)
                    : this.browser.webkit && (this.browser.safari = !0);
              }
              return this.browser;
            }
            static resolveUserAgent() {
              let t = navigator.userAgent.toLowerCase(),
                e =
                  /(chrome)[ \/]([\w.]+)/.exec(t) ||
                  /(webkit)[ \/]([\w.]+)/.exec(t) ||
                  /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) ||
                  /(msie) ([\w.]+)/.exec(t) ||
                  (t.indexOf('compatible') < 0 &&
                    /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)) ||
                  [];
              return { browser: e[1] || '', version: e[2] || '0' };
            }
            static isInteger(t) {
              return Number.isInteger
                ? Number.isInteger(t)
                : 'number' == typeof t && isFinite(t) && Math.floor(t) === t;
            }
            static isHidden(t) {
              return null === t.offsetParent;
            }
            static getFocusableElements(e) {
              let n = t.find(
                  e,
                  'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'
                ),
                s = [];
              for (let t of n)
                'none' != getComputedStyle(t).display &&
                  'hidden' != getComputedStyle(t).visibility &&
                  s.push(t);
              return s;
            }
            static generateZIndex() {
              return (this.zindex = this.zindex || 999), ++this.zindex;
            }
          }
          return (
            (t.zindex = 1e3),
            (t.calculatedScrollbarWidth = null),
            (t.calculatedScrollbarHeight = null),
            t
          );
        })(),
        wf = (() => {
          class t {}
          return (
            (t.STARTS_WITH = 'startsWith'),
            (t.CONTAINS = 'contains'),
            (t.NOT_CONTAINS = 'notContains'),
            (t.ENDS_WITH = 'endsWith'),
            (t.EQUALS = 'equals'),
            (t.NOT_EQUALS = 'notEquals'),
            (t.IN = 'in'),
            (t.LESS_THAN = 'lt'),
            (t.LESS_THAN_OR_EQUAL_TO = 'lte'),
            (t.GREATER_THAN = 'gt'),
            (t.GREATER_THAN_OR_EQUAL_TO = 'gte'),
            (t.BETWEEN = 'between'),
            (t.IS = 'is'),
            (t.IS_NOT = 'isNot'),
            (t.BEFORE = 'before'),
            (t.AFTER = 'after'),
            (t.DATE_IS = 'dateIs'),
            (t.DATE_IS_NOT = 'dateIsNot'),
            (t.DATE_BEFORE = 'dateBefore'),
            (t.DATE_AFTER = 'dateAfter'),
            t
          );
        })(),
        Sf = (() => {
          class t {
            constructor() {
              (this.ripple = !1),
                (this.filterMatchModeOptions = {
                  text: [
                    wf.STARTS_WITH,
                    wf.CONTAINS,
                    wf.NOT_CONTAINS,
                    wf.ENDS_WITH,
                    wf.EQUALS,
                    wf.NOT_EQUALS,
                  ],
                  numeric: [
                    wf.EQUALS,
                    wf.NOT_EQUALS,
                    wf.LESS_THAN,
                    wf.LESS_THAN_OR_EQUAL_TO,
                    wf.GREATER_THAN,
                    wf.GREATER_THAN_OR_EQUAL_TO,
                  ],
                  date: [
                    wf.DATE_IS,
                    wf.DATE_IS_NOT,
                    wf.DATE_BEFORE,
                    wf.DATE_AFTER,
                  ],
                }),
                (this.translation = {
                  startsWith: 'Starts with',
                  contains: 'Contains',
                  notContains: 'Not contains',
                  endsWith: 'Ends with',
                  equals: 'Equals',
                  notEquals: 'Not equals',
                  noFilter: 'No Filter',
                  lt: 'Less than',
                  lte: 'Less than or equal to',
                  gt: 'Greater than',
                  gte: 'Greater than or equal to',
                  is: 'Is',
                  isNot: 'Is not',
                  before: 'Before',
                  after: 'After',
                  dateIs: 'Date is',
                  dateIsNot: 'Date is not',
                  dateBefore: 'Date is before',
                  dateAfter: 'Date is after',
                  clear: 'Clear',
                  apply: 'Apply',
                  matchAll: 'Match All',
                  matchAny: 'Match Any',
                  addRule: 'Add Rule',
                  removeRule: 'Remove Rule',
                  accept: 'Yes',
                  reject: 'No',
                  choose: 'Choose',
                  upload: 'Upload',
                  cancel: 'Cancel',
                  dayNames: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ],
                  dayNamesShort: [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                  ],
                  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                  monthNames: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  monthNamesShort: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  today: 'Today',
                  weekHeader: 'Wk',
                  weak: 'Weak',
                  medium: 'Medium',
                  strong: 'Strong',
                  passwordPrompt: 'Enter a password',
                  emptyMessage: 'No results found',
                  emptyFilterMessage: 'No results found',
                }),
                (this.translationSource = new C()),
                (this.translationObserver = this.translationSource.asObservable());
            }
            getTranslation(t) {
              return this.translation[t];
            }
            setTranslation(t) {
              (this.translation = Object.assign(
                Object.assign({}, this.translation),
                t
              )),
                this.translationSource.next(this.translation);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          );
        })(),
        Cf = (() => {
          class t {
            constructor(t) {
              this.template = t;
            }
            getType() {
              return this.name;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(tl));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'pTemplate', '']],
              inputs: { type: 'type', name: ['pTemplate', 'name'] },
            })),
            t
          );
        })(),
        Ef = (() => {
          class t {
            constructor(t, e, n) {
              (this.el = t), (this.zone = e), (this.config = n);
            }
            ngAfterViewInit() {
              this.config &&
                this.config.ripple &&
                this.zone.runOutsideAngular(() => {
                  this.create(),
                    (this.mouseDownListener = this.onMouseDown.bind(this)),
                    this.el.nativeElement.addEventListener(
                      'mousedown',
                      this.mouseDownListener
                    );
                });
            }
            onMouseDown(t) {
              let e = this.getInk();
              if (!e || 'none' === getComputedStyle(e, null).display) return;
              if (
                (bf.removeClass(e, 'p-ink-active'),
                !bf.getHeight(e) && !bf.getWidth(e))
              ) {
                let t = Math.max(
                  bf.getOuterWidth(this.el.nativeElement),
                  bf.getOuterHeight(this.el.nativeElement)
                );
                (e.style.height = t + 'px'), (e.style.width = t + 'px');
              }
              let n = bf.getOffset(this.el.nativeElement),
                s =
                  t.pageX -
                  n.left +
                  document.body.scrollTop -
                  bf.getWidth(e) / 2,
                r =
                  t.pageY -
                  n.top +
                  document.body.scrollLeft -
                  bf.getHeight(e) / 2;
              (e.style.top = r + 'px'),
                (e.style.left = s + 'px'),
                bf.addClass(e, 'p-ink-active');
            }
            getInk() {
              for (let t = 0; t < this.el.nativeElement.children.length; t++)
                if (
                  -1 !==
                  this.el.nativeElement.children[t].className.indexOf('p-ink')
                )
                  return this.el.nativeElement.children[t];
              return null;
            }
            resetInk() {
              let t = this.getInk();
              t && bf.removeClass(t, 'p-ink-active');
            }
            onAnimationEnd(t) {
              bf.removeClass(t.currentTarget, 'p-ink-active');
            }
            create() {
              let t = document.createElement('span');
              (t.className = 'p-ink'),
                this.el.nativeElement.appendChild(t),
                (this.animationListener = this.onAnimationEnd.bind(this)),
                t.addEventListener('animationend', this.animationListener);
            }
            remove() {
              let t = this.getInk();
              t &&
                (this.el.nativeElement.removeEventListener(
                  'mousedown',
                  this.mouseDownListener
                ),
                t.removeEventListener('animationend', this.animationListener),
                bf.removeElement(t));
            }
            ngOnDestroy() {
              this.config && this.config.ripple && this.remove();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(Ca), yo(cc), yo(Sf, 8));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'pRipple', '']],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Ho('p-ripple', !0);
              },
            })),
            t
          );
        })(),
        Tf = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu]] })),
            t
          );
        })();
      function xf(t, e) {
        1 & t && (Co(0, undefined, undefined), Eo());
      }
      const Af = function (t, e, n, s) {
        return {
          'p-button-icon': !0,
          'p-button-icon-left': t,
          'p-button-icon-right': e,
          'p-button-icon-top': n,
          'p-button-icon-bottom': s,
        };
      };
      function kf(t, e) {
        if ((1 & t && So(0, 'span', 4), 2 & t)) {
          const t = Ro();
          $o(t.loading ? 'p-button-loading-icon ' + t.loadingIcon : t.icon),
            _o(
              'ngClass',
              ((n = 4),
              (s = Af),
              (r = 'left' === t.iconPos && t.label),
              (i = 'right' === t.iconPos && t.label),
              (o = 'top' === t.iconPos && t.label),
              (a = 'bottom' === t.iconPos && t.label),
              (function (t, e, n, s, r, i, o, a, l) {
                const c = e + n;
                return fo(t, c, r, i, o, a)
                  ? uo(t, c + 4, l ? s.call(l, r, i, o, a) : s(r, i, o, a))
                  : Sl(t, c + 4);
              })(ke(), Fe(), n, s, r, i, o, a, l))
            ),
            go('aria-hidden', !0);
        }
        var n, s, r, i, o, a, l;
      }
      function Of(t, e) {
        if ((1 & t && (bo(0, 'span', 5), Jo(1), wo()), 2 & t)) {
          const t = Ro();
          go('aria-hidden', t.icon && !t.label), Br(1), Xo(t.label || '\xa0');
        }
      }
      function If(t, e) {
        if ((1 & t && (bo(0, 'span', 4), Jo(1), wo()), 2 & t)) {
          const t = Ro();
          $o(t.badgeClass),
            _o('ngClass', t.badgeStyleClass()),
            Br(1),
            Xo(t.badge);
        }
      }
      const Rf = function (t, e, n, s, r) {
          return {
            'p-button p-component': !0,
            'p-button-icon-only': t,
            'p-button-vertical': e,
            'p-disabled': n,
            'p-button-loading': s,
            'p-button-loading-label-only': r,
          };
        },
        Pf = ['*'];
      let Nf = (() => {
          class t {
            constructor() {
              (this.type = 'button'),
                (this.iconPos = 'left'),
                (this.loading = !1),
                (this.loadingIcon = 'pi pi-spinner pi-spin'),
                (this.onClick = new xl()),
                (this.onFocus = new xl()),
                (this.onBlur = new xl());
            }
            ngAfterContentInit() {
              this.templates.forEach((t) => {
                switch (t.getType()) {
                  case 'content':
                  default:
                    this.contentTemplate = t.template;
                }
              });
            }
            badgeStyleClass() {
              return {
                'p-badge p-component': !0,
                'p-badge-no-gutter':
                  this.badge && 1 === String(this.badge).length,
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ht({
              type: t,
              selectors: [['p-button']],
              contentQueries: function (t, e, n) {
                if ((1 & t && Ml(n, Cf, 4), 2 & t)) {
                  let t;
                  Vl((t = Ul())) && (e.templates = t);
                }
              },
              inputs: {
                type: 'type',
                iconPos: 'iconPos',
                icon: 'icon',
                badge: 'badge',
                label: 'label',
                disabled: 'disabled',
                loading: 'loading',
                loadingIcon: 'loadingIcon',
                style: 'style',
                styleClass: 'styleClass',
                badgeClass: 'badgeClass',
              },
              outputs: {
                onClick: 'onClick',
                onFocus: 'onFocus',
                onBlur: 'onBlur',
              },
              ngContentSelectors: Pf,
              decls: 6,
              vars: 16,
              consts: [
                [
                  'pRipple',
                  '',
                  3,
                  'ngStyle',
                  'disabled',
                  'ngClass',
                  'click',
                  'focus',
                  'blur',
                ],
                [4, 'ngTemplateOutlet'],
                [3, 'ngClass', 'class', 4, 'ngIf'],
                ['class', 'p-button-label', 4, 'ngIf'],
                [3, 'ngClass'],
                [1, 'p-button-label'],
              ],
              template: function (t, e) {
                1 & t &&
                  (No(),
                  bo(0, 'button', 0),
                  ko('click', function (t) {
                    return e.onClick.emit(t);
                  })('focus', function (t) {
                    return e.onFocus.emit(t);
                  })('blur', function (t) {
                    return e.onBlur.emit(t);
                  }),
                  Do(1),
                  mo(2, xf, 1, 0, 'ng-container', 1),
                  mo(3, kf, 1, 9, 'span', 2),
                  mo(4, Of, 2, 2, 'span', 3),
                  mo(5, If, 2, 4, 'span', 2),
                  wo()),
                  2 & t &&
                    ($o(e.styleClass),
                    _o('ngStyle', e.style)('disabled', e.disabled || e.loading)(
                      'ngClass',
                      (function (t, e, n, s, r, i, o, a) {
                        const l = Fe() + 10,
                          c = ke(),
                          u = fo(c, l, n, s, r, i);
                        return ho(c, l + 4, o) || u
                          ? uo(c, l + 5, e(n, s, r, i, o))
                          : (function (t, e) {
                              return t[e];
                            })(c, l + 5);
                      })(
                        0,
                        Rf,
                        e.icon && !e.label,
                        ('top' === e.iconPos || 'bottom' === e.iconPos) &&
                          e.label,
                        e.disabled || e.loading,
                        e.loading,
                        e.loading && !e.icon && e.label
                      )
                    ),
                    go('type', e.type),
                    Br(2),
                    _o('ngTemplateOutlet', e.contentTemplate),
                    Br(1),
                    _o('ngIf', !e.contentTemplate && (e.icon || e.loading)),
                    Br(1),
                    _o('ngIf', !e.contentTemplate),
                    Br(1),
                    _o('ngIf', !e.contentTemplate && e.badge));
              },
              directives: [Ef, mu, cu, yu, pu],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Df = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu, Tf]] })),
            t
          );
        })();
      function Lf(t, e) {
        1 & t && (bo(0, 'small', 3), Jo(1, 'Field is required'), wo());
      }
      function jf(t, e) {
        1 & t && (bo(0, 'small', 4), Jo(1, 'Email is not valid'), wo());
      }
      const Ff = ['*'];
      let Vf = (() => {
          class t {
            constructor() {}
            get invalid() {
              var t, e;
              return Boolean(
                null ===
                  (e =
                    null === (t = this.ngControl) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.invalid
              );
            }
            get touched() {
              var t;
              return Boolean(
                null === (t = this.ngControl.control) || void 0 === t
                  ? void 0
                  : t.touched
              );
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ht({
              type: t,
              selectors: [['ac-accenture-validators-message']],
              contentQueries: function (t, e, n) {
                if ((1 & t && Ml(n, jh, 5), 2 & t)) {
                  let t;
                  Vl((t = Ul())) && (e.ngControl = t.first);
                }
              },
              ngContentSelectors: Ff,
              decls: 4,
              vars: 2,
              consts: [
                [1, 'p-field', 'p-fluid'],
                ['id', 'require-help', 'class', 'p-error', 4, 'ngIf'],
                ['id', 'email-help', 'class', 'p-error', 4, 'ngIf'],
                ['id', 'require-help', 1, 'p-error'],
                ['id', 'email-help', 1, 'p-error'],
              ],
              template: function (t, e) {
                1 & t &&
                  (No(),
                  bo(0, 'div', 0),
                  Do(1),
                  mo(2, Lf, 2, 0, 'small', 1),
                  mo(3, jf, 2, 0, 'small', 2),
                  wo()),
                  2 & t &&
                    (Br(2),
                    _o(
                      'ngIf',
                      e.invalid &&
                        e.touched &&
                        (null == e.ngControl || null == e.ngControl.control
                          ? null
                          : e.ngControl.control.hasError('required'))
                    ),
                    Br(1),
                    _o(
                      'ngIf',
                      e.invalid &&
                        e.touched &&
                        (null == e.ngControl || null == e.ngControl.control
                          ? null
                          : e.ngControl.control.hasError('email'))
                    ));
              },
              directives: [pu],
              styles: [''],
            })),
            t
          );
        })(),
        Mf = (() => {
          class t {
            constructor(t, e) {
              (this.el = t), (this.ngModel = e);
            }
            ngDoCheck() {
              this.updateFilledState();
            }
            onInput(t) {
              this.updateFilledState();
            }
            updateFilledState() {
              this.filled =
                (this.el.nativeElement.value &&
                  this.el.nativeElement.value.length) ||
                (this.ngModel && this.ngModel.model);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(Ca), yo(od, 8));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'pInputText', '']],
              hostVars: 6,
              hostBindings: function (t, e) {
                1 & t &&
                  ko('input', function (t) {
                    return e.onInput(t);
                  }),
                  2 & t &&
                    Ho('p-inputtext', !0)('p-component', !0)(
                      'p-filled',
                      e.filled
                    );
              },
            })),
            t
          );
        })(),
        Uf = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu]] })),
            t
          );
        })();
      class Hf {
        constructor(t, e) {
          (this.compare = t), (this.keySelector = e);
        }
        call(t, e) {
          return e.subscribe(new $f(t, this.compare, this.keySelector));
        }
      }
      class $f extends f {
        constructor(t, e, n) {
          super(t),
            (this.keySelector = n),
            (this.hasKey = !1),
            'function' == typeof e && (this.compare = e);
        }
        compare(t, e) {
          return t === e;
        }
        _next(t) {
          let e;
          try {
            const { keySelector: n } = this;
            e = n ? n(t) : t;
          } catch (s) {
            return this.destination.error(s);
          }
          let n = !1;
          if (this.hasKey)
            try {
              const { compare: t } = this;
              n = t(this.key, e);
            } catch (s) {
              return this.destination.error(s);
            }
          else this.hasKey = !0;
          n || ((this.key = e), this.destination.next(t));
        }
      }
      let Bf,
        qf = (() => {
          class t {
            constructor(t, e, n, s) {
              (this.http = t),
                (this.domSanitizer = e),
                (this.vc = n),
                (this.tpr = s),
                (this.subscription = new h()),
                (this.action = new zd({ httpUrl: '', methodName: 'get' })),
                (this.httpUrl$ = this.action.pipe(
                  this.select((t) => t.httpUrl)
                )),
                (this.methodName$ = this.action.pipe(
                  this.select((t) => t.methodName)
                )),
                (this.image$ = Zd([this.httpUrl$, this.methodName$]).pipe(
                  $d(([t, e]) =>
                    'get' === e
                      ? this.http.get(t, { responseType: 'blob' })
                      : md
                  ),
                  x((t) => {
                    const e = URL.createObjectURL(t);
                    return this.domSanitizer.bypassSecurityTrustUrl(e);
                  })
                )),
                (this.tearDown = () => {});
            }
            set acHttpImageMethod(t) {
              t &&
                this.reduceState(
                  (e) => (
                    (e.methodName = 'get' === t || 'post' === t ? t : 'get'), e
                  )
                );
            }
            set acHttpImageOf(t) {
              t && this.reduceState((e) => ((e.httpUrl = t), e));
            }
            ngOnInit() {
              this.subscription.add(
                this.image$.subscribe((t) => {
                  this.tearDown();
                  const e = this.vc.createEmbeddedView(this.tpr, {
                    $implicit: t,
                  });
                  this.tearDown = () => e.destroy();
                })
              );
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            reduceState(t) {
              const e = this.action.getValue();
              this.action.next(t(e));
            }
            select(t) {
              return (e) =>
                e.pipe(
                  x(
                    (e) => t(e),
                    (t) => t.lift(new Hf(void 0, void 0))
                  ),
                  Hd(1)
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(Kp), yo(eh), yo(al), yo(tl));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'acHttpImage', '']],
              inputs: {
                acHttpImageMethod: 'acHttpImageMethod',
                acHttpImageOf: 'acHttpImageOf',
              },
            })),
            t
          );
        })();
      function zf(t) {
        return Array.isArray(t) ? t : [t];
      }
      function Wf(...t) {
        return $(1)(Ld(...t));
      }
      class Qf {
        constructor(t) {
          this.total = t;
        }
        call(t, e) {
          return e.subscribe(new Kf(t, this.total));
        }
      }
      class Kf extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          ++this.count > this.total && this.destination.next(t);
        }
      }
      class Gf {
        constructor(t, e) {
          (this.dueTime = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new Zf(t, this.dueTime, this.scheduler));
        }
      }
      class Zf extends f {
        constructor(t, e, n) {
          super(t),
            (this.dueTime = e),
            (this.scheduler = n),
            (this.debouncedSubscription = null),
            (this.lastValue = null),
            (this.hasValue = !1);
        }
        _next(t) {
          this.clearDebounce(),
            (this.lastValue = t),
            (this.hasValue = !0),
            this.add(
              (this.debouncedSubscription = this.scheduler.schedule(
                Yf,
                this.dueTime,
                this
              ))
            );
        }
        _complete() {
          this.debouncedNext(), this.destination.complete();
        }
        debouncedNext() {
          if ((this.clearDebounce(), this.hasValue)) {
            const { lastValue: t } = this;
            (this.lastValue = null),
              (this.hasValue = !1),
              this.destination.next(t);
          }
        }
        clearDebounce() {
          const t = this.debouncedSubscription;
          null !== t &&
            (this.remove(t),
            t.unsubscribe(),
            (this.debouncedSubscription = null));
        }
      }
      function Yf(t) {
        t.debouncedNext();
      }
      function Jf(...t) {
        const e = t[t.length - 1];
        return T(e) ? (t.pop(), (n) => Wf(t, n, e)) : (e) => Wf(t, e);
      }
      class Xf {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new tg(t),
            s = V(this.notifier, new j(n));
          return s && !n.seenValue ? (n.add(s), e.subscribe(n)) : n;
        }
      }
      class tg extends F {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext() {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      try {
        Bf = 'undefined' != typeof Intl && Intl.v8BreakIterator;
      } catch (xw) {
        Bf = !1;
      }
      let eg = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? 'browser' === this._platformId
                  : 'object' == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !Bf) &&
                  'undefined' != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !('MSStream' in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Kl));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(is(Kl));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })(),
        ng = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({})),
            t
          );
        })();
      const sg = new Set();
      let rg,
        ig = (() => {
          class t {
            constructor(t) {
              (this._platform = t),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : og);
            }
            matchMedia(t) {
              return (
                this._platform.WEBKIT &&
                  (function (t) {
                    if (!sg.has(t))
                      try {
                        rg ||
                          ((rg = document.createElement('style')),
                          rg.setAttribute('type', 'text/css'),
                          document.head.appendChild(rg)),
                          rg.sheet &&
                            (rg.sheet.insertRule(
                              `@media ${t} {.fx-query-test{ }}`,
                              0
                            ),
                            sg.add(t));
                      } catch (e) {
                        console.error(e);
                      }
                  })(t),
                this._matchMedia(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(eg));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(is(eg));
              },
              token: t,
              providedIn: 'root',
            })),
            t
          );
        })();
      function og(t) {
        return {
          matches: 'all' === t || '' === t,
          media: t,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let ag = (() => {
        class t {
          constructor(t, e) {
            (this._mediaMatcher = t),
              (this._zone = e),
              (this._queries = new Map()),
              (this._destroySubject = new C());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(t) {
            return lg(zf(t)).some((t) => this._registerQuery(t).mql.matches);
          }
          observe(t) {
            let e = Zd(lg(zf(t)).map((t) => this._registerQuery(t).observable));
            return (
              (e = Wf(
                e.pipe(_d(1)),
                e.pipe(
                  (t) => t.lift(new Qf(1)),
                  (function (t, e = uf) {
                    return (n) => n.lift(new Gf(t, e));
                  })(0)
                )
              )),
              e.pipe(
                x((t) => {
                  const e = { matches: !1, breakpoints: {} };
                  return (
                    t.forEach(({ matches: t, query: n }) => {
                      (e.matches = e.matches || t), (e.breakpoints[n] = t);
                    }),
                    e
                  );
                })
              )
            );
          }
          _registerQuery(t) {
            if (this._queries.has(t)) return this._queries.get(t);
            const e = this._mediaMatcher.matchMedia(t);
            var n;
            const s = {
              observable: new _((t) => {
                const n = (e) => this._zone.run(() => t.next(e));
                return (
                  e.addListener(n),
                  () => {
                    e.removeListener(n);
                  }
                );
              }).pipe(
                Jf(e),
                x(({ matches: e }) => ({ query: t, matches: e })),
                ((n = this._destroySubject), (t) => t.lift(new Xf(n)))
              ),
              mql: e,
            };
            return this._queries.set(t, s), s;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(ig), is(cc));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return new t(is(ig), is(cc));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
      function lg(t) {
        return t
          .map((t) => t.split(','))
          .reduce((t, e) => t.concat(e))
          .map((t) => t.trim());
      }
      let cg = (() => {
          class t {
            constructor(t, e, n) {
              (this.breakpointObserver = t),
                (this.tpr = e),
                (this.vc = n),
                (this.subscription = new h()),
                (this.viewportMatch = {
                  sm: '(max-width: 575px)',
                  md: '(min-width: 576px) and (max-width: 767px)',
                  lg: '(min-width: 768px) and (max-width: 992px)',
                  xl: '(min-width: 993px)',
                }),
                (this.action = new zd(null)),
                (this.isMatchViewPort$ = this.action.pipe(
                  Ap((t) => Boolean(t)),
                  $d((t) =>
                    this.breakpointObserver.observe(this.viewportMatch[t])
                  )
                )),
                (this.tearDown = () => {});
            }
            set acViewportSize(t) {
              this.isViewPort(t) && this.action.next(t);
            }
            ngOnInit() {
              this.subscription.add(
                this.isMatchViewPort$.subscribe((t) => {
                  if (t.matches) {
                    this.tearDown();
                    const t = this.vc.createEmbeddedView(this.tpr);
                    this.tearDown = () => t.destroy();
                  } else this.tearDown();
                })
              );
            }
            isViewPort(t) {
              return Object.keys(this.viewportMatch).includes(t);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(ag), yo(tl), yo(al));
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'acViewportSize', '']],
              inputs: { acViewportSize: 'acViewportSize' },
            })),
            t
          );
        })(),
        ug = (() => {
          class t {
            constructor() {
              (this.fileListAction = new C()),
                (this.acOnPasteImage = this.fileListAction.pipe(
                  Ap((t) => Boolean(t))
                )),
                (this.files = []);
            }
            onPaste(t) {
              var e;
              const n =
                null === (e = t.clipboardData) || void 0 === e
                  ? void 0
                  : e.files;
              if (((this.files = []), n))
                for (let s = 0; s < n.length; s++) this.files.push(n[s]);
              this.fileListAction.next(this.files);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['', 'acOnPasteImage', '']],
              hostBindings: function (t, e) {
                1 & t &&
                  ko(
                    'paste',
                    function (t) {
                      return e.onPaste(t);
                    },
                    !1,
                    tr
                  );
              },
              outputs: { acOnPasteImage: 'acOnPasteImage' },
              exportAs: ['acOnPasteImage'],
            })),
            t
          );
        })(),
        hg = (() => {
          class t {
            constructor(t) {
              this.cd = t;
            }
            transform(t) {
              return new _((e) => {
                const n = new FileReader();
                n.readAsDataURL(t),
                  (n.onload = () => {
                    e.next(n.result), e.complete();
                  });
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(yo(Ga, 16));
            }),
            (t.ɵpipe = Kt({ name: 'fileToImageUrl', type: t, pure: !0 })),
            t
          );
        })();
      function dg(t, e) {
        if ((1 & t && (bo(0, 'div'), Jo(1), wo()), 2 & t)) {
          const t = e.$implicit;
          Br(1), ta(' ', t.name, ' ');
        }
      }
      function pg(t, e) {
        if ((1 & t && (bo(0, 'div'), So(1, 'img', 19), wo()), 2 & t)) {
          const t = e.$implicit;
          Br(1), _o('src', t, Ws);
        }
      }
      function fg(t, e) {
        1 & t && So(0, 'img', 20);
      }
      function gg(t, e) {
        1 & t && So(0, 'img', 21);
      }
      function mg(t, e) {
        1 & t && So(0, 'img', 22);
      }
      function yg(t, e) {
        1 & t && So(0, 'img', 23);
      }
      function _g(t, e) {
        if (
          (1 & t &&
            (Co(0),
            So(1, 'img', 24),
            Cl(2, 'async'),
            Cl(3, 'fileToImageUrl'),
            Eo()),
          2 & t)
        ) {
          const t = e.$implicit;
          Br(1), _o('src', El(2, 1, El(3, 3, t)), Ws);
        }
      }
      let vg = (() => {
        class t {
          constructor(t) {
            (this.stateService = t),
              (this.nameInputForm = new ed(null, bh.required)),
              (this.passwordInputForm = new ed(null, bh.required)),
              (this.emailInputForm = new ed(null, bh.email)),
              (this.qualityInputForm = new ed(null, bh.required)),
              (this.pokemon$ = this.stateService.pokemon$.pipe(
                x((t) => t.results)
              )),
              (this.backUrl =
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png'),
              (this.frontUrl =
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'),
              (this.imageUrl = this.frontUrl);
          }
          sendRequest() {
            this.stateService.nextPage();
          }
          switchImage() {
            this.imageUrl =
              this.imageUrl === this.frontUrl ? this.backUrl : this.frontUrl;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(yo(vf));
          }),
          (t.ɵcmp = Ht({
            type: t,
            selectors: [['web-di-ld-root']],
            features: [
              ma([
                {
                  provide: Cp,
                  useValue: { scope: 'todos', alias: 'customName' },
                },
              ]),
            ],
            decls: 44,
            vars: 13,
            consts: [
              [
                'src',
                'assets/images/angular.svg',
                'alt',
                'angular',
                2,
                'width',
                '200px',
              ],
              [
                'label',
                'loadPokemonByState',
                'icon',
                'pi pi-search',
                'iconPos',
                'left',
                3,
                'onClick',
              ],
              [4, 'ngFor', 'ngForOf'],
              ['for', 'username'],
              [
                'id',
                'username',
                'type',
                'username',
                'aria-describedby',
                'username-help',
                'pInputText',
                '',
                3,
                'formControl',
              ],
              ['for', 'password'],
              [
                'id',
                'password',
                'type',
                'password',
                'aria-describedby',
                'password-help',
                'pInputText',
                '',
                3,
                'formControl',
              ],
              ['for', 'email'],
              [
                'id',
                'email',
                'type',
                'email',
                'aria-describedby',
                'email-help',
                'pInputText',
                '',
                3,
                'formControl',
              ],
              ['for', 'quality'],
              [
                'id',
                'quality',
                'type',
                'quality',
                'aria-describedby',
                'quality-help',
                'pInputText',
                '',
                3,
                'formControl',
              ],
              ['label', 'loadImage', 3, 'onClick'],
              [4, 'acHttpImage', 'acHttpImageOf'],
              [
                'src',
                'https://imgflip.com/s/meme/Sexy-Cat.jpg',
                'alt',
                'chiba',
                4,
                'acViewportSize',
              ],
              [
                'style',
                'width: 350px',
                'src',
                'https://imgflip.com/s/meme/Excited-Cat.jpg',
                'alt',
                'chiba',
                4,
                'acViewportSize',
              ],
              [
                'style',
                'width: 330px',
                'src',
                'https://imgflip.com/s/meme/Grumpy-Cat-Not-Amused.jpg',
                'alt',
                'chiba',
                4,
                'acViewportSize',
              ],
              [
                'src',
                'https://i.imgflip.com/2/2hgfw.jpg',
                'alt',
                'cat',
                4,
                'acViewportSize',
              ],
              ['acOnPasteImage', ''],
              ['pasteImage', 'acOnPasteImage'],
              ['alt', 'Hello', 3, 'src'],
              [
                'src',
                'https://imgflip.com/s/meme/Sexy-Cat.jpg',
                'alt',
                'chiba',
              ],
              [
                'src',
                'https://imgflip.com/s/meme/Excited-Cat.jpg',
                'alt',
                'chiba',
                2,
                'width',
                '350px',
              ],
              [
                'src',
                'https://imgflip.com/s/meme/Grumpy-Cat-Not-Amused.jpg',
                'alt',
                'chiba',
                2,
                'width',
                '330px',
              ],
              ['src', 'https://i.imgflip.com/2/2hgfw.jpg', 'alt', 'cat'],
              ['alt', 'description', 3, 'src'],
            ],
            template: function (t, e) {
              if (
                (1 & t &&
                  (bo(0, 'div'),
                  Jo(1, 'Hello Angular with NX Workspace'),
                  wo(),
                  So(2, 'img', 0),
                  bo(3, 'div'),
                  bo(4, 'h2'),
                  Jo(5, 'Pokemon'),
                  wo(),
                  bo(6, 'div'),
                  bo(7, 'p-button', 1),
                  ko('onClick', function () {
                    return e.sendRequest();
                  }),
                  wo(),
                  wo(),
                  wo(),
                  bo(8, 'div'),
                  mo(9, dg, 2, 1, 'div', 2),
                  Cl(10, 'async'),
                  wo(),
                  bo(11, 'h2'),
                  Jo(12, 'Example Validators Form'),
                  wo(),
                  bo(13, 'ac-accenture-validators-message'),
                  bo(14, 'label', 3),
                  Jo(15, 'Username'),
                  wo(),
                  So(16, 'input', 4),
                  wo(),
                  bo(17, 'ac-accenture-validators-message'),
                  bo(18, 'label', 5),
                  Jo(19, 'Password'),
                  wo(),
                  So(20, 'input', 6),
                  wo(),
                  bo(21, 'ac-accenture-validators-message'),
                  bo(22, 'label', 7),
                  Jo(23, 'Email'),
                  wo(),
                  So(24, 'input', 8),
                  wo(),
                  bo(25, 'ac-accenture-validators-message'),
                  bo(26, 'label', 9),
                  Jo(27, 'Quality'),
                  wo(),
                  So(28, 'input', 10),
                  wo(),
                  bo(29, 'h2'),
                  Jo(30, 'loadImage by Directive'),
                  wo(),
                  bo(31, 'p-button', 11),
                  ko('onClick', function () {
                    return e.switchImage();
                  }),
                  wo(),
                  mo(32, pg, 2, 1, 'div', 12),
                  bo(33, 'h2'),
                  Jo(34, 'Responsive with directive'),
                  wo(),
                  mo(35, fg, 1, 0, 'img', 13),
                  mo(36, gg, 1, 0, 'img', 14),
                  mo(37, mg, 1, 0, 'img', 15),
                  mo(38, yg, 1, 0, 'img', 16),
                  bo(39, 'h2'),
                  Jo(40, 'Paste Image'),
                  wo(),
                  bo(41, 'div', 17, 18),
                  mo(43, _g, 4, 5, 'ng-container', 2),
                  wo()),
                2 & t)
              ) {
                const t = ve(xe.lFrame.contextLView, 62);
                Br(9),
                  _o('ngForOf', El(10, 11, e.pokemon$)),
                  Br(7),
                  _o('formControl', e.nameInputForm),
                  Br(4),
                  _o('formControl', e.passwordInputForm),
                  Br(4),
                  _o('formControl', e.emailInputForm),
                  Br(4),
                  _o('formControl', e.qualityInputForm),
                  Br(4),
                  _o('acHttpImageOf', e.imageUrl),
                  Br(3),
                  _o('acViewportSize', 'xl'),
                  Br(1),
                  _o('acViewportSize', 'lg'),
                  Br(1),
                  _o('acViewportSize', 'md'),
                  Br(1),
                  _o('acViewportSize', 'sm'),
                  Br(5),
                  _o('ngForOf', t.files);
              }
            },
            directives: [Nf, hu, Vf, fh, Mf, Fh, ud, qf, cg, ug],
            pipes: [Su, hg],
            styles: [''],
          })),
          t
        );
      })();
      const bg = {
        baseUrl: 'http://localhost:4200',
        apiBaseUrl: 'http://localhost:1150',
        production: !0,
      };
      let wg = (() => {
          class t {
            constructor(t) {
              this.http = t;
            }
            getTranslation(t) {
              return this.http.get(`${bg.baseUrl}/assets/i18n/${t}.json`);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Kp));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          );
        })(),
        Sg = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({
              providers: [
                {
                  provide: lp,
                  useValue: up({
                    availableLangs: ['th', 'en'],
                    defaultLang: 'th',
                    reRenderOnLangChange: !0,
                    prodMode: bg.production,
                  }),
                },
                { provide: tp, useClass: wg },
              ],
              imports: [Tp],
            })),
            t
          );
        })();
      class Cg {}
      const Eg = '*';
      function Tg(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function xg(t) {
        return { type: 6, styles: t, offset: null };
      }
      function Ag(t) {
        Promise.resolve(null).then(t);
      }
      class kg {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          Ag(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class Og {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            n = 0,
            s = 0;
          const r = this.players.length;
          0 == r
            ? Ag(() => this._onFinish())
            : this.players.forEach((t) => {
                t.onDone(() => {
                  ++e == r && this._onFinish();
                }),
                  t.onDestroy(() => {
                    ++n == r && this._onDestroy();
                  }),
                  t.onStart(() => {
                    ++s == r && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (t, e) => Math.max(t, e.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((t) => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (t, e) => (null === t || e.totalTime > t.totalTime ? e : t),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      function Ig() {
        return 'undefined' != typeof window && void 0 !== window.document;
      }
      function Rg() {
        return (
          'undefined' != typeof process &&
          '[object process]' === {}.toString.call(process)
        );
      }
      function Pg(t) {
        switch (t.length) {
          case 0:
            return new kg();
          case 1:
            return t[0];
          default:
            return new Og(t);
        }
      }
      function Ng(t, e, n, s, r = {}, i = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (s.forEach((t) => {
            const n = t.offset,
              s = n == l,
              u = (s && c) || {};
            Object.keys(t).forEach((n) => {
              let s = n,
                a = t[n];
              if ('offset' !== n)
                switch (((s = e.normalizePropertyName(s, o)), a)) {
                  case '!':
                    a = r[n];
                    break;
                  case Eg:
                    a = i[n];
                    break;
                  default:
                    a = e.normalizeStyleValue(n, s, a, o);
                }
              u[s] = a;
            }),
              s || a.push(u),
              (c = u),
              (l = n);
          }),
          o.length)
        ) {
          const t = '\n - ';
          throw new Error(
            `Unable to animate due to the following errors:${t}${o.join(t)}`
          );
        }
        return a;
      }
      function Dg(t, e, n, s) {
        switch (e) {
          case 'start':
            t.onStart(() => s(n && Lg(n, 'start', t)));
            break;
          case 'done':
            t.onDone(() => s(n && Lg(n, 'done', t)));
            break;
          case 'destroy':
            t.onDestroy(() => s(n && Lg(n, 'destroy', t)));
        }
      }
      function Lg(t, e, n) {
        const s = n.totalTime,
          r = jg(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == s ? t.totalTime : s,
            !!n.disabled
          ),
          i = t._data;
        return null != i && (r._data = i), r;
      }
      function jg(t, e, n, s, r = '', i = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: s,
          phaseName: r,
          totalTime: i,
          disabled: !!o,
        };
      }
      function Fg(t, e, n) {
        let s;
        return (
          t instanceof Map
            ? ((s = t.get(e)), s || t.set(e, (s = n)))
            : ((s = t[e]), s || (s = t[e] = n)),
          s
        );
      }
      function Vg(t) {
        const e = t.indexOf(':');
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let Mg = (t, e) => !1,
        Ug = (t, e) => !1,
        Hg = (t, e, n) => [];
      const $g = Rg();
      ($g || 'undefined' != typeof Element) &&
        ((Mg = Ig()
          ? (t, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === t) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (t, e) => t.contains(e)),
        (Ug = (() => {
          if ($g || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : Ug;
          }
        })()),
        (Hg = (t, e, n) => {
          let s = [];
          if (n) {
            const n = t.querySelectorAll(e);
            for (let t = 0; t < n.length; t++) s.push(n[t]);
          } else {
            const n = t.querySelector(e);
            n && s.push(n);
          }
          return s;
        }));
      let Bg = null,
        qg = !1;
      function zg(t) {
        Bg ||
          ((Bg = ('undefined' != typeof document ? document.body : null) || {}),
          (qg = !!Bg.style && 'WebkitAppearance' in Bg.style));
        let e = !0;
        return (
          Bg.style &&
            !(function (t) {
              return 'ebkit' == t.substring(1, 6);
            })(t) &&
            ((e = t in Bg.style), !e && qg) &&
            (e =
              'Webkit' + t.charAt(0).toUpperCase() + t.substr(1) in Bg.style),
          e
        );
      }
      const Wg = Ug,
        Qg = Mg,
        Kg = Hg;
      function Gg(t) {
        const e = {};
        return (
          Object.keys(t).forEach((n) => {
            const s = n.replace(/([a-z])([A-Z])/g, '$1-$2');
            e[s] = t[n];
          }),
          e
        );
      }
      let Zg = (() => {
        class t {
          validateStyleProperty(t) {
            return zg(t);
          }
          matchesElement(t, e) {
            return Wg(t, e);
          }
          containsElement(t, e) {
            return Qg(t, e);
          }
          query(t, e, n) {
            return Kg(t, e, n);
          }
          computeStyle(t, e, n) {
            return n || '';
          }
          animate(t, e, n, s, r, i = [], o) {
            return new kg(n, s);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Yg {}
      Yg.NOOP = new Zg();
      const Jg = 'ng-enter',
        Xg = 'ng-leave',
        tm = 'ng-trigger',
        em = '.ng-trigger',
        nm = 'ng-animating',
        sm = '.ng-animating';
      function rm(t) {
        if ('number' == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : im(parseFloat(e[1]), e[2]);
      }
      function im(t, e) {
        switch (e) {
          case 's':
            return 1e3 * t;
          default:
            return t;
        }
      }
      function om(t, e, n) {
        return t.hasOwnProperty('duration')
          ? t
          : (function (t, e, n) {
              let s,
                r = 0,
                i = '';
              if ('string' == typeof t) {
                const n = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: '' }
                  );
                s = im(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (r = im(parseFloat(o), n[4]));
                const a = n[5];
                a && (i = a);
              } else s = t;
              if (!n) {
                let n = !1,
                  i = e.length;
                s < 0 &&
                  (e.push(
                    'Duration values below 0 are not allowed for this animation step.'
                  ),
                  (n = !0)),
                  r < 0 &&
                    (e.push(
                      'Delay values below 0 are not allowed for this animation step.'
                    ),
                    (n = !0)),
                  n &&
                    e.splice(
                      i,
                      0,
                      `The provided timing value "${t}" is invalid.`
                    );
              }
              return { duration: s, delay: r, easing: i };
            })(t, e, n);
      }
      function am(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function lm(t, e, n = {}) {
        if (e) for (let s in t) n[s] = t[s];
        else am(t, n);
        return n;
      }
      function cm(t, e, n) {
        return n ? e + ':' + n + ';' : '';
      }
      function um(t) {
        let e = '';
        for (let n = 0; n < t.style.length; n++) {
          const s = t.style.item(n);
          e += cm(0, s, t.style.getPropertyValue(s));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith('_') &&
            (e += cm(
              0,
              n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
              t.style[n]
            ));
        t.setAttribute('style', e);
      }
      function hm(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((s) => {
            const r = vm(s);
            n && !n.hasOwnProperty(s) && (n[s] = t.style[r]),
              (t.style[r] = e[s]);
          }),
          Rg() && um(t));
      }
      function dm(t, e) {
        t.style &&
          (Object.keys(e).forEach((e) => {
            const n = vm(e);
            t.style[n] = '';
          }),
          Rg() && um(t));
      }
      function pm(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : Tg(t)) : t;
      }
      const fm = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
      function gm(t) {
        let e = [];
        if ('string' == typeof t) {
          let n;
          for (; (n = fm.exec(t)); ) e.push(n[1]);
          fm.lastIndex = 0;
        }
        return e;
      }
      function mm(t, e, n) {
        const s = t.toString(),
          r = s.replace(fm, (t, s) => {
            let r = e[s];
            return (
              e.hasOwnProperty(s) ||
                (n.push(`Please provide a value for the animation param ${s}`),
                (r = '')),
              r.toString()
            );
          });
        return r == s ? t : r;
      }
      function ym(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const _m = /-+([a-z0-9])/g;
      function vm(t) {
        return t.replace(_m, (...t) => t[1].toUpperCase());
      }
      function bm(t, e) {
        return 0 === t || 0 === e;
      }
      function wm(t, e, n) {
        const s = Object.keys(n);
        if (s.length && e.length) {
          let i = e[0],
            o = [];
          if (
            (s.forEach((t) => {
              i.hasOwnProperty(t) || o.push(t), (i[t] = n[t]);
            }),
            o.length)
          )
            for (var r = 1; r < e.length; r++) {
              let n = e[r];
              o.forEach(function (e) {
                n[e] = Cm(t, e);
              });
            }
        }
        return e;
      }
      function Sm(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${e.type}`
            );
        }
      }
      function Cm(t, e) {
        return window.getComputedStyle(t)[e];
      }
      const Em = '*';
      function Tm(t, e) {
        const n = [];
        return (
          'string' == typeof t
            ? t.split(/\s*,\s*/).forEach((t) =>
                (function (t, e, n) {
                  if (':' == t[0]) {
                    const s = (function (t, e) {
                      switch (t) {
                        case ':enter':
                          return 'void => *';
                        case ':leave':
                          return '* => void';
                        case ':increment':
                          return (t, e) => parseFloat(e) > parseFloat(t);
                        case ':decrement':
                          return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${t}" is not supported`
                            ),
                            '* => *'
                          );
                      }
                    })(t, n);
                    if ('function' == typeof s) return void e.push(s);
                    t = s;
                  }
                  const s = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == s || s.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${t}" is not supported`
                      ),
                      e
                    );
                  const r = s[1],
                    i = s[2],
                    o = s[3];
                  e.push(km(r, o)),
                    '<' != i[0] || (r == Em && o == Em) || e.push(km(o, r));
                })(t, n, e)
              )
            : n.push(t),
          n
        );
      }
      const xm = new Set(['true', '1']),
        Am = new Set(['false', '0']);
      function km(t, e) {
        const n = xm.has(t) || Am.has(t),
          s = xm.has(e) || Am.has(e);
        return (r, i) => {
          let o = t == Em || t == r,
            a = e == Em || e == i;
          return (
            !o && n && 'boolean' == typeof r && (o = r ? xm.has(t) : Am.has(t)),
            !a && s && 'boolean' == typeof i && (a = i ? xm.has(e) : Am.has(e)),
            o && a
          );
        };
      }
      const Om = new RegExp('s*:selfs*,?', 'g');
      function Im(t, e, n) {
        return new Rm(t).build(e, n);
      }
      class Rm {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const n = new Pm(e);
          return this._resetContextStyleTimingState(n), Sm(this, pm(t), n);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ''),
            (t.collectedStyles = {}),
            (t.collectedStyles[''] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let n = (e.queryCount = 0),
            s = (e.depCount = 0);
          const r = [],
            i = [];
          return (
            '@' == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            t.definitions.forEach((t) => {
              if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
                const n = t,
                  s = n.name;
                s
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((t) => {
                    (n.name = t), r.push(this.visitState(n, e));
                  }),
                  (n.name = s);
              } else if (1 == t.type) {
                const r = this.visitTransition(t, e);
                (n += r.queryCount), (s += r.depCount), i.push(r);
              } else
                e.errors.push(
                  'only state() and transition() definitions can sit inside of a trigger()'
                );
            }),
            {
              type: 7,
              name: t.name,
              states: r,
              transitions: i,
              queryCount: n,
              depCount: s,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            s = (t.options && t.options.params) || null;
          if (n.containsDynamicStyles) {
            const r = new Set(),
              i = s || {};
            if (
              (n.styles.forEach((t) => {
                if (Nm(t)) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    gm(e[t]).forEach((t) => {
                      i.hasOwnProperty(t) || r.add(t);
                    });
                  });
                }
              }),
              r.size)
            ) {
              const n = ym(r.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ', '
                )}`
              );
            }
          }
          return {
            type: 0,
            name: t.name,
            style: n,
            options: s ? { params: s } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const n = Sm(this, pm(t.animation), e);
          return {
            type: 1,
            matchers: Tm(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: Dm(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((t) => Sm(this, t, e)),
            options: Dm(t.options),
          };
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let s = 0;
          const r = t.steps.map((t) => {
            e.currentTime = n;
            const r = Sm(this, t, e);
            return (s = Math.max(s, e.currentTime)), r;
          });
          return (
            (e.currentTime = s), { type: 3, steps: r, options: Dm(t.options) }
          );
        }
        visitAnimate(t, e) {
          const n = (function (t, e) {
            let n = null;
            if (t.hasOwnProperty('duration')) n = t;
            else if ('number' == typeof t) return Lm(om(t, e).duration, 0, '');
            const s = t;
            if (
              s
                .split(/\s+/)
                .some((t) => '{' == t.charAt(0) && '{' == t.charAt(1))
            ) {
              const t = Lm(0, 0, '');
              return (t.dynamic = !0), (t.strValue = s), t;
            }
            return (n = n || om(s, e)), Lm(n.duration, n.delay, n.easing);
          })(t.timings, e.errors);
          let s;
          e.currentAnimateTimings = n;
          let r = t.styles ? t.styles : xg({});
          if (5 == r.type) s = this.visitKeyframes(r, e);
          else {
            let r = t.styles,
              i = !1;
            if (!r) {
              i = !0;
              const t = {};
              n.easing && (t.easing = n.easing), (r = xg(t));
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(r, e);
            (o.isEmptyStep = i), (s = o);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: n, style: s, options: null }
          );
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n;
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles)
            ? t.styles.forEach((t) => {
                'string' == typeof t
                  ? t == Eg
                    ? n.push(t)
                    : e.errors.push(
                        `The provided style string value ${t} is not allowed.`
                      )
                  : n.push(t);
              })
            : n.push(t.styles);
          let s = !1,
            r = null;
          return (
            n.forEach((t) => {
              if (Nm(t)) {
                const e = t,
                  n = e.easing;
                if ((n && ((r = n), delete e.easing), !s))
                  for (let t in e)
                    if (e[t].toString().indexOf('{{') >= 0) {
                      s = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: r,
              offset: t.offset,
              containsDynamicStyles: s,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let s = e.currentTime,
            r = e.currentTime;
          n && r > 0 && (r -= n.duration + n.delay),
            t.styles.forEach((t) => {
              'string' != typeof t &&
                Object.keys(t).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void e.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const i = e.collectedStyles[e.currentQuerySelector],
                    o = i[n];
                  let a = !0;
                  o &&
                    (r != s &&
                      r >= o.startTime &&
                      s <= o.endTime &&
                      (e.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${r}ms" and "${s}ms"`
                      ),
                      (a = !1)),
                    (r = o.startTime)),
                    a && (i[n] = { startTime: r, endTime: s }),
                    e.options &&
                      (function (t, e, n) {
                        const s = e.params || {},
                          r = gm(t);
                        r.length &&
                          r.forEach((t) => {
                            s.hasOwnProperty(t) ||
                              n.push(
                                `Unable to resolve the local animation param ${t} in the given list of values`
                              );
                          });
                      })(t[n], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const n = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                'keyframes() must be placed inside of a call to animate()'
              ),
              n
            );
          let s = 0;
          const r = [];
          let i = !1,
            o = !1,
            a = 0;
          const l = t.steps.map((t) => {
            const n = this._makeStyleAst(t, e);
            let l =
                null != n.offset
                  ? n.offset
                  : (function (t) {
                      if ('string' == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((t) => {
                          if (Nm(t) && t.hasOwnProperty('offset')) {
                            const n = t;
                            (e = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (Nm(t) && t.hasOwnProperty('offset')) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(n.styles),
              c = 0;
            return (
              null != l && (s++, (c = n.offset = l)),
              (o = o || c < 0 || c > 1),
              (i = i || c < a),
              (a = c),
              r.push(c),
              n
            );
          });
          o &&
            e.errors.push(
              'Please ensure that all keyframe offsets are between 0 and 1'
            ),
            i &&
              e.errors.push(
                'Please ensure that all keyframe offsets are in order'
              );
          const c = t.steps.length;
          let u = 0;
          s > 0 && s < c
            ? e.errors.push(
                'Not all style() steps within the declared keyframes() contain offsets'
              )
            : 0 == s && (u = 1 / (c - 1));
          const h = c - 1,
            d = e.currentTime,
            p = e.currentAnimateTimings,
            f = p.duration;
          return (
            l.forEach((t, s) => {
              const i = u > 0 ? (s == h ? 1 : u * s) : r[s],
                o = i * f;
              (e.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(t, e),
                (t.offset = i),
                n.styles.push(t);
            }),
            n
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: Sm(this, pm(t.animation), e),
            options: Dm(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: Dm(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: Dm(t.options),
          };
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            s = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [r, i] = (function (t) {
            const e = !!t.split(/\s*,\s*/).find((t) => ':self' == t);
            return (
              e && (t = t.replace(Om, '')),
              [
                (t = t
                  .replace(/@\*/g, em)
                  .replace(/@\w+/g, (t) => '.ng-trigger-' + t.substr(1))
                  .replace(/:animating/g, sm)),
                e,
              ]
            );
          })(t.selector);
          (e.currentQuerySelector = n.length ? n + ' ' + r : r),
            Fg(e.collectedStyles, e.currentQuerySelector, {});
          const o = Sm(this, pm(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = n),
            {
              type: 11,
              selector: r,
              limit: s.limit || 0,
              optional: !!s.optional,
              includeSelf: i,
              animation: o,
              originalSelector: t.selector,
              options: Dm(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push('stagger() can only be used inside of query()');
          const n =
            'full' === t.timings
              ? { duration: 0, delay: 0, easing: 'full' }
              : om(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: Sm(this, pm(t.animation), e),
            timings: n,
            options: null,
          };
        }
      }
      class Pm {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function Nm(t) {
        return !Array.isArray(t) && 'object' == typeof t;
      }
      function Dm(t) {
        var e;
        return (
          t
            ? (t = am(t)).params && (t.params = (e = t.params) ? am(e) : null)
            : (t = {}),
          t
        );
      }
      function Lm(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function jm(t, e, n, s, r, i, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: s,
          duration: r,
          delay: i,
          totalTime: r + i,
          easing: o,
          subTimeline: a,
        };
      }
      class Fm {
        constructor() {
          this._map = new Map();
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : (e = []), e;
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, (n = [])), n.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const Vm = new RegExp(':enter', 'g'),
        Mm = new RegExp(':leave', 'g');
      function Um(t, e, n, s, r, i = {}, o = {}, a, l, c = []) {
        return new Hm().buildKeyframes(t, e, n, s, r, i, o, a, l, c);
      }
      class Hm {
        buildKeyframes(t, e, n, s, r, i, o, a, l, c = []) {
          l = l || new Fm();
          const u = new Bm(t, e, l, s, r, c, []);
          (u.options = a),
            u.currentTimeline.setStyles([i], null, u.errors, a),
            Sm(this, n, u);
          const h = u.timelines.filter((t) => t.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const t = h[h.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, u.errors, a);
          }
          return h.length
            ? h.map((t) => t.buildKeyframes())
            : [jm(e, [], [], [], 0, 0, '', !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const s = e.createSubContext(t.options),
              r = e.currentTimeline.currentTime,
              i = this._visitSubInstructions(n, s, s.options);
            r != i && e.transformIntoNewTimeline(i);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(),
            this.visitReference(t.animation, n),
            e.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, n) {
          let s = e.currentTimeline.currentTime;
          const r = null != n.duration ? rm(n.duration) : null,
            i = null != n.delay ? rm(n.delay) : null;
          return (
            0 !== r &&
              t.forEach((t) => {
                const n = e.appendInstructionToTimeline(t, r, i);
                s = Math.max(s, n.duration + n.delay);
              }),
            s
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            Sm(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let s = e;
          const r = t.options;
          if (
            r &&
            (r.params || r.delay) &&
            ((s = e.createSubContext(r)),
            s.transformIntoNewTimeline(),
            null != r.delay)
          ) {
            6 == s.previousNode.type &&
              (s.currentTimeline.snapshotCurrentStyles(),
              (s.previousNode = $m));
            const t = rm(r.delay);
            s.delayNextStep(t);
          }
          t.steps.length &&
            (t.steps.forEach((t) => Sm(this, t, s)),
            s.currentTimeline.applyStylesToKeyframe(),
            s.subContextCount > n && s.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const n = [];
          let s = e.currentTimeline.currentTime;
          const r = t.options && t.options.delay ? rm(t.options.delay) : 0;
          t.steps.forEach((i) => {
            const o = e.createSubContext(t.options);
            r && o.delayNextStep(r),
              Sm(this, i, o),
              (s = Math.max(s, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((t) => e.currentTimeline.mergeTimelineCollectedStyles(t)),
            e.transformIntoNewTimeline(s),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return om(e.params ? mm(n, e.params, e.errors) : n, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            s = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), s.snapshotCurrentStyles());
          const r = t.style;
          5 == r.type
            ? this.visitKeyframes(r, e)
            : (e.incrementTime(n.duration),
              this.visitStyle(r, e),
              s.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            s = e.currentAnimateTimings;
          !s && n.getCurrentStyleProperties().length && n.forwardFrame();
          const r = (s && s.easing) || t.easing;
          t.isEmptyStep
            ? n.applyEmptyStep(r)
            : n.setStyles(t.styles, r, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            s = e.currentTimeline.duration,
            r = n.duration,
            i = e.createSubContext().currentTimeline;
          (i.easing = n.easing),
            t.styles.forEach((t) => {
              i.forwardTime((t.offset || 0) * r),
                i.setStyles(t.styles, t.easing, e.errors, e.options),
                i.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(i),
            e.transformIntoNewTimeline(s + r),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            s = t.options || {},
            r = s.delay ? rm(s.delay) : 0;
          r &&
            (6 === e.previousNode.type ||
              (0 == n &&
                e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = $m));
          let i = n;
          const o = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!s.optional,
            e.errors
          );
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, s) => {
            e.currentQueryIndex = s;
            const o = e.createSubContext(t.options, n);
            r && o.delayNextStep(r),
              n === e.element && (a = o.currentTimeline),
              Sm(this, t.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (i = Math.max(i, o.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(i),
            a &&
              (e.currentTimeline.mergeTimelineCollectedStyles(a),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            s = e.currentTimeline,
            r = t.timings,
            i = Math.abs(r.duration),
            o = i * (e.currentQueryTotal - 1);
          let a = i * e.currentQueryIndex;
          switch (r.duration < 0 ? 'reverse' : r.easing) {
            case 'reverse':
              a = o - a;
              break;
            case 'full':
              a = n.currentStaggerTime;
          }
          const l = e.currentTimeline;
          a && l.delayNextStep(a);
          const c = l.currentTime;
          Sm(this, t.animation, e),
            (e.previousNode = t),
            (n.currentStaggerTime =
              s.currentTime - c + (s.startTime - n.currentTimeline.startTime));
        }
      }
      const $m = {};
      class Bm {
        constructor(t, e, n, s, r, i, o, a) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = n),
            (this._enterClassName = s),
            (this._leaveClassName = r),
            (this.errors = i),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = $m),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new qm(this._driver, e, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let s = this.options;
          null != n.duration && (s.duration = rm(n.duration)),
            null != n.delay && (s.delay = rm(n.delay));
          const r = n.params;
          if (r) {
            let t = s.params;
            t || (t = this.options.params = {}),
              Object.keys(r).forEach((n) => {
                (e && t.hasOwnProperty(n)) || (t[n] = mm(r[n], t, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = (t.params = {});
              Object.keys(e).forEach((t) => {
                n[t] = e[t];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, n) {
          const s = e || this.element,
            r = new Bm(
              this._driver,
              s,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(s, n || 0)
            );
          return (
            (r.previousNode = this.previousNode),
            (r.currentAnimateTimings = this.currentAnimateTimings),
            (r.options = this._copyOptions()),
            r.updateOptions(t),
            (r.currentQueryIndex = this.currentQueryIndex),
            (r.currentQueryTotal = this.currentQueryTotal),
            (r.parentContext = this),
            this.subContextCount++,
            r
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = $m),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, n) {
          const s = {
              duration: null != e ? e : t.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                t.delay,
              easing: '',
            },
            r = new zm(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              s,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(r), s;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, n, s, r, i) {
          let o = [];
          if ((s && o.push(this.element), t.length > 0)) {
            t = (t = t.replace(Vm, '.' + this._enterClassName)).replace(
              Mm,
              '.' + this._leaveClassName
            );
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n &&
              (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)),
              o.push(...e);
          }
          return (
            r ||
              0 != o.length ||
              i.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class qm {
        constructor(t, e, n, s) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = s),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
              e
            )),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new qm(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || Eg),
                (this._currentKeyframe[t] = Eg);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, n, s) {
          e && (this._previousKeyframe.easing = e);
          const r = (s && s.params) || {},
            i = (function (t, e) {
              const n = {};
              let s;
              return (
                t.forEach((t) => {
                  '*' === t
                    ? ((s = s || Object.keys(e)),
                      s.forEach((t) => {
                        n[t] = Eg;
                      }))
                    : lm(t, !1, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          Object.keys(i).forEach((t) => {
            const e = mm(i[t], r, n);
            (this._pendingStyles[t] = e),
              this._localTimelineStyles.hasOwnProperty(t) ||
                (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(
                  t
                )
                  ? this._globalTimelineStyles[t]
                  : Eg),
              this._updateStyle(t, e);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach((e) => {
              this._currentKeyframe[e] = t[e];
            }),
            Object.keys(this._localTimelineStyles).forEach((t) => {
              this._currentKeyframe.hasOwnProperty(t) ||
                (this._currentKeyframe[t] = this._localTimelineStyles[t]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((t) => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach((e) => {
            const n = this._styleSummary[e],
              s = t._styleSummary[e];
            (!n || s.time > n.time) && this._updateStyle(e, s.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let s = [];
          this._keyframes.forEach((r, i) => {
            const o = lm(r, !0);
            Object.keys(o).forEach((n) => {
              const s = o[n];
              '!' == s ? t.add(n) : s == Eg && e.add(n);
            }),
              n || (o.offset = i / this.duration),
              s.push(o);
          });
          const r = t.size ? ym(t.values()) : [],
            i = e.size ? ym(e.values()) : [];
          if (n) {
            const t = s[0],
              e = am(t);
            (t.offset = 0), (e.offset = 1), (s = [t, e]);
          }
          return jm(
            this.element,
            s,
            r,
            i,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class zm extends qm {
        constructor(t, e, n, s, r, i, o = !1) {
          super(t, e, i.delay),
            (this.element = e),
            (this.keyframes = n),
            (this.preStyleProps = s),
            (this.postStyleProps = r),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: i.duration,
              delay: i.delay,
              easing: i.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: n, easing: s } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const r = [],
              i = n + e,
              o = e / i,
              a = lm(t[0], !1);
            (a.offset = 0), r.push(a);
            const l = lm(t[0], !1);
            (l.offset = Wm(o)), r.push(l);
            const c = t.length - 1;
            for (let s = 1; s <= c; s++) {
              let o = lm(t[s], !1);
              (o.offset = Wm((e + o.offset * n) / i)), r.push(o);
            }
            (n = i), (e = 0), (s = ''), (t = r);
          }
          return jm(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            n,
            e,
            s,
            !0
          );
        }
      }
      function Wm(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class Qm {}
      class Km extends Qm {
        normalizePropertyName(t, e) {
          return vm(t);
        }
        normalizeStyleValue(t, e, n, s) {
          let r = '';
          const i = n.toString().trim();
          if (Gm[e] && 0 !== n && '0' !== n)
            if ('number' == typeof n) r = 'px';
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e &&
                0 == e[1].length &&
                s.push(`Please provide a CSS unit value for ${t}:${n}`);
            }
          return i + r;
        }
      }
      const Gm = (() =>
        (function (t) {
          const e = {};
          return t.forEach((t) => (e[t] = !0)), e;
        })(
          'width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'.split(
            ','
          )
        ))();
      function Zm(t, e, n, s, r, i, o, a, l, c, u, h, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: r,
          fromState: n,
          fromStyles: i,
          toState: s,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: h,
          errors: d,
        };
      }
      const Ym = {};
      class Jm {
        constructor(t, e, n) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
        }
        match(t, e, n, s) {
          return (function (t, e, n, s, r) {
            return t.some((t) => t(e, n, s, r));
          })(this.ast.matchers, t, e, n, s);
        }
        buildStyles(t, e, n) {
          const s = this._stateStyles['*'],
            r = this._stateStyles[t],
            i = s ? s.buildStyles(e, n) : {};
          return r ? r.buildStyles(e, n) : i;
        }
        build(t, e, n, s, r, i, o, a, l, c) {
          const u = [],
            h = (this.ast.options && this.ast.options.params) || Ym,
            d = this.buildStyles(n, (o && o.params) || Ym, u),
            p = (a && a.params) || Ym,
            f = this.buildStyles(s, p, u),
            g = new Set(),
            m = new Map(),
            y = new Map(),
            _ = 'void' === s,
            v = { params: Object.assign(Object.assign({}, h), p) },
            b = c ? [] : Um(t, e, this.ast.animation, r, i, d, f, v, l, u);
          let w = 0;
          if (
            (b.forEach((t) => {
              w = Math.max(t.duration + t.delay, w);
            }),
            u.length)
          )
            return Zm(e, this._triggerName, n, s, _, d, f, [], [], m, y, w, u);
          b.forEach((t) => {
            const n = t.element,
              s = Fg(m, n, {});
            t.preStyleProps.forEach((t) => (s[t] = !0));
            const r = Fg(y, n, {});
            t.postStyleProps.forEach((t) => (r[t] = !0)), n !== e && g.add(n);
          });
          const S = ym(g.values());
          return Zm(e, this._triggerName, n, s, _, d, f, b, S, m, y, w);
        }
      }
      class Xm {
        constructor(t, e) {
          (this.styles = t), (this.defaultParams = e);
        }
        buildStyles(t, e) {
          const n = {},
            s = am(this.defaultParams);
          return (
            Object.keys(t).forEach((e) => {
              const n = t[e];
              null != n && (s[e] = n);
            }),
            this.styles.styles.forEach((t) => {
              if ('string' != typeof t) {
                const r = t;
                Object.keys(r).forEach((t) => {
                  let i = r[t];
                  i.length > 1 && (i = mm(i, s, e)), (n[t] = i);
                });
              }
            }),
            n
          );
        }
      }
      class ty {
        constructor(t, e) {
          (this.name = t),
            (this.ast = e),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach((t) => {
              this.states[t.name] = new Xm(
                t.style,
                (t.options && t.options.params) || {}
              );
            }),
            ey(this.states, 'true', '1'),
            ey(this.states, 'false', '0'),
            e.transitions.forEach((e) => {
              this.transitionFactories.push(new Jm(t, e, this.states));
            }),
            (this.fallbackTransition = new Jm(
              t,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(t, e) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, n, s) {
          return (
            this.transitionFactories.find((r) => r.match(t, e, n, s)) || null
          );
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n);
        }
      }
      function ey(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const ny = new Fm();
      class sy {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const n = [],
            s = Im(this._driver, e, n);
          if (n.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${n.join(
                '\n'
              )}`
            );
          this._animations[t] = s;
        }
        _buildPlayer(t, e, n) {
          const s = t.element,
            r = Ng(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(
            s,
            r,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, n = {}) {
          const s = [],
            r = this._animations[t];
          let i;
          const o = new Map();
          if (
            (r
              ? ((i = Um(this._driver, e, r, Jg, Xg, {}, {}, n, ny, s)),
                i.forEach((t) => {
                  const e = Fg(o, t.element, {});
                  t.postStyleProps.forEach((t) => (e[t] = null));
                }))
              : (s.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (i = [])),
            s.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${s.join(
                '\n'
              )}`
            );
          o.forEach((t, e) => {
            Object.keys(t).forEach((n) => {
              t[n] = this._driver.computeStyle(e, n, Eg);
            });
          });
          const a = Pg(
            i.map((t) => {
              const e = o.get(t.element);
              return this._buildPlayer(t, {}, e);
            })
          );
          return (
            (this._playersById[t] = a),
            a.onDestroy(() => this.destroy(t)),
            this.players.push(a),
            a
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e)
            throw new Error(
              `Unable to find the timeline player referenced by ${t}`
            );
          return e;
        }
        listen(t, e, n, s) {
          const r = jg(e, '', '', '');
          return Dg(this._getPlayer(t), n, r, s), () => {};
        }
        command(t, e, n, s) {
          if ('register' == n) return void this.register(t, s[0]);
          if ('create' == n) return void this.create(t, e, s[0] || {});
          const r = this._getPlayer(t);
          switch (n) {
            case 'play':
              r.play();
              break;
            case 'pause':
              r.pause();
              break;
            case 'reset':
              r.reset();
              break;
            case 'restart':
              r.restart();
              break;
            case 'finish':
              r.finish();
              break;
            case 'init':
              r.init();
              break;
            case 'setPosition':
              r.setPosition(parseFloat(s[0]));
              break;
            case 'destroy':
              this.destroy(t);
          }
        }
      }
      const ry = 'ng-animate-queued',
        iy = 'ng-animate-disabled',
        oy = '.ng-animate-disabled',
        ay = [],
        ly = {
          namespaceId: '',
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        cy = {
          namespaceId: '',
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class uy {
        constructor(t, e = '') {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty('value');
          if (((this.value = null != (s = n ? t.value : t) ? s : null), n)) {
            const e = am(t);
            delete e.value, (this.options = e);
          } else this.options = {};
          var s;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach((n) => {
              null == t[n] && (t[n] = e[n]);
            });
          }
        }
      }
      const hy = 'void',
        dy = new uy(hy);
      class py {
        constructor(t, e, n) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + t),
            by(e, this._hostClassName);
        }
        listen(t, e, n, s) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
            );
          if ('start' != (r = n) && 'done' != r)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
            );
          var r;
          const i = Fg(this._elementListeners, t, []),
            o = { name: e, phase: n, callback: s };
          i.push(o);
          const a = Fg(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) ||
              (by(t, tm), by(t, 'ng-trigger-' + e), (a[e] = dy)),
            () => {
              this._engine.afterFlush(() => {
                const t = i.indexOf(o);
                t >= 0 && i.splice(t, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e)
            throw new Error(
              `The provided animation trigger "${t}" has not been registered!`
            );
          return e;
        }
        trigger(t, e, n, s = !0) {
          const r = this._getTrigger(e),
            i = new gy(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o ||
            (by(t, tm),
            by(t, 'ng-trigger-' + e),
            this._engine.statesByElement.set(t, (o = {})));
          let a = o[e];
          const l = new uy(n, this.id);
          if (
            (!(n && n.hasOwnProperty('value')) &&
              a &&
              l.absorbOptions(a.options),
            (o[e] = l),
            a || (a = dy),
            l.value !== hy && a.value === l.value)
          ) {
            if (
              !(function (t, e) {
                const n = Object.keys(t),
                  s = Object.keys(e);
                if (n.length != s.length) return !1;
                for (let r = 0; r < n.length; r++) {
                  const s = n[r];
                  if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1;
                }
                return !0;
              })(a.params, l.params)
            ) {
              const e = [],
                n = r.matchStyles(a.value, a.params, e),
                s = r.matchStyles(l.value, l.params, e);
              e.length
                ? this._engine.reportError(e)
                : this._engine.afterFlush(() => {
                    dm(t, n), hm(t, s);
                  });
            }
            return;
          }
          const c = Fg(this._engine.playersByElement, t, []);
          c.forEach((t) => {
            t.namespaceId == this.id &&
              t.triggerName == e &&
              t.queued &&
              t.destroy();
          });
          let u = r.matchTransition(a.value, l.value, t, l.params),
            h = !1;
          if (!u) {
            if (!s) return;
            (u = r.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: u,
              fromState: a,
              toState: l,
              player: i,
              isFallbackTransition: h,
            }),
            h ||
              (by(t, ry),
              i.onStart(() => {
                wy(t, ry);
              })),
            i.onDone(() => {
              let e = this.players.indexOf(i);
              e >= 0 && this.players.splice(e, 1);
              const n = this._engine.playersByElement.get(t);
              if (n) {
                let t = n.indexOf(i);
                t >= 0 && n.splice(t, 1);
              }
            }),
            this.players.push(i),
            c.push(i),
            i
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, n) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, n) => {
              this._elementListeners.set(
                n,
                e.filter((e) => e.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((t) => t.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, em, !0);
          n.forEach((t) => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(t, e, !1, !0))
              : this.clearElementCache(t);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach((t) => this.clearElementCache(t))
            );
        }
        triggerLeaveAnimation(t, e, n, s) {
          const r = this._engine.statesByElement.get(t);
          if (r) {
            const i = [];
            if (
              (Object.keys(r).forEach((e) => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, hy, s);
                  n && i.push(n);
                }
              }),
              i.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e),
                n && Pg(i).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            n = this._engine.statesByElement.get(t);
          if (e && n) {
            const s = new Set();
            e.forEach((e) => {
              const r = e.name;
              if (s.has(r)) return;
              s.add(r);
              const i = this._triggers[r].fallbackTransition,
                o = n[r] || dy,
                a = new uy(hy),
                l = new gy(this.id, r, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: r,
                  transition: i,
                  fromState: o,
                  toState: a,
                  player: l,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let s = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) s = !0;
            else {
              let e = t;
              for (; (e = e.parentNode); )
                if (n.statesByElement.get(e)) {
                  s = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), s))
            n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const s = t.__ng_removed;
            (s && s !== ly) ||
              (n.afterFlush(() => this.clearElementCache(t)),
              n.destroyInnerAnimations(t),
              n._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          by(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((n) => {
              const s = n.player;
              if (s.destroyed) return;
              const r = n.element,
                i = this._elementListeners.get(r);
              i &&
                i.forEach((e) => {
                  if (e.name == n.triggerName) {
                    const s = jg(
                      r,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (s._data = t), Dg(n.player, e.phase, s, e.callback);
                  }
                }),
                s.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      s.destroy();
                    })
                  : e.push(n);
            }),
            (this._queue = []),
            e.sort((t, e) => {
              const n = t.transition.ast.depCount,
                s = e.transition.ast.depCount;
              return 0 == n || 0 == s
                ? n - s
                : this._engine.driver.containsElement(t.element, e.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((e) => e.element === t) || e),
            e
          );
        }
      }
      class fy {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (t, e) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((e) => {
                e.queued && t.push(e);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const n = new py(t, e, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, e)
              ? this._balanceNamespaceList(n, e)
              : (this.newHostElements.set(e, n), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = n)
          );
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let s = !1;
            for (let r = n; r >= 0; r--)
              if (
                this.driver.containsElement(
                  this._namespaceList[r].hostElement,
                  e
                )
              ) {
                this._namespaceList.splice(r + 1, 0, t), (s = !0);
                break;
              }
            s || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n;
        }
        registerTrigger(t, e, n) {
          let s = this._namespaceLookup[t];
          s && s.register(e, n) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let s = 0; s < t.length; s++) {
              const r = n[t[s]].namespaceId;
              if (r) {
                const t = this._fetchNamespace(r);
                t && e.add(t);
              }
            }
          }
          return e;
        }
        trigger(t, e, n, s) {
          if (my(e)) {
            const r = this._fetchNamespace(t);
            if (r) return r.trigger(e, n, s), !0;
          }
          return !1;
        }
        insertNode(t, e, n, s) {
          if (!my(e)) return;
          const r = e.__ng_removed;
          if (r && r.setForRemoval) {
            (r.setForRemoval = !1), (r.setForMove = !0);
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(e, n);
          }
          s && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), by(t, iy))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), wy(t, iy));
        }
        removeNode(t, e, n, s) {
          if (my(e)) {
            const r = t ? this._fetchNamespace(t) : null;
            if (
              (r ? r.removeNode(e, s) : this.markElementAsRemoved(t, e, !1, s),
              n)
            ) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, s);
            }
          } else this._onRemovalComplete(e, s);
        }
        markElementAsRemoved(t, e, n, s) {
          this.collectedLeaveElements.push(e),
            (e.__ng_removed = {
              namespaceId: t,
              setForRemoval: s,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(t, e, n, s, r) {
          return my(e) ? this._fetchNamespace(t).listen(e, n, s, r) : () => {};
        }
        _buildInstruction(t, e, n, s, r) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            n,
            s,
            t.fromState.options,
            t.toState.options,
            e,
            r
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, em, !0);
          e.forEach((t) => this.destroyActiveAnimationsForElement(t)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, sm, !0)),
              e.forEach((t) => this.finishActiveQueriedAnimationOnElement(t)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((t) => {
              t.queued ? (t.markedForDestroy = !0) : t.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((t) => t.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Pg(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (((t.__ng_removed = ly), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          this.driver.matchesElement(t, oy) &&
            this.markElementAsDisabled(t, !1),
            this.driver.query(t, oy, !0).forEach((t) => {
              this.markElementAsDisabled(t, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((t, e) =>
                this._balanceNamespaceList(t, e)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              by(this.collectedEnterElements[n], 'ng-star-inserted');
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              e = this._flushAnimations(n, t);
            } finally {
              for (let t = 0; t < n.length; t++) n[t]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((t) => t()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const t = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? Pg(e).onDone(() => {
                    t.forEach((t) => t());
                  })
                : t.forEach((t) => t());
          }
        }
        reportError(t) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${t.join(
              '\n'
            )}`
          );
        }
        _flushAnimations(t, e) {
          const n = new Fm(),
            s = [],
            r = new Map(),
            i = [],
            o = new Map(),
            a = new Map(),
            l = new Map(),
            c = new Set();
          this.disabledNodes.forEach((t) => {
            c.add(t);
            const e = this.driver.query(t, '.ng-animate-queued', !0);
            for (let n = 0; n < e.length; n++) c.add(e[n]);
          });
          const u = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = vy(h, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((t, e) => {
            const n = Jg + f++;
            p.set(e, n), t.forEach((t) => by(t, n));
          });
          const g = [],
            m = new Set(),
            y = new Set();
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const t = this.collectedLeaveElements[I],
              e = t.__ng_removed;
            e &&
              e.setForRemoval &&
              (g.push(t),
              m.add(t),
              e.hasAnimation
                ? this.driver
                    .query(t, '.ng-star-inserted', !0)
                    .forEach((t) => m.add(t))
                : y.add(t));
          }
          const _ = new Map(),
            v = vy(h, Array.from(m));
          v.forEach((t, e) => {
            const n = Xg + f++;
            _.set(e, n), t.forEach((t) => by(t, n));
          }),
            t.push(() => {
              d.forEach((t, e) => {
                const n = p.get(e);
                t.forEach((t) => wy(t, n));
              }),
                v.forEach((t, e) => {
                  const n = _.get(e);
                  t.forEach((t) => wy(t, n));
                }),
                g.forEach((t) => {
                  this.processLeaveNode(t);
                });
            });
          const b = [],
            w = [];
          for (let I = this._namespaceList.length - 1; I >= 0; I--)
            this._namespaceList[I].drainQueuedTransitions(e).forEach((t) => {
              const e = t.player,
                r = t.element;
              if ((b.push(e), this.collectedEnterElements.length)) {
                const t = r.__ng_removed;
                if (t && t.setForMove) return void e.destroy();
              }
              const c = !u || !this.driver.containsElement(u, r),
                h = _.get(r),
                d = p.get(r),
                f = this._buildInstruction(t, n, d, h, c);
              if (f.errors && f.errors.length) w.push(f);
              else {
                if (c)
                  return (
                    e.onStart(() => dm(r, f.fromStyles)),
                    e.onDestroy(() => hm(r, f.toStyles)),
                    void s.push(e)
                  );
                if (t.isFallbackTransition)
                  return (
                    e.onStart(() => dm(r, f.fromStyles)),
                    e.onDestroy(() => hm(r, f.toStyles)),
                    void s.push(e)
                  );
                f.timelines.forEach((t) => (t.stretchStartingKeyframe = !0)),
                  n.append(r, f.timelines),
                  i.push({ instruction: f, player: e, element: r }),
                  f.queriedElements.forEach((t) => Fg(o, t, []).push(e)),
                  f.preStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    if (n.length) {
                      let t = a.get(e);
                      t || a.set(e, (t = new Set())),
                        n.forEach((e) => t.add(e));
                    }
                  }),
                  f.postStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    let s = l.get(e);
                    s || l.set(e, (s = new Set())), n.forEach((t) => s.add(t));
                  });
              }
            });
          if (w.length) {
            const t = [];
            w.forEach((e) => {
              t.push(`@${e.triggerName} has failed due to:\n`),
                e.errors.forEach((e) => t.push(`- ${e}\n`));
            }),
              b.forEach((t) => t.destroy()),
              this.reportError(t);
          }
          const S = new Map(),
            C = new Map();
          i.forEach((t) => {
            const e = t.element;
            n.has(e) &&
              (C.set(e, e),
              this._beforeAnimationBuild(
                t.player.namespaceId,
                t.instruction,
                S
              ));
          }),
            s.forEach((t) => {
              const e = t.element;
              this._getPreviousPlayers(
                e,
                !1,
                t.namespaceId,
                t.triggerName,
                null
              ).forEach((t) => {
                Fg(S, e, []).push(t), t.destroy();
              });
            });
          const E = g.filter((t) => Ey(t, a, l)),
            T = new Map();
          _y(T, this.driver, y, l, Eg).forEach((t) => {
            Ey(t, a, l) && E.push(t);
          });
          const x = new Map();
          d.forEach((t, e) => {
            _y(x, this.driver, new Set(t), a, '!');
          }),
            E.forEach((t) => {
              const e = T.get(t),
                n = x.get(t);
              T.set(t, Object.assign(Object.assign({}, e), n));
            });
          const A = [],
            k = [],
            O = {};
          i.forEach((t) => {
            const { element: e, player: i, instruction: o } = t;
            if (n.has(e)) {
              if (c.has(e))
                return (
                  i.onDestroy(() => hm(e, o.toStyles)),
                  (i.disabled = !0),
                  i.overrideTotalTime(o.totalTime),
                  void s.push(i)
                );
              let t = O;
              if (C.size > 1) {
                let n = e;
                const s = [];
                for (; (n = n.parentNode); ) {
                  const e = C.get(n);
                  if (e) {
                    t = e;
                    break;
                  }
                  s.push(n);
                }
                s.forEach((e) => C.set(e, t));
              }
              const n = this._buildAnimation(i.namespaceId, o, S, r, x, T);
              if ((i.setRealPlayer(n), t === O)) A.push(i);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (i.parentPlayer = Pg(e)), s.push(i);
              }
            } else
              dm(e, o.fromStyles),
                i.onDestroy(() => hm(e, o.toStyles)),
                k.push(i),
                c.has(e) && s.push(i);
          }),
            k.forEach((t) => {
              const e = r.get(t.element);
              if (e && e.length) {
                const n = Pg(e);
                t.setRealPlayer(n);
              }
            }),
            s.forEach((t) => {
              t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
            });
          for (let I = 0; I < g.length; I++) {
            const t = g[I],
              e = t.__ng_removed;
            if ((wy(t, Xg), e && e.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let e = o.get(t);
              e && e.length && n.push(...e);
              let s = this.driver.query(t, sm, !0);
              for (let t = 0; t < s.length; t++) {
                let e = o.get(s[t]);
                e && e.length && n.push(...e);
              }
            }
            const s = n.filter((t) => !t.destroyed);
            s.length ? Sy(this, t, s) : this.processLeaveNode(t);
          }
          return (
            (g.length = 0),
            A.forEach((t) => {
              this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1);
                }),
                t.play();
            }),
            A
          );
        }
        elementContainsData(t, e) {
          let n = !1;
          const s = e.__ng_removed;
          return (
            s && s.setForRemoval && (n = !0),
            this.playersByElement.has(e) && (n = !0),
            this.playersByQueriedElement.has(e) && (n = !0),
            this.statesByElement.has(e) && (n = !0),
            this._fetchNamespace(t).elementContainsData(e) || n
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, n, s, r) {
          let i = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (i = e);
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !r || r == hy;
              e.forEach((e) => {
                e.queued || ((t || e.triggerName == s) && i.push(e));
              });
            }
          }
          return (
            (n || s) &&
              (i = i.filter(
                (t) => !((n && n != t.namespaceId) || (s && s != t.triggerName))
              )),
            i
          );
        }
        _beforeAnimationBuild(t, e, n) {
          const s = e.element,
            r = e.isRemovalTransition ? void 0 : t,
            i = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== s,
              l = Fg(n, t, []);
            this._getPreviousPlayers(t, a, r, i, e.toState).forEach((t) => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t);
            });
          }
          dm(s, e.fromStyles);
        }
        _buildAnimation(t, e, n, s, r, i) {
          const o = e.triggerName,
            a = e.element,
            l = [],
            c = new Set(),
            u = new Set(),
            h = e.timelines.map((e) => {
              const h = e.element;
              c.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new kg(e.duration, e.delay);
              const p = h !== a,
                f = (function (t) {
                  const e = [];
                  return Cy(t, e), e;
                })((n.get(h) || ay).map((t) => t.getRealPlayer())).filter(
                  (t) => !!t.element && t.element === h
                ),
                g = r.get(h),
                m = i.get(h),
                y = Ng(0, this._normalizer, 0, e.keyframes, g, m),
                _ = this._buildPlayer(e, y, f);
              if ((e.subTimeline && s && u.add(h), p)) {
                const e = new gy(t, o, h);
                e.setRealPlayer(_), l.push(e);
              }
              return _;
            });
          l.forEach((t) => {
            Fg(this.playersByQueriedElement, t.element, []).push(t),
              t.onDone(() =>
                (function (t, e, n) {
                  let s;
                  if (t instanceof Map) {
                    if (((s = t.get(e)), s)) {
                      if (s.length) {
                        const t = s.indexOf(n);
                        s.splice(t, 1);
                      }
                      0 == s.length && t.delete(e);
                    }
                  } else if (((s = t[e]), s)) {
                    if (s.length) {
                      const t = s.indexOf(n);
                      s.splice(t, 1);
                    }
                    0 == s.length && delete t[e];
                  }
                  return s;
                })(this.playersByQueriedElement, t.element, t)
              );
          }),
            c.forEach((t) => by(t, nm));
          const d = Pg(h);
          return (
            d.onDestroy(() => {
              c.forEach((t) => wy(t, nm)), hm(a, e.toStyles);
            }),
            u.forEach((t) => {
              Fg(s, t, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(t, e, n) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                n
              )
            : new kg(t.duration, t.delay);
        }
      }
      class gy {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = n),
            (this._player = new kg()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach((e) => {
              this._queuedCallbacks[e].forEach((n) => Dg(t, e, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback('start')),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Fg(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent('done', t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent('start', t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent('destroy', t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function my(t) {
        return t && 1 === t.nodeType;
      }
      function yy(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : 'none'), n;
      }
      function _y(t, e, n, s, r) {
        const i = [];
        n.forEach((t) => i.push(yy(t)));
        const o = [];
        s.forEach((n, s) => {
          const i = {};
          n.forEach((t) => {
            const n = (i[t] = e.computeStyle(s, t, r));
            (n && 0 != n.length) || ((s.__ng_removed = cy), o.push(s));
          }),
            t.set(s, i);
        });
        let a = 0;
        return n.forEach((t) => yy(t, i[a++])), o;
      }
      function vy(t, e) {
        const n = new Map();
        if ((t.forEach((t) => n.set(t, [])), 0 == e.length)) return n;
        const s = new Set(e),
          r = new Map();
        function i(t) {
          if (!t) return 1;
          let e = r.get(t);
          if (e) return e;
          const o = t.parentNode;
          return (e = n.has(o) ? o : s.has(o) ? 1 : i(o)), r.set(t, e), e;
        }
        return (
          e.forEach((t) => {
            const e = i(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      function by(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), (n[e] = !0);
        }
      }
      function wy(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e];
        }
      }
      function Sy(t, e, n) {
        Pg(n).onDone(() => t.processLeaveNode(e));
      }
      function Cy(t, e) {
        for (let n = 0; n < t.length; n++) {
          const s = t[n];
          s instanceof Og ? Cy(s.players, e) : e.push(s);
        }
      }
      function Ey(t, e, n) {
        const s = n.get(t);
        if (!s) return !1;
        let r = e.get(t);
        return r ? s.forEach((t) => r.add(t)) : e.set(t, s), n.delete(t), !0;
      }
      class Ty {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (t, e) => {}),
            (this._transitionEngine = new fy(t, e, n)),
            (this._timelineEngine = new sy(t, e, n)),
            (this._transitionEngine.onRemovalComplete = (t, e) =>
              this.onRemovalComplete(t, e));
        }
        registerTrigger(t, e, n, s, r) {
          const i = t + '-' + s;
          let o = this._triggerCache[i];
          if (!o) {
            const t = [],
              e = Im(this._driver, r, t);
            if (t.length)
              throw new Error(
                `The animation trigger "${s}" has failed to build due to the following errors:\n - ${t.join(
                  '\n - '
                )}`
              );
            (o = (function (t, e) {
              return new ty(t, e);
            })(s, e)),
              (this._triggerCache[i] = o);
          }
          this._transitionEngine.registerTrigger(e, s, o);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, n, s) {
          this._transitionEngine.insertNode(t, e, n, s);
        }
        onRemove(t, e, n, s) {
          this._transitionEngine.removeNode(t, e, s || !1, n);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, n, s) {
          if ('@' == n.charAt(0)) {
            const [t, r] = Vg(n);
            this._timelineEngine.command(t, e, r, s);
          } else this._transitionEngine.trigger(t, e, n, s);
        }
        listen(t, e, n, s, r) {
          if ('@' == n.charAt(0)) {
            const [t, s] = Vg(n);
            return this._timelineEngine.listen(t, e, s, r);
          }
          return this._transitionEngine.listen(t, e, n, s, r);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function xy(t, e) {
        let n = null,
          s = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = ky(e[0])), e.length > 1 && (s = ky(e[e.length - 1])))
            : e && (n = ky(e)),
          n || s ? new Ay(t, n, s) : null
        );
      }
      class Ay {
        constructor(t, e, n) {
          (this._element = t),
            (this._startStyles = e),
            (this._endStyles = n),
            (this._state = 0);
          let s = Ay.initialStylesByElement.get(t);
          s || Ay.initialStylesByElement.set(t, (s = {})),
            (this._initialStyles = s);
        }
        start() {
          this._state < 1 &&
            (this._startStyles &&
              hm(this._element, this._startStyles, this._initialStyles),
            (this._state = 1));
        }
        finish() {
          this.start(),
            this._state < 2 &&
              (hm(this._element, this._initialStyles),
              this._endStyles &&
                (hm(this._element, this._endStyles), (this._endStyles = null)),
              (this._state = 1));
        }
        destroy() {
          this.finish(),
            this._state < 3 &&
              (Ay.initialStylesByElement.delete(this._element),
              this._startStyles &&
                (dm(this._element, this._startStyles),
                (this._endStyles = null)),
              this._endStyles &&
                (dm(this._element, this._endStyles), (this._endStyles = null)),
              hm(this._element, this._initialStyles),
              (this._state = 3));
        }
      }
      function ky(t) {
        let e = null;
        const n = Object.keys(t);
        for (let s = 0; s < n.length; s++) {
          const r = n[s];
          Oy(r) && ((e = e || {}), (e[r] = t[r]));
        }
        return e;
      }
      function Oy(t) {
        return 'display' === t || 'position' === t;
      }
      Ay.initialStylesByElement = new WeakMap();
      const Iy = 'animation',
        Ry = 'animationend';
      class Py {
        constructor(t, e, n, s, r, i, o) {
          (this._element = t),
            (this._name = e),
            (this._duration = n),
            (this._delay = s),
            (this._easing = r),
            (this._fillMode = i),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (t) => this._handleCallback(t));
        }
        apply() {
          !(function (t, e) {
            const n = Vy(t, '').trim();
            n.length &&
              ((function (t, e) {
                let n = 0;
                for (let s = 0; s < t.length; s++) ',' === t.charAt(s) && n++;
              })(n),
              (e = `${n}, ${e}`)),
              Fy(t, '', e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            jy(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          Ny(this._element, this._name, 'paused');
        }
        resume() {
          Ny(this._element, this._name, 'running');
        }
        setPosition(t) {
          const e = Dy(this._element, this._name);
          (this._position = t * this._duration),
            Fy(this._element, 'Delay', `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            jy(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (t, e) {
              const n = Vy(t, '').split(','),
                s = Ly(n, e);
              s >= 0 && (n.splice(s, 1), Fy(t, '', n.join(',')));
            })(this._element, this._name));
        }
      }
      function Ny(t, e, n) {
        Fy(t, 'PlayState', n, Dy(t, e));
      }
      function Dy(t, e) {
        const n = Vy(t, '');
        return n.indexOf(',') > 0 ? Ly(n.split(','), e) : Ly([n], e);
      }
      function Ly(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function jy(t, e, n) {
        n ? t.removeEventListener(Ry, e) : t.addEventListener(Ry, e);
      }
      function Fy(t, e, n, s) {
        const r = Iy + e;
        if (null != s) {
          const e = t.style[r];
          if (e.length) {
            const t = e.split(',');
            (t[s] = n), (n = t.join(','));
          }
        }
        t.style[r] = n;
      }
      function Vy(t, e) {
        return t.style[Iy + e] || '';
      }
      class My {
        constructor(t, e, n, s, r, i, o, a) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = n),
            (this._duration = s),
            (this._delay = r),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = i || 'linear'),
            (this.totalTime = s + r),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((t) => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          (this._state = 0),
            this._styler.destroy(),
            this._buildStyler(),
            this._styler.apply();
        }
        _buildStyler() {
          this._styler = new Py(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            'forwards',
            () => this.finish()
          );
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              'offset' != n &&
                (t[n] = e ? this._finalStyles[n] : Cm(this.element, n));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class Uy extends kg {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = Gg(e));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((t) => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((t) =>
              this.element.style.setProperty(t, this._styles[t])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((t) => {
              const e = this._startingStyles[t];
              e
                ? this.element.style.setProperty(t, e)
                : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class Hy {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(t) {
          return zg(t);
        }
        matchesElement(t, e) {
          return Wg(t, e);
        }
        containsElement(t, e) {
          return Qg(t, e);
        }
        query(t, e, n) {
          return Kg(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, n) {
          n = n.map((t) => Gg(t));
          let s = `@keyframes ${e} {\n`,
            r = '';
          n.forEach((t) => {
            r = ' ';
            const e = parseFloat(t.offset);
            (s += `${r}${100 * e}% {\n`),
              (r += ' '),
              Object.keys(t).forEach((e) => {
                const n = t[e];
                switch (e) {
                  case 'offset':
                    return;
                  case 'easing':
                    return void (
                      n && (s += `${r}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (s += `${r}${e}: ${n};\n`);
                }
              }),
              (s += `${r}}\n`);
          }),
            (s += '}\n');
          const i = document.createElement('style');
          return (i.textContent = s), i;
        }
        animate(t, e, n, s, r, i = [], o) {
          const a = i.filter((t) => t instanceof My),
            l = {};
          bm(n, s) &&
            a.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const c = (function (t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach((t) => {
                  Object.keys(t).forEach((n) => {
                    'offset' != n && 'easing' != n && (e[n] = t[n]);
                  });
                }),
              e
            );
          })((e = wm(t, e, l)));
          if (0 == n) return new Uy(t, c);
          const u = 'gen_css_kf_' + this._count++,
            h = this.buildKeyframeElement(t, u, e);
          (function (t) {
            var e;
            const n =
              null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t);
            return 'undefined' != typeof ShadowRoot && n instanceof ShadowRoot
              ? n
              : document.head;
          })(t).appendChild(h);
          const d = xy(t, e),
            p = new My(t, e, u, n, s, r, c, d);
          return (
            p.onDestroy(() => {
              var t;
              (t = h).parentNode.removeChild(t);
            }),
            p
          );
        }
      }
      class $y {
        constructor(t, e, n, s) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = n),
            (this._specialStyles = s),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener('finish', () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((e) => {
              'offset' != e &&
                (t[e] = this._finished
                  ? this._finalKeyframe[e]
                  : Cm(this.element, e));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = 'start' == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class By {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            qy().toString()
          )),
            (this._cssKeyframesDriver = new Hy());
        }
        validateStyleProperty(t) {
          return zg(t);
        }
        matchesElement(t, e) {
          return Wg(t, e);
        }
        containsElement(t, e) {
          return Qg(t, e);
        }
        query(t, e, n) {
          return Kg(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, n, s, r, i = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(t, e, n, s, r, i);
          const a = {
            duration: n,
            delay: s,
            fill: 0 == s ? 'both' : 'forwards',
          };
          r && (a.easing = r);
          const l = {},
            c = i.filter((t) => t instanceof $y);
          bm(n, s) &&
            c.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const u = xy(t, (e = wm(t, (e = e.map((t) => lm(t, !1))), l)));
          return new $y(t, e, a, u);
        }
      }
      function qy() {
        return (Ig() && Element.prototype.animate) || {};
      }
      let zy = (() => {
        class t extends Cg {
          constructor(t, e) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(e.body, {
                id: '0',
                encapsulation: Tt.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? Tg(t) : t;
            return (
              Ky(this._renderer, null, e, 'register', [n]),
              new Wy(e, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Ta), is(Hc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Wy extends class {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new Qy(this._id, t, e || {}, this._renderer);
        }
      }
      class Qy {
        constructor(t, e, n, s) {
          (this.id = t),
            (this.element = e),
            (this._renderer = s),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', n);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return Ky(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen('done', t);
        }
        onStart(t) {
          this._listen('start', t);
        }
        onDestroy(t) {
          this._listen('destroy', t);
        }
        init() {
          this._command('init');
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command('play'), (this._started = !0);
        }
        pause() {
          this._command('pause');
        }
        restart() {
          this._command('restart');
        }
        finish() {
          this._command('finish');
        }
        destroy() {
          this._command('destroy');
        }
        reset() {
          this._command('reset'), (this._started = !1);
        }
        setPosition(t) {
          this._command('setPosition', t);
        }
        getPosition() {
          var t, e;
          return null !==
            (e =
              null === (t = this._renderer.engine.players[+this.id]) ||
              void 0 === t
                ? void 0
                : t.getPosition()) && void 0 !== e
            ? e
            : 0;
        }
      }
      function Ky(t, e, n, s, r) {
        return t.setProperty(e, `@@${n}:${s}`, r);
      }
      const Gy = '@',
        Zy = '@.disabled';
      let Yy = (() => {
        class t {
          constructor(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return (
                t ||
                  ((t = new Jy('', n, this.engine)),
                  this._rendererCache.set(n, t)),
                t
              );
            }
            const s = e.id,
              r = e.id + '-' + this._currentId;
            this._currentId++, this.engine.register(r, t);
            const i = (e) => {
              Array.isArray(e)
                ? e.forEach(i)
                : this.engine.registerTrigger(s, r, t, e.name, e);
            };
            return e.data.animation.forEach(i), new Xy(this, r, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => e(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((t) => {
                        const [e, n] = t;
                        e(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([e, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Ta), is(Ty), is(cc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Jy {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? (t) => e.destroyNode(t)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, n, s = !0) {
          this.delegate.insertBefore(t, e, n),
            this.engine.onInsert(this.namespaceId, e, t, s);
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, n, s) {
          this.delegate.setAttribute(t, e, n, s);
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, s) {
          this.delegate.setStyle(t, e, n, s);
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          e.charAt(0) == Gy && e == Zy
            ? this.disableAnimations(t, !!n)
            : this.delegate.setProperty(t, e, n);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class Xy extends Jy {
        constructor(t, e, n, s) {
          super(e, n, s), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, n) {
          e.charAt(0) == Gy
            ? '.' == e.charAt(1) && e == Zy
              ? this.disableAnimations(t, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, t, e.substr(1), n)
            : this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if (e.charAt(0) == Gy) {
            const s = (function (t) {
              switch (t) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return t;
              }
            })(t);
            let r = e.substr(1),
              i = '';
            return (
              r.charAt(0) != Gy &&
                ([r, i] = (function (t) {
                  const e = t.indexOf('.');
                  return [t.substring(0, e), t.substr(e + 1)];
                })(r)),
              this.engine.listen(this.namespaceId, s, r, i, (t) => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t);
              })
            );
          }
          return this.delegate.listen(t, e, n);
        }
      }
      let t_ = (() => {
        class t extends Ty {
          constructor(t, e, n) {
            super(t.body, e, n);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Hc), is(Yg), is(Qm));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const e_ = new Hn('AnimationModuleType'),
        n_ = [
          { provide: Cg, useClass: zy },
          {
            provide: Qm,
            useFactory: function () {
              return new Km();
            },
          },
          { provide: Ty, useClass: t_ },
          {
            provide: Ta,
            useFactory: function (t, e, n) {
              return new Yy(t, e, n);
            },
            deps: [zu, Ty, cc],
          },
        ],
        s_ = [
          {
            provide: Yg,
            useFactory: function () {
              return 'function' == typeof qy() ? new By() : new Hy();
            },
          },
          { provide: e_, useValue: 'BrowserAnimations' },
          ...n_,
        ],
        r_ = [
          { provide: Yg, useClass: Zg },
          { provide: e_, useValue: 'NoopAnimations' },
          ...n_,
        ];
      let i_ = (() => {
          class t {
            static withConfig(e) {
              return { ngModule: t, providers: e.disableAnimations ? r_ : s_ };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ providers: s_, imports: [oh] })),
            t
          );
        })(),
        o_ = (() => {
          class t {
            constructor(t, e) {
              (this.http = t), (this.environment = e);
            }
            get apiBaseUrl() {
              var t;
              return this.environment &&
                null !== (t = this.environment.apiBaseUrl) &&
                void 0 !== t
                ? t
                : '';
            }
            get(t, e = {}) {
              const n = new jp({ fromObject: e });
              return this.http
                .get(`${this.apiBaseUrl}${t}`, { params: n })
                .pipe(Ad((t) => (console.error(t), md)));
            }
            post(t, e) {
              return this.http
                .post(`${this.apiBaseUrl}${t}`, e)
                .pipe(Ad((t) => (console.error(t), md)));
            }
            postFormData(t, e) {
              return this.http
                .post(`${this.apiBaseUrl}${t}`, e)
                .pipe(Ad((t) => (console.error(t), md)));
            }
            put(t, e) {
              return this.http.put(`${this.apiBaseUrl}${t}`, e);
            }
            patch(t, e) {
              return this.http.patch(`${this.apiBaseUrl}${t}`, e);
            }
            delete(t, e) {
              if (e) return this.http.delete(`${this.apiBaseUrl}${t}`);
              {
                const n = {
                  headers: new Pp({ 'Content-Type': 'application/json' }),
                  body: e,
                };
                return this.http.delete(`${this.apiBaseUrl}${t}`, n);
              }
            }
            purifyNotNull(t) {
              const e = {};
              return (
                Object.entries(t).forEach(([t, n]) => {
                  null !== n && (e[t] = n);
                }),
                e
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Kp), is('environment'));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        a_ = (() => {
          class t {
            static forEnvironment(e) {
              return {
                ngModule: t,
                providers: [{ provide: 'environment', useValue: e }],
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ providers: [o_], imports: [[Cu, lf]] })),
            t
          );
        })();
      const l_ = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = 'no elements in sequence'),
            (this.name = 'EmptyError'),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function c_(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (s) {
            return s.lift(new u_(t, e, n));
          }
        );
      }
      class u_ {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new h_(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class h_ extends f {
        constructor(t, e, n, s) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = s),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (s) {
            this.destination.error(s);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function d_(t) {
        return function (e) {
          return 0 === t ? yd() : e.lift(new p_(t));
        };
      }
      class p_ {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new gd();
        }
        call(t, e) {
          return e.subscribe(new f_(t, this.total));
        }
      }
      class f_ extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            s = this.count++;
          e.length < n ? e.push(t) : (e[s % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              s = this.ring;
            for (let r = 0; r < n; r++) {
              const r = e++ % n;
              t.next(s[r]);
            }
          }
          t.complete();
        }
      }
      function g_(t = __) {
        return (e) => e.lift(new m_(t));
      }
      class m_ {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new y_(t, this.errorFactory));
        }
      }
      class y_ extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function __() {
        return new l_();
      }
      function v_(t = null) {
        return (e) => e.lift(new b_(t));
      }
      class b_ {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new w_(t, this.defaultValue));
        }
      }
      class w_ extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function S_(t, e) {
        const n = arguments.length >= 2;
        return (s) =>
          s.pipe(
            t ? Ap((e, n) => t(e, n, s)) : y,
            _d(1),
            n ? v_(e) : g_(() => new l_())
          );
      }
      class C_ {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class E_ extends C_ {
        constructor(t, e, n = 'imperative', s = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = s);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class T_ extends C_ {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class x_ extends C_ {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class A_ extends C_ {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class k_ extends C_ {
        constructor(t, e, n, s) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = s);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class O_ extends C_ {
        constructor(t, e, n, s) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = s);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class I_ extends C_ {
        constructor(t, e, n, s, r) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = s),
            (this.shouldActivate = r);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class R_ extends C_ {
        constructor(t, e, n, s) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = s);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class P_ extends C_ {
        constructor(t, e, n, s) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = s);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class N_ {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class D_ {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class L_ {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class j_ {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class F_ {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class V_ {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`;
        }
      }
      class M_ {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const U_ = 'primary';
      class H_ {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function $_(t) {
        return new H_(t);
      }
      function B_(t) {
        const e = Error('NavigationCancelingError: ' + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function q_(t, e, n) {
        const s = n.path.split('/');
        if (s.length > t.length) return null;
        if ('full' === n.pathMatch && (e.hasChildren() || s.length < t.length))
          return null;
        const r = {};
        for (let i = 0; i < s.length; i++) {
          const e = s[i],
            n = t[i];
          if (e.startsWith(':')) r[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, s.length), posParams: r };
      }
      function z_(t, e) {
        const n = t ? Object.keys(t) : void 0,
          s = e ? Object.keys(e) : void 0;
        if (!n || !s || n.length != s.length) return !1;
        let r;
        for (let i = 0; i < n.length; i++)
          if (((r = n[i]), !W_(t[r], e[r]))) return !1;
        return !0;
      }
      function W_(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            s = [...e].sort();
          return n.every((t, e) => s[e] === t);
        }
        return t === e;
      }
      function Q_(t) {
        return Array.prototype.concat.apply([], t);
      }
      function K_(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function G_(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Z_(t) {
        return Ao(t) ? t : To(t) ? L(Promise.resolve(t)) : Ld(t);
      }
      const Y_ = {
          exact: function t(e, n, s) {
            if (!ov(e.segments, n.segments)) return !1;
            if (!nv(e.segments, n.segments, s)) return !1;
            if (e.numberOfChildren !== n.numberOfChildren) return !1;
            for (const r in n.children) {
              if (!e.children[r]) return !1;
              if (!t(e.children[r], n.children[r], s)) return !1;
            }
            return !0;
          },
          subset: tv,
        },
        J_ = {
          exact: function (t, e) {
            return z_(t, e);
          },
          subset: function (t, e) {
            return (
              Object.keys(e).length <= Object.keys(t).length &&
              Object.keys(e).every((n) => W_(t[n], e[n]))
            );
          },
          ignored: () => !0,
        };
      function X_(t, e, n) {
        return (
          Y_[n.paths](t.root, e.root, n.matrixParams) &&
          J_[n.queryParams](t.queryParams, e.queryParams) &&
          !('exact' === n.fragment && t.fragment !== e.fragment)
        );
      }
      function tv(t, e, n) {
        return ev(t, e, e.segments, n);
      }
      function ev(t, e, n, s) {
        if (t.segments.length > n.length) {
          const r = t.segments.slice(0, n.length);
          return !!ov(r, n) && !e.hasChildren() && !!nv(r, n, s);
        }
        if (t.segments.length === n.length) {
          if (!ov(t.segments, n)) return !1;
          if (!nv(t.segments, n, s)) return !1;
          for (const n in e.children) {
            if (!t.children[n]) return !1;
            if (!tv(t.children[n], e.children[n], s)) return !1;
          }
          return !0;
        }
        {
          const r = n.slice(0, t.segments.length),
            i = n.slice(t.segments.length);
          return (
            !!ov(t.segments, r) &&
            !!nv(t.segments, r, s) &&
            !!t.children.primary &&
            ev(t.children.primary, e, i, s)
          );
        }
      }
      function nv(t, e, n) {
        return e.every((e, s) => J_[n](t[s].parameters, e.parameters));
      }
      class sv {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = $_(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return cv.serialize(this);
        }
      }
      class rv {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            G_(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return uv(this);
        }
      }
      class iv {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = $_(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return yv(this);
        }
      }
      function ov(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      class av {}
      class lv {
        parse(t) {
          const e = new Sv(t);
          return new sv(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          var e;
          return `/${hv(t.root, !0)}${(function (t) {
            const e = Object.keys(t)
              .map((e) => {
                const n = t[e];
                return Array.isArray(n)
                  ? n.map((t) => `${pv(e)}=${pv(t)}`).join('&')
                  : `${pv(e)}=${pv(n)}`;
              })
              .filter((t) => !!t);
            return e.length ? `?${e.join('&')}` : '';
          })(t.queryParams)}${
            'string' == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ''
          }`;
        }
      }
      const cv = new lv();
      function uv(t) {
        return t.segments.map((t) => yv(t)).join('/');
      }
      function hv(t, e) {
        if (!t.hasChildren()) return uv(t);
        if (e) {
          const e = t.children.primary ? hv(t.children.primary, !1) : '',
            n = [];
          return (
            G_(t.children, (t, e) => {
              e !== U_ && n.push(`${e}:${hv(t, !1)}`);
            }),
            n.length > 0 ? `${e}(${n.join('//')})` : e
          );
        }
        {
          const e = (function (t, e) {
            let n = [];
            return (
              G_(t.children, (t, s) => {
                s === U_ && (n = n.concat(e(t, s)));
              }),
              G_(t.children, (t, s) => {
                s !== U_ && (n = n.concat(e(t, s)));
              }),
              n
            );
          })(t, (e, n) =>
            n === U_ ? [hv(t.children.primary, !1)] : [`${n}:${hv(e, !1)}`]
          );
          return 1 === Object.keys(t.children).length &&
            null != t.children.primary
            ? `${uv(t)}/${e[0]}`
            : `${uv(t)}/(${e.join('//')})`;
        }
      }
      function dv(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function pv(t) {
        return dv(t).replace(/%3B/gi, ';');
      }
      function fv(t) {
        return dv(t)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&');
      }
      function gv(t) {
        return decodeURIComponent(t);
      }
      function mv(t) {
        return gv(t.replace(/\+/g, '%20'));
      }
      function yv(t) {
        return `${fv(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${fv(t)}=${fv(e[t])}`)
            .join(''))
        }`;
        var e;
      }
      const _v = /^[^\/()?;=#]+/;
      function vv(t) {
        const e = t.match(_v);
        return e ? e[0] : '';
      }
      const bv = /^[^=?&#]+/,
        wv = /^[^?&#]+/;
      class Sv {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new rv([], {})
              : new rv([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional('&'));
          return t;
        }
        parseFragment() {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const t = [];
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith('/(') &&
            (this.capture('/'), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith('(') && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new rv(t, e)),
            n
          );
        }
        parseSegment() {
          const t = vv(this.remaining);
          if ('' === t && this.peekStartsWith(';'))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new iv(gv(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(';'); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = vv(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = '';
          if (this.consumeOptional('=')) {
            const t = vv(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[gv(e)] = gv(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(bv);
            return e ? e[0] : '';
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = '';
          if (this.consumeOptional('=')) {
            const t = (function (t) {
              const e = t.match(wv);
              return e ? e[0] : '';
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const s = mv(e),
            r = mv(n);
          if (t.hasOwnProperty(s)) {
            let e = t[s];
            Array.isArray(e) || ((e = [e]), (t[s] = e)), e.push(r);
          } else t[s] = r;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const n = vv(this.remaining),
              s = this.remaining[n.length];
            if ('/' !== s && ')' !== s && ';' !== s)
              throw new Error(`Cannot parse url '${this.url}'`);
            let r;
            n.indexOf(':') > -1
              ? ((r = n.substr(0, n.indexOf(':'))),
                this.capture(r),
                this.capture(':'))
              : t && (r = U_);
            const i = this.parseChildren();
            (e[r] = 1 === Object.keys(i).length ? i.primary : new rv([], i)),
              this.consumeOptional('//');
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class Cv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = Ev(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = Ev(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Tv(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return Tv(t, this._root).map((t) => t.value);
        }
      }
      function Ev(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = Ev(t, n);
          if (e) return e;
        }
        return null;
      }
      function Tv(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const s = Tv(t, n);
          if (s.length) return s.unshift(e), s;
        }
        return [];
      }
      class xv {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Av(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class kv extends Cv {
        constructor(t, e) {
          super(t), (this.snapshot = e), Dv(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Ov(t, e) {
        const n = (function (t, e) {
            const n = new Pv([], {}, {}, '', {}, U_, e, null, t.root, -1, {});
            return new Nv('', new xv(n, []));
          })(t, e),
          s = new zd([new iv('', {})]),
          r = new zd({}),
          i = new zd({}),
          o = new zd({}),
          a = new zd(''),
          l = new Iv(s, r, o, a, i, U_, e, n.root);
        return (l.snapshot = n.root), new kv(new xv(l, []), n);
      }
      class Iv {
        constructor(t, e, n, s, r, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = s),
            (this.data = r),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(x((t) => $_(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(x((t) => $_(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Rv(t, e = 'emptyOnly') {
        const n = t.pathFromRoot;
        let s = 0;
        if ('always' !== e)
          for (s = n.length - 1; s >= 1; ) {
            const t = n[s],
              e = n[s - 1];
            if (t.routeConfig && '' === t.routeConfig.path) s--;
            else {
              if (e.component) break;
              s--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(s));
      }
      class Pv {
        constructor(t, e, n, s, r, i, o, a, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = s),
            (this.data = r),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = $_(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = $_(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class Nv extends Cv {
        constructor(t, e) {
          super(e), (this.url = t), Dv(this, e);
        }
        toString() {
          return Lv(this._root);
        }
      }
      function Dv(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => Dv(t, e));
      }
      function Lv(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(Lv).join(', ')} } ` : '';
        return `${t.value}${e}`;
      }
      function jv(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            z_(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            z_(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!z_(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            z_(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function Fv(t, e) {
        var n, s;
        return (
          z_(t.params, e.params) &&
          ov((n = t.url), (s = e.url)) &&
          n.every((t, e) => z_(t.parameters, s[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Fv(t.parent, e.parent))
        );
      }
      function Vv(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const s = n.value;
          s._futureSnapshot = e.value;
          const r = (function (t, e, n) {
            return e.children.map((e) => {
              for (const s of n.children)
                if (t.shouldReuseRoute(e.value, s.value.snapshot))
                  return Vv(t, e, s);
              return Vv(t, e);
            });
          })(t, e, n);
          return new xv(s, r);
        }
        {
          if (t.shouldAttach(e.value)) {
            const n = t.retrieve(e.value);
            if (null !== n) {
              const t = n.route;
              return Mv(e, t), t;
            }
          }
          const n = new Iv(
              new zd((s = e.value).url),
              new zd(s.params),
              new zd(s.queryParams),
              new zd(s.fragment),
              new zd(s.data),
              s.outlet,
              s.component,
              s
            ),
            r = e.children.map((e) => Vv(t, e));
          return new xv(n, r);
        }
        var s;
      }
      function Mv(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            'Cannot reattach ActivatedRouteSnapshot created from a different route'
          );
        if (t.children.length !== e.children.length)
          throw new Error(
            'Cannot reattach ActivatedRouteSnapshot with a different number of children'
          );
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n)
          Mv(t.children[n], e.children[n]);
      }
      function Uv(t) {
        return (
          'object' == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Hv(t) {
        return 'object' == typeof t && null != t && t.outlets;
      }
      function $v(t, e, n, s, r) {
        let i = {};
        return (
          s &&
            G_(s, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new sv(n.root === t ? e : Bv(n.root, t, e), i, r)
        );
      }
      function Bv(t, e, n) {
        const s = {};
        return (
          G_(t.children, (t, r) => {
            s[r] = t === e ? n : Bv(t, e, n);
          }),
          new rv(t.segments, s)
        );
      }
      class qv {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && Uv(n[0]))
          )
            throw new Error('Root segment cannot have matrix parameters');
          const s = n.find(Hv);
          if (s && s !== K_(n))
            throw new Error('{outlets:{}} has to be the last command');
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          );
        }
      }
      class zv {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Wv(t, e, n) {
        if (
          (t || (t = new rv([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Qv(t, e, n);
        const s = (function (t, e, n) {
            let s = 0,
              r = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < t.segments.length; ) {
              if (s >= n.length) return i;
              const e = t.segments[r],
                o = n[s];
              if (Hv(o)) break;
              const a = `${o}`,
                l = s < n.length - 1 ? n[s + 1] : null;
              if (r > 0 && void 0 === a) break;
              if (a && l && 'object' == typeof l && void 0 === l.outlets) {
                if (!Yv(a, l, e)) return i;
                s += 2;
              } else {
                if (!Yv(a, {}, e)) return i;
                s++;
              }
              r++;
            }
            return { match: !0, pathIndex: r, commandIndex: s };
          })(t, e, n),
          r = n.slice(s.commandIndex);
        if (s.match && s.pathIndex < t.segments.length) {
          const e = new rv(t.segments.slice(0, s.pathIndex), {});
          return (
            (e.children.primary = new rv(
              t.segments.slice(s.pathIndex),
              t.children
            )),
            Qv(e, 0, r)
          );
        }
        return s.match && 0 === r.length
          ? new rv(t.segments, {})
          : s.match && !t.hasChildren()
          ? Kv(t, e, n)
          : s.match
          ? Qv(t, 0, r)
          : Kv(t, e, n);
      }
      function Qv(t, e, n) {
        if (0 === n.length) return new rv(t.segments, {});
        {
          const s = (function (t) {
              return Hv(t[0]) ? t[0].outlets : { [U_]: t };
            })(n),
            r = {};
          return (
            G_(s, (n, s) => {
              'string' == typeof n && (n = [n]),
                null !== n && (r[s] = Wv(t.children[s], e, n));
            }),
            G_(t.children, (t, e) => {
              void 0 === s[e] && (r[e] = t);
            }),
            new rv(t.segments, r)
          );
        }
      }
      function Kv(t, e, n) {
        const s = t.segments.slice(0, e);
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if (Hv(i)) {
            const t = Gv(i.outlets);
            return new rv(s, t);
          }
          if (0 === r && Uv(n[0])) {
            s.push(new iv(t.segments[e].path, Zv(n[0]))), r++;
            continue;
          }
          const o = Hv(i) ? i.outlets.primary : `${i}`,
            a = r < n.length - 1 ? n[r + 1] : null;
          o && a && Uv(a)
            ? (s.push(new iv(o, Zv(a))), (r += 2))
            : (s.push(new iv(o, {})), r++);
        }
        return new rv(s, {});
      }
      function Gv(t) {
        const e = {};
        return (
          G_(t, (t, n) => {
            'string' == typeof t && (t = [t]),
              null !== t && (e[n] = Kv(new rv([], {}), 0, t));
          }),
          e
        );
      }
      function Zv(t) {
        const e = {};
        return G_(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function Yv(t, e, n) {
        return t == n.path && z_(e, n.parameters);
      }
      class Jv {
        constructor(t, e, n, s) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = s);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            jv(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const s = Av(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, s[e], n), delete s[e];
          }),
            G_(s, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const s = t.value,
            r = e ? e.value : null;
          if (s === r)
            if (s.component) {
              const r = n.getContext(s.outlet);
              r && this.deactivateChildRoutes(t, e, r.children);
            } else this.deactivateChildRoutes(t, e, n);
          else r && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              s = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: s,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet),
            s = n && t.value.component ? n.children : e,
            r = Av(t);
          for (const i of Object.keys(r))
            this.deactivateRouteAndItsChildren(r[i], s);
          n &&
            n.outlet &&
            (n.outlet.deactivate(),
            n.children.onOutletDeactivated(),
            (n.attachRef = null),
            (n.resolver = null),
            (n.route = null));
        }
        activateChildRoutes(t, e, n) {
          const s = Av(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, s[t.value.outlet], n),
              this.forwardEvent(new V_(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new j_(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const s = t.value,
            r = e ? e.value : null;
          if ((jv(s), s === r))
            if (s.component) {
              const r = n.getOrCreateContext(s.outlet);
              this.activateChildRoutes(t, e, r.children);
            } else this.activateChildRoutes(t, e, n);
          else if (s.component) {
            const e = n.getOrCreateContext(s.outlet);
            if (this.routeReuseStrategy.shouldAttach(s.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(s.snapshot);
              this.routeReuseStrategy.store(s.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Xv(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(s.snapshot),
                r = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = s),
                (e.resolver = r),
                e.outlet && e.outlet.activateWith(s, r),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Xv(t) {
        jv(t.value), t.children.forEach(Xv);
      }
      class tb {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function eb(t) {
        return 'function' == typeof t;
      }
      function nb(t) {
        return t instanceof sv;
      }
      const sb = Symbol('INITIAL_VALUE');
      function rb() {
        return $d((t) =>
          Zd(t.map((t) => t.pipe(_d(1), Jf(sb)))).pipe(
            c_((t, e) => {
              let n = !1;
              return e.reduce((t, s, r) => {
                if (t !== sb) return t;
                if ((s === sb && (n = !0), !n)) {
                  if (!1 === s) return s;
                  if (r === e.length - 1 || nb(s)) return s;
                }
                return t;
              }, t);
            }, sb),
            Ap((t) => t !== sb),
            x((t) => (nb(t) ? t : !0 === t)),
            _d(1)
          )
        );
      }
      let ib = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = Ht({
            type: t,
            selectors: [['ng-component']],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && So(0, 'router-outlet');
            },
            directives: function () {
              return [Xb];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function ob(t, e = '') {
        for (let n = 0; n < t.length; n++) {
          const s = t[n];
          ab(s, lb(e, s));
        }
      }
      function ab(t, e) {
        t.children && ob(t.children, e);
      }
      function lb(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ''
          : t;
      }
      function cb(t) {
        const e = t.children && t.children.map(cb),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== U_ &&
            (n.component = ib),
          n
        );
      }
      function ub(t) {
        return t.outlet || U_;
      }
      function hb(t, e) {
        const n = t.filter((t) => ub(t) === e);
        return n.push(...t.filter((t) => ub(t) !== e)), n;
      }
      const db = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function pb(t, e, n) {
        var s;
        if ('' === e.path)
          return 'full' === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, db)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const r = (e.matcher || q_)(n, t, e);
        if (!r) return Object.assign({}, db);
        const i = {};
        G_(r.posParams, (t, e) => {
          i[e] = t.path;
        });
        const o =
          r.consumed.length > 0
            ? Object.assign(
                Object.assign({}, i),
                r.consumed[r.consumed.length - 1].parameters
              )
            : i;
        return {
          matched: !0,
          consumedSegments: r.consumed,
          lastChild: r.consumed.length,
          parameters: o,
          positionalParamSegments:
            null !== (s = r.posParams) && void 0 !== s ? s : {},
        };
      }
      function fb(t, e, n, s, r = 'corrected') {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => gb(t, e, n) && ub(n) !== U_);
          })(t, n, s)
        ) {
          const r = new rv(
            e,
            (function (t, e, n, s) {
              const r = {};
              (r.primary = s),
                (s._sourceSegment = t),
                (s._segmentIndexShift = e.length);
              for (const i of n)
                if ('' === i.path && ub(i) !== U_) {
                  const n = new rv([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (r[ub(i)] = n);
                }
              return r;
            })(t, e, s, new rv(n, t.children))
          );
          return (
            (r._sourceSegment = t),
            (r._segmentIndexShift = e.length),
            { segmentGroup: r, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => gb(t, e, n));
          })(t, n, s)
        ) {
          const i = new rv(
            t.segments,
            (function (t, e, n, s, r, i) {
              const o = {};
              for (const a of s)
                if (gb(t, n, a) && !r[ub(a)]) {
                  const n = new rv([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      'legacy' === i ? t.segments.length : e.length),
                    (o[ub(a)] = n);
                }
              return Object.assign(Object.assign({}, r), o);
            })(t, e, n, s, t.children, r)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new rv(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function gb(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || 'full' !== n.pathMatch) &&
          '' === n.path
        );
      }
      function mb(t, e, n, s) {
        return (
          !!(ub(t) === s || (s !== U_ && gb(e, n, t))) &&
          ('**' === t.path || pb(e, t, n).matched)
        );
      }
      function yb(t, e, n) {
        return 0 === e.length && !t.children[n];
      }
      class _b {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class vb {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function bb(t) {
        return new _((e) => e.error(new _b(t)));
      }
      function wb(t) {
        return new _((e) => e.error(new vb(t)));
      }
      function Sb(t) {
        return new _((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class Cb {
        constructor(t, e, n, s, r) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = s),
            (this.config = r),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(rl));
        }
        apply() {
          const t = fb(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new rv(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, e, U_)
            .pipe(
              x((t) =>
                this.createUrlTree(
                  Eb(t),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Ad((t) => {
                if (t instanceof vb)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof _b) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, U_)
            .pipe(
              x((e) => this.createUrlTree(Eb(e), t.queryParams, t.fragment))
            )
            .pipe(
              Ad((t) => {
                if (t instanceof _b) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const s = t.segments.length > 0 ? new rv([], { [U_]: t }) : t;
          return new sv(s, e, n);
        }
        expandSegmentGroup(t, e, n, s) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(x((t) => new rv([], t)))
            : this.expandSegment(t, n, e, n.segments, s, !0);
        }
        expandChildren(t, e, n) {
          const s = [];
          for (const r of Object.keys(n.children))
            'primary' === r ? s.unshift(r) : s.push(r);
          return L(s).pipe(
            xp((s) => {
              const r = n.children[s],
                i = hb(e, s);
              return this.expandSegmentGroup(t, i, r, s).pipe(
                x((t) => ({ segment: t, outlet: s }))
              );
            }),
            c_((t, e) => ((t[e.outlet] = e.segment), t), {}),
            (function (t, e) {
              const n = arguments.length >= 2;
              return (s) =>
                s.pipe(
                  t ? Ap((e, n) => t(e, n, s)) : y,
                  d_(1),
                  n ? v_(e) : g_(() => new l_())
                );
            })()
          );
        }
        expandSegment(t, e, n, s, r, i) {
          return L(n).pipe(
            xp((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, s, r, i).pipe(
                Ad((t) => {
                  if (t instanceof _b) return Ld(null);
                  throw t;
                })
              )
            ),
            S_((t) => !!t),
            Ad((t, n) => {
              if (t instanceof l_ || 'EmptyError' === t.name) {
                if (yb(e, s, r)) return Ld(new rv([], {}));
                throw new _b(e);
              }
              throw t;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, n, s, r, i, o) {
          return mb(s, e, r, i)
            ? void 0 === s.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, s, r, i)
              : o && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, s, r, i)
              : bb(e)
            : bb(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, s, r, i) {
          return '**' === s.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, s, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                s,
                r,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, s) {
          const r = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith('/')
            ? wb(r)
            : this.lineralizeSegments(n, r).pipe(
                M((n) => {
                  const r = new rv(n, {});
                  return this.expandSegment(t, r, e, n, s, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, s, r, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c,
          } = pb(e, s, r);
          if (!o) return bb(e);
          const u = this.applyRedirectCommands(a, s.redirectTo, c);
          return s.redirectTo.startsWith('/')
            ? wb(u)
            : this.lineralizeSegments(s, u).pipe(
                M((s) =>
                  this.expandSegment(t, e, n, s.concat(r.slice(l)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, s, r) {
          if ('**' === n.path)
            return n.loadChildren
              ? (n._loadedConfig
                  ? Ld(n._loadedConfig)
                  : this.configLoader.load(t.injector, n)
                ).pipe(x((t) => ((n._loadedConfig = t), new rv(s, {}))))
              : Ld(new rv(s, {}));
          const { matched: i, consumedSegments: o, lastChild: a } = pb(e, n, s);
          if (!i) return bb(e);
          const l = s.slice(a);
          return this.getChildConfig(t, n, s).pipe(
            M((t) => {
              const s = t.module,
                i = t.routes,
                { segmentGroup: a, slicedSegments: c } = fb(e, o, l, i),
                u = new rv(a.segments, a.children);
              if (0 === c.length && u.hasChildren())
                return this.expandChildren(s, i, u).pipe(
                  x((t) => new rv(o, t))
                );
              if (0 === i.length && 0 === c.length) return Ld(new rv(o, {}));
              const h = ub(n) === r;
              return this.expandSegment(s, u, i, c, h ? U_ : r, !0).pipe(
                x((t) => new rv(o.concat(t.segments), t.children))
              );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Ld(new tb(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Ld(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  M((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(x((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new _((e) =>
                            e.error(
                              B_(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : Ld(new tb([], t));
        }
        runCanLoadGuards(t, e, n) {
          const s = e.canLoad;
          return s && 0 !== s.length
            ? Ld(
                s.map((s) => {
                  const r = t.get(s);
                  let i;
                  if (
                    (function (t) {
                      return t && eb(t.canLoad);
                    })(r)
                  )
                    i = r.canLoad(e, n);
                  else {
                    if (!eb(r)) throw new Error('Invalid CanLoad guard');
                    i = r(e, n);
                  }
                  return Z_(i);
                })
              ).pipe(
                rb(),
                Ed((t) => {
                  if (!nb(t)) return;
                  const e = B_(
                    `Redirecting to "${this.urlSerializer.serialize(t)}"`
                  );
                  throw ((e.url = t), e);
                }),
                x((t) => !0 === t)
              )
            : Ld(!0);
        }
        lineralizeSegments(t, e) {
          let n = [],
            s = e.root;
          for (;;) {
            if (((n = n.concat(s.segments)), 0 === s.numberOfChildren))
              return Ld(n);
            if (s.numberOfChildren > 1 || !s.children.primary)
              return Sb(t.redirectTo);
            s = s.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, s) {
          const r = this.createSegmentGroup(t, e.root, n, s);
          return new sv(
            r,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            G_(t, (t, s) => {
              if ('string' == typeof t && t.startsWith(':')) {
                const r = t.substring(1);
                n[s] = e[r];
              } else n[s] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, s) {
          const r = this.createSegments(t, e.segments, n, s);
          let i = {};
          return (
            G_(e.children, (e, r) => {
              i[r] = this.createSegmentGroup(t, e, n, s);
            }),
            new rv(r, i)
          );
        }
        createSegments(t, e, n, s) {
          return e.map((e) =>
            e.path.startsWith(':')
              ? this.findPosParam(t, e, s)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const s = n[e.path.substring(1)];
          if (!s)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return s;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const s of e) {
            if (s.path === t.path) return e.splice(n), s;
            n++;
          }
          return t;
        }
      }
      function Eb(t) {
        const e = {};
        for (const n of Object.keys(t.children)) {
          const s = Eb(t.children[n]);
          (s.segments.length > 0 || s.hasChildren()) && (e[n] = s);
        }
        return (function (t) {
          if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary;
            return new rv(t.segments.concat(e.segments), e.children);
          }
          return t;
        })(new rv(t.segments, e));
      }
      class Tb {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class xb {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function Ab(t, e, n) {
        const s = t._root;
        return Ob(s, e ? e._root : null, n, [s.value]);
      }
      function kb(t, e, n) {
        const s = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (s ? s.module.injector : n).get(t);
      }
      function Ob(
        t,
        e,
        n,
        s,
        r = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Av(e);
        return (
          t.children.forEach((t) => {
            !(function (
              t,
              e,
              n,
              s,
              r = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (o && i.routeConfig === o.routeConfig) {
                const l = (function (t, e, n) {
                  if ('function' == typeof n) return n(t, e);
                  switch (n) {
                    case 'pathParamsChange':
                      return !ov(t.url, e.url);
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !ov(t.url, e.url) || !z_(t.queryParams, e.queryParams)
                      );
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !Fv(t, e) || !z_(t.queryParams, e.queryParams);
                    case 'paramsChange':
                    default:
                      return !Fv(t, e);
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? r.canActivateChecks.push(new Tb(s))
                  : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  Ob(t, e, i.component ? (a ? a.children : null) : n, s, r),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    r.canDeactivateChecks.push(new xb(a.outlet.component, o));
              } else
                o && Ib(e, a, r),
                  r.canActivateChecks.push(new Tb(s)),
                  Ob(t, null, i.component ? (a ? a.children : null) : n, s, r);
            })(t, i[t.value.outlet], n, s.concat([t.value]), r),
              delete i[t.value.outlet];
          }),
          G_(i, (t, e) => Ib(t, n.getContext(e), r)),
          r
        );
      }
      function Ib(t, e, n) {
        const s = Av(t),
          r = t.value;
        G_(s, (t, s) => {
          Ib(t, r.component ? (e ? e.children.getContext(s) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new xb(
              r.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              r
            )
          );
      }
      class Rb {}
      function Pb(t) {
        return new _((e) => e.error(t));
      }
      class Nb {
        constructor(t, e, n, s, r, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = s),
            (this.paramsInheritanceStrategy = r),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          const t = fb(
              this.urlTree.root,
              [],
              [],
              this.config.filter((t) => void 0 === t.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            e = this.processSegmentGroup(this.config, t, U_);
          if (null === e) return null;
          const n = new Pv(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              U_,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            s = new xv(n, e),
            r = new Nv(this.url, s);
          return this.inheritParamsAndData(r._root), r;
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = Rv(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = [];
          for (const r of Object.keys(e.children)) {
            const s = e.children[r],
              i = hb(t, r),
              o = this.processSegmentGroup(i, s, r);
            if (null === o) return null;
            n.push(...o);
          }
          const s = Lb(n);
          return (
            s.sort((t, e) =>
              t.value.outlet === U_
                ? -1
                : e.value.outlet === U_
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            s
          );
        }
        processSegment(t, e, n, s) {
          for (const r of t) {
            const t = this.processSegmentAgainstRoute(r, e, n, s);
            if (null !== t) return t;
          }
          return yb(e, n, s) ? [] : null;
        }
        processSegmentAgainstRoute(t, e, n, s) {
          if (t.redirectTo || !mb(t, e, n, s)) return null;
          let r,
            i = [],
            o = [];
          if ('**' === t.path) {
            const s = n.length > 0 ? K_(n).parameters : {};
            r = new Pv(
              n,
              s,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Vb(t),
              ub(t),
              t.component,
              t,
              jb(e),
              Fb(e) + n.length,
              Mb(t)
            );
          } else {
            const s = pb(e, t, n);
            if (!s.matched) return null;
            (i = s.consumedSegments),
              (o = n.slice(s.lastChild)),
              (r = new Pv(
                i,
                s.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Vb(t),
                ub(t),
                t.component,
                t,
                jb(e),
                Fb(e) + i.length,
                Mb(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = fb(
              e,
              i,
              o,
              a.filter((t) => void 0 === t.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return null === t ? null : [new xv(r, t)];
          }
          if (0 === a.length && 0 === c.length) return [new xv(r, [])];
          const u = ub(t) === s,
            h = this.processSegment(a, l, c, u ? U_ : s);
          return null === h ? null : [new xv(r, h)];
        }
      }
      function Db(t) {
        const e = t.value.routeConfig;
        return e && '' === e.path && void 0 === e.redirectTo;
      }
      function Lb(t) {
        const e = [],
          n = new Set();
        for (const s of t) {
          if (!Db(s)) {
            e.push(s);
            continue;
          }
          const t = e.find((t) => s.value.routeConfig === t.value.routeConfig);
          void 0 !== t ? (t.children.push(...s.children), n.add(t)) : e.push(s);
        }
        for (const s of n) {
          const t = Lb(s.children);
          e.push(new xv(s.value, t));
        }
        return e.filter((t) => !n.has(t));
      }
      function jb(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function Fb(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function Vb(t) {
        return t.data || {};
      }
      function Mb(t) {
        return t.resolve || {};
      }
      function Ub(t) {
        return $d((e) => {
          const n = t(e);
          return n ? L(n).pipe(x(() => e)) : Ld(e);
        });
      }
      class Hb extends class {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      const $b = new Hn('ROUTES');
      class Bb {
        constructor(t, e, n, s) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = s);
        }
        load(t, e) {
          if (e._loader$) return e._loader$;
          this.onLoadStartListener && this.onLoadStartListener(e);
          const n = this.loadModuleFactory(e.loadChildren).pipe(
            x((n) => {
              this.onLoadEndListener && this.onLoadEndListener(e);
              const s = n.create(t);
              return new tb(
                Q_(s.injector.get($b, void 0, vt.Self | vt.Optional)).map(cb),
                s
              );
            }),
            Ad((t) => {
              throw ((e._loader$ = void 0), t);
            })
          );
          return (e._loader$ = new Q(n, () => new C()).pipe(q())), e._loader$;
        }
        loadModuleFactory(t) {
          return 'string' == typeof t
            ? L(this.loader.load(t))
            : Z_(t()).pipe(
                M((t) =>
                  t instanceof il
                    ? Ld(t)
                    : L(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class qb {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new zb()),
            (this.attachRef = null);
        }
      }
      class zb {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new qb()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class Wb {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function Qb(t) {
        throw t;
      }
      function Kb(t, e, n) {
        return e.parse('/');
      }
      function Gb(t, e) {
        return Ld(null);
      }
      const Zb = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        Yb = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        };
      let Jb = (() => {
          class t {
            constructor(t, e, n, s, r, i, o, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = s),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.disposed = !1),
                (this.lastLocationChangeInfo = null),
                (this.navigationId = 0),
                (this.currentPageId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new C()),
                (this.errorHandler = Qb),
                (this.malformedUriErrorHandler = Kb),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: Gb,
                  afterPreactivation: Gb,
                }),
                (this.urlHandlingStrategy = new Wb()),
                (this.routeReuseStrategy = new Hb()),
                (this.onSameUrlNavigation = 'ignore'),
                (this.paramsInheritanceStrategy = 'emptyOnly'),
                (this.urlUpdateStrategy = 'deferred'),
                (this.relativeLinkResolution = 'corrected'),
                (this.canceledNavigationResolution = 'replace'),
                (this.ngModule = r.get(rl)),
                (this.console = r.get(Zl));
              const l = r.get(cc);
              (this.isNgZoneEnabled = l instanceof cc && cc.isInAngularZone()),
                this.resetConfig(a),
                (this.currentUrlTree = new sv(new rv([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new Bb(
                  i,
                  o,
                  (t) => this.triggerEvent(new N_(t)),
                  (t) => this.triggerEvent(new D_(t))
                )),
                (this.routerState = Ov(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new zd({
                  id: 0,
                  targetPageId: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: 'imperative',
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                Ap((t) => 0 !== t.id),
                x((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                $d((t) => {
                  let n = !1,
                    s = !1;
                  return Ld(t).pipe(
                    Ed((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    $d((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ('reload' === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Ld(t).pipe(
                          $d((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new E_(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue()
                                ? md
                                : Promise.resolve(t)
                            );
                          }),
                          (function (t, e, n, s) {
                            return $d((r) =>
                              (function (t, e, n, s, r) {
                                return new Cb(t, e, n, s, r).apply();
                              })(t, e, n, r.extractedUrl, s).pipe(
                                x((t) =>
                                  Object.assign(Object.assign({}, r), {
                                    urlAfterRedirects: t,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Ed((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, s, r) {
                            return M((i) =>
                              (function (
                                t,
                                e,
                                n,
                                s,
                                r = 'emptyOnly',
                                i = 'legacy'
                              ) {
                                try {
                                  const o = new Nb(
                                    t,
                                    e,
                                    n,
                                    s,
                                    r,
                                    i
                                  ).recognize();
                                  return null === o ? Pb(new Rb()) : Ld(o);
                                } catch (o) {
                                  return Pb(o);
                                }
                              })(
                                t,
                                e,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                s,
                                r
                              ).pipe(
                                x((t) =>
                                  Object.assign(Object.assign({}, i), {
                                    targetSnapshot: t,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Ed((t) => {
                            'eager' === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(t.urlAfterRedirects, t),
                              (this.browserUrlTree = t.urlAfterRedirects));
                            const n = new k_(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: s,
                            source: r,
                            restoredState: i,
                            extras: o,
                          } = t,
                          a = new E_(n, this.serializeUrl(s), r, i);
                        e.next(a);
                        const l = Ov(s, this.rootComponentType).snapshot;
                        return Ld(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: s,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        md
                      );
                    }),
                    Ub((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: s,
                        rawUrl: r,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: s,
                        rawUrlTree: r,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    Ed((t) => {
                      const e = new O_(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    x((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: Ab(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return M((n) => {
                        const {
                          targetSnapshot: s,
                          currentSnapshot: r,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: o,
                          },
                        } = n;
                        return 0 === o.length && 0 === i.length
                          ? Ld(
                              Object.assign(Object.assign({}, n), {
                                guardsResult: !0,
                              })
                            )
                          : (function (t, e, n, s) {
                              return L(t).pipe(
                                M((t) =>
                                  (function (t, e, n, s, r) {
                                    const i =
                                      e && e.routeConfig
                                        ? e.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? Ld(
                                          i.map((i) => {
                                            const o = kb(i, e, r);
                                            let a;
                                            if (
                                              (function (t) {
                                                return t && eb(t.canDeactivate);
                                              })(o)
                                            )
                                              a = Z_(
                                                o.canDeactivate(t, e, n, s)
                                              );
                                            else {
                                              if (!eb(o))
                                                throw new Error(
                                                  'Invalid CanDeactivate guard'
                                                );
                                              a = Z_(o(t, e, n, s));
                                            }
                                            return a.pipe(S_());
                                          })
                                        ).pipe(rb())
                                      : Ld(!0);
                                  })(t.component, t.route, n, e, s)
                                ),
                                S_((t) => !0 !== t, !0)
                              );
                            })(o, s, r, t).pipe(
                              M((n) =>
                                n && 'boolean' == typeof n
                                  ? (function (t, e, n, s) {
                                      return L(e).pipe(
                                        xp((e) =>
                                          Wf(
                                            (function (t, e) {
                                              return (
                                                null !== t && e && e(new L_(t)),
                                                Ld(!0)
                                              );
                                            })(e.route.parent, s),
                                            (function (t, e) {
                                              return (
                                                null !== t && e && e(new F_(t)),
                                                Ld(!0)
                                              );
                                            })(e.route, s),
                                            (function (t, e, n) {
                                              const s = e[e.length - 1],
                                                r = e
                                                  .slice(0, e.length - 1)
                                                  .reverse()
                                                  .map((t) =>
                                                    (function (t) {
                                                      const e = t.routeConfig
                                                        ? t.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return e && 0 !== e.length
                                                        ? { node: t, guards: e }
                                                        : null;
                                                    })(t)
                                                  )
                                                  .filter((t) => null !== t)
                                                  .map((e) =>
                                                    cf(() =>
                                                      Ld(
                                                        e.guards.map((r) => {
                                                          const i = kb(
                                                            r,
                                                            e.node,
                                                            n
                                                          );
                                                          let o;
                                                          if (
                                                            (function (t) {
                                                              return (
                                                                t &&
                                                                eb(
                                                                  t.canActivateChild
                                                                )
                                                              );
                                                            })(i)
                                                          )
                                                            o = Z_(
                                                              i.canActivateChild(
                                                                s,
                                                                t
                                                              )
                                                            );
                                                          else {
                                                            if (!eb(i))
                                                              throw new Error(
                                                                'Invalid CanActivateChild guard'
                                                              );
                                                            o = Z_(i(s, t));
                                                          }
                                                          return o.pipe(S_());
                                                        })
                                                      ).pipe(rb())
                                                    )
                                                  );
                                              return Ld(r).pipe(rb());
                                            })(t, e.path, n),
                                            (function (t, e, n) {
                                              const s = e.routeConfig
                                                ? e.routeConfig.canActivate
                                                : null;
                                              return s && 0 !== s.length
                                                ? Ld(
                                                    s.map((s) =>
                                                      cf(() => {
                                                        const r = kb(s, e, n);
                                                        let i;
                                                        if (
                                                          (function (t) {
                                                            return (
                                                              t &&
                                                              eb(t.canActivate)
                                                            );
                                                          })(r)
                                                        )
                                                          i = Z_(
                                                            r.canActivate(e, t)
                                                          );
                                                        else {
                                                          if (!eb(r))
                                                            throw new Error(
                                                              'Invalid CanActivate guard'
                                                            );
                                                          i = Z_(r(e, t));
                                                        }
                                                        return i.pipe(S_());
                                                      })
                                                    )
                                                  ).pipe(rb())
                                                : Ld(!0);
                                            })(t, e.route, n)
                                          )
                                        ),
                                        S_((t) => !0 !== t, !0)
                                      );
                                    })(s, i, t, e)
                                  : Ld(n)
                              ),
                              x((t) =>
                                Object.assign(Object.assign({}, n), {
                                  guardsResult: t,
                                })
                              )
                            );
                      });
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    Ed((t) => {
                      if (nb(t.guardsResult)) {
                        const e = B_(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                      const e = new I_(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    Ap(
                      (t) =>
                        !!t.guardsResult ||
                        (this.cancelNavigationTransition(t, ''), !1)
                    ),
                    Ub((t) => {
                      if (t.guards.canActivateChecks.length)
                        return Ld(t).pipe(
                          Ed((t) => {
                            const e = new R_(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          $d((t) => {
                            let e = !1;
                            return Ld(t).pipe(
                              ((n = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              M((t) => {
                                const {
                                  targetSnapshot: e,
                                  guards: { canActivateChecks: r },
                                } = t;
                                if (!r.length) return Ld(t);
                                let i = 0;
                                return L(r).pipe(
                                  xp((t) =>
                                    (function (t, e, n, s) {
                                      return (function (t, e, n, s) {
                                        const r = Object.keys(t);
                                        if (0 === r.length) return Ld({});
                                        const i = {};
                                        return L(r).pipe(
                                          M((r) =>
                                            (function (t, e, n, s) {
                                              const r = kb(t, e, s);
                                              return Z_(
                                                r.resolve
                                                  ? r.resolve(e, n)
                                                  : r(e, n)
                                              );
                                            })(t[r], e, n, s).pipe(
                                              Ed((t) => {
                                                i[r] = t;
                                              })
                                            )
                                          ),
                                          d_(1),
                                          M(() =>
                                            Object.keys(i).length === r.length
                                              ? Ld(i)
                                              : md
                                          )
                                        );
                                      })(t._resolve, t, e, s).pipe(
                                        x(
                                          (e) => (
                                            (t._resolvedData = e),
                                            (t.data = Object.assign(
                                              Object.assign({}, t.data),
                                              Rv(t, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(t.route, e, n, s)
                                  ),
                                  Ed(() => i++),
                                  d_(1),
                                  M((e) => (i === r.length ? Ld(t) : md))
                                );
                              })),
                              Ed({
                                next: () => (e = !0),
                                complete: () => {
                                  e ||
                                    this.cancelNavigationTransition(
                                      t,
                                      "At least one route resolver didn't emit any value."
                                    );
                                },
                              })
                            );
                            var n, s;
                          }),
                          Ed((t) => {
                            const e = new P_(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                    }),
                    Ub((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: s,
                        rawUrl: r,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: s,
                        rawUrlTree: r,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    x((t) => {
                      const e = (function (t, e, n) {
                        const s = Vv(t, e._root, n ? n._root : void 0);
                        return new kv(s, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    Ed((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        'deferred' === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(this.rawUrlTree, t),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((r = this.rootContexts),
                    (i = this.routeReuseStrategy),
                    (o = (t) => this.triggerEvent(t)),
                    x(
                      (t) => (
                        new Jv(
                          i,
                          t.targetRouterState,
                          t.currentRouterState,
                          o
                        ).activate(r),
                        t
                      )
                    )),
                    Ed({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ff(() => {
                      n ||
                        s ||
                        this.cancelNavigationTransition(
                          t,
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        ),
                        (this.currentNavigation = null);
                    }),
                    Ad((n) => {
                      if (((s = !0), (r = n) && r.ngNavigationCancelingError)) {
                        const s = nb(n.url);
                        s ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const r = new x_(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(r),
                          s
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                this.scheduleNavigation(
                                  e,
                                  'imperative',
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      'eager' === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const s = new A_(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(s);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (i) {
                          t.reject(i);
                        }
                      }
                      var r;
                      return md;
                    })
                  );
                  var r, i, o;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  const e = this.extractLocationChangeInfoFromEvent(t);
                  this.shouldScheduleNavigation(
                    this.lastLocationChangeInfo,
                    e
                  ) &&
                    setTimeout(() => {
                      const { source: t, state: n, urlTree: s } = e,
                        r = { replaceUrl: !0 };
                      if (n) {
                        const t = Object.assign({}, n);
                        delete t.navigationId,
                          delete t.ɵrouterPageId,
                          0 !== Object.keys(t).length && (r.state = t);
                      }
                      this.scheduleNavigation(s, t, n, r);
                    }, 0),
                    (this.lastLocationChangeInfo = e);
                }));
            }
            extractLocationChangeInfoFromEvent(t) {
              var e;
              return {
                source: 'popstate' === t.type ? 'popstate' : 'hashchange',
                urlTree: this.parseUrl(t.url),
                state: (
                  null === (e = t.state) || void 0 === e
                    ? void 0
                    : e.navigationId
                )
                  ? t.state
                  : null,
                transitionId: this.getTransition().id,
              };
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0;
              const n = e.urlTree.toString() === t.urlTree.toString();
              return !(
                e.transitionId === t.transitionId &&
                n &&
                (('hashchange' === e.source && 'popstate' === t.source) ||
                  ('popstate' === e.source && 'hashchange' === t.source))
              );
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              ob(t),
                (this.config = t.map(cb)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.transitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(t, e = {}) {
              const {
                  relativeTo: n,
                  queryParams: s,
                  fragment: r,
                  queryParamsHandling: i,
                  preserveFragment: o,
                } = e,
                a = n || this.routerState.root,
                l = o ? this.currentUrlTree.fragment : r;
              let c = null;
              switch (i) {
                case 'merge':
                  c = Object.assign(
                    Object.assign({}, this.currentUrlTree.queryParams),
                    s
                  );
                  break;
                case 'preserve':
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = s || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                (function (t, e, n, s, r) {
                  if (0 === n.length) return $v(e.root, e.root, e, s, r);
                  const i = (function (t) {
                    if (
                      'string' == typeof t[0] &&
                      1 === t.length &&
                      '/' === t[0]
                    )
                      return new qv(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const s = t.reduce((t, s, r) => {
                      if ('object' == typeof s && null != s) {
                        if (s.outlets) {
                          const e = {};
                          return (
                            G_(s.outlets, (t, n) => {
                              e[n] = 'string' == typeof t ? t.split('/') : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (s.segmentPath) return [...t, s.segmentPath];
                      }
                      return 'string' != typeof s
                        ? [...t, s]
                        : 0 === r
                        ? (s.split('/').forEach((s, r) => {
                            (0 == r && '.' === s) ||
                              (0 == r && '' === s
                                ? (n = !0)
                                : '..' === s
                                ? e++
                                : '' != s && t.push(s));
                          }),
                          t)
                        : [...t, s];
                    }, []);
                    return new qv(n, e, s);
                  })(n);
                  if (i.toRoot()) return $v(e.root, new rv([], {}), e, s, r);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new zv(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new zv(t, t === e.root, 0);
                      }
                      const s = Uv(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let s = t,
                          r = e,
                          i = n;
                        for (; i > r; ) {
                          if (((i -= r), (s = s.parent), !s))
                            throw new Error("Invalid number of '../'");
                          r = s.segments.length;
                        }
                        return new zv(s, !1, r - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + s,
                        t.numberOfDoubleDots
                      );
                    })(i, e, t),
                    a = o.processChildren
                      ? Qv(o.segmentGroup, o.index, i.commands)
                      : Wv(o.segmentGroup, o.index, i.commands);
                  return $v(o.segmentGroup, a, e, s, r);
                })(a, this.currentUrlTree, t, c, null != l ? l : null)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              const n = nb(t) ? t : this.parseUrl(t),
                s = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              let r = null;
              return (
                'computed' === this.canceledNavigationResolution &&
                  (0 === this.currentPageId ||
                    e.skipLocationChange ||
                    e.replaceUrl) &&
                  (r = this.location.getState()),
                this.scheduleNavigation(s, 'imperative', r, e)
              );
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              let n;
              if (
                ((n =
                  !0 === e
                    ? Object.assign({}, Zb)
                    : !1 === e
                    ? Object.assign({}, Yb)
                    : e),
                nb(t))
              )
                return X_(this.currentUrlTree, t, n);
              const s = this.parseUrl(t);
              return X_(this.currentUrlTree, s, n);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const s = t[n];
                return null != s && (e[n] = s), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    (this.currentPageId = t.targetPageId),
                    this.events.next(
                      new T_(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn('Unhandled Navigation Error: ');
                }
              );
            }
            scheduleNavigation(t, e, n, s, r) {
              if (this.disposed) return Promise.resolve(!1);
              const i = this.getTransition(),
                o =
                  'imperative' !== e &&
                  'imperative' === (null == i ? void 0 : i.source),
                a =
                  (this.lastSuccessfulId === i.id || this.currentNavigation
                    ? i.rawUrl
                    : i.urlAfterRedirects
                  ).toString() === t.toString();
              if (o && a) return Promise.resolve(!0);
              let l, c, u;
              r
                ? ((l = r.resolve), (c = r.reject), (u = r.promise))
                : (u = new Promise((t, e) => {
                    (l = t), (c = e);
                  }));
              const h = ++this.navigationId;
              let d;
              return (
                (d =
                  'computed' === this.canceledNavigationResolution
                    ? n && n.ɵrouterPageId
                      ? n.ɵrouterPageId
                      : this.currentPageId + 1
                    : 0),
                this.setTransition({
                  id: h,
                  targetPageId: d,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: s,
                  resolve: l,
                  reject: c,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e) {
              const n = this.urlSerializer.serialize(t),
                s = Object.assign(
                  Object.assign({}, e.extras.state),
                  this.generateNgRouterState(e.id, e.targetPageId)
                );
              this.location.isCurrentPathEqualTo(n) || e.extras.replaceUrl
                ? this.location.replaceState(n, '', s)
                : this.location.go(n, '', s);
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                '',
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            cancelNavigationTransition(t, e) {
              'computed' === this.canceledNavigationResolution
                ? ('popstate' !== t.source &&
                    'eager' !== this.urlUpdateStrategy) ||
                  this.location.historyGo(this.currentPageId - t.targetPageId)
                : this.resetUrlToCurrentUrlTree();
              const n = new x_(t.id, this.serializeUrl(t.extractedUrl), e);
              this.triggerEvent(n), t.resolve(!1);
            }
            generateNgRouterState(t, e) {
              return 'computed' === this.canceledNavigationResolution
                ? { navigationId: t, '\u0275routerPageId': e }
                : { navigationId: t };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                is(Bn),
                is(av),
                is(zb),
                is(nu),
                is(Ji),
                is(Rc),
                is(oc),
                is(void 0)
              );
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Xb = (() => {
          class t {
            constructor(t, e, n, s, r) {
              (this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = r),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new xl()),
                (this.deactivateEvents = new xl()),
                (this.name = s || U_),
                t.onChildOutletCreated(this.name, this);
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }
            get isActivated() {
              return !!this.activated;
            }
            get component() {
              if (!this.activated) throw new Error('Outlet is not activated');
              return this.activated.instance;
            }
            get activatedRoute() {
              if (!this.activated) throw new Error('Outlet is not activated');
              return this._activatedRoute;
            }
            get activatedRouteData() {
              return this._activatedRoute
                ? this._activatedRoute.snapshot.data
                : {};
            }
            detach() {
              if (!this.activated) throw new Error('Outlet is not activated');
              this.location.detach();
              const t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }
            attach(t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }
            deactivate() {
              if (this.activated) {
                const t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }
            activateWith(t, e) {
              if (this.isActivated)
                throw new Error('Cannot activate an already activated outlet');
              this._activatedRoute = t;
              const n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                s = this.parentContexts.getOrCreateContext(this.name).children,
                r = new tw(t, s, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                r
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                yo(zb),
                yo(al),
                yo(va),
                ('name',
                (function (t, e) {
                  const n = t.attrs;
                  if (n) {
                    const t = n.length;
                    let s = 0;
                    for (; s < t; ) {
                      const r = n[s];
                      if (hn(r)) break;
                      if (0 === r) s += 2;
                      else if ('number' == typeof r)
                        for (s++; s < t && 'string' == typeof n[s]; ) s++;
                      else {
                        if (r === e) return n[s + 1];
                        s += 2;
                      }
                    }
                  }
                  return null;
                })(Ie(), 'name')),
                yo(Ga)
              );
            }),
            (t.ɵdir = Qt({
              type: t,
              selectors: [['router-outlet']],
              outputs: {
                activateEvents: 'activate',
                deactivateEvents: 'deactivate',
              },
              exportAs: ['outlet'],
            })),
            t
          );
        })();
      class tw {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === Iv
            ? this.route
            : t === zb
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class ew {}
      class nw {
        preload(t, e) {
          return Ld(null);
        }
      }
      let sw = (() => {
          class t {
            constructor(t, e, n, s, r) {
              (this.router = t),
                (this.injector = s),
                (this.preloadingStrategy = r),
                (this.loader = new Bb(
                  e,
                  n,
                  (e) => t.triggerEvent(new N_(e)),
                  (e) => t.triggerEvent(new D_(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Ap((t) => t instanceof T_),
                  xp(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(rl);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const s of e)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const t = s._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  s.loadChildren && !s.canLoad
                    ? n.push(this.preloadConfig(t, s))
                    : s.children && n.push(this.processRoutes(t, s.children));
              return L(n).pipe(
                $(),
                x((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                (e._loadedConfig
                  ? Ld(e._loadedConfig)
                  : this.loader.load(t.injector, e)
                ).pipe(
                  M(
                    (t) => (
                      (e._loadedConfig = t),
                      this.processRoutes(t.module, t.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Jb), is(Rc), is(oc), is(Ji), is(ew));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        rw = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = 'imperative'),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || 'disabled'),
                (n.anchorScrolling = n.anchorScrolling || 'disabled');
            }
            init() {
              'disabled' !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration('manual'),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof E_
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof T_ &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof M_ &&
                  (t.position
                    ? 'top' === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : 'enabled' === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new M_(
                  t,
                  'popstate' === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(is(Jb), is(Eu), is(void 0));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const iw = new Hn('ROUTER_CONFIGURATION'),
        ow = new Hn('ROUTER_FORROOT_GUARD'),
        aw = [
          nu,
          { provide: av, useClass: lv },
          {
            provide: Jb,
            useFactory: function (t, e, n, s, r, i, o, a = {}, l, c) {
              const u = new Jb(null, t, e, n, s, r, i, Q_(o));
              return (
                l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy);
                })(a, u),
                a.enableTracing &&
                  u.events.subscribe((t) => {
                    var e, n;
                    null === (e = console.group) ||
                      void 0 === e ||
                      e.call(console, `Router Event: ${t.constructor.name}`),
                      console.log(t.toString()),
                      console.log(t),
                      null === (n = console.groupEnd) ||
                        void 0 === n ||
                        n.call(console);
                  }),
                u
              );
            },
            deps: [
              av,
              zb,
              nu,
              Ji,
              Rc,
              oc,
              $b,
              iw,
              [class {}, new us()],
              [class {}, new us()],
            ],
          },
          zb,
          {
            provide: Iv,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [Jb],
          },
          { provide: Rc, useClass: Dc },
          sw,
          nw,
          class {
            preload(t, e) {
              return e().pipe(Ad(() => Ld(null)));
            }
          },
          { provide: iw, useValue: { enableTracing: !1 } },
        ];
      function lw() {
        return new Ec('Router', Jb);
      }
      let cw = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                aw,
                pw(e),
                {
                  provide: ow,
                  useFactory: dw,
                  deps: [[Jb, new us(), new hs()]],
                },
                { provide: iw, useValue: n || {} },
                {
                  provide: Yc,
                  useFactory: hw,
                  deps: [$c, [new cs(Xc), new us()], iw],
                },
                { provide: rw, useFactory: uw, deps: [Jb, Eu, iw] },
                {
                  provide: ew,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : nw,
                },
                { provide: Ec, multi: !0, useFactory: lw },
                [
                  fw,
                  { provide: $l, multi: !0, useFactory: gw, deps: [fw] },
                  { provide: yw, useFactory: mw, deps: [fw] },
                  { provide: Gl, multi: !0, useExisting: yw },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [pw(e)] };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(ow, 8), is(Jb, 8));
          }),
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = ht({})),
          t
        );
      })();
      function uw(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new rw(t, e, n);
      }
      function hw(t, e, n = {}) {
        return n.useHash ? new eu(t, e) : new tu(t, e);
      }
      function dw(t) {
        return 'guarded';
      }
      function pw(t) {
        return [
          { provide: $n, multi: !0, useValue: t },
          { provide: $b, multi: !0, useValue: t },
        ];
      }
      let fw = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new C());
          }
          appInitializer() {
            return this.injector.get(qc, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(Jb),
                s = this.injector.get(iw);
              return (
                'disabled' === s.initialNavigation
                  ? (n.setUpLocationChangeListener(), t(!0))
                  : 'enabled' === s.initialNavigation ||
                    'enabledBlocking' === s.initialNavigation
                  ? ((n.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? Ld(null)
                        : ((this.initNavigation = !0),
                          t(!0),
                          this.resultOfPreactivationDone)),
                    n.initialNavigation())
                  : t(!0),
                e
              );
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(iw),
              n = this.injector.get(sw),
              s = this.injector.get(rw),
              r = this.injector.get(Jb),
              i = this.injector.get(Oc);
            t === i.components[0] &&
              (('enabledNonBlocking' !== e.initialNavigation &&
                void 0 !== e.initialNavigation) ||
                r.initialNavigation(),
              n.setUpPreloading(),
              s.init(),
              r.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(is(Ji));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function gw(t) {
        return t.appInitializer.bind(t);
      }
      function mw(t) {
        return t.bootstrapListener.bind(t);
      }
      const yw = new Hn('Router Initializer'),
        _w = [];
      let vw = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[cw.forRoot(_w)], cw] })),
            t
          );
        })(),
        bw = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu]] })),
            t
          );
        })(),
        ww = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu, Tf]] })),
            t
          );
        })(),
        Sw = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu]] })),
            t
          );
        })(),
        Cw = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu, lf]] })),
            t
          );
        })(),
        Ew = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ht({ imports: [[Cu, ng]] })),
            t
          );
        })(),
        Tw = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t, bootstrap: [vg] })),
            (t.ɵinj = ht({
              providers: [_f],
              imports: [
                [
                  oh,
                  lf,
                  Sg,
                  i_,
                  a_.forEnvironment(bg),
                  vw,
                  dd,
                  Df,
                  Uf,
                  bw,
                  ww,
                  Sw,
                  dd,
                  Cw,
                  Ew,
                ],
              ],
            })),
            t
          );
        })();
      bg.production &&
        (function () {
          if (Sc)
            throw new Error('Cannot enable prod mode after platform setup.');
          wc = !1;
        })(),
        rh()
          .bootstrapModule(Tw)
          .catch((t) => console.error(t));
    },
    808: (t) => {
      function e(t) {
        return (
          t &&
          t.constructor &&
          'function' == typeof t.constructor.isBuffer &&
          t.constructor.isBuffer(t)
        );
      }
      function n(t) {
        return t;
      }
      function s(t, s) {
        const r = (s = s || {}).delimiter || '.',
          i = s.maxDepth,
          o = s.transformKey || n,
          a = {};
        return (
          (function t(n, l, c) {
            (c = c || 1),
              Object.keys(n).forEach(function (u) {
                const h = n[u],
                  d = s.safe && Array.isArray(h),
                  p = Object.prototype.toString.call(h),
                  f = e(h),
                  g = '[object Object]' === p || '[object Array]' === p,
                  m = l ? l + r + o(u) : o(u);
                if (
                  !d &&
                  !f &&
                  g &&
                  Object.keys(h).length &&
                  (!s.maxDepth || c < i)
                )
                  return t(h, m, c + 1);
                a[m] = h;
              });
          })(t),
          a
        );
      }
      (t.exports = s),
        (s.flatten = s),
        (s.unflatten = function t(r, i) {
          const o = (i = i || {}).delimiter || '.',
            a = i.overwrite || !1,
            l = i.transformKey || n,
            c = {};
          if (e(r) || '[object Object]' !== Object.prototype.toString.call(r))
            return r;
          function u(t) {
            const e = Number(t);
            return isNaN(e) || -1 !== t.indexOf('.') || i.object ? t : e;
          }
          return (
            (r = Object.keys(r).reduce(function (t, e) {
              const n = Object.prototype.toString.call(r[e]);
              return ('[object Object]' !== n && '[object Array]' !== n) ||
                (function (t) {
                  const e = Object.prototype.toString.call(t);
                  return (
                    !t ||
                    ('[object Array]' === e
                      ? !t.length
                      : '[object Object]' === e
                      ? !Object.keys(t).length
                      : void 0)
                  );
                })(r[e])
                ? ((t[e] = r[e]), t)
                : (function (t, e, n) {
                    return Object.keys(n).reduce(function (e, s) {
                      return (e[t + o + s] = n[s]), e;
                    }, e);
                  })(e, t, s(r[e], i));
            }, {})),
            Object.keys(r).forEach(function (e) {
              const n = e.split(o).map(l);
              let s = u(n.shift()),
                h = u(n[0]),
                d = c;
              for (; void 0 !== h; ) {
                if ('__proto__' === s) return;
                const t = Object.prototype.toString.call(d[s]),
                  e = '[object Object]' === t || '[object Array]' === t;
                if (!a && !e && void 0 !== d[s]) return;
                ((a && !e) || (!a && null == d[s])) &&
                  (d[s] = 'number' != typeof h || i.object ? {} : []),
                  (d = d[s]),
                  n.length > 0 && ((s = u(n.shift())), (h = u(n[0])));
              }
              d[s] = t(r[e], i);
            }),
            c
          );
        });
    },
  },
  (t) => {
    'use strict';
    t((t.s = 77));
  },
]);
