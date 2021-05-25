import Product from "../model/Product";

export const PRODUCTS_LOADING: string = "PRODUCTS_LOADING";
export const PRODUCTS_LOADING_SUCCESS: string = "PRODUCTS_LOADING_SUCCESS";
export const PRODUCTS_LOADING_FAIL: string = "PRODUCTS_LOADING_FAIL";

interface ProductAsync {
  loading: boolean;
  products: Product[];
  error: string;
}

interface productsLoading extends ProductAsync {
  type: typeof PRODUCTS_LOADING;
}

interface productsLoadingSuccess extends ProductAsync {
  type: typeof PRODUCTS_LOADING_SUCCESS;
}

interface productsLoadingFail extends ProductAsync {
  type: typeof PRODUCTS_LOADING_FAIL;
}

export type ProductActionTypes =
  | productsLoading
  | productsLoadingSuccess
  | productsLoadingFail;
