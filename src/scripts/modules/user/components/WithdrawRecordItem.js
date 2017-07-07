import React, {Component, PropTypes} from 'react';

import {format, DateFromString} from '../../../utils/datetime';
import {CHARGE_STATUS_EXAMINE, CHARGE_STATUS_SUCCESS, CHARGE_STATUS_FAILED} from '../constants/ChargeConstant';
class WithdrawRecordItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      viewContent: false,
    };
    this.viewContent = this.viewContent.bind(this);
  }
  componentWillReceiveProps(){
    this.state.viewContent = false
  }
  viewContent() {
    this.setState({
      viewContent: !this.state.viewContent
    });
  }

  formatDate(datestr, formatStr ) {
    if (!datestr) return '';
    return format(DateFromString(datestr), formatStr);
  }

  render() {
    const {item} = this.props;
    const status = this.props.status;
    return (
      <div className="charge-record-item order-info-list " onClick={this.viewContent}>
        <div className="title clearfix">
          <div className={"status-progress "+status}></div>
          <div className="left">
            <p className="order-shop">&yen;{item.userWithdrawMoney}</p>
            <p className="order-number">订单号:<span>{item.userOrder}</span></p>
          </div>
          <div className="right">
            <p className="time">{item.createTime.split(' ')[1]}</p>
            <p className="day">{item.createTime.split(' ')[0]}</p>
          </div>
          <div className={"arrow "+ (this.state.viewContent ? "arrow-change" : "")}></div>
        </div>
        <ul className={ "content" +" clearfix "+ ( this.state.viewContent ? 'view-me': '') } >
          <li className="money-date start-date clearfix">
            {
              status == CHARGE_STATUS_EXAMINE ? "" : <p><span>备注：</span>{item.remark}</p> 
            }
            <p>{status == CHARGE_STATUS_EXAMINE ? "正在审核中..." : <span>审核时间：{item.checkTime}</span>}</p>
          </li>
          
        </ul>
      </div>
    );
  }
};

WithdrawRecordItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default WithdrawRecordItem;