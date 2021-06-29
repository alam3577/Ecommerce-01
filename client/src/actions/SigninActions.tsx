import axios from "axios";
import { Dispatch } from "redux";
import { SIGNIN, SigninTypes } from "../types/SigninTypes";

const signinAction = (user: any) => {
  return async (dispatch: Dispatch<SigninTypes>) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/users/signin",
        user,
      );
      console.log("this is post", data);
      dispatch({
        type: SIGNIN,
        user_details: data,
      });
    } catch (err: any) {
      console.log(err);
    }
  };
};

export default signinAction;
