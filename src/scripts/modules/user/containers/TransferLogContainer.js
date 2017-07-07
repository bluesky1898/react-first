import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import LoadingComponent from '../../../components/LoadingComponent';
import Header from '../components/Header';
import FooterMenu from '../../../components/FooterMenu';
import Back from '../../../components/Back';
import PeriodChoice from '../../../components/PeriodChoice';
import NullRecord from '../components/NullRecord';
import {format} from '../../../utils/datetime';
import TransferLogItem from '../components/TransferLogItem';
import {loadTransferLog} from '../actions/PlatformTransfer';
import InfiniteScroll  from 'react-infinite-scroller';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import {CHARGE_STATUS_EXAMINE, CHARGE_STATUS_SUCCESS, CHARGE_STATUS_FAILD} from '../constants/ChargeConstant';
class TransferLogContainer extends LoadingComponent {
  
  constructor(props) {
    super(props);
    this.page = 1;
    this.pageSize = 10;
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.state = {
      hasMore : true,
      day : 'today',
      page : 1
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    // let _this = this;
    // dispatch(loadTransferLog(this.state.day, this.state.page, this.pageSize ,(data)=>{
    //   _this.closeLoading();
    // }));
  }
  loadMoreItems(page) {
    this.state.page = page;
    const {dispatch} = this.props;
    dispatch(loadTransferLog(this.state.day, this.state.page));
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
    let transferlog = nextProps.userModule.transferlog;
    let apiRes = transferlog.get('apiRes');
    let hasMore = transferlog.get('orderItemsHasMore');
    this.state.hasMore = hasMore;
  }
  getPeriodChoice(num){
    this.state.day = num;
    this.state.page = 1;
    const {dispatch} = this.props;
    this.hasMore = true;
    this.scroll.pageLoaded = 0;
    this.openLoading();
    let _this = this;
    dispatch(loadTransferLog(this.state.day,1,10,(data)=>{
      _this.closeLoading();
    }));
  }
  render() {
    const {transferlog} = this.props.userModule;
    let logItems = <NullRecord />;
    if (transferlog.get('logItems') && transferlog.get('logItems').length > 0) {
      logItems = transferlog.get('logItems').map( (item, index) => {
        let status = "";
        if(1 == item.eduStatus){
          status = CHARGE_STATUS_SUCCESS;
        }else{
          status = CHARGE_STATUS_FAILD;
        }
        return <TransferLogItem status={status} item={ item } key={index} />;
      });
    }
    let _this = this;
    return (<div className="page page-transfer-log">
      <div className="inner">
        <Header {...this.props}>
          <Back />
          <h3>转换记录</h3>
        </Header>
        <div className="page-body">
            
          <PeriodChoice  event={_this.getPeriodChoice.bind(_this)} />

          <div className="transfer-items">
            <div className="inner">
              <InfiniteScroll 
                pageStart={0}
                ref={(scroll) => { this.scroll = scroll; }} 
                loadMore={this.loadMoreItems} 
                hasMore={this.state.hasMore} 
                initialLoad={true}
                loader={ <div className="loader">加载中</div> }>
                  {logItems}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
};

function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule, app
  };
}

export default connect(mapStateToProps)(TransferLogContainer);