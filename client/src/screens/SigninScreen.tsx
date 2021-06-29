import React, { Component } from "react";
import { connect } from "react-redux";
import signinAction from "../actions/SigninActions";

import "./SigninScreen.css";

interface IState {}
interface IProps {
  login_Fn: any;
  res: any;
}
class SigninScreen extends Component<IProps, IState> {
  u_email = React.createRef<HTMLInputElement>();
  u_pwd = React.createRef<HTMLInputElement>();

  constructor(props: IProps) {
    super(props);
  }

  login = (e: any) => {
    e.preventDefault();
    this.props.login_Fn({
      email: this.u_email.current?.value,
      password: this.u_pwd.current?.value,
    });
  };
  render() {
    return (
      <>
        <h4>This is a signin screen</h4>
        <div className="main__container">
          <form onSubmit={this.login}>
            <div className="input">
              <label>Email</label>
              <input type="email" ref={this.u_email} name="email" />
            </div>
            <div className="input">
              <label>password</label>
              <input type="password" ref={this.u_pwd} name="password" />
            </div>
            <div className="input">
              <button type="submit">Signin</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const receive = (state: any) => {
  return {
    res: state.signin,
  };
};

const send = (dispatch: any) => {
  return {
    login_Fn: (obj: any) => {
      dispatch(signinAction(obj));
    },
  };
};

export default connect(receive, send)(SigninScreen);
