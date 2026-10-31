---
title: Why concurrency and parallelism aren't the same thing
date: 2026-10-30
category: Concurrency
tags: [concurrency, parallelism, go]
tldr: Concurrency is how a program is structured; parallelism is how it runs. You can have the first without the second.
description: The difference between concurrency and parallelism, and why a program can be concurrent without running in parallel.
---

**Concurrency** is the ability of a system to handle multiple tasks during overlapping time periods.

**Parallelism** is running multiple tasks at the same instant on different cores or processors.

Parallelism is a property of execution, whereas concurrency is a property of the program. A program can be concurrent without running in parallel, by context switching on a single core. Parallelism needs multiple independent tasks, so a program can't run in parallel without first being structured to be concurrent.

> "Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."
> — Rob Pike, co-creator of Go
