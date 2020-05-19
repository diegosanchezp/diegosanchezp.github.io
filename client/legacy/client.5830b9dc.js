function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

var identity = function identity(x) {
  return x;
};

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function exclude_internal_props(props) {
  var result = {};

  for (var k in props) {
    if (k[0] !== '$') result[k] = props[k];
  }

  return result;
}

function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

var is_client = typeof window !== 'undefined';
var now = is_client ? function () {
  return window.performance.now();
} : function () {
  return Date.now();
};
var raf = is_client ? function (cb) {
  return requestAnimationFrame(cb);
} : noop; // used internally for testing

var tasks = new Set();

function run_tasks(now) {
  tasks.forEach(function (task) {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */


function loop(callback) {
  var task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise(function (fulfill) {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),
    abort: function abort() {
      tasks.delete(task);
    }
  };
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function set_attributes(node, attributes) {
  // @ts-ignore
  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

  for (var key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value' || descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

function set_svg_attributes(node, attributes) {
  for (var key in attributes) {
    attr(node, key, attributes[key]);
  }
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;

      while (j < node.attributes.length) {
        var attribute = node.attributes[j];

        if (attributes[attribute.name]) {
          j++;
        } else {
          node.removeAttribute(attribute.name);
        }
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? 'important' : '');
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var active_docs = new Set();
var active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i--) {
    hash = (hash << 5) - hash ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

function create_rule(node, a, b, duration, delay, ease, fn) {
  var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var step = 16.666 / duration;
  var keyframes = '{\n';

  for (var p = 0; p <= 1; p += step) {
    var t = a + (b - a) * ease(p);
    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
  }

  var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
  var name = "__svelte_".concat(hash(rule), "_").concat(uid);
  var doc = node.ownerDocument;
  active_docs.add(doc);
  var stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
  var current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});

  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
  }

  var animation = node.style.animation || '';
  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : "").concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
  active += 1;
  return name;
}

function delete_rule(node, name) {
  var previous = (node.style.animation || '').split(', ');
  var next = previous.filter(name ? function (anim) {
    return anim.indexOf(name) < 0;
  } // remove specific animation
  : function (anim) {
    return anim.indexOf('__svelte') === -1;
  } // remove all Svelte animations
  );
  var deleted = previous.length - next.length;

  if (deleted) {
    node.style.animation = next.join(', ');
    active -= deleted;
    if (!active) clear_rules();
  }
}

function clear_rules() {
  raf(function () {
    if (active) return;
    active_docs.forEach(function (doc) {
      var stylesheet = doc.__svelte_stylesheet;
      var i = stylesheet.cssRules.length;

      while (i--) {
        stylesheet.deleteRule(i);
      }

      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail);
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
} // TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  var callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(function (fn) {
      return fn(event);
    });
  }
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var promise;

function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(function () {
      promise = null;
    });
  }

  return promise;
}

function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var null_transition = {
  duration: 0
};

function create_bidirectional_transition(node, fn, params, intro) {
  var config = fn(node, params);
  var t = intro ? 0 : 1;
  var running_program = null;
  var pending_program = null;
  var animation_name = null;

  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function init(program, duration) {
    var d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d: d,
      duration: duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }

  function go(b) {
    var _ref3 = config || null_transition,
        _ref3$delay = _ref3.delay,
        delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 300 : _ref3$duration,
        _ref3$easing = _ref3.easing,
        easing = _ref3$easing === void 0 ? identity : _ref3$easing,
        _ref3$tick = _ref3.tick,
        tick = _ref3$tick === void 0 ? noop : _ref3$tick,
        css = _ref3.css;

    var program = {
      start: now() + delay,
      b: b
    };

    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }

    if (running_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }

      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(function () {
        return dispatch(node, b, 'start');
      });
      loop(function (now) {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');

          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }

        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');

            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro — we can tidy up immediately
                clear_animation();
              } else {
                // outro — needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }

            running_program = null;
          } else if (now >= running_program.start) {
            var p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }

        return !!(running_program || pending_program);
      });
    }
  }

  return {
    run: function run(b) {
      if (is_function(config)) {
        wait().then(function () {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end: function end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, function () {
    lookup.delete(block.key);
  });
}

function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  var o = old_blocks.length;
  var n = list.length;
  var i = o;
  var old_indexes = {};

  while (i--) {
    old_indexes[old_blocks[i].key] = i;
  }

  var new_blocks = [];
  var new_lookup = new Map();
  var deltas = new Map();
  i = n;

  while (i--) {
    var child_ctx = get_context(ctx, list, i);
    var key = get_key(child_ctx);
    var block = lookup.get(key);

    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }

    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }

  var will_move = new Set();
  var did_move = new Set();

  function insert(block) {
    transition_in(block, 1);
    block.m(node, next, lookup.has(block.key));
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }

  while (o && n) {
    var new_block = new_blocks[n - 1];
    var old_block = old_blocks[o - 1];
    var new_key = new_block.key;
    var old_key = old_block.key;

    if (new_block === old_block) {
      // do nothing
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      // remove old block
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }

  while (o--) {
    var _old_block = old_blocks[o];
    if (!new_lookup.has(_old_block.key)) destroy(_old_block, lookup);
  }

  while (n) {
    insert(new_blocks[n - 1]);
  }

  return new_blocks;
}

function validate_each_keys(ctx, list, get_context, get_key) {
  var keys = new Set();

  for (var i = 0; i < list.length; i++) {
    var key = get_key(get_context(ctx, list, i));

    if (keys.has(key)) {
      throw new Error("Cannot have duplicate keys in a keyed each");
    }

    keys.add(key);
  }
}

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function bind(component, name, callback) {
  var index = component.$$.props[name];

  if (index !== undefined) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(function () {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props) {
  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var prop_values = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: dirty
  };
  var ready = false;
  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if ($$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set() {// overridden by instance, if it has props
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.22.2'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node: node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node: node,
    attribute: attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node: node,
    attribute: attribute,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.data === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
    var slot_key = _Object$keys[_i2];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}

var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super2 = _createSuper(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super2.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn("Component was already destroyed"); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);

var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

var CONTEXT_KEY = {};
var preload = function preload() {
  return {};
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "body{background-color:#000;color:#fff}.mdc-drawer{background-color:#121212;border-radius:0 0 0 0;z-index:6;width:256px;display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;height:100%;border-right:1px solid;border-color:hsla(0,0%,100%,.12);overflow:hidden;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.mdc-drawer .mdc-drawer__title{color:hsla(0,0%,100%,.87)}.mdc-drawer .mdc-drawer__subtitle,.mdc-drawer .mdc-list-group__subheader,.mdc-drawer .mdc-list-item__graphic{color:hsla(0,0%,100%,.6)}.mdc-drawer .mdc-list-item{color:hsla(0,0%,100%,.87)}.mdc-drawer .mdc-list-item--activated .mdc-list-item__graphic{color:#fc0}.mdc-drawer .mdc-list-item--activated{color:rgba(255,204,0,.87)}.mdc-drawer[dir=rtl],[dir=rtl] .mdc-drawer{border-radius:0 0 0 0}.mdc-drawer .mdc-list-item{border-radius:4px}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:256px;margin-right:0}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl],[dir=rtl] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:0;margin-right:256px}.mdc-drawer[dir=rtl],[dir=rtl] .mdc-drawer{border-right-width:0;border-left-width:1px;border-right-style:none;border-left-style:solid}.mdc-drawer .mdc-list-item{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.375rem;font-weight:500;letter-spacing:.00714em;text-decoration:inherit;text-transform:inherit;height:40px;margin:8px;padding:0 8px}.mdc-drawer .mdc-list-item:first-child{margin-top:2px}.mdc-drawer .mdc-list-item:last-child{margin-bottom:0}.mdc-drawer .mdc-list-group__subheader{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.01786em;text-decoration:inherit;text-transform:inherit;display:block;line-height:normal;margin:0;padding:0 16px}.mdc-drawer .mdc-list-group__subheader:before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-drawer .mdc-list-divider{margin:3px 0 4px}.mdc-drawer .mdc-list-item__graphic,.mdc-drawer .mdc-list-item__text{pointer-events:none}.mdc-drawer--animate{transform:translateX(-100%)}.mdc-drawer--animate[dir=rtl],[dir=rtl] .mdc-drawer--animate{transform:translateX(100%)}.mdc-drawer--opening{transition-duration:.25s}.mdc-drawer--opening,.mdc-drawer--opening[dir=rtl],[dir=rtl] .mdc-drawer--opening{transform:translateX(0)}.mdc-drawer--closing{transform:translateX(-100%);transition-duration:.2s}.mdc-drawer--closing[dir=rtl],[dir=rtl] .mdc-drawer--closing{transform:translateX(100%)}.mdc-drawer__header{flex-shrink:0;box-sizing:border-box;min-height:64px;padding:0 16px 4px}.mdc-drawer__title{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-drawer__title:before{display:inline-block;width:0;height:36px;content:\"\";vertical-align:0}.mdc-drawer__title:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-drawer__subtitle{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.01786em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin-bottom:0}.mdc-drawer__subtitle:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-drawer__content{height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}.mdc-drawer--dismissible{left:0;right:auto;display:none;position:absolute}.mdc-drawer--dismissible[dir=rtl],[dir=rtl] .mdc-drawer--dismissible{left:auto;right:0}.mdc-drawer--dismissible.mdc-drawer--open{display:flex}.mdc-drawer-app-content{position:relative}.mdc-drawer-app-content,.mdc-drawer-app-content[dir=rtl],[dir=rtl] .mdc-drawer-app-content{margin-left:0;margin-right:0}.mdc-drawer--modal{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);left:0;right:auto;display:none;position:fixed}.mdc-drawer--modal+.mdc-drawer-scrim{background-color:hsla(0,0%,100%,.32)}.mdc-drawer--modal[dir=rtl],[dir=rtl] .mdc-drawer--modal{left:auto;right:0}.mdc-drawer--modal.mdc-drawer--open{display:flex}.mdc-drawer-scrim{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.mdc-drawer--open+.mdc-drawer-scrim{display:block}.mdc-drawer--animate+.mdc-drawer-scrim{opacity:0}.mdc-drawer--opening+.mdc-drawer-scrim{transition-duration:.25s;opacity:1}.mdc-drawer--closing+.mdc-drawer-scrim{transition-duration:.2s;opacity:0}";
styleInject(css_248z);

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
var candidateSelector = candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;

  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];
    if (!isNodeMatchingSelectorTabbable(candidate)) continue;
    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node) {
  if (!isNodeMatchingSelectorFocusable(node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
}

function isTabbable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node);
}

function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node)) {
    return false;
  }

  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

function isFocusable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.

  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
}

function isHidden(node) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return node.offsetParent === null || getComputedStyle(node).visibility === 'hidden';
}

var tabbable_1 = tabbable;

var immutable = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

var activeFocusDelay;

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

function focusTrap(element, userOptions) {
  var doc = document;
  var container = typeof element === 'string' ? doc.querySelector(element) : element;
  var config = immutable({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true
  }, userOptions);
  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    clearTimeout(activeFocusDelay);
    removeListeners();
    state.active = false;
    state.paused = false;
    activeFocusTraps.deactivateTrap(trap);
    var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    updateTabbableNodes();
    addListeners();
  }

  function addListeners() {
    if (!state.active) return; // There can be only one listening focus trap at a time

    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    activeFocusDelay = delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  }

  function removeListeners() {
    if (!state.active) return;
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  }

  function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus');
    return node ? node : previousActiveElement;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable_1.isFocusable(e.target)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }

    e.preventDefault();
  } // In case focus escapes the trap for some strange reason, pull it back in.


  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  } // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;

    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable_1(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

var focusTrap_1 = focusTrap;

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function createFocusTrapInstance(surfaceEl, focusTrapFactory) {
  if (focusTrapFactory === void 0) {
    focusTrapFactory = focusTrap_1;
  }

  return focusTrapFactory(surfaceEl, {
    clickOutsideDeactivates: true,
    escapeDeactivates: false,
    initialFocus: undefined,
    returnFocusOnDeactivate: false
  });
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter_ = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root_ = root;
    this.initialize.apply(this, __spread(args)); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new MDCFoundation({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler, options) {
    this.root_.addEventListener(evtType, handler, options);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler, options) {
    this.root_.removeEventListener(evtType, handler, options);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches$1(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}
function matches$1(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  ROOT: 'mdc-list'
};
var strings = {
  ACTION_EVENT: 'MDCList:action',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a\n  ",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
  RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)'
};
var numbers = {
  UNSET_INDEX: -1
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}

var MDCListFoundation =
/** @class */
function (_super) {
  __extends(MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCListFoundation.defaultAdapter, adapter)) || this;

    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = numbers.UNSET_INDEX;
    _this.focusedItemIndex_ = numbers.UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function get() {
      return strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function get() {
      return cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function get() {
      return numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClassForElementIndex: function addClassForElementIndex() {
          return undefined;
        },
        focusItemAtIndex: function focusItemAtIndex() {
          return undefined;
        },
        getAttributeForElementIndex: function getAttributeForElementIndex() {
          return null;
        },
        getFocusedElementIndex: function getFocusedElementIndex() {
          return 0;
        },
        getListItemCount: function getListItemCount() {
          return 0;
        },
        hasCheckboxAtIndex: function hasCheckboxAtIndex() {
          return false;
        },
        hasRadioAtIndex: function hasRadioAtIndex() {
          return false;
        },
        isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex() {
          return false;
        },
        isFocusInsideList: function isFocusInsideList() {
          return false;
        },
        isRootFocused: function isRootFocused() {
          return false;
        },
        notifyAction: function notifyAction() {
          return undefined;
        },
        removeClassForElementIndex: function removeClassForElementIndex() {
          return undefined;
        },
        setAttributeForElementIndex: function setAttributeForElementIndex() {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex() {
          return undefined;
        },
        setTabIndexForListItemChildren: function setTabIndexForListItemChildren() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter_.getListItemCount() === 0) {
      return;
    }

    if (this.adapter_.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter_.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    }
  };
  /**
   * Sets the private wrapFocus_ variable.
   */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus_ = value;
  };
  /**
   * Sets the isVertical_ private variable.
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical_ = value;
  };
  /**
   * Sets the isSingleSelectionList_ private variable.
   */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList_ = value;
  };
  /**
   * Sets the useActivatedClass_ private variable.
   */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass_ = useActivated;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index) {
    if (!this.isIndexValid_(index)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
     * is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter_.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedItem_();
      }
    }, 0);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
    var isArrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    var isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    var isArrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    var isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    var isHome = evt.key === 'Home' || evt.keyCode === 36;
    var isEnd = evt.key === 'End' || evt.keyCode === 35;
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    var isSpace = evt.key === 'Space' || evt.keyCode === 32;

    if (this.adapter_.isRootFocused()) {
      if (isArrowUp || isEnd) {
        evt.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        evt.preventDefault();
        this.focusFirstElement();
      }

      return;
    }

    var currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    var nextIndex;

    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
        var target = evt.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        this.preventDefaultEvent_(evt);

        if (this.isSelectableList_()) {
          this.setSelectedIndexOnAction_(currentIndex);
        }

        this.adapter_.notifyAction(currentIndex);
      }
    }

    this.focusedItemIndex_ = currentIndex;

    if (nextIndex !== undefined) {
      this.setTabindexAtIndex_(nextIndex);
      this.focusedItemIndex_ = nextIndex;
    }
  };
  /**
   * Click handler for the list.
   */


  MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
    if (index === numbers.UNSET_INDEX) {
      return;
    }

    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }

    this.adapter_.notifyAction(index);
    this.setTabindexAtIndex_(index);
    this.focusedItemIndex_ = index;
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter_.getListItemCount();
    var nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    this.adapter_.focusItemAtIndex(0);
    return 0;
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    var lastIndex = this.adapter_.getListItemCount() - 1;
    this.adapter_.focusItemAtIndex(lastIndex);
    return lastIndex;
  };
  /**
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
    if (!this.isIndexValid_(itemIndex)) {
      return;
    }

    if (isEnabled) {
      this.adapter_.removeClassForElementIndex(itemIndex, cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.setAttributeForElementIndex(itemIndex, strings.ARIA_DISABLED, 'false');
    } else {
      this.adapter_.addClassForElementIndex(itemIndex, cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.setAttributeForElementIndex(itemIndex, strings.ARIA_DISABLED, 'true');
    }
  };
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   */


  MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
    var target = evt.target;
    var tagName = ("" + target.tagName).toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
    if (this.selectedIndex_ === index) {
      return;
    }

    var selectedClassName = cssClasses.LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = cssClasses.LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.adapter_.addClassForElementIndex(index, selectedClassName);
    this.setAriaForSingleSelectionAtIndex_(index);
    this.selectedIndex_ = index;
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
    // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
    if (this.selectedIndex_ === numbers.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(index, strings.ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? strings.ARIA_CURRENT : strings.ARIA_SELECTED;

    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
    }

    var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
    this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, strings.ARIA_CHECKED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, strings.ARIA_CHECKED, 'true');
    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
    for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
      var isChecked = false;

      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }

      this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter_.setAttributeForElementIndex(i, strings.ARIA_CHECKED, isChecked ? 'true' : 'false');
    }

    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
    if (this.focusedItemIndex_ === numbers.UNSET_INDEX && index !== 0) {
      // If no list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
      this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
    }

    this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio list.
   */


  MDCListFoundation.prototype.isSelectableList_ = function () {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
    var targetIndex = 0;

    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== numbers.UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }

    this.setTabindexAtIndex_(targetIndex);
  };

  MDCListFoundation.prototype.isIndexValid_ = function (index) {
    var _this = this;

    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
      }

      return this.isIndexInRange_(index);
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange_ = function (index) {
    var listSize = this.adapter_.getListItemCount();
    return index >= 0 && index < listSize;
  };

  MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }

    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
    var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);

    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }

    this.adapter_.setAttributeForElementIndex(index, strings.ARIA_CHECKED, isChecked ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.

    var selectedIndexes = this.selectedIndex_ === numbers.UNSET_INDEX ? [] : this.selectedIndex_.slice();

    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex_ = selectedIndexes;
  };

  return MDCListFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCList =
/** @class */
function (_super) {
  __extends(MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function set(value) {
      this.foundation_.setVerticalOrientation(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function get() {
      return [].slice.call(this.root_.querySelectorAll("." + cssClasses.LIST_ITEM_CLASS));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function set(value) {
      this.foundation_.setWrapFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function set(isSingleSelectionList) {
      this.foundation_.setSingleSelection(isSingleSelectionList);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function get() {
      return this.foundation_.getSelectedIndex();
    },
    set: function set(index) {
      this.foundation_.setSelectedIndex(index);
    },
    enumerable: true,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.handleClick_ = this.handleClickEvent_.bind(this);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.listen('keydown', this.handleKeydown_);
    this.listen('click', this.handleClick_);
    this.listen('focusin', this.focusInEventListener_);
    this.listen('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten('click', this.handleClick_);
    this.unlisten('focusin', this.focusInEventListener_);
    this.unlisten('focusout', this.focusOutEventListener_);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root_.getAttribute(strings.ARIA_ORIENTATION);
    this.vertical = direction !== strings.ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(function (el) {
      el.setAttribute('tabindex', '-1');
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(strings.FOCUSABLE_CHILD_ELEMENTS)).forEach(function (el) {
      return el.setAttribute('tabindex', '-1');
    });
    this.foundation_.layout();
  };
  /**
   * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    var checkboxListItems = this.root_.querySelectorAll(strings.ARIA_ROLE_CHECKBOX_SELECTOR);
    var singleSelectedListItem = this.root_.querySelector("\n      ." + cssClasses.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + cssClasses.LIST_ITEM_SELECTED_CLASS + "\n    ");
    var radioSelectedListItem = this.root_.querySelector(strings.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root_.querySelectorAll(strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = [].map.call(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (singleSelectedListItem) {
      if (singleSelectedListItem.classList.contains(cssClasses.LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };
  /**
   * Updates the list item at itemIndex to the desired isEnabled state.
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCList.prototype.setEnabled = function (itemIndex, isEnabled) {
    this.foundation_.setEnabled(itemIndex, isEnabled);
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function addClassForElementIndex(index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function getAttributeForElementIndex(index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function getFocusedElementIndex() {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function getListItemCount() {
        return _this.listElements.length;
      },
      hasCheckboxAtIndex: function hasCheckboxAtIndex(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function hasRadioAtIndex(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex(index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function isFocusInsideList() {
        return _this.root_.contains(document.activeElement);
      },
      isRootFocused: function isRootFocused() {
        return document.activeElement === _this.root_;
      },
      notifyAction: function notifyAction(index) {
        _this.emit(strings.ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function removeClassForElementIndex(index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      setAttributeForElementIndex: function setAttributeForElementIndex(index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex(index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var listItemChildren = [].slice.call(element.querySelectorAll(strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(function (el) {
          return el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new MDCListFoundation(adapter);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */


  MDCList.prototype.getListItemIndex_ = function (evt) {
    var eventTarget = evt.target;
    var nearestParent = closest(eventTarget, "." + cssClasses.LIST_ITEM_CLASS + ", ." + cssClasses.ROOT); // Get the index of the element if it is a list item.

    if (nearestParent && matches$1(nearestParent, "." + cssClasses.LIST_ITEM_CLASS)) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusInEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusOutEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   */


  MDCList.prototype.handleKeydownEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target;
    this.foundation_.handleKeydown(evt, target.classList.contains(cssClasses.LIST_ITEM_CLASS), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleClickEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    var toggleCheckbox = !matches$1(target, strings.CHECKBOX_RADIO_SELECTOR);
    this.foundation_.handleClick(index, toggleCheckbox);
  };

  return MDCList;
}(MDCComponent);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
  ANIMATE: 'mdc-drawer--animate',
  CLOSING: 'mdc-drawer--closing',
  DISMISSIBLE: 'mdc-drawer--dismissible',
  MODAL: 'mdc-drawer--modal',
  OPEN: 'mdc-drawer--open',
  OPENING: 'mdc-drawer--opening',
  ROOT: 'mdc-drawer'
};
var strings$1 = {
  APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
  CLOSE_EVENT: 'MDCDrawer:closed',
  OPEN_EVENT: 'MDCDrawer:opened',
  SCRIM_SELECTOR: '.mdc-drawer-scrim'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCDismissibleDrawerFoundation =
/** @class */
function (_super) {
  __extends(MDCDismissibleDrawerFoundation, _super);

  function MDCDismissibleDrawerFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCDismissibleDrawerFoundation.defaultAdapter, adapter)) || this;

    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    return _this;
  }

  Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
    get: function get() {
      return strings$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        elementHasClass: function elementHasClass() {
          return false;
        },
        notifyClose: function notifyClose() {
          return undefined;
        },
        notifyOpen: function notifyOpen() {
          return undefined;
        },
        saveFocus: function saveFocus() {
          return undefined;
        },
        restoreFocus: function restoreFocus() {
          return undefined;
        },
        focusActiveNavigationItem: function focusActiveNavigationItem() {
          return undefined;
        },
        trapFocus: function trapFocus() {
          return undefined;
        },
        releaseFocus: function releaseFocus() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCDismissibleDrawerFoundation.prototype.destroy = function () {
    if (this.animationFrame_) {
      cancelAnimationFrame(this.animationFrame_);
    }

    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
    }
  };
  /**
   * Opens the drawer from the closed state.
   */


  MDCDismissibleDrawerFoundation.prototype.open = function () {
    var _this = this;

    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(cssClasses$1.OPEN);
    this.adapter_.addClass(cssClasses$1.ANIMATE); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(function () {
      _this.adapter_.addClass(cssClasses$1.OPENING);
    });
    this.adapter_.saveFocus();
  };
  /**
   * Closes the drawer from the open state.
   */


  MDCDismissibleDrawerFoundation.prototype.close = function () {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(cssClasses$1.CLOSING);
  };
  /**
   * Returns true if the drawer is in the open position.
   * @return true if drawer is in open state.
   */


  MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
    return this.adapter_.hasClass(cssClasses$1.OPEN);
  };
  /**
   * Returns true if the drawer is animating open.
   * @return true if drawer is animating open.
   */


  MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
    return this.adapter_.hasClass(cssClasses$1.OPENING) || this.adapter_.hasClass(cssClasses$1.ANIMATE);
  };
  /**
   * Returns true if the drawer is animating closed.
   * @return true if drawer is animating closed.
   */


  MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
    return this.adapter_.hasClass(cssClasses$1.CLOSING);
  };
  /**
   * Keydown handler to close drawer when key is escape.
   */


  MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key;
    var isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  };
  /**
   * Handles the `transitionend` event when the drawer finishes opening/closing.
   */


  MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
    var OPENING = cssClasses$1.OPENING,
        CLOSING = cssClasses$1.CLOSING,
        OPEN = cssClasses$1.OPEN,
        ANIMATE = cssClasses$1.ANIMATE,
        ROOT = cssClasses$1.ROOT; // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.

    var isRootElement = this.isElement_(evt.target) && this.adapter_.elementHasClass(evt.target, ROOT);

    if (!isRootElement) {
      return;
    }

    if (this.isClosing()) {
      this.adapter_.removeClass(OPEN);
      this.closed_();
      this.adapter_.restoreFocus();
      this.adapter_.notifyClose();
    } else {
      this.adapter_.focusActiveNavigationItem();
      this.opened_();
      this.adapter_.notifyOpen();
    }

    this.adapter_.removeClass(ANIMATE);
    this.adapter_.removeClass(OPENING);
    this.adapter_.removeClass(CLOSING);
  };
  /**
   * Extension point for when drawer finishes open animation.
   */


  MDCDismissibleDrawerFoundation.prototype.opened_ = function () {}; // tslint:disable-line:no-empty

  /**
   * Extension point for when drawer finishes close animation.
   */


  MDCDismissibleDrawerFoundation.prototype.closed_ = function () {}; // tslint:disable-line:no-empty

  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame_ = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function () {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };

  MDCDismissibleDrawerFoundation.prototype.isElement_ = function (element) {
    // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
    return Boolean(element.classList);
  };

  return MDCDismissibleDrawerFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/* istanbul ignore next: subclass is not a branch statement */

var MDCModalDrawerFoundation =
/** @class */
function (_super) {
  __extends(MDCModalDrawerFoundation, _super);

  function MDCModalDrawerFoundation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Handles click event on scrim.
   */


  MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
    this.close();
  };
  /**
   * Called when drawer finishes open animation.
   */


  MDCModalDrawerFoundation.prototype.opened_ = function () {
    this.adapter_.trapFocus();
  };
  /**
   * Called when drawer finishes close animation.
   */


  MDCModalDrawerFoundation.prototype.closed_ = function () {
    this.adapter_.releaseFocus();
  };

  return MDCModalDrawerFoundation;
}(MDCDismissibleDrawerFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$2 = MDCDismissibleDrawerFoundation.cssClasses,
    strings$2 = MDCDismissibleDrawerFoundation.strings;
/**
 * @events `MDCDrawer:closed {}` Emits when the navigation drawer has closed.
 * @events `MDCDrawer:opened {}` Emits when the navigation drawer has opened.
 */

var MDCDrawer =
/** @class */
function (_super) {
  __extends(MDCDrawer, _super);

  function MDCDrawer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCDrawer.attachTo = function (root) {
    return new MDCDrawer(root);
  };

  Object.defineProperty(MDCDrawer.prototype, "open", {
    /**
     * @return boolean Proxies to the foundation's `open`/`close` methods.
     * Also returns true if drawer is in the open position.
     */
    get: function get() {
      return this.foundation_.isOpen();
    },

    /**
     * Toggles the drawer open and closed.
     */
    set: function set(isOpen) {
      if (isOpen) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDrawer.prototype, "list", {
    get: function get() {
      return this.list_;
    },
    enumerable: true,
    configurable: true
  });

  MDCDrawer.prototype.initialize = function (focusTrapFactory, listFactory) {
    if (focusTrapFactory === void 0) {
      focusTrapFactory = focusTrap_1;
    }

    if (listFactory === void 0) {
      listFactory = function listFactory(el) {
        return new MDCList(el);
      };
    }

    var listEl = this.root_.querySelector("." + MDCListFoundation.cssClasses.ROOT);

    if (listEl) {
      this.list_ = listFactory(listEl);
      this.list_.wrapFocus = true;
    }

    this.focusTrapFactory_ = focusTrapFactory;
  };

  MDCDrawer.prototype.initialSyncWithDOM = function () {
    var _this = this;

    var MODAL = cssClasses$2.MODAL;
    var SCRIM_SELECTOR = strings$2.SCRIM_SELECTOR;
    this.scrim_ = this.root_.parentNode.querySelector(SCRIM_SELECTOR);

    if (this.scrim_ && this.root_.classList.contains(MODAL)) {
      this.handleScrimClick_ = function () {
        return _this.foundation_.handleScrimClick();
      };

      this.scrim_.addEventListener('click', this.handleScrimClick_);
      this.focusTrap_ = createFocusTrapInstance(this.root_, this.focusTrapFactory_);
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleTransitionEnd_ = function (evt) {
      return _this.foundation_.handleTransitionEnd(evt);
    };

    this.listen('keydown', this.handleKeydown_);
    this.listen('transitionend', this.handleTransitionEnd_);
  };

  MDCDrawer.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten('transitionend', this.handleTransitionEnd_);

    if (this.list_) {
      this.list_.destroy();
    }

    var MODAL = cssClasses$2.MODAL;

    if (this.scrim_ && this.handleScrimClick_ && this.root_.classList.contains(MODAL)) {
      this.scrim_.removeEventListener('click', this.handleScrimClick_); // Ensure drawer is closed to hide scrim and release focus

      this.open = false;
    }
  };

  MDCDrawer.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      elementHasClass: function elementHasClass(element, className) {
        return element.classList.contains(className);
      },
      saveFocus: function saveFocus() {
        return _this.previousFocus_ = document.activeElement;
      },
      restoreFocus: function restoreFocus() {
        var previousFocus = _this.previousFocus_;

        if (previousFocus && previousFocus.focus && _this.root_.contains(document.activeElement)) {
          previousFocus.focus();
        }
      },
      focusActiveNavigationItem: function focusActiveNavigationItem() {
        var activeNavItemEl = _this.root_.querySelector("." + MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS);

        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: function notifyClose() {
        return _this.emit(strings$2.CLOSE_EVENT, {}, true
        /* shouldBubble */
        );
      },
      notifyOpen: function notifyOpen() {
        return _this.emit(strings$2.OPEN_EVENT, {}, true
        /* shouldBubble */
        );
      },
      trapFocus: function trapFocus() {
        return _this.focusTrap_.activate();
      },
      releaseFocus: function releaseFocus() {
        return _this.focusTrap_.deactivate();
      }
    }; // tslint:enable:object-literal-sort-keys

    var DISMISSIBLE = cssClasses$2.DISMISSIBLE,
        MODAL = cssClasses$2.MODAL;

    if (this.root_.classList.contains(DISMISSIBLE)) {
      return new MDCDismissibleDrawerFoundation(adapter);
    } else if (this.root_.classList.contains(MODAL)) {
      return new MDCModalDrawerFoundation(adapter);
    } else {
      throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + DISMISSIBLE + " and " + MODAL + ".");
    }
  };

  return MDCDrawer;
}(MDCComponent);

function forwardEventsBuilder(component) {
  var additionalEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var events = ['focus', 'blur', 'fullscreenchange', 'fullscreenerror', 'scroll', 'cut', 'copy', 'paste', 'keydown', 'keypress', 'keyup', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel', 'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture'].concat(_toConsumableArray(additionalEvents));

  function forward(e) {
    bubble(component, e);
  }

  return function (node) {
    var destructors = [];

    for (var i = 0; i < events.length; i++) {
      destructors.push(listen(node, events[i], forward));
    }

    return {
      destroy: function destroy() {
        for (var _i = 0; _i < destructors.length; _i++) {
          destructors[_i]();
        }
      }
    };
  };
}

function exclude(obj, keys) {
  var names = Object.getOwnPropertyNames(obj);
  var newObj = {};

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var cashIndex = name.indexOf('$');

    if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
      continue;
    }

    if (keys.indexOf(name) !== -1) {
      continue;
    }

    newObj[name] = obj[name];
  }

  return newObj;
}

function useActions(node, actions) {
  var objects = [];

  if (actions) {
    for (var i = 0; i < actions.length; i++) {
      var isArray = Array.isArray(actions[i]);
      var action = isArray ? actions[i][0] : actions[i];

      if (isArray && actions[i].length > 1) {
        objects.push(action(node, actions[i][1]));
      } else {
        objects.push(action(node));
      }
    }
  }

  return {
    update: function update(actions) {
      if ((actions && actions.length || 0) != objects.length) {
        throw new Error('You must not change the length of an actions array.');
      }

      if (actions) {
        for (var _i = 0; _i < actions.length; _i++) {
          if (objects[_i] && 'update' in objects[_i]) {
            var _isArray = Array.isArray(actions[_i]);

            if (_isArray && actions[_i].length > 1) {
              objects[_i].update(actions[_i][1]);
            } else {
              objects[_i].update();
            }
          }
        }
      }
    },
    destroy: function destroy() {
      for (var _i2 = 0; _i2 < objects.length; _i2++) {
        if (objects[_i2] && 'destroy' in objects[_i2]) {
          objects[_i2].destroy();
        }
      }
    }
  };
}

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "node_modules/@smui/drawer/Drawer.svelte";

