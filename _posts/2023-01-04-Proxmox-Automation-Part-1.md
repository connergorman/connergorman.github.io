---
layout: post
title: "Proxmox Automation (Part 1)"
---

This is the first of (perhaps few, perhaps many) posts about moving my homelab towards automated, disposable resources. In this post, I'll discuss a little about what my lab currently looks like, and what the goal(s) for this project is/are. Subsequent posts will focus on individual steps (How to set up packer, how to set up Terraform, how to set up dnsupdate, etc.). 

## Where are we?

My current homelab consists of a few key parts:

  1. A "core services" Proxmox hypervisor
    - This runs a pfSense router, DNS servers for my VLANs, an NGINX reverse proxy, and monitoring
  2. A secondary development hypervisor
    - This is where I spin up any servers for testing out new technologies
    - Keeping these on a separate hosts makes it _slightly_ less likely that I accidentally break a core service
  3. A NAS server that acts as an endpoint for some local backups
  4. A raspberry pi jump host


