import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';

import Header from '../../../components/Header';
import Back from '../../../components/Back';
import {AGENT_STATUS_EDIT} from '../constants/UserConstant';
import {AGENT_STATUS_FAIL} from '../constants/UserConstant';
import {AGENT_STATUS_APPLYING} from '../constants/UserConstant';
import {AGENT_STATUS_SUCCESS} from '../constants/UserConstant';

import {alert} from '../../../utils/popup';
import LoadingComponent from '../../../components/LoadingComponent';
import AgentFormSuccess from '../components/AgentFormSuccess';
import AgentFormEdit from '../components/AgentFormEdit';
import AgentFormApplying from '../components/AgentFormApplying';
import AgentFormFail from '../components/AgentFormFail';
import {loadUserAgentInfo} from '../actions/User';

class AgentContainer extends LoadingComponent {

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(loadUserAgentInfo());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }
  
  render() {
    let agentInfo = this.props.userModule.user.get('agentInfo');
    let agentInfoCom = <AgentFormEdit info={agentInfo} {...this.props}/>

    if(agentInfo.status == AGENT_STATUS_SUCCESS ) {
      agentInfoCom = <AgentFormSuccess {...this.props}/>
    }else if(agentInfo.status == AGENT_STATUS_APPLYING){
      agentInfoCom = <AgentFormApplying {...this.props}/>
    }else if(agentInfo.status == AGENT_STATUS_FAIL){
      agentInfoCom = <AgentFormFail {...this.props}/>
    }

    return (
        <div className="page page-agent">
          <div className="inner">
            <Header {...this.props}>
              <Back />
              <h3>代理信息</h3>
            </Header>
            <div className="page-body">
              {agentInfoCom}
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const {userModule, app} = state;

  return {
    userModule,
    app,
    agentInfo: userModule.user.get('agentInfo'),
  }
}

export default connect(mapStateToProps)(withRouter(AgentContainer));