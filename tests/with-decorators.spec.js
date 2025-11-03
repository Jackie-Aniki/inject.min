describe('GIVEN @Inject decorator', () => {
  it('THEN @Inject() and DIContainer.setClass(Original, Override) work', () => {
    const { Test1, Test2, Test3, TestOverride } = require('./with-decorators');

    const { output: test1 } = new Test1();
    const { output: test2 } = new Test2();
    const { output: test3 } = new Test3();
    const { output: testOverride } = new TestOverride();

    const tests = {
      test1,
      test2,
      test3,
      testOverride
    };

    const expectedResults = {
      test1: ['example1', 'example2', 'example3'],
      test2: ['example1', 'different', 'example3'],
      test3: ['example1', 'example2', 'example3'],
      testOverride: ['override', true]
    };

    expect(tests).toStrictEqual(expectedResults);
  });
});
