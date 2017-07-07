import React ,{ Component , PropTypes } from "react";
import TopBar from '../../../components/TopBar';
import Back from '../../../components/Back';
class ProtocolContainer extends Component{

  render(){
    return (
      <div className="page protocol-page">
        <TopBar>
          <Back />
          <h3>用户协议</h3>
        </TopBar>
        <div className="page-body">
          <div className="content">

            <h2>特别提示：</h2>
            <p>您在使用百度提供的各项服务之前，请您务必审慎阅读、充分理解本协议各条款内容，特别是以粗体标注的部分，包括但不限于免除或者限制责任的条款。如您不同意本服务协议及/或随时对其的修改，您可以主动停止使用百度提供的服务；您一旦使用百度服务，即视为您已了解并完全同意本服务协议各项内容，包括百度对服务协议随时所做的任何修改，并成为百度用户。</p>
            <h4>一、总则</h4>
            <p>1．1　用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击"同意"按钮即表示用户与百度公司达成协议，完全接受本协议项下的全部条款。</p>
            <p>1．2　用户注册成功后，百度将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
            <p>1．3　用户一经注册百度帐号，除非子频道要求单独开通权限，用户有权利用该帐号使用百度各个频道的单项服务，当用户使用百度各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及百度在该单项服务中发出的各类公告的同意。</p>
            <p>1．4　百度会员服务协议以及各个频道单项服务条款和公告可由百度公司定时更新，并予以公示。您在使用相关服务时,应关注并遵守其所适用的相关条款。</p>
            
          </div>

        </div>
        
      </div>

    )
  }
}


export default ProtocolContainer;