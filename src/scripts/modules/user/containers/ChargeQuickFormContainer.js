import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import t from 'tcomb-form';

import Header from '../components/Header';
import Back from '../../../components/Back';
import ThirdChargeForm from '../components/ThirdChargeForm';
import CompanyChargeForm from '../components/CompanyChargeForm';
import LoadingComponent from '../../../components/LoadingComponent';
import {parseQuery} from '../../../utils/url';
import FormNotice from '../../../components/FormNotice';
import {alert} from '../../../utils/popup';
import {RES_OK_CODE} from '../../../constants/AppConstant';
import {PAY_TYPE_WEIXIN, PAY_TYPE_ALIPAY, PAY_TYPE_CAIFUTONG} from '../constants/ChargeConstant';
import { loadChargePaymentItems, payWithOnlineQuick, saveScanPayment } from '../actions/Charge'; 

const onlineFormFields = t.struct({
  count: t.Number
});

const countInput = t.form.Form.templates.textbox.clone({
  renderInput(locals) {
    let value = locals.value;
    if (value == 0) value = '';
    return <input onChange={locals.attrs.onChange} placeholder={locals.attrs.placeholder} value={value} />
  }
});

const onlineFormOptions = {
  fields: {
    count: {
      label: '充值金额',
      attrs: {
        placeholder: '',
      },
      template: countInput
    }
  }
};

const offlineChargeFields = t.struct({
  count: t.maybe(t.Number),
  account: t.maybe(t.String)
});

const offlineChageOptions = {
  fields: {
    count: {
      label: '充值金额:',
      attrs: {
        placeholder: '',
      },
      template: countInput
    },
    account: {
      label: '帐号',
      attrs: {
        placeholder: '',
      },
      template: countInput
    }
  }
};

const Form = t.form.Form;

class ChargeQuickFormContainer extends LoadingComponent {

  constructor(props) {
    super(props);
    const {location, match} = this.props;
    let query = parseQuery(location.search);
    this.thirdPayId = query.thirdPayId;
    this.payNo = query.payNo;
    this.type = match.params.way.toLowerCase();
    this.onProcess = false;
    this.noticeMessages = {
      online: {
        [PAY_TYPE_ALIPAY]: 'onlineAlipay',
        [PAY_TYPE_WEIXIN]: 'onlineWx',
        [PAY_TYPE_CAIFUTONG]: 'onlineTenpay',
      },
      offline: {
        [PAY_TYPE_ALIPAY]: 'traditAlipay',
        [PAY_TYPE_WEIXIN]: 'traditWx',
        [PAY_TYPE_CAIFUTONG]: 'traditTenpay',
      },
    };
    this.msgId = null;
    this.loadCrtChannel();
    this.chargeOnlineSubmit = this.chargeOnlineSubmit.bind(this);
    this.changeOnScanSubmit = this.changeOnScanSubmit.bind(this);
    this.state = {
      onlineCharge: {
        count: ''
      },
      offlineCharge: {
        count: '',
        account: ''
      },
      title: '',
      minCharge: '', // 最低充值金额
      maxCharge: '', // 最大充值金额
    };
  }

  componentDidMount() {
    this.openLoading();
    this.resetTitleAndFormOption(this.props);
  }

  resetTitleAndFormOption(props) {
    const {app} = props;
    let formInformation = app.get('formInformation');
    if (this.channel) {
      let title = '';
      let minEdu = 0;
      let maxEdu = 0;
      title = this.channel.payName;
      if (this.channel.payType == PAY_TYPE_ALIPAY) {
        //offlineChageOptions.fields.account.attrs.placeholder = formInformation.member.fast_scan_code_pay_ali_account.informationValue;
        offlineChageOptions.fields.account.label = '支付宝帐号:';
      } else if (this.channel.payType == PAY_TYPE_WEIXIN) {
        //title = '传统微信充值';
        //offlineChageOptions.fields.account.attrs.placeholder = formInformation.member.fast_scan_code_pay_wx_account.informationValue;
        offlineChageOptions.fields.account.label = '微信帐号:';
      } else if (this.channel.payType == PAY_TYPE_CAIFUTONG) {
        //title = '传统财付通充值';
        //offlineChageOptions.fields.account.attrs.placeholder = '输入扫码支付的财付通帐号';
        offlineChageOptions.fields.account.label = '财付通帐号:';
      }
      
      if (this.type == 'online') {
        minEdu = this.channel.payMinEdu;
        maxEdu = this.channel.payMaxEdu;
        if (this.channel.payType == PAY_TYPE_ALIPAY) {
          title = '在线支付宝充值';
        } else if (this.channel.payType == PAY_TYPE_WEIXIN) {
          title = '在线微信充值';
        } else if (this.channel.payType == PAY_TYPE_CAIFUTONG) {
          title = '在线财付通充值';
        }
      } else if (this.type == 'offline') {
        if (this.channel.minEdu) {
          minEdu = this.channel.minEdu;
          maxEdu = this.channel.maxEdu;
        }
      }

      this.setState({
        title,
        minCharge: minEdu,
        maxCharge: maxEdu,
      });
      //onlineFormOptions.fields.count.attrs.placeholder = '最低金额'+minEdu+'元';
      //onlineFormOptions.fields.count.attrs.placeholder = formInformation.member.fast_online_pay_moeny.informationValue;
      //offlineChageOptions.fields.count.attrs.placeholder = '最低金额'+minEdu+'元';
      
      this.setState({
        onlineCharge: {
          count: 0
        },
        offlineCharge: {
          count: 0,
          account: 0
        }
      });
    }
  }

