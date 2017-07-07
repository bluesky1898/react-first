import {Map, List} from 'immutable';
import * as ChargeConstant from '../constants/ChargeConstant';
import {RES_OK_CODE} from '../../../constants/AppConstant';

const initState = Map({
  apiRes: {

  },
  onlineQuickPayments: [], // 线上支付 -直接到账
  offlineQuickPayments: [], // 线下扫码
  companyBankPayments: [], // 公司银行卡支付
  bankTransferTypeList: [], // 付款方式列表
  chargePaymentItems: [],
});

export default function Message(state = initState, action) {
  
  switch (action.type) {

    case ChargeConstant.REQUEST_ONLINE_SCAN_PAYMENT:
      state = state.set('onlineQuickPayments', action.data.datas);
      break;

    case ChargeConstant.REQUEST_OFFLINE_SCAN_PAYMENT:
      state = state.set('offlineQuickPayments', action.data.datas);
      break;

    case ChargeConstant.REQUEST_BANK_SCAN_PAYMENT:
      state = state.set('companyBankPayments', action.data.datas);

      break;

    case ChargeConstant.REQUEST_PAYWAY_ITEMS:
      state = state.set('bankTransferTypeList', action.data.datas);
    
  }

  return state;
}