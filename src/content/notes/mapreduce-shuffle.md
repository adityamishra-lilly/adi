---
title: The shuffle is where MapReduce actually spends its time
date: 2026-10-29
category: Distributed Systems
tags: [mapreduce, java, papers]
description: Notes from implementing MapReduce in Java on where the time goes.
---

Implementing the [MapReduce paper](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/) in Java, I expected map and reduce to dominate the runtime. They didn't. The shuffle did.

Every mapper writes its output into `R` partitions, one per reducer, and every reducer has to pull its partition from **every** mapper. That's `M × R` small transfers, and each one waits on disk and network.

Two things helped most:

- **A combiner** that pre-aggregates on the map side, which shrank the intermediate data for word count by more than 10x.
- **Sorting inside each partition before writing**, so reducers can merge streams instead of sorting everything again.

The paper spends one paragraph on the shuffle. In practice it's the part that decides whether the framework is fast.
