# 🚀 RiftStack

> A "rift" in time - something fast and different. Modern sound and tech.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Bun-1.2.0-000000?logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![tRPC](https://img.shields.io/badge/tRPC-11.0.0-2596BE?logo=trpc&logoColor=white)](https://trpc.io/)
[![Hono](https://img.shields.io/badge/Hono-4.7.4-000000?logo=hono&logoColor=white)](https://hono.dev/)

A modern, full-stack web application template built with cutting-edge technologies. RiftStack combines the power of React Router, tRPC, and Hono to deliver a blazing-fast, type-safe development experience.

## ✨ Features

- **🚀 Ultra-Fast Development** - Built with Bun for lightning-fast package management and execution
- **🔒 Type Safety** - End-to-end type safety with tRPC and TypeScript
- **⚡ Modern React** - React 19 with the latest features and optimizations
- **🎨 Beautiful UI** - Comprehensive component library with Radix UI and Tailwind CSS
- **📱 Responsive Design** - Mobile-first approach with modern design patterns
- **🧪 Testing Ready** - Vitest, Playwright, and React Testing Library included
- **🔧 Developer Experience** - Hot reload, linting, and formatting with Biome
- **📦 Monorepo Architecture** - Turbo-powered workspace management

## 🏗️ Architecture

```
RiftStack/
├── apps/
│   ├── server/          # Hono + tRPC backend
│   └── web/            # React Router frontend
├── packages/            # Shared packages (future)
└── tools/              # Build and development tools
```

### Backend (Server)

- **Hono** - Ultra-fast web framework
- **tRPC** - Type-safe API layer
- **Zod** - Schema validation
- **Bun** - JavaScript runtime

### Frontend (Web)

- **React Router 7** - Modern routing with file-based routing
- **React 19** - Latest React with compiler optimizations
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Vite** - Lightning-fast build tool

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) 1.2.0 or higher
- Node.js 18+ (for some tooling)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd riftstack

# Install dependencies
bun install

# Start development servers
bun dev
```

### Development

```bash
# Start all services in development mode
bun dev

# Start only the backend
cd apps/server && bun run dev

# Start only the frontend
cd apps/web && bun run dev

# Run tests
bun test

# Lint code
bun lint

# Build for production
bun build
```

## 📁 Project Structure

```
apps/
├── server/
│   ├── src/
│   │   ├── context.ts      # tRPC context
│   │   ├── index.ts        # Hono server entry
│   │   ├── router.ts       # tRPC router
│   │   ├── schemas.ts      # Zod schemas
│   │   └── types.ts        # TypeScript types
│   └── package.json
└── web/
    ├── app/
    │   ├── components/     # UI components
    │   ├── hooks/         # Custom React hooks
    │   ├── lib/           # Utility functions
    │   ├── routes/        # File-based routes
    │   └── root.tsx       # Root layout
    ├── public/            # Static assets
    └── package.json
```

## 🛠️ Available Scripts

### Root Level

- `bun dev` - Start development servers
- `bun build` - Build all applications
- `bun test` - Run all tests
- `bun lint` - Lint all code

### Server App

- `bun run dev` - Start server with hot reload
- `bun test` - Run server tests
- `bun run types` - Type check

### Web App

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Serve production build
- `bun test` - Run Playwright tests
- `bun run test:browser` - Run Vitest browser tests

## 🎯 Key Technologies

### Runtime & Package Manager

- **[Bun](https://bun.sh/)** - All-in-one JavaScript runtime and package manager

### Backend

- **[Hono](https://hono.dev/)** - Fast, lightweight web framework
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Frontend

- **[React 19](https://react.dev/)** - Latest React with compiler
- **[React Router 7](https://reactrouter.com/)** - Modern file-based routing
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components

### Build Tools

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Turbo](https://turbo.build/)** - High-performance build system
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter

### Testing

- **[Vitest](https://vitest.dev/)** - Fast unit testing
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[React Testing Library](https://testing-library.com/)** - Component testing

## 🔧 Configuration

### Environment Variables

Create `.env` files in each app directory as needed:

```bash
# apps/server/.env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"

# apps/web/.env
VITE_API_URL="http://localhost:3000"
```

### TypeScript

The project uses strict TypeScript configuration with path mapping and modern features enabled.

### Biome

Code formatting and linting is handled by Biome with a configuration optimized for React and TypeScript projects.

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
bun test

# Run tests in watch mode
cd apps/web && bun run test:browser
```

### Integration Tests

```bash
# Run Playwright tests
bun run test:integration
```

### Test Coverage

The project is configured for comprehensive test coverage across both frontend and backend.

## 🚀 Deployment

### Production Build

```bash
# Build all applications
bun build

# The web app will be available in apps/web/build/
# The server can be deployed directly from apps/server/
```

### Docker

A Dockerfile is included for containerized deployment:

```bash
# Build the image
docker build -t riftstack .

# Run the container
docker run -p 3000:3000 riftstack
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Maintainer:** [@heyjunin](https://github.com/heyjunin)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Router](https://reactrouter.com/) team for the amazing routing solution
- [tRPC](https://trpc.io/) team for type-safe APIs
- [Hono](https://hono.dev/) team for the fast web framework
- [Bun](https://bun.sh/) team for the incredible runtime
- [Vercel](https://vercel.com/) for Turbo and the monorepo tooling

---

**RiftStack** - Breaking through the boundaries of modern web development. ⚡
