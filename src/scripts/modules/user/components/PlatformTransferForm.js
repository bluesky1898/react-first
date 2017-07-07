import React, {Component, PropTypes} from 'react';
import {alert} from '../../../utils/popup';

import {transferToPlatform, transferToSystem} from '../actions/PlatformTransfer';
import LoadingComponent from '../../../components/LoadingComponent';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import {parseQuery} from '../../../utils/url';
import FormNotice from '../../../components/FormNotice';

class PlatformTransferForm extends LoadingComponent {

  constructor(props) {
    super(props);
    this.onTransferConfirm = this.onTransferConfirm.bind(this);
    this.state = {
      transferRes: null,
      transfering: false
    };
  }
  
  transferTitle() {
    const {match, location} = this.props;
    let direction = match.params.direction;
    let platform = match.params.platform;
    let query = parseQuery(location.search);

    if (direction == 'in') {
      return <p>由<span>总账户</span>转入到<span>{ query.name }平台</span></p>;
    } else {
      return <p>由<span>{query.name}平台</span>转出到<span>总账户</span></p>;
    }
  }

  componentDidMount() {
    this.closeLoading();
  }

  onTransferConfirm() {
    let count = this.refs.count.value;
    const {dispatch, match} = this.props;
    let direction = match.params.direction;
    let platform = match.params.platform;
    if (count < 10 ) {
      alert('最低转入金额需≥10元');
    } else {
      if (direction == 'in') {
        this.openLoading();
        let _this = this;
        _this.setState({
          transfering: true
        });
        dispatch( transferToPlatform(platform, count, (apiRes) => {
          _this.closeLoading();
          _this.setState({
            transfering: false
          });
          if (apiRes.errorCode == RES_OK_CODE) {
            alert('转入成功');
          } else {
            alert(apiRes.msg);
          }
        }));
      } else {
        this.openLoading();
        let _this = this;
        _this.setState({
          transfering: true
        });
        dispatch(transferToSystem(platform, count, (apiRes) => {
          _this.closeLoading();
          _this.setState({
            transfering: false
          });
          if (apiRes.errorCode == RES_OK_CODE) {
            alert('转出成功');
          } else {
            alert(apiRes.msg);
          }
        }));
      }
    }
  }

  render() {
    const {match} = this.props;
    let direction = match.params.direction;
    return (
      <div className="transfer-form">
        <div className={"icon " + ( this.state.transfering ? 'icon-animate-rotate': '')}></div>
        {this.transferTitle()}
        <form className="modify-form">
          <div className="operation-charge">
            <h2><i></i>{direction == 'in' ? '转入金额': '转出金额'} <input type="number" ref="count" placeholder="0"/></h2>
          </div>
          <p className="word-style">最低转入金额需≥10元</p>
          <FormNotice msg="edu"></FormNotice>
          <div className="sumbit" onClick={this.onTransferConfirm}>确认转换</div>
        </form>
      </div>
    );
  }
};

PlatformTransferForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default PlatformTransferForm;