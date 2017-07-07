import React , { Component , PropTypes } from "react";
import { connect }  from "react-redux";
import {withRouter} from 'react-router';
import {parseQuery} from '../../../utils/url';


class HK6GGMemberBetItems extends Component {

constructor(props) {
    super(props);
    this.state = {
      selectedPeiyu: this.getItemsAsArray(props.items),
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  getNumberLabel() {
    const {platform} = this.props;
    const {selectedPeiyu} = this.state;
    let labels = [];
    for (let item of selectedPeiyu) {
      let parts = item.id.split('-');
      let labelOne = platform['betInfo']['oddinfo'][0][parts[0]];
      labels =<span key={item.id} className="seperator"><span>{labelOne}</span></span>;
    }

    return <p className="label">{labels}</p>
  }

  getNumberContent() {
    const {platform} = this.props;
    const {selectedPeiyu} = this.state;
    let labels = [];
    for (let item of selectedPeiyu) {
      let parts = item.id.split('-');
      console.log(['parts', parts, platform['betInfo']['oddinfo'], item.id]);
      let labelTwo = platform['betInfo']['oddinfo'][1][parts[1]];
      let labelThree = platform['betInfo']['odds'][item.id];
      let labelNumber = platform['betInfo']['oddinfo'][2][parts[2]];
      labels.push(<span key={item.id} className="seperator">
        <span>{labelTwo}: </span> 
        <span className="color-red">{labelNumber}</span>
      </span>);
    }

    return <div className="bet-content">{labels}</div>
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
    let items = [];
    let selectedPeiyu = this.state.selectedPeiyu;
    const {location} = this.props;
    let query = parseQuery(location.search);
    for (let peiyu of selectedPeiyu) {
      items.push({
        uid: peiyu.id,
        rate: peiyu.pl,
        xzje: peiyu.money,
        label: query.gameCode,
        label2: query.pankou,
        number: peiyu.number,
      });
      if (!peiyu.money || peiyu.money > this.getMaxLimit() || peiyu.money < this.getMinLimit() ) {
        alert('下注金额不符合要求');
        return ;
      }
    }
    this.props.onSubmit(items, 'cl');
  }

  onMoneyInput() {
    let selectedPeiyu = this.state.selectedPeiyu;
    for (let i = 0; i < selectedPeiyu.length; i++) {
      let peiyu = selectedPeiyu[i];
      peiyu.money = this.refs.money.value; 
    }
    this.setState({
      selectedPeiyu
    });
  }

  render() {
    let items = this.state.selectedPeiyu;
    let _this = this;
    return (
      <div className="member-bet-items">
        <div className="inner">
          <div className="item">
            <p className="title">{this.getNumberLabel()}</p>
            {this.getNumberContent()}
            <input type="number" ref={'money'} onChange={this.onMoneyInput.bind(_this)} placeholder="输入下注金额" min={this.getMinLimit()} max={this.getMaxLimit()}/><br/>
            <div className="tips"><span>单注{this.getMinLimit()}-{this.getMaxLimit()}元</span> <span>单期最高{this.getPeriodLimit()}元</span></div>
          </div> 
        </div>
        <div className="btn" onClick={this.onSubmit}>确认投注</div>  
      </div>

    )
  }
}

HK6GGMemberBetItems.defaultProps = {
  onSubmit: () => {}
};

HK6GGMemberBetItems.propTypes = {
  items: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default HK6GGMemberBetItems;