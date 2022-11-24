/* eslint-disable max-classes-per-file */
import type { ReactiveControllerHost, ReactiveElement } from 'lit';
import { ReactiveController } from 'lit';
import { ContextConsumer, ContextProvider, ContextKey, ContextType } from '@lit-labs/context';

export class StoreProvider<T extends ContextKey<unknown, unknown>> implements ReactiveController {
  public provider;

  constructor(private host: ReactiveControllerHost, context: T, subject: ContextType<T>) {
    (this.host = host).addController(this);
    this.host.addController(this);

    if (!!subject) {
      const self = this;
      try {
        // @ts-ignore
        const proxiedSubject =  new Proxy(subject, {
          set(t, prop, value, receiver) {
            // update the provider and consumer
            self.host.requestUpdate();
            self.provider?.updateObservers();
            return Reflect.set(t, prop, value, receiver);
          }
        });

        // @ts-ignore
        this.provider = new ContextProvider(host as ReactiveElement, context, proxiedSubject);
      } catch (e) {
        throw new Error('StoreController expected a subject that is ofType object')
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  hostUpdate(): void {
    // this.value = this.store.value;
  }
}

export class StoreConsumer<T extends ContextKey<unknown, unknown>> implements ReactiveController {
  public store;

  constructor(private host: ReactiveControllerHost, context: T) {
    (this.host = host).addController(this);
    this.host.addController(this);

    this.store = new ContextConsumer(host as ReactiveElement, context, undefined, true);
  }

  // eslint-disable-next-line class-methods-use-this
  hostUpdate(): void {
    // this.value = this.store.value;
  }
}
