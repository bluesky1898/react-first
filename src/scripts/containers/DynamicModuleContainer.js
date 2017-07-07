import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {withRouter, Link, matchPath } from 'react-router-dom';
import Header from '../components/Header';
import Back from '../components/Back';

import LoadingComponent from '../components/LoadingComponent';
import {loadDynamicBrick, loadDynamicArticleList } from '../actions/AppAction';
import {parseQuery} from '../utils/url';

import {getRenderMethod, handleClick} from '../components/ToyBrick';

class DynamicModuleContainer extends LoadingComponent {
  constructor(props) {
    super(props);

    const {match, location} = props;
    let query = parseQuery(location.search);
    this.articleType = query.articleType*1;
    this.title = query.title;
    this.moduleId = query.moduleId;
    this.state = {
      region: match.params.region
    };
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadDynamicArticleList(this.articleType));
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  render() {
    const {brick} = this.props;
    let regionBrick = brick.get(this.state.region);
    let artList = brick.get('articleList');
    
    let renderMethod = getRenderMethod(this.articleType);
    const {isLogin, dispatch, history, region} = this.props;
    let context = Object.assign({}, this.props, {region: this.state.region});

    return (
      <div className="page page-dynamic-module">
        <div className="inner">
          <Header {...this.props}>
            <Back/ >
            <h3>{this.title}</h3>
          </Header>
          <div className="page-body">
            {renderMethod && renderMethod(artList, {moduleId: this.moduleId}, handleClick, {props: context }) }
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const {userModule, app, brick} = state;
  let isLogin = userModule.user.get('auth').get('isLogin');
  return {
    app,
    userModule,
    brick,
    isLogin,
  };
}

export default  connect(mapStateToProps)(withRouter(DynamicModuleContainer));