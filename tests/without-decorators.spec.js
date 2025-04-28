const { DIContainer } = require('../dist');

describe('GIVEN DIContainer', () => {
  it('THEN getInstance(Class) does work', () => {
    class GetExample {
      value = {
        whatever: 'foo'
      };
    }

    const instance = DIContainer.getInstance(GetExample);

    expect(instance.value.whatever).toBe('foo');
  });

  describe('WHEN setClass(Original, Override)', () => {
    class Original {
      value = {
        key: 'this is a base value'
      };
    }

    class Override extends Original {
      value = {
        key: 'override value or anything in this class'
      };
    }

    DIContainer.setClass(Original, Override);

    it('THEN getInstance(Original) returns override instance', () => {
      const instance = DIContainer.getInstance(Original);

      expect(instance.value.key).not.toBe('this is a base value');
    });

    it('AND new getClass(Original) returns override instance', () => {
      const Class = DIContainer.getClass(Original);

      expect(Class).toBe(Override);
    });
  });
});
