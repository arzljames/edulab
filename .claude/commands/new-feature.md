---
description: Scaffold a new feature-based module in EduLab (with TanStack Router routes and TanStack Query data layer) and build it out with the specialist subagents
argument-hint: <feature-name> [short description of what the feature does]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
---

# Create a new EduLab feature

**Input:** $ARGUMENTS

The first word is the feature name. Everything after it is the description.

## Step 0: Validate
1. Normalize the name to **kebab-case** (e.g., `Lesson Plans` → `lesson-plans`). Derive the PascalCase (`LessonPlans`) and camelCase (`lessonPlans`) forms.
2. If `src/features/<name>/` already exists, **stop** and ask whether to extend it instead.
3. If no description was given, ask for one in a single short question before continuing.
4. Read `CLAUDE.md`, and look at an existing feature (e.g., `src/features/resources/`) plus its route files in `src/routes/` to match conventions.

## Step 1: Plan (show it before writing code)
Present a short plan:
- User stories (2–5 bullets, from a teacher's perspective)
- **Routes**: path, route file name, public or `_authenticated`, role checks, search params (with defaults), loader (which `queryOptions` it warms), and whether a blocker is needed
- Zod schemas: form, response, and route search
- API endpoints (method, path, payload, response)
- Query key factory + queries (list, detail, infinite?) + mutations, with each mutation's invalidation or optimistic strategy, and where to navigate after it succeeds
- Whether a Zustand store is needed, and why. The default is **no**.
- Components list
- Dependencies on other features (via their `index.ts` only)

Proceed after presenting the plan unless something is ambiguous.

## Step 2: Scaffold
Create only what the plan needs:
```
src/features/<name>/
├── api/
│   ├── endpoints.ts
│   ├── <name>.api.ts        # fetchers (Axios + Zod parse, accept signal)
│   └── <name>.queries.ts    # <camelName>Keys, queryOptions, use*Query / use*Mutation
├── components/
├── hooks/
├── pages/
│   └── <PascalName>Page.tsx # rendered by the route file
├── schemas/
│   ├── <name>.schema.ts
│   └── <name>.search.ts     # route search-param schema (if the page has filters)
├── stores/                  # only if client-only state is justified
├── types.ts
└── index.ts                 # public API: pages, pending/error components, search schemas, queryOptions, public hooks, types

src/routes/                  # thin route files (config only)
└── _authenticated/<path>.tsx   # or public, per the plan
```

## Step 3: Build with subagents
Give each agent the plan, the feature path, and the exact files it owns. Run independent agents **in parallel**.
1. **In parallel:**
   - `form-schema-specialist` → `schemas/` (form, response, search), `types.ts`
   - `api-integration-engineer` → `api/` (fetchers, key factory, queryOptions, query/mutation hooks)
2. `routing-specialist` → the route files in `src/routes/` (`validateSearch`, `loaderDeps`, a loader using the feature's `queryOptions`, `beforeLoad` guards, pending/error/not-found, blockers), plus nav links in the app shell
3. `state-architect` → `stores/`, **only if** the plan justified client-only state
4. `ui-component-builder` → `components/`, `pages/`, `hooks/` (use `useSuspenseQuery` with the same `queryOptions`, and typed `Link`/`navigate`). Use `ai-adaptation-specialist` instead or alongside it if the feature touches AI adaptation.
5. `test-engineer` → colocated tests, including route tests (guard redirect, search-param defaults), plus MSW handlers

## Step 4: Wire-up check
- Run `npm run dev` or `npm run build` briefly so the plugin regenerates `routeTree.gen.ts`. Don't edit that file by hand.
- Confirm `index.ts` exports only the public surface, and that route files import only from `@/features/<name>`.

## Step 5: Quality gate
1. Run `npx tsc --noEmit` (this catches broken `Link` targets), `npm run lint`, and `npx vitest run src/features/<name>`. Fix any failures.
2. **In parallel:** `code-reviewer` and `accessibility-auditor` on the new feature and its routes.
3. Fix all **Critical** findings. List the remaining Warnings.

## Step 6: Report
Give a concise summary:
- Files created (tree, including route files)
- Routes added: path, guard, search params
- Endpoints assumed (so the backend can match)
- Query keys and mutations, with their invalidation strategy
- Check results (types / lint / tests)
- Open warnings or TODOs
