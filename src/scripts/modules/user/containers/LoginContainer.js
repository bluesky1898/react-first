import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import LoginForm from '../components/LoginForm';
import TopBar from '../../../components/TopBar';
import Back from '../../../components/Back';
import {alert} from '../../../utils/popup';
import {userLogin} from '../actions/User';
import {withRouter} from 'react-router-dom';

import LoginBrick from '../../../components/ToyBrick';
import {loadDynamicBrick} from '../../../actions/AppAction';

const REGION = 'login';

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.loginProcess = false;
    this.state = {
      imageCodeTime: new Date().getTime()
    };
  }
  
  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(loadDynamicBrick(REGION));
  }

  componentDidMount() {
    const user = this.props.userModule.user;
    const history = this.context.router.history;
    if (user.get("auth").get("isLogin")) {
      history.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.userModule.user;
    const {history} = this.props;
    if (user.get("auth").get("isLogin")) {
      history.push('/');
    }
  }

  onLogin(values) {
    if (this.loginProcess) {
      return ;
    }
    if (values.username == '') {
      alert('请输入用户名');
    } else if ( values.password == '') {
      alert('请输入密码');
    } else if ( values.password.length < 6 || values.password.length > 16) {
      alert('请输入正确的密码');
    }else if (values.code == '') {
      alert('请输入验证码');
    } else if (values.code.length !== 4 ) {
      alert('验证码不正确');  
      this.setState({
        imageCodeTime: new Date().getTime()
      }); 
      return false; 
    } else {
      const {dispatch} = this.props;
      this.loginProcess = true;
      let _this = this;
      dispatch(userLogin(values.username, values.password, values.code, (ok, msg = '') => {
        _this.loginProcess = false;
        if (ok) {
          //alert('登录成功');
        } else {
          alert(msg);
          _this.setState({
            imageCodeTime: new Date().getTime()
          });
        }
      }));
    }
  }

  render() {
    const user = this.props.userModule.user;
    const {dispatch, history, loginBrick } = this.props;
    let isLogin = user.get('auth').get('isLogin');

    if (user.get("auth").get("isLogin")) {
      return null;
    } else {
      return (
        <div className="login-page">
          <TopBar>
            <Back />
            <h3>用户登录</h3>
          </TopBar>
          <div className="page-body">
          
            <LoginBrick region={REGION} dispatch={dispatch} history={history} isLogin={isLogin} brick={loginBrick} />

            <div className="login-form">
              <LoginForm imageCodeState={this.state.imageCodeTime} {...this.props} onLogin={this.onLogin}/>
            </div>
          </div>
        </div>
      );
    }

  }
};

LoginContainer.propTypes = {
  userModule: PropTypes.object.isRequired
};

LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {userModule, brick} = state;
  return {
    userModule,
    loginBrick: brick.get(REGION)
  };
}

export default connect(mapStateToProps)(withRouter(LoginContainer));