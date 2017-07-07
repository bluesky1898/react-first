import {combineReducers} from 'redux';

import user from './User';
import message from './Message';

import bank from './Bank';
import chargeRecord from './ChargeRecord';
import platform from './Platform';
import order from './Order';
import transferlog from './TransferLog';
import withdraw from './Withdraw';
import charge from './Charge';

const reducers = combineReducers({
  user,
  message,
  bank,
  chargeRecord,
  platform,
  order,
  withdraw,
  transferlog,
  charge
});

export default reducers;