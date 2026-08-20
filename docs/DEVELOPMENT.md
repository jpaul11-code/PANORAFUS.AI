# Development Setup & Architecture

## Project Overview

PANORAFUS.AI is a React-based global network platform with a modular, scalable architecture designed for rapid iteration and community contribution.

## Technology Stack

```
Frontend
├── React 19.2.8       (UI Framework)
├── Vite 8.2.0         (Build Tool)
├── Tailwind CSS 4.3.3 (Styling)
└── TypeScript          (Type Safety)

Tooling
├── oxlint 1.75.0      (Linting)
├── Vitejs             (Dev Server)
└── Node 18+           (Runtime)
```

## Directory Structure

```
PANORAFUS.AI/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Modal/       # Modal system
│   │   ├── Layout/      # Layout components
│   │   ├── Common/      # Shared components
│   │   └── Features/    # Feature-specific components
│   ├── pages/           # Page-level components
│   ├── hooks/           # Custom React hooks
│   ├── context/         # Context providers (Redux alternative)
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript definitions
│   ├── styles/          # Global styles
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── dist/                # Production build (generated)
├── .github/
│   ├── workflows/       # CI/CD workflows
│   └── ISSUE_TEMPLATE/  # Issue templates
├── docs/                # Documentation
├── tests/               # Test files
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18.0 or higher
- npm 9+ or yarn 3+
- Git 2.35+

### Installation

```bash
# Clone the repository
git clone https://github.com/jpaul11-code/PANORAFUS.AI.git
cd PANORAFUS.AI

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Development Commands

```bash
# Start local dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Run tests (when configured)
npm run test

# Format code (when configured)
npm run format
```

## Component Architecture

### Modal System (Current Foundation)

The project currently features a provider-driven modal system:

```javascript
// Usage in any component
import { useModalContext } from './context/ModalContext'

function MyComponent() {
  const { openModal } = useModalContext()
  
  return (
    <button onClick={() => openModal('myModal', {
      title: 'Dialog Title',
      content: 'Dialog content',
      onClose: () => {}
    })}>
      Open Modal
    </button>
  )
}
```

### Features of Modal System
- ✅ Provider-driven control
- ✅ Smooth animations
- ✅ Backdrop click handling
- ✅ Escape key support
- ✅ Customizable content
- ✅ Multiple independent modals

## Styling Guidelines

### Tailwind CSS

We use Tailwind CSS 4 for all styling:

```jsx
// Component example
function Button({ children, variant = 'primary' }) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  }
  
  return (
    <button className={`px-4 py-2 rounded ${variants[variant]}`}>
      {children}
    </button>
  )
}
```

### Naming Conventions
- Use descriptive class names
- Follow BEM for complex components
- Use Tailwind utilities over custom CSS
- Dark mode support (when needed)

## State Management

### Current Approach
Context API + Local State (React Hooks)

### Future Considerations
- Redux for complex global state
- Zustand for lightweight store
- Recoil for atom-based state

## Testing Strategy

### Planned Testing Stack
- **Unit Tests**: Vitest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Performance**: Lighthouse CI

## Performance Optimization

### Current Practices
- Code splitting with Vite
- Lazy loading for routes
- Image optimization
- Bundle analysis

### Monitoring
- Lighthouse CI integration
- Performance budgets
- Web Vitals tracking

## Type Safety

### TypeScript Configuration
- Strict mode enabled
- JSDoc for untyped dependencies
- Type definitions for all public APIs

```typescript
// Example typed component
interface ModalProps {
  title: string
  content: React.ReactNode
  onClose: () => void
  isOpen: boolean
}

export function Modal({ title, content, onClose, isOpen }: ModalProps) {
  // Component implementation
}
```

## Code Quality

### Linting & Formatting
```bash
# Run oxlint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Commit Standards
See [CONTRIBUTING.md](../CONTRIBUTING.md#git-commit-messages)

## Build Pipeline

### Development
```
Source → Vite Dev Server → Hot Module Replacement → Browser
```

### Production
```
Source → TypeScript Compiler → Minification → Tree Shaking → dist/
```

### Build Output
- `dist/index.html` - Main entry point
- `dist/assets/` - Bundled JS, CSS, assets
- Size optimized for performance

## Environment Configuration

### Environment Variables
```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=PANORAFUS.AI
```

### Environment Files
- `.env` - Shared variables
- `.env.local` - Local overrides (git ignored)
- `.env.production` - Production variables

## Deployment

### Recommended Platforms
- Vercel (recommended for Next.js migration)
- Netlify
- GitHub Pages
- AWS Amplify
- Fly.io

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Linting clean
- [ ] Build successful
- [ ] Environment variables set
- [ ] Security audit passed
- [ ] Performance budget met

## Troubleshooting

### Common Issues

**Issue: Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**Issue: Module not found**
```bash
npm install
rm -rf node_modules/.vite
npm run dev
```

**Issue: Types not recognized**
```bash
# Regenerate types
npm run build
```

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

- [Issues](https://github.com/jpaul11-code/PANORAFUS.AI/issues)
- [Discussions](https://github.com/jpaul11-code/PANORAFUS.AI/discussions)
- [Contributing Guidelines](../CONTRIBUTING.md)

---

Happy coding! 🚀
