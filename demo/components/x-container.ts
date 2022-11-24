import { LitElement, html, css } from 'lit';
import './x-child.js';

export class XContainer extends LitElement {

  static styles = css`
    :host {
      display: block;
      max-width: 480px;
      margin: 10rem auto;
    }
  `;

  render() {
    return html`
      <main>
        <x-child></x-child>
      </main>
    `;
  }
}

// @ts-ignore
customElements.define('x-container', XContainer);
