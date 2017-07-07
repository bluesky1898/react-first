import React, { Component, PropTypes } from "react";
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import GameItem from './GameItem';
class GameItems extends Component {

  constructor(props){
    super(props);
    this.information = {
      card: {
        name:"棋牌游戏",
        id: "qpyx"
      }, live: {
        name:"真人视讯",
        id: "zrsx"
      }, cp: {
        name:"彩票游戏",
        id: "cpyx"
      }, slot: {
        name:"电子游戏",
        id: "dzyx"
      },sport: {
        name:"体育赛事",
        id: "tyss"
      }
    }
  }

  render() {
    const list = this.props.list;
    if(!list.length){
      return false;
    }
    let gameBrands = {};
    let gameItems = {};
    list.map(item => {
      gameBrands[item.menuCode] = {
        name: item.menuName,
        id: item.menuCode,
        icon: item.smallPic
      };
      gameItems[item.menuCode] = item.flatMenuList;
    });
    let htmls = [];
    for(let flat in gameBrands){
      if(!gameItems[flat]) {
        continue;
      }
      htmls.push(
        <GameItem {...this.props} key={flat} gameId={flat} gameTitle={gameBrands[flat]} gameSubList={gameItems[flat]} />
      );
    }
    return <div>{htmls}</div>
  }
}

export default GameItems;

