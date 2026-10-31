# Deployment Infrastructure

Deployment specifications, Kubernetes resource manifests, and environment topologies for **Project Red Velvet**.

## Security Constraints

- Read-only root filesystems enforced (`readOnlyRootFilesystem: true`).
- Privilege escalation forbidden (`allowPrivilegeEscalation: false`).
- Linux kernel capabilities dropped (`capabilities: drop: [ALL]`).
- Runtime default seccomp profiles enabled.
