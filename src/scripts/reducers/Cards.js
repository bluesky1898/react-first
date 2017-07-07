import {Map, List} from 'immutable';
import {REQUEST_CARDS_ITEMS, RES_OK_CODE} from '../constants/AppConstant';

const initState = Map({
  items: [],
});

const menuCode = 'card';

export default function Cards(state = initState, action) {
  switch (action.type) {
    case REQUEST_CARDS_ITEMS:
      if (RES_OK_CODE == action.data.errorCode) {
        for (let _m of action.data.datas) {
          if (_m.menuCode == menuCode) {
            state = state.set('items', _m.flatMenuList);
          }
        }
      }
      break;
  }
  return state;
}