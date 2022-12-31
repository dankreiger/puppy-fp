---
title: task/taskify/taskify.ts
nav_order: 1
parent: Modules
---

## taskify overview

Creates a new function that, when called, returns the same promise as the
original function. If the returned function is called multiple times, it will
always return the same promise, ensuring that the original function is only
executed once.

Note that a task's computation must not be able to fail.

**Example**

```ts
import { taskify } from 'puppy-fp'
;(async () => {
  const longRunning = () => new Promise((resolve) => setTimeout(resolve, 1000))
  const runTask = taskify(longRunning)
  const t0 = performance.now()
  await runTask()
  const t1 = performance.now()
  const duration1 = t1 - t0
  console.assert(duration1 >= 1000, { expect: 1000, actual: duration1 })
  await runTask()
  const t2 = performance.now()
  const duration2 = t2 - t1
  console.assert(duration2 === 100000, { expect: 1000, actual: duration2 })
})()
```

Added in v0.0.1

---

<h2 class="text-delta">Table of contents</h2>

- [task](#task)
  - [taskify](#taskify)

---

# task

## taskify

Creates a new function that, when called, returns the same promise as the
original function. If the returned function is called multiple times, it will
always return the same promise, ensuring that the original function is only
executed once.

Note that a task's computation must not be able to fail.

**Signature**

```ts
export declare function taskify<T>(fn: () => Promise<T>): () => Promise<T>
```

**Example**

```ts
import { taskify } from 'puppy-fp'
;(async () => {
  const longRunning = () => new Promise((resolve) => setTimeout(resolve, 1000))
  const runTask = taskify(longRunning)
  const t0 = performance.now()
  await runTask()
  const t1 = performance.now()
  const duration1 = t1 - t0
  console.assert(duration1 >= 1000, { expect: 1000, actual: duration1 })
  await runTask()
  const t2 = performance.now()
  const duration2 = t2 - t1
  console.assert(duration2 === 100000, { expect: 1000, actual: duration2 })
})()
```

Added in v0.0.1
