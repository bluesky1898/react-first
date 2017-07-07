import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import {Link} from "react-router-dom";
 
import Back from '../../../components/Back';
import TopBar from '../../../components/TopBar';
import FooterMenu from '../../../components/FooterMenu';

import RegisterForm from '../components/RegisterForm';
import * as validate from '../utils/validate';
import {parseQuery} from '../../../utils/url';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import {alert} from '../../../utils/popup';
import LoadingComponent from '../../../components/LoadingComponent';

import {userRegister} from '../actions/User';
import RegisterBrick from '../../../components/ToyBrick';
import {loadDynamicBrick} from '../../../actions/AppAction';

const REGION = 'register';

class RegisterContainer extends LoadingComponent {

  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.checkChoice = this.checkChoice.bind(this);
    this.registerProcess = false;
    this.form = null;

    this.state = {
      allowRule: true,
      checked: true
    };
    this.search = parseQuery(window.location.search);

  }

  componentDidMount() {
    
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadDynamicBrick(REGION));
  }
  
  onErrorAndFocus(values ,form, reset = false) {
    let validateResult = form.validate();
    let formElement = ReactDOM.findDOMNode(form);
    // 先重置所有的状态
    let inputs = formElement.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('error');
    }
    
    if (!reset) {
      for (let struct of validateResult.errors ) {
        let input = ReactDOM.findDOMNode(form.getComponent(struct.path));
        input = input.getElementsByTagName('input')[0];
        //input.focus();
        input.classList.add('error');
        break;
      }
    }
  }

  onFormChange(values, path, form) {
    this.onErrorAndFocus(values, form, true);
  }
  
  onRegister(values, form) {
    let that = this;
    if (this.registerProcess) {
      return ;
    }
    if (values.userName.trim() == '') {
      alert('请输入帐号');
      this.onErrorAndFocus(values, form);
    } else if (validate.name(values.userName) == false) {
      alert('帐号格式错误. 请输入4-10个字母或数字的组合');
      this.onErrorAndFocus(values, form);
    } else if (values.password1 == '') {
      alert('请输入密码');
      this.onErrorAndFocus(values, form);
    } else if (validate.password(values.password1)  == false ) {
      alert('密码格式错误. 须为6~12位的英文或数字的组合');
      this.onErrorAndFocus(values, form);
    }  else if (values.password2 == '') {
      alert('请输入确认密码');
      this.onErrorAndFocus(values, form);
    } else if (values.password2 != values.password1) {
      alert('两次输入密码不一致');
    } else if (values.realName == '') {
      alert('请输入真实姓名');
      this.onErrorAndFocus(values, form);
    } else if (values.userMobile == '') {
      alert('请输入电话号码');
      this.onErrorAndFocus(values, form);
    } else if (validate.mobileNum(values.userMobile) == false ) {
      alert('手机号码输入不正确');
      this.onErrorAndFocus(values, form);
    } else if (values.withdrawPwd == '') {
      alert('请输入取款密码');
      this.onErrorAndFocus(values, form);
    } else if (validate.withdrawalPwd(values.withdrawPwd) == false ) {
      alert('取款密码格式错误. 提款认证必须是4位数字密码，请谨记');
      this.onErrorAndFocus(values, form);
    } else if (this.refs.agreement.checked == false) {
      alert('注册前请选择同意用户协议');
      this.onErrorAndFocus(values, form);
    } else {
      const {dispatch, history} = this.props;
      this.registerProcess = true;
      let _this = this;
      _this.openLoading();
      dispatch(userRegister(values, (data) => {
        _this.registerProcess = false;
        _this.closeLoading();
        if (data.errorCode == RES_OK_CODE) {
          alert('注册成功',"注册成功",function(){
            _this.closeLoading();
            history.push('/login');
          });
        } else {
          alert(data.msg);
        }
      }));
    }
  }
  checkChoice(){
    this.setState({
      status : !this.state.status
    })
  }
  render() {
    const {dispatch, history, registerBrick, userModule } = this.props;
    let isLogin = false;
    let _this = this;

    return (
      <div className="register-page page">
        <TopBar>
          <Back />
          <h3>用户注册</h3>
        </TopBar>
        <div className="page-body">

          <RegisterBrick region={REGION} dispatch={dispatch} history={history} isLogin={isLogin} brick={registerBrick} />
          
          <RegisterForm agent={this.search.p} onChange={this.onFormChange} onRegister={this.onRegister}/>
          <div className="alegan-wrap">

            <input type="checkbox" defaultChecked={this.state.allowRule} ref="agreement" id="agreement" /><label htmlFor="agreement">
            <Link to={"/user/protocol"}>同意用户注册协议</Link></label>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  const {userModule, brick} = state;
  return {
    userModule,
    registerBrick: brick.get(REGION)
  };
}

export default connect(mapStateToProps)(RegisterContainer);