  loadCrtChannel(props = null) {
    if (!props) props = this.props;
    // 线上快捷支付
    if (this.type == 'online') {
      let channels = props.charge.get('onlineQuickPayments');
      for (let item of channels) {
        if (item.thirdPayId == this.thirdPayId) {
          this.channel = item;
          break;
        }
      }

      if (this.channel) {
        this.msgId = this.noticeMessages['online'][this.channel.payType];
      }

    } else if (this.type == 'offline'){
      let channels = props.charge.get('offlineQuickPayments');
      for (let item of channels) {
        if (item.payNo == this.payNo) {
          this.channel = item;
          break;
        }
      }

      if (this.channel) {
        this.msgId = this.noticeMessages['offline'][this.channel.payType];
      }
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadChargePaymentItems());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
    this.loadCrtChannel(nextProps);
    this.resetTitleAndFormOption(nextProps);
  }

  changeOnScanSubmit() {
    if (this.onProcess) {
      return ;
    }
    let payment = this.channel;
    const {dispatch, history} = this.props;
    let formValues = this.state.offlineCharge
    formValues.count = formValues.count * 1;
    if (!formValues.count) {
      alert('请输入金额');
    } else if (formValues.count < this.state.minCharge && this.state.minCharge > 0) {
      alert('最低金额'+this.state.minCharge+'元');
    } else if (formValues.count > this.state.maxCharge && this.state.maxCharge > 0 ) {
      alert('最高金额'+this.state.maxCharge+ '元');
    } else if (formValues.account == '') {
      alert('请'+offlineChageOptions.fields.account.attrs.placeholder);
    } else {
      const {charge} = this.props;
      let money = formValues.count;
      let account = formValues.account;
      if (payment) {
        let _this = this;
        this.openLoading();
        this.onProcess = true;
        dispatch(saveScanPayment(money, payment.payType, account, (data) => {
          _this.closeLoading();
          _this.onProcess = false;
        
          if (data.errorCode == RES_OK_CODE) {
            alert('入款成功, 请耐心等待审核', (popup) => {
              popup.close();
              console.log('closed');
              history.goBack();
            });
          } else {
            alert(data.msg);
          }
        }));
      }
    }
  }

  chargeOnlineSubmit() {
    if (this.onProcess) {
      return ;
    }
    let payment = this.channel;
    const {dispatch} = this.props;
    let formValues = this.refs.onlineChargeForm.getValue();
    if (!formValues) {
      alert('请输入金额');
    } else if (formValues.count < this.minCharge) {
      alert('最低金额'+this.minCharge+'元');
    } else if (formValues.count > this.maxCharge) {
      alert('最高金额'+this.maxCharge+ '元');
    } else {
      const {charge} = this.props;
      let money = formValues.count;
      let bankCode = this.platform;
      if (payment) {
        let _this = this;
        this.openLoading();
        this.onProcess = true;
        dispatch(payWithOnlineQuick(money, payment.payType, (data) => {
          _this.closeLoading();
          _this.onProcess = false;
        
          if (data.errorCode == RES_OK_CODE) {
            let windowReference = window.open();
            let href = '/user/goPayCenter';
            href = href + '?pay_url='+data.datas.pay_url + '&sendParams=' + data.datas.sendParams;
            windowReference.location = href;
          } else {
            alert(data.msg);
          }
        }));
      }
    }
  }

  onlineChargeForm() {
    return (
      <div className="form-type2 charge-form">
        <div className="inner">
          <Form ref="onlineChargeForm" 
            options={onlineFormOptions}
            value={this.state.onlineCharge} 
            type={onlineFormFields}></Form>
            <FormNotice msg={this.msgId}></FormNotice>
          <div className="btn-wrap">
            <button className="btn btn-light-blue" onClick={this.chargeOnlineSubmit}>确定充值</button>
          </div>
        </div>
      </div>);
  }

  offlineChargeForm() {
    return (
      <div className="form-type2 charge-form">
        <div className="inner">
          <img src={this.channel && this.channel.picUrl} alt=""/>
          <p className="name">{this.channel && this.channel.payRname}</p>
          <Form ref="offlineChargeForm"
            value={this.state.offlineCharge}
            onChange={ (value) => {this.setState({offlineCharge: value});  } }
            options={offlineChageOptions}
            type={offlineChargeFields} />
            <FormNotice msg={this.msgId}></FormNotice>
          <div className="btn-wrap"><button onClick={this.changeOnScanSubmit} className="btn btn-light-blue">提交表单</button></div>
        </div>
      </div>
    );
  }

  render() {

    return (
      <div className="charge-quick-form-page page">
        <div className="inner">
          <Header {...this.props}>
            <Back />
            <h3>{this.state.title}</h3>
          </Header>
          <div className="page-body">
            {this.type == 'online' ? this.onlineChargeForm(): this.offlineChargeForm()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule,
    app,
    charge: userModule.charge
  };
}

export default connect(mapStateToProps)(withRouter(ChargeQuickFormContainer));