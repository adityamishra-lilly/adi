---
title: Two k3s servers are less available than one
date: 2026-10-28
category: Distributed Systems
tags: [kubernetes, k3s, etcd, quorum]
tldr: Embedded etcd needs a majority, so an HA control plane starts at three servers, not two.
description: Why a two-node k3s control plane with embedded etcd is less available than a single node.
---

When I first made my homelab control plane "highly available", I added a second k3s server and called it done. That made things worse.

k3s with embedded etcd uses Raft, and Raft needs a **majority** of members to agree before it commits a write. With two members, the majority is two. Lose either node and the cluster can't write anything, so the API server stops accepting changes.

| Servers | Majority | Failures tolerated |
| ------- | -------- | ------------------ |
| 1       | 1        | 0                  |
| 2       | 2        | 0                  |
| 3       | 2        | 1                  |
| 5       | 3        | 2                  |

Two servers give you the same fault tolerance as one, plus twice the ways to fail. The smallest useful HA control plane is three servers, and odd numbers are the only sizes worth running.
