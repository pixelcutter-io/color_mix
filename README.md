# ColorMix

A CSS `color-mix()` simulator that lets you experiment with color mixing in different color spaces and instantly preview the results.

## Features

- Mix two colors with adjustable percentages
- Support for multiple color spaces: OKLCH, OKLAB, sRGB, HSL
- Real-time preview of the resulting color
- Copy-ready CSS code with custom properties
- Contrast preview against different backgrounds
- Automatic text color contrast detection

## Tech Stack

- React 18
- TypeScript
- Vite
- SCSS Modules
- [Culori](https://culorijs.org/) for color manipulation
- Biome for linting and formatting
- Stylelint for CSS/SCSS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run Biome linter |
| `bun run lint:fix` | Fix linting issues |
| `bun run lint:css` | Run Stylelint |
| `bun run lint:css:fix` | Fix CSS linting issues |
| `bun run format` | Format code with Biome |

## License

MIT