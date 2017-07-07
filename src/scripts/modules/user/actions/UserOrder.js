import * as OrderConstant from '../constants/OrderConstant';

import {post, get} from '../../../utils/url';
import {orderHistoryAPI} from '../utils/API';
import {format} from '../../../utils/datetime';

export function loadUserOrderItems(time, flat, pageNo = 1, pageSize = 10,cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(orderHistoryAPI(), {
      userName,
      time,
      flat,
      pageNo,
      pageSize
    })
    .then(res => res.json())
    .then(json => {
      cb(json);
      dispatch({
        type: OrderConstant.REQUEST_ORDER_ITEMS,
        data: json,
        pageNo
      });
    });
  };
}