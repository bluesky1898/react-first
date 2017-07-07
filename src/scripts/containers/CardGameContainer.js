import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Back from '../components/Back';
import LoadingComponent from '../components/LoadingComponent';
import {loadLiveSportElectGames, bodyClass, getLiveLoginData} from '../actions/AppAction';
import {RES_OK_CODE} from '../constants/AppConstant';
import FooterMenu from '../components/FooterMenu';
import {alert} from '../utils/popup';
class CardGameContainer extends LoadingComponent {
  
  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadLiveSportElectGames());
    bodyClass('cards-body');
  }

  componentWillUnmount() {
    bodyClass('');
  }

  onItemClick(item) {
      const {dispatch, userModule} = this.props;
      let isLogin = userModule.user.get('auth').get('isLogin');
      if (!isLogin) {
        alert('请先登录');
      } else {
        let gameCode = item.gameCode;
        let _this = this;
        _this.openLoading();
        dispatch(getLiveLoginData(item.flatCode, (data) => {
          _this.closeLoading();
          if (data.errorCode == RES_OK_CODE) {
            window.open(data.datas);
          } else {
            alert(data.msg);
          }
        }, gameCode));
      }
    }

  render() {
    const {cards} = this.props;
    let _this = this;
    return (
      <div className="page page-cardgame">
        <Header {...this.props}>
          <Back />
          <h3>棋牌游戏</h3>
        </Header>
        <div className="page-body">
          <div className="cards">
            <div className="inner">
              {cards.get('items').map(card => {
                return <div key={card.flatName} onClick={_this.onItemClick.bind(_this, card)} className="card-item">
                  <div className="inner">
                    <img src={card.bigPic}  />
                    <h3>{card.flatName}</h3>
                  </div>
                </div>
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {app, userModule, cards} = state;

  return {
    app, userModule, cards
  };
}

export default connect(mapStateToProps)(CardGameContainer);