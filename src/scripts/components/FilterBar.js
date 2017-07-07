import React, {Component, PropTypes} from 'react';

class FilterBar extends Component {

  constructor(props) {
    super(props);
    let options = this.props.options;
    let crtoption = Object.keys(options)[0];
    if (this.props.defaultValue) {
      crtoption = this.props.defaultValue;
    }
    this.state = {
      crtoption,
      viewfilters: false
    };
    this.onFilterToggle = this.onFilterToggle.bind(this);
  }

  getCrtOptionLabel() {
    let options = this.props.options;
    return options[this.state.crtoption];
  }
  
  onOptionItemClicked(key) {
    this.setState({
      crtoption: key
    });
    const {onChange} = this.props;
    onChange(key);
  }

  renderFilterOption(options) {
    let html = [];
    for (let key in options) {
      let value = options[key];
      html.push(<div key={key} className="filter-item" onClick={this.onOptionItemClicked.bind(this, key)}>{value}</div>);
    }
    return html;
  }

  componentWillReceiveProps(nextProps) {
    let options = nextProps.options;
    let crtoption = nextProps.defaultValue;
    if (crtoption) {
      this.state.crtoption = crtoption;
    } else if (!this.state.crtoption) {
      this.state.crtoption = Object.keys(options)[0];
    }
  }

  onFilterToggle() {
    this.setState({
      viewfilters: !this.state.viewfilters
    });
    this.props.onClick();
  }

  render() {
    const {options} = this.props;
    return (
      <div className="filter-bar" onClick={this.onFilterToggle}>
        <div className={"inner " + ( this.state.viewfilters ? 'viewme': '' ) }>
          <span>{this.getCrtOptionLabel()}</span>
          <div className={"filters " + (this.state.viewfilters ? '': 'hideme') }>
            {this.renderFilterOption(options)}
          </div>
        </div>
      </div>
    );
  }
};

FilterBar.defaultProps = {
  onChange: () => {},
  onClick: () => {}
};

FilterBar.propTypes = {
  options: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default FilterBar;

