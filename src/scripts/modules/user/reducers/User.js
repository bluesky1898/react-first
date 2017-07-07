import * as UserConstant from '../constants/UserConstant';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import {Map, List} from 'immutable';
import {format} from '../../../utils/datetime';

const initState = Map({
  info: {},
  userLevel: {},
  auth: Map({
    isLogin: !!window._userName, // 是否登录
    loginTime: 0, // 登录时间
    lastActive: 0, // 最后活动时间,
    userName: window._userName,
  }),
  bankLists: [],
  agentInfo: {
    status:  UserConstant.AGENT_STATUS_NONE,
  },
  companyChargeChannel: [],
  apiRes: {
    
  },
  panelMenu: {},
  security : []
});

export default function (state = initState, action) {

  switch (action.type) {
    case UserConstant.REQUEST_PANEL_MENU:
      state = state.set('panelMenu', action.data.datas);
      break;

    case UserConstant.REQUEST_USER_INFO:
      let data = action.data;
      const {errorCode, msg} = data;
      if (data.errorCode == RES_OK_CODE) {
        state = state.set('apiRes', data);
        state = state.set('info', data.datas);
        state = state.set('userLevel', data.datas.typeDetail);
      } else {
        state = state.set('auth', Map({
          isLogin: false,
          loginTime:0,
          userName: ''
        }));
      }
      break;
    case UserConstant.REQUEST_USER_LOGIN:
      state = state.set('auth', Map({
        isLogin: true,
        loginTime: format(new Date(), 'Y-m-d HH:mm:ss'),
        userName: action.data.userName
      }));
      let auth = state.get('auth');
      break;

    case UserConstant.REQUEST_BANK_LIST :
      let banklist =  action.data.datas;
      state = state.set('bankLists',banklist);
      break;
    case UserConstant.REQUEST_SECURITY_INFO :
      state = state.set('security',action.data.datas);
      break;

    case UserConstant.REQUEST_CHANGE_BASIC_INFO :
      break;

    case UserConstant.REQUEST_AGENT_INFO:
      if (!action.data.datas || typeof Object.keys(action.data.datas).length <= 0 ) {
        state = state.set('agentInfo', {
          status: UserConstant.AGENT_STATUS_NONE
        });
      } else {
        //TODO:: 获取代理信息
        state = state.set('agentInfo', action.data.datas);
      }
      break;
  }
  return state;
}

