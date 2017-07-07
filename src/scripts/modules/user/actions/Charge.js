import * as ChargeConstant from '../constants/ChargeConstant';

import {get, post} from '../../../utils/url';
import {chargeRecordHistoryAPI,
payWithOnlineQuickAPI,
companyQuickPaymentsAPI,
companyBankPaymentsAPI,
saveCompanyThirdPaymentAPI,
saveCompanyBankPaymentAPI,
chargePaymentItemsAPI,
saveScanPaymentAPI,
onlineScanPaymentAPI,
offlineScanPaymentAPI,
bankPaymentAPI,
paywayItemsAPI,
onlineQuickPaymentsAPI} from '../utils/API';
import {format} from '../../../utils/datetime';

export function loadChargeRecord(time, pageNo = 1, pageSize = 10,cb = () => {} ) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(chargeRecordHistoryAPI(), {
      userName,
      time,
      pageNo,
      pageSize
    })
    .then(res => res.json())
    .then(json => {
      cb(json);
      dispatch({
        type: ChargeConstant.REQUEST_CHARGE_RECORD_HISTORY,
        pageNo,
        pageSize,
        timeType: time,
        data: json
      });
    });
  };
}

export function payWithOnlineQuick(money, payType, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(payWithOnlineQuickAPI(), {
      userName,
      money,
      payType,
      client: 1
    })
    .then( res => res.json())
    .then(data => {
      cb(data);
    });
  };
}

export function loadOnlineQuickPayments() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(onlineQuickPaymentsAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_ONLINE_QUICK_PAYMENTS,
        data
      });
    });
  };
}

export function loadCompanyQuickPayments() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(companyQuickPaymentsAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_COMPANY_QUICK_PAYMENTS,
        data
      });
    });
  };
}

export function loadCompanyBankPayments() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(companyBankPaymentsAPI(), {
      userName
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_COMPANY_BANK_PAYMENTS,
        data
      });
    });
  };
}

// 获取充值支付列表 - 包括 在线支付 扫码支付 银行到账
export function loadChargePaymentItems() {
  return (dispatch, getState) => {
    dispatch(_loadOnlineScanPayment());
    dispatch(_loadOfflineScanPayment());
    dispatch(_loadBankScanPayment());
    dispatch(_loadPaywayItems());
  };
}

function _loadOnlineScanPayment() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(onlineScanPaymentAPI(), {userName})
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_ONLINE_SCAN_PAYMENT,
        data
      });
    });
  }
}

function _loadOfflineScanPayment() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(offlineScanPaymentAPI(), {userName})
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_OFFLINE_SCAN_PAYMENT,
        data
      });
    });
  }
}

function _loadBankScanPayment() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(bankPaymentAPI(), {userName})
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_BANK_SCAN_PAYMENT,
        data
      });
    });
  }
}

function _loadPaywayItems() {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(paywayItemsAPI(), {userName})
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ChargeConstant.REQUEST_PAYWAY_ITEMS,
        data
      });
    });
  }
}

export function saveCompanyThirdPayment(money, time, payNo, hkName, hkType, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(saveCompanyBankPaymentAPI(), {
      userName,
      money,
      time,
      payNo,
      hkName,
      hkType,
      client: ChargeConstant.CLIENT_MOBILE
    })
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  };
}

export function saveWebsiteChargePayment(money, payNo, payType, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    let time = format(null, "Y-m-d HH:mm:ii");
    post(saveCompanyBankPaymentAPI(), {
      userName,
      money,
      time,
      payNo,
      hkName: "网页支付",
      hkType: "网页支付",
      client: ChargeConstant.CLIENT_MOBILE
    })
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  }
}

export function saveScanPayment(money, payType, account, cb = () => {}) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    post(saveScanPaymentAPI(), {
      userName,
      money,
      payType,
      account,
      client: ChargeConstant.CLIENT_MOBILE
    })
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  };
}

export function saveCompanyBankPayment(money, payNo, time, payType, hkName, companyBank = '',  hkUserBank = '', cb = () => {} ) {
  return (dispatch, getState) => {
    let userName = getState().userModule.user.get('auth').get('userName');
    let params = {
      userName,
      money,
      payNo,
      time,
      hkName,
      hkType: payType,
      client: ChargeConstant.CLIENT_MOBILE
    };

    post(saveCompanyBankPaymentAPI(), params)
    .then(res => res.json())
    .then(data => {
      cb(data);
    });
  };
}