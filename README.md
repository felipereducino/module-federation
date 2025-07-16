# Module Federation with Vite - Complete Setup Guide

### This guide will help you set up 3 micro-frontends using Module Federation with Vite, React, and TypeScript.

## Project Structure

```
micro-frontend-demo/
├── host/           # Host application
├── remote1/        # Remote app exposing Header component
└── remote2/        # Remote app exposing Table component
```
## Explanation on: *Exposing and Consuming*

### remote1 - vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5174,
    strictPort: true
  },
  preview: {
    port: 5174,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
})
```

### remote2 - vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote2',
      filename: 'remoteEntry.js',
      exposes: {
        './Table': './src/components/Table.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5175,
    strictPort: true
  },
  preview: {
    port: 5175,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
})
```

### host - vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote1: "http://localhost:5174/assets/remoteEntry.js",
        remote2: "http://localhost:5175/assets/remoteEntry.js",
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5173,
    strictPort: true
  }
})
```

## Create Type Declarations

### Host - src/remotes.d.ts

```typescript
declare module 'remote1/Header' {
  const Header: React.ComponentType
  export default Header
}

declare module 'remote2/Table' {
  const Table: React.ComponentType
  export default Table
}
```
## Using React best practices

**host/src/App.tsx:**
```tsx
import React, { Suspense, lazy } from 'react'
import './App.css'

// Lazy load the remote components
const Header = lazy(() => import('remote1/Header'))
const Table = lazy(() => import('remote2/Table'))

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<div className="text-center p-4">Loading Header...</div>}> // Feedback for user while loading
        <Header />
      </Suspense>
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Welcome to Module Federation Demo
          </h1>
          
          <Suspense fallback={<div className="text-center p-4">Loading Table...</div>}>
            <Table />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default App
```
## package.json Scripts

For all three projects, update the scripts in package.json:

```json
{
  "scripts": {
    "dev": "vite --open --force",
    "build": "tsc && vite build",
    "preview": "vite preview --open",
    "serve": "vite preview"
  }
}
```

## Build and Run the Applications

### Important: Build order matters!

1. First, install dependencies, build and serve the remote applications:

```bash
# Terminal 1 - Build and serve Remote1
cd remote1
npm install
npm run build
npm run serve

# Terminal 2 - Build and serve Remote2  
cd remote2
npm install
npm run build
npm run serve
```

2. Then run the host application:

```bash
# Terminal 3 - Run Host
cd host
npm install
npm run dev
```
## Troubleshooting

1. **CORS Issues**: Make sure the preview headers include `"Access-Control-Allow-Origin": "*"`
2. **Module Not Found**: Ensure type declarations are in place and remote apps are built and running
3. **Port Conflicts**: Verify ports 5173, 5174, and 5175 are available
4. **Build Issues**: Always build remote apps before starting the host app
