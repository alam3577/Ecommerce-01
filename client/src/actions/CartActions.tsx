import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ITEM,
  CartActionTypes,
  DELETE_ITEM,
} from "../types/CartActionTypes";

export const deleteCartItem = (id: any) => {
  return (dispatch: Dispatch<CartActionTypes>) => {
    dispatch({
      type: DELETE_ITEM,
      id: id,
      selectedItem: {
        _id: "",
        brand: "",
        countInStock: 0,
        description: "",
        image: "",
        name: "",
        numReviews: 0,
        price: 0,
        rating: 0,
      },
    });
  };
};

const addCartItem = (id: string, qty: number) => {
  return async (dispatch: Dispatch<CartActionTypes>, getState: () => any) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/products/${id}`,
    );
    data["qty"] = qty;
    try {
      dispatch({
        type: ADD_ITEM,
        selectedItem: data,
        id: "",
      });
      //   access the state and add it to the local storage
      //   to access the state here we have one predefined function getState
      console.log("This is getstate", getState());

      window.localStorage.setItem(
        "cart",
        JSON.stringify(getState().cart.finalArray),
      );
    } catch (err) {
      dispatch({
        type: ADD_ITEM,
        id: "",
        selectedItem: {
          _id: "",
          brand: "",
          countInStock: 0,
          description: "",
          image: "",
          name: "",
          numReviews: 0,
          price: 0,
          rating: 0,
        },
      });
      window.localStorage.setItem(
        "cart",
        JSON.stringify(getState().cart.finalArray),
      );
    }
  };
};

export default addCartItem;
