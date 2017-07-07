import * as UserConstant from '../constants/UserConstant';

import {userInfoAPI, 
  changePwdAPI, 
  changeWithdrawAPI, 
  loginAPI, 
  registerAPI, 
  logoutAPI,
  banklistAPI,
  agentInfoAPI,
  securityInfoAPI,
  agentApplyAPI,
  memberResourceAPI,
  changeUserBasicInfoAPI} from '../utils/API';

import {get, post, put} from '../../../utils/url';
import {alert} from '../../../utils/popup';
import {RES_OK_CODE} from '../../../constants/AppConstant';

export function loadUserInfo(userName = '') {
  return (dispatch, getState) => {
    let state = getState();
    if (!userName) {
      userName = state.userModule.user.get('auth').get('userName');  
    }

    post(userInfoAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      try {
        dispatch({
          type: UserConstant.REQUEST_USER_INFO,
          data: data
        });
      } catch (e) {
        //console.error(e.toString());
      }
    });
  };
}

export function changeLoginPwd(oldPwd, newPwd, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(changePwdAPI(), {
      userName,
      newPwd,
      oldPwd
    })
    .then(res => res.json())
    .then(json => {
      cb(json);
    });
  }
}

export function changeWithdrawPwd(oldPwd, newPwd, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(changeWithdrawAPI(), {
      userName,
      newPwd,
      oldPwd
    })
    .then(res => res.json())
    .then(json => {
      cb(json);
    });
  };
}

export function userLogin(userName = '', password = '', yzm = '', cb = () => {}) {
  return (dispatch, getState) => {
    post(loginAPI(), {
      userName,
      password,
      yzm
    })
    .then(res => res.json())
    .then(data => {
      if (data.errorCode  == RES_OK_CODE) {
        userName = data.datas.userName;
        cb(true);
        dispatch({
          type: UserConstant.REQUEST_USER_LOGIN,
          data: {
            userName
          },
        });
        dispatch(loadUserInfo(userName));
      } else {
        cb(false, data.msg);
      }
    });
  };
}

export function userRegister(params, cb = () => {}) {
  return (dispatch, getState) => {
    post(registerAPI(), params)
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  };
}

export function userLogout(cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(logoutAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  };
}

export function getBankList(){
  return (dispatch ,getState) => {
    post(banklistAPI())
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: UserConstant.REQUEST_BANK_LIST,
        data: data
      });
    })
  }
}

export function securityLog(){
  return (dispatch ,getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(securityInfoAPI(),{
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: UserConstant.REQUEST_SECURITY_INFO,
        data: data
      });
    })
  }
}


export function changeUserBasicInfo(userQq = null,userMail = null ,callback = () => {}){
  console.log([userQq, userMail]);
  if (!userQq && !userMail) {
    callback({
      errorCode: RES_OK_CODE,
      msg: '', 
    });
  }
  return (dispatch,getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    let body = {
      userName
    };
    if(userQq) {
      body.userQq = userQq;
    }
    if (userMail) {
      body.userMail = userMail;
    }
    post(changeUserBasicInfoAPI(), body)
    .then(res => res.json())
    .then(data => {
      callback(data);
      dispatch({
        type: UserConstant.REQUEST_CHANGE_BASIC_INFO,
        data: data
      });
    })
  }
}

export function loadUserAgentInfo() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(agentInfoAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: UserConstant.REQUEST_AGENT_INFO,
        data
      });
    });
  };
}

export function applyUserAgentInfo(agentType, content, agentMail, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(agentApplyAPI(), {
      userName, 
      agentType,
      content,
      agentMail
    })
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  };
}

export function loadUserPanelInfo() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(memberResourceAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: UserConstant.REQUEST_PANEL_MENU,
        data: data
      });
    });
  };
}