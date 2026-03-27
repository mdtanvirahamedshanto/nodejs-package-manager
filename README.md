# Node.js Package Manager

[![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/mdtanvirahamedshanto.nodejs-package-manager)](https://marketplace.visualstudio.com/items?itemName=mdtanvirahamedshanto.nodejs-package-manager)
[![VS Code Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/mdtanvirahamedshanto.nodejs-package-manager)](https://marketplace.visualstudio.com/items?itemName=mdtanvirahamedshanto.nodejs-package-manager)
[![Open VSX Version](https://img.shields.io/open-vsx/v/mdtanvirahamedshanto/nodejs-package-manager)](https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/mdtanvirahamedshanto/nodejs-package-manager)](https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager)
[![Build Status](https://github.com/mdtanvirahamedshanto/nodejs-package-manager/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mdtanvirahamedshanto/nodejs-package-manager/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/mdtanvirahamedshanto/nodejs-package-manager)](LICENSE)

Node.js Package Manager is a Visual Studio Code extension that provides a clean, visual workflow for managing project dependencies. It helps you inspect packages, install new ones, audit security, and apply updates from one place.

## Screenshot

![Node.js Package Manager Preview](screenshots/preview.gif)

## Key Features

| Category | Details |
|----------|---------|
| Dependency Management | Visual dependency table with sorting, package type filtering (prod/dev/peer), and auto-refresh on `package.json` changes |
| Search and Install | Fast npm registry search with debouncing and install options for both regular and dev dependencies |
| Updates | Individual and bulk updates, version rollback options, and ignored package support |
| Security and Insights | Security audit integration, deprecation warnings, package size visibility, and quick changelog links |
| Multi-Project Support | Monorepo-aware package detection with npm, yarn, pnpm, and bun support |
| Localization | Available in 8 languages: Spanish, German, French, Chinese (Simplified), Japanese, Portuguese, Russian, and Korean |
| UX and Theming | VS Code theme-aware UI with configurable columns |

## Requirements

- VS Code 1.85.0 or later
- A Node.js project containing a `package.json`
- At least one supported package manager installed (npm, yarn, pnpm, or bun)

## Installation

Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mdtanvirahamedshanto.nodejs-package-manager), or search for "Node.js Package Manager" in the Extensions view (`Ctrl+Shift+X`).

Open VSX listing: [https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager](https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager)

## Getting Started

### Open the Extension

- Command Palette: press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS), then run "Open Node.js Package Manager"
- Explorer Context Menu: right-click `package.json`, then select "Open Node.js Package Manager"

### Core Workflow

1. Review installed dependencies and compare installed vs latest versions.
2. Filter by package type or search by name to quickly find dependencies.
3. Update selected packages or run bulk update for all outdated packages.
4. Search npm and install packages as dependencies or devDependencies.
5. Open package changelogs before upgrading to understand release impact.

### Additional Tools

- Smart Search Detection: installed packages are shown with uninstall-aware behavior.
- Ignore List: hide selected packages from update checks and counters.
- Show All Toggle: switch between outdated-only and full package views.

## Extension Settings

This extension contributes the following configuration keys:

- `nodejs-package-manager.columns.size`: Show the Size column
- `nodejs-package-manager.columns.type`: Show the Type column
- `nodejs-package-manager.columns.lastUpdate`: Show the Last Update column
- `nodejs-package-manager.columns.security`: Show the Security column
- `nodejs-package-manager.columns.semverUpdate`: Show the Update Type column (MAJOR/MINOR/PATCH)

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See LICENSE for details.

## Tech Stack

- TypeScript
- React
- Vite
- VS Code Extension API