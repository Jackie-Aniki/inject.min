'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Inject = Inject;
const di_container_1 = require('./di-container');
function Inject(Class, props) {
  return function inject(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
      get: () => di_container_1.DIContainer.getInstance(Class, props),
      set: () => di_container_1.DIContainer.freeInstance(Class, props),
      configurable: true,
      enumerable: true
    });
    return target;
  };
}
