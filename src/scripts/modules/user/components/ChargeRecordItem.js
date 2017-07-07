import React, {Component, PropTypes} from 'react';

import {format} from '../../../utils/datetime';
import {CHARGE_STATUS_EXAMINE, CHARGE_STATUS_SUCCESS, CHARGE_STATUS_FAILED} from '../constants/ChargeConstant';

class ChargeRecordItem extends Component {
  
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
    datestr = new Date(datestr.replace(/-/g, "/"));
    return format(datestr, formatStr);
  }

  render() {
    const {item} = this.props;
    const status = this.props.status;
    var moneyStatus = "";
    if(status == CHARGE_STATUS_SUCCESS){
      moneyStatus = item.hkTime.split(' ')[0] +" "+ this.formatDate(item.hkTime, 'HH:mm')
    }else if( status == CHARGE_STATUS_EXAMINE ){
      moneyStatus = "正在审核中...";
    }else{
      moneyStatus = "审核失败";
    }
    return (
      <div className="charge-record-item" onClick={this.viewContent}>
        <div className="title clearfix">
          <div className={"status-progress "+status}></div>
          <div className="left">
            <p className="order-shop">&yen;{item.hkMoney.toFixed(2)}</p>
            <p className="order-number">订单号:<span>{item.hkOrder}</span></p>
          </div>
          <div className="right">
            <p className="time">{item.hkTime.split(' ')[1]}</p>
            <p className="day">{item.hkTime.split(' ')[0]}</p>
          </div>
          <div className={"arrow "+ (this.state.viewContent ? "arrow-change" : "")}></div>
        </div>
        <div className={"content "+ ( this.state.viewContent ? 'view-me': '')}>
          <div className="inner">
            <ul className="clearfix ">
              <li className="money-date start-date"><p>支付方式</p><p><span>{item.hkType}</span></p></li>
              <li className="money-date submit-date">
                <p>{status == CHARGE_STATUS_SUCCESS ? "入款时间" : "入款状态"}</p>
                <p><span>{ moneyStatus }</span></p>
              </li>
            </ul>
            {
              status == CHARGE_STATUS_EXAMINE ? "" : 
              <div className="content-status">
                <p><span>备注：</span>
                {status == CHARGE_STATUS_EXAMINE ? "" : item.remark}
                </p>
                <p>
                  {status == CHARGE_STATUS_SUCCESS ? "" : <span>审核时间:{item.hkCheckTime}</span>}
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
};

ChargeRecordItem.propTypes = {
  item: PropTypes.object.isRequired,
  status: PropTypes.string
};

export default ChargeRecordItem;