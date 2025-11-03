import { BaseClass, BaseObject } from './types';
export declare function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: any
): (
  target: any,
  propertyKey: any
) => typeof target & {
  [propertyKey]: BaseClass<T>;
};
//# sourceMappingURL=inject-decorator.d.ts.map
