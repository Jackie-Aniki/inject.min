# inject.min

dependency injection made super easy - all you need | lazy register | with override | decorator support

[<img src="https://img.shields.io/npm/v/inject.min?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/inject.min?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/Jackie-Aniki/inject.min/main?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/Jackie-Aniki/inject.min)

### Installation

```bash
yarn add inject.min
```

### Usage

```ts
import { Inject } from 'inject.min';

class Example {
  // your content
}

class Class {
  @Inject(Example) prop!: Example;

  constructor() {
    // exists
    console.log(this.prop);
  }
}

const class1 = new Class();
const class2 = new Class();

// true
console.log(class1.prop === class2.prop);
```

### tsconfig.json

you need to have `compiler option` `experimental decorators` `enabled` in `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### API

[DIContainer Documentation](https://Jackie-Aniki.github.io/inject.min/classes/DIContainer.html)

### License

MIT
