export type BaseObject = {
  constructor: {
    name: string;
  };
};
export type BaseClass<T = BaseObject> = new (...args: any[]) => T;
//# sourceMappingURL=types.d.ts.map
