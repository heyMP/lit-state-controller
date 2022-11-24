// @ts-nocheck
import { css, html, LitElement } from 'lit';
import { StoreConsumer } from '../../src/index.js';
import { storeContext } from './x-app.js';

export class XChild extends LitElement {
  private storeController = new StoreConsumer(this, storeContext);

  static styles = css`
    :host {
      display: block;
      background: white;
      text-align: center;
      border-radius: 5px;
      overflow: hidden;
    }

    [part="header"] {
      padding: 1rem;
      background-color: red;
      color: white;
    }

    [part="main"] {
      padding: 1rem;
    }

    [part="title"] {
      padding: 1rem;
      font-size: 2rem;
    }

    [part="skills"] {
      text-align: left;
    }
  `;

  firstUpdated() {
    this.addEventListener('click', this._clickHandler);
  }

  render() {
    return html`
      <div part="title">${this.storeController?.store?.value?.fullname}</div>
    `;
  }

  _clickHandler() {
    if (this.storeController.store.value) {
      this.storeController.store.value.clicks += 1;
    }
  }
}

// @ts-ignore
customElements.define('x-child', XChild);
