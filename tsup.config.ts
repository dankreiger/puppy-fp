import type { Options } from 'tsup';

const config: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['iife', 'cjs', 'esm'],
  sourcemap: true,
};

export default config;
