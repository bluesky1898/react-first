import {combineReducers} from 'redux';

import app from './App.js';
import userModule from '../modules/user/reducers';
import promotion from './Promotion';
import liveGame from './Live';
import elect from './Elect';
import sport from './Sport';
import lotteryModule from '../modules/lottery/reducers';
import hgsport from '../modules/hgsport/reducers';
import bbin from './Bbin';
import cards from './Cards';
import brick from './Brick';

const reducers = combineReducers({
  userModule,
  lotteryModule,
  app,
  promotion,
  liveGame,
  elect,
  sport,
  bbin,
  hgsport,
  cards,
  brick
});

export default reducers;