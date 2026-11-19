# UNFOLD — A presentation in motion

A desktop-first, scroll-driven presentation canvas. Each chapter is authored as React/HTML and styled with CSS; there are no slide screenshots or exported-image panels. The current page is a topic-neutral shell awaiting the presentation title and content.

## Development

- `pnpm dev:static` starts the Vite preview on port 3000 (or the configured `PORT`).
- `pnpm build:static` builds the production static site.
- `pnpm check` runs the TypeScript check.

The established visual system uses dark glass surfaces, pink-violet lighting, live typography and motion that follows the viewer's scroll. Reduced-motion preferences are respected.
