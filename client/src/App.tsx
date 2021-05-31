import React, { Component } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

interface IState {}

interface IProps {}

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
                <NavLink to="/" exact={true} strict>
                  cart
                </NavLink>
                <NavLink to="/" exact={true} strict>
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
            </main>

            <footer className="row center">copyright@ashokit.in</footer>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

/*
   1) grid-container
   2) row
   3) center
   4) brand
*/
