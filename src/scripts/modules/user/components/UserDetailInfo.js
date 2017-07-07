import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeUserBasicInfo} from '../actions/User';
import {alert} from '../../../utils/popup';
class UserDetailInfo extends Component {  
  constructor(props){
    super(props);
    this.onChange = this.props.onChange;
    this.setUserInfoState(props);
  }

  setUserInfoState(props){
    const {user} = props;
    this.state = {
      qq : user.get('info').userQq,
      email : user.get('info').userMail
    };
  }
 
  modify(){
    const {user} = this.props;
    let qq = this.state.qq;
    let email = this.state.email;
    if (!qq && !email) {
      alert("请输入需要修改的资料");
      return ;
    }
    if(email && !email.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)){
      alert("请输入正确的邮箱地址");
      return ;
    }
    if(qq && !qq.match(/[0-9]{5,12}/)){
      alert("请输入正确的QQ号码");
      return ;
    }
    let args = [];
    let qqChanged = false;
    let emailChanged = false;
    if (qq != user.get('info').userQq) {
      qqChanged = true;
      args.push(qq);
    } else {
      args.push(null);
    }
    if (email != user.get('info').userMail) {
      emailChanged = true;
      args.push(email);
    } else {
      args.push(null);
    }
    this.onChange.apply(this, args);
  }
  componentWillReceiveProps(nextProps) {
    this.setUserInfoState(nextProps);
  }

  render() {
    const {user} = this.props;
    let money = user.get('info').userMoney;
    console.log(user.get('info'));
    let _this = this;
    
    if(!money){
      money = 0;
    }
    money = money.toFixed(2);
    return (
      <div className="user-detail-info">
        <div className="inner">
          
          <ul className="clearfix">
            <li><span className="label">用&nbsp; 户&nbsp;名:</span><span className="cont">{user.get('info').userName}</span></li>
            <li><span className="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span><span className="cont">{user.get('info').userRealName}</span></li>
            <li><span className="label">余&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额:</span><span className="cont">{money}</span></li>
            <li><span className="label">会员等级:</span><span className="cont">{user.get('userLevel').typeName}</span></li>
          </ul>
        
          <ul className="clearfix info-item">
            <li><a href="#/modifyphone"><span className="label">手机号码:</span><span className="cont cont-mobile">{user.get('info').userMobile}</span><i className="arrow-icon"></i></a></li>
            <li><span className="label">QQ&nbsp;号&nbsp;码:</span><span className="cont"><input onChange={() =>　{_this.setState({qq: _this.refs.qq.value})} } value={this.state.qq} type="number" ref="qq" placeholder={user.get('info').userQq} /></span></li>
            <li><span className="label">电子邮箱:</span><span className="cont"><input onChange={ () => {_this.setState({email: _this.refs.email.value})} } value={this.state.email} ref="email" type="text" placeholder={user.get('info').userMail} /></span></li>
          </ul>

          <div className="btn-wrap-info"><div className="btn" onClick={ this.modify.bind(this) }>确认修改</div></div>
          
        </div>
      </div>
    );
  }
};

UserDetailInfo.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {app, userModule} = state;
  return {
    app, userModule
  };
}
export default connect(mapStateToProps)(UserDetailInfo);