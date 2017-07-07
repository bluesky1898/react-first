import React, {Component, PropTypes} from 'react';

import {codeUrl} from '../../../utils/url';

class ImageCode extends Component {
  
  
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      time: new Date().getTime()
    };
  }

  onRefresh(event) {
    this.setState({
      time: new Date().getTime()
    });
  }

  render() {
    return (
      <div className="image-code">
        <img src={codeUrl() + '?t=' + this.props.imageCodeState} onClick={this.onRefresh} />
      </div>
    );
  }
};

export default ImageCode;