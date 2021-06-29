import Cart from "../model/Cart";

export const ADD_ITEM: string = "ADD_ITEM";
export const DELETE_ITEM: string = "DELETE_ITEM";

export interface cartAsync {
  selectedItem: Cart;
  id: any;
}

export interface CartAddItem extends cartAsync {
  type: typeof ADD_ITEM;
}

export interface DeleteItem extends cartAsync {
  type: typeof DELETE_ITEM;
}

export type CartActionTypes = CartAddItem | DeleteItem;
