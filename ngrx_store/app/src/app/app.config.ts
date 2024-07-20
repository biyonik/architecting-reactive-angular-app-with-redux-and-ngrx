import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';



const counterReducer = (state = 0, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const productReducer = (state: any[] = [], action: any) => {
  switch (action.type) {
    case 'CREATE_ITEM':
      return [...state, { ...action.payload }]
    default:
      return state
  }
}


const store = provideStore({
  product: productReducer,
  counter: counterReducer
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), store]
};
