/**
 * Creates a new function that, when called, returns the same promise as the
 * original function. If the returned function is called multiple times, it will
 * always return the same promise, ensuring that the original function is only
 * executed once.
 * 
 * Note that a task's computation must not be able to fail.
 *
 * @param fn - A function that returns a promise
 * @returns A new function that returns the same promise as the original function
 *
 * @category task
 * @since 0.0.1

 * @example
 * import { taskify } from '@dankreiger/puppy-fp'
 * 
 * (async () => {
 *   const longRunning = () => new Promise((resolve) => setTimeout(resolve, 1000));
 *   const runTask = taskify(longRunning);
 *   const t0 = performance.now();
 *   await runTask();
 *   const t1 = performance.now();
 *   const duration1 = t1 - t0;
 *   console.assert(duration1 >= 1000, { expect: 1000, actual: duration1 });
 *   await runTask();
 *   const t2 = performance.now();
 *   const duration2 = t2 - t1;
 *   console.assert(duration2 === 100000, { expect: 1000, actual: duration2 });
 * })();
 * 
 * 
 * 
 */
export function taskify<T>(fn: () => Promise<T>): () => Promise<T> {
  let task: Promise<T> | undefined;

  return () => {
    if (!task) {
      task = fn();
    }
    return task;
  };
}
