import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import StartupSlider from '../components/StartupSlider';
import {appFinishedStartup} from '../utils/site';

import HomeHeader from '../components/HomeHeader';
import Slider from '../components/Slider';
import Marquee from '../components/Marquee';
import QuickSection from '../components/QuickSection';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import FooterMenu from '../components/FooterMenu';
import AdBanner from '../components/AdBanner';
import BulletinNav from '../components/BulletinNav';
import HomeBrick from '../components/ToyBrick';

import {loadSiteInfo, loadDynamicBrick, loadLiveSportElectGames, loadHome} from '../actions/AppAction';
import LoadingComponent from '../components/LoadingComponent';
import {countMessage} from '../modules/user/actions/Message';

const REGION_NAME = 'home';

import {staticURL} from '../utils/url';

class HomeContainer extends LoadingComponent { 
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadDynamicBrick());
    dispatch(loadLiveSportElectGames());
    dispatch(loadHome());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  renderHomeContent() {
    const {app, dispatch, userModule} = this.props;
    const isLogin = userModule.user.get('auth').get('isLogin');
    let _this = this;
    let homeConfig = app.get('homeConfig');
    let getTypeConfig = (type) => {
      for (let config of homeConfig) {
        if (config.manageType == type) {
          return config;
        }
      }
      return {};
    };
    let moduleList = ( getTypeConfig(6)['data'] && getTypeConfig(6)['data']['moduleList'] ) || [];

    // 公告列表
    let messages = getTypeConfig(2)['data'] || [];
    let msgArray = [];
    for (let msg of messages) {
      msgArray.push(msg['ggContent']);
    }

    // 轮播图
    let sliderItems = getTypeConfig(1)['data'] || [];
    let sliderImages = [];
    for (let item of sliderItems) {
      sliderImages.push(item['rsUrl']);
    }

    let components = {
      'type_1': <Slider key='type_1' {...this.props} sliders={ sliderImages }/>,
      'type_2': <Link key='type_2' to={'/annoucement'}><Marquee {...this.props} messages={ msgArray } /></Link>,
      'type_3': <QuickSection key='type_3' {...this.props} links={ getTypeConfig(3)['data'] }/>,
      'type_4': <SiteNav key='type_4' {...this.props} electricMenuItems={ getTypeConfig(4)['data'] }/>,
      'type_5': <Footer key='type_5' {...this.props} links={ getTypeConfig(5)['data'] }/>,
      'type_6': <HomeBrick key='type_6' region={'home'} 
                  dispatch={dispatch} 
                  history={this.props.history} 
                  isLogin={isLogin} 
                  brick={moduleList} />
    };

    // 按照配置顺序排序
    let homeComs = [];
    for (let config of homeConfig) {
      homeComs.push(components['type_'+config['manageType']]);
    }

    return homeComs;
  }

  render() {  
    const {app, userModule, dispatch} = this.props;
    const isLogin = userModule.user.get('auth').get('isLogin');
    return (
      <div className="page home">
        <div className="inner">
          <HomeHeader {...this.props}>
            <img src={this.props.app.get('logo')} alt=""/>
          </HomeHeader>  
          <div className="page-body">
            {this.renderHomeContent()}
            <FooterMenu />
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  const {userModule, app, brick} = state;
  return {
    app,
    userModule,
    homeBrick: brick.get(REGION_NAME)
  };
}

export default connect(mapStateToProps)(withRouter(HomeContainer));