import React, {Component, PropTypes} from 'react';
import {withRouter, Link, BrowserHistory} from 'react-router-dom';

class Back extends Component {
  
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    const {history, backTo} = this.props;
    if (backTo) {
      history.replace(backTo);
    } else {
      history.goBack();
    }
  }

  render() {
    return (
      <a onClick={this.goBack} />
    );
  }
};

Back.propTypes = {
  backTo: PropTypes.string
};

export default withRouter(Back);