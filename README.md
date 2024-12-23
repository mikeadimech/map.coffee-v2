# map.coffee v2

by Mikea Dimech

## Folder Structure

```
project-root/
├── .git/                    # Git repository files (version control)
├── .gitignore               # Specifies files and folders to ignore in Git
├── frontend/                # Frontend codebase
│   ├── components.json      # Configuration for Shadcn components
│   ├── eslint.config.js     # ESLint configuration for linting
│   ├── index.html           # Entry HTML file for Vite and React
│   ├── package-lock.json    # Lock file for npm dependencies
│   ├── package.json         # npm configuration and project scripts
│   ├── public/              # Publicly accessible static assets
│   │   └── vite.svg         # Example SVG asset
│   ├── src/                 # Source code for the frontend
│   │   ├── App.css          # Styling specific to the App component
│   │   ├── App.tsx          # Main application component
│   │   ├── assets/          # Project assets like images and fonts
│   │   │   ├── react.svg    # Example React logo
│   │   │   ├── images/      # Additional images
│   │   │   └── fonts/       # Custom fonts
│   │   ├── components/      # Reusable UI components
│   │   │   ├── navbar.tsx   # Navbar component
│   │   │   └── ui/          # Shadcn UI components
│   │   │       └── button.tsx  # Example Shadcn button component
│   │   ├── index.css        # Global Tailwind CSS styles
│   │   ├── lib/             # Utility and API helper functions
│   │   │   ├── api.ts       # API utility functions (Flask)
│   │   │   └── utils.ts     # General utility functions
│   │   ├── main.tsx         # React application entry point
│   │   ├── pages/           # Page-level components
│   │   │   ├── home/        # Home page
│   │   │   │   └── page.tsx # Home page component
│   │   │   ├── about/       # About page folder
│   │   │   ├── dashboard/   # Dashboard page folder
│   │   │   └── editor/      # Editor page folder
│   │   └── vite-env.d.ts    # TypeScript environment declarations for Vite
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── tsconfig.app.json    # TypeScript config for app-specific settings
│   ├── tsconfig.json        # Base TypeScript configuration
│   ├── tsconfig.node.json   # TypeScript config for Node.js-specific files
│   └── vite.config.ts       # Vite configuration for bundling and aliasing
```