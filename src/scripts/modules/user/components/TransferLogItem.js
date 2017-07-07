import React, {Component, PropTypes} from 'react';
import {CHARGE_STATUS_EXAMINE, CHARGE_STATUS_SUCCESS, CHARGE_STATUS_FAILED} from '../constants/ChargeConstant';
class TransferLogItem extends Component {
  
  constructor(props) {
    super(props);
    this.viewContent = this.viewContent.bind(this);
    this.state = {
      viewContent: false
    };
  }
  
  componentWillReceiveProps(){
    this.state.viewContent = false
  }
  viewContent() {
    this.setState({
      viewContent: !this.state.viewContent
    });
  }

  render() {
    const {item} = this.props;
    const status = this.props.status;
    var type = item.eduType == 1 ? "转出到" : "转入到";
    var flatName = item.flatName.toUpperCase();
    var str = new String();
    if( item.eduType == 1 ){
      str = "账户" + type + flatName; 
    }else{
      str = flatName + type + "账户"; 
    }
    return (
      <div className="transfer-log-item normal-log-item order-info-list">
        <div className="charge-record-item" onClick={this.viewContent}>
          <div className={"status-progress "+status}></div>
          <div className="title clearfix">
            <div className="left">
              <p className="order-shop">{str} <span>&yen;{item.eduPoints.toFixed(2)}</span></p>
              <p className="order-number">订单号:<span>{item.eduOrder}</span></p>
            </div>
            <div className="right">
              <p className="time">{item.createTime.split(' ')[1]}</p>
              <p className="day">{item.createTime.split(' ')[0]}</p>
            </div>
            <div className={"arrow "+ (this.state.viewContent ? "arrow-change" : "")}></div>
          </div>
          <ul className={ "content "+" clearfix " + ( this.state.viewContent ? 'view-me': '') } >
            <li>
              {
                status == CHARGE_STATUS_SUCCESS ? "" : <p><span>备注：</span>{item.eduForwardRemark}</p>
              }
              <p className="fr">{status == CHARGE_STATUS_SUCCESS ? "额度转换成功" : "额度转换失败" }</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

TransferLogItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default TransferLogItem;