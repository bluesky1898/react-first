import {buildQuery} from '../../../utils/url';

export const userInfoAPI = (name) => {
  return `/member/user/userInfo`;
};

export const userMessageAPI = () => {
  return `/member/message/list`;
}

export const chargeRecordHistoryAPI = () => {
  return `/member/record/deposit`;
}

export const systemMessageAPI = () => {
  return `/message/list`;
}

export const readMessageAPI = () => {
  return `/member/message/detail`;
};

export const loadPlatformItemsAPI = () => {
  return `/electronic/flat`;
};

export const loadEduPlatformItemsAPI = () => {
  return `/electronic/flat`;
}

export function loadPlatformBalanceAPI() {
  return `/flat/balance`;
};

export function transferToSystemAPI() {
  return `/flat/withdraw`;
};

export function transferToPlatformAPI() {
  return `/flat/deposit`;
};

export function orderHistoryAPI() {
  return `/flat/record`;
};

export function transferLogAPI() {
  return `/member/record/edu`;
}

export function changePwdAPI() {
  return `/member/password/login`;
}

export function changeWithdrawAPI() {
  return `/member/password/withdraw`;
}

export function withdrawLogsAPI() {
  return `/member/record/withdraw`;
}

export function deleteMessageAPI() {
  return `/member/message/delete`;
}

export function countMessageAPI() {
  return `/member/message/count`;
}

export function payWithOnlineQuickAPI() {
  return `/member/pay/online/saoma`;
}

export function onlineQuickPaymentsAPI() {
  return `/member/user/selectFastPayList`;
}

export function companyQuickPaymentsAPI() {
  return `/member/user/selectIncFastPayList`;
}

export function companyBankPaymentsAPI() {
  return `/member/user/selectIncBankPayList`;
}

export function saveCompanyThirdPaymentAPI() {
  return `/member/user/saveIncFastPay`;
}

export function saveCompanyBankPaymentAPI() {
  return `/member/pay/chuantong/bank`;
}

export function userBankListAPI() {
  return `/member/bank/user`;
}

export function bankCodesAPI() {
  return `/member/bank/list`;
}

export function saveBankAPI() {
  return `/member/bank/bind`;
}

export function userWithdrawAPI() {
  return `/member/user/withdraw`;
}

export function loginAPI() {
  return `/user/login`;
}

export function registerAPI() {
  return `/user/register`;
}

export function logoutAPI() {
  return `/user/logout`;
}

export function banklistAPI() {
  return `/member/bank/list`;
}

export function securityInfoAPI(){
  return `/member/user/log`;
}

export function changeUserBasicInfoAPI(){
  return `/member/user/modify`;
}

export function chargePaymentItemsAPI() {
  return `/member/pay/list`;
}

export function saveScanPaymentAPI() {
  return `/member/pay/chuantong/saoma`;
}
 
export function agentInfoAPI() {
  return `/member/agent/info`;
}

export function agentApplyAPI() {
  return `/member/agent/apply`;
}

export function onlineScanPaymentAPI() {
  return `/member/pay/online/saoma/list`;
}

export function offlineScanPaymentAPI() {
  return `/member/pay/chuantong/saoma/list`;
}

export function bankPaymentAPI() {
  return `/member/pay/chuantong/bank/list`;
}

export function paywayItemsAPI() {
  return `/member/pay/huikuan/list`;
}

export function memberResourceAPI() {
  return `/member/resource`;
}