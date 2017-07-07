import React, { Component, PropTypes } from "react";
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import Back from '../components/Back';
import GameItems from '../components/GameItems';
import {loadLiveSportElectGames} from '../actions/AppAction';

import LoadingComponent from '../components/LoadingComponent';

class GameContainer extends LoadingComponent {
    
  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(loadLiveSportElectGames());
  }

  componentWillReceiveProps(nextProps) {
    this.closeLoading();
  }

  render(){
    let liveGames = this.props.app.get('centerGameList');
    const type = this.props.app.get('gameCenterViewType');
    return(
      <div className="page game-page">
        <div>
          <Header {...this.props} className="hgsport-header elect-header">
            <h3>游戏大厅</h3>
          </Header>
          
          <div className="game-list-wrap">
            <GameItems {...this.props} viewType={type} list={liveGames} />
          </div>

          <FooterMenu />

       
        </div>
      </div>
    )
  }
} 


function mapStateToProps(state) {
  const {userModule, app,liveGame} = state;
  return {
    userModule, app,liveGame
  };
}

export default connect(mapStateToProps)(withRouter(GameContainer));


