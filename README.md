# Vyombotics Academy

TanStack Start application for Vyombotics Academy.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production build uses the Nitro Vercel preset configured in `vite.config.ts`.
It generates Vercel Build Output in `.vercel/output`, including:

- `.vercel/output/config.json`
- `.vercel/output/static`
- `.vercel/output/functions/__server.func`

This app does not need a root `index.html`; the root page is the TanStack route at
`src/routes/index.tsx`, and all requests are routed through the generated SSR
function.

## Vercel Deployment

Use these project settings:

- Root Directory: repository root
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty

Required environment variables must be configured in Vercel Project Settings.
Do not deploy local generated folders such as `.vercel`, `.output`, `dist`, or
`node_modules`; Vercel rebuilds them during deployment.
