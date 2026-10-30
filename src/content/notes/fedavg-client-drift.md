---
title: FedAvg struggles when clients don't look alike
date: 2026-10-30
category: Applied AI
tags: [federated-learning, fedavg, non-iid]
tldr: More local epochs speed up FedAvg on IID data but make client drift worse on non-IID data.
description: A short note on client drift in federated averaging with non-IID data.
---

Federated averaging trains a model on each client for a few local epochs, then averages the weights on the server. On IID data this works well, and more local epochs mean fewer communication rounds.

On non-IID data, each client's local optimum pulls in a different direction. The longer clients train locally, the further their weights **drift** apart, and the average can land somewhere none of them would choose.

Things that help:

- Fewer local epochs, at the cost of more rounds.
- A proximal term that keeps local weights close to the global model, as in FedProx.
- Control variates that correct each client's update direction, as in SCAFFOLD.

> The local epoch count is a trade-off between communication cost and convergence, not a free speed-up.
