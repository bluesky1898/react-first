import * as WithdrawConstant from '../constants/WithdrawConstant';
import {Map, List} from 'immutable';

const initState = Map({
  withdrawItems: [],
  userBankItems: [],
  bankCodes: [],
  orderItemsHasMore: true,
  canAddMoreBank: true,
  apiRes: {}
});

export default function (state = initState, action) {

  switch (action.type) {
    case WithdrawConstant.REQUEST_WITHDRAW_ITEMS:
      
      let pageNo = action.pageNo;
      if (action.data.datas.length > 0) {
        state = state.set('orderItemsHasMore', true);
        if(pageNo == 1){
          state = state.set('withdrawItems', action.data.datas);  
        }else{
          let oldRecords = state.get('withdrawItems');
          oldRecords = oldRecords.concat(action.data.datas);
          state = state.set('withdrawItems', oldRecords);
        }
      }else{

        if (action.pageNo == 1) {
          state = state.set('withdrawItems', []); 
        }
        state = state.set('orderItemsHasMore', false);
      }
      state = state.set('apiRes', action.data);
      break;
    case WithdrawConstant.REQUEST_USER_BANK_ITEMS:
      if (action.data.datas) {
        state = state.set('userBankItems', action.data.datas.list);
        state = state.set('canAddMoreBank', action.data.datas.addFlag);
        state = state.set('apiRes', action.data);
      }
      break;
    
    case WithdrawConstant.REQUEST_BANK_CODES:
      if(action.data.datas){
        state = state.set('bankCodes', action.data.datas);
        state = state.set('apiRes', action.data);
      }
      break;
  }


  return state;
}