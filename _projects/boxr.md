---
layout: post
title: boxr, a simple container manager
description: My implementation of a simple container manager
---

### `boxr` A simple container manager ###

`boxr` is my implementation of many of the core components of container runtimes/managers.
with no containerd/runc underneath. It is a work in progress that I've picked up and put 
down several times. The project has a few goals:

- Practice Golang
- Learn some systems level concepts (namespaces, chroot/pivot_root)
- Better understand container lifecycle and management
- Understand and work with overlay filesystems

I don't expect to have anything close to docker/podman, but I do plan to go as far
as implementing utilities for downloading container images and running them.

Follow along with my progress at the [project site][site] and on [my Github][github]

[site]: https://gruejay.github.io/container-runtime/
[github]: https://github.com/gruejay/container-runtime/
