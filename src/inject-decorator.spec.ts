import { DIContainer, Inject } from '..';

class Example1 {
  value!: string;

  constructor(props?: { param?: string }) {
    this.value = props?.param || 'example1';
  }
}

class Example2 extends Example1 {
  constructor(param: string) {
    super({ param });
  }
}

class Original {
  name = 'original';
}

class Override extends Original {
  name = 'override';
}

class Test1 {
  @Inject(Example1) example1!: Example1;
  @Inject(Example2, 'example2') example2!: Example2;
  @Inject(Example1, { param: 'example3' }) example3!: Example1;

  output: any[] = [];

  constructor() {
    this.output.push(this.example1.value); // example1
    this.output.push(this.example2.value); // example2
    this.output.push(this.example3.value); // example3
  }
}

class Test2 {
  @Inject(Example1) example1!: Example1;
  @Inject(Example2, 'different') example2!: Example2;
  @Inject(Example1, { param: 'example3' }) example3!: Example1;

  output: any[] = [];

  constructor() {
    this.output.push(this.example1.value); // example1
    this.output.push(this.example2.value); // example2
    this.output.push(this.example3.value); // example3
  }
}

class Test3 extends Test1 {}

class TestOverride {
  @Inject(Original) test!: Original;

  output: any[] = [];

  constructor() {
    DIContainer.setClass(Original, Override);

    const Class = DIContainer.getClass(Original);
    const instance = new Class();

    this.output.push(instance.name); // 'override'
    this.output.push(Class === Override); // true
  }
}

describe('GIVEN @Inject decorator', () => {
  it('THEN @Inject() and DIContainer.setClass(Original, Override) work', () => {
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
