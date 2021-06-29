import Cart from "../model/Cart";
import {
  ADD_ITEM,
  CartActionTypes,
  DELETE_ITEM,
} from "../types/CartActionTypes";

interface IState {
  finalArray: Cart[];
}

const initialState: IState = {
  finalArray: window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart") || "{}")
    : [],
};

const CartReducer = (state = initialState, action: CartActionTypes): IState => {
  switch (action.type) {
    case ADD_ITEM:
      //
      // New Item
      const item = action.selectedItem;
      console.log("This is item ", item);

      // if (item._id === "" || item.qty === 0) {
      //   return { ...state };
      // }
      //   this shirt 1 i wanted to compare with array (final array)
      const existedItem = state.finalArray.find((obj) => {
        return obj._id === item._id;
      });
      console.log("This is existed Item", existedItem);

      if (existedItem) {
        //    if it is a dublicated array then we need to replace with new item
        return {
          ...state,
          finalArray: state.finalArray.map((element) => {
            return element._id === item._id ? item : element;
          }),
        };
      } else {
        // if new item (add it to the array)
        return {
          ...state,
          finalArray: [...state.finalArray, item],
        };
      }
      break;

    case DELETE_ITEM:
      const id = action.id;

      return {
        ...state,
        finalArray: state.finalArray.filter((elem) => {
          return elem._id !== id;
        }),
      };
      break;

    default:
      return state;
  }
};

export default CartReducer;
