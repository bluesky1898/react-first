import React, { Component, PropTypes } from "react";
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';

import {setGameCenterViewType, getLiveLoginData, getElectGameLoginData} from '../actions/AppAction';
import {alert} from '../utils/popup';
import {RES_OK_CODE} from '../constants/AppConstant';
import {staticURL} from '../utils/url';

import LoadingComponent from './LoadingComponent';

class GameItem extends LoadingComponent {

  constructor(props){
    super(props);
    this.state = {
      show : false,
      iconDirection : false
    }
  }

  componentDidMount() {
    //
  }

  componentWillReceiveProps(nextProps) {
    
  }

  onGameItemClick(type, item) {
    let windowReference;
    const {dispatch, userModule, history} = this.props;
    let isLogin = userModule.user.get('auth').get('isLogin');
    let _this = this;
    switch (type.toLowerCase()) {
      case 'card':
        if (isLogin) {
          _this.openLoading();
          windowReference = window.open();
          dispatch(getLiveLoginData(item.flatCode, (data) => {
            _this.closeLoading();
            if (data.errorCode == RES_OK_CODE) {
              windowReference.location = data.datas;
            }
          }, item.gameCode));
        } else {
          alert('请先登录');
        }
        break;

      case 'lottery':
        history.push(`/lottery/betcenter/${item.flatCode}/home`);
        break;

      case 'live':
        if (isLogin) {
          _this.openLoading();
          windowReference = window.open();
          dispatch(getLiveLoginData(item.flatCode, (data) => {
            _this.closeLoading();
            if (data.errorCode != RES_OK_CODE) {
              alert(data.msg);
            } else {
              windowReference.location = data.datas;
            }
          }, item.gameCode));
        } else {
          alert('请先登录');
        }
        break;

      case 'electronic':
        if (item.flatCode == 'ag') {
          if (isLogin) {
            _this.openLoading();
            windowReference = window.open();
            dispatch(getElectGameLoginData(item.flatCode, item.gameCode, (data) => {
              _this.closeLoading();
              if (data.errorCode == RES_OK_CODE) {
                windowReference.location = data.datas;
              } else {
                alert(data.msg);
              }
            }));
          } else {
            alert('请先登录');
          }
        } else {
          history.push(`/elect/game/${item.flatCode}/all`);
        }
        break;

      case 'bbin':
        if (!isLogin) {
          alert('请先登录');
        } else {
          _this.openLoading();
          windowReference = window.open();
          dispatch(getLiveLoginData(item.flatCode, (data) => {
            _this.closeLoading();
            if (data.errorCode == RES_OK_CODE) {
              windowReference.location = data.datas;
            } else {
              alert(data.msg);
            }
          }, item.gameCode));
        }
        break;

      case 'sport':
        if (item.flatCode == 'huangguan') {
          history.push('/hgsport');
        } else if (item.flatCode == 'sb') {
          _this.openLoading();
          if (!isLogin) {
            alert('请先登录');
          } else {
            windowReference = window.open();
            dispatch(getLiveLoginData(item.flatCode, (data) => {
              _this.closeLoading();
              if (data.errorCode == RES_OK_CODE) {
                windowReference.location = data.datas;
              } else {
                alert(data.msg);
              }
            }));
          }
        }
        break;
    }
  }

  showItem(type) {
    const {dispatch} = this.props;
    if (this.state.show) {
      dispatch(setGameCenterViewType(''));
    } else {
      dispatch(setGameCenterViewType(type));
    }
  }

  render() {
    const state = this.state;
    const gameTitle = this.props.gameTitle;
    const gameId = this.props.gameId;
    const list = this.props.gameSubList;
    const viewType = this.props.viewType;
    console.log(gameId,viewType);
    if (viewType == gameId) {
      this.state.show = true;
      this.state.iconDirection = true;
    } else {
      this.state.show = false;
      this.state.iconDirection = false;
    }
    let _this = this;

    return(
      <div className="game-item">
        <div className="game-style-common game-name" onClick={this.showItem.bind(this, gameId)}>
          <div className={"game-style-wrap "+(state.iconDirection ? "iconDown" : "")}>
            <i className={"icon"} style={ {backgroundImage: 'url('+staticURL(gameTitle.icon)+')'} } ></i>
            <span>{gameTitle.name}</span>
          </div>
        </div>
        
        <div className={"game-list "+(state.show ? "" : "hide")}>
          {list.map(function(item,index){
            return(
              <a onClick={_this.onGameItemClick.bind(_this, viewType, item)} key={index}>
                <div className="game-style-common">
                  <div className="game-style-wrap">
                    <i className="icon" style={ {backgroundImage: 'url('+staticURL(item.smallPic)+')'} }></i>
                    <span style={ {border: 'none'} }>{item.flatName}</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    )
  }
} 

export default withRouter(GameItem);


