import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import BankItems from '../components/BankItems';
import Header from '../components/Header';
import Back from '../../../components/Back';

import {loadUserBankItems,loadBankCodes} from '../actions/UserWithdraw';

class BankCardContainer extends Component {
  
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadUserBankItems());
    dispatch(loadBankCodes());
  }
  
  handleClick(item){
    let bankId = item.id;
    window.location.href = "/#/user/bankdetail/"+ bankId;
  }
  
  render() {

    const {match, userModule, withdraw} = this.props;
    let bankItems = withdraw.get('userBankItems');
    let _this = this;
    let bankCodes = withdraw.get('bankCodes');
    let defaultBank = null;
    if (bankCodes.length) {
      defaultBank = bankCodes[0].bankCnName;  
    }
    
    return (
      <div className="withdraw-page page">
        <div className="inner">
          <Header {...this.props}>
            <Back backTo={"/user"} />
            <h3>绑定银行卡</h3>
          </Header>
          <div className="page-body">
            {bankItems.length <= 0 ? <p className="waring">您还没有绑定银行卡</p>: <BankItems onClick={_this.handleClick} bankLists={bankItems} /> }
          </div>
          
          {bankItems.length < 5 ?
            <Link className="link link-add-bank" to={"/user/withdraw/addbankcard/"+defaultBank}>
            <i className="icon icon-plus"></i>添加新的银行卡</Link>
            : ""
          }
        </div>
      </div>
    );
  }
};



function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule,
    withdraw: userModule.withdraw,
    app
  };
}

export default connect(mapStateToProps)(withRouter(BankCardContainer));