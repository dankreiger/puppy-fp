# puppy-fp

For puppies that are afraid of the outside world.

## Documentation

[Documentation](http://dankreiger.github.io/puppy-fp)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Installation

Install with `npm`

```bash
  npm install puppy-fp
```

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![npm](https://img.shields.io/badge/npm-gray?style=flat&logo=npm&link=https://www.npmjs.com/package/puppy-fp)](https://www.npmjs.com/package/puppy-fp)
[![iife](https://img.shields.io/badge/iife-gray?style=flat&logo=HTML5&link=unpkg.com/:package@:version/:file)](unpkg.com/puppy-fp)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Usage/Examples

Standalone

```ts
import { taskify } from 'puppy-fp';

const longRunningTask = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

const runTask = taskify(longRunning);
await runTask(); // takes ca. 1000ms

await runTask(); // runs immediately (result is memoized)
```

Integrated with `fp-ts` or any other library with a `Task` implementation
