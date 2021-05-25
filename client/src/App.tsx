import React, { Component } from "react";
import { connect } from "react-redux";
import getProducts from "./actions/ProductAction";
import "./App.css";

interface IState {}
interface IProps {
  response: any;
  my_fun: any;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.props.my_fun();
  }

  render() {
    const { products } = this.props.response;
    return (
      <>
        <h2>Products aa</h2>
        {console.log(typeof products)}
        <h4>{JSON.stringify(products)}</h4>
        <div className="main">
          {products.map((element: any, index: any) => (
            <div className="card">
              <img src={element.image} alt="" />

              <div className="card__info">
                <div className="card__name__price">
                  <h3>{element.name}</h3>
                  <h2>{element.price}</h2>
                </div>
                <div className="card__discription">
                  <p>{element.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* {products.map((elements, index) => {
          
        })} */}
      </>
    );
  }
}

// subscription
const recive = (state: any) => {
  console.log(state);
  return {
    response: state,
  };
};
const send = (dispatch: any) => {
  return {
    my_fun: () => {
      dispatch(getProducts());
    },
  };
};
export default connect(recive, send)(App);
