import React , { Component , PropTypes } from "react";
import {connect} from 'react-redux';
 
import SelectBox from "../../../../components/SelectBox";
import BetRecordList from "./BetRecordList";
import {getPlatformOrder} from "../../actions/LotteryAction";
import {format} from "../../../../utils/datetime";
import LoadingComponent from '../../../../components/LoadingComponent';

class BetRecord extends LoadingComponent {
  constructor(props){
    super(props);
    this.onSelectPlatform = this.onSelectPlatform.bind(this);
    this.onSelectTimes = this.onSelectTimes.bind(this);
    this.options = [
      {
        text :"全部",
        value : 100000,
        disparity: 63072000000
      },{
        text :"今天",
        value: 0,
        disparity: 86400000
      },{
        text: "三天内", 
        value: 3,
        disparity: 259200000
      },{
        text: "一周内", 
        value: 7,
        disparity: 604800000
      },{
        text: "半个月内", 
        value: 15,
        disparity: 1296000000
      },{
        text: "一个月内", 
        value: 30,
        disparity: 2592000000
      }
    ];
    this.platform = '';
    this.state = {
      times : 100000
    }
  }
  gameList (){
    const {lottery} = this.props;
    const gameList = lottery.get('gameTypes');
    var list_select = [{
      text: '全部',
      value: ''
    }];
    for(var i=0;i<gameList.length;i++){
      var json={};
      json.text = gameList[i].flatName;
      json.value = gameList[i].flatCode;
      list_select.push(json);
    }
    return list_select;
  }
  componentWillMount() {
    this.loadRecordLog();
  }
  componentDidMount() {
    // this.openLoading();
  }
  loadRecordLog()　 {
    const {dispatch,userModule} = this.props;
    let userName = userModule.user.get('auth').get('userName');
    let endTime = format(new Date(), "Y-m-d HH:mm:ii");
    let secondDelta = this.state.times * 24 * 60 * 60;
    let yearMonthDayStr = format(new Date(), "Y-m-d");
    let nowBeginTime = Math.floor( new Date(`${yearMonthDayStr} 00:00:00`).getTime() / 1000 );
    let startTime = format(new Date( ( nowBeginTime - secondDelta ) *1000 ) , "Y-m-d HH:mm:ii");
    let gameCode = this.platform;
    let pageNo = 1;
    let _this = this;
    _this.openLoading();
    dispatch(getPlatformOrder(userName,startTime,endTime,gameCode,pageNo, (data) => {
      _this.closeLoading();
    }));
  }
  onSelectPlatform(value){
    this.platform = value;
    this.loadRecordLog();
  }
  onSelectTimes(value){
    this.state.times = value;
    this.loadRecordLog();
  }
  render(){
    const {lottery} = this.props;
    const list = lottery.get('platformOrder');
    return(
      <div className="bet-record">
        <div className="choice">
          <SelectBox options={this.gameList()} onChange={this.onSelectPlatform} value={this.platform} />
          <SelectBox options={this.options} onChange={this.onSelectTimes} value={this.state.times} />
        </div>
        {list.length ? <BetRecordList list={list}  />  : <p className="bet-record-tips"><span>您没有该平台的投注记录！</span></p>}
      </div>
    )
  }
}
function mapStateToProps(state){
  const {lottery} = state.lotteryModule;
  const {userModule} = state;
  return{
    lottery,
    userModule
  }
}
export default connect(mapStateToProps)(BetRecord);