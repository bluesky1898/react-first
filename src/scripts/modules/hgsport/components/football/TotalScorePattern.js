// 总入球
import React, {Component, PropTypes} from 'react';
import {buildQuery} from '../../../../utils/url';
import BasePattern from '../BasePattern';

class onClicktalScorePattern extends BasePattern {

  render() {
    const event = this.props.score;
    return (
      <table className="sport score-board">
        <thead>
          <tr className="pink-board">
            <th>0 - 1</th>
            <th>2 - 3</th>
            <th>4 - 6</th>
            <th>7或以上</th>
          </tr>
        </thead>
        <tbody>
          <tr className="white-board">
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'t','0_1','dy','N','f')}>{event.iorT01}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'t','2_3','dy','N','f')}>{event.iorT23}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'t','4_6','dy','N','f')}>{event.iorT46}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'t','7up','dy','N','f')}>{event.iorOver}</a></span></td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default onClicktalScorePattern;