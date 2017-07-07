import * as TransferConstant from '../constants/TransferConstant';
import {get, post} from '../../../utils/url';

import {loadPlatformItemsAPI, 
  loadEduPlatformItemsAPI,
  loadPlatformBalanceAPI, 
  transferToSystemAPI, 
  transferToPlatformAPI, 
  transferLogAPI} from '../utils/API';

export function loadPlatformItems() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(loadPlatformItemsAPI(), {
      userName
    })
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: TransferConstant.REQUEST_PLATFORM_ITEMS,
        data: json
      });
    });
  };
}

export function loadEduPlatformItems() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(loadEduPlatformItemsAPI(), {
      userName
    })
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: TransferConstant.REQUEST_PLATFORM_ITEMS,
        data: json
      });
    });
  };
}

export function getBalanceFromURL(flat,cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(loadPlatformBalanceAPI(), {
      userName,
      flat
    })
    .then(res => res.json())
    .then(json=>{
      dispatch({
        type: TransferConstant.REQUEST_PLATFORM_BALANCE,
        data: {
          flat,
          json
        }
      });
      cb(json);
    });
  }
}

// 从系统转款到平台
export function transferToPlatform(flat, money, callback = () => {} ) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(transferToPlatformAPI(), {
      userName,
      flat,
      money
    })
    .then(res => res.json())
    .then(json => {
      callback(json);
    });
  }
}

// 从平台转换到系统
export function transferToSystem(flat, money, callback = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    let passWord = 'dunaifen';
    post(transferToSystemAPI(), {
      userName,
      passWord,
      flat,
      money
    })
    .then(res => res.json())
    .then(json => {
      callback(json);
    });
  }
}

export function loadTransferLog(time, pageNo = 1, pageSize = 10,cb = ()=>{}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(transferLogAPI(), {
      userName,
      time,
      pageNo,
      pageSize
    })
    .then(res => res.json())
    .then(json => {
      cb(json);
      dispatch({
        pageNo,
        type: TransferConstant.REQUEST_TRANSFER_LOG,
        data: json
      });
    });
  };
}