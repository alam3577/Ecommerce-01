import Product from "../model/Product";

export const DETAILS_LOADING: string = "DETAILS_LOADING";
export const DETAILS_LOADING_SUCCESS: string = "DETAILS_LOADING_SUCCESS";
export const DETAILS_LOADING_FAIL: string = "DETAILS_LOADING_FAIL";

interface DetailsAsync {
  loading: boolean;
  product: Product;
  error: string;
}

interface DetailsLoading extends DetailsAsync {
  type: typeof DETAILS_LOADING;
}

interface DetailsLoadingSuccess extends DetailsAsync {
  type: typeof DETAILS_LOADING_SUCCESS;
}

interface DetailsLoadingFail extends DetailsAsync {
  type: typeof DETAILS_LOADING_FAIL;
}

export type DetailsLoadingAction =
  | DetailsLoading
  | DetailsLoadingSuccess
  | DetailsLoadingFail;
