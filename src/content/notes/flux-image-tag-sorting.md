---
title: Sorting Flux image tags by timestamp, not by name
date: 2026-10-28
category: Platform Engineering
tags: [flux, gitops, kubernetes]
description: How to make Flux image automation pick the newest build when tags contain a commit SHA.
---

Flux image automation picks the "latest" tag with an `ImagePolicy`. If your tags look like `main-<sha>-<timestamp>`, sorting them alphabetically picks whichever SHA happens to sort last, which isn't the newest build.

The fix is to extract the timestamp with a regex and sort it numerically:

```yaml
apiVersion: image.toolkit.fluxcd.io/v1beta2
kind: ImagePolicy
metadata:
  name: site
spec:
  imageRepositoryRef:
    name: site
  filterTags:
    pattern: "^main-[a-f0-9]+-(?P<ts>[0-9]+)$"
    extract: "$ts"
  policy:
    numerical:
      order: asc
```

Now the newest build always wins, whatever its commit hash.
