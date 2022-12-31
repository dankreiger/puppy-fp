import { describe, expect, test } from '@jest/globals';
import { taskify } from './taskify';

describe('taskify', () => {
  describe('long async task', () => {
    test('returns the same promise result without recalculating', async () => {
      const longRunning = () =>
        new Promise((resolve) => setTimeout(resolve, 1000));

      const runTask = taskify(longRunning);
      const t0 = performance.now();
      await runTask();
      const t1 = performance.now();
      const duration1 = t1 - t0;
      expect(duration1).toBeGreaterThan(800);

      // result is memoized
      await runTask();
      const t2 = performance.now();
      const duration2 = t2 - t1;
      expect(duration2).toBeLessThan(10);
    });
  });

  describe('synchronous thread blocking task', () => {
    test('returns the same promise result without recalculating', () => {
      // verbose for inline docs test
      const longRunningDocsTest = () =>
        new Promise((resolve) => {
          let i = 0;
          while (i < 50000) {
            let j = 0;
            while (j < i) {
              j += 1;
            }
            i += 1;
          }

          resolve('DONE');
        });
      const runTask = taskify(longRunningDocsTest);
      const t0 = performance.now();
      runTask().then(() => {
        const t1 = performance.now();
        const duration1 = t1 - t0;

        expect(duration1).toBeGreaterThan(500);
        runTask();
        const t2 = performance.now();
        const duration2 = t2 - t1;

        expect(duration2).toBeLessThan(10);
      });
    });
  });

  describe('composition', () => {
    // eslint-disable  @typescript-eslint/no-unsafe-return
    const pipe =
      (...fns: any[]) =>
      (x: any) =>
        fns.reduce((v, f) => f(v), x);

    test('can be piped with other Tasks', () => {
      let i: number;
      const unmemoized = async () => {
        await (i += 1);
      };

      pipe(unmemoized, unmemoized, unmemoized)((i = 0));
      expect(i).toBe(3);

      i = 0;
      const memoized = taskify(async () => {
        await (i += 1);
      });
      pipe(memoized, memoized, memoized)((i = 0));
      expect(i).toBe(1);
    });
  });
});
