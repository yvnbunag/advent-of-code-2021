# Advent of Code 2021

Coding challenge project with Jest, ESLint and TypeScript

<!-- omit in toc -->
## Contents

- [Requirements](#requirements)
- [Scaffold setup](#scaffold-setup)
- [Usage](#usage)
  - [Running tests](#running-tests)
  - [Running challenges / TypeScript files](#running-challenges--typescript-files)
  - [Linting code](#linting-code)
- [Scaffold](#scaffold)

<br/>

## Requirements

1. [Node.js](https://nodejs.org/en/) version 16.11.1 or higher
2. [pnpm](https://pnpm.io/) version 6.11.0 or higher
   - May be swapped with other package managers such as
  [npm](https://docs.npmjs.com/) and [yarn](https://yarnpkg.com/)

<br/>

## Scaffold setup

1. Initialize git repository

```sh
git init
git add .
```

2. Install dependencies

```sh
pnpm install
```

3. Commit and push project to remote repository

```sh
git commit -m "<commit-message>"
git remote add origin <remote-origin>
git push --set-upstream origin <branch-name>
```

<br/>

## Usage

### Running tests

```sh
# Specific test specs
pnpm test:focused test/specs/unit/add.spec.ts

# All
pnpm test
```

### Running challenges / TypeScript files

```sh
pnpm eval src/challenges/add.ts
```

### Linting code

```sh
# Lint only
pnpm lint

# With auto fix
pnpm lint:fix
```

## Scaffold

Project scaffolded with [@yvnbunag/scaffold](https://www.npmjs.com/package/@yvnbunag/scaffold)
