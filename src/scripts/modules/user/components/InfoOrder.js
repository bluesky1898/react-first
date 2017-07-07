import React, {PropTypes, Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import InfiniteScroll  from 'react-infinite-scroller';

import OrderListItem from './OrderListItem';
import {format} from '../../../utils/datetime';

import {loadUserOrderItems} from '../actions/UserOrder';
import LoadingComponent from '../../../components/LoadingComponent';
import PeriodChoice from '../../../components/PeriodChoice';
import NullRecord from '../components/NullRecord';
class InfoOrder extends LoadingComponent {

  constructor(props) {
    super(props);
    this.flat = props.match.params.type;
    this.pageNo = 1;
    this.pageSize = 10;
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.state = {
      day : 'today',
      page : 1,
      hasMore : true
    }
  }

  componentWillMount() {
    let _this = this;
    const {dispatch} = this.props;
    dispatch(loadUserOrderItems(this.state.day, this.flat, this.state.page, this.pageSize ,(data)=>{
      _this.closeLoading();
    }));
  }

  componentDidMount() {
    this.closeLoading();
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
    let {order} = nextProps.userModule;
    let apiRes = order.get('apiRes');
    let hasMore = order.get('orderItemsHasMore');
    this.state.hasMore = hasMore;
  }

  loadMoreItems(page) {
    this.pageNo = page;
    const {dispatch} = this.props;
    dispatch(loadUserOrderItems(this.state.day, this.flat, this.pageNo, this.pageSize));
  }
  
  getPeriodChoice(num){
    const {dispatch} = this.props;
    this.state.day = num;
    this.state.page = 1;
    this.hasMore = true;
    this.scroll.pageLoaded = 0;
    this.openLoading();
    let _this = this;
    dispatch(loadUserOrderItems(this.state.day,this.flat, this.state.page , this.pageSize ,(data)=>{
      _this.closeLoading();
    }));
  }
  
  render() {
    const {order} = this.props.userModule;
    let orderItems = <NullRecord />;
    if (order.get('orderItems') && order.get('orderItems').length) {
      orderItems = order.get('orderItems').map((item, index) => {
        return <OrderListItem item={ item } key={index} />  
      });
    }
    let _this = this;
    return (
      <div className="user-order-info">
        <PeriodChoice  event={_this.getPeriodChoice.bind(_this)} />
        <div className="order-info-list">
          <InfiniteScroll 
            pageStart={1} 
            ref={(scroll) => { this.scroll = scroll }} 
            loadMore={this.loadMoreItems} 
            initialLoad={false}
            hasMore={this.hasMore} 
            loader={ <div className="loader"></div> }>
              {orderItems}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
};

InfoOrder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userModule: PropTypes.object.isRequired
};


export default withRouter(InfoOrder);