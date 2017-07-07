import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import Header from '../components/Header';
import Back from '../components/Back';

import {loadSiteInfo} from '../actions/AppAction';
import LoadingComponent from '../components/LoadingComponent';

class OnlineServiceContainer extends LoadingComponent {

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(loadSiteInfo());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }
  render() {
    const {app} = this.props;
    const link = app.get('messengerLink');
    return (
      <div className="page online-service-page">
        <Header {...this.props} >
          <Back />
          <h3>客服中心</h3>
        </Header>
        <div className="page-body">
          <div className="online-server-img"><img src="../../misc/images/online-server-img.png" alt=""/></div>
          <div className="connect-type">
            <ul>
              <li><i></i><span><a href={`tencent://message/?uin=${app.get('siteQq')}&Site=web&Menu=yes`}>QQ客服: {app.get('siteQq')}</a></span></li> 
              <li><i></i><span>微信客服: {app.get('siteWx')}</span></li>
              <li><i></i><span className="private-style"><span>TEL: <a href={`tel:${app.get('siteTel')}`}>{app.get('siteTel')}</a></span><span><a href={`tel: ${app.get('siteMobile')}`}>{app.get('siteMobile')}</a></span></span></li>
              <li><i></i><span><a href={`mailto:${app.get('siteMail')}`}>Email: {app.get('siteMail')}</a></span></li>
            </ul>
            <br /> <br /> 
            <a href={link} target="blank" className="link-btn">咨询在线客服</a>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const {app, userModule} = state;
  return {
    app,
    userModule
  };
}

export default connect(mapStateToProps)(OnlineServiceContainer);