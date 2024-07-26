# React + TypeScript + Vite

### Environment:
- node v20.13.1
- npm v10.5.2
- yarn v1.22.22

### Start from:
```bash
$ yarn create vite queens --template react-ts
$ cd queens/
$ git init
```

---

- Install packages:
  ```bash
  $ yarn
  ```

- Use Vitest:
  ```bash
  $ yarn add -D vitest
  ```
  And then add `"test": "vitest"` into `"scripts"` section in `package.json`

- Update Vitest `environment`:
  ```bash
  $ yarn add -D jsdom
  ```
  And then use `environment: 'jsdom'` for Vitest

- Use `testing-library` for convenience:
  ```bash
  $ yarn add -D @testing-library/react @testing-library/jest-dom
  ```
  Got a "unmet peer dependency warning", so:
  ```bash
  $ yarn add -D @testing-library/dom
  ```
