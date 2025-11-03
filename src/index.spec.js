describe('GIVEN example from readme', () => {
  const { Inject } = require('..');

  class Prop {
    // your content
  }

  class Class {
    @Inject(Prop) prop;

    constructor() {}
  }

  it('THEN @Inject decorator injects prop', () => {
    const class1 = new Class();

    expect(class1.prop).not.toBe(undefined);
  });

  it('THEN all instances of injected prop are one', () => {
    const class1 = new Class();
    const class2 = new Class();

    expect(class1.prop).toBe(class2.prop);
  });
});
