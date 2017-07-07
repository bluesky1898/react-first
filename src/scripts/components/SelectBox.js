import React, {Component, PropTypes} from 'react';


class SelectBox extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.state.value = this.props.value;
  }

  onSelect() {
    this.setState({
      value: this.refs.selectbox.value
    }); 
    this.props.onChange(this.refs.selectbox.value);
  }

  renderSelectText()  {
    let value = this.state.value;
    let {options, placeholder} = this.props;

    if (value == '' && options.length) {
      if (placeholder) {
        return placeholder;
      }
      value = options[0].value; // 默认第一个
    };

    for (let option of options) {
      if (option.value == value) {
        return option.text;
      }
    }
  }

  onClick(){
    let clickEvent = this.props.onClick;
    if(clickEvent){
      clickEvent();
    }
  }

  render() {
    let options = this.props.options;
    let clickEvent = this.props.onClick;

    return (
      <div className="selectbox" onClick={this.onClick}>
        <div className="sbwrap">
          <span className={"cont " +  (this.state.value ? '': 'placeholder')}>
            {this.renderSelectText()}
            {!clickEvent &&  <select ref="selectbox" onChange={this.onSelect}>
              {options.map( (option) => <option key={option.value} value={option.value}>{option.text}</option> ) }
            </select>}
          </span>
        </div>
      </div>
    );
  }
};

SelectBox.defaultTypes = {
  onChange: () => {},
  options: [],
  placeholder: ''
};

SelectBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick : PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string
};

export default SelectBox;