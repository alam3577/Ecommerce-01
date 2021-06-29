import React, { Component } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { connect } from "react-redux";
import SigninScreen from "./screens/SigninScreen";

interface IState {}

interface IProps {
  count: any;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="grid-container">
            <header className="row">
              <div>
                <NavLink to="/" exact={true} strict className="brand">
                  AshokIT
                </NavLink>
              </div>

              <div>
                <NavLink to="/cart" exact={true} strict>
                  <i className="fa fa-shopping-cart"></i> Cart
                  {this.props.count > 0 ? (
                    <span className="badge-success">{this.props.count}</span>
                  ) : (
                    <span className="badge-empty">0</span>
                  )}
                </NavLink>
                <NavLink to="/signin" exact={true} strict>
                  signin
                </NavLink>
              </div>
            </header>

            <main>
              <Route
                path="/"
                component={HomeScreen}
                exact={true}
                strict
              ></Route>
              <Route
                exact={true}
                strict
                path="/product/:id"
                component={ProductScreen}
              ></Route>
              <Route
                exact={true}
                strict
                path="/cart/:id?"
                component={CartScreen}
              ></Route>
              <Route
                strict
                exact={true}
                path={"/signin"}
                component={SigninScreen}
              ></Route>
            </main>

            <footer className="row center">copyright@ashokit.in</footer>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

// subscription

const recive = (state: any) => {
  return {
    count: state.cart.finalArray.length,
  };
};

// dispatch

const send = (dispatch: any) => {};

export default connect(recive, send)(App);

/*
   1) grid-container
   2) row
   3) center
   4) brand
*/
