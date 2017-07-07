import React, {Component, PropTypes} from 'react';

import t from 'tcomb-form';
import * as validate from '../utils/validate';
import {alert} from '../../../utils/popup';
import FormNotice from '../../../components/FormNotice';

const UserName = t.refinement(t.String, name => {
  return validate.name(name);
});

const Password = t.refinement(t.String, pwd => {
  return validate.password(pwd);
});

const MobileNum = t.refinement(t.String, num => {
  return validate.mobileNum(num);
});

const WithdrawPwd = t.refinement(t.Number, num => {
  return validate.withdrawalPwd(num);
});

const schema = t.struct({
  "userName": UserName,
  "password1": Password,
  "password2": Password,
  "realName": t.String,
  "userMobile": MobileNum,
  'withdrawPwd': WithdrawPwd,
  "userAgent": t.maybe(t.Number),
  'userQq': t.maybe(t.Number)
});

const focus = (event) => {
  let fieldGroup = event.currentTarget.parentNode;
  fieldGroup.className += ' focus';
}

const blur = (event) => {
  let fieldGroup = event.currentTarget.parentNode;
  fieldGroup.className = fieldGroup.className.replace('focus', '');
}

const Form = t.form.Form;
const options = {
  fields: {
    userName: {
      label: '帐',
      attrs: {
        placeholder: '4-12位数字/字母或组合',
        onFocus: focus,
        onBlur: blur,
      },
    },
    password1: {
      label: '密',
      type: 'password',
      attrs: {
        placeholder: '6-12位数字/字母或组合',
        onFocus: focus,
        onBlur: blur
      }
    },
    password2: {
      label: '确认密码',
      type: 'password',
      attrs: {
        placeholder: '再次输入密码',
        onFocus: focus,
        onBlur: blur
      },
    },
    realName: {
      label: '真实姓名',
      attrs: {
        placeholder: '姓名要与绑定的银行开户姓名一致',
        onFocus: focus,
        onBlur: blur
      }
    },
    userMobile: {
      label: '手机号码',
      type: 'number',
      attrs: {
        placeholder: '真实号码，修改帐号资料时用到',
        onFocus: focus,
        onBlur: blur,
        onKeyDown : (event) => {
          let input = event.target;
          var key = event.keyCode || event.charCode;
          if (key == 8 || key == 46) {
            return ;
          }
          if (input.value.trim().length > 10) {
            event.preventDefault();
          }
        }
      },
    },
    userQq: {
      label: 'QQ',
      type: 'number',
      attrs: {
        placeholder: '',
        onFocus: focus,
        onBlur: blur
      },
    }, 
    withdrawPwd: {
      label: '资金密码',
      type: 'password',
      attrs: {
        onKeyDown: (event) => {
          let input = event.target;
          var key = event.keyCode || event.charCode;
          if (key == 8 || key == 46) {
            return ;
          }
          if (input.value.trim().length > 4) {
            event.preventDefault();
          }
        },
        placeholder: '4位数字资金密码',
        onFocus: focus,
        maxLength: 4,
        onBlur: blur
      },
    },
    userAgent: {
      label: '介',
      attrs: {
        placeholder: '默认888',
        onFocus: focus,
        onBlur: blur
      }
    }
  },
};

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.values = {
      userName: '',
      password1: '',
      password2: '',
      userAgent: this.props.agent,
      realName: '',
      userMobile: '',
      userQq: '',
      withdrawPwd: ''
    };
  }
  
  onSubmit() {
    this.props.onRegister(this.values, this.refs.form);
  }

  onChange(value, path) {
    this.values = Object.assign(this.values, value);
    this.props.onChange(value, path, this.refs.form);
  }

  render() {
    return (
      <div className="register-form">
        <div className="form">
          <div className="inner">
            <Form onChange={this.onChange} value={this.values} options={options} type={schema} ref="form"/>
            <div className="tips"><FormNotice msg="register"></FormNotice></div>
            <div className="btn-wrap">
              <button onClick={this.onSubmit} className="btn btn-submit btn-light-blue">立即注册</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

RegisterForm.defaultProps = {
  onRegister: () => {},
  onChange: () => {}
};

RegisterForm.propTypes = {
  onRegister: PropTypes.func,
  onChange: PropTypes.func
};

export default RegisterForm;