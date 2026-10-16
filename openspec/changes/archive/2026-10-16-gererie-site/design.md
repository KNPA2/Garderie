# Design

## Context

The current project is a fresh Angular 22 application: `src/app` contains only the CLI placeholder component ("Hello, {{ title() }}") and an empty route table. No features exist yet. The project already runs with server-side rendering and uses Vitest for tests, and its OpenSpec configuration selects the `spec-driven` schema.

The proposal defines what the system must do; the requirements are specified in the `specs` artifacts. This document explains how they are implemented.

## Goals / Non-Goals

**Goals:**

- Give the staff of the daycare a single application to manage children, attendance, payments, and parent communication.
- Keep the implementation frontend-only, as requested.
- Keep the data available in the browser across sessions.

**Non-Goals:**

- No backend or server-side API.
- No user accounts or login.
- No reporting or export features beyond the listed capabilities.

## Decisions

- **Routes are organized per capability.** Each capability (`children`, `attendance`, `payments`, `parent-communication`) owns its own route under a shared layout, for example `/children` or `/attendance`. The routing is deep-linkable, and every capability is reachable without passing through another capability. The empty route table of the placeholder app is replaced by these routes.
- **All data lives in the browser.** The request explicitly limits the implementation to the frontend, and no backend exists, so every capability accesses its data through browser storage. The trade-off is that the data is tied to one browser and is not synchronised between devices. No capability depends on server-side storage, so this choice is safe for the current scope.
- **Each capability exposes a signal-based service.** Angular's signals are used to publish the current state of a capability, and services read and write browser storage when the state changes. No external state library is needed, which keeps the dependency footprint unchanged.
- **Shared UI is reused across capabilities.** Presentational components (lists, tables, forms) are shared between the capabilities. Capabilities own the behaviour and the data access; they do not duplicate list or form code.
- **The existing server-side rendering setup is kept.** The project already renders the application shell with SSR. Since the request is frontend-only, this setup continues to serve the shell, while the application itself runs in the browser after it loads.

## Risks / Trade-offs

- [Risk] Browser storage is synchronous and has a limited quota. → Mitigation: keep the current dataset small and paginate long lists.
- [Risk] The records are tied to one browser, and clearing the browser data erases them. → Mitigation: rely on the browser's managed storage and keep the dataset small.
- [Risk] There is no access control, because there is no backend. → Accepted by design: the application is used by the staff of the daycare only, as recorded in the proposal.

## Migration Plan

- Replace the placeholder `app` component and the empty routes with the new application views.
- No data migration is required: the placeholder application does not read or write any data.
- The existing SSR setup is reused unchanged, so no deployment change is needed.
