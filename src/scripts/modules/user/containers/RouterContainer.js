import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Route, IndexRoute, IndexRedirect, withRouter} from 'react-router-dom';

import PanelContainer from './PanelContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import PrivateRoute from '../../../containers/PrivateRouteContainer';
import OrderContainer from './OrderContainer';
import OrderContentContainer from './OrderContentContainer';
import MessageContainer from './MessageContainer';
import MessageContentContainer from './MessageContentContainer';
import ChargeContainer from './ChargeContainer';
import ChargeRecordContainer from './ChargeRecordContainer';
import WithdrawContainer from './WithdrawContainer';
import WithdrawFormContainer from './WithdrawFormContainer';
import AddBankContainer from './AddBankContainer';
import TransferPanelContainer from './TransferPanelContainer';
import TransferFormContainer from './TransferFormContainer';
import ModifyPasswordContainer from './ModifyPasswordContainer';
import ChargeFormContainer from './ChargeFormContainer';
import UserInfoContainer from './UserInfoContainer';
import TransferLogContainer from './TransferLogContainer';
import WithdrawLogContainer from './WithdrawLogContainer';
import ProtocolContainer from './ProtocolContainer';
import SecurityInfoContainer from './SecurityInfoContainer';
import BankListsContainer from './BankListsContainer';
import BankCardContainer from './BankCardContainer';
import BankDetailInfoContainer from './BankDetailInfoContainer';
import ChargeQuickFormContainer from './ChargeQuickFormContainer';
import AgentContainer from './AgentContainer';


import {loadUserInfo} from '../actions/User';
import {bodyClass, resetBodyClass} from '../../../actions/AppAction';

class RouterContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch, userModule} = this.props;
    if (userModule.user.get('auth').get('isLogin')) {
      dispatch(loadUserInfo());
    }
  }

  render() {
    let {match} = this.props;
    return ( 
      <div className="user-module">
        <Route exact component={PanelContainer} path={ '/user' } />
        
        <Route component={ProtocolContainer} path={ '/user/protocol' } />
        
        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()} component={UserInfoContainer} path={ '/user/info' } />

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()} component={MessageContainer} path={ '/user/message' } />

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()} component={MessageContentContainer} path={ '/user/viewmessage/:id/:content/:title' } />

        <PrivateRoute exact component={OrderContainer} path={ '/user/order' } />

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()}  component={OrderContentContainer} path={ '/user/order/:type' } />

        <PrivateRoute exact component={ChargeContainer} path={ '/user/charge/:type' } />

        <PrivateRoute exact component={ChargeQuickFormContainer} path={ '/user/charge/:type/:way' } />

		    <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()}  exact component={ChargeRecordContainer} path={ '/user/chargerecord' } />        

        <PrivateRoute component={ChargeFormContainer} path={ '/user/charge/:type/form/:channel' } />

        <PrivateRoute 
          onEnter={()=> bodyClass('light-gray')} 
          onExist={() => resetBodyClass()}  exact component={WithdrawContainer} path={ '/user/withdraw' }/>

        <PrivateRoute component={AddBankContainer} path={ '/user/withdraw/addbankcard/:bankName' }/>

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()}   component={WithdrawLogContainer} path={'/user/withdraw/log'}/>

        <PrivateRoute component={WithdrawFormContainer} path={ '/user/withdraw/form/:bank' }/>

        <PrivateRoute exact component={TransferPanelContainer} path={ '/user/transfer' } />

        <PrivateRoute onEnter={() => bodyClass('light-gray')} onExist={() => resetBodyClass()} component={TransferLogContainer} path={'/user/transferlog'} />

        <PrivateRoute exact component={TransferFormContainer} path={ '/user/transfer/:platform/:direction' } /> 

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()} exact component={ModifyPasswordContainer} path={ '/user/modifypw/:type' } /> 

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()} exact component={SecurityInfoContainer} path={ '/user/security' } /> 

        <PrivateRoute exact component={BankListsContainer} path={ '/user/banklist' } /> 

        <PrivateRoute onEnter={()=> bodyClass('light-gray')} onExist={() => resetBodyClass()}  exact component={BankCardContainer} path={ '/user/bankcard' } /> 

        <PrivateRoute component={BankDetailInfoContainer} path={ '/user/bankdetail/:id' } /> 

        <PrivateRoute component={AgentContainer} path="/user/agent"/>


      </div>
    );
  }
};

RouterContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const {userModule} = state;
  return {
    userModule
  };
}

export default connect(mapStateToProps)(withRouter(RouterContainer));

