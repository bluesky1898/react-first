import React, {Component, PropTypes} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import InfiniteScroll  from 'react-infinite-scroller';

import Header from '../components/Header';
import NullRecord from '../components/NullRecord';
import Back from '../../../components/Back';
import DateFilter from '../components/DateFilter';
import PeriodChoice from '../../../components/PeriodChoice';
import {loadChargeRecord} from '../actions/Charge';
import {format} from '../../../utils/datetime';
import ChargeRecordItem from '../components/ChargeRecordItem';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import LoadingComponent from '../../../components/LoadingComponent';

import {CHARGE_STATUS_EXAMINE, CHARGE_STATUS_SUCCESS, CHARGE_STATUS_FAILD} from '../constants/ChargeConstant';

class ChargeRecordContainer extends LoadingComponent {
  
  constructor(props) {
    super(props);
    this.page = 1;
    this.pageSize = 10;
    this.state = {
      hasMore: true,
      day : 'today',
      page : 1
    }
    this.loadMoreItems = this.loadMoreItems.bind(this);
  }
  componentWillMount() {
    const {dispatch} = this.props;
    let _this = this;
    this.state.page = 1;
    dispatch(loadChargeRecord(this.state.day, this.state.page, this.pageSize ,(data)=>{
      _this.closeLoading();
    }));
  }

  getPeriodChoice(num){
    const {dispatch} = this.props;
    this.state.page = 1;
    this.state.day = num;
    this.state.hasMore = true;
    this.openLoading();
    let _this = this;
    dispatch(loadChargeRecord(this.state.day,this.state.page, this.pageSize, (data)=>{
      _this.closeLoading();
    }));
  }
  
  loadMoreItems(page) {
    const {dispatch} = this.props;
    this.state.page = page;
    dispatch(loadChargeRecord(this.state.day, this.state.page , this.pageSize));
  }
  
  componentWillReceiveProps(nextProps) {
    this.closeLoading();
    let chargeRecord = nextProps.chargeRecord;
    let apiRes = chargeRecord.get('apiRes');
    let hasMore = nextProps.chargeRecord.get('orderItemsHasMore');
    this.state.hasMore = hasMore;
  }
  
  render() {
    const {chargeRecord} = this.props;
    let recordItemsRender = <NullRecord />;
    let chargeHistories = chargeRecord.get('recordHistories')[this.state.day];
    if (chargeHistories && chargeHistories.length) {
      recordItemsRender = chargeHistories.map((item, index) => {
        let status = "";
        if(!item.hkStatus){
          status = CHARGE_STATUS_EXAMINE;
        }else{
          if(item.hkCheckStatus){
            status = CHARGE_STATUS_SUCCESS;
          }else{
            status = CHARGE_STATUS_FAILD;
          }
        }
        return <ChargeRecordItem  status={status} item={item} key={index} />
      });
    }

    let _this = this;
    return (
    	<div className="page page-charge-record">
      <Header {...this.props}>
        <Back />
        <h3>充值记录</h3>
      </Header>
      <div className="page-body">
      	<div className="user-order-info">

        <PeriodChoice  event={_this.getPeriodChoice.bind(_this)} />
        
        <div className="order-info-list">
          <InfiniteScroll 
          ref={(scroll) => { this.scroll = scroll} }
          pageStart={1}
          loadMore={this.loadMoreItems} 
          hasMore={this.state.hasMore} 
          initialLoad={false}
          loader={ <div className="loader">加载中</div> }>
            {recordItemsRender}
          </InfiniteScroll> 
        </div>
      </div>
      </div>
    </div>
    );
  };
};

function mapStateToProps(state) {
  const {userModule} = state;
  const {app} = state;
  return {
    chargeRecord: userModule.chargeRecord,
    userModule,
    app
  };
}
ChargeRecordContainer.propTypes = {
  chargeRecord: PropTypes.object.isRequired
};



export default connect(mapStateToProps)(withRouter(ChargeRecordContainer));