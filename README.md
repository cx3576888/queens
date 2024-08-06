# React + TypeScript + Vite

## Environment:
- node v20.13.1
- npm v10.5.2
- yarn v1.22.22

## Create project:
```bash
$ yarn create vite queens --template react-ts
$ cd queens/
$ git init
$ yarn install
```

# Vitest:
- Install:
  ```bash
  $ yarn add -D vitest
  ```

- Create a `test` folder for all test files
  - Each unit test file should have the same name as its source file, be placed in the same relative path under `test`, and with `.test.ts` or `.test.tsx` as a suffix
  - Example: `src/components/App.tsx` <--> `test/components/App.test.tsx`

- Update `package.json`:\
  Add `"test": "vitest"` into `"scripts"` section

- Use `jsdom` environment and `testing-library` for convenience:
  ```bash
  $ yarn add -D jsdom
  $ yarn add -D @testing-library/react @testing-library/jest-dom
  ```
  Got a "unmet peer dependency warning", so:
  ```bash
  $ yarn add -D @testing-library/dom
  ```

- Create `setupTests.ts` file

- Create `vitest-env.d.ts` file

- Set `environment`, `globals`, `setupFiles`, `include` properly inside `vite.config.ts`

- Set `include` properly inside `tsconfig.app.json`

- Ready to write unit tests!

# File structure:
```bash
.
|-- .eslintrc.cjs
|-- .gitignore
|-- README.md
|-- index.html
|-- package.json
|-- public
|   `-- favicon.svg
|-- src
|   |-- components
|   |   |-- App.tsx
|   |   |-- GameRule.tsx
|   |   `-- Timer.tsx
|   |-- global.css
|   |-- main.tsx
|   |-- styles
|   |   |-- App.module.css
|   |   |-- GameRule.module.css
|   |   `-- reset.css
|   |-- utils
|   |   `-- timeUtils.ts
|   `-- vite-env.d.ts
|-- test
|   |-- components
|   |   `-- App.test.tsx
|   |-- setupTests.ts
|   |-- utils
|   |   `-- timeUtils.test.ts
|   `-- vitest-env.d.ts
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
`-- yarn.lock

8 directories, 25 files
```

## Provided `scripts`:
- You need `tree` command in your git bash (could try instruction of [this answer](https://superuser.com/questions/531592/how-to-add-the-tree-command-to-git-bash-in-windows#1141489)) for these commands:
  - `yarn tree` prints a tree-like structure like above
  - `yarn tree-path` prints all files and folders with full path
  - `yarn tree-folders` prints all folders with full path
- Alternatives if you don't have `tree` command:
  - `yarn my-ls` prints all files and folders for every folder
  - `yarn my-tree-path` should have same output as `yarn tree-path`
  - `yarn my-tree-folders` should have same output as `yarn tree-folders`
