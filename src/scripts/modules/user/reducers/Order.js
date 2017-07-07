import {Map, List} from 'immutable';
import * as OrderConstant from '../constants/OrderConstant';

const initState = Map({
  apiRes: {},
  orderItems: [],
  orderItemsHasMore: true
});

export default function Order(state = initState, action) {
  switch (action.type) {
    case OrderConstant.REQUEST_ORDER_ITEMS:
      let pageNo = action.pageNo;
      if (action.data.datas.length > 0) {
        state = state.set('orderItemsHasMore',true);
        if (pageNo == 1) {
          state = state.set('orderItems', action.data.datas);  
        } else {
          let oldItems = state.get('orderItems');
          if (action.data.datas && action.data.datas) {
            oldItems = oldItems.concat(action.data.datas);
          }
          state = state.set('orderItems', oldItems);
        }
      }else{
        
        if (action.pageNo == 1) {
         state = state.set('orderItems', []); 
        }

        state = state.set('orderItemsHasMore', false);
      }
      state = state.set('apiRes', action.data);
      return state;
  }
  return state;
}