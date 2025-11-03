import { BaseClass, BaseObject } from './types';

import { DIContainer } from './di-container';

export function Inject<T extends BaseObject>(Class: BaseClass<T>, props?: any) {
  return function inject(target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
      get: () => DIContainer.getInstance(Class, props),
      set: () => DIContainer.freeInstance(Class, props),
      configurable: true,
      enumerable: true
    });

    return target as typeof target & { [propertyKey]: BaseClass<T> };
  };
}
