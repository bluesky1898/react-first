import React, {Component, PropTypes} from 'react';
import {staticURL} from '../../../utils/url';

class UserBasicInfo extends Component {
  
  renderNoLoginInfo() {
    return (
      <div className="user-basic-info">
        <div className="head-img"><img src={ '../../../misc/images/sport/header-icon.png' } alt="" /></div>
        <div className="head-info">
          <p className="name">未登录</p>
          <p className="money">
            请注册或登录您的帐号
          </p>
        </div>
      </div>
    );
  }

  render() {
    const {user} = this.props;
    let info = user.get('info');
    let userLevel = user.get('userLevel') || {};
    if(!user.get('auth').get('isLogin')) {
      return this.renderNoLoginInfo();
    }
    
    let userMoney = info.userMoney;
    if (info.userMoney) {
      userMoney = new Number(info.userMoney).toFixed(2);
    }
    return (
  		<div className="user-basic-info">
  			<div className="head-img"><img src={staticURL(userLevel.typePicName) } alt="" /></div>
  			<div className="head-info">
  				<p className="name">账号：<span>{info.userName}</span></p>
  				<p className="money">
            余额：<span className="balance">{userMoney}元</span><span className="member">{userLevel.typeName}</span>
          </p>
  			</div>
  		</div>
  	)
  }
};

UserBasicInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserBasicInfo;