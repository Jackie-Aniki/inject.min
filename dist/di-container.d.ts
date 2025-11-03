import { BaseClass, BaseObject } from './types';
export declare class DIContainer {
  static readonly overrides: Record<string, BaseClass>;
  static readonly instances: Record<string, Record<string, BaseObject>>;
  /**
   * get the Class/Override that was used with setClass
   * @param Original the class to search for in DIContainer
   * @returns {BaseClass}
   */
  static getClass<T extends BaseObject>(Original: BaseClass<T>): BaseClass<T>;
  /**
   * for future references override Original class with Override
   * @param Original the class to search for in DIContainer
   * @param Override the extended class to replace that first one
   */
  static setClass<T extends BaseObject>(
    Original: BaseClass<T>,
    Override: BaseClass<T>
  ): void;
  /**
   * get instance of Class/Override that was used with setClass with optional props
   * @param Original the class to search for in DIContainer
   * @param props the optional props for constructor of instance
   * @returns {instanceof Class}
   */
  static getInstance<T extends BaseObject>(
    Original: BaseClass<T>,
    ...props: any[]
  ): T;
  /**
   * the api to free class instances to prevent eventual oom
   * @param Class the class to search for in DIContainer
   */
  static freeInstance<T extends BaseObject>(
    Class: BaseClass<T>,
    props?: any
  ): void;
  /**
   * the api to free class instances to prevent eventual oom
   * @param Class the class to search for in DIContainer
   */
  static freeInstances<T extends BaseObject>(Class: BaseClass<T>): void;
  /**
   * creates property key string for index in records
   * @param props anything really
   * @returns {string}
   */
  protected static createPropertyKey(props?: any): string;
  /**
   * stringify anything or return {} if not possible
   * @param props anything really
   * @returns {string}
   */
  protected static tryStringify(props?: any): string;
}
//# sourceMappingURL=di-container.d.ts.map
