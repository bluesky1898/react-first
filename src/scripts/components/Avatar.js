import React, {Component, PropTypes} from 'react';

class Avatar extends Component {

  render() {
    return <div className="template-type template-avatar" onClick={this.props.onClick}>
      <div className="inner">
        <img src={this.props.avatar} alt=""/>
        <i>{this.props.name}</i>
      </div>
    </div>
  }
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string
};

Avatar.defaultProps = {
  avatar: '',
  onClick: () => {},
  name: '',
};

export default Avatar;