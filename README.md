# Hyperstruck Site

React + TypeScript marketing site built with Vite and MUI.

## Requirements

- `pnpm`
- A recent version of Node.js


## Environment variables set in the build pipeline e.g. Netlify
- VITE_SUPABASE_URL 
- VITE_SUPABASE_ANON_KEY

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

Run a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project Notes

- App entry: `src/main.tsx`
- Root app component: `src/App.tsx`
- Shared layout: `src/components/AppLayout.tsx`
- Theme and design tokens: `src/theme/`
