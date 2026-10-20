# Prisma Postgres with Prisma 8 ORM, deployed on Vercel

Status: accepted (2026-10-20)

## Context

The app has a relational model (recipes, ingredients, weekly plans) queried with joins, and the shopping list is an aggregation across them. User count is small. We value simplicity and a typesafe query API in Next.js server code. The app deploys on Vercel (serverless functions).

## Decision

- **Database:** PostgreSQL, hosted on **Prisma Postgres** (managed, built-in connection pooling, serverless-friendly).
- **ORM:** **Prisma 8** (`@prisma/orm-postgres`), contract-first: `src/prisma/contract.prisma` → `contract.json` / `contract.d.ts`. Use `db.orm` for relational reads/writes and `db.sql` for aggregations.
- **Hosting:** the Next.js app stays on Vercel. Prisma Postgres is used as a standalone database; `DATABASE_URL` is set manually in Vercel env vars (not managed by Prisma Composer/Compute).
- ~~**Shopping list is derived**, computed by query from plan → recipes → ingredients, not persisted.~~ Superseded by [ADR-0002](./0002-persisted-shopping-list.md).

## Considered options

- **SQLite (file / Turso):** simplest locally, but a file DB does not work on Vercel serverless; Turso adds a vendor for little gain at this scale.
- **Neon / Supabase Postgres:** equivalent fit. Supabase's main extra (auth) overlaps with Clerk.
- **Drizzle / Kysely:** mature typed alternatives. Drizzle is the fallback if Prisma 8's release-candidate churn becomes costly; the Postgres schema carries over.

## Consequences

- Prisma 8 is a release candidate: pin exact versions and keep `prisma` and `@prisma/orm-postgres` in lockstep.
- No Next.js build plugin exists: `prisma contract emit` runs in the `build` script and manually during development.
- Node 24 (and Vercel's runtime) has no global `Temporal`: use `*String` timestamp types (e.g. `TimestamptzString`) or add `temporal-polyfill`.
- The DB region is fixed at project creation; Vercel functions must run in a nearby region to keep query latency low.
