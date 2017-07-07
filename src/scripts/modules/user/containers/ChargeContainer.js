import React, {Component, PropTypes} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ChargeQuick from '../components/ChargeQuick';
import ChargeCompany from '../components/ChargeCompany';
import Header from '../components/Header';
import Back from '../../../components/Back';

import { loadChargePaymentItems } from '../actions/Charge'; 

import LoadingComponent from '../../../components/LoadingComponent';

class ChargeContainer extends LoadingComponent {
    
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadChargePaymentItems());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  render() {
    const {params} = this.props.match;

    let chargeComponent = <ChargeCompany {...this.props} /> 
    if (params.type == 'quick') {
      	chargeComponent = <ChargeQuick {...this.props} /> 
    }

    return (
      <div className="page page-charge">
        <Header {...this.props}>
          <Back backTo={'/user'}/>
          <h3>充值</h3>
        </Header>
        <div className="page-body" style={ {minHeight: window.outerHeight + 'px', backgroundColor: '#eee'} }>
          <div className="inner">
            {chargeComponent}
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  const {app, userModule} = state;
  return {
    app,
    userModule,
    charge: userModule.charge
  };
}

export default connect(mapStateToProps)(withRouter(ChargeContainer));