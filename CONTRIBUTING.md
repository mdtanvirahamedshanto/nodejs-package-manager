# Contributing to Node.js Package Manager

Thank you for contributing. This project welcomes bug fixes, feature improvements, documentation updates, tests, and tooling enhancements.

## Code of Conduct

By participating, you agree to follow the Code of Conduct in CODE_OF_CONDUCT.md.

## Ways to Contribute

- Report bugs
- Suggest features
- Improve documentation
- Submit pull requests for code and tests

## Before You Start

1. Check existing issues and pull requests to avoid duplicates.
2. Open an issue first for larger changes so we can align on scope.
3. Keep pull requests focused and small when possible.

## Development Setup

```bash
# Clone your fork and enter the project
git clone <your-fork-url>
cd npm-package-manager

# Install root + webview dependencies
npm run install:all

# Build webview and compile extension
npm run vscode:prepublish

# Run quality checks
npm run lint
npm run test
```

## Local Development Commands

```bash
# Build webview only
npm run build:webview

# Compile extension TypeScript
npm run compile

# Development build
npm run dev

# Lint and format
npm run lint
npm run lint:fix
npm run format
npm run format:check

# Test
npm run test
npm run test:watch
npm run test:coverage
```

## Branch and Commit Guidelines

- Create topic branches from main, for example:
	- feat/add-audit-filter
	- fix/sidebar-refresh-race
	- docs/readme-installation
- Write commit messages in imperative style, for example: Add dependency type filter
- Reference issues in commits and PR descriptions when relevant

## Pull Request Checklist

Before opening a PR, ensure:

- Tests pass locally
- Lint passes locally
- No unrelated refactors are included
- Public behavior changes are documented in README.md or CHANGELOG.md
- Screenshots are included for UI changes

## Testing Expectations

- Add or update tests for behavior changes
- Keep changes backward compatible unless explicitly discussed
- Verify extension behavior with a real package.json project when possible

## Review and Merge

- Maintainers may request changes before merge
- PRs are merged when CI passes and review feedback is addressed
- Release versioning and publishing are handled by maintainers

## Security Reports

Do not open public issues for sensitive security vulnerabilities. Follow SECURITY.md for private reporting instructions.
