import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import Header from '../components/Header';
import Back from '../../../components/Back';
import BankInfo from '../components/BankInfo';
import WithdrawForm from '../components/WithdrawForm';
import {alert} from '../../../utils/popup';

import {RES_OK_CODE} from '../../../constants/AppConstant';
import LoadingComponent from '../../../components/LoadingComponent';

import {loadUserBankItems, userWithdraw} from '../actions/UserWithdraw';

class WithdrawFormContainer extends LoadingComponent {

  constructor(props) {
    super(props);
    this.onUserWithdrawSubmit = this.onUserWithdrawSubmit.bind(this);
    this.onProcess = false;
  }
  
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadUserBankItems());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  onUserWithdrawSubmit(values) {
    if (this.onProcess) {
      return ;
    }
    let count = values.count*1;
    if (isNaN(count)) {
      alert('提款金额必须为数字');
    } else if (values.count*1 < 100 ) {
      alert('提款金额必须100元以上');
    } else if (isNaN(values.withdrawpwd*1) || values.withdrawpwd.length < 4   ){
      alert('请输入取款密码(4位数字)');
    } else {
      const {dispatch, match, history} = this.props;
      this.openLoading();
      let _this = this;
      this.onProcess = true;
      dispatch(userWithdraw(values.count, values.withdrawpwd, match.params.bank, (data) => {
        _this.onProcess = false;
        this.closeLoading();
        alert(data.msg, function (popup) {
          popup.close();
          if (data.errorCode == RES_OK_CODE) {
            history.push('/user');
          }
        });
      }));
    }
  }

  render() {
    const {match, withdraw, userModule} = this.props;
    let bankId = match.params.bank;
    let userBankItem = withdraw.get('userBankItems').filter( item => item.id == bankId)[0];
    if (!userBankItem) {
      return null; 
    } else {
      let money = userModule.user.get('info').userMoney;
      money = money.toFixed(2);
      return (
        <div className="withdraw-form-page page">
          <div className="inner">
              <Header {...this.props}>
                <Back />
                <h3>提现</h3>
              </Header>
              <div className="page-body">
                <BankInfo bank={userBankItem}/>
                
                <WithdrawForm onWithdraw={this.onUserWithdrawSubmit}/>
              </div>
          </div>
        </div>);
    }
  }
};

WithdrawFormContainer.propTypes = {
  
};

function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule, app, withdraw: userModule.withdraw
  };
}

export default connect(mapStateToProps)(withRouter(WithdrawFormContainer));