# Project Requirements — MSc Micro‑SaaS Project

This document describes the expectations, required tasks, suggested micro‑SaaS ideas, deliverables, timeline, and grading rubric for Project 2. 

The goal is to build a small production‑style micro‑SaaS application that demonstrates the React topics covered in the course: component design, state management, authentication, routing, server communication, and integration with a Backend-as-a-Service (BaaS).

## Mandatory Technical Requirements

Every team must implement the following features. Each requirement should be clearly documented in a file called `PROJECT.md`.

1. Component Design
   - Use reusable, well‑structured React components with clear props and state boundaries.
   - One or more composite components (e.g., dashboard, form + list, editor) that demonstrate component composition.

2. State Management
   - Use a recognized state management approach (React Context, Redux, Zustand, Jotai, or TanStack Query for server state) for global/complex state.
   - Demonstrate separation between UI state, client cache, and remote data.

3. Authentication & Authorization
   - Implement sign up / sign in flows (email+password).
   - Protect at least one route requiring authentication and show role-based or user-scoped data where applicable.
   - Persist authentication state across reloads (e.g., using tokens or BaaS auth session).

4. Routing
   - Use client-side routing (e.g., `@tanstack/react-router` or `react-router`) with at least one nested route.
   - Provide navigation and handle not-found routes gracefully.

5. Server Communication & Persistence
   - Implement CRUD interactions with a backend API or a BaaS (e.g., Firebase/Firestore, Supabase, Convex).
   - Demonstrate reading/writing persistent data for user-specific resources.


8. Documentation
    - Create a file called: `PROJECT.md`.
    - In there you should provide through documentation about your project. 
    - Explain what you build.
    - Disclose AI and LLM tools usage.
    - Explain how data is managed in your app and why you chose those options.
    - Explain the API/BaaS you used.
    - Explain your strategy to connect with the backend.
    - (optional) include 

## Deliverables

- Link to the project repository.

## Three Micro‑SaaS Project Suggestions

1) Study Session Analytics (team productivity analytics)
   - Brief: A small app for students to create study sessions, invite collaborators, and track time and activity statistics.
   - Key features: session creation, timer, per-user stats, charts/dashboards, authentication, shareable session links, persistence in BaaS.
   - Course mapping: component composition (timer, charts), state management (session state, user stats), auth, routing (session pages + dashboard), BaaS for persistence.

2) Snippet Manager for Developers
   - Brief: A micro‑SaaS to save, tag, and share code snippets with basic search and folder organization.
   - Key features: create/edit/delete snippets, tagging, search, user accounts, shareable links, optional syntax highlighting, storage via BaaS.
   - Course mapping: forms + editors, state for filters/search, auth, API for persistence, nested routes for snippet and folder pages.

3) Lightweight Invoicing & Subscription Mock
   - Brief: Simple invoicing tool for freelancers: clients, invoices, simple recurring‑invoice simulation and PDF export (or CSV)
   - Key features: manage clients, create invoices, mark paid/unpaid, authentication, persisted data, hosted deployment.
   - Course mapping: complex forms, state for invoice lines, authentication, routing for client/invoice views, server/BaaS for persistence and export.

## Grading

The following rubric will be used to evaluate projects. The rubric focuses on completeness of required features, correctness of implementation (logic and behavior), maintainability, and performance. (References to automated tests have been removed.)

| Grade | Completeness: Is the project fulfilling all the technical specifications?                                                                                                                                                                                      | Correctness: Is the logic and behavior correct and reliable?                                                                                                                                                                                                                 | Maintainability: Is the code documented, organized, and follow best practices discussed in class?                                                                                                                                                                                                              | Performance: Is the code efficient?                                                                                                                                                                                                                                                |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A     | 100% of the required features are implemented exactly as specified. All required functionality (pages, flows, persistence) is present and fully functional.                       | Logic is flawless and robust. Session handling, data formatting, and state transitions are correct. No logical errors or race conditions are present in event handling.                        | Exemplary code structure (clear separation of concerns). Code is well‑documented with clear function/method docstrings and inline comments where necessary. Follows best practices covered in class.                  | Highly optimized. DOM manipulation/state updates are batched or minimized. Event handlers are efficient. The app introduces negligible performance overhead. |
| B     | Nearly complete. One or two minor deviations from the specification (non‑critical). All core required features are present and functional.                                      | Mostly correct. All major features work, but there may be one minor, non‑critical logical issue.                                                                                           | Good, professional-level code. Structure is sound and generally easy to follow. Adequate documentation is provided.                                                                | Generally efficient. No noticeable lag; a few areas could be slightly optimized.                                   |
| C     | Mostly complete, but with several noticeable deviations. Lacks one key requirement or has multiple minor structural/content errors. | Correct but with critical flaws in one core area (e.g., persistence partially broken across pages). Some functionality may fail under certain conditions.                                        | Functional, but disorganized. The implementation works, but the class/component structure may be weak, or code is monolithic. Minimal or inconsistent documentation. | Acceptable performance. No major slowdowns, but updates could be more efficient.                                                             |
| D     | Incomplete. Missing two or more core required features. Significant structural errors that violate the specification.           | Substantially flawed logic. Multiple core features are implemented incorrectly leading to frequent failures.                        | Poorly organized and difficult to maintain. Lack of cohesive structure and documentation.                                                                             | Slow. Inefficient event handling or excessive DOM operations noticeably impact the user experience.                                                                                  |
| E     | Severely incomplete. More than half of the required elements, classes, or content are missing or incorrect.                                                                                   | Non‑functional or mostly broken. The main features do not work as intended.                                                                            | Unstructured code; spaghetti code with minimal separation.                                                                                                                                   | Unacceptable performance. The app is unresponsive or freezes during common operations.                                                                                                                                                                      |
| F     | Submission is not present or non‑attempt. No files submitted, or the submitted code does not attempt to implement the specified project.                                                                                                  | No functional logic present.                                                                                                                                                                                                                                             | Code is not present or is an irrelevant submission.                                                                                                                                                                                                                                                            | Code is not present or is an irrelevant submission.      |
