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
  5. A managed switch to connect the pieces together and provide logical network isolation

Some services run in LXC containers managed by Proxmox, most run in VMs, and several run in Docker containers inside of VMs. All of it is managed individually. This means that all my backups have to get configured individually (luckily proxmox makes this fairly easy for full disk backups of VMs). However, file level backups for any machine (vm, container, or physical) get configured manually using duplicati (which usually means these often don't get done at all). I use git repos for some things (dotfiles, projects, some automation configurations) but thats not exactly a backup. 

## Where are we going?

The goal, at the end, is to automate the deployment of my homelab environment as much as possible. Of course, in the event of a complete loss of all systems, a certain amount will need to be done by hand, but minimizing manual intervention for hardware upgrades, adding new services, HA/redundancy, and so forth will be the goal.

If, for example, I add a new hypervisor, I want to be able to install Proxmox, add it to the cluster, point some scripts at it, and be able to deploy or migrate services to it. Or, when I start making use of Kubernetes, be able to spin up a new Kubernetes cluster will a few variable assignments in a script. 

## How are we going to get there?

The project requires a few main steps. First, I need to know what I'm running, how its configured, and how it got to be that way. Since I haven't documented all (or even most) of my configurations, this will require scanning my services, re-investigating how they are configured, and writing out as much as I can for what needs to be done from a base install to get that service back up. Since a lot of this will require detailed discussion of configs and services, the documentation will live on my private wiki for the sake of security. 

Second, I need to know the tools necessary to automate these deployments. While there is more than one way to peel a potato, and therefore no way to know exactly when I've learned enough tools to do this in the """optimal""" way, there are a few tools I'd _like_ to use, purely because I either (a) already know them or (b) want to know them. This includes Packer, Terraform, Ansible, Cloud-Init, and Kubernetes. With these, I think I can cover just about any use case I come across. With ansible-pull, I can even get some of the same features as Puppet or chef, tools which I don't currently plan on using. 
