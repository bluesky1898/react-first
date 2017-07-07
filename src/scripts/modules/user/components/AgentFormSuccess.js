import React, {Component, PropTypes} from 'react';
import {APPLY_BONUS, APPLY_DEDUCT} from '../constants/UserConstant';
import copy from 'copy-to-clipboard';
import {alert} from '../../../utils/popup';
import FormNotice from '../../../components/FormNotice';
class AgentFormSuccess extends Component {
  constructor(props){
    super(props);
    this.oneKeyCopy = this.oneKeyCopy.bind(this);
  }
  agentTypeLabel() {
    const {agentInfo} = this.props;
    if (agentInfo.agentType == APPLY_BONUS) {
      return '退拥类型';
    } else {
      return '退水类型';
    }
  }
  oneKeyCopy() {
    const {agentInfo} = this.props;
    let text = window.location.href + agentInfo.agentUrl;
    copy(text);
    let _this = this;
    alert("已经复制到粘贴板");
  };
  render() {
    const {agentInfo, userModule} = this.props;
    let url = agentInfo.agentUrl;
    return (
      <div className="agent-body">
        <div className="agent-item agent-title">
          <div className="inner"><i></i>您已经是本站代理会员</div>
        </div>
        <div className="agent-item agent-form">
          <ul>
            <li><span>推广地址</span> : <span>{agentInfo.agentUrl}</span><i onClick={this.oneKeyCopy}>复制</i></li>
            <li><span>代理账号</span> : <span>{userModule.user.get('auth').get('userName')}</span></li>
            <li><span>代理类型</span> : <span>{this.agentTypeLabel()}</span></li>
            <li><span>邮箱地址</span> : <span>{agentInfo.agentMail}</span></li>
          </ul>

        </div>
        <div className="agent-item agent-info">
          <FormNotice msg="applySuccess"></FormNotice>
        </div>
      </div>
    )
  }
};

export default AgentFormSuccess;