import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {HashRouter as Router, IndexRoute, IndexRedirect, withRouter, Redirect} from 'react-router-dom';

import UserRouterContainer from '../modules/user/containers/RouterContainer';
import LoginContainer from '../modules/user/containers/LoginContainer';
import RegisterContainer from '../modules/user/containers/RegisterContainer';
import HomeContainer from './HomeContainer';
import GameContainer from './GameContainer';
import PrivateRoute from './PrivateRouteContainer';
import OnlineServiceContainer from './OnlineServiceContainer';
import LinecheckContainer from './LinecheckContainer';
import PromotionContainer from './PromotionContainer';
import PromotionDetailContainer from './PromotionDetailContainer';
import ResponsiveContainer from './ResponsiveContainer';
import RuleContainer from './RuleContainer';
import FairContainer from './FairContainer';
import PageContainer from './PageContainer';
import LiveContainer from './LiveContainer';
import ElectBroadContainer from './ElectBroadContainer';
import SportContainer from './SportContainer';
import ElectGameContainer from './ElectGameContainer';
import CompanyPromotionContainer from './CompanyPromotionContainer';
import ModifyPhoneContainer from './ModifyPhoneContainer';
import CardGameContainer from './CardGameContainer';
import AnnoucementContainer from './AnnoucementContainer';
import BBINContainer from './BBINContainer';
import ScrollTop from '../components/ScrollTop';
import LotteryRouter from '../modules/lottery/containers/RouterContainer';
import HgRouter from '../modules/hgsport/containers/RouterContainer';
import {userLogin} from '../modules/user/actions/User';
import TestContainer from './TestContainer';
import DynamicModuleContainer from './DynamicModuleContainer';
import DynamicDetailContainer from './DynamicDetailContainer';
import {loadFormNotice, loadFormInformation, loadSiteInfo} from '../actions/AppAction';
import {bodyClass, resetBodyClass} from '../actions/AppAction';
import Route from '../components/Route';
import {parseQuery} from '../utils/url';

import {countMessage} from '../modules/user/actions/Message';

class RouterContainer extends Component {

  constructor(props) {
    super(props);
    this.search = parseQuery(window.location.search);
  }
  
  componentWillMount() {
    const {dispatch, userModule} = this.props;
    const isLogin = userModule.user.get('auth').get('isLogin');
    if (this.search && this.search.p && isLogin === false) {
      return;
    }
    dispatch(userLogin());
    dispatch(loadFormNotice());
    dispatch(loadSiteInfo());
    dispatch(countMessage());
  }

  render() {
    const {userModule} = this.props;
    const isLogin = userModule.user.get('auth').get('isLogin');
    let search = this.search;
    if (this.search && this.search.p && isLogin === false) {
      
    }
    return (
      <Router>
        <div>
          <Route exact path='/' render={ () => {
            if (search && search.p && isLogin === false) {
              return <Redirect to="/register"/>
            } else {
              return <HomeContainer />
            }
          }}  />

          <Route component={LoginContainer} path='/login' />

          <Route component={RegisterContainer} path='/register' />

          <Route onEnter={()=> bodyClass('light-more-gray')} onExist={() => resetBodyClass()} component={OnlineServiceContainer} path='/online-service' />

          <Route component={LinecheckContainer} path='/linecheck'/>

          <Route exact component={PromotionContainer} path='/promotion' />

          <Route component={PromotionDetailContainer} path='/promotion/:id' />

          <Route component={ResponsiveContainer} path='/responsive' />

          <Route component={RuleContainer} path='/rule' />

          <Route component={FairContainer} path='/fair' />

          <Route component={PageContainer} path='/page/:name' />

          <Route component={LiveContainer} path='/live'/>

          <Route exact component={ElectBroadContainer} path='/elect'/>

          <Route path='/elect/game/:name' onEnter={()=> bodyClass('black_bg')} onExist={() => resetBodyClass()} component={ElectGameContainer} />

          <Route path='/user' component={UserRouterContainer} />

          <Route path='/lottery' component={LotteryRouter} />

          <Route path='/sport' component={SportContainer} />

          <Route path='/CompanyPromotion' component={CompanyPromotionContainer} />

          <Route path='/hgsport' component={HgRouter} />

          <Route path='/game' component={GameContainer} />

          <Route path='/bbin' component={BBINContainer} />

          <Route path='/cards' component={CardGameContainer} />

          <Route path='/annoucement' component={AnnoucementContainer} />

          <Route exact onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()}  component={ModifyPhoneContainer} path={ '/modifyphone' } />   

          <Route exact path="/dynamic/module/:region" component={DynamicModuleContainer} />

          <Route exact path="/dynamic/detail/:region" component={DynamicDetailContainer}/>

          <Route path='/test' component={TestContainer} />

          <ScrollTop />

        </div>
      </Router>
    );
  }
};

RouterContainer.propTypes = {};

function mapStateToProps(state) {
  const {userModule} = state;
  return {
    userModule
  };
}

export default connect(mapStateToProps)(RouterContainer);