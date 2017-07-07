import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Header from '../components/Header';
import Back from '../../../components/Back';

class BankDetailInfoContainer extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {match} = this.props;
    const {withdraw} = this.props.userModule;
    let info = withdraw.get('userBankItems');
    let currentId = match.params.id;
    if(!info.length){
      return null;
    }
    for(var i in info){
      if(info[i].id == currentId){
        return (
          <div className="page bank-detail-page">
            <div>
              <Header {...this.props}>
                <Back />
                <h3>银行信息</h3>
              </Header>
              <div className="page-body">
                <div className="inner">
                  <div className="item">
                    <div><span>开&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;行:</span><span>{info[i].bankCnName}</span></div>
                  </div>
                  <div className="item">
                    <div><span>银&nbsp;行&nbsp;卡&nbsp;号:</span><span>{info[i].bankCard}</span></div>
                  </div>
                  <div className="item clearfix">
                    <div><span>开户行地址:</span><span>{info[i].bankAddress}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }
};

function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule,
    app
  };
}
export default connect(mapStateToProps)(withRouter(BankDetailInfoContainer));