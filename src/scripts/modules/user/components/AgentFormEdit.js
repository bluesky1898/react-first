import React, {Component, PropTypes} from 'react';
import {mail as validateMail} from '../utils/validate';
import {alert} from '../../../utils/popup';
import {applyUserAgentInfo} from '../actions/User';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import LoadingComponent from '../../../components/LoadingComponent';
import {APPLY_BONUS, APPLY_DEDUCT} from '../constants/UserConstant';
import FormNotice from '../../../components/FormNotice';

class AgentFormEdit extends LoadingComponent {
  
  constructor(props){
    super(props);
    this.choiceStyle = this.choiceStyle.bind(this);
    this.state = {
      applyType : APPLY_BONUS
    };
    this.applyAgentHandler = this.applyAgentHandler.bind(this);
  }

  componentDidMount() {
    //
  }
  
  choiceStyle(sty){
    this.setState({
      applyType : sty
    })
  }
  
  setActive(num){
    if(num == this.state.applyType) return "active";
  }

  applyAgentHandler() {
    let mail = this.refs.mail.value;
    let content = this.refs.content.value;
    let applyType = this.state.applyType;
    if (mail.length <= 0 ) {
      alert('请输入你的邮件地址');
    } else if (!validateMail(mail)) {
      alert('邮箱地址不正确');
    } else if (content.length <= 0) {
      alert('请输入申请理由');
    } else {
      const {dispatch, history} = this.props;
      let _this = this;
      this.openLoading();
      dispatch(applyUserAgentInfo(applyType, content, mail, (data) => {
        _this.closeLoading();
        if (data.errorCode == RES_OK_CODE) {
          alert(data.msg,"提示",function(){
            _this.closeLoading();
            history.goBack();
          });
          
        }
      }));
    }
  }

  render() {
    const {userModule} = this.props;

    return(
      <div className="agent-body agent-edit">
        <div className="agent-item agent-title">
          <div className="inner"><i></i>填写表单申请代理资格</div>
        </div>
        <div className="agent-item agent-form">
          <ul>
            <li><span>代理账号</span> : &nbsp;<span>{userModule.user.get('auth').get('userName')}</span></li>
            <li><span>代理类型</span> : &nbsp;
              <span className={"input-style1 "+(this.setActive(APPLY_BONUS))} onClick={this.choiceStyle.bind(this, APPLY_BONUS)}>退佣代理</span> &nbsp;&nbsp;
              <span className={"input-style1 "+(this.setActive(APPLY_DEDUCT))} onClick={this.choiceStyle.bind(this, APPLY_DEDUCT)}>退水代理</span>
            </li>
            <li><span>邮箱地址</span> : &nbsp;<input ref="mail" type="text" placeholder="输入您的邮箱地址" /></li>
            <li><span>申请理由</span> : &nbsp;<textarea name="" ref="content" id="" cols="30" rows="10" placeholder="填写您的代理申请理由"></textarea></li>
          </ul>
        </div>
        <div className="agent-item agent-info">
          <FormNotice msg="applyAgent"></FormNotice>
        </div>
        
        <div className="btn" onClick={this.applyAgentHandler}>提交申请</div>
      </div>

    )
  }
};

export default AgentFormEdit;