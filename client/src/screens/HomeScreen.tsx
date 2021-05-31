import React, { Component } from "react";
import { connect } from "react-redux";
import getProducts from "../actions/ProductAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Products from "../components/Products";
// import "./HomeScreen.css";

interface IState {}
interface IProps {
  response: any;
  my_fun: any;
}

class HomeScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.props.my_fun();
  }

  render() {
    const { loading, products, error } = this.props.response;
    return (
      <>
        {!loading ? (
          <LoadingBox></LoadingBox>
        ) : error === "Network Error" ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Products arr={products}></Products>
        )}
      </>
    );
  }
}

// subscription
const recive = (state: any) => {
  console.log(state);
  return {
    response: state.products,
  };
};
const send = (dispatch: any) => {
  return {
    my_fun: () => {
      dispatch(getProducts());
    },
  };
};
export default connect(recive, send)(HomeScreen);
