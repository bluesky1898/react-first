import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll  from 'react-infinite-scroller';

import Header from '../components/Header';
import Back from '../../../components/Back';
import DateFilter from '../components/DateFilter';
import {loadChargeRecord} from '../actions/Charge';
import {loadWithdrawRecord} from '../actions/UserWithdraw';
import {format} from '../../../utils/datetime';
import WithdrawRecordItem from '../components/WithdrawRecordItem';
import FooterMenu from '../../../components/FooterMenu';
import NullRecord from '../components/NullRecord';
import PeriodChoice from '../../../components/PeriodChoice';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import LoadingComponent from '../../../components/LoadingComponent';

import {CHARGE_STATUS_EXAMINE, CHARGE_STATUS_SUCCESS, CHARGE_STATUS_FAILD} from '../constants/ChargeConstant';
class WithdrawLogContainer extends LoadingComponent {

  constructor(props) {
    super(props);
    this.page = 1;
    this.pageSize = 10;
    this.state = {
      hasMore : true,
      day : 'today',
      page : 1
    }
    this.loadMoreItems = this.loadMoreItems.bind(this);
  }
  componentWillMount() {
    const {dispatch} = this.props;
    let _this = this;
    dispatch(loadWithdrawRecord(this.state.day, this.state.page, this.pageSize,(data)=>{
      _this.closeLoading();
    }));
  }
  componentWillReceiveProps(nextProps) {
    this.closeLoading();
    let withdraw = nextProps.withdraw;
    let apiRes = withdraw.get('apiRes');
    let hasMore = nextProps.withdraw.get('orderItemsHasMore');
    this.setState({
      hasMore
    });
  }
  loadMoreItems(page) {
    const {dispatch} = this.props;
    this.state.page = page;
    dispatch(loadWithdrawRecord(this.state.day, this.state.page));
  }
  getPeriodChoice(num){
    const {dispatch} = this.props;
    this.state.day = num;
    this.state.page = 1;
    this.hasMore = true;
    this.scroll.pageLoaded = 0;
    this.openLoading();
    let _this = this;
    dispatch(loadWithdrawRecord(this.state.day, this.state.page , this.pageSize ,(data)=>{
      _this.closeLoading();
    }));
  }
  render() {
    const {withdraw} = this.props;
    let _this = this;
    let recordItemsRender = <NullRecord />;
    if (withdraw.get('withdrawItems') && withdraw.get('withdrawItems').length) {
      recordItemsRender = withdraw.get('withdrawItems').map((item, index) => {
        let status = "";
        if(!item.status){
          status = CHARGE_STATUS_EXAMINE;
        }else{
          if(item.checkStatus == 1){
            status = CHARGE_STATUS_SUCCESS;
          }else{
            status = CHARGE_STATUS_FAILD;
          }
        }
        return <WithdrawRecordItem status={status} item={item} key={index} />
      });
    }
    return (
      <div className="page page-withdraw-log">
        <div className="inner">
          <Header {...this.props}>
            <Back />
            <h3>提现记录</h3>
          </Header>
          <div className="page-body">
          
            <PeriodChoice  event={_this.getPeriodChoice.bind(_this)} />

            <div className="order-info-list">
              <InfiniteScroll 
              pageStart={0}
              ref={(scroll) => { this.scroll = scroll; }} 
              initialLoad={true}
              loadMore={this.loadMoreItems} 
              hasMore={this.state.hasMore} 
              loader={ <div className="loader">加载中</div> }>
                {recordItemsRender}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

WithdrawLogContainer.propTypes = {
  withdraw: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {userModule} = state;
  const {app} = state;
  return {
    withdraw: userModule.withdraw,
    userModule,
    app
  };
}

export default connect(mapStateToProps)(WithdrawLogContainer);