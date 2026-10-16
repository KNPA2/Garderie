# Proposal

## Why

The Garderie daycare currently has no digital tool to run itself. Enrollment, attendance, payments, and parent communication are tracked on paper or in personal notes, which makes day-to-day operations error-prone and makes it hard for parents to stay informed. A dedicated web application is needed to give staff a single, reliable place to manage the daycare and to keep parents engaged.

## What Changes

- Introduce a dedicated Angular application for daycare management, built inside the existing `garderie` project.
- Children and their parents are managed in a searchable directory, showing each enrolled child's record together with their parents.
- A daily attendance register records which children are present each day, so absences and late arrivals are always visible.
- Payments are tracked per child: amounts already paid are listed, together with the amounts still to be paid.
- Staff can contact parents from the application, so families no longer need separate channels to be informed.
- The implementation is frontend-only: no backend is built, and all data is stored and served in the browser.

### Assumptions

- The user interface is in French, matching the language of the request and the daycare context.
- Because no backend is built, all data is persisted client-side (browser storage).
- The application is used by the staff of the daycare only; no user accounts are required.

## Capabilities

### New Capabilities

- `children`: enrolled children and their associated parent records, as used by the daily directory of the daycare.
- `attendance`: the daily attendance register, with one entry per child per day.
- `payments`: payments already made per child, and the amounts still to be paid.
- `parent-communication`: the means by which staff contact parents.

### Modified Capabilities

- None. This change introduces all requirements as new capabilities; no existing specification is modified.

## Impact

- New Angular components and services under `src/app`, connected by routing between the views.
- The existing `app` component and its placeholder content are replaced by the new application views.
- No new dependencies are added; the existing packages cover the whole implementation.
- Data access uses browser storage; the existing SSR setup continues to serve the application shell.
