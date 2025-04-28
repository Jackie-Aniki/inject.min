'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
class DIContainer {
  /**
   * get the Class/Override that was used with setClass
   * @param Original the class to search for in DIContainer
   * @returns {BaseClass}
   */
  static getClass(Original) {
    const Override = this.overrides[Original.name];
    return Override || Original;
  }
  /**
   * for future references override Original class with Override
   * @param Original the class to search for in DIContainer
   * @param Override the extended class to replace that first one
   */
  static setClass(Original, Override) {
    DIContainer.overrides[Original.name] = Override;
  }
  /**
   * get instance of Class/Override that was used with setClass with optional props
   * @param Original the class to search for in DIContainer
   * @param props the optional props for constructor of instance
   * @returns {instanceof Class}
   */
  static getInstance(Original, ...props) {
    const propertyKey = DIContainer.createPropertyKey(props);
    if (!DIContainer.instances[Original.name]) {
      DIContainer.instances[Original.name] = {};
    }
    if (!DIContainer.instances[Original.name][propertyKey]) {
      const Class = DIContainer.getClass(Original);
      const instance = new Class(...props);
      DIContainer.instances[Original.name][propertyKey] = instance;
    }
    return DIContainer.instances[Original.name][propertyKey];
  }
  /**
   * the api to free class instances to prevent eventual oom
   * @param Class the class to search for in DIContainer
   */
  static freeInstances(Class) {
    DIContainer.instances[Class.name] = {};
  }
  /**
   * creates property key string for index in records
   * @param props anything really
   * @returns {string}
   */
  static createPropertyKey(props) {
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
  static tryStringify(props) {
    try {
      return JSON.stringify(props);
    } catch (_err) {
      return '{}';
    }
  }
}
exports.DIContainer = DIContainer;
DIContainer.overrides = {};
DIContainer.instances = {};
