import React, {Component, PropTypes} from 'react';
import {APPLY_BONUS, APPLY_DEDUCT} from '../constants/UserConstant';

class AgentFormFail extends Component {

  agentTypeLabel() {
    const {agentInfo} = this.props;
    if (agentInfo.agentType == APPLY_BONUS) {
      return '退拥类型';
    } else {
      return '退水类型';
    }
  }

  render() {
    
    const {agentInfo, userModule} = this.props;

    return(
      <div className="agent-body agent-fail">
        <div className="agent-item agent-title">
          <div className="inner"><i></i>您的代理申请未成功</div>
        </div>
        <div className="agent-item agent-form">
          <ul>
            <li><span>代理账号</span> : <span>{userModule.user.get('auth').get('userName')}</span></li>
            <li><span>代理类型</span> : <span>{this.agentTypeLabel()}</span></li>
            <li><span>邮箱地址</span> : <span>{agentInfo.agentMail}</span></li>
          </ul>

        </div>
        <div className="agent-item agent-info">
          <div className="inner"><i></i><p>请将需要充值的账号和密码，银行卡号和密码私聊给我</p></div>
        </div>

      </div>

    )
  }
};

export default AgentFormFail;