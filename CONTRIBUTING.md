# Contributing to NPM Package Manager

Thank you for your interest in contributing to NPM Package Manager! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions with the community.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the issue list to avoid duplicates.

When creating a bug report, include:
- A clear, descriptive title
- A detailed description of the issue
- Steps to reproduce the behavior
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (VS Code version, Node.js version, OS)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- A clear, descriptive title
- A detailed description of the suggested enhancement
- Why this enhancement would be useful
- Examples of similar features in other tools

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `npm run test`
5. Run linting: `npm run lint`
6. Format code: `npm run format`
7. Commit with clear messages
8. Push to your fork
9. Create a Pull Request with a clear description

## Development Setup

```bash
# Install dependencies
npm run install:all

# Build webview UI
npm run build:webview

# Compile TypeScript
npm run compile

# Watch mode for development
npm run dev

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Style Guide

- Use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

## Commit Messages

Use clear, descriptive commit messages:
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues when applicable

## Release Process

Maintainers will handle versioning and releases following semantic versioning.

## Questions?

Feel free to open an issue or discussion for questions.

Thank you for contributing!
