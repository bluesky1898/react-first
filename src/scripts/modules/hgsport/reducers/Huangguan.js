import {Map, List} from 'immutable';

import * as Constant from '../constants/HgConstant';
import {RES_OK_CODE, RES_MAINTAIN_CODE} from '../../../constants/AppConstant'; 

const initState = Map({
  sportBalls: {}, // 球类列表
  ballTypes: [], // 球类盘口
  ballPeiyu: {}, // 球类盘口下的赔率
  apiRes: {},
  sportDetail: {}, // 体育详情
  orderItems: [],
  orderItemsHasMore: true,
  isMaintain: false,
  maintainMsg: '',
  sportRule : "",
  activeName: "",
  tempOrderData: [],
});

export default function Huangguan(state = initState, action) {
  switch (action.type) {
    case Constant.REQUEST_SPORT_BALL:
      let sports = action.data.datas;
      let sportBalls = {};
      for (let sport of sports) {
        sportBalls[sport.rType] = sport.rName;
      }
      state = state.set('sportBalls', sportBalls);
      state = state.set('ballTypes', []);
      state = state.set('ballPeiyu', {});
      state = state.set('sportDetail', {});
      state = state.set('apiRes', action.data);
      if (RES_MAINTAIN_CODE == action.data.errorCode) {
        state = state.set('isMaintain', true);
        state = state.set('maintainMsg', action.data.msg);
      } else {
        state = state.set('isMaintain', false);
        state = state.set('maintainMsg', '');
      }
      break;
    case Constant.REQUEST_SPORT_BALL_TYPES:
      let ball = action.data.ball;

      state = state.set('ballTypes',action.data.datas || []);
      state = state.set('apiRes', action.data);
      if (RES_MAINTAIN_CODE == action.data.errorCode) {
        state = state.set('isMaintain', true);
        state = state.set('maintainMsg', action.data.msg);
      } else {
        state = state.set('isMaintain', false);
        state = state.set('maintainMsg', '');
      }
      break;
    case Constant.REQUEST_SPORT_PEIYU:
      state = state.set('apiRes', action.data);
      if (RES_MAINTAIN_CODE == action.data.errorCode) {
        state = state.set('isMaintain', true);
        state = state.set('maintainMsg', action.data.msg);
        if(action.activeName){
          state = state.set('activeName',action.activeName);
        }
      } else {
        state = state.set('ballPeiyu', action.data.datas);
        state = state.set('isMaintain', false);
        state = state.set('maintainMsg', '');
        if(action.activeName){
          state = state.set('activeName',action.activeName);
        }
      }
      break;
    case Constant.REQUEST_SPORT_DETAIL:
      if (RES_MAINTAIN_CODE == action.data.errorCode) {
        state = state.set('isMaintain', true);
        state = state.set('maintainMsg', action.data.msg);
      } else {
        state = state.set('sportDetail', action.data.datas);
        state = state.set('apiRes', action.data);
        state = state.set('isMaintain', false);
        state = state.set('maintainMsg', '');
      }
      break;
    case Constant.REQUEST_ORDER_ITEMS:
      let pageNo = action.data.pageNo;
      state = state.set('apiRes', action.data);
      
      if (action.data.datas.length > 0) {
        state = state.set('orderItemsHasMore', true);
        if (pageNo == 1) {
          state = state.set('orderItems', action.data.datas);  
        } else {
          let list = state.get('orderItems');
          if (typeof action.data.datas != 'undefined') {
            list = list.concat(action.data.datas);  
          }
          state = state.set('orderItems', list);
        }
      } else {
        state = state.set('orderItemsHasMore', false);
      }
    
      console.log([action.data.datas, state.get('orderItemsHasMore')]);

      break;

    case Constant.REQUEST_SPORT_RULE:
      state = state.set('sportRule',action.data.datas.ruleContent)
      
      break;
    case Constant.TEMP_SAVE_ORDER_DETAIL:
      let querydata = action.data.query;
      console.log(['action.data', action.data]);
      if (querydata.rType == 'p3') {
        let orders = state.get('tempOrderData');
        let isExist = false;
        for (let i = 0; i < orders.length; i++) {
          let orderitem = orders[i];
          if (orderitem.query.gid === querydata.gid) {
            orders[i] = action.data;
            isExist = true;
          }
        }
        if (!isExist) {
          orders.push(action.data);  
        }
        
        state = state.set('tempOrderData', orders);
      } else {
        state = state.set('tempOrderData', [action.data]);
      }

      break;

  }

  return state;
}

