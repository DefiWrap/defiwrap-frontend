import React from 'react';
import Context from './context';

export default class GlobalState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePositionList: "" };
  }

  setactivePositionList = (data) => {
    this.setState({
      activePositionList: data,
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          setactivePositionList: this.setactivePositionList,
          activePositionList: this.state.activePositionList,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
