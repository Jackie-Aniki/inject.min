import { BaseClass, BaseObject } from './types';

export class DIContainer {
  protected static overrides: Record<string, BaseClass> = {};
  protected static instances: Record<string, Record<string, BaseObject>> = {};

  /**
   * get the Class/Override that was used with setClass
   * @param Original the class to search for in DIContainer
   * @returns {BaseClass}
   */
  static getClass<T extends BaseObject>(Original: BaseClass<T>): BaseClass<T> {
    const Override = this.overrides[Original.name] as BaseClass<T> | undefined;

    return Override || Original;
  }

  /**
   * for future references override Original class with Override
   * @param Original the class to search for in DIContainer
   * @param Override the extended class to replace that first one
   */
  static setClass<T extends BaseObject>(
    Original: BaseClass<T>,
    Override: BaseClass<T>
  ): void {
    DIContainer.overrides[Original.name] = Override;
  }

  /**
   * get instance of Class/Override that was used with setClass with optional props
   * @param Original the class to search for in DIContainer
   * @param props the optional props for constructor of instance
   * @returns {instanceof Class}
   */
  static getInstance<T extends BaseObject>(
    Original: BaseClass<T>,
    ...props: any[]
  ): T {
    const propertyKey = DIContainer.createPropertyKey(props);

    if (!DIContainer.instances[Original.name]) {
      DIContainer.instances[Original.name] = {};
    }

    if (!DIContainer.instances[Original.name][propertyKey]) {
      const Class = DIContainer.getClass(Original);
      const instance = new Class(...props);

      DIContainer.instances[Original.name][propertyKey] = instance;
    }

    return DIContainer.instances[Original.name][propertyKey] as T;
  }

  /**
   * the api to free class instances to prevent eventual oom
   * @param Class the class to search for in DIContainer
   */
  static freeInstances<T extends BaseObject>(Class: BaseClass<T>) {
    DIContainer.instances[Class.name] = {};
  }

  /**
   * creates property key string for index in records
   * @param props anything really
   * @returns {string}
   */
  protected static createPropertyKey(props?: any): string {
    if (typeof props !== 'undefined') {
      return DIContainer.tryStringify(props);
    }

    return 'undefined';
  }

  /**
   * stringify anything or return {} if not possible
   * @param props anything really
   * @returns {string}
   */
  protected static tryStringify(props?: any): string {
    try {
      return JSON.stringify(props);
    } catch (_err) {
      return '{}';
    }
  }
}
