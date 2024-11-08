# SolidUI Pro

A professional UI template built with SolidJS, featuring a modern design system, internationalization, and comprehensive components.

## Features

- 🎨 Modern UI Design with Tailwind CSS
- 🌍 Internationalization (i18n) support for:
  - English
  - Simplified Chinese
  - Vietnamese
- 🎯 Key Components:
  - Responsive Layout with Sidebar
  - Data Tables with sorting and pagination
  - Charts and Analytics Dashboard
  - Form Components
  - Toast Notifications
  - Modal Dialogs
  - Loading Skeletons
- 🛠 Developer Tools:
  - TypeScript support
  - ESLint + Biome configuration
  - Hot Module Replacement (HMR)
  - Path aliases

## Quick Start

1. Clone the repository
2. Install dependencies:

```bash
$ npm install # or pnpm install or yarn install
```

## Exploring the template

This template's goal is to showcase the routing features of Solid.
It also showcase how the router and Suspense work together to parallelize data fetching tied to a route via the `.data.ts` pattern.

You can learn more about it on the [`@solidjs/router` repository](https://github.com/solidjs/solid-router)

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
