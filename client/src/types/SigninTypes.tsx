import Signin from "../model/Signin";

export const SIGNIN: string = "SIGNIN";

export interface signinAsync {
  user_details: Signin;
}

export interface SignIn extends signinAsync {
  type: typeof SIGNIN;
}

export type SigninTypes = SignIn;
