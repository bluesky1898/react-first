import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Header from '../components/Header';
import UserBasicInfo from '../components/UserBasicInfo';
import UserPanel from '../components/UserPanel';
import Back from '../../../components/Back';
import FooterMenu from '../../../components/FooterMenu';
import {userLogout, loadUserInfo, loadUserPanelInfo} from '../actions/User';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import LoadingComponent from '../../../components/LoadingComponent';

class PanelContainer extends LoadingComponent {
  
  constructor(props) {
    super(props);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  componentWillMount() {
    const {dispatch, userModule} = this.props;
    if (userModule.user.get('auth').get('isLogin')) {
      dispatch(loadUserInfo());
    }
    dispatch(loadUserPanelInfo());
  }

  componentDidMount() {
    this.closeLoading();
  }

  onLogoutHandler() {
    const {dispatch, history} = this.props;
    let _this = this;
    _this.openLoading();
    dispatch(userLogout((data) => {
      _this.closeLoading();
      if (data.errorCode == RES_OK_CODE) {
        window.location.href = "/";
      } else {
        alert(data.msg);
      }
    }));
  }

  render() {
    const user = this.props.userModule.user;
    const panelMenu = user.get('panelMenu');
    return (
      <div className="page user-page">
          <div>
            <Header {...this.props} className={ user.get('auth').get('isLogin') ? '': 'user-no-login' }>
              {user.get('auth').get('isLogin') && <span onClick={this.onLogoutHandler} className="quit-btn" ></span>}
            </Header>
            <div className="page-body">
              <UserBasicInfo user={user} />
              <UserPanel {...this.props} menus={panelMenu}/>
              <FooterMenu />
            </div>
          </div>
      </div>
    );
  }
};

PanelContainer.propTypes = {
  userModule: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

PanelContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule,
    app
  };
}

export default connect(mapStateToProps)(PanelContainer);