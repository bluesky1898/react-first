import React, {Component, PropTypes} from 'react';

class OrderListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMoreContent: false
    };
    this.onShowMoreContent = this.onShowMoreContent.bind(this);
  }
  componentWillReceiveProps(){
    this.state.showMoreContent = false
  }
  onShowMoreContent() {
    this.setState({
      showMoreContent: !this.state.showMoreContent
    });
  }

  render() {
    const {item} = this.props;
    var betUsrWin = parseFloat(item.betUsrWin);
    betUsrWin = betUsrWin.toFixed(2);
    var betGameContent = item.betContent;
    return (
      <div className="order-item" onClick={this.onShowMoreContent}>
        <div className="title clearfix">
          <div className="left">
            
            <p className="order-shop"><span>{betGameContent}</span></p>
            <p className="order-number"><span>订单号:</span><span>{item.betWagersId}</span></p>
          </div>
          <div className="right">
            <p className="time">{item.betTime.split(' ')[1]}</p>
            <p className="day">{item.betTime.split(' ')[0]}</p>
          </div>
          <div className={"arrow "+ (this.state.showMoreContent ? "arrow-change" : "")}></div>
        </div>
        <ul className={"content"+" clearfix " + (this.state.showMoreContent ? 'view-me': '') }>
          <li><p>投注金额</p><p>{item.betIn}</p></li>
          <li><p>投注结果</p><p className="minus"><span>{betUsrWin}</span></p></li>
        </ul>
      </div>
    );
  }
};

OrderListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default OrderListItem;