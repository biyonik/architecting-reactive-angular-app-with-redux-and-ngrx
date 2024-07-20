export interface ProductModel {
  id: number | string;
  name: string;
  selected: boolean
}


export interface AppState {

}

export interface ProductState extends AppState {
  products: ProductModel[]
}

export interface CounterState extends AppState {
  counter: number
}
