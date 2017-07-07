import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class PeriodChoice extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      status : false,
      actIndex : 0
    }
    
    this.choice = [{
      text : '今天',
      num : 'today'
    },{
      text : '一周内',
      num : 'oneweek'
    },{
      text : '一月内',
      num : 'onemonth'
    },{
      text : '三个月内',
      num : 'threemonth'
    }];
  }

  periodChange(i,num){
    this.setState({
      actIndex : i
    });
    let {event} = this.props;
    event(num);
  }

  render() {
    let choice = this.choice;
    let _this = this;

    return <div className="period-choice">
      <div className="inner">
        <ul>
          {choice.map((item,index) => {
            let num = item.num;
            return <li key={index} onClick={_this.periodChange.bind(_this,index,num)} className={_this.state.actIndex == index ? "active" : ""}>{item.text}</li>
          })}
        </ul>
      </div>
    </div>;
  }
};



export default PeriodChoice