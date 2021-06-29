import Signin from "../model/Signin";
import { SIGNIN, SigninTypes } from "../types/SigninTypes";

interface IState {
  user_details: Signin;
}

const initialState: IState = {
  user_details: { _id: "", isAdmin: false, token: "", image: "", email: "" },
};

export const SigninReducer = (
  state = initialState,
  action: SigninTypes,
): IState => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        user_details: action.user_details,
      };
    default:
      return state;
  }
};
