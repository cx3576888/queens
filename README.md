# React + TypeScript + Vite

### Environment:
- node v20.13.1
- npm v10.5.2
- yarn v1.22.22

### Create project:
```bash
$ yarn create vite queens --template react-ts
$ cd queens/
$ git init
```

### Install packages:
```bash
$ yarn
```

# Vitest:
- Install:
  ```bash
  $ yarn add -D vitest
  ```

- Create a `test` folder, all test files will be here\
  File name example: `App.tsx` <--> `App.test.tsx`

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

- Set `environment`, `globals`, `setupFiles` properly inside `vite.config.ts`

- Set `includes`, `types` properly inside `tsconfig.app.json`

- Ready to write unit tests!
