import { LitElement, html, css } from 'lit';
import { createContext } from '@lit-labs/context';
import { StoreProvider } from '../../src/index.js';
import './x-container.js';

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

  static styles = css``;

  setName(firstname: string, lastname: string) {
    if (this.storeController.provider) {
      this.storeController.provider.value.firstname = firstname;
      this.storeController.provider.value.lastname = lastname;
    }
  }

  render() {
    return html`
      <form @input=${this._formSubmitHandler} @submit=${this._formSubmitHandler}>
        <label for="firstname">First name:</label>
        <input name="firstname" .value=${this.storeController?.provider?.value.firstname} />
        <label for="lastname">Last name:</label>
        <input name="lastname" .value=${this.storeController?.provider?.value.lastname} />
        <input type="submit" />
      </form>
      <x-container></x-container>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _formSubmitHandler(e: InputEvent): void {
    e.preventDefault();

    // @ts-ignore
    const target = e.target?.closest('form');

    if (target) {
      const formData = new FormData(target);
      // @ts-ignore
      const { firstname, lastname } = Object.fromEntries(formData.entries);

      this.setName(firstname, lastname)
    }
  }
}

// @ts-ignore
customElements.define('x-app', XApp);
