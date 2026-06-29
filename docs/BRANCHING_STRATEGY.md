# Branching Strategy

This document defines the branching strategy for the SAO - Soluciones y Automatizaciones Operativas website repository.

The goal is to keep the project stable, traceable and ready for professional workflows using GitHub, Pull Requests, automated checks and future CI/CD pipelines.

---

## Main principle

The `main` branch represents the stable version of the website.

Any change that affects documentation, design, functionality, tooling or deployment should be developed in a separate branch and then merged into `main` after review.

---

## Main branch

### `main`

Stable production-ready branch.

This branch should contain only reviewed and functional changes.

Recommended use:

- Stable website versions.
- Approved documentation.
- Released changes.
- Deployable code.

Avoid working directly on `main` unless the change is very small, safe and intentional.

---

## Supporting branch types

### `docs/*`

Used for documentation changes.

Examples:

```txt
docs/update-readme
docs/add-architecture-notes
docs/add-changelog-guidelines