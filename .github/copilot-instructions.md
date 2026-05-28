# Copilot Instructions for poopjournal3-ui

## Project Overview
- Frontend: Vite + React (ES modules)
- Routing: `react-router-dom`
- Styling: Tailwind CSS + existing CSS files in `src/css`
- Auth: Clerk is used in-app (`@clerk/react`)
- API base URL: import `API_BASE` from `src/config.js` (do not redefine per-page)

## Code Style and Scope
- Make small, focused edits that solve the requested issue only.
- Match existing JavaScript/JSX style and component patterns.
- Do not refactor unrelated files.
- Keep components simple and avoid adding new abstractions unless needed.
- Prefer readable names; avoid one-letter variables.

## Source Layout
- Pages: `src/pages`
- Reusable UI/components: `src/components`
- App/router entry points: `src/App.jsx`, `src/AppRouter.jsx`, `src/main.jsx`
- Shared config/constants: `src/config.js`, `src/auth_config.js`

## API and Auth Conventions
- Use `API_BASE` from `src/config.js` for all backend calls.
- Include auth token via Clerk `getToken()` where protected endpoints require it.
- Use `fetch` unless asked otherwise.
- Handle network failures gracefully in UI state.

## UI/UX Constraints
- Reuse existing shared components (`Button`, `Input`, `List`, etc.) where possible.
- Keep styling aligned with current Tailwind utility usage.
- Do not introduce new design systems or custom hard-coded themes.

## Validation Checklist
- Run `npm run lint` after code changes.
- Keep warnings/errors from edited files at zero when possible.
- Preserve existing behavior unless the task explicitly requests a change.

## Preferred Workflow for Changes
1. Read the target page/component and related shared component(s).
2. Implement minimal edits in-place.
3. Verify lint and obvious runtime assumptions.
4. Summarize what changed and any follow-up actions.
