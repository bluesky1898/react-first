import React, {Component, PropTypes} from 'react';

class Card extends Component {
  render() {
    const {light} = this.props;
    return <div className={"template-type card-template " + (light ? 'card-light-template': '')} onClick={this.props.onClick}>
      <div className="inner">
        <img src={this.props.image} alt=""/>
        <div className="right">
          <h4>{this.props.title}</h4>
          <p>{this.props.summary}</p>
        </div>
      </div>
    </div>
  }
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  onClick: PropTypes.func,
  light: PropTypes.bool
};

Card.defaultProps = {
  image: '',
  title: '',
  summary: '',
  onClick: () => {},
  light: false,
};

export default Card;