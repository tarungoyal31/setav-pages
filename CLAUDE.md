# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- `npm run dev` - Start Vite development server
- `npm run build` - TypeScript compile and Vite production build
- `npm run lint` - Run ESLint on TypeScript/TSX files (zero warnings allowed)
- `npm run preview` - Preview production build locally

### AWS Amplify Commands

- `npx ampx sandbox` - Start Amplify sandbox for local backend development
- `npx ampx generate outputs` - Generate `amplify_outputs.json` after backend changes

## Architecture

This is an AWS Amplify Gen 2 application using React + Vite.

### Backend (`amplify/`)

- `backend.ts` - Main backend definition, imports and registers auth and data resources
- `auth/resource.ts` - Cognito authentication config (email-based login)
- `data/resource.ts` - AppSync GraphQL API with DynamoDB, defines data schema using Amplify's `a.schema()` builder

### Frontend (`src/`)

- `main.tsx` - App entry point, configures Amplify with `amplify_outputs.json`
- `App.tsx` - Main component using `generateClient<Schema>()` for typed GraphQL operations

### Key Patterns

- Schema types are exported from `amplify/data/resource.ts` as `Schema` and imported in frontend for type-safe data operations
- The `amplify_outputs.json` file is auto-generated and gitignored - regenerate it when backend resources change
- Uses Amplify's real-time subscriptions via `observeQuery()` for live data updates
