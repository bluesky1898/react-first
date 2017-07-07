import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LoadingComponent from '../../../components/LoadingComponent';

import Header from '../components/Header';
import Back from '../../../components/Back';
import UserDetailInfo from '../components/UserDetailInfo';
import UserSecurityInfo from '../components/UserSecurityInfo';
import BankInfo from '../components/BankInfo';
import {loadUserInfo,changeUserBasicInfo} from '../actions/User';
import {alert,message} from '../../../utils/popup';
import {loadUserBankItems} from '../actions/UserWithdraw';
import {RES_OK_CODE} from '../../../constants/AppConstant';

class UserInfoContainer extends LoadingComponent {
  
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(loadUserBankItems());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }
  
  handleModify(qq,email){
    const {dispatch,history} = this.props;
    dispatch(changeUserBasicInfo(qq, email,function(data) {
      if(data.errorCode == RES_OK_CODE){
        if (data.msg) {
          alert(data.msg);
          setTimeout(function(){
            history.goBack();
          },1800)
        } else {
          history.goBack();
        }
      }else{
        alert(data.msg);
      }
    }));
  }

  render() {

    return (
      <div className="user-info-page page">
        <div className="inner">
          <Header {...this.props}>
            <Back backTo={'/user'}/>
            <h3>会员资料</h3>
          </Header>
          <div className="page-body">
            <UserDetailInfo onChange={this.handleModify.bind(this)} user={this.props.userModule.user} />
            
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  const {app, userModule} = state;
  return {
    app, userModule
  };
}

export default connect(mapStateToProps)(UserInfoContainer);