import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';

import {parseQuery, buildQuery} from '../../../utils/url';

import FilterBar from '../../../components/FilterBar';
import Header from '../../../components/Header';
import Back from '../../../components/Back';
import NavTabs from '../components/NavTabs';
import RealtimeBallGroup from '../components/RealtimeBallGroup';

import BugerMenu from '../../../components/BugerMenu';
import BugerHgMenu from '../components/BugerHgMenu';

import {loadSportBallItems, loadSportBallTypes} from '../actions/HgActionPart';
import LoadingComponent from '../../../components/LoadingComponent';
import TimeTicker from '../components/TimeTicker';

const TIMER_SECOND = 60; // 默认60秒倒计时时间
const TIMER_ROLL_SECOND = 90; // 滚球为90s 倒计时

const DEFAULT_BALL = 'ft';
const DEFAULT_TIME_TYPE = 'roll';

class RealTimeBallContainer extends LoadingComponent {
  
  constructor(props) {
    super(props);
    this.ballOptions = {};
    this.onBallChange = this.onBallChange.bind(this);
    this.state = {
      buggerMenuOpened: false,
      loading: true,
      timerSecond: TIMER_SECOND,
      activeName : ''
    };
    this.onProductSelect = this.onProductSelect.bind(this);
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
    this.handleBuggerMenuSelected = this.handleBuggerMenuSelected.bind(this);
    const {match, location, history} = this.props;

    this.timeType = match.path.split('/')[2];
    if (!this.timeType) {
      this.timeType = DEFAULT_TIME_TYPE;
      this.state.timerSecond = TIMER_ROLL_SECOND; // 默认为滚球的倒计时
    }

    let query = parseQuery(location.search);
    this.defaultBall = query.ball || DEFAULT_BALL;
    this.ball = this.defaultBall;
    this.ruleLink = this.ruleLink.bind(this);
    this.resetTimerSecond = this.resetTimerSecond.bind(this);
    this.statusMemory = this.statusMemory.bind(this);
    
  }

  resetTimerSecond() {
    const {dispatch, location} = this.props;
    let query = parseQuery(location.search);
    this.openLoading();
    this.setState({
      loading: true
    });
    let _this = this;
    dispatch(loadSportBallTypes(this.ball, this.timeType, query.rType,this.state.activeName, () => {
      _this.setState({
        timerSecond: TIMER_SECOND,
        loading: false
      });
      _this.closeLoading();
    }));
    
  }
  statusMemory(val){
    this.state.activeName = val;
  }
  
  componentDidMount() {
    const {dispatch, location} = this.props;
    this.openLoading();
    dispatch(loadSportBallItems(this.timeType, location, this.ball));
  }

  onProductSelect(product) {
    this.setState({
      buggerMenuOpened: true
    });
  }

  onBallChange(ball) {
    this.state.loading = true;
    this.openLoading();
    const {dispatch, match, history, location} = this.props;
    this.ball = ball;
    let query = parseQuery(location.search);
    dispatch(loadSportBallTypes(ball, this.timeType, query.rType));
    let path = match.path;
    let to = {
      pathname: path,
      search: `?ball=${ball}`,
    };
    history.push(to);
  }

  handleBuggerMenuSelected(item) {
    this.setState({
      buggerMenuOpened: false
    });
    const {location, dispatch} = this.props;
    dispatch(loadSportBallTypes(this.ball, this.timeType, item.rType));
  }

  onMenuStateChange(state) {
    this.state.buggerMenuOpened = state.isOpen;
  }

  componentWillReceiveProps(nextProps) {
    const {huangguan} = nextProps.hgsport;
    const {location} = nextProps;
    let query = parseQuery(location.search);

    let apiRes = huangguan.get('apiRes');
    let ballPeiyu = huangguan.get('ballPeiyu');
    ballPeiyu = ballPeiyu || {};
    const oldBallPeiyu = this.props.hgsport.huangguan.get('ballPeiyu');
    if ( ( ( Object.keys(ballPeiyu).length > 0 && ballPeiyu != oldBallPeiyu ) || apiRes.from == '/sport/odds') && this.props.location == location) {
      this.closeLoading();
      this.setState({
        loading: false
      });
    } else {
      
    }
    if (query.ball) {
      this.defaultBall = query.ball;
      this.ball = this.defaultBall;
    }
  }

  // 暂无赛事
  renderNoBetting() {
    return <p className="no-data">{this.state.loading ? '赛事加载中': '暂无赛事'}</p>
  }

  renderMaintain(msg) {
    return <p className="maintain">{msg}</p>
  }

  ruleLink(){
    const { history , match,location} = this.props;
    let query = parseQuery(location.search);
    if (!query.ball) {
      query.ball = 'ft';
    }
    history.push('/hgsport/rule/' + query.ball);
  }
  render() {
    const {huangguan} = this.props.hgsport;
    let ballPeiyu = huangguan.get('ballPeiyu');
    let isMaintain = huangguan.get('isMaintain');
    let maintainMsg = huangguan.get('maintainMsg');
    let hasPeiyu = false;
    if (ballPeiyu) {
      hasPeiyu = Object.keys(ballPeiyu).length  > 0;
    }
    let _this = this;
    return (
      <div className="transition-item">
        <BugerMenu 
          onStateChange={this.onMenuStateChange} 
          onBugerMenuItemSelected={this.handleBuggerMenuSelected} 
          className={"hg-buger-menu " + (this.timeType == 'roll' ? 'bg-buger-menu-roll': '')} 
          ballTypes={huangguan.get('ballTypes')} 
          isOpen={this.state.buggerMenuOpened} 
          menu={BugerHgMenu}>

          <div className="hg-page realtime-page">
            <Header className='hgsport-header' {...this.props}>
              <Back backTo={'/sport'}  />
              <FilterBar defaultValue={this.defaultBall} options={huangguan.get('sportBalls')} onChange={this.onBallChange} />
              <i className="link-rule" onClick={_this.ruleLink}></i>
            </Header>
          
            <div className="page-body">
              <NavTabs />
              
              {isMaintain ? this.renderMaintain(maintainMsg): ( 
                hasPeiyu && !this.state.loading? <RealtimeBallGroup {...this.props} statusMemory={this.statusMemory} onProductSelect={this.onProductSelect} items={ ballPeiyu } />: this.renderNoBetting()
              )}

              {isMaintain && this.state.loading ? null: <div onClick={this.resetTimerSecond} className="timer-stick-wrap"><TimeTicker start={!this.state.loading} second={this.state.timerSecond} finished={this.resetTimerSecond}/></div>}

            </div>
          </div>

        </BugerMenu>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const {app, userModule, hgsport} = state;
  return {
    app, userModule, hgsport
  };
}

export default connect(mapStateToProps)(withRouter(RealTimeBallContainer));