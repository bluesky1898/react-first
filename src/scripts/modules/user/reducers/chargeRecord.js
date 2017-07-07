import {Map, List} from 'immutable';
import * as ChargeConstant from '../constants/ChargeConstant';

const initState = Map({
  apiRes: {},
  recordHistories: {
    today: [],
    oneweek: [],
    onemonth: [],
    threemonth: []
  },
  orderItemsHasMore: true,
});
export default function chargeRecord(state = initState, action) {
  switch (action.type) {
    case ChargeConstant.REQUEST_CHARGE_RECORD_HISTORY:
      let pageNo = action.pageNo;
      let pageSize = action.pageSize;
      let timeType = action.timeType;
      
      if (action.data.datas.length >= pageSize) {
        state = state.set('orderItemsHasMore', true);
      } else {
        state = state.set('orderItemsHasMore', false);
      }

      if ( action.data.datas.length > 0 ) {
        if ( pageNo == 1 ) {
          let recordHistories = state.get('recordHistories');
          recordHistories[timeType] = action.data.datas;
          state = state.set('recordHistories', recordHistories);
        } else {
          let oldRecords = state.get('recordHistories');
          if (typeof oldRecords[timeType] == 'undefined') {
            oldRecords[timeType] = [];
          }

          oldRecords[timeType] = oldRecords[timeType].concat(action.data.datas);

          state = state.set('recordHistories', oldRecords);
        }
      }
      state = state.set('apiRes', action.data);
      break;
  }
  return state;
}