function create_fragment(ctx) {
  var aside;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[14].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[13], null);
  var aside_levels = [{
    class: "\n    mdc-drawer\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*variant*/
    ctx[2] === "dismissible" ? "mdc-drawer--dismissible" : "") + "\n    " + (
    /*variant*/
    ctx[2] === "modal" ? "mdc-drawer--modal" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[6], ["use", "class", "variant", "open"])];
  var aside_data = {};

  for (var i = 0; i < aside_levels.length; i += 1) {
    aside_data = assign(aside_data, aside_levels[i]);
  }

  var block = {
    c: function create() {
      aside = element("aside");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      aside = claim_element(nodes, "ASIDE", {
        class: true
      });
      var aside_nodes = children(aside);
      if (default_slot) default_slot.l(aside_nodes);
      aside_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(aside, aside_data);
      add_location(aside, file, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, aside, anchor);

      if (default_slot) {
        default_slot.m(aside, null);
      }
      /*aside_binding*/


      ctx[15](aside);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, aside,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[4].call(null, aside)), listen_dev(aside, "MDCDrawer:opened",
      /*updateOpen*/
      ctx[5], false, false, false), listen_dev(aside, "MDCDrawer:closed",
      /*updateOpen*/
      ctx[5], false, false, false)];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8192) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[13], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[13], dirty, null));
        }
      }

      set_attributes(aside, get_spread_update(aside_levels, [dirty &
      /*className, variant*/
      6 && {
        class: "\n    mdc-drawer\n    " +
        /*className*/
        ctx[1] + "\n    " + (
        /*variant*/
        ctx[2] === "dismissible" ? "mdc-drawer--dismissible" : "") + "\n    " + (
        /*variant*/
        ctx[2] === "modal" ? "mdc-drawer--modal" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      64 && exclude(
      /*$$props*/
      ctx[6], ["use", "class", "variant", "open"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(aside);
      if (default_slot) default_slot.d(detaching);
      /*aside_binding*/

      ctx[15](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCDrawer:opened", "MDCDrawer:closed"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$variant = _$$props3.variant,
      variant = _$$props3$variant === void 0 ? null : _$$props3$variant;
  var _$$props4 = $$props,
      _$$props4$open = _$$props4.open,
      open = _$$props4$open === void 0 ? false : _$$props4$open;
  var element;
  var drawer;
  var listPromiseResolve;
  var listPromise = new Promise(function (resolve) {
    return listPromiseResolve = resolve;
  });
  setContext("SMUI:list:nav", true);
  setContext("SMUI:list:item:nav", true);

  if (variant === "dismissible" || variant === "modal") {
    setContext("SMUI:list:instantiate", false);
    setContext("SMUI:list:getInstance", getListInstancePromise);
  }

  onMount(function () {
    if (variant === "dismissible" || variant === "modal") {
      $$invalidate(9, drawer = new MDCDrawer(element));
      listPromiseResolve(drawer.list_);
    }
  });
  onDestroy(function () {
    drawer && drawer.destroy();
  });
  afterUpdate(function () {
    if (drawer && !(variant === "dismissible" || variant === "modal")) {
      drawer.destroy();
      $$invalidate(9, drawer = undefined);
    } else if (!drawer && (variant === "dismissible" || variant === "modal")) {
      $$invalidate(9, drawer = new MDCDrawer(element));
      listPromiseResolve(drawer.list_);
    }
  });

  function getListInstancePromise() {
    return listPromise;
  }

  function updateOpen() {
    $$invalidate(7, open = drawer.open);
  }

  function setOpen(value) {
    $$invalidate(7, open = value);
  }

  var _$$props5 = $$props,
      _$$props5$$$slots = _$$props5.$$slots,
      $$slots = _$$props5$$$slots === void 0 ? {} : _$$props5$$$slots,
      $$scope = _$$props5.$$scope;
  validate_slots("Drawer", $$slots, ['default']);

  function aside_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(3, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("variant" in $$new_props) $$invalidate(2, variant = $$new_props.variant);
    if ("open" in $$new_props) $$invalidate(7, open = $$new_props.open);
    if ("$$scope" in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCDrawer: MDCDrawer,
      onMount: onMount,
      onDestroy: onDestroy,
      afterUpdate: afterUpdate,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      variant: variant,
      open: open,
      element: element,
      drawer: drawer,
      listPromiseResolve: listPromiseResolve,
      listPromise: listPromise,
      getListInstancePromise: getListInstancePromise,
      updateOpen: updateOpen,
      setOpen: setOpen
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("variant" in $$props) $$invalidate(2, variant = $$new_props.variant);
    if ("open" in $$props) $$invalidate(7, open = $$new_props.open);
    if ("element" in $$props) $$invalidate(3, element = $$new_props.element);
    if ("drawer" in $$props) $$invalidate(9, drawer = $$new_props.drawer);
    if ("listPromiseResolve" in $$props) listPromiseResolve = $$new_props.listPromiseResolve;
    if ("listPromise" in $$props) listPromise = $$new_props.listPromise;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*drawer, open*/
    640) {
       if (drawer && drawer.open !== open) {
        $$invalidate(9, drawer.open = open, drawer);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, variant, element, forwardEvents, updateOpen, $$props, open, setOpen, drawer, listPromiseResolve, listPromise, getListInstancePromise, $$scope, $$slots, aside_binding];
}

var Drawer = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Drawer, _SvelteComponentDev);

  var _super = _createSuper$1(Drawer);

  function Drawer(options) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      use: 0,
      class: 1,
      variant: 2,
      open: 7,
      setOpen: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Drawer",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(Drawer, [{
    key: "use",
    get: function get() {
      throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "variant",
    get: function get() {
      throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setOpen",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Drawer;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot(ctx) {
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[8].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[9], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        512) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[9], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[9], dirty, null));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(1:0) <svelte:component   this={component}   use={[forwardEvents, ...use]}   class=\\\"{smuiClass} {className}\\\"   {...exclude($$props, ['use', 'class', 'component', 'forwardEvents'])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [{
    use: [
    /*forwardEvents*/
    ctx[4]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    class: "" + (
    /*smuiClass*/
    ctx[3] + " " +
    /*className*/
    ctx[1])
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class", "component", "forwardEvents"])];
  var switch_value =
  /*component*/
  ctx[2];

  function switch_props(ctx) {
    var switch_instance_props = {
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    };

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props(ctx));
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = dirty &
      /*forwardEvents, use, smuiClass, className, exclude, $$props*/
      59 ? get_spread_update(switch_instance_spread_levels, [dirty &
      /*forwardEvents, use*/
      17 && {
        use: [
        /*forwardEvents*/
        ctx[4]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty &
      /*smuiClass, className*/
      10 && {
        class: "" + (
        /*smuiClass*/
        ctx[3] + " " +
        /*className*/
        ctx[1])
      }, dirty &
      /*exclude, $$props*/
      32 && get_spread_object(exclude(
      /*$$props*/
      ctx[5], ["use", "class", "component", "forwardEvents"]))]) : {};

      if (dirty &
      /*$$scope*/
      512) {
        switch_instance_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (switch_value !== (switch_value =
      /*component*/
      ctx[2])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var internals = {
  component: null,
  smuiClass: null,
  contexts: {}
};

function instance$1($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$component = _$$props3.component,
      component = _$$props3$component === void 0 ? internals.component : _$$props3$component;
  var _$$props4 = $$props,
      _$$props4$forwardEven = _$$props4.forwardEvents,
      smuiForwardEvents = _$$props4$forwardEven === void 0 ? [] : _$$props4$forwardEven;
  var smuiClass = internals.class;
  var contexts = internals.contexts;
  var forwardEvents = forwardEventsBuilder(get_current_component(), smuiForwardEvents);

  for (var context in contexts) {
    if (contexts.hasOwnProperty(context)) {
      setContext(context, contexts[context]);
    }
  }

  var _$$props5 = $$props,
      _$$props5$$$slots = _$$props5.$$slots,
      $$slots = _$$props5$$$slots === void 0 ? {} : _$$props5$$$slots,
      $$scope = _$$props5.$$scope;
  validate_slots("ClassAdder", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("component" in $$new_props) $$invalidate(2, component = $$new_props.component);
    if ("forwardEvents" in $$new_props) $$invalidate(6, smuiForwardEvents = $$new_props.forwardEvents);
    if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      internals: internals,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      use: use,
      className: className,
      component: component,
      smuiForwardEvents: smuiForwardEvents,
      smuiClass: smuiClass,
      contexts: contexts,
      forwardEvents: forwardEvents
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("component" in $$props) $$invalidate(2, component = $$new_props.component);
    if ("smuiForwardEvents" in $$props) $$invalidate(6, smuiForwardEvents = $$new_props.smuiForwardEvents);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, component, smuiClass, forwardEvents, $$props, smuiForwardEvents, contexts, $$slots, $$scope];
}

var ClassAdder = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ClassAdder, _SvelteComponentDev);

  var _super = _createSuper$2(ClassAdder);

  function ClassAdder(options) {
    var _this;

    _classCallCheck(this, ClassAdder);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      use: 0,
      class: 1,
      component: 2,
      forwardEvents: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ClassAdder",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(ClassAdder, [{
    key: "use",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "component",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "forwardEvents",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ClassAdder;
}(SvelteComponentDev);

function classAdderBuilder(props) {
  function Component() {
    Object.assign(internals, props);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(ClassAdder, args);
  }

  Component.prototype = ClassAdder; // SSR support

  if (ClassAdder.$$render) {
    Component.$$render = function () {
      return Object.assign(internals, props) && ClassAdder.$$render.apply(ClassAdder, arguments);
    };
  }

  if (ClassAdder.render) {
    Component.render = function () {
      return Object.assign(internals, props) && ClassAdder.render.apply(ClassAdder, arguments);
    };
  }

  return Component;
}

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "node_modules/@smui/common/Div.svelte";

function create_fragment$2(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var div_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$1, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, div))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("Div", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var Div = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Div, _SvelteComponentDev);

  var _super = _createSuper$3(Div);

  function Div(options) {
    var _this;

    _classCallCheck(this, Div);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Div",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(Div, [{
    key: "use",
    get: function get() {
      throw new Error("<Div>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Div>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Div;
}(SvelteComponentDev);

var AppContent = classAdderBuilder({
  class: 'mdc-drawer-app-content',
  component: Div,
  contexts: {}
});

var Content = classAdderBuilder({
  class: 'mdc-drawer__content',
  component: Div,
  contexts: {}
});

var Header = classAdderBuilder({
  class: 'mdc-drawer__header',
  component: Div,
  contexts: {}
});

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "node_modules/@smui/common/H1.svelte";

function create_fragment$3(ctx) {
  var h1;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var h1_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var h1_data = {};

  for (var i = 0; i < h1_levels.length; i += 1) {
    h1_data = assign(h1_data, h1_levels[i]);
  }

  var block = {
    c: function create() {
      h1 = element("h1");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      if (default_slot) default_slot.l(h1_nodes);
      h1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(h1, h1_data);
      add_location(h1, file$2, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, h1, anchor);

      if (default_slot) {
        default_slot.m(h1, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, h1,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, h1))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(h1, get_spread_update(h1_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h1);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("H1", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var H1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(H1, _SvelteComponentDev);

  var _super = _createSuper$4(H1);

  function H1(options) {
    var _this;

    _classCallCheck(this, H1);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "H1",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(H1, [{
    key: "use",
    get: function get() {
      throw new Error("<H1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<H1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return H1;
}(SvelteComponentDev);

var Title = classAdderBuilder({
  class: 'mdc-drawer__title',
  component: H1,
  contexts: {}
});

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "node_modules/@smui/common/H2.svelte";

function create_fragment$4(ctx) {
  var h2;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var h2_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var h2_data = {};

  for (var i = 0; i < h2_levels.length; i += 1) {
    h2_data = assign(h2_data, h2_levels[i]);
  }

  var block = {
    c: function create() {
      h2 = element("h2");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      if (default_slot) default_slot.l(h2_nodes);
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(h2, h2_data);
      add_location(h2, file$3, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, h2, anchor);

      if (default_slot) {
        default_slot.m(h2, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, h2,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, h2))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(h2, get_spread_update(h2_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("H2", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var H2 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(H2, _SvelteComponentDev);

  var _super = _createSuper$5(H2);

  function H2(options) {
    var _this;

    _classCallCheck(this, H2);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "H2",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  _createClass(H2, [{
    key: "use",
    get: function get() {
      throw new Error("<H2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<H2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return H2;
}(SvelteComponentDev);

var Subtitle = classAdderBuilder({
  class: 'mdc-drawer__subtitle',
  component: H2,
  contexts: {}
});

var Scrim = classAdderBuilder({
  class: 'mdc-drawer-scrim',
  component: Div,
  contexts: {}
});

var css_248z$1 = "body{background-color:#000;color:#fff}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-menu{min-width:112px}.mdc-menu .mdc-list,.mdc-menu .mdc-list-item__graphic,.mdc-menu .mdc-list-item__meta{color:hsla(0,0%,100%,.87)}.mdc-menu .mdc-list-divider{margin:8px 0}.mdc-menu .mdc-list-item{user-select:none}.mdc-menu .mdc-list-item--disabled{cursor:auto}@media screen and (-ms-high-contrast:active){.mdc-menu .mdc-list-item--disabled{opacity:.38}}.mdc-menu a.mdc-list-item .mdc-list-item__graphic,.mdc-menu a.mdc-list-item .mdc-list-item__text{pointer-events:none}.mdc-menu__selection-group{padding:0;fill:currentColor}.mdc-menu__selection-group .mdc-list-item{padding-left:56px;padding-right:16px}.mdc-menu__selection-group .mdc-list-item[dir=rtl],[dir=rtl] .mdc-menu__selection-group .mdc-list-item{padding-left:16px;padding-right:56px}.mdc-menu__selection-group .mdc-menu__selection-group-icon{left:16px;right:auto;display:none;position:absolute;top:50%;transform:translateY(-50%)}.mdc-menu__selection-group .mdc-menu__selection-group-icon[dir=rtl],[dir=rtl] .mdc-menu__selection-group .mdc-menu__selection-group-icon{left:auto;right:16px}.mdc-menu-item--selected .mdc-menu__selection-group-icon{display:inline}.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);background-color:#121212;background-color:var(--mdc-theme-surface,#121212);color:#fff;color:var(--mdc-theme-on-surface,#fff);border-radius:4px;transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity 75ms linear}.mdc-menu-surface[dir=rtl],[dir=rtl] .mdc-menu-surface{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.smui-menu-surface--static{position:static;z-index:0;display:inline-block;transform:scale(1);opacity:1}";
styleInject(css_248z$1);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$3 = {
  ANCHOR: 'mdc-menu-surface--anchor',
  ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
  ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
  FIXED: 'mdc-menu-surface--fixed',
  OPEN: 'mdc-menu-surface--open',
  ROOT: 'mdc-menu-surface'
}; // tslint:disable:object-literal-sort-keys

var strings$3 = {
  CLOSED_EVENT: 'MDCMenuSurface:closed',
  OPENED_EVENT: 'MDCMenuSurface:opened',
  FOCUSABLE_ELEMENTS: ['button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)', 'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(', ')
}; // tslint:enable:object-literal-sort-keys

var numbers$1 = {
  /** Total duration of menu-surface open animation. */
  TRANSITION_OPEN_DURATION: 120,

  /** Total duration of menu-surface close animation. */
  TRANSITION_CLOSE_DURATION: 75,

  /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. */
  MARGIN_TO_EDGE: 32,

  /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
  ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 */

var CornerBit;

(function (CornerBit) {
  CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
  CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
  CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
  CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit || (CornerBit = {}));
/**
 * Enum for representing an element corner for positioning the menu-surface.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 */


var Corner;

(function (Corner) {
  Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
  Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
  Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
  Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
  Corner[Corner["TOP_START"] = 8] = "TOP_START";
  Corner[Corner["TOP_END"] = 12] = "TOP_END";
  Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
  Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner || (Corner = {}));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenuSurfaceFoundation =
/** @class */
function (_super) {
  __extends(MDCMenuSurfaceFoundation, _super);

  function MDCMenuSurfaceFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCMenuSurfaceFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.isQuickOpen_ = false;
    _this.isHoistedElement_ = false;
    _this.isFixedPosition_ = false;
    _this.openAnimationEndTimerId_ = 0;
    _this.closeAnimationEndTimerId_ = 0;
    _this.animationRequestId_ = 0;
    _this.anchorCorner_ = Corner.TOP_START;
    _this.anchorMargin_ = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    _this.position_ = {
      x: 0,
      y: 0
    };
    return _this;
  }

  Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
    get: function get() {
      return strings$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
    get: function get() {
      return numbers$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
    get: function get() {
      return Corner;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        hasAnchor: function hasAnchor() {
          return false;
        },
        isElementInContainer: function isElementInContainer() {
          return false;
        },
        isFocused: function isFocused() {
          return false;
        },
        isRtl: function isRtl() {
          return false;
        },
        getInnerDimensions: function getInnerDimensions() {
          return {
            height: 0,
            width: 0
          };
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return null;
        },
        getWindowDimensions: function getWindowDimensions() {
          return {
            height: 0,
            width: 0
          };
        },
        getBodyDimensions: function getBodyDimensions() {
          return {
            height: 0,
            width: 0
          };
        },
        getWindowScroll: function getWindowScroll() {
          return {
            x: 0,
            y: 0
          };
        },
        setPosition: function setPosition() {
          return undefined;
        },
        setMaxHeight: function setMaxHeight() {
          return undefined;
        },
        setTransformOrigin: function setTransformOrigin() {
          return undefined;
        },
        saveFocus: function saveFocus() {
          return undefined;
        },
        restoreFocus: function restoreFocus() {
          return undefined;
        },
        notifyClose: function notifyClose() {
          return undefined;
        },
        notifyOpen: function notifyOpen() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuSurfaceFoundation.prototype.init = function () {
    var _a = MDCMenuSurfaceFoundation.cssClasses,
        ROOT = _a.ROOT,
        OPEN = _a.OPEN;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(ROOT + " class required in root element.");
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }
  };

  MDCMenuSurfaceFoundation.prototype.destroy = function () {
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_); // Cancel any currently running animations.

    cancelAnimationFrame(this.animationRequestId_);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu surface corner.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
    this.anchorCorner_ = corner;
  };
  /**
   * @param margin Set of margin values from anchor.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
    this.anchorMargin_.top = margin.top || 0;
    this.anchorMargin_.right = margin.right || 0;
    this.anchorMargin_.bottom = margin.bottom || 0;
    this.anchorMargin_.left = margin.left || 0;
  };
  /** Used to indicate if the menu-surface is hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
    this.isHoistedElement_ = isHoisted;
  };
  /** Used to set the menu-surface calculations based on a fixed position menu. */


  MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
    this.isFixedPosition_ = isFixedPosition;
  };
  /** Sets the menu-surface position on the page. */


  MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
    this.position_.x = this.isFinite_(x) ? x : 0;
    this.position_.y = this.isFinite_(y) ? y : 0;
  };

  MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
    this.isQuickOpen_ = quickOpen;
  };

  MDCMenuSurfaceFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };
  /**
   * Open the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.open = function () {
    var _this = this;

    this.adapter_.saveFocus();

    if (!this.isQuickOpen_) {
      this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
    }

    this.animationRequestId_ = requestAnimationFrame(function () {
      _this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      _this.dimensions_ = _this.adapter_.getInnerDimensions();

      _this.autoPosition_();

      if (_this.isQuickOpen_) {
        _this.adapter_.notifyOpen();
      } else {
        _this.openAnimationEndTimerId_ = setTimeout(function () {
          _this.openAnimationEndTimerId_ = 0;

          _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);

          _this.adapter_.notifyOpen();
        }, numbers$1.TRANSITION_OPEN_DURATION);
      }
    });
    this.isOpen_ = true;
  };
  /**
   * Closes the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.close = function (skipRestoreFocus) {
    var _this = this;

    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }

    if (!this.isQuickOpen_) {
      this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
    }

    requestAnimationFrame(function () {
      _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      if (_this.isQuickOpen_) {
        _this.adapter_.notifyClose();
      } else {
        _this.closeAnimationEndTimerId_ = setTimeout(function () {
          _this.closeAnimationEndTimerId_ = 0;

          _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);

          _this.adapter_.notifyClose();
        }, numbers$1.TRANSITION_CLOSE_DURATION);
      }
    });
    this.isOpen_ = false;

    if (!skipRestoreFocus) {
      this.maybeRestoreFocus_();
    }
  };
  /** Handle clicks and close if not within menu-surface element. */


  MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
    var el = evt.target;

    if (this.adapter_.isElementInContainer(el)) {
      return;
    }

    this.close();
  };
  /** Handle keys that close the surface. */


  MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key;
    var isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  };

  MDCMenuSurfaceFoundation.prototype.autoPosition_ = function () {
    var _a; // Compute measurements for autoposition methods reuse.


    this.measurements_ = this.getAutoLayoutMeasurements_();
    var corner = this.getOriginCorner_();
    var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
    var verticalAlignment = this.hasBit_(corner, CornerBit.BOTTOM) ? 'bottom' : 'top';
    var horizontalAlignment = this.hasBit_(corner, CornerBit.RIGHT) ? 'right' : 'left';
    var horizontalOffset = this.getHorizontalOriginOffset_(corner);
    var verticalOffset = this.getVerticalOriginOffset_(corner);
    var _b = this.measurements_,
        anchorSize = _b.anchorSize,
        surfaceSize = _b.surfaceSize;
    var position = (_a = {}, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, _a); // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.

    if (anchorSize.width / surfaceSize.width > numbers$1.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    } // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element


    if (this.isHoistedElement_ || this.isFixedPosition_) {
      this.adjustPositionForHoistedElement_(position);
    }

    this.adapter_.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
    this.adapter_.setPosition(position);
    this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
  };
  /**
   * @return Measurements used to position menu surface popup.
   */


  MDCMenuSurfaceFoundation.prototype.getAutoLayoutMeasurements_ = function () {
    var anchorRect = this.adapter_.getAnchorDimensions();
    var bodySize = this.adapter_.getBodyDimensions();
    var viewportSize = this.adapter_.getWindowDimensions();
    var windowScroll = this.adapter_.getWindowScroll();

    if (!anchorRect) {
      // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
      anchorRect = {
        top: this.position_.y,
        right: this.position_.x,
        bottom: this.position_.y,
        left: this.position_.x,
        width: 0,
        height: 0
      }; // tslint:enable:object-literal-sort-keys
    }

    return {
      anchorSize: anchorRect,
      bodySize: bodySize,
      surfaceSize: this.dimensions_,
      viewportDistance: {
        // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
        top: anchorRect.top,
        right: viewportSize.width - anchorRect.right,
        bottom: viewportSize.height - anchorRect.bottom,
        left: anchorRect.left
      },
      viewportSize: viewportSize,
      windowScroll: windowScroll
    };
  };
  /**
   * Computes the corner of the anchor from which to animate and position the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.getOriginCorner_ = function () {
    // Defaults: open from the top left.
    var corner = Corner.TOP_LEFT;
    var _a = this.measurements_,
        viewportDistance = _a.viewportDistance,
        anchorSize = _a.anchorSize,
        surfaceSize = _a.surfaceSize;
    var isBottomAligned = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
    var availableTop = isBottomAligned ? viewportDistance.top + anchorSize.height + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
    var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorSize.height - this.anchorMargin_.top;
    var topOverflow = surfaceSize.height - availableTop;
    var bottomOverflow = surfaceSize.height - availableBottom;

    if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
      corner = this.setBit_(corner, CornerBit.BOTTOM);
    }

    var isRtl = this.adapter_.isRtl();
    var isFlipRtl = this.hasBit_(this.anchorCorner_, CornerBit.FLIP_RTL);
    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.RIGHT);
    var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
    var availableLeft = isAlignedRight ? viewportDistance.left + anchorSize.width + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
    var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorSize.width - this.anchorMargin_.left;
    var leftOverflow = surfaceSize.width - availableLeft;
    var rightOverflow = surfaceSize.width - availableRight;

    if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
      corner = this.setBit_(corner, CornerBit.RIGHT);
    }

    return corner;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
   */


  MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight_ = function (corner) {
    var viewportDistance = this.measurements_.viewportDistance;
    var maxHeight = 0;
    var isBottomAligned = this.hasBit_(corner, CornerBit.BOTTOM);
    var isBottomAnchored = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE; // When maximum height is not specified, it is handled from CSS.

    if (isBottomAligned) {
      maxHeight = viewportDistance.top + this.anchorMargin_.top - MARGIN_TO_EDGE;

      if (!isBottomAnchored) {
        maxHeight += this.measurements_.anchorSize.height;
      }
    } else {
      maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom + this.measurements_.anchorSize.height - MARGIN_TO_EDGE;

      if (isBottomAnchored) {
        maxHeight -= this.measurements_.anchorSize.height;
      }
    }

    return maxHeight;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset_ = function (corner) {
    var anchorSize = this.measurements_.anchorSize; // isRightAligned corresponds to using the 'right' property on the surface.

    var isRightAligned = this.hasBit_(corner, CornerBit.RIGHT);
    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.RIGHT);

    if (isRightAligned) {
      var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.left : this.anchorMargin_.right; // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
      // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
      // the right property is correct.

      if (this.isHoistedElement_ || this.isFixedPosition_) {
        return rightOffset - (this.measurements_.viewportSize.width - this.measurements_.bodySize.width);
      }

      return rightOffset;
    }

    return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.right : this.anchorMargin_.left;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset_ = function (corner) {
    var anchorSize = this.measurements_.anchorSize;
    var isBottomAligned = this.hasBit_(corner, CornerBit.BOTTOM);
    var avoidVerticalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
    var y = 0;

    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin_.top : -this.anchorMargin_.bottom;
    } else {
      y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin_.bottom : this.anchorMargin_.top;
    }

    return y;
  };
  /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement_ = function (position) {
    var e_1, _a;

    var _b = this.measurements_,
        windowScroll = _b.windowScroll,
        viewportDistance = _b.viewportDistance;
    var props = Object.keys(position);

    try {
      for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        var value = position[prop] || 0; // Hoisted surfaces need to have the anchor elements location on the page added to the
        // position properties for proper alignment on the body.

        value += viewportDistance[prop]; // Surfaces that are absolutely positioned need to have additional calculations for scroll
        // and bottom positioning.

        if (!this.isFixedPosition_) {
          if (prop === 'top') {
            value += windowScroll.y;
          } else if (prop === 'bottom') {
            value -= windowScroll.y;
          } else if (prop === 'left') {
            value += windowScroll.x;
          } else {
            // prop === 'right'
            value -= windowScroll.x;
          }
        }

        position[prop] = value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /**
   * The last focused element when the menu surface was opened should regain focus, if the user is
   * focused on or within the menu surface when it is closed.
   */


  MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus_ = function () {
    var isRootFocused = this.adapter_.isFocused();
    var childHasFocus = document.activeElement && this.adapter_.isElementInContainer(document.activeElement);

    if (isRootFocused || childHasFocus) {
      this.adapter_.restoreFocus();
    }
  };

  MDCMenuSurfaceFoundation.prototype.hasBit_ = function (corner, bit) {
    return Boolean(corner & bit); // tslint:disable-line:no-bitwise
  };

  MDCMenuSurfaceFoundation.prototype.setBit_ = function (corner, bit) {
    return corner | bit; // tslint:disable-line:no-bitwise
  };
  /**
   * isFinite that doesn't force conversion to number type.
   * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
   */


  MDCMenuSurfaceFoundation.prototype.isFinite_ = function (num) {
    return typeof num === 'number' && isFinite(num);
  };

  return MDCMenuSurfaceFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cachedCssTransformPropertyName_;
/**
 * Returns the name of the correct transform property to use on the current browser.
 */

function getTransformPropertyName(globalObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (cachedCssTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    cachedCssTransformPropertyName_ = 'transform' in el.style ? 'transform' : 'webkitTransform';
  }

  return cachedCssTransformPropertyName_;
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenuSurface =
/** @class */
function (_super) {
  __extends(MDCMenuSurface, _super);

  function MDCMenuSurface() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenuSurface.attachTo = function (root) {
    return new MDCMenuSurface(root);
  };

  MDCMenuSurface.prototype.initialSyncWithDOM = function () {
    var _this = this;

    var parentEl = this.root_.parentElement;
    this.anchorElement = parentEl && parentEl.classList.contains(cssClasses$3.ANCHOR) ? parentEl : null;

    if (this.root_.classList.contains(cssClasses$3.FIXED)) {
      this.setFixedPosition(true);
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleBodyClick_ = function (evt) {
      return _this.foundation_.handleBodyClick(evt);
    };

    this.registerBodyClickListener_ = function () {
      return document.body.addEventListener('click', _this.handleBodyClick_);
    };

    this.deregisterBodyClickListener_ = function () {
      return document.body.removeEventListener('click', _this.handleBodyClick_);
    };

    this.listen('keydown', this.handleKeydown_);
    this.listen(strings$3.OPENED_EVENT, this.registerBodyClickListener_);
    this.listen(strings$3.CLOSED_EVENT, this.deregisterBodyClickListener_);
  };

  MDCMenuSurface.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(strings$3.OPENED_EVENT, this.registerBodyClickListener_);
    this.unlisten(strings$3.CLOSED_EVENT, this.deregisterBodyClickListener_);

    _super.prototype.destroy.call(this);
  };

  MDCMenuSurface.prototype.isOpen = function () {
    return this.foundation_.isOpen();
  };

  MDCMenuSurface.prototype.open = function () {
    this.foundation_.open();
  };

  MDCMenuSurface.prototype.close = function (skipRestoreFocus) {
    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }

    this.foundation_.close(skipRestoreFocus);
  };

  Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
    set: function set(quickOpen) {
      this.foundation_.setQuickOpen(quickOpen);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Removes the menu-surface from it's current location and appends it to the
   * body to overcome any overflow:hidden issues.
   */

  MDCMenuSurface.prototype.hoistMenuToBody = function () {
    document.body.appendChild(this.root_);
    this.setIsHoisted(true);
  };
  /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */


  MDCMenuSurface.prototype.setIsHoisted = function (isHoisted) {
    this.foundation_.setIsHoisted(isHoisted);
  };
  /** Sets the element that the menu-surface is anchored to. */


  MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function (element) {
    this.anchorElement = element;
  };
  /** Sets the menu-surface to position: fixed. */


  MDCMenuSurface.prototype.setFixedPosition = function (isFixed) {
    if (isFixed) {
      this.root_.classList.add(cssClasses$3.FIXED);
    } else {
      this.root_.classList.remove(cssClasses$3.FIXED);
    }

    this.foundation_.setFixedPosition(isFixed);
  };
  /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */


  MDCMenuSurface.prototype.setAbsolutePosition = function (x, y) {
    this.foundation_.setAbsolutePosition(x, y);
    this.setIsHoisted(true);
  };
  /**
   * @param corner Default anchor corner alignment of top-left surface corner.
   */


  MDCMenuSurface.prototype.setAnchorCorner = function (corner) {
    this.foundation_.setAnchorCorner(corner);
  };

  MDCMenuSurface.prototype.setAnchorMargin = function (margin) {
    this.foundation_.setAnchorMargin(margin);
  };

  MDCMenuSurface.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      hasAnchor: function hasAnchor() {
        return !!_this.anchorElement;
      },
      notifyClose: function notifyClose() {
        return _this.emit(MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {});
      },
      notifyOpen: function notifyOpen() {
        return _this.emit(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {});
      },
      isElementInContainer: function isElementInContainer(el) {
        return _this.root_.contains(el);
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this.root_).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: function setTransformOrigin(origin) {
        var propertyName = getTransformPropertyName(window) + "-origin";

        _this.root_.style.setProperty(propertyName, origin);
      },
      isFocused: function isFocused() {
        return document.activeElement === _this.root_;
      },
      saveFocus: function saveFocus() {
        _this.previousFocus_ = document.activeElement;
      },
      restoreFocus: function restoreFocus() {
        if (_this.root_.contains(document.activeElement)) {
          if (_this.previousFocus_ && _this.previousFocus_.focus) {
            _this.previousFocus_.focus();
          }
        }
      },
      getInnerDimensions: function getInnerDimensions() {
        return {
          width: _this.root_.offsetWidth,
          height: _this.root_.offsetHeight
        };
      },
      getAnchorDimensions: function getAnchorDimensions() {
        return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null;
      },
      getWindowDimensions: function getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getBodyDimensions: function getBodyDimensions() {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: function getWindowScroll() {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      setPosition: function setPosition(position) {
        _this.root_.style.left = 'left' in position ? position.left + "px" : '';
        _this.root_.style.right = 'right' in position ? position.right + "px" : '';
        _this.root_.style.top = 'top' in position ? position.top + "px" : '';
        _this.root_.style.bottom = 'bottom' in position ? position.bottom + "px" : '';
      },
      setMaxHeight: function setMaxHeight(height) {
        _this.root_.style.maxHeight = height;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCMenuSurfaceFoundation(adapter);
  };

  return MDCMenuSurface;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$4 = {
  MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
  MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
  ROOT: 'mdc-menu'
};
var strings$4 = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_DISABLED_ATTR: 'aria-disabled',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  LIST_SELECTOR: '.mdc-list',
  SELECTED_EVENT: 'MDCMenu:selected'
};
var numbers$2 = {
  FOCUS_ROOT_INDEX: -1
};
var DefaultFocusState;

(function (DefaultFocusState) {
  DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
  DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
  DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
  DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
})(DefaultFocusState || (DefaultFocusState = {}));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenuFoundation =
/** @class */
function (_super) {
  __extends(MDCMenuFoundation, _super);

  function MDCMenuFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCMenuFoundation.defaultAdapter, adapter)) || this;

    _this.closeAnimationEndTimerId_ = 0;
    _this.defaultFocusState_ = DefaultFocusState.LIST_ROOT;
    return _this;
  }

  Object.defineProperty(MDCMenuFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "strings", {
    get: function get() {
      return strings$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "numbers", {
    get: function get() {
      return numbers$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClassToElementAtIndex: function addClassToElementAtIndex() {
          return undefined;
        },
        removeClassFromElementAtIndex: function removeClassFromElementAtIndex() {
          return undefined;
        },
        addAttributeToElementAtIndex: function addAttributeToElementAtIndex() {
          return undefined;
        },
        removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex() {
          return undefined;
        },
        elementContainsClass: function elementContainsClass() {
          return false;
        },
        closeSurface: function closeSurface() {
          return undefined;
        },
        getElementIndex: function getElementIndex() {
          return -1;
        },
        notifySelected: function notifySelected() {
          return undefined;
        },
        getMenuItemCount: function getMenuItemCount() {
          return 0;
        },
        focusItemAtIndex: function focusItemAtIndex() {
          return undefined;
        },
        focusListRoot: function focusListRoot() {
          return undefined;
        },
        getSelectedSiblingOfItemAtIndex: function getSelectedSiblingOfItemAtIndex() {
          return -1;
        },
        isSelectableItemAtIndex: function isSelectableItemAtIndex() {
          return false;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuFoundation.prototype.destroy = function () {
    if (this.closeAnimationEndTimerId_) {
      clearTimeout(this.closeAnimationEndTimerId_);
    }

    this.adapter_.closeSurface();
  };

  MDCMenuFoundation.prototype.handleKeydown = function (evt) {
    var key = evt.key,
        keyCode = evt.keyCode;
    var isTab = key === 'Tab' || keyCode === 9;

    if (isTab) {
      this.adapter_.closeSurface(
      /** skipRestoreFocus */
      true);
    }
  };

  MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
    var _this = this;

    var index = this.adapter_.getElementIndex(listItem);

    if (index < 0) {
      return;
    }

    this.adapter_.notifySelected({
      index: index
    });
    this.adapter_.closeSurface(); // Wait for the menu to close before adding/removing classes that affect styles.

    this.closeAnimationEndTimerId_ = setTimeout(function () {
      // Recompute the index in case the menu contents have changed.
      var recomputedIndex = _this.adapter_.getElementIndex(listItem);

      if (_this.adapter_.isSelectableItemAtIndex(recomputedIndex)) {
        _this.setSelectedIndex(recomputedIndex);
      }
    }, MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
  };

  MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function () {
    switch (this.defaultFocusState_) {
      case DefaultFocusState.FIRST_ITEM:
        this.adapter_.focusItemAtIndex(0);
        break;

      case DefaultFocusState.LAST_ITEM:
        this.adapter_.focusItemAtIndex(this.adapter_.getMenuItemCount() - 1);
        break;

      case DefaultFocusState.NONE:
        // Do nothing.
        break;

      default:
        this.adapter_.focusListRoot();
        break;
    }
  };
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   */


  MDCMenuFoundation.prototype.setDefaultFocusState = function (focusState) {
    this.defaultFocusState_ = focusState;
  };
  /**
   * Selects the list item at `index` within the menu.
   * @param index Index of list item within the menu.
   */


  MDCMenuFoundation.prototype.setSelectedIndex = function (index) {
    this.validatedIndex_(index);

    if (!this.adapter_.isSelectableItemAtIndex(index)) {
      throw new Error('MDCMenuFoundation: No selection group at specified index.');
    }

    var prevSelectedIndex = this.adapter_.getSelectedSiblingOfItemAtIndex(index);

    if (prevSelectedIndex >= 0) {
      this.adapter_.removeAttributeFromElementAtIndex(prevSelectedIndex, strings$4.ARIA_CHECKED_ATTR);
      this.adapter_.removeClassFromElementAtIndex(prevSelectedIndex, cssClasses$4.MENU_SELECTED_LIST_ITEM);
    }

    this.adapter_.addClassToElementAtIndex(index, cssClasses$4.MENU_SELECTED_LIST_ITEM);
    this.adapter_.addAttributeToElementAtIndex(index, strings$4.ARIA_CHECKED_ATTR, 'true');
  };
  /**
   * Sets the enabled state to isEnabled for the menu item at the given index.
   * @param index Index of the menu item
   * @param isEnabled The desired enabled state of the menu item.
   */


  MDCMenuFoundation.prototype.setEnabled = function (index, isEnabled) {
    this.validatedIndex_(index);

    if (isEnabled) {
      this.adapter_.removeClassFromElementAtIndex(index, cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.addAttributeToElementAtIndex(index, strings$4.ARIA_DISABLED_ATTR, 'false');
    } else {
      this.adapter_.addClassToElementAtIndex(index, cssClasses.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.addAttributeToElementAtIndex(index, strings$4.ARIA_DISABLED_ATTR, 'true');
    }
  };

  MDCMenuFoundation.prototype.validatedIndex_ = function (index) {
    var menuSize = this.adapter_.getMenuItemCount();
    var isIndexInRange = index >= 0 && index < menuSize;

    if (!isIndexInRange) {
      throw new Error('MDCMenuFoundation: No list item at specified index.');
    }
  };

  return MDCMenuFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenu =
/** @class */
function (_super) {
  __extends(MDCMenu, _super);

  function MDCMenu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenu.attachTo = function (root) {
    return new MDCMenu(root);
  };

  MDCMenu.prototype.initialize = function (menuSurfaceFactory, listFactory) {
    if (menuSurfaceFactory === void 0) {
      menuSurfaceFactory = function menuSurfaceFactory(el) {
        return new MDCMenuSurface(el);
      };
    }

    if (listFactory === void 0) {
      listFactory = function listFactory(el) {
        return new MDCList(el);
      };
    }

    this.menuSurfaceFactory_ = menuSurfaceFactory;
    this.listFactory_ = listFactory;
  };

  MDCMenu.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.menuSurface_ = this.menuSurfaceFactory_(this.root_);
    var list = this.root_.querySelector(strings$4.LIST_SELECTOR);

    if (list) {
      this.list_ = this.listFactory_(list);
      this.list_.wrapFocus = true;
    } else {
      this.list_ = null;
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleItemAction_ = function (evt) {
      return _this.foundation_.handleItemAction(_this.items[evt.detail.index]);
    };

    this.handleMenuSurfaceOpened_ = function () {
      return _this.foundation_.handleMenuSurfaceOpened();
    };

    this.menuSurface_.listen(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.listen('keydown', this.handleKeydown_);
    this.listen(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
  };

  MDCMenu.prototype.destroy = function () {
    if (this.list_) {
      this.list_.destroy();
    }

    this.menuSurface_.destroy();
    this.menuSurface_.unlisten(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCMenu.prototype, "open", {
    get: function get() {
      return this.menuSurface_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.menuSurface_.open();
      } else {
        this.menuSurface_.close();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
    get: function get() {
      return this.list_ ? this.list_.wrapFocus : false;
    },
    set: function set(value) {
      if (this.list_) {
        this.list_.wrapFocus = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "items", {
    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     */
    get: function get() {
      return this.list_ ? this.list_.listElements : [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "quickOpen", {
    set: function set(quickOpen) {
      this.menuSurface_.quickOpen = quickOpen;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   * @param focusState Default focus state.
   */

  MDCMenu.prototype.setDefaultFocusState = function (focusState) {
    this.foundation_.setDefaultFocusState(focusState);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu corner.
   */


  MDCMenu.prototype.setAnchorCorner = function (corner) {
    this.menuSurface_.setAnchorCorner(corner);
  };

  MDCMenu.prototype.setAnchorMargin = function (margin) {
    this.menuSurface_.setAnchorMargin(margin);
  };
  /**
   * Sets the list item as the selected row at the specified index.
   * @param index Index of list item within menu.
   */


  MDCMenu.prototype.setSelectedIndex = function (index) {
    this.foundation_.setSelectedIndex(index);
  };
  /**
   * Sets the enabled state to isEnabled for the menu item at the given index.
   * @param index Index of the menu item
   * @param isEnabled The desired enabled state of the menu item.
   */


  MDCMenu.prototype.setEnabled = function (index, isEnabled) {
    this.foundation_.setEnabled(index, isEnabled);
  };
  /**
   * @return The item within the menu at the index specified.
   */


  MDCMenu.prototype.getOptionByIndex = function (index) {
    var items = this.items;

    if (index < items.length) {
      return this.items[index];
    } else {
      return null;
    }
  };

  MDCMenu.prototype.setFixedPosition = function (isFixed) {
    this.menuSurface_.setFixedPosition(isFixed);
  };

  MDCMenu.prototype.hoistMenuToBody = function () {
    this.menuSurface_.hoistMenuToBody();
  };

  MDCMenu.prototype.setIsHoisted = function (isHoisted) {
    this.menuSurface_.setIsHoisted(isHoisted);
  };

  MDCMenu.prototype.setAbsolutePosition = function (x, y) {
    this.menuSurface_.setAbsolutePosition(x, y);
  };
  /**
   * Sets the element that the menu-surface is anchored to.
   */


  MDCMenu.prototype.setAnchorElement = function (element) {
    this.menuSurface_.anchorElement = element;
  };

  MDCMenu.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClassToElementAtIndex: function addClassToElementAtIndex(index, className) {
        var list = _this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: function removeClassFromElementAtIndex(index, className) {
        var list = _this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: function addAttributeToElementAtIndex(index, attr, value) {
        var list = _this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex(index, attr) {
        var list = _this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: function elementContainsClass(element, className) {
        return element.classList.contains(className);
      },
      closeSurface: function closeSurface(skipRestoreFocus) {
        return _this.menuSurface_.close(skipRestoreFocus);
      },
      getElementIndex: function getElementIndex(element) {
        return _this.items.indexOf(element);
      },
      notifySelected: function notifySelected(evtData) {
        return _this.emit(strings$4.SELECTED_EVENT, {
          index: evtData.index,
          item: _this.items[evtData.index]
        });
      },
      getMenuItemCount: function getMenuItemCount() {
        return _this.items.length;
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        return _this.items[index].focus();
      },
      focusListRoot: function focusListRoot() {
        return _this.root_.querySelector(strings$4.LIST_SELECTOR).focus();
      },
      isSelectableItemAtIndex: function isSelectableItemAtIndex(index) {
        return !!closest(_this.items[index], "." + cssClasses$4.MENU_SELECTION_GROUP);
      },
      getSelectedSiblingOfItemAtIndex: function getSelectedSiblingOfItemAtIndex(index) {
        var selectionGroupEl = closest(_this.items[index], "." + cssClasses$4.MENU_SELECTION_GROUP);
        var selectedItemEl = selectionGroupEl.querySelector("." + cssClasses$4.MENU_SELECTED_LIST_ITEM);
        return selectedItemEl ? _this.items.indexOf(selectedItemEl) : -1;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCMenuFoundation(adapter);
  };

  return MDCMenu;
}(MDCComponent);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "node_modules/@smui/menu-surface/MenuSurface.svelte";

function create_fragment$5(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[27].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[26], null);
  var div_levels = [{
    class: "\n    mdc-menu-surface\n    " +
    /*className*/
    ctx[3] + "\n    " + (
    /*fixed*/
    ctx[0] ? "mdc-menu-surface--fixed" : "") + "\n    " + (
    /*isStatic*/
    ctx[4] ? "mdc-menu-surface--open" : "") + "\n    " + (
    /*isStatic*/
    ctx[4] ? "smui-menu-surface--static" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[7], ["use", "class", "static", "anchor", "fixed", "open", "quickOpen", "anchorElement", "anchorCorner", "element"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$4, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }
      /*div_binding*/


      ctx[28](div);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[2])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[5].call(null, div)), listen_dev(div, "MDCMenuSurface:closed",
      /*updateOpen*/
      ctx[6], false, false, false), listen_dev(div, "MDCMenuSurface:opened",
      /*updateOpen*/
      ctx[6], false, false, false)];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        67108864) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[26], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[26], dirty, null));
        }
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*className, fixed, isStatic*/
      25 && {
        class: "\n    mdc-menu-surface\n    " +
        /*className*/
        ctx[3] + "\n    " + (
        /*fixed*/
        ctx[0] ? "mdc-menu-surface--fixed" : "") + "\n    " + (
        /*isStatic*/
        ctx[4] ? "mdc-menu-surface--open" : "") + "\n    " + (
        /*isStatic*/
        ctx[4] ? "smui-menu-surface--static" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      128 && exclude(
      /*$$props*/
      ctx[7], ["use", "class", "static", "anchor", "fixed", "open", "quickOpen", "anchorElement", "anchorCorner", "element"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      4) useActions_action.update.call(null,
      /*use*/
      ctx[2]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      /*div_binding*/

      ctx[28](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCMenuSurface:closed", "MDCMenuSurface:opened"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$static = _$$props3.static,
      isStatic = _$$props3$static === void 0 ? false : _$$props3$static;
  var _$$props4 = $$props,
      _$$props4$anchor = _$$props4.anchor,
      anchor = _$$props4$anchor === void 0 ? true : _$$props4$anchor;
  var _$$props5 = $$props,
      _$$props5$fixed = _$$props5.fixed,
      fixed = _$$props5$fixed === void 0 ? false : _$$props5$fixed;
  var _$$props6 = $$props,
      _$$props6$open = _$$props6.open,
      open = _$$props6$open === void 0 ? isStatic : _$$props6$open;
  var _$$props7 = $$props,
      _$$props7$quickOpen = _$$props7.quickOpen,
      quickOpen = _$$props7$quickOpen === void 0 ? false : _$$props7$quickOpen;
  var _$$props8 = $$props,
      _$$props8$anchorEleme = _$$props8.anchorElement,
      anchorElement = _$$props8$anchorEleme === void 0 ? null : _$$props8$anchorEleme;
  var _$$props9 = $$props,
      _$$props9$anchorCorne = _$$props9.anchorCorner,
      anchorCorner = _$$props9$anchorCorne === void 0 ? null : _$$props9$anchorCorne;
  var _$$props10 = $$props,
      _$$props10$element = _$$props10.element,
      element = _$$props10$element === void 0 ? undefined : _$$props10$element; // This is exported because Menu needs it.

  var menuSurface;
  var instantiate = getContext("SMUI:menu-surface:instantiate");
  var getInstance = getContext("SMUI:menu-surface:getInstance");
  setContext("SMUI:list:role", "menu");
  setContext("SMUI:list:item:role", "menuitem");
  var oldFixed = null;
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(22, menuSurface = new MDCMenuSurface(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = menuSurface = _context.sent;
            (0, _context.t0)(22, _context.t1);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (anchor) {
      element && element.parentNode.classList.remove("mdc-menu-surface--anchor");
    }

    var isHoisted = false;

    if (menuSurface) {
      isHoisted = menuSurface.foundation_.isHoistedElement_;

      if (instantiate !== false) {
        menuSurface.destroy();
      }
    }

    if (isHoisted) {
      element.parentNode.removeChild(element);
    }
  });

  function updateOpen() {
    if (menuSurface) {
      if (isStatic) {
        $$invalidate(8, open = true);
      } else {
        $$invalidate(8, open = menuSurface.isOpen());
      }
    }
  }

  function setOpen(value) {
    $$invalidate(8, open = value);
  }

  function setAnchorCorner() {
    var _menuSurface;

    return (_menuSurface = menuSurface).setAnchorCorner.apply(_menuSurface, arguments);
  }

  function setAnchorMargin() {
    var _menuSurface2;

    return (_menuSurface2 = menuSurface).setAnchorMargin.apply(_menuSurface2, arguments);
  }

  function setFixedPosition(isFixed) {
    var _menuSurface3;

    $$invalidate(0, fixed = isFixed);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_menuSurface3 = menuSurface).setFixedPosition.apply(_menuSurface3, [isFixed].concat(args));
  }

  function setAbsolutePosition() {
    var _menuSurface4;

    return (_menuSurface4 = menuSurface).setAbsolutePosition.apply(_menuSurface4, arguments);
  }

  function setMenuSurfaceAnchorElement() {
    var _menuSurface5;

    return (_menuSurface5 = menuSurface).setMenuSurfaceAnchorElement.apply(_menuSurface5, arguments);
  }

  function hoistMenuToBody() {
    var _menuSurface6;

    return (_menuSurface6 = menuSurface).hoistMenuToBody.apply(_menuSurface6, arguments);
  }

  function setIsHoisted() {
    var _menuSurface7;

    return (_menuSurface7 = menuSurface).setIsHoisted.apply(_menuSurface7, arguments);
  }

  function getDefaultFoundation() {
    var _menuSurface8;

    return (_menuSurface8 = menuSurface).getDefaultFoundation.apply(_menuSurface8, arguments);
  }

  var _$$props11 = $$props,
      _$$props11$$$slots = _$$props11.$$slots,
      $$slots = _$$props11$$$slots === void 0 ? {} : _$$props11$$$slots,
      $$scope = _$$props11.$$scope;
  validate_slots("MenuSurface", $$slots, ['default']);

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(1, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(2, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(3, className = $$new_props.class);
    if ("static" in $$new_props) $$invalidate(4, isStatic = $$new_props.static);
    if ("anchor" in $$new_props) $$invalidate(10, anchor = $$new_props.anchor);
    if ("fixed" in $$new_props) $$invalidate(0, fixed = $$new_props.fixed);
    if ("open" in $$new_props) $$invalidate(8, open = $$new_props.open);
    if ("quickOpen" in $$new_props) $$invalidate(11, quickOpen = $$new_props.quickOpen);
    if ("anchorElement" in $$new_props) $$invalidate(9, anchorElement = $$new_props.anchorElement);
    if ("anchorCorner" in $$new_props) $$invalidate(12, anchorCorner = $$new_props.anchorCorner);
    if ("element" in $$new_props) $$invalidate(1, element = $$new_props.element);
    if ("$$scope" in $$new_props) $$invalidate(26, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Corner: Corner,
      CornerBit: CornerBit,
      MDCMenuSurface: MDCMenuSurface,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      isStatic: isStatic,
      anchor: anchor,
      fixed: fixed,
      open: open,
      quickOpen: quickOpen,
      anchorElement: anchorElement,
      anchorCorner: anchorCorner,
      element: element,
      menuSurface: menuSurface,
      instantiate: instantiate,
      getInstance: getInstance,
      oldFixed: oldFixed,
      updateOpen: updateOpen,
      setOpen: setOpen,
      setAnchorCorner: setAnchorCorner,
      setAnchorMargin: setAnchorMargin,
      setFixedPosition: setFixedPosition,
      setAbsolutePosition: setAbsolutePosition,
      setMenuSurfaceAnchorElement: setMenuSurfaceAnchorElement,
      hoistMenuToBody: hoistMenuToBody,
      setIsHoisted: setIsHoisted,
      getDefaultFoundation: getDefaultFoundation
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(2, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(3, className = $$new_props.className);
    if ("isStatic" in $$props) $$invalidate(4, isStatic = $$new_props.isStatic);
    if ("anchor" in $$props) $$invalidate(10, anchor = $$new_props.anchor);
    if ("fixed" in $$props) $$invalidate(0, fixed = $$new_props.fixed);
    if ("open" in $$props) $$invalidate(8, open = $$new_props.open);
    if ("quickOpen" in $$props) $$invalidate(11, quickOpen = $$new_props.quickOpen);
    if ("anchorElement" in $$props) $$invalidate(9, anchorElement = $$new_props.anchorElement);
    if ("anchorCorner" in $$props) $$invalidate(12, anchorCorner = $$new_props.anchorCorner);
    if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
    if ("menuSurface" in $$props) $$invalidate(22, menuSurface = $$new_props.menuSurface);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("oldFixed" in $$props) $$invalidate(23, oldFixed = $$new_props.oldFixed);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*element, anchor*/
    1026) {
       if (element && anchor && !element.parentNode.classList.contains("mdc-menu-surface--anchor")) {
        element.parentNode.classList.add("mdc-menu-surface--anchor");
        $$invalidate(9, anchorElement = element.parentNode);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, quickOpen*/
    4196352) {
       if (menuSurface && menuSurface.quickOpen !== quickOpen) {
        $$invalidate(22, menuSurface.quickOpen = quickOpen, menuSurface);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, anchorElement*/
    4194816) {
       if (menuSurface && menuSurface.anchorElement !== anchorElement) {
        $$invalidate(22, menuSurface.anchorElement = anchorElement, menuSurface);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, open*/
    4194560) {
       if (menuSurface && menuSurface.isOpen() !== open) {
        if (open) {
          menuSurface.open();
        } else {
          menuSurface.close();
        }
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, oldFixed, fixed*/
    12582913) {
       if (menuSurface && oldFixed !== fixed) {
        menuSurface.setFixedPosition(fixed);
        $$invalidate(23, oldFixed = fixed);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, anchorCorner*/
    4198400) {
       if (menuSurface && anchorCorner != null) {
        if (Corner.hasOwnProperty(anchorCorner)) {
          menuSurface.setAnchorCorner(Corner[anchorCorner]);
        } else if (CornerBit.hasOwnProperty(anchorCorner)) {
          menuSurface.setAnchorCorner(Corner[anchorCorner]);
        } else {
          menuSurface.setAnchorCorner(anchorCorner);
        }
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [fixed, element, use, className, isStatic, forwardEvents, updateOpen, $$props, open, anchorElement, anchor, quickOpen, anchorCorner, setOpen, setAnchorCorner, setAnchorMargin, setFixedPosition, setAbsolutePosition, setMenuSurfaceAnchorElement, hoistMenuToBody, setIsHoisted, getDefaultFoundation, menuSurface, oldFixed, instantiate, getInstance, $$scope, $$slots, div_binding];
}

var MenuSurface = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(MenuSurface, _SvelteComponentDev);

  var _super = _createSuper$6(MenuSurface);

  function MenuSurface(options) {
    var _this;

    _classCallCheck(this, MenuSurface);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      use: 2,
      class: 3,
      static: 4,
      anchor: 10,
      fixed: 0,
      open: 8,
      quickOpen: 11,
      anchorElement: 9,
      anchorCorner: 12,
      element: 1,
      setOpen: 13,
      setAnchorCorner: 14,
      setAnchorMargin: 15,
      setFixedPosition: 16,
      setAbsolutePosition: 17,
      setMenuSurfaceAnchorElement: 18,
      hoistMenuToBody: 19,
      setIsHoisted: 20,
      getDefaultFoundation: 21
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "MenuSurface",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  _createClass(MenuSurface, [{
    key: "use",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "static",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchor",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fixed",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "quickOpen",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchorElement",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchorCorner",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "element",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setOpen",
    get: function get() {
      return this.$$.ctx[13];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorCorner",
    get: function get() {
      return this.$$.ctx[14];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorMargin",
    get: function get() {
      return this.$$.ctx[15];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setFixedPosition",
    get: function get() {
      return this.$$.ctx[16];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAbsolutePosition",
    get: function get() {
      return this.$$.ctx[17];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setMenuSurfaceAnchorElement",
    get: function get() {
      return this.$$.ctx[18];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hoistMenuToBody",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setIsHoisted",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[21];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return MenuSurface;
}(SvelteComponentDev);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot$1(ctx) {
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[34].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[36], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[1] &
        /*$$scope*/
        32) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[36], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[36], dirty, null));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$1.name,
    type: "slot",
    source: "(1:0) <MenuSurface   bind:element   use={[forwardEvents, ...use]}   class=\\\"mdc-menu {className}\\\"   on:MDCMenu:selected={updateOpen}   on:MDCMenuSurface:closed={updateOpen} on:MDCMenuSurface:opened={updateOpen}   {...exclude($$props, ['use', 'class', 'wrapFocus'])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var updating_element;
  var current;
  var menusurface_spread_levels = [{
    use: [
    /*forwardEvents*/
    ctx[3]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    class: "mdc-menu " +
    /*className*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class", "wrapFocus"])];

  function menusurface_element_binding(value) {
    /*menusurface_element_binding*/
    ctx[35].call(null, value);
  }

  var menusurface_props = {
    $$slots: {
      default: [create_default_slot$1]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < menusurface_spread_levels.length; i += 1) {
    menusurface_props = assign(menusurface_props, menusurface_spread_levels[i]);
  }

  if (
  /*element*/
  ctx[2] !== void 0) {
    menusurface_props.element =
    /*element*/
    ctx[2];
  }

  var menusurface = new MenuSurface({
    props: menusurface_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(menusurface, "element", menusurface_element_binding);
  });
  menusurface.$on("MDCMenu:selected",
  /*updateOpen*/
  ctx[4]);
  menusurface.$on("MDCMenuSurface:closed",
  /*updateOpen*/
  ctx[4]);
  menusurface.$on("MDCMenuSurface:opened",
  /*updateOpen*/
  ctx[4]);
  var block = {
    c: function create() {
      create_component(menusurface.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(menusurface.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(menusurface, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var menusurface_changes = dirty[0] &
      /*forwardEvents, use, className, $$props*/
      43 ? get_spread_update(menusurface_spread_levels, [dirty[0] &
      /*forwardEvents, use*/
      9 && {
        use: [
        /*forwardEvents*/
        ctx[3]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty[0] &
      /*className*/
      2 && {
        class: "mdc-menu " +
        /*className*/
        ctx[1]
      }, dirty[0] &
      /*$$props*/
      32 && get_spread_object(exclude(
      /*$$props*/
      ctx[5], ["use", "class", "wrapFocus"]))]) : {};

      if (dirty[1] &
      /*$$scope*/
      32) {
        menusurface_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_element && dirty[0] &
      /*element*/
      4) {
        updating_element = true;
        menusurface_changes.element =
        /*element*/
        ctx[2];
        add_flush_callback(function () {
          return updating_element = false;
        });
      }

      menusurface.$set(menusurface_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(menusurface.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(menusurface.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(menusurface, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCMenu:selected", "MDCMenuSurface:closed", "MDCMenuSurface:opened"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$static = _$$props3.static,
      isStatic = _$$props3$static === void 0 ? false : _$$props3$static;
  var _$$props4 = $$props,
      _$$props4$open = _$$props4.open,
      open = _$$props4$open === void 0 ? isStatic : _$$props4$open; // Purposely omitted from the exclude call above.

  var _$$props5 = $$props,
      _$$props5$quickOpen = _$$props5.quickOpen,
      quickOpen = _$$props5$quickOpen === void 0 ? false : _$$props5$quickOpen; // Purposely omitted from the exclude call above.

  var _$$props6 = $$props,
      _$$props6$anchorCorne = _$$props6.anchorCorner,
      anchorCorner = _$$props6$anchorCorne === void 0 ? null : _$$props6$anchorCorne; // Purposely omitted from the exclude call above.

  var _$$props7 = $$props,
      _$$props7$wrapFocus = _$$props7.wrapFocus,
      wrapFocus = _$$props7$wrapFocus === void 0 ? false : _$$props7$wrapFocus;
  var element;
  var menu;
  var instantiate = getContext("SMUI:menu:instantiate");
  var getInstance = getContext("SMUI:menu:getInstance");
  var menuSurfacePromiseResolve;
  var menuSurfacePromise = new Promise(function (resolve) {
    return menuSurfacePromiseResolve = resolve;
  });
  var listPromiseResolve;
  var listPromise = new Promise(function (resolve) {
    return listPromiseResolve = resolve;
  });
  setContext("SMUI:menu-surface:instantiate", false);
  setContext("SMUI:menu-surface:getInstance", getMenuSurfaceInstancePromise);
  setContext("SMUI:list:instantiate", false);
  setContext("SMUI:list:getInstance", getListInstancePromise);
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(25, menu = new MDCMenu(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = menu = _context.sent;
            (0, _context.t0)(25, _context.t1);

          case 9:
            menuSurfacePromiseResolve(menu.menuSurface_);
            listPromiseResolve(menu.list_);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (instantiate !== false) {
      menu && menu.destroy();
    }
  });

  function getMenuSurfaceInstancePromise() {
    return menuSurfacePromise;
  }

  function getListInstancePromise() {
    return listPromise;
  }

  function updateOpen() {
    $$invalidate(6, open = menu.open);
  }

  function setOpen(value) {
    $$invalidate(6, open = value);
  }

  function getItems() {
    return menu.items;
  }

  function setDefaultFocusState() {
    var _menu;

    return (_menu = menu).setDefaultFocusState.apply(_menu, arguments);
  }

  function setAnchorCorner() {
    var _menu2;

    return (_menu2 = menu).setAnchorCorner.apply(_menu2, arguments);
  }

  function setAnchorMargin() {
    var _menu3;

    return (_menu3 = menu).setAnchorMargin.apply(_menu3, arguments);
  }

  function setSelectedIndex() {
    var _menu4;

    return (_menu4 = menu).setSelectedIndex.apply(_menu4, arguments);
  }

  function setEnabled() {
    var _menu5;

    return (_menu5 = menu).setEnabled.apply(_menu5, arguments);
  }

  function getOptionByIndex() {
    var _menu6;

    return (_menu6 = menu).getOptionByIndex.apply(_menu6, arguments);
  }

  function setFixedPosition() {
    var _menu7;

    return (_menu7 = menu).setFixedPosition.apply(_menu7, arguments);
  }

  function hoistMenuToBody() {
    var _menu8;

    return (_menu8 = menu).hoistMenuToBody.apply(_menu8, arguments);
  }

  function setIsHoisted() {
    var _menu9;

    return (_menu9 = menu).setIsHoisted.apply(_menu9, arguments);
  }

  function setAbsolutePosition() {
    var _menu10;

    return (_menu10 = menu).setAbsolutePosition.apply(_menu10, arguments);
  }

  function setAnchorElement() {
    var _menu11;

    return (_menu11 = menu).setAnchorElement.apply(_menu11, arguments);
  }

  function getDefaultFoundation() {
    var _menu12;

    return (_menu12 = menu).getDefaultFoundation.apply(_menu12, arguments);
  }

  var _$$props8 = $$props,
      _$$props8$$$slots = _$$props8.$$slots,
      $$slots = _$$props8$$$slots === void 0 ? {} : _$$props8$$$slots,
      $$scope = _$$props8.$$scope;
  validate_slots("Menu", $$slots, ['default']);

  function menusurface_element_binding(value) {
    element = value;
    $$invalidate(2, element);
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("static" in $$new_props) $$invalidate(7, isStatic = $$new_props.static);
    if ("open" in $$new_props) $$invalidate(6, open = $$new_props.open);
    if ("quickOpen" in $$new_props) $$invalidate(8, quickOpen = $$new_props.quickOpen);
    if ("anchorCorner" in $$new_props) $$invalidate(9, anchorCorner = $$new_props.anchorCorner);
    if ("wrapFocus" in $$new_props) $$invalidate(10, wrapFocus = $$new_props.wrapFocus);
    if ("$$scope" in $$new_props) $$invalidate(36, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCMenu: MDCMenu,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      MenuSurface: MenuSurface,
      Corner: Corner,
      CornerBit: CornerBit,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      isStatic: isStatic,
      open: open,
      quickOpen: quickOpen,
      anchorCorner: anchorCorner,
      wrapFocus: wrapFocus,
      element: element,
      menu: menu,
      instantiate: instantiate,
      getInstance: getInstance,
      menuSurfacePromiseResolve: menuSurfacePromiseResolve,
      menuSurfacePromise: menuSurfacePromise,
      listPromiseResolve: listPromiseResolve,
      listPromise: listPromise,
      getMenuSurfaceInstancePromise: getMenuSurfaceInstancePromise,
      getListInstancePromise: getListInstancePromise,
      updateOpen: updateOpen,
      setOpen: setOpen,
      getItems: getItems,
      setDefaultFocusState: setDefaultFocusState,
      setAnchorCorner: setAnchorCorner,
      setAnchorMargin: setAnchorMargin,
      setSelectedIndex: setSelectedIndex,
      setEnabled: setEnabled,
      getOptionByIndex: getOptionByIndex,
      setFixedPosition: setFixedPosition,
      hoistMenuToBody: hoistMenuToBody,
      setIsHoisted: setIsHoisted,
      setAbsolutePosition: setAbsolutePosition,
      setAnchorElement: setAnchorElement,
      getDefaultFoundation: getDefaultFoundation
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("isStatic" in $$props) $$invalidate(7, isStatic = $$new_props.isStatic);
    if ("open" in $$props) $$invalidate(6, open = $$new_props.open);
    if ("quickOpen" in $$props) $$invalidate(8, quickOpen = $$new_props.quickOpen);
    if ("anchorCorner" in $$props) $$invalidate(9, anchorCorner = $$new_props.anchorCorner);
    if ("wrapFocus" in $$props) $$invalidate(10, wrapFocus = $$new_props.wrapFocus);
    if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    if ("menu" in $$props) $$invalidate(25, menu = $$new_props.menu);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("menuSurfacePromiseResolve" in $$props) menuSurfacePromiseResolve = $$new_props.menuSurfacePromiseResolve;
    if ("menuSurfacePromise" in $$props) menuSurfacePromise = $$new_props.menuSurfacePromise;
    if ("listPromiseResolve" in $$props) listPromiseResolve = $$new_props.listPromiseResolve;
    if ("listPromise" in $$props) listPromise = $$new_props.listPromise;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*menu, open, isStatic*/
    33554624) {
       if (menu && menu.open !== open) {
        if (isStatic) {
          $$invalidate(6, open = true);
        }

        $$invalidate(25, menu.open = open, menu);
      }
    }

    if ($$self.$$.dirty[0] &
    /*menu, wrapFocus*/
    33555456) {
       if (menu && menu.wrapFocus !== wrapFocus) {
        $$invalidate(25, menu.wrapFocus = wrapFocus, menu);
      }
    }

    if ($$self.$$.dirty[0] &
    /*menu, quickOpen*/
    33554688) {
       if (menu) {
        $$invalidate(25, menu.quickOpen = quickOpen, menu);
      }
    }

    if ($$self.$$.dirty[0] &
    /*menu, anchorCorner*/
    33554944) {
       if (menu && anchorCorner != null) {
        if (Corner.hasOwnProperty(anchorCorner)) {
          menu.setAnchorCorner(Corner[anchorCorner]);
        } else if (CornerBit.hasOwnProperty(anchorCorner)) {
          menu.setAnchorCorner(Corner[anchorCorner]);
        } else {
          menu.setAnchorCorner(anchorCorner);
        }
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, element, forwardEvents, updateOpen, $$props, open, isStatic, quickOpen, anchorCorner, wrapFocus, setOpen, getItems, setDefaultFocusState, setAnchorCorner, setAnchorMargin, setSelectedIndex, setEnabled, getOptionByIndex, setFixedPosition, hoistMenuToBody, setIsHoisted, setAbsolutePosition, setAnchorElement, getDefaultFoundation, menu, menuSurfacePromiseResolve, listPromiseResolve, instantiate, getInstance, menuSurfacePromise, listPromise, getMenuSurfaceInstancePromise, getListInstancePromise, $$slots, menusurface_element_binding, $$scope];
}

var Menu = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Menu, _SvelteComponentDev);

  var _super = _createSuper$7(Menu);

  function Menu(options) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      use: 0,
      class: 1,
      static: 7,
      open: 6,
      quickOpen: 8,
      anchorCorner: 9,
      wrapFocus: 10,
      setOpen: 11,
      getItems: 12,
      setDefaultFocusState: 13,
      setAnchorCorner: 14,
      setAnchorMargin: 15,
      setSelectedIndex: 16,
      setEnabled: 17,
      getOptionByIndex: 18,
      setFixedPosition: 19,
      hoistMenuToBody: 20,
      setIsHoisted: 21,
      setAbsolutePosition: 22,
      setAnchorElement: 23,
      getDefaultFoundation: 24
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Menu",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }

  _createClass(Menu, [{
    key: "use",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "static",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "quickOpen",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchorCorner",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "wrapFocus",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setOpen",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getItems",
    get: function get() {
      return this.$$.ctx[12];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setDefaultFocusState",
    get: function get() {
      return this.$$.ctx[13];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorCorner",
    get: function get() {
      return this.$$.ctx[14];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorMargin",
    get: function get() {
      return this.$$.ctx[15];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setSelectedIndex",
    get: function get() {
      return this.$$.ctx[16];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setEnabled",
    get: function get() {
      return this.$$.ctx[17];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getOptionByIndex",
    get: function get() {
      return this.$$.ctx[18];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setFixedPosition",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "hoistMenuToBody",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setIsHoisted",
    get: function get() {
      return this.$$.ctx[21];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAbsolutePosition",
    get: function get() {
      return this.$$.ctx[22];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorElement",
    get: function get() {
      return this.$$.ctx[23];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[24];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Menu;
}(SvelteComponentDev);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "node_modules/@smui/common/Span.svelte";

function create_fragment$7(ctx) {
  var span;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var span_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$5, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, span,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, span))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(span, get_spread_update(span_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("Span", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var Span = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Span, _SvelteComponentDev);

  var _super = _createSuper$8(Span);

  function Span(options) {
    var _this;

    _classCallCheck(this, Span);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Span",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }

  _createClass(Span, [{
    key: "use",
    get: function get() {
      throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Span;
}(SvelteComponentDev);

var Graphic = classAdderBuilder({
  class: 'mdc-list-item__graphic',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-menu__selection-group-icon',
  component: Graphic,
  contexts: {}
});

var css_248z$2 = "body{background-color:#000;color:#fff}.mdc-button{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.08929em;text-decoration:none;text-transform:uppercase;padding:0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;height:36px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:hidden;vertical-align:middle;border-radius:4px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{background-color:transparent;color:hsla(0,0%,100%,.37);cursor:default;pointer-events:none}.mdc-button.mdc-button--dense{border-radius:4px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}.mdc-button .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button .mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button:not(:disabled){color:#fc0;color:var(--mdc-theme-primary,#fc0)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button__label+.mdc-button__icon{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--outlined .mdc-button__icon,.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--outlined .mdc-button__icon[dir=rtl],.mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--outlined .mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:hsla(0,0%,100%,.12);color:hsla(0,0%,100%,.37)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-primary,#fc0)}}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#000;color:var(--mdc-theme-on-primary,#000)}.mdc-button--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow .28s cubic-bezier(.4,0,.2,1)}.mdc-button--raised:focus,.mdc-button--raised:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mdc-button--outlined{border-style:solid;padding:0 15px;border-width:1px}.mdc-button--outlined:disabled{border-color:hsla(0,0%,100%,.37)}.mdc-button--outlined:not(:disabled){border-color:#fc0;border-color:var(--mdc-theme-primary,#fc0)}.mdc-button--dense{height:32px;font-size:.8125rem}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-button:after,.mdc-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-button:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-button.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-button.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-button.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button:after,.mdc-button:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-button:after,.mdc-button:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-button:after,.mdc-button:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-button:hover:before{opacity:.08}.mdc-button.mdc-ripple-upgraded--background-focused:before,.mdc-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-button--raised:after,.mdc-button--raised:before,.mdc-button--unelevated:after,.mdc-button--unelevated:before{background-color:#000}@supports not (-ms-ime-align:auto){.mdc-button--raised:after,.mdc-button--raised:before,.mdc-button--unelevated:after,.mdc-button--unelevated:before{background-color:var(--mdc-theme-on-primary,#000)}}.mdc-button--raised:hover:before,.mdc-button--unelevated:hover:before{opacity:.04}.mdc-button--raised.mdc-ripple-upgraded--background-focused:before,.mdc-button--raised:not(.mdc-ripple-upgraded):focus:before,.mdc-button--unelevated.mdc-ripple-upgraded--background-focused:before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-button--raised:not(.mdc-ripple-upgraded):after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active:after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-button--raised.mdc-ripple-upgraded,.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#fff}.mdc-ripple-surface:hover:before{opacity:.08}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-ripple-surface--primary:hover:before{opacity:.08}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#fc0)}}.mdc-ripple-surface--accent:hover:before{opacity:.08}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-button--color-secondary:not(:disabled){color:#fc0;color:var(--mdc-theme-secondary,#fc0)}.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){background-color:#fc0}@supports not (-ms-ime-align:auto){.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-secondary,#fc0)}}.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){color:#000;color:var(--mdc-theme-on-secondary,#000)}.smui-button--color-secondary.mdc-button--outlined:not(:disabled){border-color:#fc0;border-color:var(--mdc-theme-secondary,#fc0)}.smui-button--color-secondary:after,.smui-button--color-secondary:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.smui-button--color-secondary:after,.smui-button--color-secondary:before{background-color:var(--mdc-theme-secondary,#fc0)}}.smui-button--color-secondary:hover:before{opacity:.08}.smui-button--color-secondary.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.smui-button--color-secondary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-button--color-secondary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.smui-button--color-secondary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-button--color-secondary.mdc-button--raised:after,.smui-button--color-secondary.mdc-button--raised:before,.smui-button--color-secondary.mdc-button--unelevated:after,.smui-button--color-secondary.mdc-button--unelevated:before{background-color:#000}@supports not (-ms-ime-align:auto){.smui-button--color-secondary.mdc-button--raised:after,.smui-button--color-secondary.mdc-button--raised:before,.smui-button--color-secondary.mdc-button--unelevated:after,.smui-button--color-secondary.mdc-button--unelevated:before{background-color:var(--mdc-theme-on-secondary,#000)}}.smui-button--color-secondary.mdc-button--raised:hover:before,.smui-button--color-secondary.mdc-button--unelevated:hover:before{opacity:.04}.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):focus:before,.smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):after,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):active:after,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded,.smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-button__group{display:inline-flex}.smui-button__group>.mdc-button,.smui-button__group>.smui-button__group-item>.mdc-button{margin-left:0;margin-right:0}.smui-button__group>.mdc-button:not(:last-child),.smui-button__group>.smui-button__group-item:not(:last-child)>.mdc-button{border-top-right-radius:0;border-bottom-right-radius:0}.smui-button__group>.mdc-button:not(:first-child),.smui-button__group>.smui-button__group-item:not(:first-child)>.mdc-button{border-top-left-radius:0;border-bottom-left-radius:0}.smui-button__group.smui-button__group--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--raised,.smui-button__group>.smui-button__group-item>.mdc-button--raised{border-radius:4px;box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--raised.mdc-button--dense,.smui-button__group>.smui-button__group-item>.mdc-button--raised.mdc-button--dense{border-radius:4px}.smui-button__group>.mdc-button--raised:active,.smui-button__group>.mdc-button--raised:disabled,.smui-button__group>.mdc-button--raised:focus,.smui-button__group>.mdc-button--raised:hover,.smui-button__group>.smui-button__group-item>.mdc-button--raised:active,.smui-button__group>.smui-button__group-item>.mdc-button--raised:disabled,.smui-button__group>.smui-button__group-item>.mdc-button--raised:focus,.smui-button__group>.smui-button__group-item>.mdc-button--raised:hover{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--outlined:not(:last-child),.smui-button__group>.smui-button__group-item:not(:last-child)>.mdc-button--outlined{border-right-width:0}";
styleInject(css_248z$2);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "node_modules/@smui/common/A.svelte";

function create_fragment$8(ctx) {
  var a;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[5].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[4], null);
  var a_levels = [{
    href:
    /*href*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[3], ["use", "href"])];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$6, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, a,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[2].call(null, a))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[4], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[4], dirty, null));
        }
      }

      set_attributes(a, get_spread_update(a_levels, [dirty &
      /*href*/
      2 && {
        href:
        /*href*/
        ctx[1]
      }, dirty &
      /*exclude, $$props*/
      8 && exclude(
      /*$$props*/
      ctx[3], ["use", "href"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$href = _$$props2.href,
      href = _$$props2$href === void 0 ? "javascript:void(0);" : _$$props2$href;
  var _$$props3 = $$props,
      _$$props3$$$slots = _$$props3.$$slots,
      $$slots = _$$props3$$$slots === void 0 ? {} : _$$props3$$$slots,
      $$scope = _$$props3.$$scope;
  validate_slots("A", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
    if ("$$scope" in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      href: href
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, href, forwardEvents, $$props, $$scope, $$slots];
}

var A = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(A, _SvelteComponentDev);

  var _super = _createSuper$9(A);

  function A(options) {
    var _this;

    _classCallCheck(this, A);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      use: 0,
      href: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "A",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }

  _createClass(A, [{
    key: "use",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return A;
}(SvelteComponentDev);

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "node_modules/@smui/common/Button.svelte";

function create_fragment$9(ctx) {
  var button;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var button_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var button_data = {};

  for (var i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }

  var block = {
    c: function create() {
      button = element("button");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {});
      var button_nodes = children(button);
      if (default_slot) default_slot.l(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(button, button_data);
      add_location(button, file$7, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, button, anchor);

      if (default_slot) {
        default_slot.m(button, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, button,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, button))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(button, get_spread_update(button_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$9($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("Button", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var Button = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Button, _SvelteComponentDev);

  var _super = _createSuper$a(Button);

  function Button(options) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Button",
      options: options,
      id: create_fragment$9.name
    });
    return _this;
  }

  _createClass(Button, [{
    key: "use",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Button;
}(SvelteComponentDev);

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug'; // Append to head instead of body because this script might be invoked in the
  // head, in which case the body doesn't exist yet. The probe works either way.

  document.head.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';

  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  return hasPseudoVarBug;
}

function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return false;
  }

  var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVars = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVars = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }

  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return {
      x: 0,
      y: 0
    };
  }

  var x = pageOffset.x,
      y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY; // Determine touch point relative to the ripple container.

  if (evt.type === 'touchstart') {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from applyPassive to avoid redundant processing to detect
 * passive event listener support.
 */
var supportsPassive_;
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */

function applyPassive(globalObj, forceRefresh) {
  if (globalObj === void 0) {
    globalObj = window;
  }

  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported_1 = false;

    try {
      globalObj.document.addEventListener('test', function () {
        return undefined;
      }, {
        get passive() {
          isSupported_1 = true;
          return isSupported_1;
        }

      });
    } catch (e) {} // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.


    supportsPassive_ = isSupported_1;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$5 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
var strings$5 = {
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top'
};
var numbers$3 = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

var activatedTargets = [];

var MDCRippleFoundation =
/** @class */
function (_super) {
  __extends(MDCRippleFoundation, _super);

  function MDCRippleFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;

    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = '0';
    _this.frame_ = {
      width: 0,
      height: 0
    };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    _this.activationState_ = _this.defaultActivationState_();

    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;

      _this.runDeactivationUXLogicIfReady_();
    };

    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    _this.deactivateHandler_ = function () {
      return _this.deactivate_();
    };

    _this.focusHandler_ = function () {
      return _this.handleFocus();
    };

    _this.blurHandler_ = function () {
      return _this.handleBlur();
    };

    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCRippleFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "strings", {
    get: function get() {
      return strings$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "numbers", {
    get: function get() {
      return numbers$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClass: function addClass() {
          return undefined;
        },
        browserSupportsCssVars: function browserSupportsCssVars() {
          return true;
        },
        computeBoundingRect: function computeBoundingRect() {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        containsEventTarget: function containsEventTarget() {
          return true;
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() {
          return undefined;
        },
        deregisterInteractionHandler: function deregisterInteractionHandler() {
          return undefined;
        },
        deregisterResizeHandler: function deregisterResizeHandler() {
          return undefined;
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return {
            x: 0,
            y: 0
          };
        },
        isSurfaceActive: function isSurfaceActive() {
          return true;
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return true;
        },
        isUnbounded: function isUnbounded() {
          return true;
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() {
          return undefined;
        },
        registerInteractionHandler: function registerInteractionHandler() {
          return undefined;
        },
        registerResizeHandler: function registerResizeHandler() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        updateCssVariable: function updateCssVariable() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCRippleFoundation.prototype.init = function () {
    var _this = this;

    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      var _a = MDCRippleFoundation.cssClasses,
          ROOT_1 = _a.ROOT,
          UNBOUNDED_1 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.addClass(ROOT_1);

        if (_this.adapter_.isUnbounded()) {
          _this.adapter_.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


          _this.layoutInternal_();
        }
      });
    }
  };

  MDCRippleFoundation.prototype.destroy = function () {
    var _this = this;

    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _a = MDCRippleFoundation.cssClasses,
          ROOT_2 = _a.ROOT,
          UNBOUNDED_2 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.removeClass(ROOT_2);

        _this.adapter_.removeClass(UNBOUNDED_2);

        _this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  /**
   * @param evt Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function (evt) {
    this.activate_(evt);
  };

  MDCRippleFoundation.prototype.deactivate = function () {
    this.deactivate_();
  };

  MDCRippleFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };

  MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   */


  MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
    return this.adapter_.browserSupportsCssVars();
  };

  MDCRippleFoundation.prototype.defaultActivationState_ = function () {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  /**
   * supportsPressRipple Passed from init to save a redundant function call
   */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
    var _this = this;

    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  };

  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
    var _this = this;

    if (evt.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };

  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
    var _this = this;

    ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
    var _this = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };

  MDCRippleFoundation.prototype.removeCssVars_ = function () {
    var _this = this;

    var rippleStrings = MDCRippleFoundation.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function (key) {
      if (key.indexOf('VAR_') === 0) {
        _this.adapter_.updateCssVariable(rippleStrings[key], null);
      }
    });
  };

  MDCRippleFoundation.prototype.activate_ = function (evt) {
    var _this = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
    var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this.adapter_.containsEventTarget(target);
    });

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);

        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
    return evt !== undefined && evt.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  };

  MDCRippleFoundation.prototype.animateActivation_ = function () {
    var _this = this;

    var _a = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
    var _b = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _b.FG_DEACTIVATION,
        FG_ACTIVATION = _b.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(),
          startPoint = _c.startPoint,
          endPoint = _c.endPoint;

      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
    var _a = this.activationState_,
        activationEvent = _a.activationEvent,
        wasActivatedByPointer = _a.wasActivatedByPointer;
    var startPoint;

    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint: startPoint,
      endPoint: endPoint
    };
  };

  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
    var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.


    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _a = this.activationState_,
        hasDeactivationUXRun = _a.hasDeactivationUXRun,
        isActivated = _a.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers$3.FG_DEACTIVATION_MS);
    }
  };

  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function () {
    var _this = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(function () {
      return _this.previousActivationEvent_ = undefined;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  MDCRippleFoundation.prototype.deactivate_ = function () {
    var _this = this;

    var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    var state = _assign({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(function () {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this.activationState_.hasDeactivationUXRun = true;

        _this.animateDeactivation_(state);

        _this.resetActivationState_();
      });
    }
  };

  MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
    var wasActivatedByPointer = _a.wasActivatedByPointer,
        wasElementMadeActive = _a.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layoutInternal_ = function () {
    var _this = this;

    this.frame_ = this.adapter_.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    var getBoundedRadius = function getBoundedRadius() {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };

  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
    var _a = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _a.VAR_FG_SIZE,
        VAR_LEFT = _a.VAR_LEFT,
        VAR_TOP = _a.VAR_TOP,
        VAR_FG_SCALE = _a.VAR_FG_SCALE;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };

  return MDCRippleFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCRipple =
/** @class */
function (_super) {
  __extends(MDCRipple, _super);

  function MDCRipple() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.disabled = false;
    return _this;
  }

  MDCRipple.attachTo = function (root, opts) {
    if (opts === void 0) {
      opts = {
        isUnbounded: undefined
      };
    }

    var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (opts.isUnbounded !== undefined) {
      ripple.unbounded = opts.isUnbounded;
    }

    return ripple;
  };

  MDCRipple.createAdapter = function (instance) {
    return {
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      containsEventTarget: function containsEventTarget(target) {
        return instance.root_.contains(target);
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      isSurfaceActive: function isSurfaceActive() {
        return matches$1(instance.root_, ':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return Boolean(instance.disabled);
      },
      isUnbounded: function isUnbounded() {
        return Boolean(instance.unbounded);
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      }
    };
  };

  Object.defineProperty(MDCRipple.prototype, "unbounded", {
    get: function get() {
      return Boolean(this.unbounded_);
    },
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    },
    enumerable: true,
    configurable: true
  });

  MDCRipple.prototype.activate = function () {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function () {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function () {
    this.foundation_.layout();
  };

  MDCRipple.prototype.getDefaultFoundation = function () {
    return new MDCRippleFoundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function () {
    var root = this.root_;
    this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
  };
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   */


  MDCRipple.prototype.setUnbounded_ = function () {
    this.foundation_.setUnbounded(Boolean(this.unbounded_));
  };

  return MDCRipple;
}(MDCComponent);

function Ripple(node) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    ripple: false,
    unbounded: false,
    color: null,
    classForward: function classForward() {}
  };
  var instance = null;
  var addLayoutListener = getContext('SMUI:addLayoutListener');
  var removeLayoutListener;
  var classList = [];

  function addClass(className) {
    var idx = classList.indexOf(className);

    if (idx === -1) {
      node.classList.add(className);
      classList.push(className);

      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function removeClass(className) {
    var idx = classList.indexOf(className);

    if (idx !== -1) {
      node.classList.remove(className);
      classList.splice(idx, 1);

      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function handleProps() {
    if (props.ripple && !instance) {
      // Override the Ripple component's adapter, so that we can forward classes
      // to Svelte components that overwrite Ripple's classes.
      var _createAdapter = MDCRipple.createAdapter;

      MDCRipple.createAdapter = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var adapter = _createAdapter.apply(this, args);

        adapter.addClass = function (className) {
          return addClass(className);
        };

        adapter.removeClass = function (className) {
          return removeClass(className);
        };

        return adapter;
      };

      instance = new MDCRipple(node);
      MDCRipple.createAdapter = _createAdapter;
    } else if (instance && !props.ripple) {
      instance.destroy();
      instance = null;
    }

    if (props.ripple) {
      instance.unbounded = !!props.unbounded;

      switch (props.color) {
        case 'surface':
          addClass('mdc-ripple-surface');
          removeClass('mdc-ripple-surface--primary');
          removeClass('mdc-ripple-surface--accent');
          return;

        case 'primary':
          addClass('mdc-ripple-surface');
          addClass('mdc-ripple-surface--primary');
          removeClass('mdc-ripple-surface--accent');
          return;

        case 'secondary':
          addClass('mdc-ripple-surface');
          removeClass('mdc-ripple-surface--primary');
          addClass('mdc-ripple-surface--accent');
          return;
      }
    }

    removeClass('mdc-ripple-surface');
    removeClass('mdc-ripple-surface--primary');
    removeClass('mdc-ripple-surface--accent');
  }

  handleProps();

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  function layout() {
    if (instance) {
      instance.layout();
    }
  }

  return {
    update: function update() {
      var newProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        ripple: false,
        unbounded: false,
        color: null,
        classForward: []
      };
      props = newProps;
      handleProps();
    },
    destroy: function destroy() {
      if (instance) {
        instance.destroy();
        instance = null;
        removeClass('mdc-ripple-surface');
        removeClass('mdc-ripple-surface--primary');
        removeClass('mdc-ripple-surface--accent');
      }

      if (removeLayoutListener) {
        removeLayoutListener();
      }
    }
  };
}

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot$2(ctx) {
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[17].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[19], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        524288) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[19], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[19], dirty, null));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$2.name,
    type: "slot",
    source: "(1:0) <svelte:component   this={component}   use={[[Ripple, {ripple, unbounded: false, classForward: classes => rippleClasses = classes}], forwardEvents, ...use]}   class=\\\"     mdc-button     {className}     {rippleClasses.join(' ')}     {variant === 'raised' ? 'mdc-button--raised' : ''}     {variant === 'unelevated' ? 'mdc-button--unelevated' : ''}     {variant === 'outlined' ? 'mdc-button--outlined' : ''}     {dense ? 'mdc-button--dense' : ''}     {color === 'secondary' ? 'smui-button--color-secondary' : ''}     {context === 'card:action' ? 'mdc-card__action' : ''}     {context === 'card:action' ? 'mdc-card__action--button' : ''}     {context === 'dialog:action' ? 'mdc-dialog__button' : ''}     {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}     {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}     {context === 'snackbar' ? 'mdc-snackbar__action' : ''}   \\\"   {...actionProp}   {...defaultProp}   {...exclude($$props, ['use', 'class', 'ripple', 'color', 'variant', 'dense', ...dialogExcludes])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$a(ctx) {
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [{
    use: [[Ripple, {
      ripple:
      /*ripple*/
      ctx[2],
      unbounded: false,
      classForward:
      /*func*/
      ctx[18]
    }],
    /*forwardEvents*/
    ctx[11]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    class: "\n    mdc-button\n    " +
    /*className*/
    ctx[1] + "\n    " +
    /*rippleClasses*/
    ctx[7].join(" ") + "\n    " + (
    /*variant*/
    ctx[4] === "raised" ? "mdc-button--raised" : "") + "\n    " + (
    /*variant*/
    ctx[4] === "unelevated" ? "mdc-button--unelevated" : "") + "\n    " + (
    /*variant*/
    ctx[4] === "outlined" ? "mdc-button--outlined" : "") + "\n    " + (
    /*dense*/
    ctx[5] ? "mdc-button--dense" : "") + "\n    " + (
    /*color*/
    ctx[3] === "secondary" ? "smui-button--color-secondary" : "") + "\n    " + (
    /*context*/
    ctx[12] === "card:action" ? "mdc-card__action" : "") + "\n    " + (
    /*context*/
    ctx[12] === "card:action" ? "mdc-card__action--button" : "") + "\n    " + (
    /*context*/
    ctx[12] === "dialog:action" ? "mdc-dialog__button" : "") + "\n    " + (
    /*context*/
    ctx[12] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n    " + (
    /*context*/
    ctx[12] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n    " + (
    /*context*/
    ctx[12] === "snackbar" ? "mdc-snackbar__action" : "") + "\n  "
  },
  /*actionProp*/
  ctx[9],
  /*defaultProp*/
  ctx[10], exclude(
  /*$$props*/
  ctx[13], ["use", "class", "ripple", "color", "variant", "dense"].concat(_toConsumableArray(
  /*dialogExcludes*/
  ctx[8])))];
  var switch_value =
  /*component*/
  ctx[6];

  function switch_props(ctx) {
    var switch_instance_props = {
      $$slots: {
        default: [create_default_slot$2]
      },
      $$scope: {
        ctx: ctx
      }
    };

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props(ctx));
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = dirty &
      /*Ripple, ripple, rippleClasses, forwardEvents, use, className, variant, dense, color, context, actionProp, defaultProp, exclude, $$props, dialogExcludes*/
      16319 ? get_spread_update(switch_instance_spread_levels, [dirty &
      /*Ripple, ripple, rippleClasses, forwardEvents, use*/
      2181 && {
        use: [[Ripple, {
          ripple:
          /*ripple*/
          ctx[2],
          unbounded: false,
          classForward:
          /*func*/
          ctx[18]
        }],
        /*forwardEvents*/
        ctx[11]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty &
      /*className, rippleClasses, variant, dense, color, context*/
      4282 && {
        class: "\n    mdc-button\n    " +
        /*className*/
        ctx[1] + "\n    " +
        /*rippleClasses*/
        ctx[7].join(" ") + "\n    " + (
        /*variant*/
        ctx[4] === "raised" ? "mdc-button--raised" : "") + "\n    " + (
        /*variant*/
        ctx[4] === "unelevated" ? "mdc-button--unelevated" : "") + "\n    " + (
        /*variant*/
        ctx[4] === "outlined" ? "mdc-button--outlined" : "") + "\n    " + (
        /*dense*/
        ctx[5] ? "mdc-button--dense" : "") + "\n    " + (
        /*color*/
        ctx[3] === "secondary" ? "smui-button--color-secondary" : "") + "\n    " + (
        /*context*/
        ctx[12] === "card:action" ? "mdc-card__action" : "") + "\n    " + (
        /*context*/
        ctx[12] === "card:action" ? "mdc-card__action--button" : "") + "\n    " + (
        /*context*/
        ctx[12] === "dialog:action" ? "mdc-dialog__button" : "") + "\n    " + (
        /*context*/
        ctx[12] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n    " + (
        /*context*/
        ctx[12] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n    " + (
        /*context*/
        ctx[12] === "snackbar" ? "mdc-snackbar__action" : "") + "\n  "
      }, dirty &
      /*actionProp*/
      512 && get_spread_object(
      /*actionProp*/
      ctx[9]), dirty &
      /*defaultProp*/
      1024 && get_spread_object(
      /*defaultProp*/
      ctx[10]), dirty &
      /*exclude, $$props, dialogExcludes*/
      8448 && get_spread_object(exclude(
      /*$$props*/
      ctx[13], ["use", "class", "ripple", "color", "variant", "dense"].concat(_toConsumableArray(
      /*dialogExcludes*/
      ctx[8]))))]) : {};

      if (dirty &
      /*$$scope*/
      524288) {
        switch_instance_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (switch_value !== (switch_value =
      /*component*/
      ctx[6])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$a($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$ripple = _$$props3.ripple,
      ripple = _$$props3$ripple === void 0 ? true : _$$props3$ripple;
  var _$$props4 = $$props,
      _$$props4$color = _$$props4.color,
      color = _$$props4$color === void 0 ? "primary" : _$$props4$color;
  var _$$props5 = $$props,
      _$$props5$variant = _$$props5.variant,
      variant = _$$props5$variant === void 0 ? "text" : _$$props5$variant;
  var _$$props6 = $$props,
      _$$props6$dense = _$$props6.dense,
      dense = _$$props6$dense === void 0 ? false : _$$props6$dense;
  var _$$props7 = $$props,
      _$$props7$href = _$$props7.href,
      href = _$$props7$href === void 0 ? null : _$$props7$href;
  var _$$props8 = $$props,
      _$$props8$action = _$$props8.action,
      action = _$$props8$action === void 0 ? "close" : _$$props8$action;
  var _$$props9 = $$props,
      _$$props9$default = _$$props9.default,
      defaultAction = _$$props9$default === void 0 ? false : _$$props9$default;
  var _$$props10 = $$props,
      _$$props10$component = _$$props10.component,
      component = _$$props10$component === void 0 ? href == null ? Button : A : _$$props10$component;
  var context = getContext("SMUI:button:context");
  var rippleClasses = [];
  setContext("SMUI:label:context", "button");
  setContext("SMUI:icon:context", "button");
  var _$$props11 = $$props,
      _$$props11$$$slots = _$$props11.$$slots,
      $$slots = _$$props11$$$slots === void 0 ? {} : _$$props11$$$slots,
      $$scope = _$$props11.$$scope;
  validate_slots("Button", $$slots, ['default']);

  var func = function func(classes) {
    return $$invalidate(7, rippleClasses = classes);
  };

  $$self.$set = function ($$new_props) {
    $$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(3, color = $$new_props.color);
    if ("variant" in $$new_props) $$invalidate(4, variant = $$new_props.variant);
    if ("dense" in $$new_props) $$invalidate(5, dense = $$new_props.dense);
    if ("href" in $$new_props) $$invalidate(14, href = $$new_props.href);
    if ("action" in $$new_props) $$invalidate(15, action = $$new_props.action);
    if ("default" in $$new_props) $$invalidate(16, defaultAction = $$new_props.default);
    if ("component" in $$new_props) $$invalidate(6, component = $$new_props.component);
    if ("$$scope" in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      getContext: getContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      A: A,
      Button: Button,
      Ripple: Ripple,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      variant: variant,
      dense: dense,
      href: href,
      action: action,
      defaultAction: defaultAction,
      component: component,
      context: context,
      rippleClasses: rippleClasses,
      dialogExcludes: dialogExcludes,
      actionProp: actionProp,
      defaultProp: defaultProp
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(3, color = $$new_props.color);
    if ("variant" in $$props) $$invalidate(4, variant = $$new_props.variant);
    if ("dense" in $$props) $$invalidate(5, dense = $$new_props.dense);
    if ("href" in $$props) $$invalidate(14, href = $$new_props.href);
    if ("action" in $$props) $$invalidate(15, action = $$new_props.action);
    if ("defaultAction" in $$props) $$invalidate(16, defaultAction = $$new_props.defaultAction);
    if ("component" in $$props) $$invalidate(6, component = $$new_props.component);
    if ("context" in $$props) $$invalidate(12, context = $$new_props.context);
    if ("rippleClasses" in $$props) $$invalidate(7, rippleClasses = $$new_props.rippleClasses);
    if ("dialogExcludes" in $$props) $$invalidate(8, dialogExcludes = $$new_props.dialogExcludes);
    if ("actionProp" in $$props) $$invalidate(9, actionProp = $$new_props.actionProp);
    if ("defaultProp" in $$props) $$invalidate(10, defaultProp = $$new_props.defaultProp);
  };

  var dialogExcludes;
  var actionProp;
  var defaultProp;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*action*/
    32768) {
       $$invalidate(9, actionProp = context === "dialog:action" && action !== null ? {
        "data-mdc-dialog-action": action
      } : {});
    }

    if ($$self.$$.dirty &
    /*defaultAction*/
    65536) {
       $$invalidate(10, defaultProp = context === "dialog:action" && defaultAction ? {
        "data-mdc-dialog-button-default": ""
      } : {});
    }
  };

   $$invalidate(8, dialogExcludes = context === "dialog:action" ? ["action", "default"] : []);

  $$props = exclude_internal_props($$props);
  return [use, className, ripple, color, variant, dense, component, rippleClasses, dialogExcludes, actionProp, defaultProp, forwardEvents, context, $$props, href, action, defaultAction, $$slots, func, $$scope];
}

var Button_1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Button_1, _SvelteComponentDev);

  var _super = _createSuper$b(Button_1);

  function Button_1(options) {
    var _this;

    _classCallCheck(this, Button_1);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
      use: 0,
      class: 1,
      ripple: 2,
      color: 3,
      variant: 4,
      dense: 5,
      href: 14,
      action: 15,
      default: 16,
      component: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Button_1",
      options: options,
      id: create_fragment$a.name
    });
    return _this;
  }

  _createClass(Button_1, [{
    key: "use",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "variant",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "dense",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "action",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "default",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "component",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Button_1;
}(SvelteComponentDev);

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "node_modules/@smui/common/Label.svelte";

function create_fragment$b(ctx) {
  var span;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[5], null);
  var span_levels = [{
    class: "\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*context*/
    ctx[3] === "button" ? "mdc-button__label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "fab" ? "mdc-fab__label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "chip" ? "mdc-chip__text" : "") + "\n    " + (
    /*context*/
    ctx[3] === "tab" ? "mdc-tab__text-label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "image-list" ? "mdc-image-list__label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "snackbar" ? "mdc-snackbar__label" : "") + "\n  "
  },
  /*context*/
  ctx[3] === "snackbar" ? {
    role: "status",
    "aria-live": "polite"
  } : {}, exclude(
  /*$$props*/
  ctx[4], ["use", "class"])];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$8, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, span,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[2].call(null, span))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[5], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[5], dirty, null));
        }
      }

      set_attributes(span, get_spread_update(span_levels, [dirty &
      /*className, context*/
      10 && {
        class: "\n    " +
        /*className*/
        ctx[1] + "\n    " + (
        /*context*/
        ctx[3] === "button" ? "mdc-button__label" : "") + "\n    " + (
        /*context*/
        ctx[3] === "fab" ? "mdc-fab__label" : "") + "\n    " + (
        /*context*/
        ctx[3] === "chip" ? "mdc-chip__text" : "") + "\n    " + (
        /*context*/
        ctx[3] === "tab" ? "mdc-tab__text-label" : "") + "\n    " + (
        /*context*/
        ctx[3] === "image-list" ? "mdc-image-list__label" : "") + "\n    " + (
        /*context*/
        ctx[3] === "snackbar" ? "mdc-snackbar__label" : "") + "\n  "
      }, dirty &
      /*context*/
      8 && (
      /*context*/
      ctx[3] === "snackbar" ? {
        role: "status",
        "aria-live": "polite"
      } : {}), dirty &
      /*exclude, $$props*/
      16 && exclude(
      /*$$props*/
      ctx[4], ["use", "class"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$b($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var context = getContext("SMUI:label:context");
  var _$$props3 = $$props,
      _$$props3$$$slots = _$$props3.$$slots,
      $$slots = _$$props3$$$slots === void 0 ? {} : _$$props3$$$slots,
      $$scope = _$$props3.$$scope;
  validate_slots("Label", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      context: context
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, forwardEvents, context, $$props, $$scope, $$slots];
}

var Label = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Label, _SvelteComponentDev);

  var _super = _createSuper$c(Label);

  function Label(options) {
    var _this;

    _classCallCheck(this, Label);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      use: 0,
      class: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Label",
      options: options,
      id: create_fragment$b.name
    });
    return _this;
  }

  _createClass(Label, [{
    key: "use",
    get: function get() {
      throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Label;
}(SvelteComponentDev);

var css_248z$3 = "body{background-color:#000;color:#fff}.mdc-list{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:#fff;color:var(--mdc-theme-text-primary-on-background,#fff)}.mdc-list:focus{outline:none}.mdc-list-item__secondary-text{color:hsla(0,0%,100%,.7);color:var(--mdc-theme-text-secondary-on-background,hsla(0,0%,100%,.7))}.mdc-list-item__graphic{background-color:transparent;color:hsla(0,0%,100%,.5);color:var(--mdc-theme-text-icon-on-background,hsla(0,0%,100%,.5))}.mdc-list-item__meta{color:hsla(0,0%,100%,.5);color:var(--mdc-theme-text-hint-on-background,hsla(0,0%,100%,.5))}.mdc-list-group__subheader{color:#fff;color:var(--mdc-theme-text-primary-on-background,#fff)}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;height:48px;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item--activated,.mdc-list-item--activated .mdc-list-item__graphic,.mdc-list-item--selected,.mdc-list-item--selected .mdc-list-item__graphic{color:#fc0;color:var(--mdc-theme-primary,#fc0)}.mdc-list-item--disabled{color:hsla(0,0%,100%,.5);color:var(--mdc-theme-text-disabled-on-background,hsla(0,0%,100%,.5))}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item__meta:not(.material-icons){font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.03333em;text-decoration:inherit;text-transform:inherit}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-list-item__primary-text:before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text:before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.01786em;text-decoration:inherit;text-transform:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:0;line-height:normal;display:block}.mdc-list-item__secondary-text:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{display:block;margin-top:0;line-height:normal;font-size:inherit}.mdc-list--dense .mdc-list-item__secondary-text:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item,.mdc-list--two-line.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom:1px solid;border-bottom-color:hsla(0,0%,100%,.2)}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 88px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;margin:.75rem 16px}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{top:-50%;left:-50%;width:200%;height:200%}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{background-color:#fff}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:hover:before{opacity:.08}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{background-color:#fc0}@supports not (-ms-ime-align:auto){:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{background-color:var(--mdc-theme-primary,#fc0)}}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:hover:before{opacity:.32}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.48}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.48}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.48}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{opacity:.16}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{background-color:#fc0}@supports not (-ms-ime-align:auto){:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{background-color:var(--mdc-theme-primary,#fc0)}}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:hover:before{opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.4}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.4}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.4}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{top:-50%;left:-50%;width:200%;height:200%}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{background-color:#fff}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#fff}.mdc-ripple-surface:hover:before{opacity:.08}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-ripple-surface--primary:hover:before{opacity:.08}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#fc0)}}.mdc-ripple-surface--accent:hover:before{opacity:.08}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-list--three-line .mdc-list-item__text{align-self:flex-start}.smui-list--three-line .mdc-list-item{height:88px}.smui-list--three-line.mdc-list--dense .mdc-list-item{height:76px}";
styleInject(css_248z$3);

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "node_modules/@smui/list/List.svelte"; // (18:0) {:else}

function create_else_block(ctx) {
  var ul;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[29].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[28], null);
  var ul_levels = [{
    class: "\n      mdc-list\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*nonInteractive*/
    ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
    /*dense*/
    ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
    /*avatarList*/
    ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
    /*twoLine*/
    ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
    /*threeLine*/
    ctx[6] && !
    /*twoLine*/
    ctx[5] ? "smui-list--three-line" : "") + "\n    "
  }, {
    role:
    /*role*/
    ctx[8]
  },
  /*props*/
  ctx[9]];
  var ul_data = {};

  for (var i = 0; i < ul_levels.length; i += 1) {
    ul_data = assign(ul_data, ul_levels[i]);
  }

  var block = {
    c: function create() {
      ul = element("ul");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true,
        role: true
      });
      var ul_nodes = children(ul);
      if (default_slot) default_slot.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(ul, ul_data);
      add_location(ul, file$9, 18, 2, 478);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, ul, anchor);

      if (default_slot) {
        default_slot.m(ul, null);
      }
      /*ul_binding*/


      ctx[31](ul);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, ul,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[10].call(null, ul)), listen_dev(ul, "MDCList:action",
      /*handleAction*/
      ctx[12], false, false, false)];
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        268435456) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[28], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[28], dirty, null));
        }
      }

      set_attributes(ul, get_spread_update(ul_levels, [dirty[0] &
      /*className, nonInteractive, dense, avatarList, twoLine, threeLine*/
      126 && {
        class: "\n      mdc-list\n      " +
        /*className*/
        ctx[1] + "\n      " + (
        /*nonInteractive*/
        ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
        /*dense*/
        ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
        /*avatarList*/
        ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
        /*twoLine*/
        ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
        /*threeLine*/
        ctx[6] && !
        /*twoLine*/
        ctx[5] ? "smui-list--three-line" : "") + "\n    "
      }, dirty[0] &
      /*role*/
      256 && {
        role:
        /*role*/
        ctx[8]
      }, dirty[0] &
      /*props*/
      512 &&
      /*props*/
      ctx[9]]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      if (default_slot) default_slot.d(detaching);
      /*ul_binding*/

      ctx[31](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(18:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if nav}


function create_if_block(ctx) {
  var nav_1;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[29].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[28], null);
  var nav_1_levels = [{
    class: "\n      mdc-list\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*nonInteractive*/
    ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
    /*dense*/
    ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
    /*avatarList*/
    ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
    /*twoLine*/
    ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
    /*threeLine*/
    ctx[6] && !
    /*twoLine*/
    ctx[5] ? "smui-list--three-line" : "") + "\n    "
  },
  /*props*/
  ctx[9]];
  var nav_1_data = {};

  for (var i = 0; i < nav_1_levels.length; i += 1) {
    nav_1_data = assign(nav_1_data, nav_1_levels[i]);
  }

  var block = {
    c: function create() {
      nav_1 = element("nav");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      nav_1 = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_1_nodes = children(nav_1);
      if (default_slot) default_slot.l(nav_1_nodes);
      nav_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(nav_1, nav_1_data);
      add_location(nav_1, file$9, 1, 2, 12);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, nav_1, anchor);

      if (default_slot) {
        default_slot.m(nav_1, null);
      }
      /*nav_1_binding*/


      ctx[30](nav_1);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, nav_1,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[10].call(null, nav_1)), listen_dev(nav_1, "MDCList:action",
      /*handleAction*/
      ctx[12], false, false, false)];
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        268435456) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[28], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[28], dirty, null));
        }
      }

      set_attributes(nav_1, get_spread_update(nav_1_levels, [dirty[0] &
      /*className, nonInteractive, dense, avatarList, twoLine, threeLine*/
      126 && {
        class: "\n      mdc-list\n      " +
        /*className*/
        ctx[1] + "\n      " + (
        /*nonInteractive*/
        ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
        /*dense*/
        ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
        /*avatarList*/
        ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
        /*twoLine*/
        ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
        /*threeLine*/
        ctx[6] && !
        /*twoLine*/
        ctx[5] ? "smui-list--three-line" : "") + "\n    "
      }, dirty[0] &
      /*props*/
      512 &&
      /*props*/
      ctx[9]]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav_1);
      if (default_slot) default_slot.d(detaching);
      /*nav_1_binding*/

      ctx[30](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(1:0) {#if nav}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*nav*/
    ctx[11]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if_block.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$c($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCList:action"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$nonInteract = _$$props3.nonInteractive,
      nonInteractive = _$$props3$nonInteract === void 0 ? false : _$$props3$nonInteract;
  var _$$props4 = $$props,
      _$$props4$dense = _$$props4.dense,
      dense = _$$props4$dense === void 0 ? false : _$$props4$dense;
  var _$$props5 = $$props,
      _$$props5$avatarList = _$$props5.avatarList,
      avatarList = _$$props5$avatarList === void 0 ? false : _$$props5$avatarList;
  var _$$props6 = $$props,
      _$$props6$twoLine = _$$props6.twoLine,
      twoLine = _$$props6$twoLine === void 0 ? false : _$$props6$twoLine;
  var _$$props7 = $$props,
      _$$props7$threeLine = _$$props7.threeLine,
      threeLine = _$$props7$threeLine === void 0 ? false : _$$props7$threeLine;
  var _$$props8 = $$props,
      _$$props8$vertical = _$$props8.vertical,
      vertical = _$$props8$vertical === void 0 ? true : _$$props8$vertical;
  var _$$props9 = $$props,
      _$$props9$wrapFocus = _$$props9.wrapFocus,
      wrapFocus = _$$props9$wrapFocus === void 0 ? false : _$$props9$wrapFocus;
  var _$$props10 = $$props,
      _$$props10$singleSele = _$$props10.singleSelection,
      singleSelection = _$$props10$singleSele === void 0 ? false : _$$props10$singleSele;
  var _$$props11 = $$props,
      _$$props11$selectedIn = _$$props11.selectedIndex,
      selectedIndex = _$$props11$selectedIn === void 0 ? null : _$$props11$selectedIn;
  var _$$props12 = $$props,
      _$$props12$radiolist = _$$props12.radiolist,
      radiolist = _$$props12$radiolist === void 0 ? false : _$$props12$radiolist;
  var _$$props13 = $$props,
      _$$props13$checklist = _$$props13.checklist,
      checklist = _$$props13$checklist === void 0 ? false : _$$props13$checklist;
  var element;
  var list;
  var role = getContext("SMUI:list:role");
  var nav = getContext("SMUI:list:nav");
  var instantiate = getContext("SMUI:list:instantiate");
  var getInstance = getContext("SMUI:list:getInstance");
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  setContext("SMUI:list:nonInteractive", nonInteractive);

  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radiolist) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checklist) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", undefined);
    }
  }

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(22, list = new MDCList(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = list = _context.sent;
            (0, _context.t0)(22, _context.t1);

          case 9:
            if (singleSelection) {
              list.initializeListType();
              $$invalidate(13, selectedIndex = list.selectedIndex);
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (instantiate !== false) {
      list && list.destroy();
    }

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function handleAction(e) {
    if (list && list.listElements[e.detail.index].classList.contains("mdc-list-item--disabled")) {
      e.preventDefault();
      $$invalidate(22, list.selectedIndex = selectedIndex, list);
    } else if (list && list.selectedIndex === e.detail.index) {
      $$invalidate(13, selectedIndex = e.detail.index);
    }
  }

  function layout() {
    var _list;

    return (_list = list).layout.apply(_list, arguments);
  }

  function setEnabled() {
    var _list2;

    return (_list2 = list).setEnabled.apply(_list2, arguments);
  }

  function getDefaultFoundation() {
    var _list3;

    return (_list3 = list).getDefaultFoundation.apply(_list3, arguments);
  }

  var _$$props14 = $$props,
      _$$props14$$$slots = _$$props14.$$slots,
      $$slots = _$$props14$$$slots === void 0 ? {} : _$$props14$$$slots,
      $$scope = _$$props14.$$scope;
  validate_slots("List", $$slots, ['default']);

  function nav_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(7, element = $$value);
    });
  }

  function ul_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(7, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(27, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("nonInteractive" in $$new_props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$new_props) $$invalidate(3, dense = $$new_props.dense);
    if ("avatarList" in $$new_props) $$invalidate(4, avatarList = $$new_props.avatarList);
    if ("twoLine" in $$new_props) $$invalidate(5, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$new_props) $$invalidate(6, threeLine = $$new_props.threeLine);
    if ("vertical" in $$new_props) $$invalidate(14, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$new_props) $$invalidate(15, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$new_props) $$invalidate(16, singleSelection = $$new_props.singleSelection);
    if ("selectedIndex" in $$new_props) $$invalidate(13, selectedIndex = $$new_props.selectedIndex);
    if ("radiolist" in $$new_props) $$invalidate(17, radiolist = $$new_props.radiolist);
    if ("checklist" in $$new_props) $$invalidate(18, checklist = $$new_props.checklist);
    if ("$$scope" in $$new_props) $$invalidate(28, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCList: MDCList,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      nonInteractive: nonInteractive,
      dense: dense,
      avatarList: avatarList,
      twoLine: twoLine,
      threeLine: threeLine,
      vertical: vertical,
      wrapFocus: wrapFocus,
      singleSelection: singleSelection,
      selectedIndex: selectedIndex,
      radiolist: radiolist,
      checklist: checklist,
      element: element,
      list: list,
      role: role,
      nav: nav,
      instantiate: instantiate,
      getInstance: getInstance,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      handleAction: handleAction,
      layout: layout,
      setEnabled: setEnabled,
      getDefaultFoundation: getDefaultFoundation,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(27, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("nonInteractive" in $$props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$props) $$invalidate(3, dense = $$new_props.dense);
    if ("avatarList" in $$props) $$invalidate(4, avatarList = $$new_props.avatarList);
    if ("twoLine" in $$props) $$invalidate(5, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$props) $$invalidate(6, threeLine = $$new_props.threeLine);
    if ("vertical" in $$props) $$invalidate(14, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$props) $$invalidate(15, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$props) $$invalidate(16, singleSelection = $$new_props.singleSelection);
    if ("selectedIndex" in $$props) $$invalidate(13, selectedIndex = $$new_props.selectedIndex);
    if ("radiolist" in $$props) $$invalidate(17, radiolist = $$new_props.radiolist);
    if ("checklist" in $$props) $$invalidate(18, checklist = $$new_props.checklist);
    if ("element" in $$props) $$invalidate(7, element = $$new_props.element);
    if ("list" in $$props) $$invalidate(22, list = $$new_props.list);
    if ("role" in $$props) $$invalidate(8, role = $$new_props.role);
    if ("nav" in $$props) $$invalidate(11, nav = $$new_props.nav);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    if ("props" in $$props) $$invalidate(9, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(9, props = exclude($$props, ["use", "class", "nonInteractive", "dense", "avatarList", "twoLine", "threeLine", "vertical", "wrapFocus", "singleSelection", "selectedIndex", "radiolist", "checklist"]));

    if ($$self.$$.dirty[0] &
    /*list, vertical*/
    4210688) {
       if (list && list.vertical !== vertical) {
        $$invalidate(22, list.vertical = vertical, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, wrapFocus*/
    4227072) {
       if (list && list.wrapFocus !== wrapFocus) {
        $$invalidate(22, list.wrapFocus = wrapFocus, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, singleSelection*/
    4259840) {
       if (list && list.singleSelection !== singleSelection) {
        $$invalidate(22, list.singleSelection = singleSelection, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, singleSelection, selectedIndex*/
    4268032) {
       if (list && singleSelection && list.selectedIndex !== selectedIndex) {
        $$invalidate(22, list.selectedIndex = selectedIndex, list);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, nonInteractive, dense, avatarList, twoLine, threeLine, element, role, props, forwardEvents, nav, handleAction, selectedIndex, vertical, wrapFocus, singleSelection, radiolist, checklist, layout, setEnabled, getDefaultFoundation, list, removeLayoutListener, instantiate, getInstance, addLayoutListener, $$props, $$scope, $$slots, nav_1_binding, ul_binding];
}

var List = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(List, _SvelteComponentDev);

  var _super = _createSuper$d(List);

  function List(options) {
    var _this;

    _classCallCheck(this, List);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      use: 0,
      class: 1,
      nonInteractive: 2,
      dense: 3,
      avatarList: 4,
      twoLine: 5,
      threeLine: 6,
      vertical: 14,
      wrapFocus: 15,
      singleSelection: 16,
      selectedIndex: 13,
      radiolist: 17,
      checklist: 18,
      layout: 19,
      setEnabled: 20,
      getDefaultFoundation: 21
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "List",
      options: options,
      id: create_fragment$c.name
    });
    return _this;
  }

  _createClass(List, [{
    key: "use",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nonInteractive",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "dense",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "avatarList",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "twoLine",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "threeLine",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "vertical",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "wrapFocus",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "singleSelection",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "radiolist",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "checklist",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setEnabled",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[21];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return List;
}(SvelteComponentDev);

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$a = "node_modules/@smui/list/Item.svelte"; // (40:0) {:else}

function create_else_block$1(ctx) {
  var li;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[25].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[24], null);
  var li_levels = [{
    class: "\n      mdc-list-item\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n      " + (
    /*role*/
    ctx[6] === "menuitem" &&
    /*selected*/
    ctx[7] ? "mdc-menu-item--selected" : "") + "\n    "
  }, {
    role:
    /*role*/
    ctx[6]
  },
  /*role*/
  ctx[6] === "option" ? {
    "aria-selected":
    /*selected*/
    ctx[7] ? "true" : "false"
  } : {},
  /*role*/
  ctx[6] === "radio" ||
  /*role*/
  ctx[6] === "checkbox" ? {
    "aria-checked":
    /*checked*/
    ctx[10] ? "true" : "false"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  },
  /*props*/
  ctx[12]];
  var li_data = {};

  for (var i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }

  var block = {
    c: function create() {
      li = element("li");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true,
        role: true,
        tabindex: true
      });
      var li_nodes = children(li);
      if (default_slot) default_slot.l(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(li, li_data);
      add_location(li, file$a, 40, 2, 1053);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, li, anchor);

      if (default_slot) {
        default_slot.m(li, null);
      }
      /*li_binding*/


      ctx[28](li);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, li,
      /*use*/
      ctx[1])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[13].call(null, li)), action_destroyer(Ripple_action = Ripple.call(null, li, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      })), listen_dev(li, "click",
      /*action*/
      ctx[15], false, false, false), listen_dev(li, "keydown",
      /*handleKeydown*/
      ctx[16], false, false, false)];
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16777216) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[24], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[24], dirty, null));
        }
      }

      set_attributes(li, get_spread_update(li_levels, [dirty &
      /*className, activated, selected, disabled, role*/
      484 && {
        class: "\n      mdc-list-item\n      " +
        /*className*/
        ctx[2] + "\n      " + (
        /*activated*/
        ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
        /*selected*/
        ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
        /*disabled*/
        ctx[8] ? "mdc-list-item--disabled" : "") + "\n      " + (
        /*role*/
        ctx[6] === "menuitem" &&
        /*selected*/
        ctx[7] ? "mdc-menu-item--selected" : "") + "\n    "
      }, dirty &
      /*role*/
      64 && {
        role:
        /*role*/
        ctx[6]
      }, dirty &
      /*role, selected*/
      192 && (
      /*role*/
      ctx[6] === "option" ? {
        "aria-selected":
        /*selected*/
        ctx[7] ? "true" : "false"
      } : {}), dirty &
      /*role, checked*/
      1088 && (
      /*role*/
      ctx[6] === "radio" ||
      /*role*/
      ctx[6] === "checkbox" ? {
        "aria-checked":
        /*checked*/
        ctx[10] ? "true" : "false"
      } : {}), dirty &
      /*tabindex*/
      1 && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*props*/
      4096 &&
      /*props*/
      ctx[12]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      24) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      });
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (default_slot) default_slot.d(detaching);
      /*li_binding*/

      ctx[28](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(40:0) {:else}",
    ctx: ctx
  });
  return block;
} // (21:23) 


function create_if_block_1(ctx) {
  var span;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[25].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[24], null);
  var span_levels = [{
    class: "\n      mdc-list-item\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n    "
  },
  /*activated*/
  ctx[5] ? {
    "aria-current": "page"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  },
  /*props*/
  ctx[12]];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true,
        tabindex: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$a, 21, 2, 547);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }
      /*span_binding*/


      ctx[27](span);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, span,
      /*use*/
      ctx[1])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[13].call(null, span)), action_destroyer(Ripple_action = Ripple.call(null, span, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      })), listen_dev(span, "click",
      /*action*/
      ctx[15], false, false, false), listen_dev(span, "keydown",
      /*handleKeydown*/
      ctx[16], false, false, false)];
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16777216) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[24], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[24], dirty, null));
        }
      }

      set_attributes(span, get_spread_update(span_levels, [dirty &
      /*className, activated, selected, disabled*/
      420 && {
        class: "\n      mdc-list-item\n      " +
        /*className*/
        ctx[2] + "\n      " + (
        /*activated*/
        ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
        /*selected*/
        ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
        /*disabled*/
        ctx[8] ? "mdc-list-item--disabled" : "") + "\n    "
      }, dirty &
      /*activated*/
      32 && (
      /*activated*/
      ctx[5] ? {
        "aria-current": "page"
      } : {}), dirty &
      /*tabindex*/
      1 && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*props*/
      4096 &&
      /*props*/
      ctx[12]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      24) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      });
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      /*span_binding*/

      ctx[27](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(21:23) ",
    ctx: ctx
  });
  return block;
} // (1:0) {#if nav && href}


function create_if_block$1(ctx) {
  var a;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[25].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[24], null);
  var a_levels = [{
    class: "\n      mdc-list-item\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n    "
  }, {
    href:
    /*href*/
    ctx[9]
  },
  /*activated*/
  ctx[5] ? {
    "aria-current": "page"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  },
  /*props*/
  ctx[12]];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        href: true,
        tabindex: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$a, 1, 2, 20);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }
      /*a_binding*/


      ctx[26](a);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, a,
      /*use*/
      ctx[1])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[13].call(null, a)), action_destroyer(Ripple_action = Ripple.call(null, a, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      })), listen_dev(a, "click",
      /*action*/
      ctx[15], false, false, false), listen_dev(a, "keydown",
      /*handleKeydown*/
      ctx[16], false, false, false)];
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16777216) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[24], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[24], dirty, null));
        }
      }

      set_attributes(a, get_spread_update(a_levels, [dirty &
      /*className, activated, selected, disabled*/
      420 && {
        class: "\n      mdc-list-item\n      " +
        /*className*/
        ctx[2] + "\n      " + (
        /*activated*/
        ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
        /*selected*/
        ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
        /*disabled*/
        ctx[8] ? "mdc-list-item--disabled" : "") + "\n    "
      }, dirty &
      /*href*/
      512 && {
        href:
        /*href*/
        ctx[9]
      }, dirty &
      /*activated*/
      32 && (
      /*activated*/
      ctx[5] ? {
        "aria-current": "page"
      } : {}), dirty &
      /*tabindex*/
      1 && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*props*/
      4096 &&
      /*props*/
      ctx[12]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      24) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      });
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      /*a_binding*/

      ctx[26](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(1:0) {#if nav && href}",
    ctx: ctx
  });
  return block;
}

function create_fragment$d(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$1, create_if_block_1, create_else_block$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*nav*/
    ctx[14] &&
    /*href*/
    ctx[9]) return 0;
    if (
    /*nav*/
    ctx[14] && !
    /*href*/
    ctx[9]) return 1;
    return 2;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var counter = 0;

function instance$d($$self, $$props, $$invalidate) {
  var dispatch = createEventDispatcher();
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var checked = false;
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$ripple = _$$props3.ripple,
      ripple = _$$props3$ripple === void 0 ? true : _$$props3$ripple;
  var _$$props4 = $$props,
      _$$props4$color = _$$props4.color,
      color = _$$props4$color === void 0 ? null : _$$props4$color;
  var _$$props5 = $$props,
      _$$props5$nonInteract = _$$props5.nonInteractive,
      nonInteractive = _$$props5$nonInteract === void 0 ? getContext("SMUI:list:nonInteractive") : _$$props5$nonInteract;
  var _$$props6 = $$props,
      _$$props6$activated = _$$props6.activated,
      activated = _$$props6$activated === void 0 ? false : _$$props6$activated;
  var _$$props7 = $$props,
      _$$props7$role = _$$props7.role,
      role = _$$props7$role === void 0 ? getContext("SMUI:list:item:role") : _$$props7$role;
  var _$$props8 = $$props,
      _$$props8$selected = _$$props8.selected,
      selected = _$$props8$selected === void 0 ? false : _$$props8$selected;
  var _$$props9 = $$props,
      _$$props9$disabled = _$$props9.disabled,
      disabled = _$$props9$disabled === void 0 ? false : _$$props9$disabled;
  var _$$props10 = $$props,
      _$$props10$tabindex = _$$props10.tabindex,
      tabindex = _$$props10$tabindex === void 0 ? !nonInteractive && !disabled && (selected || checked) && "0" || "-1" : _$$props10$tabindex;
  var _$$props11 = $$props,
      _$$props11$href = _$$props11.href,
      href = _$$props11$href === void 0 ? false : _$$props11$href;
  var _$$props12 = $$props,
      _$$props12$inputId = _$$props12.inputId,
      inputId = _$$props12$inputId === void 0 ? "SMUI-form-field-list-" + counter++ : _$$props12$inputId;
  var element;
  var addTabindexIfNoItemsSelectedRaf;
  var nav = getContext("SMUI:list:item:nav");
  setContext("SMUI:generic:input:props", {
    id: inputId
  });
  setContext("SMUI:generic:input:setChecked", setChecked);
  onMount(function () {
    // Tabindex needs to be '0' if this is the first non-disabled list item, and
    // no other item is selected.
    if (!selected && !nonInteractive) {
      var first = true;
      var el = element;

      while (el.previousSibling) {
        el = el.previousSibling;

        if (el.nodeType === 1 && el.classList.contains("mdc-list-item") && !el.classList.contains("mdc-list-item--disabled")) {
          first = false;
          break;
        }
      }

      if (first) {
        // This is first, so now set up a check that no other items are
        // selected.
        addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(addTabindexIfNoItemsSelected);
      }
    }
  });
  onDestroy(function () {
    if (addTabindexIfNoItemsSelectedRaf) {
      window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    }
  });

  function addTabindexIfNoItemsSelected() {
    // Look through next siblings to see if none of them are selected.
    var noneSelected = true;
    var el = element;

    while (el.nextSibling) {
      el = el.nextSibling;

      if (el.nodeType === 1 && el.classList.contains("mdc-list-item") && el.attributes["tabindex"] && el.attributes["tabindex"].value === "0") {
        noneSelected = false;
        break;
      }
    }

    if (noneSelected) {
      // This is the first element, and no other element is selected, so the
      // tabindex should be '0'.
      $$invalidate(0, tabindex = "0");
    }
  }

  function action(e) {
    if (disabled) {
      e.preventDefault();
    } else {
      dispatch("SMUI:action", e);
    }
  }

  function handleKeydown(e) {
    var isEnter = e.key === "Enter" || e.keyCode === 13;
    var isSpace = e.key === "Space" || e.keyCode === 32;

    if (isEnter || isSpace) {
      action(e);
    }
  }

  function setChecked(isChecked) {
    $$invalidate(10, checked = isChecked);
    $$invalidate(0, tabindex = !nonInteractive && !disabled && (selected || checked) && "0" || "-1");
  }

  var _$$props13 = $$props,
      _$$props13$$$slots = _$$props13.$$slots,
      $$slots = _$$props13$$$slots === void 0 ? {} : _$$props13$$$slots,
      $$scope = _$$props13.$$scope;
  validate_slots("Item", $$slots, ['default']);

  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(11, element = $$value);
    });
  }

  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(11, element = $$value);
    });
  }

  function li_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(11, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(23, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(4, color = $$new_props.color);
    if ("nonInteractive" in $$new_props) $$invalidate(17, nonInteractive = $$new_props.nonInteractive);
    if ("activated" in $$new_props) $$invalidate(5, activated = $$new_props.activated);
    if ("role" in $$new_props) $$invalidate(6, role = $$new_props.role);
    if ("selected" in $$new_props) $$invalidate(7, selected = $$new_props.selected);
    if ("disabled" in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    if ("tabindex" in $$new_props) $$invalidate(0, tabindex = $$new_props.tabindex);
    if ("href" in $$new_props) $$invalidate(9, href = $$new_props.href);
    if ("inputId" in $$new_props) $$invalidate(18, inputId = $$new_props.inputId);
    if ("$$scope" in $$new_props) $$invalidate(24, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      counter: counter,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      createEventDispatcher: createEventDispatcher,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      Ripple: Ripple,
      dispatch: dispatch,
      forwardEvents: forwardEvents,
      checked: checked,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      nonInteractive: nonInteractive,
      activated: activated,
      role: role,
      selected: selected,
      disabled: disabled,
      tabindex: tabindex,
      href: href,
      inputId: inputId,
      element: element,
      addTabindexIfNoItemsSelectedRaf: addTabindexIfNoItemsSelectedRaf,
      nav: nav,
      addTabindexIfNoItemsSelected: addTabindexIfNoItemsSelected,
      action: action,
      handleKeydown: handleKeydown,
      setChecked: setChecked,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(23, $$props = assign(assign({}, $$props), $$new_props));
    if ("checked" in $$props) $$invalidate(10, checked = $$new_props.checked);
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(4, color = $$new_props.color);
    if ("nonInteractive" in $$props) $$invalidate(17, nonInteractive = $$new_props.nonInteractive);
    if ("activated" in $$props) $$invalidate(5, activated = $$new_props.activated);
    if ("role" in $$props) $$invalidate(6, role = $$new_props.role);
    if ("selected" in $$props) $$invalidate(7, selected = $$new_props.selected);
    if ("disabled" in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    if ("tabindex" in $$props) $$invalidate(0, tabindex = $$new_props.tabindex);
    if ("href" in $$props) $$invalidate(9, href = $$new_props.href);
    if ("inputId" in $$props) $$invalidate(18, inputId = $$new_props.inputId);
    if ("element" in $$props) $$invalidate(11, element = $$new_props.element);
    if ("addTabindexIfNoItemsSelectedRaf" in $$props) addTabindexIfNoItemsSelectedRaf = $$new_props.addTabindexIfNoItemsSelectedRaf;
    if ("nav" in $$props) $$invalidate(14, nav = $$new_props.nav);
    if ("props" in $$props) $$invalidate(12, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(12, props = exclude($$props, ["use", "class", "ripple", "color", "nonInteractive", "activated", "selected", "disabled", "tabindex", "href", "inputId"]));
  };

  $$props = exclude_internal_props($$props);
  return [tabindex, use, className, ripple, color, activated, role, selected, disabled, href, checked, element, props, forwardEvents, nav, action, handleKeydown, nonInteractive, inputId, addTabindexIfNoItemsSelectedRaf, dispatch, addTabindexIfNoItemsSelected, setChecked, $$props, $$scope, $$slots, a_binding, span_binding, li_binding];
}

var Item = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Item, _SvelteComponentDev);

  var _super = _createSuper$e(Item);

  function Item(options) {
    var _this;

    _classCallCheck(this, Item);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
      use: 1,
      class: 2,
      ripple: 3,
      color: 4,
      nonInteractive: 17,
      activated: 5,
      role: 6,
      selected: 7,
      disabled: 8,
      tabindex: 0,
      href: 9,
      inputId: 18
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Item",
      options: options,
      id: create_fragment$d.name
    });
    return _this;
  }

  _createClass(Item, [{
    key: "use",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nonInteractive",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "activated",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "role",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selected",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "disabled",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "tabindex",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inputId",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Item;
}(SvelteComponentDev);

var Text = classAdderBuilder({
  class: 'mdc-list-item__text',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__primary-text',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__secondary-text',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__meta',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-group',
  component: Div,
  contexts: {}
});

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$b = "node_modules/@smui/common/H3.svelte";

function create_fragment$e(ctx) {
  var h3;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var h3_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var h3_data = {};

  for (var i = 0; i < h3_levels.length; i += 1) {
    h3_data = assign(h3_data, h3_levels[i]);
  }

  var block = {
    c: function create() {
      h3 = element("h3");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      h3 = claim_element(nodes, "H3", {});
      var h3_nodes = children(h3);
      if (default_slot) default_slot.l(h3_nodes);
      h3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(h3, h3_data);
      add_location(h3, file$b, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, h3, anchor);

      if (default_slot) {
        default_slot.m(h3, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, h3,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, h3))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(h3, get_spread_update(h3_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h3);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$e.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$e($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("H3", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var H3 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(H3, _SvelteComponentDev);

  var _super = _createSuper$f(H3);

  function H3(options) {
    var _this;

    _classCallCheck(this, H3);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "H3",
      options: options,
      id: create_fragment$e.name
    });
    return _this;
  }

  _createClass(H3, [{
    key: "use",
    get: function get() {
      throw new Error("<H3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<H3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return H3;
}(SvelteComponentDev);

classAdderBuilder({
  class: 'mdc-list-group__subheader',
  component: H3,
  contexts: {}
});

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$c = "node_modules/@smui/list/Separator.svelte"; // (13:0) {:else}

function create_else_block$2(ctx) {
  var li;
  var useActions_action;
  var forwardEvents_action;
  var dispose;
  var li_levels = [{
    class: "\n      mdc-list-divider\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*padded*/
    ctx[4] ? "mdc-list-divider--padded" : "") + "\n      " + (
    /*inset*/
    ctx[5] ? "mdc-list-divider--inset" : "") + "\n    "
  }, {
    role: "separator"
  },
  /*props*/
  ctx[6]];
  var li_data = {};

  for (var i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }

  var block = {
    c: function create() {
      li = element("li");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true,
        role: true
      });
      children(li).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(li, li_data);
      add_location(li, file$c, 13, 2, 257);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, li, anchor);
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, li,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[7].call(null, li))];
    },
    p: function update(ctx, dirty) {
      set_attributes(li, get_spread_update(li_levels, [dirty &
      /*className, padded, inset*/
      50 && {
        class: "\n      mdc-list-divider\n      " +
        /*className*/
        ctx[1] + "\n      " + (
        /*padded*/
        ctx[4] ? "mdc-list-divider--padded" : "") + "\n      " + (
        /*inset*/
        ctx[5] ? "mdc-list-divider--inset" : "") + "\n    "
      }, {
        role: "separator"
      }, dirty &
      /*props*/
      64 &&
      /*props*/
      ctx[6]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(13:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if group || nav}


function create_if_block$2(ctx) {
  var hr;
  var useActions_action;
  var forwardEvents_action;
  var dispose;
  var hr_levels = [{
    class: "\n      mdc-list-divider\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*padded*/
    ctx[4] ? "mdc-list-divider--padded" : "") + "\n      " + (
    /*inset*/
    ctx[5] ? "mdc-list-divider--inset" : "") + "\n    "
  },
  /*props*/
  ctx[6]];
  var hr_data = {};

  for (var i = 0; i < hr_levels.length; i += 1) {
    hr_data = assign(hr_data, hr_levels[i]);
  }

  var block = {
    c: function create() {
      hr = element("hr");
      this.h();
    },
    l: function claim(nodes) {
      hr = claim_element(nodes, "HR", {
        class: true
      });
      this.h();
    },
    h: function hydrate() {
      set_attributes(hr, hr_data);
      add_location(hr, file$c, 1, 2, 21);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, hr, anchor);
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, hr,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[7].call(null, hr))];
    },
    p: function update(ctx, dirty) {
      set_attributes(hr, get_spread_update(hr_levels, [dirty &
      /*className, padded, inset*/
      50 && {
        class: "\n      mdc-list-divider\n      " +
        /*className*/
        ctx[1] + "\n      " + (
        /*padded*/
        ctx[4] ? "mdc-list-divider--padded" : "") + "\n      " + (
        /*inset*/
        ctx[5] ? "mdc-list-divider--inset" : "") + "\n    "
      }, dirty &
      /*props*/
      64 &&
      /*props*/
      ctx[6]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(hr);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(1:0) {#if group || nav}",
    ctx: ctx
  });
  return block;
}

function create_fragment$f(ctx) {
  var if_block_anchor;

  function select_block_type(ctx, dirty) {
    if (
    /*group*/
    ctx[2] ||
    /*nav*/
    ctx[3]) return create_if_block$2;
    return create_else_block$2;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$f.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$f($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$group = _$$props3.group,
      group = _$$props3$group === void 0 ? false : _$$props3$group;
  var _$$props4 = $$props,
      _$$props4$nav = _$$props4.nav,
      nav = _$$props4$nav === void 0 ? false : _$$props4$nav;
  var _$$props5 = $$props,
      _$$props5$padded = _$$props5.padded,
      padded = _$$props5$padded === void 0 ? false : _$$props5$padded;
  var _$$props6 = $$props,
      _$$props6$inset = _$$props6.inset,
      inset = _$$props6$inset === void 0 ? false : _$$props6$inset;
  var _$$props7 = $$props,
      _$$props7$$$slots = _$$props7.$$slots,
      $$slots = _$$props7$$$slots === void 0 ? {} : _$$props7$$$slots,
      $$scope = _$$props7.$$scope;
  validate_slots("Separator", $$slots, []);

  $$self.$set = function ($$new_props) {
    $$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("group" in $$new_props) $$invalidate(2, group = $$new_props.group);
    if ("nav" in $$new_props) $$invalidate(3, nav = $$new_props.nav);
    if ("padded" in $$new_props) $$invalidate(4, padded = $$new_props.padded);
    if ("inset" in $$new_props) $$invalidate(5, inset = $$new_props.inset);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      group: group,
      nav: nav,
      padded: padded,
      inset: inset,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(8, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("group" in $$props) $$invalidate(2, group = $$new_props.group);
    if ("nav" in $$props) $$invalidate(3, nav = $$new_props.nav);
    if ("padded" in $$props) $$invalidate(4, padded = $$new_props.padded);
    if ("inset" in $$props) $$invalidate(5, inset = $$new_props.inset);
    if ("props" in $$props) $$invalidate(6, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(6, props = exclude($$props, ["use", "class", "group", "nav", "padded", "inset"]));
  };

  $$props = exclude_internal_props($$props);
  return [use, className, group, nav, padded, inset, props, forwardEvents];
}

var Separator = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Separator, _SvelteComponentDev);

  var _super = _createSuper$g(Separator);

  function Separator(options) {
    var _this;

    _classCallCheck(this, Separator);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {
      use: 0,
      class: 1,
      group: 2,
      nav: 3,
      padded: 4,
      inset: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Separator",
      options: options,
      id: create_fragment$f.name
    });
    return _this;
  }

  _createClass(Separator, [{
    key: "use",
    get: function get() {
      throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "group",
    get: function get() {
      throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nav",
    get: function get() {
      throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padded",
    get: function get() {
      throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inset",
    get: function get() {
      throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Separator;
}(SvelteComponentDev);

var css_248z$4 = "body{background-color:#000;color:#fff}.mdc-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:hidden;transition:box-shadow .28s cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform .27s cubic-bezier(0,0,.2,1) 0ms;background-color:#fc0;color:#000;color:var(--mdc-theme-on-secondary,#000)}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:focus,.mdc-fab:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-fab:active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}@supports not (-ms-ime-align:auto){.mdc-fab{background-color:var(--mdc-theme-secondary,#fc0)}}.mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.08929em;text-decoration:none;text-transform:uppercase;border-radius:24px;padding:0 20px;width:auto;max-width:100%;height:48px}.mdc-fab--extended .mdc-fab__icon{margin-left:-8px;margin-right:12px}.mdc-fab--extended .mdc-fab__icon[dir=rtl],.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,[dir=rtl] .mdc-fab--extended .mdc-fab__icon{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl],[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:-8px;margin-right:12px}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-fab__icon{transition:transform .18s cubic-bezier(0,0,.2,1) 90ms;fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear .15s,transform .18s cubic-bezier(.4,0,1,1) 0ms}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms cubic-bezier(.4,0,1,1) 0ms}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-fab{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-fab:after,.mdc-fab:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-fab:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-fab.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-fab.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-fab.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-fab.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-fab.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-fab:after,.mdc-fab:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-fab.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-fab:after,.mdc-fab:before{background-color:#000}@supports not (-ms-ime-align:auto){.mdc-fab:after,.mdc-fab:before{background-color:var(--mdc-theme-on-secondary,#000)}}.mdc-fab:hover:before{opacity:.04}.mdc-fab.mdc-ripple-upgraded--background-focused:before,.mdc-fab:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-fab:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-fab:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-fab.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#fff}.mdc-ripple-surface:hover:before{opacity:.08}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-ripple-surface--primary:hover:before{opacity:.08}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#fc0)}}.mdc-ripple-surface--accent:hover:before{opacity:.08}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-fab--color-primary{background-color:#fc0;color:#000;color:var(--mdc-theme-on-primary,#000)}@supports not (-ms-ime-align:auto){.smui-fab--color-primary{background-color:var(--mdc-theme-primary,#fc0)}}.smui-fab--color-primary:after,.smui-fab--color-primary:before{background-color:#000}@supports not (-ms-ime-align:auto){.smui-fab--color-primary:after,.smui-fab--color-primary:before{background-color:var(--mdc-theme-on-primary,#000)}}.smui-fab--color-primary:hover:before{opacity:.04}.smui-fab--color-primary.mdc-ripple-upgraded--background-focused:before,.smui-fab--color-primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.smui-fab--color-primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-fab--color-primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.smui-fab--color-primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}";
styleInject(css_248z$4);

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$d = "node_modules/@smui/fab/Fab.svelte";

function create_fragment$g(ctx) {
  var button;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[10].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[9], null);
  var button_levels = [{
    class: "\n    mdc-fab\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*mini*/
    ctx[4] ? "mdc-fab--mini" : "") + "\n    " + (
    /*exited*/
    ctx[5] ? "mdc-fab--exited" : "") + "\n    " + (
    /*extended*/
    ctx[6] ? "mdc-fab--extended" : "") + "\n    " + (
    /*color*/
    ctx[3] === "primary" ? "smui-fab--color-primary" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[8], ["use", "class", "ripple", "color", "mini", "exited", "extended"])];
  var button_data = {};

  for (var i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }

  var block = {
    c: function create() {
      button = element("button");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true
      });
      var button_nodes = children(button);
      if (default_slot) default_slot.l(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(button, button_data);
      add_location(button, file$d, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, button, anchor);

      if (default_slot) {
        default_slot.m(button, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, button,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[7].call(null, button)), action_destroyer(Ripple_action = Ripple.call(null, button, {
        ripple:
        /*ripple*/
        ctx[2],
        unbounded: false
      }))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        512) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[9], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[9], dirty, null));
        }
      }

      set_attributes(button, get_spread_update(button_levels, [dirty &
      /*className, mini, exited, extended, color*/
      122 && {
        class: "\n    mdc-fab\n    " +
        /*className*/
        ctx[1] + "\n    " + (
        /*mini*/
        ctx[4] ? "mdc-fab--mini" : "") + "\n    " + (
        /*exited*/
        ctx[5] ? "mdc-fab--exited" : "") + "\n    " + (
        /*extended*/
        ctx[6] ? "mdc-fab--extended" : "") + "\n    " + (
        /*color*/
        ctx[3] === "primary" ? "smui-fab--color-primary" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      256 && exclude(
      /*$$props*/
      ctx[8], ["use", "class", "ripple", "color", "mini", "exited", "extended"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple*/
      4) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[2],
        unbounded: false
      });
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$g.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$g($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$ripple = _$$props3.ripple,
      ripple = _$$props3$ripple === void 0 ? true : _$$props3$ripple;
  var _$$props4 = $$props,
      _$$props4$color = _$$props4.color,
      color = _$$props4$color === void 0 ? "secondary" : _$$props4$color;
  var _$$props5 = $$props,
      _$$props5$mini = _$$props5.mini,
      mini = _$$props5$mini === void 0 ? false : _$$props5$mini;
  var _$$props6 = $$props,
      _$$props6$exited = _$$props6.exited,
      exited = _$$props6$exited === void 0 ? false : _$$props6$exited;
  var _$$props7 = $$props,
      _$$props7$extended = _$$props7.extended,
      extended = _$$props7$extended === void 0 ? false : _$$props7$extended;
  setContext("SMUI:label:context", "fab");
  setContext("SMUI:icon:context", "fab");
  var _$$props8 = $$props,
      _$$props8$$$slots = _$$props8.$$slots,
      $$slots = _$$props8$$$slots === void 0 ? {} : _$$props8$$$slots,
      $$scope = _$$props8.$$scope;
  validate_slots("Fab", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(3, color = $$new_props.color);
    if ("mini" in $$new_props) $$invalidate(4, mini = $$new_props.mini);
    if ("exited" in $$new_props) $$invalidate(5, exited = $$new_props.exited);
    if ("extended" in $$new_props) $$invalidate(6, extended = $$new_props.extended);
    if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      Ripple: Ripple,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      mini: mini,
      exited: exited,
      extended: extended
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(8, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(3, color = $$new_props.color);
    if ("mini" in $$props) $$invalidate(4, mini = $$new_props.mini);
    if ("exited" in $$props) $$invalidate(5, exited = $$new_props.exited);
    if ("extended" in $$props) $$invalidate(6, extended = $$new_props.extended);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, ripple, color, mini, exited, extended, forwardEvents, $$props, $$scope, $$slots];
}

var Fab = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Fab, _SvelteComponentDev);

  var _super = _createSuper$h(Fab);

  function Fab(options) {
    var _this;

    _classCallCheck(this, Fab);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$g, create_fragment$g, safe_not_equal, {
      use: 0,
      class: 1,
      ripple: 2,
      color: 3,
      mini: 4,
      exited: 5,
      extended: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Fab",
      options: options,
      id: create_fragment$g.name
    });
    return _this;
  }

  _createClass(Fab, [{
    key: "use",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "mini",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "exited",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "extended",
    get: function get() {
      throw new Error("<Fab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Fab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Fab;
}(SvelteComponentDev);

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$e = "node_modules/svelte-awesome/components/svg/Path.svelte";

function create_fragment$h(ctx) {
  var path;
  var path_levels = [{
    key: "path-" +
    /*id*/
    ctx[0]
  },
  /*data*/
  ctx[1]];
  var path_data = {};

  for (var i = 0; i < path_levels.length; i += 1) {
    path_data = assign(path_data, path_levels[i]);
  }

  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        key: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_svg_attributes(path, path_data);
      add_location(path, file$e, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      set_svg_attributes(path, get_spread_update(path_levels, [dirty &
      /*id*/
      1 && {
        key: "path-" +
        /*id*/
        ctx[0]
      }, dirty &
      /*data*/
      2 &&
      /*data*/
      ctx[1]]));
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$h.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$h($$self, $$props, $$invalidate) {
  var _$$props$id = $$props.id,
      id = _$$props$id === void 0 ? "" : _$$props$id;
  var _$$props$data = $$props.data,
      data = _$$props$data === void 0 ? {} : _$$props$data;
  var writable_props = ["id", "data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Path> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Path", $$slots, []);

  $$self.$set = function ($$props) {
    if ("id" in $$props) $$invalidate(0, id = $$props.id);
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      id: id,
      data: data
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("id" in $$props) $$invalidate(0, id = $$props.id);
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [id, data];
}

var Path = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Path, _SvelteComponentDev);

  var _super = _createSuper$i(Path);

  function Path(options) {
    var _this;

    _classCallCheck(this, Path);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$h, create_fragment$h, safe_not_equal, {
      id: 0,
      data: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Path",
      options: options,
      id: create_fragment$h.name
    });
    return _this;
  }

  _createClass(Path, [{
    key: "id",
    get: function get() {
      throw new Error("<Path>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Path>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data",
    get: function get() {
      throw new Error("<Path>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Path>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Path;
}(SvelteComponentDev);

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$f = "node_modules/svelte-awesome/components/svg/Polygon.svelte";

function create_fragment$i(ctx) {
  var polygon;
  var polygon_levels = [{
    key: "polygon-" +
    /*id*/
    ctx[0]
  },
  /*data*/
  ctx[1]];
  var polygon_data = {};

  for (var i = 0; i < polygon_levels.length; i += 1) {
    polygon_data = assign(polygon_data, polygon_levels[i]);
  }

  var block = {
    c: function create() {
      polygon = svg_element("polygon");
      this.h();
    },
    l: function claim(nodes) {
      polygon = claim_element(nodes, "polygon", {
        key: true
      }, 1);
      children(polygon).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_svg_attributes(polygon, polygon_data);
      add_location(polygon, file$f, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, polygon, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      set_svg_attributes(polygon, get_spread_update(polygon_levels, [dirty &
      /*id*/
      1 && {
        key: "polygon-" +
        /*id*/
        ctx[0]
      }, dirty &
      /*data*/
      2 &&
      /*data*/
      ctx[1]]));
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(polygon);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$i.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$i($$self, $$props, $$invalidate) {
  var _$$props$id = $$props.id,
      id = _$$props$id === void 0 ? "" : _$$props$id;
  var _$$props$data = $$props.data,
      data = _$$props$data === void 0 ? {} : _$$props$data;
  var writable_props = ["id", "data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Polygon> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Polygon", $$slots, []);

  $$self.$set = function ($$props) {
    if ("id" in $$props) $$invalidate(0, id = $$props.id);
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      id: id,
      data: data
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("id" in $$props) $$invalidate(0, id = $$props.id);
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [id, data];
}

var Polygon = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Polygon, _SvelteComponentDev);

  var _super = _createSuper$j(Polygon);

  function Polygon(options) {
    var _this;

    _classCallCheck(this, Polygon);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$i, create_fragment$i, safe_not_equal, {
      id: 0,
      data: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Polygon",
      options: options,
      id: create_fragment$i.name
    });
    return _this;
  }

  _createClass(Polygon, [{
    key: "id",
    get: function get() {
      throw new Error("<Polygon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Polygon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data",
    get: function get() {
      throw new Error("<Polygon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Polygon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Polygon;
}(SvelteComponentDev);

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$g = "node_modules/svelte-awesome/components/svg/Raw.svelte";

function create_fragment$j(ctx) {
  var g;
  var block = {
    c: function create() {
      g = svg_element("g");
      this.h();
    },
    l: function claim(nodes) {
      g = claim_element(nodes, "g", {}, 1);
      var g_nodes = children(g);
      g_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(g, file$g, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, g, anchor);
      g.innerHTML =
      /*raw*/
      ctx[0];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*raw*/
      1) g.innerHTML =
      /*raw*/
      ctx[0];
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(g);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$j.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$j($$self, $$props, $$invalidate) {
  var cursor = 870711;

  function getId() {
    cursor += 1;
    return "fa-".concat(cursor.toString(16));
  }

  var raw;
  var data = $$props.data;

  function getRaw(data) {
    if (!data || !data.raw) {
      return null;
    }

    var rawData = data.raw;
    var ids = {};
    rawData = rawData.replace(/\s(?:xml:)?id=["']?([^"')\s]+)/g, function (match, id) {
      var uniqueId = getId();
      ids[id] = uniqueId;
      return " id=\"".concat(uniqueId, "\"");
    });
    rawData = rawData.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, function (match, rawId, _, pointerId) {
      var id = rawId || pointerId;

      if (!id || !ids[id]) {
        return match;
      }

      return "#".concat(ids[id]);
    });
    return rawData;
  }

  var writable_props = ["data"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Raw> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Raw", $$slots, []);

  $$self.$set = function ($$props) {
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  $$self.$capture_state = function () {
    return {
      cursor: cursor,
      getId: getId,
      raw: raw,
      data: data,
      getRaw: getRaw
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("cursor" in $$props) cursor = $$props.cursor;
    if ("raw" in $$props) $$invalidate(0, raw = $$props.raw);
    if ("data" in $$props) $$invalidate(1, data = $$props.data);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*data*/
    2) {
       $$invalidate(0, raw = getRaw(data));
    }
  };

  return [raw, data];
}

var Raw = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Raw, _SvelteComponentDev);

  var _super = _createSuper$k(Raw);

  function Raw(options) {
    var _this;

    _classCallCheck(this, Raw);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$j, create_fragment$j, safe_not_equal, {
      data: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Raw",
      options: options,
      id: create_fragment$j.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[1] === undefined && !("data" in props)) {
      console.warn("<Raw> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(Raw, [{
    key: "data",
    get: function get() {
      throw new Error("<Raw>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Raw>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Raw;
}(SvelteComponentDev);

function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$h = "node_modules/svelte-awesome/components/svg/Svg.svelte";

function create_fragment$k(ctx) {
  var svg;
  var svg_class_value;
  var svg_role_value;
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var block = {
    c: function create() {
      svg = svg_element("svg");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_element(nodes, "svg", {
        version: true,
        class: true,
        x: true,
        y: true,
        width: true,
        height: true,
        "aria-label": true,
        role: true,
        viewBox: true,
        style: true
      }, 1);
      var svg_nodes = children(svg);
      if (default_slot) default_slot.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "version", "1.1");
      attr_dev(svg, "class", svg_class_value = "fa-icon " +
      /*className*/
      ctx[0] + " svelte-1dof0an");
      attr_dev(svg, "x",
      /*x*/
      ctx[8]);
      attr_dev(svg, "y",
      /*y*/
      ctx[9]);
      attr_dev(svg, "width",
      /*width*/
      ctx[1]);
      attr_dev(svg, "height",
      /*height*/
      ctx[2]);
      attr_dev(svg, "aria-label",
      /*label*/
      ctx[11]);
      attr_dev(svg, "role", svg_role_value =
      /*label*/
      ctx[11] ? "img" : "presentation");
      attr_dev(svg, "viewBox",
      /*box*/
      ctx[3]);
      attr_dev(svg, "style",
      /*style*/
      ctx[10]);
      toggle_class(svg, "fa-spin",
      /*spin*/
      ctx[4]);
      toggle_class(svg, "fa-pulse",
      /*pulse*/
      ctx[6]);
      toggle_class(svg, "fa-inverse",
      /*inverse*/
      ctx[5]);
      toggle_class(svg, "fa-flip-horizontal",
      /*flip*/
      ctx[7] === "horizontal");
      toggle_class(svg, "fa-flip-vertical",
      /*flip*/
      ctx[7] === "vertical");
      add_location(svg, file$h, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg, anchor);

      if (default_slot) {
        default_slot.m(svg, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[12], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[12], dirty, null));
        }
      }

      if (!current || dirty &
      /*className*/
      1 && svg_class_value !== (svg_class_value = "fa-icon " +
      /*className*/
      ctx[0] + " svelte-1dof0an")) {
        attr_dev(svg, "class", svg_class_value);
      }

      if (!current || dirty &
      /*x*/
      256) {
        attr_dev(svg, "x",
        /*x*/
        ctx[8]);
      }

      if (!current || dirty &
      /*y*/
      512) {
        attr_dev(svg, "y",
        /*y*/
        ctx[9]);
      }

      if (!current || dirty &
      /*width*/
      2) {
        attr_dev(svg, "width",
        /*width*/
        ctx[1]);
      }

      if (!current || dirty &
      /*height*/
      4) {
        attr_dev(svg, "height",
        /*height*/
        ctx[2]);
      }

      if (!current || dirty &
      /*label*/
      2048) {
        attr_dev(svg, "aria-label",
        /*label*/
        ctx[11]);
      }

      if (!current || dirty &
      /*label*/
      2048 && svg_role_value !== (svg_role_value =
      /*label*/
      ctx[11] ? "img" : "presentation")) {
        attr_dev(svg, "role", svg_role_value);
      }

      if (!current || dirty &
      /*box*/
      8) {
        attr_dev(svg, "viewBox",
        /*box*/
        ctx[3]);
      }

      if (!current || dirty &
      /*style*/
      1024) {
        attr_dev(svg, "style",
        /*style*/
        ctx[10]);
      }

      if (dirty &
      /*className, spin*/
      17) {
        toggle_class(svg, "fa-spin",
        /*spin*/
        ctx[4]);
      }

      if (dirty &
      /*className, pulse*/
      65) {
        toggle_class(svg, "fa-pulse",
        /*pulse*/
        ctx[6]);
      }

      if (dirty &
      /*className, inverse*/
      33) {
        toggle_class(svg, "fa-inverse",
        /*inverse*/
        ctx[5]);
      }

      if (dirty &
      /*className, flip*/
      129) {
        toggle_class(svg, "fa-flip-horizontal",
        /*flip*/
        ctx[7] === "horizontal");
      }

      if (dirty &
      /*className, flip*/
      129) {
        toggle_class(svg, "fa-flip-vertical",
        /*flip*/
        ctx[7] === "vertical");
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$k.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$k($$self, $$props, $$invalidate) {
  var className = $$props.class;
  var width = $$props.width;
  var height = $$props.height;
  var box = $$props.box;
  var _$$props$spin = $$props.spin,
      spin = _$$props$spin === void 0 ? false : _$$props$spin;
  var _$$props$inverse = $$props.inverse,
      inverse = _$$props$inverse === void 0 ? false : _$$props$inverse;
  var _$$props$pulse = $$props.pulse,
      pulse = _$$props$pulse === void 0 ? false : _$$props$pulse;
  var _$$props$flip = $$props.flip,
      flip = _$$props$flip === void 0 ? null : _$$props$flip;
  var _$$props$x = $$props.x,
      x = _$$props$x === void 0 ? undefined : _$$props$x;
  var _$$props$y = $$props.y,
      y = _$$props$y === void 0 ? undefined : _$$props$y;
  var _$$props$style = $$props.style,
      style = _$$props$style === void 0 ? undefined : _$$props$style;
  var _$$props$label = $$props.label,
      label = _$$props$label === void 0 ? undefined : _$$props$label;
  var writable_props = ["class", "width", "height", "box", "spin", "inverse", "pulse", "flip", "x", "y", "style", "label"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Svg> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Svg", $$slots, ['default']);

  $$self.$set = function ($$props) {
    if ("class" in $$props) $$invalidate(0, className = $$props.class);
    if ("width" in $$props) $$invalidate(1, width = $$props.width);
    if ("height" in $$props) $$invalidate(2, height = $$props.height);
    if ("box" in $$props) $$invalidate(3, box = $$props.box);
    if ("spin" in $$props) $$invalidate(4, spin = $$props.spin);
    if ("inverse" in $$props) $$invalidate(5, inverse = $$props.inverse);
    if ("pulse" in $$props) $$invalidate(6, pulse = $$props.pulse);
    if ("flip" in $$props) $$invalidate(7, flip = $$props.flip);
    if ("x" in $$props) $$invalidate(8, x = $$props.x);
    if ("y" in $$props) $$invalidate(9, y = $$props.y);
    if ("style" in $$props) $$invalidate(10, style = $$props.style);
    if ("label" in $$props) $$invalidate(11, label = $$props.label);
    if ("$$scope" in $$props) $$invalidate(12, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      className: className,
      width: width,
      height: height,
      box: box,
      spin: spin,
      inverse: inverse,
      pulse: pulse,
      flip: flip,
      x: x,
      y: y,
      style: style,
      label: label
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("className" in $$props) $$invalidate(0, className = $$props.className);
    if ("width" in $$props) $$invalidate(1, width = $$props.width);
    if ("height" in $$props) $$invalidate(2, height = $$props.height);
    if ("box" in $$props) $$invalidate(3, box = $$props.box);
    if ("spin" in $$props) $$invalidate(4, spin = $$props.spin);
    if ("inverse" in $$props) $$invalidate(5, inverse = $$props.inverse);
    if ("pulse" in $$props) $$invalidate(6, pulse = $$props.pulse);
    if ("flip" in $$props) $$invalidate(7, flip = $$props.flip);
    if ("x" in $$props) $$invalidate(8, x = $$props.x);
    if ("y" in $$props) $$invalidate(9, y = $$props.y);
    if ("style" in $$props) $$invalidate(10, style = $$props.style);
    if ("label" in $$props) $$invalidate(11, label = $$props.label);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [className, width, height, box, spin, inverse, pulse, flip, x, y, style, label, $$scope, $$slots];
}

var Svg = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Svg, _SvelteComponentDev);

  var _super = _createSuper$l(Svg);

  function Svg(options) {
    var _this;

    _classCallCheck(this, Svg);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$k, create_fragment$k, safe_not_equal, {
      class: 0,
      width: 1,
      height: 2,
      box: 3,
      spin: 4,
      inverse: 5,
      pulse: 6,
      flip: 7,
      x: 8,
      y: 9,
      style: 10,
      label: 11
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Svg",
      options: options,
      id: create_fragment$k.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*className*/
    ctx[0] === undefined && !("class" in props)) {
      console.warn("<Svg> was created without expected prop 'class'");
    }

    if (
    /*width*/
    ctx[1] === undefined && !("width" in props)) {
      console.warn("<Svg> was created without expected prop 'width'");
    }

    if (
    /*height*/
    ctx[2] === undefined && !("height" in props)) {
      console.warn("<Svg> was created without expected prop 'height'");
    }

    if (
    /*box*/
    ctx[3] === undefined && !("box" in props)) {
      console.warn("<Svg> was created without expected prop 'box'");
    }

    return _this;
  }

  _createClass(Svg, [{
    key: "class",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "height",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "box",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "spin",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inverse",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "pulse",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flip",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "x",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "y",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "style",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "label",
    get: function get() {
      throw new Error("<Svg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Svg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Svg;
}(SvelteComponentDev);

function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object,
    console_1 = globals.console;

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[29] = list[i];
  child_ctx[31] = i;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[32] = list[i];
  child_ctx[31] = i;
  return child_ctx;
} // (4:4) {#if self}


function create_if_block$3(ctx) {
  var t0;
  var t1;
  var if_block2_anchor;
  var current;
  var if_block0 =
  /*self*/
  ctx[0].paths && create_if_block_3(ctx);
  var if_block1 =
  /*self*/
  ctx[0].polygons && create_if_block_2(ctx);
  var if_block2 =
  /*self*/
  ctx[0].raw && create_if_block_1$1(ctx);
  var block = {
    c: function create() {
      if (if_block0) if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block0) if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1) if_block1.l(nodes);
      t1 = claim_space(nodes);
      if (if_block2) if_block2.l(nodes);
      if_block2_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert_dev(target, t0, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, t1, anchor);
      if (if_block2) if_block2.m(target, anchor);
      insert_dev(target, if_block2_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*self*/
      ctx[0].paths) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty[0] &
          /*self*/
          1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*self*/
      ctx[0].polygons) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty[0] &
          /*self*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t1.parentNode, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (
      /*self*/
      ctx[0].raw) {
        if (if_block2) {
          if_block2.p(ctx, dirty);

          if (dirty[0] &
          /*self*/
          1) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1$1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, function () {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(t0);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(t1);
      if (if_block2) if_block2.d(detaching);
      if (detaching) detach_dev(if_block2_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(4:4) {#if self}",
    ctx: ctx
  });
  return block;
} // (5:6) {#if self.paths}


function create_if_block_3(ctx) {
  var each_1_anchor;
  var current;
  var each_value_1 =
  /*self*/
  ctx[0].paths;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*self*/
      1) {
        each_value_1 =
        /*self*/
        ctx[0].paths;
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(5:6) {#if self.paths}",
    ctx: ctx
  });
  return block;
} // (6:8) {#each self.paths as path, i}


function create_each_block_1(ctx) {
  var current;
  var path = new Path({
    props: {
      id:
      /*i*/
      ctx[31],
      data:
      /*path*/
      ctx[32]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(path.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(path.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(path, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var path_changes = {};
      if (dirty[0] &
      /*self*/
      1) path_changes.data =
      /*path*/
      ctx[32];
      path.$set(path_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(path.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(path.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(path, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(6:8) {#each self.paths as path, i}",
    ctx: ctx
  });
  return block;
} // (10:6) {#if self.polygons}


function create_if_block_2(ctx) {
  var each_1_anchor;
  var current;
  var each_value =
  /*self*/
  ctx[0].polygons;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*self*/
      1) {
        each_value =
        /*self*/
        ctx[0].polygons;
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(10:6) {#if self.polygons}",
    ctx: ctx
  });
  return block;
} // (11:8) {#each self.polygons as polygon, i}


function create_each_block(ctx) {
  var current;
  var polygon = new Polygon({
    props: {
      id:
      /*i*/
      ctx[31],
      data:
      /*polygon*/
      ctx[29]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(polygon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(polygon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(polygon, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var polygon_changes = {};
      if (dirty[0] &
      /*self*/
      1) polygon_changes.data =
      /*polygon*/
      ctx[29];
      polygon.$set(polygon_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(polygon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(polygon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(polygon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(11:8) {#each self.polygons as polygon, i}",
    ctx: ctx
  });
  return block;
} // (15:6) {#if self.raw}


function create_if_block_1$1(ctx) {
  var updating_data;
  var current;

  function raw_data_binding(value) {
    /*raw_data_binding*/
    ctx[27].call(null, value);
  }

  var raw_props = {};

  if (
  /*self*/
  ctx[0] !== void 0) {
    raw_props.data =
    /*self*/
    ctx[0];
  }

  var raw = new Raw({
    props: raw_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(raw, "data", raw_data_binding);
  });
  var block = {
    c: function create() {
      create_component(raw.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(raw.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(raw, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var raw_changes = {};

      if (!updating_data && dirty[0] &
      /*self*/
      1) {
        updating_data = true;
        raw_changes.data =
        /*self*/
        ctx[0];
        add_flush_callback(function () {
          return updating_data = false;
        });
      }

      raw.$set(raw_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(raw.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(raw.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(raw, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(15:6) {#if self.raw}",
    ctx: ctx
  });
  return block;
} // (3:8)      


function fallback_block(ctx) {
  var if_block_anchor;
  var current;
  var if_block =
  /*self*/
  ctx[0] && create_if_block$3(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*self*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty[0] &
          /*self*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: fallback_block.name,
    type: "fallback",
    source: "(3:8)      ",
    ctx: ctx
  });
  return block;
} // (1:0) <Svg label={label} width={width} height={height} box={box} style={combinedStyle}   spin={spin} flip={flip} inverse={inverse} pulse={pulse} class={className}>


function create_default_slot$3(ctx) {
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[26].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[28], null);
  var default_slot_or_fallback = default_slot || fallback_block(ctx);
  var block = {
    c: function create() {
      if (default_slot_or_fallback) default_slot_or_fallback.c();
    },
    l: function claim(nodes) {
      if (default_slot_or_fallback) default_slot_or_fallback.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        268435456) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[28], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[28], dirty, null));
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && dirty[0] &
        /*self*/
        1) {
          default_slot_or_fallback.p(ctx, dirty);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$3.name,
    type: "slot",
    source: "(1:0) <Svg label={label} width={width} height={height} box={box} style={combinedStyle}   spin={spin} flip={flip} inverse={inverse} pulse={pulse} class={className}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$l(ctx) {
  var current;
  var svg = new Svg({
    props: {
      label:
      /*label*/
      ctx[6],
      width:
      /*width*/
      ctx[7],
      height:
      /*height*/
      ctx[8],
      box:
      /*box*/
      ctx[10],
      style:
      /*combinedStyle*/
      ctx[9],
      spin:
      /*spin*/
      ctx[2],
      flip:
      /*flip*/
      ctx[5],
      inverse:
      /*inverse*/
      ctx[3],
      pulse:
      /*pulse*/
      ctx[4],
      class:
      /*className*/
      ctx[1],
      $$slots: {
        default: [create_default_slot$3]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(svg.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(svg.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(svg, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var svg_changes = {};
      if (dirty[0] &
      /*label*/
      64) svg_changes.label =
      /*label*/
      ctx[6];
      if (dirty[0] &
      /*width*/
      128) svg_changes.width =
      /*width*/
      ctx[7];
      if (dirty[0] &
      /*height*/
      256) svg_changes.height =
      /*height*/
      ctx[8];
      if (dirty[0] &
      /*box*/
      1024) svg_changes.box =
      /*box*/
      ctx[10];
      if (dirty[0] &
      /*combinedStyle*/
      512) svg_changes.style =
      /*combinedStyle*/
      ctx[9];
      if (dirty[0] &
      /*spin*/
      4) svg_changes.spin =
      /*spin*/
      ctx[2];
      if (dirty[0] &
      /*flip*/
      32) svg_changes.flip =
      /*flip*/
      ctx[5];
      if (dirty[0] &
      /*inverse*/
      8) svg_changes.inverse =
      /*inverse*/
      ctx[3];
      if (dirty[0] &
      /*pulse*/
      16) svg_changes.pulse =
      /*pulse*/
      ctx[4];
      if (dirty[0] &
      /*className*/
      2) svg_changes.class =
      /*className*/
      ctx[1];

      if (dirty[0] &
      /*$$scope, self*/
      268435457) {
        svg_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      svg.$set(svg_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(svg.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(svg.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(svg, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$l.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function normaliseData(data) {
  if ("iconName" in data && "icon" in data) {
    var normalisedData = {};
    var faIcon = data.icon;
    var name = data.iconName;
    var width = faIcon[0];
    var height = faIcon[1];
    var paths = faIcon[4];
    var iconData = {
      width: width,
      height: height,
      paths: [{
        d: paths
      }]
    };
    normalisedData[name] = iconData;
    return normalisedData;
  }

  return data;
}

function instance$l($$self, $$props, $$invalidate) {
  var _$$props$class = $$props.class,
      className = _$$props$class === void 0 ? "" : _$$props$class;
  var data = $$props.data;
  var _$$props$scale = $$props.scale,
      scale = _$$props$scale === void 0 ? 1 : _$$props$scale;
  var _$$props$spin = $$props.spin,
      spin = _$$props$spin === void 0 ? false : _$$props$spin;
  var _$$props$inverse = $$props.inverse,
      inverse = _$$props$inverse === void 0 ? false : _$$props$inverse;
  var _$$props$pulse = $$props.pulse,
      pulse = _$$props$pulse === void 0 ? false : _$$props$pulse;
  var _$$props$flip = $$props.flip,
      flip = _$$props$flip === void 0 ? null : _$$props$flip;
  var _$$props$label = $$props.label,
      label = _$$props$label === void 0 ? null : _$$props$label;
  var _$$props$self = $$props.self,
      self = _$$props$self === void 0 ? null : _$$props$self;
  var _$$props$style = $$props.style,
      style = _$$props$style === void 0 ? null : _$$props$style; // internal

  var x = 0;
  var y = 0;
  var childrenHeight = 0;
  var childrenWidth = 0;
  var outerScale = 1;
  var width;
  var height;
  var combinedStyle;
  var box;

  function init() {
    if (typeof data === "undefined") {
      return;
    }

    var normalisedData = normaliseData(data);

    var _Object$keys = Object.keys(normalisedData),
        _Object$keys2 = _slicedToArray(_Object$keys, 1),
        name = _Object$keys2[0];

    var icon = normalisedData[name];

    if (!icon.paths) {
      icon.paths = [];
    }

    if (icon.d) {
      icon.paths.push({
        d: icon.d
      });
    }

    if (!icon.polygons) {
      icon.polygons = [];
    }

    if (icon.points) {
      icon.polygons.push({
        points: icon.points
      });
    }

    $$invalidate(0, self = icon);
  }

  function normalisedScale() {
    var numScale = 1;

    if (typeof scale !== "undefined") {
      numScale = Number(scale);
    }

    if (isNaN(numScale) || numScale <= 0) {
      // eslint-disable-line no-restricted-globals
      console.warn("Invalid prop: prop \"scale\" should be a number over 0."); // eslint-disable-line no-console

      return outerScale;
    }

    return numScale * outerScale;
  }

  function calculateBox() {
    if (self) {
      return "0 0 ".concat(self.width, " ").concat(self.height);
    }

    return "0 0 ".concat(width, " ").concat(height);
  }

  function calculateRatio() {
    if (!self) {
      return 1;
    }

    return Math.max(self.width, self.height) / 16;
  }

  function calculateWidth() {
    if (childrenWidth) {
      return childrenWidth;
    }

    if (self) {
      return self.width / calculateRatio() * normalisedScale();
    }

    return 0;
  }

  function calculateHeight() {
    if (childrenHeight) {
      return childrenHeight;
    }

    if (self) {
      return self.height / calculateRatio() * normalisedScale();
    }

    return 0;
  }

  function calculateStyle() {
    var combined = "";

    if (style !== null) {
      combined += style;
    }

    var size = normalisedScale();

    if (size === 1) {
      return combined;
    }

    if (combined !== "" && !combined.endsWith(";")) {
      combined += "; ";
    }

    return "".concat(combined, "font-size: ").concat(size, "em");
  }

  var writable_props = ["class", "data", "scale", "spin", "inverse", "pulse", "flip", "label", "self", "style"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Icon> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Icon", $$slots, ['default']);

  function raw_data_binding(value) {
    self = value;
    $$invalidate(0, self);
  }

  $$self.$set = function ($$props) {
    if ("class" in $$props) $$invalidate(1, className = $$props.class);
    if ("data" in $$props) $$invalidate(11, data = $$props.data);
    if ("scale" in $$props) $$invalidate(12, scale = $$props.scale);
    if ("spin" in $$props) $$invalidate(2, spin = $$props.spin);
    if ("inverse" in $$props) $$invalidate(3, inverse = $$props.inverse);
    if ("pulse" in $$props) $$invalidate(4, pulse = $$props.pulse);
    if ("flip" in $$props) $$invalidate(5, flip = $$props.flip);
    if ("label" in $$props) $$invalidate(6, label = $$props.label);
    if ("self" in $$props) $$invalidate(0, self = $$props.self);
    if ("style" in $$props) $$invalidate(13, style = $$props.style);
    if ("$$scope" in $$props) $$invalidate(28, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Path: Path,
      Polygon: Polygon,
      Raw: Raw,
      Svg: Svg,
      className: className,
      data: data,
      scale: scale,
      spin: spin,
      inverse: inverse,
      pulse: pulse,
      flip: flip,
      label: label,
      self: self,
      style: style,
      x: x,
      y: y,
      childrenHeight: childrenHeight,
      childrenWidth: childrenWidth,
      outerScale: outerScale,
      width: width,
      height: height,
      combinedStyle: combinedStyle,
      box: box,
      init: init,
      normaliseData: normaliseData,
      normalisedScale: normalisedScale,
      calculateBox: calculateBox,
      calculateRatio: calculateRatio,
      calculateWidth: calculateWidth,
      calculateHeight: calculateHeight,
      calculateStyle: calculateStyle
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("className" in $$props) $$invalidate(1, className = $$props.className);
    if ("data" in $$props) $$invalidate(11, data = $$props.data);
    if ("scale" in $$props) $$invalidate(12, scale = $$props.scale);
    if ("spin" in $$props) $$invalidate(2, spin = $$props.spin);
    if ("inverse" in $$props) $$invalidate(3, inverse = $$props.inverse);
    if ("pulse" in $$props) $$invalidate(4, pulse = $$props.pulse);
    if ("flip" in $$props) $$invalidate(5, flip = $$props.flip);
    if ("label" in $$props) $$invalidate(6, label = $$props.label);
    if ("self" in $$props) $$invalidate(0, self = $$props.self);
    if ("style" in $$props) $$invalidate(13, style = $$props.style);
    if ("x" in $$props) x = $$props.x;
    if ("y" in $$props) y = $$props.y;
    if ("childrenHeight" in $$props) childrenHeight = $$props.childrenHeight;
    if ("childrenWidth" in $$props) childrenWidth = $$props.childrenWidth;
    if ("outerScale" in $$props) outerScale = $$props.outerScale;
    if ("width" in $$props) $$invalidate(7, width = $$props.width);
    if ("height" in $$props) $$invalidate(8, height = $$props.height);
    if ("combinedStyle" in $$props) $$invalidate(9, combinedStyle = $$props.combinedStyle);
    if ("box" in $$props) $$invalidate(10, box = $$props.box);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*data, style, scale*/
    14336) {
       {
        init();
        $$invalidate(7, width = calculateWidth());
        $$invalidate(8, height = calculateHeight());
        $$invalidate(9, combinedStyle = calculateStyle());
        $$invalidate(10, box = calculateBox());
      }
    }
  };

  return [self, className, spin, inverse, pulse, flip, label, width, height, combinedStyle, box, data, scale, style, x, y, childrenHeight, childrenWidth, outerScale, init, normalisedScale, calculateBox, calculateRatio, calculateWidth, calculateHeight, calculateStyle, $$slots, raw_data_binding, $$scope];
}

var Icon = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Icon, _SvelteComponentDev);

  var _super = _createSuper$m(Icon);

  function Icon(options) {
    var _this;

    _classCallCheck(this, Icon);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$l, create_fragment$l, safe_not_equal, {
      class: 1,
      data: 11,
      scale: 12,
      spin: 2,
      inverse: 3,
      pulse: 4,
      flip: 5,
      label: 6,
      self: 0,
      style: 13
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Icon",
      options: options,
      id: create_fragment$l.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*data*/
    ctx[11] === undefined && !("data" in props)) {
      console_1.warn("<Icon> was created without expected prop 'data'");
    }

    return _this;
  }

  _createClass(Icon, [{
    key: "class",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "data",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "scale",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "spin",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inverse",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "pulse",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "flip",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "label",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "self",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "style",
    get: function get() {
      throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Icon;
}(SvelteComponentDev);

var linkedinSquare = {
  'linkedin-square': {
    width: 1536,
    height: 1792,
    paths: [{
      d: 'M237 1414h231v-694h-231v694zM483 506q-1-52-36-86t-93-34-94.5 34-36.5 86q0 51 35.5 85.5t92.5 34.5h1q59 0 95-34.5t36-85.5zM1068 1414h231v-398q0-154-73-233t-193-79q-136 0-209 117h2v-101h-231q3 66 0 694h231v-388q0-38 7-56 15-35 45-59.5t74-24.5q116 0 116 157v371zM1536 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z'
    }]
  }
};

var githubSquare = {
  'github-square': {
    width: 1536,
    height: 1792,
    paths: [{
      d: 'M519 1200q4-6-3-13-9-7-14-2-4 6 3 13 9 7 14 2zM491 1159q-5-7-12-4-6 4 0 12 7 8 12 5 6-4 0-13zM450 1119q2-4-5-8-7-2-8 2-3 5 4 8 8 2 9-2zM471 1142q2-1 1.5-4.5t-3.5-5.5q-6-7-10-3t1 11q6 6 11 2zM557 1217q2-7-9-11-9-3-13 4-2 7 9 11 9 3 13-4zM599 1220q0-8-12-8-10 0-10 8t11 8 11-8zM638 1213q-2-7-13-5t-9 9q2 8 12 6t10-10zM1280 896q0-212-150-362t-362-150-362 150-150 362q0 167 98 300.5t252 185.5q18 3 26.5-5t8.5-20q0-52-1-95-6 1-15.5 2.5t-35.5 2-48-4-43.5-20-29.5-41.5q-23-59-57-74-2-1-4.5-3.5l-8-8t-7-9.5 4-7.5 19.5-3.5q6 0 15 2t30 15.5 33 35.5q16 28 37.5 42t43.5 14 38-3.5 30-9.5q7-47 33-69-49-6-86-18.5t-73-39-55.5-76-19.5-119.5q0-79 53-137-24-62 5-136 19-6 54.5 7.5t60.5 29.5l26 16q58-17 128-17t128 17q11-7 28.5-18t55.5-26 57-9q29 74 5 136 53 58 53 137 0 57-14 100.5t-35.5 70-53.5 44.5-62.5 26-68.5 12q35 31 35 95 0 40-0.5 89t-0.5 51q0 12 8.5 20t26.5 5q154-52 252-185.5t98-300.5zM1536 416v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z'
    }]
  }
};

var bars = {
  bars: {
    width: 1536,
    height: 1792,
    paths: [{
      d: 'M1536 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zM1536 832v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zM1536 320v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z'
    }]
  }
};

var envelope = {
  envelope: {
    width: 1792,
    height: 1792,
    paths: [{
      d: 'M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h1 1q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zM1792 416q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-1-1q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z'
    }]
  }
};

var css_248z$5 = ".center-block{min-width:100%}.center-absolute,.center-block{display:flex;justify-content:center}.center-absolute{flex-direction:column;width:100%;height:100%}body{background-color:#000;color:#fff}* :global(.app-content){flex:auto;overflow:auto;position:relative;flex-grow:1}:global(body){background-color:#000;color:#fff}.app-fab--absolute{position:fixed;bottom:1rem;right:1rem;z-index:1}@media (min-width:1024px){.app-fab--absolute{bottom:1.5rem;right:1.5rem}}#smui-menu{width:100%}#drawer-container{padding:10px;width:280px}#drawer-container.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:280px;margin-right:0}#drawer-container.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl],[dir=rtl] #drawer-container.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:0;margin-right:280px}#social{display:flex;justify-content:space-evenly}#profile-pic{max-width:100%;min-height:330px}.main-content{overflow:auto;padding:16px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start}.main-content p{font-size:16px}* :global(.drawer-list){list-style:none}@media (max-width:500px){#profile-pic{height:100px;min-height:100px;width:100px;border-radius:100%;margin:0 auto}}::selection{color:#000;background:#fc0}";
styleInject(css_248z$5);

var css_248z$6 = "body{background-color:#000;color:#fff}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__surface{background-color:#121212;background-color:var(--mdc-theme-surface,#121212)}.mdc-dialog .mdc-dialog__scrim{background-color:hsla(0,0%,100%,.32)}.mdc-dialog .mdc-dialog__title{color:hsla(0,0%,100%,.87)}.mdc-dialog .mdc-dialog__content{color:hsla(0,0%,100%,.6)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-color:hsla(0,0%,100%,.12)}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media (max-width:592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media (min-width:592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(.8);opacity:0;pointer-events:none}.mdc-dialog__surface{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{line-height:normal;font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title:before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.5rem;font-weight:400;letter-spacing:.03125em;text-decoration:inherit;text-transform:inherit;flex-grow:1;box-sizing:border-box;margin:0;padding:20px 24px;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}.mdc-dialog__button[dir=rtl],[dir=rtl] .mdc-dialog__button{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl],[dir=rtl] .mdc-dialog__button:first-child{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--closing,.mdc-dialog--open,.mdc-dialog--opening{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity .15s linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform .15s cubic-bezier(0,0,.2,1) 0ms}.mdc-dialog--closing .mdc-dialog__container,.mdc-dialog--closing .mdc-dialog__scrim{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:scale(1)}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:scale(1);opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}";
styleInject(css_248z$6);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function createFocusTrapInstance$1(surfaceEl, focusTrapFactory, initialFocusEl) {
  if (focusTrapFactory === void 0) {
    focusTrapFactory = focusTrap_1;
  }

  return focusTrapFactory(surfaceEl, {
    clickOutsideDeactivates: true,
    escapeDeactivates: false,
    initialFocus: initialFocusEl
  });
}
function isScrollable(el) {
  return el ? el.scrollHeight > el.offsetHeight : false;
}
function areTopsMisaligned(els) {
  var tops = new Set();
  [].forEach.call(els, function (el) {
    return tops.add(el.offsetTop);
  });
  return tops.size > 1;
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$6 = {
  CLOSING: 'mdc-dialog--closing',
  OPEN: 'mdc-dialog--open',
  OPENING: 'mdc-dialog--opening',
  SCROLLABLE: 'mdc-dialog--scrollable',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  STACKED: 'mdc-dialog--stacked'
};
var strings$6 = {
  ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
  BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
  BUTTON_SELECTOR: '.mdc-dialog__button',
  CLOSED_EVENT: 'MDCDialog:closed',
  CLOSE_ACTION: 'close',
  CLOSING_EVENT: 'MDCDialog:closing',
  CONTAINER_SELECTOR: '.mdc-dialog__container',
  CONTENT_SELECTOR: '.mdc-dialog__content',
  DESTROY_ACTION: 'destroy',
  INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
  OPENED_EVENT: 'MDCDialog:opened',
  OPENING_EVENT: 'MDCDialog:opening',
  SCRIM_SELECTOR: '.mdc-dialog__scrim',
  SUPPRESS_DEFAULT_PRESS_SELECTOR: ['textarea', '.mdc-menu .mdc-list-item'].join(', '),
  SURFACE_SELECTOR: '.mdc-dialog__surface'
};
var numbers$4 = {
  DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
  DIALOG_ANIMATION_OPEN_TIME_MS: 150
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCDialogFoundation =
/** @class */
function (_super) {
  __extends(MDCDialogFoundation, _super);

  function MDCDialogFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCDialogFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    _this.layoutFrame_ = 0;
    _this.escapeKeyAction_ = strings$6.CLOSE_ACTION;
    _this.scrimClickAction_ = strings$6.CLOSE_ACTION;
    _this.autoStackButtons_ = true;
    _this.areButtonsStacked_ = false;
    return _this;
  }

  Object.defineProperty(MDCDialogFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "strings", {
    get: function get() {
      return strings$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "numbers", {
    get: function get() {
      return numbers$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addBodyClass: function addBodyClass() {
          return undefined;
        },
        addClass: function addClass() {
          return undefined;
        },
        areButtonsStacked: function areButtonsStacked() {
          return false;
        },
        clickDefaultButton: function clickDefaultButton() {
          return undefined;
        },
        eventTargetMatches: function eventTargetMatches() {
          return false;
        },
        getActionFromEvent: function getActionFromEvent() {
          return '';
        },
        getInitialFocusEl: function getInitialFocusEl() {
          return null;
        },
        hasClass: function hasClass() {
          return false;
        },
        isContentScrollable: function isContentScrollable() {
          return false;
        },
        notifyClosed: function notifyClosed() {
          return undefined;
        },
        notifyClosing: function notifyClosing() {
          return undefined;
        },
        notifyOpened: function notifyOpened() {
          return undefined;
        },
        notifyOpening: function notifyOpening() {
          return undefined;
        },
        releaseFocus: function releaseFocus() {
          return undefined;
        },
        removeBodyClass: function removeBodyClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        reverseButtons: function reverseButtons() {
          return undefined;
        },
        trapFocus: function trapFocus() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCDialogFoundation.prototype.init = function () {
    if (this.adapter_.hasClass(cssClasses$6.STACKED)) {
      this.setAutoStackButtons(false);
    }
  };

  MDCDialogFoundation.prototype.destroy = function () {
    if (this.isOpen_) {
      this.close(strings$6.DESTROY_ACTION);
    }

    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
      this.handleAnimationTimerEnd_();
    }

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
      this.layoutFrame_ = 0;
    }
  };

  MDCDialogFoundation.prototype.open = function () {
    var _this = this;

    this.isOpen_ = true;
    this.adapter_.notifyOpening();
    this.adapter_.addClass(cssClasses$6.OPENING); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(function () {
      _this.adapter_.addClass(cssClasses$6.OPEN);

      _this.adapter_.addBodyClass(cssClasses$6.SCROLL_LOCK);

      _this.layout();

      _this.animationTimer_ = setTimeout(function () {
        _this.handleAnimationTimerEnd_();

        _this.adapter_.trapFocus(_this.adapter_.getInitialFocusEl());

        _this.adapter_.notifyOpened();
      }, numbers$4.DIALOG_ANIMATION_OPEN_TIME_MS);
    });
  };

  MDCDialogFoundation.prototype.close = function (action) {
    var _this = this;

    if (action === void 0) {
      action = '';
    }

    if (!this.isOpen_) {
      // Avoid redundant close calls (and events), e.g. from keydown on elements that inherently emit click
      return;
    }

    this.isOpen_ = false;
    this.adapter_.notifyClosing(action);
    this.adapter_.addClass(cssClasses$6.CLOSING);
    this.adapter_.removeClass(cssClasses$6.OPEN);
    this.adapter_.removeBodyClass(cssClasses$6.SCROLL_LOCK);
    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = 0;
    clearTimeout(this.animationTimer_);
    this.animationTimer_ = setTimeout(function () {
      _this.adapter_.releaseFocus();

      _this.handleAnimationTimerEnd_();

      _this.adapter_.notifyClosed(action);
    }, numbers$4.DIALOG_ANIMATION_CLOSE_TIME_MS);
  };

  MDCDialogFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };

  MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
    return this.escapeKeyAction_;
  };

  MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
    this.escapeKeyAction_ = action;
  };

  MDCDialogFoundation.prototype.getScrimClickAction = function () {
    return this.scrimClickAction_;
  };

  MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
    this.scrimClickAction_ = action;
  };

  MDCDialogFoundation.prototype.getAutoStackButtons = function () {
    return this.autoStackButtons_;
  };

  MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
    this.autoStackButtons_ = autoStack;
  };

  MDCDialogFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };
  /** Handles click on the dialog root element. */


  MDCDialogFoundation.prototype.handleClick = function (evt) {
    var isScrim = this.adapter_.eventTargetMatches(evt.target, strings$6.SCRIM_SELECTOR); // Check for scrim click first since it doesn't require querying ancestors.

    if (isScrim && this.scrimClickAction_ !== '') {
      this.close(this.scrimClickAction_);
    } else {
      var action = this.adapter_.getActionFromEvent(evt);

      if (action) {
        this.close(action);
      }
    }
  };
  /** Handles keydown on the dialog root element. */


  MDCDialogFoundation.prototype.handleKeydown = function (evt) {
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;

    if (!isEnter) {
      return;
    }

    var action = this.adapter_.getActionFromEvent(evt);

    if (action) {
      // Action button callback is handled in `handleClick`,
      // since space/enter keydowns on buttons trigger click events.
      return;
    }

    var isDefault = !this.adapter_.eventTargetMatches(evt.target, strings$6.SUPPRESS_DEFAULT_PRESS_SELECTOR);

    if (isEnter && isDefault) {
      this.adapter_.clickDefaultButton();
    }
  };
  /** Handles keydown on the document. */


  MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
    var isEscape = evt.key === 'Escape' || evt.keyCode === 27;

    if (isEscape && this.escapeKeyAction_ !== '') {
      this.close(this.escapeKeyAction_);
    }
  };

  MDCDialogFoundation.prototype.layoutInternal_ = function () {
    if (this.autoStackButtons_) {
      this.detectStackedButtons_();
    }

    this.detectScrollableContent_();
  };

  MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function () {
    this.animationTimer_ = 0;
    this.adapter_.removeClass(cssClasses$6.OPENING);
    this.adapter_.removeClass(cssClasses$6.CLOSING);
  };
  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCDialogFoundation.prototype.runNextAnimationFrame_ = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function () {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };

  MDCDialogFoundation.prototype.detectStackedButtons_ = function () {
    // Remove the class first to let us measure the buttons' natural positions.
    this.adapter_.removeClass(cssClasses$6.STACKED);
    var areButtonsStacked = this.adapter_.areButtonsStacked();

    if (areButtonsStacked) {
      this.adapter_.addClass(cssClasses$6.STACKED);
    }

    if (areButtonsStacked !== this.areButtonsStacked_) {
      this.adapter_.reverseButtons();
      this.areButtonsStacked_ = areButtonsStacked;
    }
  };

  MDCDialogFoundation.prototype.detectScrollableContent_ = function () {
    // Remove the class first to let us measure the natural height of the content.
    this.adapter_.removeClass(cssClasses$6.SCROLLABLE);

    if (this.adapter_.isContentScrollable()) {
      this.adapter_.addClass(cssClasses$6.SCROLLABLE);
    }
  };

  return MDCDialogFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$7 = MDCDialogFoundation.strings;

var MDCDialog =
/** @class */
function (_super) {
  __extends(MDCDialog, _super);

  function MDCDialog() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCDialog.prototype, "isOpen", {
    get: function get() {
      return this.foundation_.isOpen();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "escapeKeyAction", {
    get: function get() {
      return this.foundation_.getEscapeKeyAction();
    },
    set: function set(action) {
      this.foundation_.setEscapeKeyAction(action);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "scrimClickAction", {
    get: function get() {
      return this.foundation_.getScrimClickAction();
    },
    set: function set(action) {
      this.foundation_.setScrimClickAction(action);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "autoStackButtons", {
    get: function get() {
      return this.foundation_.getAutoStackButtons();
    },
    set: function set(autoStack) {
      this.foundation_.setAutoStackButtons(autoStack);
    },
    enumerable: true,
    configurable: true
  });

  MDCDialog.attachTo = function (root) {
    return new MDCDialog(root);
  };

  MDCDialog.prototype.initialize = function (focusTrapFactory) {
    var e_1, _a;

    var container = this.root_.querySelector(strings$7.CONTAINER_SELECTOR);

    if (!container) {
      throw new Error("Dialog component requires a " + strings$7.CONTAINER_SELECTOR + " container element");
    }

    this.container_ = container;
    this.content_ = this.root_.querySelector(strings$7.CONTENT_SELECTOR);
    this.buttons_ = [].slice.call(this.root_.querySelectorAll(strings$7.BUTTON_SELECTOR));
    this.defaultButton_ = this.root_.querySelector("[" + strings$7.BUTTON_DEFAULT_ATTRIBUTE + "]");
    this.focusTrapFactory_ = focusTrapFactory;
    this.buttonRipples_ = [];

    try {
      for (var _b = __values(this.buttons_), _c = _b.next(); !_c.done; _c = _b.next()) {
        var buttonEl = _c.value;
        this.buttonRipples_.push(new MDCRipple(buttonEl));
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  MDCDialog.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.focusTrap_ = createFocusTrapInstance$1(this.container_, this.focusTrapFactory_, this.getInitialFocusEl_() || undefined);
    this.handleClick_ = this.foundation_.handleClick.bind(this.foundation_);
    this.handleKeydown_ = this.foundation_.handleKeydown.bind(this.foundation_);
    this.handleDocumentKeydown_ = this.foundation_.handleDocumentKeydown.bind(this.foundation_);
    this.handleLayout_ = this.layout.bind(this);
    var LAYOUT_EVENTS = ['resize', 'orientationchange'];

    this.handleOpening_ = function () {
      LAYOUT_EVENTS.forEach(function (evtType) {
        return window.addEventListener(evtType, _this.handleLayout_);
      });
      document.addEventListener('keydown', _this.handleDocumentKeydown_);
    };

    this.handleClosing_ = function () {
      LAYOUT_EVENTS.forEach(function (evtType) {
        return window.removeEventListener(evtType, _this.handleLayout_);
      });
      document.removeEventListener('keydown', _this.handleDocumentKeydown_);
    };

    this.listen('click', this.handleClick_);
    this.listen('keydown', this.handleKeydown_);
    this.listen(strings$7.OPENING_EVENT, this.handleOpening_);
    this.listen(strings$7.CLOSING_EVENT, this.handleClosing_);
  };

  MDCDialog.prototype.destroy = function () {
    this.unlisten('click', this.handleClick_);
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(strings$7.OPENING_EVENT, this.handleOpening_);
    this.unlisten(strings$7.CLOSING_EVENT, this.handleClosing_);
    this.handleClosing_();
    this.buttonRipples_.forEach(function (ripple) {
      return ripple.destroy();
    });

    _super.prototype.destroy.call(this);
  };

  MDCDialog.prototype.layout = function () {
    this.foundation_.layout();
  };

  MDCDialog.prototype.open = function () {
    this.foundation_.open();
  };

  MDCDialog.prototype.close = function (action) {
    if (action === void 0) {
      action = '';
    }

    this.foundation_.close(action);
  };

  MDCDialog.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      areButtonsStacked: function areButtonsStacked() {
        return areTopsMisaligned(_this.buttons_);
      },
      clickDefaultButton: function clickDefaultButton() {
        return _this.defaultButton_ && _this.defaultButton_.click();
      },
      eventTargetMatches: function eventTargetMatches(target, selector) {
        return target ? matches$1(target, selector) : false;
      },
      getActionFromEvent: function getActionFromEvent(evt) {
        if (!evt.target) {
          return '';
        }

        var element = closest(evt.target, "[" + strings$7.ACTION_ATTRIBUTE + "]");
        return element && element.getAttribute(strings$7.ACTION_ATTRIBUTE);
      },
      getInitialFocusEl: function getInitialFocusEl() {
        return _this.getInitialFocusEl_();
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      isContentScrollable: function isContentScrollable() {
        return isScrollable(_this.content_);
      },
      notifyClosed: function notifyClosed(action) {
        return _this.emit(strings$7.CLOSED_EVENT, action ? {
          action: action
        } : {});
      },
      notifyClosing: function notifyClosing(action) {
        return _this.emit(strings$7.CLOSING_EVENT, action ? {
          action: action
        } : {});
      },
      notifyOpened: function notifyOpened() {
        return _this.emit(strings$7.OPENED_EVENT, {});
      },
      notifyOpening: function notifyOpening() {
        return _this.emit(strings$7.OPENING_EVENT, {});
      },
      releaseFocus: function releaseFocus() {
        return _this.focusTrap_.deactivate();
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      reverseButtons: function reverseButtons() {
        _this.buttons_.reverse();

        _this.buttons_.forEach(function (button) {
          button.parentElement.appendChild(button);
        });
      },
      trapFocus: function trapFocus() {
        return _this.focusTrap_.activate();
      }
    };
    return new MDCDialogFoundation(adapter);
  };

  MDCDialog.prototype.getInitialFocusEl_ = function () {
    return document.querySelector("[" + strings$7.INITIAL_FOCUS_ATTRIBUTE + "]");
  };

  return MDCDialog;
}(MDCComponent);

function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$i = "node_modules/@smui/dialog/Dialog.svelte";

function create_fragment$m(ctx) {
  var div3;
  var div1;
  var div0;
  var t;
  var div2;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[19].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[18], null);
  var div3_levels = [{
    class: "mdc-dialog " +
    /*className*/
    ctx[1]
  }, {
    role: "alertdialog"
  }, {
    "aria-modal": "true"
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class"])];
  var div3_data = {};

  for (var i = 0; i < div3_levels.length; i += 1) {
    div3_data = assign(div3_data, div3_levels[i]);
  }

  var block = {
    c: function create() {
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (default_slot) default_slot.c();
      t = space();
      div2 = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-modal": true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if (default_slot) default_slot.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      children(div2).forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "mdc-dialog__surface");
      add_location(div0, file$i, 11, 4, 273);
      attr_dev(div1, "class", "mdc-dialog__container");
      add_location(div1, file$i, 10, 2, 233);
      attr_dev(div2, "class", "mdc-dialog__scrim");
      add_location(div2, file$i, 15, 2, 349);
      set_attributes(div3, div3_data);
      add_location(div3, file$i, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div1);
      append_dev(div1, div0);

      if (default_slot) {
        default_slot.m(div0, null);
      }

      append_dev(div3, t);
      append_dev(div3, div2);
      /*div3_binding*/

      ctx[20](div3);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div3,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[3].call(null, div3)), listen_dev(div3, "MDCDialog:opened",
      /*handleDialogOpened*/
      ctx[4], false, false, false)];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        262144) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[18], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[18], dirty, null));
        }
      }

      set_attributes(div3, get_spread_update(div3_levels, [dirty &
      /*className*/
      2 && {
        class: "mdc-dialog " +
        /*className*/
        ctx[1]
      }, {
        role: "alertdialog"
      }, {
        "aria-modal": "true"
      }, dirty &
      /*exclude, $$props*/
      32 && exclude(
      /*$$props*/
      ctx[5], ["use", "class"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
      if (default_slot) default_slot.d(detaching);
      /*div3_binding*/

      ctx[20](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$m.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$m($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCDialog:opening", "MDCDialog:opened", "MDCDialog:closing", "MDCDialog:closed"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$escapeKeyAc = _$$props3.escapeKeyAction,
      escapeKeyAction = _$$props3$escapeKeyAc === void 0 ? "close" : _$$props3$escapeKeyAc;
  var _$$props4 = $$props,
      _$$props4$scrimClickA = _$$props4.scrimClickAction,
      scrimClickAction = _$$props4$scrimClickA === void 0 ? "close" : _$$props4$scrimClickA;
  var _$$props5 = $$props,
      _$$props5$autoStackBu = _$$props5.autoStackButtons,
      autoStackButtons = _$$props5$autoStackBu === void 0 ? true : _$$props5$autoStackBu;
  var element;
  var dialog;
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  var layoutListeners = [];

  var addLayoutListenerFn = function addLayoutListenerFn(listener) {
    layoutListeners.push(listener);
    return function () {
      var idx = layoutListeners.indexOf(listener);

      if (idx >= 0) {
        layoutListeners.splice(idx, 1);
      }
    };
  };

  setContext("SMUI:addLayoutListener", addLayoutListenerFn);

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount(function () {
    $$invalidate(13, dialog = new MDCDialog(element));
  });
  onDestroy(function () {
    dialog && dialog.destroy();

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function handleDialogOpened() {
    layoutListeners.forEach(function (listener) {
      return listener();
    });
  }

  function open() {
    var _dialog;

    return (_dialog = dialog).open.apply(_dialog, arguments);
  }

  function close() {
    var _dialog2;

    return (_dialog2 = dialog).close.apply(_dialog2, arguments);
  }

  function isOpen() {
    return dialog.isOpen;
  }

  function layout() {
    var _dialog3;

    return (_dialog3 = dialog).layout.apply(_dialog3, arguments);
  }

  var _$$props6 = $$props,
      _$$props6$$$slots = _$$props6.$$slots,
      $$slots = _$$props6$$$slots === void 0 ? {} : _$$props6$$$slots,
      $$scope = _$$props6.$$scope;
  validate_slots("Dialog", $$slots, ['default']);

  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(2, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("escapeKeyAction" in $$new_props) $$invalidate(6, escapeKeyAction = $$new_props.escapeKeyAction);
    if ("scrimClickAction" in $$new_props) $$invalidate(7, scrimClickAction = $$new_props.scrimClickAction);
    if ("autoStackButtons" in $$new_props) $$invalidate(8, autoStackButtons = $$new_props.autoStackButtons);
    if ("$$scope" in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCDialog: MDCDialog,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      escapeKeyAction: escapeKeyAction,
      scrimClickAction: scrimClickAction,
      autoStackButtons: autoStackButtons,
      element: element,
      dialog: dialog,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      layoutListeners: layoutListeners,
      addLayoutListenerFn: addLayoutListenerFn,
      handleDialogOpened: handleDialogOpened,
      open: open,
      close: close,
      isOpen: isOpen,
      layout: layout
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("escapeKeyAction" in $$props) $$invalidate(6, escapeKeyAction = $$new_props.escapeKeyAction);
    if ("scrimClickAction" in $$props) $$invalidate(7, scrimClickAction = $$new_props.scrimClickAction);
    if ("autoStackButtons" in $$props) $$invalidate(8, autoStackButtons = $$new_props.autoStackButtons);
    if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    if ("dialog" in $$props) $$invalidate(13, dialog = $$new_props.dialog);
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    if ("layoutListeners" in $$props) layoutListeners = $$new_props.layoutListeners;
    if ("addLayoutListenerFn" in $$props) addLayoutListenerFn = $$new_props.addLayoutListenerFn;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*dialog, escapeKeyAction*/
    8256) {
       dialog && $$invalidate(13, dialog.escapeKeyAction = escapeKeyAction, dialog);
    }

    if ($$self.$$.dirty &
    /*dialog, scrimClickAction*/
    8320) {
       dialog && $$invalidate(13, dialog.scrimClickAction = scrimClickAction, dialog);
    }

    if ($$self.$$.dirty &
    /*dialog, autoStackButtons*/
    8448) {
       dialog && $$invalidate(13, dialog.autoStackButtons = autoStackButtons, dialog);
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, element, forwardEvents, handleDialogOpened, $$props, escapeKeyAction, scrimClickAction, autoStackButtons, open, close, isOpen, layout, dialog, removeLayoutListener, addLayoutListener, layoutListeners, addLayoutListenerFn, $$scope, $$slots, div3_binding];
}

var Dialog = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Dialog, _SvelteComponentDev);

  var _super = _createSuper$n(Dialog);

  function Dialog(options) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$m, create_fragment$m, safe_not_equal, {
      use: 0,
      class: 1,
      escapeKeyAction: 6,
      scrimClickAction: 7,
      autoStackButtons: 8,
      open: 9,
      close: 10,
      isOpen: 11,
      layout: 12
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Dialog",
      options: options,
      id: create_fragment$m.name
    });
    return _this;
  }

  _createClass(Dialog, [{
    key: "use",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "escapeKeyAction",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "scrimClickAction",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "autoStackButtons",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      return this.$$.ctx[9];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "close",
    get: function get() {
      return this.$$.ctx[10];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[12];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Dialog;
}(SvelteComponentDev);

classAdderBuilder({
  class: 'mdc-dialog__title',
  component: H2,
  contexts: {}
});

var Content$1 = classAdderBuilder({
  class: 'mdc-dialog__content',
  component: Div,
  contexts: {}
});

function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$j = "node_modules/@smui/common/Footer.svelte";

function create_fragment$n(ctx) {
  var footer;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var footer_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var footer_data = {};

  for (var i = 0; i < footer_levels.length; i += 1) {
    footer_data = assign(footer_data, footer_levels[i]);
  }

  var block = {
    c: function create() {
      footer = element("footer");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {});
      var footer_nodes = children(footer);
      if (default_slot) default_slot.l(footer_nodes);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(footer, footer_data);
      add_location(footer, file$j, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, footer, anchor);

      if (default_slot) {
        default_slot.m(footer, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, footer,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[1].call(null, footer))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[3], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[3], dirty, null));
        }
      }

      set_attributes(footer, get_spread_update(footer_levels, [dirty &
      /*exclude, $$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(footer);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$n.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$n($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("Footer", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var Footer = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Footer, _SvelteComponentDev);

  var _super = _createSuper$o(Footer);

  function Footer(options) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$n, create_fragment$n, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Footer",
      options: options,
      id: create_fragment$n.name
    });
    return _this;
  }

  _createClass(Footer, [{
    key: "use",
    get: function get() {
      throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Footer;
}(SvelteComponentDev);

classAdderBuilder({
  class: 'mdc-dialog__actions',
  component: Footer,
  contexts: {
    'SMUI:button:context': 'dialog:action'
  }
});

function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$k = "src/routes/_layout.svelte"; // (119:0) {:else}

function create_else_block$3(ctx) {
  var updating_open;
  var t;
  var current;

  function drawer_1_open_binding_1(value) {
    /*drawer_1_open_binding_1*/
    ctx[13].call(null, value);
  }

  var drawer_1_props = {
    id: "drawer-container",
    variant: "modal",
    $$slots: {
      default: [create_default_slot_22]
    },
    $$scope: {
      ctx: ctx
    }
  };

  if (
  /*drawerOpenR*/
  ctx[2] !== void 0) {
    drawer_1_props.open =
    /*drawerOpenR*/
    ctx[2];
  }

  var drawer_1 = new Drawer({
    props: drawer_1_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(drawer_1, "open", drawer_1_open_binding_1);
  });
  var scrim = new Scrim({
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(drawer_1.$$.fragment);
      t = space();
      create_component(scrim.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(drawer_1.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(scrim.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(drawer_1, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(scrim, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var drawer_1_changes = {};

      if (dirty &
      /*$$scope, dialog*/
      16400) {
        drawer_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_open && dirty &
      /*drawerOpenR*/
      4) {
        updating_open = true;
        drawer_1_changes.open =
        /*drawerOpenR*/
        ctx[2];
        add_flush_callback(function () {
          return updating_open = false;
        });
      }

      drawer_1.$set(drawer_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(drawer_1.$$.fragment, local);
      transition_in(scrim.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(drawer_1.$$.fragment, local);
      transition_out(scrim.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(drawer_1, detaching);
      if (detaching) detach_dev(t);
      destroy_component(scrim, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$3.name,
    type: "else",
    source: "(119:0) {:else}",
    ctx: ctx
  });
  return block;
} // (54:0) {#if !onResponsive}


function create_if_block$4(ctx) {
  var updating_open;
  var current;

  function drawer_1_open_binding(value) {
    /*drawer_1_open_binding*/
    ctx[10].call(null, value);
  }

  var drawer_1_props = {
    id: "drawer-container",
    variant: "dismissible",
    $$slots: {
      default: [create_default_slot_2]
    },
    $$scope: {
      ctx: ctx
    }
  };

  if (
  /*drawerOpen*/
  ctx[0] !== void 0) {
    drawer_1_props.open =
    /*drawerOpen*/
    ctx[0];
  }

  var drawer_1 = new Drawer({
    props: drawer_1_props,
    $$inline: true
  });
  /*drawer_1_binding*/

  ctx[9](drawer_1);
  binding_callbacks.push(function () {
    return bind(drawer_1, "open", drawer_1_open_binding);
  });
  var block = {
    c: function create() {
      create_component(drawer_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(drawer_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(drawer_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var drawer_1_changes = {};

      if (dirty &
      /*$$scope, dialog*/
      16400) {
        drawer_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_open && dirty &
      /*drawerOpen*/
      1) {
        updating_open = true;
        drawer_1_changes.open =
        /*drawerOpen*/
        ctx[0];
        add_flush_callback(function () {
          return updating_open = false;
        });
      }

      drawer_1.$set(drawer_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(drawer_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(drawer_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      /*drawer_1_binding*/
      ctx[9](null);
      destroy_component(drawer_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(54:0) {#if !onResponsive}",
    ctx: ctx
  });
  return block;
} // (127:3) <Title>


function create_default_slot_40(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Diego Sánchez");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Diego Sánchez");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_40.name,
    type: "slot",
    source: "(127:3) <Title>",
    ctx: ctx
  });
  return block;
} // (128:3) <Subtitle>


function create_default_slot_39(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Full Stack Web developer");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Full Stack Web developer");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_39.name,
    type: "slot",
    source: "(128:3) <Subtitle>",
    ctx: ctx
  });
  return block;
} // (126:2) <Header>


function create_default_slot_38(ctx) {
  var t;
  var current;
  var title = new Title({
    props: {
      $$slots: {
        default: [create_default_slot_40]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var subtitle = new Subtitle({
    props: {
      $$slots: {
        default: [create_default_slot_39]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(title.$$.fragment);
      t = space();
      create_component(subtitle.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(title.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(subtitle.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(title, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(subtitle, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var title_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        title_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      title.$set(title_changes);
      var subtitle_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        subtitle_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      subtitle.$set(subtitle_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(title.$$.fragment, local);
      transition_in(subtitle.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(title.$$.fragment, local);
      transition_out(subtitle.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(title, detaching);
      if (detaching) detach_dev(t);
      destroy_component(subtitle, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_38.name,
    type: "slot",
    source: "(126:2) <Header>",
    ctx: ctx
  });
  return block;
} // (133:6) <Text>


function create_default_slot_37(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("About");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "About");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_37.name,
    type: "slot",
    source: "(133:6) <Text>",
    ctx: ctx
  });
  return block;
} // (132:5) <Item href=".">


function create_default_slot_36(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_37]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_36.name,
    type: "slot",
    source: "(132:5) <Item href=\\\".\\\">",
    ctx: ctx
  });
  return block;
} // (131:3) <List class="drawer-list">


function create_default_slot_35(ctx) {
  var current;
  var item = new Item({
    props: {
      href: ".",
      $$slots: {
        default: [create_default_slot_36]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_35.name,
    type: "slot",
    source: "(131:3) <List class=\\\"drawer-list\\\">",
    ctx: ctx
  });
  return block;
} // (139:6) <Text>


function create_default_slot_34(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Academics");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Academics");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_34.name,
    type: "slot",
    source: "(139:6) <Text>",
    ctx: ctx
  });
  return block;
} // (138:5) <Item href="/academics" >


function create_default_slot_33(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_34]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_33.name,
    type: "slot",
    source: "(138:5) <Item href=\\\"/academics\\\" >",
    ctx: ctx
  });
  return block;
} // (137:3) <List class="drawer-list">


function create_default_slot_32(ctx) {
  var current;
  var item = new Item({
    props: {
      href: "/academics",
      $$slots: {
        default: [create_default_slot_33]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_32.name,
    type: "slot",
    source: "(137:3) <List class=\\\"drawer-list\\\">",
    ctx: ctx
  });
  return block;
} // (145:6) <Text>


function create_default_slot_31(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Certifications");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Certifications");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_31.name,
    type: "slot",
    source: "(145:6) <Text>",
    ctx: ctx
  });
  return block;
} // (144:5) <Item href="/certifications">


function create_default_slot_30(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_31]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_30.name,
    type: "slot",
    source: "(144:5) <Item href=\\\"/certifications\\\">",
    ctx: ctx
  });
  return block;
} // (143:3) <List class="drawer-list">


function create_default_slot_29(ctx) {
  var current;
  var item = new Item({
    props: {
      href: "/certifications",
      $$slots: {
        default: [create_default_slot_30]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_29.name,
    type: "slot",
    source: "(143:3) <List class=\\\"drawer-list\\\">",
    ctx: ctx
  });
  return block;
} // (151:6) <Text>


function create_default_slot_28(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Projects");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Projects");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_28.name,
    type: "slot",
    source: "(151:6) <Text>",
    ctx: ctx
  });
  return block;
} // (150:5) <Item href="/projects">


function create_default_slot_27(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_28]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_27.name,
    type: "slot",
    source: "(150:5) <Item href=\\\"/projects\\\">",
    ctx: ctx
  });
  return block;
} // (149:3) <List class="drawer-list">


function create_default_slot_26(ctx) {
  var current;
  var item = new Item({
    props: {
      href: "/projects",
      $$slots: {
        default: [create_default_slot_27]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_26.name,
    type: "slot",
    source: "(149:3) <List class=\\\"drawer-list\\\">",
    ctx: ctx
  });
  return block;
} // (157:4) <Content id="dialog-content">


function create_default_slot_25(ctx) {
  var div;
  var p0;
  var t0;
  var t1;
  var p1;
  var b;
  var t2;
  var block = {
    c: function create() {
      div = element("div");
      p0 = element("p");
      t0 = text("Send me an email at");
      t1 = space();
      p1 = element("p");
      b = element("b");
      t2 = text("diegosandmg@gmail.com");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true
      });
      var div_nodes = children(div);
      p0 = claim_element(div_nodes, "P", {});
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "Send me an email at");
      p0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {});
      var p1_nodes = children(p1);
      b = claim_element(p1_nodes, "B", {});
      var b_nodes = children(b);
      t2 = claim_text(b_nodes, "diegosandmg@gmail.com");
      b_nodes.forEach(detach_dev);
      p1_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(p0, file$k, 158, 5, 3853);
      add_location(b, file$k, 159, 8, 3888);
      add_location(p1, file$k, 159, 5, 3885);
      set_style(div, "padding", "10px");
      set_style(div, "text-align", "center");
      add_location(div, file$k, 157, 4, 3799);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, p0);
      append_dev(p0, t0);
      append_dev(div, t1);
      append_dev(div, p1);
      append_dev(p1, b);
      append_dev(b, t2);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_25.name,
    type: "slot",
    source: "(157:4) <Content id=\\\"dialog-content\\\">",
    ctx: ctx
  });
  return block;
} // (156:3) <Dialog bind:this={dialog}>


function create_default_slot_24(ctx) {
  var current;
  var content = new Content({
    props: {
      id: "dialog-content",
      $$slots: {
        default: [create_default_slot_25]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(content.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var content_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(content, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_24.name,
    type: "slot",
    source: "(156:3) <Dialog bind:this={dialog}>",
    ctx: ctx
  });
  return block;
} // (130:2) <Content>


function create_default_slot_23(ctx) {
  var t0;
  var t1;
  var t2;
  var t3;
  var t4;
  var t5;
  var t6;
  var div1;
  var t7;
  var div0;
  var t8;
  var a0;
  var t9;
  var a1;
  var current;
  var dispose;
  var list0 = new List({
    props: {
      class: "drawer-list",
      $$slots: {
        default: [create_default_slot_35]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var separator0 = new Separator({
    $$inline: true
  });
  var list1 = new List({
    props: {
      class: "drawer-list",
      $$slots: {
        default: [create_default_slot_32]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var separator1 = new Separator({
    $$inline: true
  });
  var list2 = new List({
    props: {
      class: "drawer-list",
      $$slots: {
        default: [create_default_slot_29]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var separator2 = new Separator({
    $$inline: true
  });
  var list3 = new List({
    props: {
      class: "drawer-list",
      $$slots: {
        default: [create_default_slot_26]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var dialog_1_props = {
    $$slots: {
      default: [create_default_slot_24]
    },
    $$scope: {
      ctx: ctx
    }
  };
  var dialog_1 = new Dialog({
    props: dialog_1_props,
    $$inline: true
  });
  /*dialog_1_binding_1*/

  ctx[11](dialog_1);
  var icon0 = new Icon({
    props: {
      data: envelope,
      scale: "2"
    },
    $$inline: true
  });
  var icon1 = new Icon({
    props: {
      data: githubSquare,
      scale: "2"
    },
    $$inline: true
  });
  var icon2 = new Icon({
    props: {
      data: linkedinSquare,
      scale: "2"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(list0.$$.fragment);
      t0 = space();
      create_component(separator0.$$.fragment);
      t1 = space();
      create_component(list1.$$.fragment);
      t2 = space();
      create_component(separator1.$$.fragment);
      t3 = space();
      create_component(list2.$$.fragment);
      t4 = space();
      create_component(separator2.$$.fragment);
      t5 = space();
      create_component(list3.$$.fragment);
      t6 = space();
      div1 = element("div");
      create_component(dialog_1.$$.fragment);
      t7 = space();
      div0 = element("div");
      create_component(icon0.$$.fragment);
      t8 = space();
      a0 = element("a");
      create_component(icon1.$$.fragment);
      t9 = space();
      a1 = element("a");
      create_component(icon2.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      claim_component(list0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(separator0.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(list1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(separator1.$$.fragment, nodes);
      t3 = claim_space(nodes);
      claim_component(list2.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(separator2.$$.fragment, nodes);
      t5 = claim_space(nodes);
      claim_component(list3.$$.fragment, nodes);
      t6 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        id: true
      });
      var div1_nodes = children(div1);
      claim_component(dialog_1.$$.fragment, div1_nodes);
      t7 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);
      claim_component(icon0.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t8 = claim_space(div1_nodes);
      a0 = claim_element(div1_nodes, "A", {
        title: true,
        href: true,
        target: true
      });
      var a0_nodes = children(a0);
      claim_component(icon1.$$.fragment, a0_nodes);
      a0_nodes.forEach(detach_dev);
      t9 = claim_space(div1_nodes);
      a1 = claim_element(div1_nodes, "A", {
        title: true,
        href: true,
        target: true
      });
      var a1_nodes = children(a1);
      claim_component(icon2.$$.fragment, a1_nodes);
      a1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(div0, file$k, 164, 3, 3964);
      attr_dev(a0, "title", "Github profile");
      attr_dev(a0, "href", "https://github.com/diegosanchezp/");
      attr_dev(a0, "target", "_blank");
      add_location(a0, file$k, 168, 3, 4053);
      attr_dev(a1, "title", "LinkedIn profile");
      attr_dev(a1, "href", "https://www.linkedin.com/in/diego-s%C3%A1nchez-b0753b137/");
      attr_dev(a1, "target", "_blank");
      add_location(a1, file$k, 172, 3, 4191);
      attr_dev(div1, "id", "social");
      add_location(div1, file$k, 153, 3, 3711);
    },
    m: function mount(target, anchor, remount) {
      mount_component(list0, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(separator0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(list1, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(separator1, target, anchor);
      insert_dev(target, t3, anchor);
      mount_component(list2, target, anchor);
      insert_dev(target, t4, anchor);
      mount_component(separator2, target, anchor);
      insert_dev(target, t5, anchor);
      mount_component(list3, target, anchor);
      insert_dev(target, t6, anchor);
      insert_dev(target, div1, anchor);
      mount_component(dialog_1, div1, null);
      append_dev(div1, t7);
      append_dev(div1, div0);
      mount_component(icon0, div0, null);
      append_dev(div1, t8);
      append_dev(div1, a0);
      mount_component(icon1, a0, null);
      append_dev(div1, t9);
      append_dev(div1, a1);
      mount_component(icon2, a1, null);
      current = true;
      if (remount) dispose();
      dispose = listen_dev(div0, "click",
      /*click_handler_1*/
      ctx[12], false, false, false);
    },
    p: function update(ctx, dirty) {
      var list0_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list0.$set(list0_changes);
      var list1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list1.$set(list1_changes);
      var list2_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list2.$set(list2_changes);
      var list3_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list3_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list3.$set(list3_changes);
      var dialog_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        dialog_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      dialog_1.$set(dialog_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list0.$$.fragment, local);
      transition_in(separator0.$$.fragment, local);
      transition_in(list1.$$.fragment, local);
      transition_in(separator1.$$.fragment, local);
      transition_in(list2.$$.fragment, local);
      transition_in(separator2.$$.fragment, local);
      transition_in(list3.$$.fragment, local);
      transition_in(dialog_1.$$.fragment, local);
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      transition_in(icon2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list0.$$.fragment, local);
      transition_out(separator0.$$.fragment, local);
      transition_out(list1.$$.fragment, local);
      transition_out(separator1.$$.fragment, local);
      transition_out(list2.$$.fragment, local);
      transition_out(separator2.$$.fragment, local);
      transition_out(list3.$$.fragment, local);
      transition_out(dialog_1.$$.fragment, local);
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      transition_out(icon2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(list0, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(separator0, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(list1, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(separator1, detaching);
      if (detaching) detach_dev(t3);
      destroy_component(list2, detaching);
      if (detaching) detach_dev(t4);
      destroy_component(separator2, detaching);
      if (detaching) detach_dev(t5);
      destroy_component(list3, detaching);
      if (detaching) detach_dev(t6);
      if (detaching) detach_dev(div1);
      /*dialog_1_binding_1*/

      ctx[11](null);
      destroy_component(dialog_1);
      destroy_component(icon0);
      destroy_component(icon1);
      destroy_component(icon2);
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_23.name,
    type: "slot",
    source: "(130:2) <Content>",
    ctx: ctx
  });
  return block;
} // (121:1) <Drawer    id="drawer-container"    variant="modal" bind:open={drawerOpenR}>


function create_default_slot_22(ctx) {
  var img;
  var img_src_value;
  var t0;
  var t1;
  var current;
  var header = new Header({
    props: {
      $$slots: {
        default: [create_default_slot_38]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var content = new Content({
    props: {
      $$slots: {
        default: [create_default_slot_23]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      img = element("img");
      t0 = space();
      create_component(header.$$.fragment);
      t1 = space();
      create_component(content.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      img = claim_element(nodes, "IMG", {
        id: true,
        alt: true,
        src: true
      });
      t0 = claim_space(nodes);
      claim_component(header.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(content.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "id", "profile-pic");
      attr_dev(img, "alt", "profile-pic");
      if (img.src !== (img_src_value = "Images/ProfilePic.jpg")) attr_dev(img, "src", img_src_value);
      add_location(img, file$k, 124, 2, 3023);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
      insert_dev(target, t0, anchor);
      mount_component(header, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(content, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var header_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        header_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      header.$set(header_changes);
      var content_changes = {};

      if (dirty &
      /*$$scope, dialog*/
      16400) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(header.$$.fragment, local);
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(header.$$.fragment, local);
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(img);
      if (detaching) detach_dev(t0);
      destroy_component(header, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(content, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_22.name,
    type: "slot",
    source: "(121:1) <Drawer    id=\\\"drawer-container\\\"    variant=\\\"modal\\\" bind:open={drawerOpenR}>",
    ctx: ctx
  });
  return block;
} // (62:3) <Title>


function create_default_slot_21(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Diego Sánchez");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Diego Sánchez");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_21.name,
    type: "slot",
    source: "(62:3) <Title>",
    ctx: ctx
  });
  return block;
} // (63:3) <Subtitle>


function create_default_slot_20(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Full Stack Web developer");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Full Stack Web developer");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_20.name,
    type: "slot",
    source: "(63:3) <Subtitle>",
    ctx: ctx
  });
  return block;
} // (61:2) <Header>


function create_default_slot_19(ctx) {
  var t;
  var current;
  var title = new Title({
    props: {
      $$slots: {
        default: [create_default_slot_21]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var subtitle = new Subtitle({
    props: {
      $$slots: {
        default: [create_default_slot_20]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(title.$$.fragment);
      t = space();
      create_component(subtitle.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(title.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(subtitle.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(title, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(subtitle, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var title_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        title_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      title.$set(title_changes);
      var subtitle_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        subtitle_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      subtitle.$set(subtitle_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(title.$$.fragment, local);
      transition_in(subtitle.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(title.$$.fragment, local);
      transition_out(subtitle.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(title, detaching);
      if (detaching) detach_dev(t);
      destroy_component(subtitle, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_19.name,
    type: "slot",
    source: "(61:2) <Header>",
    ctx: ctx
  });
  return block;
} // (69:6) <Text>


function create_default_slot_18(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("About");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "About");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_18.name,
    type: "slot",
    source: "(69:6) <Text>",
    ctx: ctx
  });
  return block;
} // (68:5) <Item href=".">


function create_default_slot_17(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_18]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_17.name,
    type: "slot",
    source: "(68:5) <Item href=\\\".\\\">",
    ctx: ctx
  });
  return block;
} // (67:3) <List>


function create_default_slot_16(ctx) {
  var current;
  var item = new Item({
    props: {
      href: ".",
      $$slots: {
        default: [create_default_slot_17]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_16.name,
    type: "slot",
    source: "(67:3) <List>",
    ctx: ctx
  });
  return block;
} // (75:6) <Text>


function create_default_slot_15(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Academics");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Academics");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_15.name,
    type: "slot",
    source: "(75:6) <Text>",
    ctx: ctx
  });
  return block;
} // (74:5) <Item href="/academics">


function create_default_slot_14(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_15]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_14.name,
    type: "slot",
    source: "(74:5) <Item href=\\\"/academics\\\">",
    ctx: ctx
  });
  return block;
} // (73:3) <List>


function create_default_slot_13(ctx) {
  var current;
  var item = new Item({
    props: {
      href: "/academics",
      $$slots: {
        default: [create_default_slot_14]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_13.name,
    type: "slot",
    source: "(73:3) <List>",
    ctx: ctx
  });
  return block;
} // (81:6) <Text>


function create_default_slot_12(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Certifications");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Certifications");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_12.name,
    type: "slot",
    source: "(81:6) <Text>",
    ctx: ctx
  });
  return block;
} // (80:5) <Item href="/certifications">


function create_default_slot_11(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_12]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_11.name,
    type: "slot",
    source: "(80:5) <Item href=\\\"/certifications\\\">",
    ctx: ctx
  });
  return block;
} // (79:3) <List>


function create_default_slot_10(ctx) {
  var current;
  var item = new Item({
    props: {
      href: "/certifications",
      $$slots: {
        default: [create_default_slot_11]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_10.name,
    type: "slot",
    source: "(79:3) <List>",
    ctx: ctx
  });
  return block;
} // (87:6) <Text>


function create_default_slot_9(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Projects");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Projects");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_9.name,
    type: "slot",
    source: "(87:6) <Text>",
    ctx: ctx
  });
  return block;
} // (86:5) <Item href="/projects">


function create_default_slot_8(ctx) {
  var current;
  var text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_9]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_8.name,
    type: "slot",
    source: "(86:5) <Item href=\\\"/projects\\\">",
    ctx: ctx
  });
  return block;
} // (85:3) <List class="drawer-list">


function create_default_slot_7(ctx) {
  var current;
  var item = new Item({
    props: {
      href: "/projects",
      $$slots: {
        default: [create_default_slot_8]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var item_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_7.name,
    type: "slot",
    source: "(85:3) <List class=\\\"drawer-list\\\">",
    ctx: ctx
  });
  return block;
} // (66:3) <Menu static id="smui-menu">


function create_default_slot_6(ctx) {
  var t0;
  var t1;
  var t2;
  var t3;
  var t4;
  var t5;
  var current;
  var list0 = new List({
    props: {
      $$slots: {
        default: [create_default_slot_16]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var separator0 = new Separator({
    $$inline: true
  });
  var list1 = new List({
    props: {
      $$slots: {
        default: [create_default_slot_13]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var separator1 = new Separator({
    $$inline: true
  });
  var list2 = new List({
    props: {
      $$slots: {
        default: [create_default_slot_10]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var separator2 = new Separator({
    $$inline: true
  });
  var list3 = new List({
    props: {
      class: "drawer-list",
      $$slots: {
        default: [create_default_slot_7]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(list0.$$.fragment);
      t0 = space();
      create_component(separator0.$$.fragment);
      t1 = space();
      create_component(list1.$$.fragment);
      t2 = space();
      create_component(separator1.$$.fragment);
      t3 = space();
      create_component(list2.$$.fragment);
      t4 = space();
      create_component(separator2.$$.fragment);
      t5 = space();
      create_component(list3.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(list0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(separator0.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(list1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(separator1.$$.fragment, nodes);
      t3 = claim_space(nodes);
      claim_component(list2.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(separator2.$$.fragment, nodes);
      t5 = claim_space(nodes);
      claim_component(list3.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(list0, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(separator0, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(list1, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(separator1, target, anchor);
      insert_dev(target, t3, anchor);
      mount_component(list2, target, anchor);
      insert_dev(target, t4, anchor);
      mount_component(separator2, target, anchor);
      insert_dev(target, t5, anchor);
      mount_component(list3, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var list0_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list0.$set(list0_changes);
      var list1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list1.$set(list1_changes);
      var list2_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list2.$set(list2_changes);
      var list3_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        list3_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list3.$set(list3_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list0.$$.fragment, local);
      transition_in(separator0.$$.fragment, local);
      transition_in(list1.$$.fragment, local);
      transition_in(separator1.$$.fragment, local);
      transition_in(list2.$$.fragment, local);
      transition_in(separator2.$$.fragment, local);
      transition_in(list3.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list0.$$.fragment, local);
      transition_out(separator0.$$.fragment, local);
      transition_out(list1.$$.fragment, local);
      transition_out(separator1.$$.fragment, local);
      transition_out(list2.$$.fragment, local);
      transition_out(separator2.$$.fragment, local);
      transition_out(list3.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(list0, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(separator0, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(list1, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(separator1, detaching);
      if (detaching) detach_dev(t3);
      destroy_component(list2, detaching);
      if (detaching) detach_dev(t4);
      destroy_component(separator2, detaching);
      if (detaching) detach_dev(t5);
      destroy_component(list3, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(66:3) <Menu static id=\\\"smui-menu\\\">",
    ctx: ctx
  });
  return block;
} // (98:4) <Content id="dialog-content">


function create_default_slot_5(ctx) {
  var div;
  var p0;
  var t0;
  var t1;
  var p1;
  var b;
  var t2;
  var block = {
    c: function create() {
      div = element("div");
      p0 = element("p");
      t0 = text("Send me an email at");
      t1 = space();
      p1 = element("p");
      b = element("b");
      t2 = text("diegosandmg@gmail.com");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true
      });
      var div_nodes = children(div);
      p0 = claim_element(div_nodes, "P", {});
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "Send me an email at");
      p0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {});
      var p1_nodes = children(p1);
      b = claim_element(p1_nodes, "B", {});
      var b_nodes = children(b);
      t2 = claim_text(b_nodes, "diegosandmg@gmail.com");
      b_nodes.forEach(detach_dev);
      p1_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(p0, file$k, 99, 5, 2400);
      add_location(b, file$k, 100, 8, 2435);
      add_location(p1, file$k, 100, 5, 2432);
      set_style(div, "padding", "10px");
      set_style(div, "text-align", "center");
      add_location(div, file$k, 98, 4, 2346);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, p0);
      append_dev(p0, t0);
      append_dev(div, t1);
      append_dev(div, p1);
      append_dev(p1, b);
      append_dev(b, t2);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_5.name,
    type: "slot",
    source: "(98:4) <Content id=\\\"dialog-content\\\">",
    ctx: ctx
  });
  return block;
} // (97:3) <Dialog bind:this={dialog}>


function create_default_slot_4(ctx) {
  var current;
  var content = new Content({
    props: {
      id: "dialog-content",
      $$slots: {
        default: [create_default_slot_5]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(content.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var content_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(content, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(97:3) <Dialog bind:this={dialog}>",
    ctx: ctx
  });
  return block;
} // (65:2) <Content>


function create_default_slot_3(ctx) {
  var t0;
  var div1;
  var t1;
  var div0;
  var t2;
  var a0;
  var t3;
  var a1;
  var current;
  var dispose;
  var menu = new Menu({
    props: {
      static: true,
      id: "smui-menu",
      $$slots: {
        default: [create_default_slot_6]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var dialog_1_props = {
    $$slots: {
      default: [create_default_slot_4]
    },
    $$scope: {
      ctx: ctx
    }
  };
  var dialog_1 = new Dialog({
    props: dialog_1_props,
    $$inline: true
  });
  /*dialog_1_binding*/

  ctx[7](dialog_1);
  var icon0 = new Icon({
    props: {
      data: envelope,
      scale: "2"
    },
    $$inline: true
  });
  var icon1 = new Icon({
    props: {
      data: githubSquare,
      scale: "2"
    },
    $$inline: true
  });
  var icon2 = new Icon({
    props: {
      data: linkedinSquare,
      scale: "2"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(menu.$$.fragment);
      t0 = space();
      div1 = element("div");
      create_component(dialog_1.$$.fragment);
      t1 = space();
      div0 = element("div");
      create_component(icon0.$$.fragment);
      t2 = space();
      a0 = element("a");
      create_component(icon1.$$.fragment);
      t3 = space();
      a1 = element("a");
      create_component(icon2.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      claim_component(menu.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {
        id: true
      });
      var div1_nodes = children(div1);
      claim_component(dialog_1.$$.fragment, div1_nodes);
      t1 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);
      claim_component(icon0.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      a0 = claim_element(div1_nodes, "A", {
        title: true,
        href: true,
        target: true
      });
      var a0_nodes = children(a0);
      claim_component(icon1.$$.fragment, a0_nodes);
      a0_nodes.forEach(detach_dev);
      t3 = claim_space(div1_nodes);
      a1 = claim_element(div1_nodes, "A", {
        title: true,
        href: true,
        target: true
      });
      var a1_nodes = children(a1);
      claim_component(icon2.$$.fragment, a1_nodes);
      a1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(div0, file$k, 104, 3, 2510);
      attr_dev(a0, "title", "Github profile");
      attr_dev(a0, "href", "https://github.com/diegosanchezp/");
      attr_dev(a0, "target", "_blank");
      add_location(a0, file$k, 108, 3, 2599);
      attr_dev(a1, "title", "LinkedIn profile");
      attr_dev(a1, "href", "https://www.linkedin.com/in/diego-s%C3%A1nchez-b0753b137/");
      attr_dev(a1, "target", "_blank");
      add_location(a1, file$k, 112, 3, 2737);
      attr_dev(div1, "id", "social");
      add_location(div1, file$k, 95, 3, 2259);
    },
    m: function mount(target, anchor, remount) {
      mount_component(menu, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, div1, anchor);
      mount_component(dialog_1, div1, null);
      append_dev(div1, t1);
      append_dev(div1, div0);
      mount_component(icon0, div0, null);
      append_dev(div1, t2);
      append_dev(div1, a0);
      mount_component(icon1, a0, null);
      append_dev(div1, t3);
      append_dev(div1, a1);
      mount_component(icon2, a1, null);
      current = true;
      if (remount) dispose();
      dispose = listen_dev(div0, "click",
      /*click_handler*/
      ctx[8], false, false, false);
    },
    p: function update(ctx, dirty) {
      var menu_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        menu_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      menu.$set(menu_changes);
      var dialog_1_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        dialog_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      dialog_1.$set(dialog_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(menu.$$.fragment, local);
      transition_in(dialog_1.$$.fragment, local);
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      transition_in(icon2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(menu.$$.fragment, local);
      transition_out(dialog_1.$$.fragment, local);
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      transition_out(icon2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(menu, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div1);
      /*dialog_1_binding*/

      ctx[7](null);
      destroy_component(dialog_1);
      destroy_component(icon0);
      destroy_component(icon1);
      destroy_component(icon2);
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(65:2) <Content>",
    ctx: ctx
  });
  return block;
} // (55:1) <Drawer    bind:this={drawer}    id="drawer-container"    variant="dismissible" bind:open={drawerOpen}>


function create_default_slot_2(ctx) {
  var img;
  var img_src_value;
  var t0;
  var t1;
  var current;
  var header = new Header({
    props: {
      $$slots: {
        default: [create_default_slot_19]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var content = new Content({
    props: {
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      img = element("img");
      t0 = space();
      create_component(header.$$.fragment);
      t1 = space();
      create_component(content.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      img = claim_element(nodes, "IMG", {
        id: true,
        alt: true,
        src: true
      });
      t0 = claim_space(nodes);
      claim_component(header.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(content.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "id", "profile-pic");
      attr_dev(img, "alt", "profile-pic");
      if (img.src !== (img_src_value = "Images/ProfilePic.jpg")) attr_dev(img, "src", img_src_value);
      add_location(img, file$k, 59, 2, 1506);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
      insert_dev(target, t0, anchor);
      mount_component(header, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(content, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var header_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        header_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      header.$set(header_changes);
      var content_changes = {};

      if (dirty &
      /*$$scope, dialog*/
      16400) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(header.$$.fragment, local);
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(header.$$.fragment, local);
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(img);
      if (detaching) detach_dev(t0);
      destroy_component(header, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(content, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(55:1) <Drawer    bind:this={drawer}    id=\\\"drawer-container\\\"    variant=\\\"dismissible\\\" bind:open={drawerOpen}>",
    ctx: ctx
  });
  return block;
} // (185:3) <Fab class="app-fab--absolute" on:click={handleOpenDrawer}>


function create_default_slot_1(ctx) {
  var current;
  var icon = new Icon({
    props: {
      data: bars,
      scale: "2"
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(icon.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(icon, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(185:3) <Fab class=\\\"app-fab--absolute\\\" on:click={handleOpenDrawer}>",
    ctx: ctx
  });
  return block;
} // (182:0) <AppContent class="app-content">


function create_default_slot$4(ctx) {
  var main;
  var div;
  var t;
  var current;
  var fab = new Fab({
    props: {
      class: "app-fab--absolute",
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  fab.$on("click",
  /*handleOpenDrawer*/
  ctx[5]);
  var default_slot_template =
  /*$$slots*/
  ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[14], null);
  var block = {
    c: function create() {
      main = element("main");
      div = element("div");
      create_component(fab.$$.fragment);
      t = space();
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      div = claim_element(main_nodes, "DIV", {
        class: true,
        title: true
      });
      var div_nodes = children(div);
      claim_component(fab.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      t = claim_space(main_nodes);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "app-fab--absolute");
      attr_dev(div, "title", "Toggle sidenav");
      add_location(div, file$k, 183, 2, 4512);
      attr_dev(main, "class", "main-content");
      add_location(main, file$k, 182, 1, 4482);
    },
    m: function mount(target, anchor) {
      insert_dev(target, main, anchor);
      append_dev(main, div);
      mount_component(fab, div, null);
      append_dev(main, t);

      if (default_slot) {
        default_slot.m(main, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      var fab_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        fab_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      fab.$set(fab_changes);

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16384) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[14], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[14], dirty, null));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(fab.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(fab.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(main);
      destroy_component(fab);
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$4.name,
    type: "slot",
    source: "(182:0) <AppContent class=\\\"app-content\\\">",
    ctx: ctx
  });
  return block;
}

function create_fragment$o(ctx) {
  var current_block_type_index;
  var if_block;
  var t;
  var current;
  var if_block_creators = [create_if_block$4, create_else_block$3];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (!
    /*onResponsive*/
    ctx[3]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var appcontent = new AppContent({
    props: {
      class: "app-content",
      $$slots: {
        default: [create_default_slot$4]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      if_block.c();
      t = space();
      create_component(appcontent.$$.fragment);
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      t = claim_space(nodes);
      claim_component(appcontent.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, t, anchor);
      mount_component(appcontent, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(t.parentNode, t);
      }

      var appcontent_changes = {};

      if (dirty &
      /*$$scope*/
      16384) {
        appcontent_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      appcontent.$set(appcontent_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(appcontent.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      transition_out(appcontent.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(t);
      destroy_component(appcontent, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$o.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var media = "(max-width: 500px)";

function instance$o($$self, $$props, $$invalidate) {
  var drawerOpen = true;
  var drawer; // drawer reference

  var drawerOpenR = false;
  var onResponsive = false;
  onMount(function () {
    window.matchMedia(media).addListener(function (mediaList) {
      $$invalidate(3, onResponsive = mediaList.matches);
    });
  });
  afterUpdate(function () {
    $$invalidate(3, onResponsive = window.matchMedia(media).matches);
  }); // Handle drawer for responsive design

  var handleOpenDrawer = function handleOpenDrawer() {
    if (!onResponsive) {
      $$invalidate(0, drawerOpen = !drawerOpen);
    } else {
      $$invalidate(2, drawerOpenR = !drawerOpenR);
    }
  };

  var dialog;
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", $$slots, ['default']);

  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(4, dialog = $$value);
    });
  }

  var click_handler = function click_handler() {
    dialog.open();
  };

  function drawer_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(1, drawer = $$value);
    });
  }

  function drawer_1_open_binding(value) {
    drawerOpen = value;
    $$invalidate(0, drawerOpen);
  }

  function dialog_1_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(4, dialog = $$value);
    });
  }

  var click_handler_1 = function click_handler_1() {
    dialog.open();
  };

  function drawer_1_open_binding_1(value) {
    drawerOpenR = value;
    $$invalidate(2, drawerOpenR);
  }

  $$self.$set = function ($$props) {
    if ("$$scope" in $$props) $$invalidate(14, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Drawer: Drawer,
      AppContent: AppContent,
      Content: Content,
      Header: Header,
      Title: Title,
      Subtitle: Subtitle,
      Scrim: Scrim,
      Menu: Menu,
      Button: Button_1,
      Label: Label,
      List: List,
      Item: Item,
      Separator: Separator,
      Text: Text,
      Fab: Fab,
      Icon: Icon,
      linkedinSquare: linkedinSquare,
      envelope: envelope,
      githubSquare: githubSquare,
      bars: bars,
      drawerOpen: drawerOpen,
      drawer: drawer,
      drawerOpenR: drawerOpenR,
      onMount: onMount,
      onDestroy: onDestroy,
      afterUpdate: afterUpdate,
      onResponsive: onResponsive,
      media: media,
      handleOpenDrawer: handleOpenDrawer,
      Dialog: Dialog,
      dialog: dialog
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("drawerOpen" in $$props) $$invalidate(0, drawerOpen = $$props.drawerOpen);
    if ("drawer" in $$props) $$invalidate(1, drawer = $$props.drawer);
    if ("drawerOpenR" in $$props) $$invalidate(2, drawerOpenR = $$props.drawerOpenR);
    if ("onResponsive" in $$props) $$invalidate(3, onResponsive = $$props.onResponsive);
    if ("dialog" in $$props) $$invalidate(4, dialog = $$props.dialog);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [drawerOpen, drawer, drawerOpenR, onResponsive, dialog, handleOpenDrawer, $$slots, dialog_1_binding, click_handler, drawer_1_binding, drawer_1_open_binding, dialog_1_binding_1, click_handler_1, drawer_1_open_binding_1, $$scope];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$p(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$o, create_fragment$o, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$o.name
    });
    return _this;
  }

  return Layout;
}(SvelteComponentDev);

function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error;
var file$l = "src/routes/_error.svelte"; // (38:0) {#if dev && error.stack}

function create_if_block$5(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file$l, 38, 1, 443);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(38:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}

function create_fragment$p(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*error*/
  ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value =
  /*status*/
  ctx[0];
  var if_block =
  /*dev*/
  ctx[2] &&
  /*error*/
  ctx[1].stack && create_if_block$5(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-8od9u6");
      add_location(h1, file$l, 33, 0, 374);
      attr_dev(p, "class", "svelte-8od9u6");
      add_location(p, file$l, 35, 0, 393);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*status*/
      1 && title_value !== (title_value =
      /*status*/
      ctx[0])) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*error*/
      2 && t3_value !== (t3_value =
      /*error*/
      ctx[1].message + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[2] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$p.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$p($$self, $$props, $$invalidate) {
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === "development";
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Error", $$slots, []);

  $$self.$set = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, dev];
}

var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);

  var _super = _createSuper$q(Error);

  function Error(options) {
    var _this;

    _classCallCheck(this, Error);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$p, create_fragment$p, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$p.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Error> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Error;
}(SvelteComponentDev);

function _createSuper$r(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$s(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$s() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error;

function create_else_block$4(ctx) {
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$4.name,
    type: "else",
    source: "(23:1) {:else}",
    ctx: ctx
  });
  return block;
} // (21:1) {#if error}


function create_if_block$6(ctx) {
  var current;
  var error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(21:1) {#if error}",
    ctx: ctx
  });
  return block;
} // (20:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot$5(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$6, create_else_block$4];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$5.name,
    type: "slot",
    source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$q(ctx) {
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot$5]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  var layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      147) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$q.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$q($$self, $$props, $$invalidate) {
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
      level1 = _$$props$level === void 0 ? null : _$$props$level;
  var notify = $$props.notify;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("App", $$slots, []);

  $$self.$set = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      afterUpdate: afterUpdate,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1,
      notify: notify
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores, notify];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);

  var _super = _createSuper$r(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$q, create_fragment$q, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      notify: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment$q.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    if (
    /*notify*/
    ctx[6] === undefined && !("notify" in props)) {
      console.warn("<App> was created without expected prop 'notify'");
    }

    return _this;
  }

  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notify",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [/^\/transition\/?$/, /^\/projects\/projects\/?$/, /^\/layout\/?$/];
var components = [{
  js: function js() {
    return import('./index.0950f975.js');
  },
  css: []
}, {
  js: function js() {
    return import('./certifications.7e4839f4.js');
  },
  css: []
}, {
  js: function js() {
    return import('./academics.4d306d5b.js');
  },
  css: []
}, {
  js: function js() {
    return import('./index.a406aab7.js');
  },
  css: []
}];
var routes = [{
  // index.svelte
  pattern: /^\/$/,
  parts: [{
    i: 0
  }]
}, {
  // certifications.svelte
  pattern: /^\/certifications\/?$/,
  parts: [{
    i: 1
  }]
}, {
  // academics.svelte
  pattern: /^\/academics\/?$/,
  parts: [{
    i: 2
  }]
}, {
  // projects/index.svelte
  pattern: /^\/projects\/?$/,
  parts: [{
    i: 3
  }]
}];

function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    replaceState: false
  };
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null).then(function () {});
  }

  location.href = href;
  return new Promise(function (f) {}); // never resolves
}
/** Callback to inform of a value updates. */


function page_store(value) {
  var store = writable(value);
  var ready = true;

  function notify() {
    ready = true;
    store.update(function (val) {
      return val;
    });
  }

  function set(new_value) {
    ready = false;
    store.set(new_value);
  }

  function subscribe(run) {
    var old_value;
    return store.subscribe(function (value) {
      if (old_value === undefined || ready && value !== old_value) {
        run(old_value = value);
      }
    });
  }

  return {
    notify: notify,
    set: set,
    subscribe: subscribe
  };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(value) {
    var target, token, _yield$hydrate_target, redirect, props, branch;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $session = value;

            if (ready) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            session_dirty = true;
            target = select_target(new URL(location.href));
            token = current_token = {};
            _context.next = 8;
            return hydrate_target(target);

          case 8:
            _yield$hydrate_target = _context.sent;
            redirect = _yield$hydrate_target.redirect;
            props = _yield$hydrate_target.props;
            branch = _yield$hydrate_target.branch;

            if (!(token !== current_token)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            _context.next = 16;
            return render(redirect, branch, props, target.page);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var prefetching = null;

function set_prefetching(href, promise) {
  prefetching = {
    href: href,
    promise: promise
  };
}

var target;

function set_target(element) {
  target = element;
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState(state, title, href) {},
  replaceState: function replaceState(state, title, href) {},
  scrollRestoration: ''
};

var scroll_history = {};

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(function (searchParam) {
      var _$exec = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
          _$exec2 = _slicedToArray(_$exec, 3),
          key = _$exec2[1],
          _$exec2$ = _$exec2[2],
          value = _$exec2$ === void 0 ? '' : _$exec2$;

      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (_typeof(query[key]) === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(initial_data.baseUrl)) return null;
  var path = url.pathname.slice(initial_data.baseUrl.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}

function handle_error(url) {
  var _location = location,
      host = _location.host,
      pathname = _location.pathname,
      search = _location.search;
  var session = initial_data.session,
      preloaded = initial_data.preloaded,
      status = initial_data.status,
      error = initial_data.error;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render(null, [], props, {
    host: host,
    path: pathname,
    query: query,
    params: {}
  });
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function navigate(_x2, _x3, _x4, _x5) {
  return _navigate.apply(this, arguments);
}

function _navigate() {
  _navigate = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(target, id, noscroll, hash) {
    var current_scroll, loaded, token, _yield$loaded, redirect, props, branch, scroll, deep_linked;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (id) {
              // popstate or initial navigation
              cid = id;
            } else {
              current_scroll = scroll_state(); // clicked on a link. preserve scroll state

              scroll_history[cid] = current_scroll;
              id = cid = ++uid;
              scroll_history[cid] = noscroll ? current_scroll : {
                x: 0,
                y: 0
              };
            }

            cid = id;
            if (root_component) stores.preloading.set(true);
            loaded = prefetching && prefetching.href === target.href ? prefetching.promise : hydrate_target(target);
            prefetching = null;
            token = current_token = {};
            _context2.next = 8;
            return loaded;

          case 8:
            _yield$loaded = _context2.sent;
            redirect = _yield$loaded.redirect;
            props = _yield$loaded.props;
            branch = _yield$loaded.branch;

            if (!(token !== current_token)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            _context2.next = 16;
            return render(redirect, branch, props, target.page);

          case 16:
            if (document.activeElement) document.activeElement.blur();

            if (!noscroll) {
              scroll = scroll_history[id];

              if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));

                if (deep_linked) {
                  scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top + scrollY
                  };
                }
              }

              scroll_history[cid] = scroll;
              if (scroll) scrollTo(scroll.x, scroll.y);
            }

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _navigate.apply(this, arguments);
}

function render(_x6, _x7, _x8, _x9) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(redirect, branch, props, page) {
    var _start, end;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!redirect) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", goto(redirect.location, {
              replaceState: true
            }));

          case 2:
            stores.page.set(page);
            stores.preloading.set(false);

            if (!root_component) {
              _context3.next = 8;
              break;
            }

            root_component.$set(props);
            _context3.next = 18;
            break;

          case 8:
            props.stores = {
              page: {
                subscribe: stores.page.subscribe
              },
              preloading: {
                subscribe: stores.preloading.subscribe
              },
              session: stores.session
            };
            _context3.next = 11;
            return root_preloaded;

          case 11:
            _context3.t0 = _context3.sent;
            props.level0 = {
              props: _context3.t0
            };
            props.notify = stores.page.notify; // first load — remove SSR'd <head> contents

            _start = document.querySelector('#sapper-head-start');
            end = document.querySelector('#sapper-head-end');

            if (_start && end) {
              while (_start.nextSibling !== end) {
                detach$1(_start.nextSibling);
              }

              detach$1(_start);
              detach$1(end);
            }

            root_component = new App({
              target: target,
              props: props,
              hydrate: true
            });

          case 18:
            current_branch = branch;
            current_query = JSON.stringify(page.query);
            ready = true;
            session_dirty = false;

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _render.apply(this, arguments);
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(_x10) {
  return _hydrate_target.apply(this, arguments);
}

function _hydrate_target() {
  _hydrate_target = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(target) {
    var route, page, segments, _redirect, props, preload_context, branch, l, stringified_query, match, segment_dirty;

    return regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            route = target.route, page = target.page;
            segments = page.path.split('/').filter(Boolean);
            _redirect = null;
            props = {
              error: null,
              status: 200,
              segments: [segments[0]]
            };
            preload_context = {
              fetch: function (_fetch) {
                function fetch(_x11, _x12) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              }(function (url, opts) {
                return fetch(url, opts);
              }),
              redirect: function redirect(statusCode, location) {
                if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                  throw new Error("Conflicting redirects");
                }

                _redirect = {
                  statusCode: statusCode,
                  location: location
                };
              },
              error: function error(status, _error) {
                props.error = typeof _error === 'string' ? new Error(_error) : _error;
                props.status = status;
              }
            };

            if (!root_preloaded) {
              root_preloaded = initial_data.preloaded[0] || preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
              }, $session);
            }

            l = 1;
            _context5.prev = 7;
            stringified_query = JSON.stringify(page.query);
            match = route.pattern.exec(page.path);
            segment_dirty = false;
            _context5.next = 13;
            return Promise.all(route.parts.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(part, i) {
                var segment, j, _yield$load_component, component, preload, preloaded;

                return regenerator.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        segment = segments[i];
                        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                        props.segments[l] = segments[i + 1]; // TODO make this less confusing

                        if (part) {
                          _context4.next = 5;
                          break;
                        }

                        return _context4.abrupt("return", {
                          segment: segment
                        });

                      case 5:
                        j = l++;

                        if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                          _context4.next = 8;
                          break;
                        }

                        return _context4.abrupt("return", current_branch[i]);

                      case 8:
                        segment_dirty = false;
                        _context4.next = 11;
                        return load_component(components[part.i]);

                      case 11:
                        _yield$load_component = _context4.sent;
                        component = _yield$load_component.default;
                        preload = _yield$load_component.preload;

                        if (!(ready || !initial_data.preloaded[i + 1])) {
                          _context4.next = 25;
                          break;
                        }

                        if (!preload) {
                          _context4.next = 21;
                          break;
                        }

                        _context4.next = 18;
                        return preload.call(preload_context, {
                          host: page.host,
                          path: page.path,
                          query: page.query,
                          params: part.params ? part.params(target.match) : {}
                        }, $session);

                      case 18:
                        _context4.t0 = _context4.sent;
                        _context4.next = 22;
                        break;

                      case 21:
                        _context4.t0 = {};

                      case 22:
                        preloaded = _context4.t0;
                        _context4.next = 26;
                        break;

                      case 25:
                        preloaded = initial_data.preloaded[i + 1];

                      case 26:
                        return _context4.abrupt("return", props["level".concat(j)] = {
                          component: component,
                          props: preloaded,
                          segment: segment,
                          match: match,
                          part: part.i
                        });

                      case 27:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x13, _x14) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 13:
            branch = _context5.sent;
            _context5.next = 21;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](7);
            props.error = _context5.t0;
            props.status = 500;
            branch = [];

          case 21:
            return _context5.abrupt("return", {
              redirect: _redirect,
              props: props,
              branch: branch
            });

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[7, 16]]);
  }));
  return _hydrate_target.apply(this, arguments);
}

function load_css(chunk) {
  var href = "client/".concat(chunk);
  if (document.querySelector("link[href=\"".concat(href, "\"]"))) return;
  return new Promise(function (fulfil, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = function () {
      return fulfil();
    };

    link.onerror = reject;
    document.head.appendChild(link);
  });
}

function load_component(component) {
  // TODO this is temporary — once placeholders are
  // always rewritten, scratch the ternary
  var promises = typeof component.css === 'string' ? [] : component.css.map(load_css);
  promises.unshift(component.js());
  return Promise.all(promises).then(function (values) {
    return values[0];
  });
}

function detach$1(node) {
  node.parentNode.removeChild(node);
}

function prefetch(href) {
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      set_prefetching(href, hydrate_target(target));
    }

    return prefetching.promise;
  }
}

function start(opts) {
  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  } // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.


  addEventListener('beforeunload', function () {
    _history.scrollRestoration = 'auto';
  }); // Setting scrollRestoration to manual again when returning to this page.

  addEventListener('load', function () {
    _history.scrollRestoration = 'manual';
  });
  set_target(opts.target);
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate); // prefetch

  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
  return Promise.resolve().then(function () {
    var _location2 = location,
        hash = _location2.hash,
        href = _location2.href;

    _history.replaceState({
      id: uid
    }, '', href);

    var url = new URL(location.href);
    if (initial_data.error) return handle_error();
    var target = select_target(url);
    if (target) return navigate(target, uid, true, hash);
  });
}

var mousemove_timeout;

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);
  if (!a || a.rel !== 'prefetch') return;
  prefetch(a.href);
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = _typeof(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper-noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      location.href = location.href;
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

start({
  target: document.querySelector('#sapper')
});

export { classAdderBuilder as $, transition_out as A, Button_1 as B, Content$1 as C, Dialog as D, destroy_component as E, binding_callbacks as F, set_style as G, noop as H, styleInject as I, _createClass as J, create_slot as K, Label as L, exclude as M, assign as N, forwardEventsBuilder as O, get_current_component as P, exclude_internal_props as Q, useActions as R, SvelteComponentDev as S, set_attributes as T, run_all as U, action_destroyer as V, get_slot_context as W, get_slot_changes as X, get_spread_update as Y, is_function as Z, _inherits as _, _getPrototypeOf as a, Div as a0, Ripple as a1, __extends as a2, _assign as a3, MDCFoundation as a4, MDCRipple as a5, MDCRippleFoundation as a6, MDCComponent as a7, setContext as a8, onMount as a9, listen_dev as aa, validate_each_argument as ab, validate_each_keys as ac, onDestroy as ad, afterUpdate as ae, empty as af, group_outros as ag, update_keyed_each as ah, check_outros as ai, outro_and_destroy_block as aj, set_data_dev as ak, add_render_callback as al, create_bidirectional_transition as am, destroy_each as an, _possibleConstructorReturn as b, _classCallCheck as c, _assertThisInitialized as d, dispatch_dev as e, space as f, element as g, create_component as h, init as i, detach_dev as j, claim_space as k, claim_element as l, children as m, claim_text as n, claim_component as o, add_location as p, query_selector_all as q, attr_dev as r, safe_not_equal as s, text as t, insert_dev as u, validate_slots as v, append_dev as w, mount_component as x, _slicedToArray as y, transition_in as z };
