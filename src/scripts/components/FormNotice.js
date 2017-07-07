import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class FormNotice extends Component {

  render() {
    const {formNotice} = this.props;
    let msg = formNotice[this.props.msg];
    if (!msg) return null;
    return <div className={"form-notice " + this.props.className}>
      <div dangerouslySetInnerHTML={{__html: formNotice[this.props.msg]}}></div>
    </div>
  }
}

FormNotice.propTypes = {
  msg: PropTypes.string
};

FormNotice.defaultProps = {
  className: ''
};

function mapStateToProps(state) {
  const {app} = state;
  return {
    formNotice: app.get('formNotice')
  }
}

export default connect(mapStateToProps)(FormNotice);