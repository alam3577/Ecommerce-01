import { Component } from "react";
import { connect } from "react-redux";
import { match as Match, NavLink } from "react-router-dom";
import getDetails from "../actions/DetailActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { LocationState, History } from "history";

interface IState {
  qty: number;
}

interface IProps {
  match: Match<paramRoutes>;
  getDetilsById: any;
  res: any;
  history: History<LocationState>;
}

interface paramRoutes {
  id: any;
}

class ProductScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      qty: 1,
    };
  }

  setQty = (num: any) => {
    this.setState({
      qty: num,
    });
  };

  addToCart = (id: any) => {
    this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
  };

  componentDidMount() {
    this.props.getDetilsById(this.props.match.params.id);
  }
  render() {
    const { loading, product, error } = this.props.res;
    return (
      <>
        {!loading ? (
          <LoadingBox></LoadingBox>
        ) : error === "Network Error" ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <NavLink to="/">
              <i className="fa fa-home"></i>
            </NavLink>
            <div className="row top">
              <div className="col-2">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h2>{product.name}</h2>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </li>
                  <li>Rs {product.price}</li>
                  <li>{product.description}</li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div>Rs {product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Availability</div>
                        <div>
                          {product.countInStock > 0 ? (
                            <span className="success">Stock Available</span>
                          ) : (
                            <span className="error">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>QTY</div>
                            {/* Dropdown */}
                            <div>
                              <select
                                value={this.state.qty}
                                onChange={(e: any) =>
                                  this.setQty(e.target.value)
                                }
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x: any) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ),
                                )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            className="primary block"
                            onClick={() => {
                              this.addToCart(product._id);
                            }}
                          >
                            Add to Cart
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1>{this.props.match.params.id}</h1>
      </>
    );
  }
}

const receive = (state: any) => {
  return {
    res: state.details,
  };
};

const send = (dispatch: any) => {
  return {
    getDetilsById: (id: any) => {
      dispatch(getDetails(id));
    },
  };
};

export default connect(receive, send)(ProductScreen);
