---
layout: post
title: "Proxmox Automation (Part 2): Deploying VMs"
---

All VMs have to start from an ISO (or, more common now, a cloud image provided by a distro). Either one can be turned into a proxmox template, which can then be easily cloned into live VMs. Along the way, there are a few places to inject custom configurations.

1. Packer: With packer, we can run provisioning prior to turning the VM into a template (using an auto-installer script and/or cloud init)
2. With Terraform, we can run provisioning directly through remote commands, or through cloud-init
3. Terraform can also kick off ansible, which opens up even more tools for configuration

My basic philosophy behind these tools is this: Baking certain configurations (like editor and editor configuraitons, shell configurations, and SSH keys) into templates directly, rather then having them applied on every install, can cut down some complexity and runtime for terraform and ansible scripts. But more specific configurations should be left for runtime (e.g. I don't need every host to have docker or BIND installed) should be left to Terraform at launch time. Configurations that depend on other machiens (such as Kubernetes) can be handled via Ansible, which is best suited to manage and fetch information from already-running hosts (although Terraform _could_ handle some of it).

## Packer

At a high level, Packer allows for the creation of customized OS deployments. While it can't generate customized ISOs (for e.g. bare metal install), it has plugins (called "providers") for major cloud providers as well as common hypervisors (including proxmox). Using the proxmox API, Packer can launch a new VM with the attached ISO, run any specified configurations via SSH, and then convert the VM into a template. The user can also ensure cloud-init is installed and cleared so that it will run properly every time the tempalte is cloned.

Step 1: 
