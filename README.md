# Lit State Controller

Super minimal contextual state management solution for Lit. Uses @lit-labs/context.

## Installation

```bash
npm i lit-store-controller
```

## Usage

```html
```

Provider

```ts
import { createContext } from '@lit-labs/context';
import { StoreProvider } from '../../src/index.js';

export class Store {
  public firstname = '';

  public lastname = '';

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}

export const storeContext = createContext<Store>('store')

export class XApp extends LitElement {
  private storeController = new StoreProvider(this, storeContext, new Store());
  ...
}
```

Consumer

```ts
import { css, html, LitElement } from 'lit';
import { StoreConsumer } from '../../src/index.js';
import { storeContext } from './x-app.js';

export class XChild extends LitElement {
  private storeController = new StoreConsumer(this, storeContext);
  ...
}
```



## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.
