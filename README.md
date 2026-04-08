# Node.js Package Manager

[![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/mdtanvirahamedshanto.nodejs-package-manager)](https://marketplace.visualstudio.com/items?itemName=mdtanvirahamedshanto.nodejs-package-manager)
[![VS Code Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/mdtanvirahamedshanto.nodejs-package-manager)](https://marketplace.visualstudio.com/items?itemName=mdtanvirahamedshanto.nodejs-package-manager)
[![Open VSX Version](https://img.shields.io/open-vsx/v/mdtanvirahamedshanto/nodejs-package-manager)](https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/mdtanvirahamedshanto/nodejs-package-manager)](https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager)
[![Build Status](https://github.com/mdtanvirahamedshanto/nodejs-package-manager/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mdtanvirahamedshanto/nodejs-package-manager/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/mdtanvirahamedshanto/nodejs-package-manager)](LICENSE)

Node.js Package Manager is a VS Code extension that gives you a visual, reliable workflow for dependency management. Review outdated packages, install new dependencies, run security checks, and apply updates faster without leaving the editor.

## Why Use This Extension

- One place to manage dependencies across your Node.js workspace
- Clear visibility into installed, latest, and update type information
- Faster upgrades with individual and bulk update actions
- Built-in safety helpers like audit checks and changelog links



## Features

| Area | Capabilities |
|------|--------------|
| Dependency Dashboard | Visual dependency table with sorting and filtering by production, development, and peer dependencies |
| Search and Install | Debounced npm registry search with install options for dependencies and devDependencies |
| Version Updates | One-click package update, bulk update flow, and SemVer-aware update type indicators |
| Security and Quality | Security audit summary, deprecation warnings, package size data, and quick changelog access |
| Multi-Project Support | Monorepo-aware project detection with npm, yarn, pnpm, and bun support |
| Localization | Available in Spanish, German, French, Chinese (Simplified), Japanese, Portuguese, Russian, and Korean |
| VS Code Integration | Theme-aware UI, context menu entry on package.json, and command palette support |

## Requirements

- VS Code 1.85.0 or newer
- A Node.js workspace containing package.json
- npm, yarn, pnpm, or bun installed

## Install

- VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=mdtanvirahamedshanto.nodejs-package-manager
- Open VSX: https://open-vsx.org/extension/mdtanvirahamedshanto/nodejs-package-manager

## Quick Start

1. Open Command Palette with Ctrl+Shift+P (Cmd+Shift+P on macOS).
2. Run Open Node.js Package Manager.
3. Choose your project and review dependency status.
4. Update outdated packages or install new ones from search.

You can also right-click package.json in the Explorer and run Open Node.js Package Manager.

## Configuration

The extension contributes these settings:

- nodejs-package-manager.columns.size: Show Size column
- nodejs-package-manager.columns.type: Show Type column
- nodejs-package-manager.columns.lastUpdate: Show Last Update column
- nodejs-package-manager.columns.security: Show Security column
- nodejs-package-manager.columns.semverUpdate: Show Update Type column (MAJOR/MINOR/PATCH)

## Development

```bash
npm run install:all
npm run vscode:prepublish
npm run test
```

## Contributing

Contributions are welcome and appreciated.

- Start here: [CONTRIBUTING.md](CONTRIBUTING.md)
- Report bugs or request features: [GitHub Issues](https://github.com/mdtanvirahamedshanto/nodejs-package-manager/issues)
- Community rules: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Security reporting: [SECURITY.md](SECURITY.md)

## License

Licensed under the MIT License. See [LICENSE](LICENSE).