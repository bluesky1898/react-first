import * as MessageConstant from '../constants/MessageConstant';

import {get, post, put} from '../../../utils/url';
import {userMessageAPI, systemMessageAPI, readMessageAPI, deleteMessageAPI, countMessageAPI} from '../utils/API';

export function loadMessageItems(type, pageNo = 1, pageSize = 10) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    let actionType = MessageConstant.REQUEST_SYSTEM_MESSAGE_ITEMS;
    let body = {
      pageNo,
      pageSize
    };
    let url = userMessageAPI();
    if (type == 2) {
      body['userName'] = userName;
      actionType = MessageConstant.REQUEST_USER_MESSAGE_ITEMS;
    }
    post(url, body)
    .then(res => res.json())
    .then(data => {
      try {
        dispatch({
          type: actionType,
          data: data,
          pageNo
        });
      } catch (e) {
        // console.error(e);
      }
    });
  }
}

export function readMessage(code) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');

    post(readMessageAPI(), {
      userName,
      code
    });
  };

}

export function deleteMessage(code) {
  
   var actionType = MessageConstant.REQUEST_DELETE_USER_MESSAGE;
  
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(deleteMessageAPI(), {
      userName,
      code
    })
    .then(res => res.json())
    .then(data => {
      data.code = code;
      dispatch({
        type: actionType,
        data,
      });
    });
  }
}

export function countMessage() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(countMessageAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: MessageConstant.REQUEST_COUNT_MESSAGE,
        data,
      });
    });
  }
}