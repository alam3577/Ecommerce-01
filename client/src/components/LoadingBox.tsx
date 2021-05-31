import { Component } from "react";

interface IState {}
interface IProps {}

class LoadingBox extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <>
        <i className="fa fa-spinner fa-spin"></i>
      </>
    );
  }
}

export default LoadingBox;
