import React, {Component, PropTypes} from 'react';

class LotteryTimer extends Component {

  constructor(props) {
    super(props);
    this.fpTimer = null;
    this.kjTimer = null;
    this.state = {
      fpSecond: this.props.fpSecond ? this.props.fpSecond: 0,
      kjSecond: this.props.kjSecond ? this.props.kjSecond: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      fpSecond: nextProps.fpSecond ? nextProps.fpSecond: 0,
      kjSecond: nextProps.kjSecond ? nextProps.kjSecond: 0
    };
    this.startTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  formatSecond(second) {
    
    if (second < 0) return 0;

    let day = ~~(second / ( 24 * 60 * 60) );
    second = second - day * 24 * 60 * 60 ;
    let hour = ~~ (second / ( 60 * 60 ) );
    second = second - hour * 60 * 60;
    let min = ~~ (second / 60);
    second = second - min * 60;
    
    // 天
    if (day > 0) day = day + '天';
    else day = '';
    
    // 小时
    if (hour > 0) hour = hour + '小时';
    else hour = '';
    
    // 分钟
    if (min < 10 && min > 0 ) {
      min = '0' + min + '分';
    }
    else if (min <= 0) {
      min = '00' + '分';
    }
    else {
      min += '分';
    }
    
    // 秒
    if (second < 10) second = '0' + second + '秒';
    return day + hour + '' + min  + second + '秒';
  }

  clearTimer() {
    if (this.fpTimer) {
      clearInterval(this.fpTimer);
      this.fpTimer = null;
    }
    if (this.kjTimer) {
      clearInterval(this.kjTimer);
      this.kjTimer = null;
    }
  }

  startTimer() {
    const {fenpan} = this.props;
    const {kaijiang} = this.props;
    const {fpSecond, kjSecond} = this.state;

    this.clearTimer();
    
    let _this = this;
    if (fpSecond > 0) {
      this.fpTimer = setInterval(() => {
        const {fpSecond} = this.state;
        if (fpSecond <= 0) {
          _this.finished = true;
          clearInterval(_this.fpTimer);
          fenpan();
          _this.fpTimer = null;
        } else {
          _this.setState({
            fpSecond: fpSecond - 1
          });
        }
      }, 1000);
    }
  
    if (kjSecond > 0) {
      this.kjTimer = setInterval(() => {
        const {kjSecond} = this.state;
        if (kjSecond <= 0) {
          clearInterval(_this.kjTimer);
          kaijiang();
          _this.kjTimer = null;
        } else {
          _this.setState({
            kjSecond: kjSecond - 1
          });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  componentDidMount() {
    this.startTimer();
  }

  render() {
    const {qs} = this.props;
    const {fpSecond, kjSecond} = this.state;

    if (kjSecond <= 0 ) {
      return <div className="times-final">当前第<span className="color-red">{qs}</span>期  <p>正在开奖</p></div>;
    }

    return <div className="times-final">当前第<span className="color-red">{qs}</span>期  <p >距离 <span className="">{ fpSecond <= 0 ? '开奖': '封盘' }</span> 还有 <span className="color-red">{ fpSecond <= 0 ? this.formatSecond(kjSecond): this.formatSecond(fpSecond) }</span></p></div>;
  }
};

LotteryTimer.defaultProps = {
  fenpan: () => {}
};

LotteryTimer.propTypes = {
  kjSecond: PropTypes.number,
  fpSecond: PropTypes.number,
  qs: PropTypes.string,
  fenpan: PropTypes.func,
  kaijiang: PropTypes.func
}; 


export default LotteryTimer;

