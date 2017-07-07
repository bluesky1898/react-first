import {Map, List} from 'immutable';
import {
  APP_FINISHED_STARTUP,
  REQUEST_PAGE_TEMPLATE,
  SET_GAME_CENTER_TYPE,
  REQUEST_SITE_INFO,
  REQUEST_HOME_ELECTRIC_MENU,
  VIEW_ARTICLE,
  REQUEST_FORM_INFORMATION,
  REQUEST_FORM_NOTICE,
  REQUEST_MAIN_HOME,
  GET_CENTER_GAME_LIST} from '../constants/AppConstant';
import {setSiteTitle} from '../utils/site';
import {staticURL} from '../utils/url';

const initState = Map({
  startupSlider: ['/misc/images/slider/slider-1.jpg', '/misc/images/slider/slider-2.jpg', '/misc/images/slider/slider-3.jpg'],
  finishedStartup: false,
  logo: '/misc/images/logo.png',
  homeSlider: ['/misc/images/slider/hslider-1.png'],
  lotterySlider: ['/misc/images/lottery/banner.jpg'],
  messages: ['支付宝支付暂时停用具体开通时间请留言网站公告', '微信支付暂时停用具体开通时间请留言网站公告'],
  onlineContacts:  [ 
    Map({title: '在线客服', icon: 'online-service', link: ''}),
    Map({title: 'QQ客服', icon: 'qq', link: ''}), 
    Map({title: '微信客服', icon: 'wechat', link: ''}), 
    Map({title: '联系我们', icon: 'contact', link: ''})],
  domains: Map({
    main: '615.cc',
    backup: []
  }),
  adBanner: '',
  ggList: [],
  promotionSlider: [],
  companyPromotionSlider: ['/misc/images/companyPromotion-slide-1.png'],
  responsive: `<h1>概述</h1><p>美高梅娱乐城</p><h1>取款次数</h1><p>我们理解</p>`,
  rule: `<span>服务与条款....</span>`,
  fair: '<p>公平与公正...</p>',
  messengerLink: '',
  pageTemplates: {},
  siteName: '',
  siteFlag: '',
  siteQq: '',
  siteTel: '',
  siteWx: '',
  siteMail: '',
  siteMobile: '',
  gameCenterViewType: '',
  centerGameList : [],
  electricMenuItems: [],
  viewingArticle: {},
  formNotice: {},
  formInformation: [],
  homeConfig: [],
});

export default function (state = initState, action) {
  let data = action.data;
  switch (action.type) {
    case APP_FINISHED_STARTUP: 
      state = state.set('finishedStartup', action.data);
      break;

    case REQUEST_MAIN_HOME: 
      state = state.set('homeConfig', action.data.datas);
      break;

    case REQUEST_SITE_INFO:
      state = state.set('logo', staticURL(data.datas.logoUrl));
      state = state.set('messengerLink', data.datas.messengerLink);
      state = state.set('siteName', data.datas.siteName); 
      setSiteTitle(state.get('siteName'));

      let messages = [];
      data.datas.ggList = data.datas.ggList || [];
      data.datas.ggList.map((gg) => {
        messages.push(gg.ggContent);
      });

      state = state.set('messages', (messages));
      state = state.set('ggList', data.datas.ggList);
      let homeSlider = [];
      data.datas.bannerList = data.datas.bannerList || [];
      for (let banner of data.datas.bannerList) {
        homeSlider.push(staticURL(banner.url));
      }
      state = state.set('homeSlider', (homeSlider));

      let promotionList = [];
      data.datas.promsList = data.datas.promsList || [];
      for (let banner of data.datas.promsList) {
        promotionList.push(staticURL(banner.url));
      }
      state = state.set('promotionSlider', promotionList);

      let lotterySlider = [];
      data.datas.lotteryList = data.datas.lotteryList || [];
      for (let banner of data.datas.lotteryList) {
        lotterySlider.push(staticURL(banner.url));
      }
      state = state.set('lotterySlider', lotterySlider);

      let domains = state.get('domains');
      domains = domains.set('backup', (data.datas.linkList));
      state = state.set('domains', domains);
      state = state.set('siteFlag', data.datas.siteFlag);
      state = state.set('siteQq', data.datas.siteQq);
      state = state.set('siteWx', data.datas.siteWx);
      state = state.set('siteMobile', data.datas.siteMobile);
      state = state.set('siteTel', data.datas.siteTel);
      state = state.set('siteMail', data.datas.siteMail);
      state = state.set('adBanner', data.datas.homeAdvertUrl);
      break;

    case REQUEST_PAGE_TEMPLATE:
      let pageTemplates = state.get('pageTemplates');
      pageTemplates[data.name] = data.datas;
      state = state.set('pageTemplates', Object.assign({}, pageTemplates));
      break;

    case SET_GAME_CENTER_TYPE:
      state = state.set('gameCenterViewType', action.viewType);
      break;

    case GET_CENTER_GAME_LIST:
      state = state.set('centerGameList',action.data.datas);

      break;

    case REQUEST_HOME_ELECTRIC_MENU:
      state = state.set('electricMenuItems', action.data.datas);

      break;

    case VIEW_ARTICLE:
      state = state.set('viewingArticle', action.data);

      break;

    case REQUEST_FORM_NOTICE:
      let resdata = action.data.datas;
      let formNotice = {};
      for (let info of resdata) {
        formNotice[info.moduleType] = info.moduleDesc;
      }
      formNotice = Object.assign({}, state.get('formNotice'), formNotice);
      state = state.set('formNotice', formNotice);
      break;

    case REQUEST_FORM_INFORMATION:
      state = state.set('formInformation', data.datas);    
      break;
  }

  return state;
}