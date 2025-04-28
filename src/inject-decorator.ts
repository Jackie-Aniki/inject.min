import { BaseClass, BaseObject } from './types';

import { DIContainer } from './di-container';

export function Inject<T extends BaseObject>(Class: BaseClass<T>, props?: any) {
  return function (target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
      get: () => DIContainer.getInstance(Class, props),
      enumerable: true,
      configurable: true
    });
  };
}
