import React , { Component , PropTypes } from "react";
import { connect }  from "react-redux";
import {withRouter} from 'react-router';
import {parseQuery} from '../../../utils/url';
import {dingweiTotal} from '../utils/helper';

import MemberBetItems from './MemberBetItems';


class MemberDWBetItems extends MemberBetItems {

  constructor(props) {
    super(props);
    this.state.total = 0;
    this.state.totalPrice = 0;
  }

  componentWillMount() {
    if (this.state.selectedPeiyu[0]) {
      this.state.total = dingweiTotal(this.state.selectedPeiyu[0].number);
    }
  }

  onMoneyInput(item) {
    super.onMoneyInput.call(this, item);
    this.setState({
      totalPrice: this.state.total * this.refs[item.id].value
    });
  }

  render() {
    let items = this.state.selectedPeiyu;
    let _this = this;
    return (
      <div className="member-bet-items">
        <div className="inner">
          {items.map((item, index) => {
            return (
              <div key={index} className="item">
                <p className="title">{this.getNumberLabel(item)}</p>
                <input type="number" ref={item.id} onChange={this.onMoneyInput.bind(_this, item)} placeholder="输入下注金额" min={this.getMinLimit()} max={this.getMaxLimit()}/><br/>
                <div className="tips"><span>单注{this.getMinLimit()}-{this.getMaxLimit()}元</span> <span>单期最高{this.getPeriodLimit()}元</span></div>
                <div onClick={this.onDeleteItem.bind(_this, item)} className="delete-btn"></div>
              </div> 
            );
          })}
          <p className="summary">投{this.state.total}注, 总金额{this.state.totalPrice} 元</p>
        </div>
        <div className="btn" onClick={this.onSubmit}>确认投注</div>  
      </div>
    )
  }
}

MemberDWBetItems.defaultProps = {
  onSubmit: () => {}
};

MemberDWBetItems.propTypes = {
  items: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default MemberDWBetItems;