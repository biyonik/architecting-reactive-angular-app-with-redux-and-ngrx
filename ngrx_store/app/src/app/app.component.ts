import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppState, CounterState, ProductState } from './app.state';
import { getProducts, productCreateAction, productDeleteAction } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, NgFor],
  template: `
    <h1>Angular Ngrx</h1>
    <p>Value: {{counter$ | async }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>

    <hr>
    <div>
      <h3>Products</h3>
      <div>
        <h4>New Product</h4>
        <input type="text" [(ngModel)]="newProduct">
        <button (click)="create()">Create</button>
      </div>
      <ul>
        <li *ngFor="let product of products$ | async">
          {{product.name}}
          <button (click)="delete(product.id)">Delete</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    :host {
    --bright-blue: oklch(51.01% 0.274 263.83);
    --electric-violet: oklch(53.18% 0.28 296.97);
    --french-violet: oklch(47.66% 0.246 305.88);
    --vivid-pink: oklch(69.02% 0.277 332.77);
    --hot-red: oklch(61.42% 0.238 15.34);
    --orange-red: oklch(63.32% 0.24 31.68);

    --gray-900: oklch(19.37% 0.006 300.98);
    --gray-700: oklch(36.98% 0.014 302.71);
    --gray-400: oklch(70.9% 0.015 304.04);

    --red-to-pink-to-purple-vertical-gradient: linear-gradient(
      180deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --red-to-pink-to-purple-horizontal-gradient: linear-gradient(
      90deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --pill-accent: var(--bright-blue);

    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  counter$: Observable<number> | undefined;
  products$: Observable<any[]> = new Observable();

  newProduct: string = '';

  private readonly productStore: Store<ProductState> = inject(Store<ProductState>);
  private readonly counterStore: Store<CounterState> = inject(Store<CounterState>);

  ngOnInit(): void {
    this.counter$ = this.counterStore.select(state => state.counter);
    this.products$ = this.productStore.select(getProducts);
  }

  increment(): void {
    this.counterStore.dispatch({ type: 'INCREMENT' });
  }

  decrement(): void {
    this.counterStore.dispatch({ type: 'DECREMENT' });
  }

  create(): void {
    this.productStore.dispatch(productCreateAction({
      payload: { name: this.newProduct, id: Math.floor(Math.random() * 1000), selected: false }
    }));
    this.newProduct = '';
  }

  delete(id: any) {
    this.productStore.dispatch(productDeleteAction({ id }));
  }

  ngOnDestroy(): void { }
}
