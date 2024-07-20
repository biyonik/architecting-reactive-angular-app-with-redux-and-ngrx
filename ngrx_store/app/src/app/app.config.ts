import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { createAction, createFeatureSelector, createReducer, createSelector, on, props, provideStore } from '@ngrx/store';
import { ProductModel, ProductState } from './app.state';

// Action Types
enum ProductActionTypes {
  Create = '[Product] Create',
  Delete = '[Product] Delete',
  Select = '[Product] Select'
}

// Create Actions
export const productCreateAction = createAction(ProductActionTypes.Create, props<{ payload: ProductModel }>());

export const productDeleteAction = createAction(ProductActionTypes.Delete, props<{ id: any }>());

export const productSelectAction = createAction(ProductActionTypes.Select, props<{ id: any }>());

// Initial State
const productInitialState: ProductState = {
  products: []
}

// Reducer Items

const productCreateReducerItem = on(
  productCreateAction,
  (state: ProductState, { payload }): ProductState => {
    return {
      ...state,
      products: [...state.products, payload]
    }
  }
)


const productDeleteReducerItem = on(
  productDeleteAction,
  (state: ProductState, { id }): ProductState => {
    return {
      ...state,
      products: state.products.filter((item: any) => item.id !== id)
    }
  }
)


const productSelectReducerItem = on(
  productSelectAction,
  (state: ProductState, { id }): ProductState => {
    return {
      ...state,
      products: state.products.map((item: any) => item.id === id ? { ...item, selected: !item.selected } : item)
    }
  }
)

// Reducers
const productReducer = createReducer<ProductState>(productInitialState, productCreateReducerItem, productDeleteReducerItem, productSelectReducerItem);


// Selectors
const getProductState = createFeatureSelector<ProductState>('products');
export const getProducts = createSelector(getProductState, (state: ProductState) => state.products);

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

// const productReducer = (state: any[] = [], action: any) => {
//   switch (action.type) {
//     case 'CREATE_ITEM':
//       return [...state, { ...action.payload }]
//     case 'DELETE_ITEM':
//       return state.filter((item: any) => item.id !== action.payload)
//     case 'SELECT_ITEM':
//       return state.map((item: any) => item.id === action.payload ? { ...item, selected: !item.selected } : item)
//     default:
//       return state
//   }
// }


const store = provideStore({
  products: productReducer,
  counter: counterReducer
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), store]
};
