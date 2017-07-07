import React, {Component, PropTypes} from 'react';

class PosterImg extends Component {
  render() {
    return <div onClick={this.props.onClick} className="template-type template-poster">
      <div className="inner">
        <img src={this.props.image} alt=""/>
      </div>
    </div>;
  }
};

PosterImg.propTypes = {
  image: PropTypes.string,
  onClick: PropTypes.func,
};

PosterImg.defaultProps = {
  image: '',
  onClick: () => {},
};

export default PosterImg