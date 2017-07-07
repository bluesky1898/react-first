import React , { Component , PropTypes } from "react";
import { connect }  from "react-redux";
import {withRouter} from 'react-router';
import {parseQuery} from '../../../utils/url';


class HK6LMMemberBetItems extends Component {

constructor(props) {
    super(props);
    this.state = {
      selectedPeiyu: this.getItemsAsArray(props.items),
      preOrder: {},
    };
    this.money = 0;
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  getMinLimit() {
    const {platform, location} = this.props;
    let query = parseQuery(location.search);
    if (platform['betInfo']) {
      return platform['betInfo']['minLimit'][query.pankou.toUpperCase()];
    }
  }

  getMaxLimit() {
    const {platform, location} = this.props;
    let query = parseQuery(location.search);
    if (platform['betInfo']) {
      return platform['betInfo']['maxLimit'][query.pankou.toUpperCase()];
    }
  }

  getPeriodLimit() {
    const {platform, location} = this.props;
    let query = parseQuery(location.search);
    if (platform['betInfo']) {
      return platform['betInfo']['maxPeriodLimit'][query.pankou.toUpperCase()];
    }
  }

  getItemsAsArray(selectedPeiyu) {
    let itemsArray = [];
    for (var key in selectedPeiyu) {
      itemsArray.push(selectedPeiyu[key]);
    }
    return itemsArray;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedPeiyu: this.getItemsAsArray(nextProps.items)
    });
  }

  onSubmit() {
    const {preOrder, location} = this.props;
    let query = parseQuery(location.search);
    let token = preOrder.token;
    let items = [{
      token,
      xzje: this.money,
      typeCode: query.pankou,
      cateCode: 0
    }];
    this.props.onSubmit(items, 'lm');
  }

  onMoneyInput() {
    this.money = this.refs.money.value;
  }

  render() {
    const {preOrder} = this.props;
    return (
      <div className="member-bet-items">
        <div className="inner">
          <div className="item">
            <p className="title">连码</p>
            <input type="number" ref='money' onChange={this.onMoneyInput.bind(this)} placeholder="输入下注金额" min={this.getMinLimit()} max={this.getMaxLimit()}/><br/>
            <div className="tips"><span>单注{this.getMinLimit()}-{this.getMaxLimit()}元</span> <span>单期最高{this.getPeriodLimit()}元</span></div>
          </div> 
          <div className="preorder-items">
            {preOrder&& preOrder.orderList.map( (item, index) => {
              return (
                <div key={index} className="preorder-item">
                  <p><span>{item.xzlxName}</span><span>{item.number}</span> 赔率：<span dangerouslySetInnerHTML={ {__html: item.rate} }></span></p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="btn" onClick={this.onSubmit}>确认投注</div>  
      </div>
    );
  }
}

HK6LMMemberBetItems.defaultProps = {
  onSubmit: () => {}
};

HK6LMMemberBetItems.propTypes = {
  items: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  preOrder: PropTypes.object,
};

export default HK6LMMemberBetItems;