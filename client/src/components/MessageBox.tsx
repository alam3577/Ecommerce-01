import { Component } from "react";

interface IState {}
interface IProps {
  variant: string; //variant ===> success danger info warning ......
}

class MessageBox extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={`alert alert-${this.props.variant} || info`}>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default MessageBox;

/*
  css classes we need to prepare

  1) alert    

  2) alert-success  3) alert-info  4) alert-danger  5) alert-warning
*/
