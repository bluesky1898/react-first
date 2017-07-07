import React, {Component, PropTypes} from 'react';

import {withRouter} from 'react-router-dom';

import {saveOrder} from '../actions/HgActionPart';
import {parseQuery} from '../../../utils/url';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import {alert} from '../../../utils/popup';

class CreateOrderInfo extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      winPrice: 0
    };
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onSaveOrder = this.onSaveOrder.bind(this);
    this.onProcess = false;

    const {location} = this.props;
    this.query = parseQuery(location.search);
  }

  onPriceChange() {
    const {details} = this.props;
    let detail = (details[0] && details[0]['data']['datas']) || {};
    let price = this.refs.price.value;
    let odds = detail.odds;
    let minPrice = detail.minPrice;
    let maxPrice = detail.maxPrice;
    if (price > maxPrice) {
      price = maxPrice;
      this.refs.price.value = price;
    }
    if (odds > 1) {
      odds = odds - 1;
    }
    if (price >= minPrice) {
      this.setState({
        price: price,
        winPrice: (price * odds).toFixed(3)
      });
    }
  }

  onSaveOrder() {
    if (this.onProcess) {
      return ;
    }
    this.onProcess = true;
    const {details} = this.props;
    console.log(['details', details]);
    let price = this.refs.price.value;
    let firstDetail = (details[0] && details[0]['data']['datas']) || {};
    let minPrice = firstDetail.minPrice;
    let maxPrice = firstDetail.maxPrice;
    if (price < minPrice || price > maxPrice) {
      alert(`下注金额范围应该在${minPrice} - ${maxPrice}之间`);
      this.onProcess = false;
    } else {
      const {dispatch, location, userModule, history} = this.props;
      let _this = this;
      
      if (details.length < 3 && this.query.rType == 'p3' ) {
        alert('串关至少选择3个赛事');
        _this.onProcess = false;
        return;
      }
      let saveOrderHandler = (index) => {
        let query = details[index].query;
        query.money = price;
        dispatch(saveOrder(query, (data) => {
          // 处理结束后
          if (index == details.length - 1) {
            _this.onProcess = false;
            if (data.errorCode != RES_OK_CODE) {
              alert(data.msg);
            } else {
              alert('下注成功', (popup) => {
                popup.close();
                history.goBack();
              });
            }
          } else {
            saveOrderHandler(index + 1);
          }
        }));
      };

      saveOrderHandler(0);
    }
  }

  render() {
    const {details} = this.props;
    let firstDetail = (details[0] && details[0]['data']['datas']) || {};
    
    return (
      <div className="order-create-info">
        {details.map((order, index) => {
          let detail = order.data.datas;
          return ( <div className="order-info-panel" key={index}>
            <div className="title">{detail.league}</div>
            <div className="inner-content">
              <div className="row">{detail.bType} - <span className="red">{detail.period}</span></div>
              <div className="row">{detail.team1} <span className="red">VS</span>{detail.team2}</div>
              <div className="title">{detail.selection} 赔率: {detail.odds} </div>
            </div>
          </div>);
        })}
        <div className="order-info-panel">
          <div className="inner-content">
            <div className="form-label">交易金额:</div>
            <div className="form-input"><input onChange={this.onPriceChange} ref="price" type="number" placeholder="输入下注金额"/></div>
            <div className="form-label">可赢金额: <span className="red">{this.state.winPrice}元</span></div>
            <div className="form-tip"><span className="left light-gray">注单最低金额{firstDetail.minPrice}元</span><span className="right light-gray">注单最高金额: {firstDetail.maxPrice}</span></div>
          </div>
        </div>
        <div className="btn-wrap">
          <button className="btn btn-hg" onClick={this.onSaveOrder}>确认投注</button>
        </div>
      </div>
    );
  }
};

CreateOrderInfo.propTypes = {
  details: PropTypes.array.isRequired
};

export default withRouter(CreateOrderInfo);