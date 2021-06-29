import React, { Component } from "react";
import { match as Match, NavLink } from "react-router-dom";
import { Location } from "history";
import { connect } from "react-redux";
import addCartItem from "../actions/CartActions";
import { deleteCartItem } from "../actions/CartActions";
import MessageBox from "../components/MessageBox";

interface IState {}

interface IProps {
  match: Match<routeParams>;
  location: Location;
  res: any;
  getAddItemResult: any;
  removeItemFromCart: any;
}

interface routeParams {
  id: any;
}

class CartScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    //this.props.location.search?(Number(this.props.location.search.split("=")[1])):1

    this.props.getAddItemResult(
      this.props.match.params.id,
      this.props.location.search
        ? Number(this.props.location.search.split("=")[1])
        : 1,
    );
  }

  deleteItem = (id: any) => {
    this.props.removeItemFromCart(id);
  };

  myFun = (id: any, qty: any) => {
    this.props.getAddItemResult(id, Number(qty));
  };

  render() {
    const { finalArray } = this.props.res;
    return (
      <React.Fragment>
        <div className="row top">
          <div className="col-2">
            <h1> Shopping Cart </h1>
            {finalArray.length === 0 ? (
              <MessageBox variant="danger">
                Cart is Empty.{" "}
                <NavLink to="/" exact={true} strict>
                  Start Shopping
                </NavLink>
              </MessageBox>
            ) : (
              <div>
                <ul>
                  {finalArray.map((item: any, index: number) => (
                    <li key={index}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={alert.name}
                            className="small"
                          ></img>
                        </div>

                        <div>
                          <NavLink
                            to={`/product/${item._id}`}
                            exact={true}
                            strict
                          >
                            <span style={{ color: "blue" }}>{item.name}</span>
                          </NavLink>
                        </div>

                        <div>
                          <select
                            value={item.qty}
                            onChange={(e: any) =>
                              this.myFun(item._id, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (x: any) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </select>
                        </div>

                        <div>$ {item.price * item.qty}</div>

                        <div>
                          {/* <button onClick={()=>this.deleteItem(item._id)}>Delete</button> */}
                          <i
                            className="fa fa-trash"
                            style={{
                              cursor: "pointer",
                              color: "#0000ff",
                              fontSize: "2rem",
                            }}
                            onClick={() => this.deleteItem(item._id)}
                          ></i>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div>
                    <h2>
                      Total Number of ({" "}
                      {finalArray.reduce(
                        (totalItem: any, arg2: any) => totalItem + arg2.qty,
                        0,
                      )}{" "}
                      ) Items
                    </h2>
                  </div>
                  <div>
                    <h2> 
                      Grand Total{" "}
                      {finalArray.reduce(
                        (totalprice: any, arg2: any) =>
                          totalprice + arg2.qty * arg2.price,
                        0,
                      )}{" "}
                    </h2>
                  </div>
                </li>
                <li>
                  <button className="primary block">Proceed to pay</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const receive = (state: any) => {
  return {
    res: state.cart,
  };
};

const send = (dispatch: any) => {
  return {
    getAddItemResult: (id: string, qty: number) => {
      dispatch(addCartItem(id, qty));
    },
    removeItemFromCart: (id: any) => {
      dispatch(deleteCartItem(id));
    },
  };
};

export default connect(receive, send)(CartScreen);
