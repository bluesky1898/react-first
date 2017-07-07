// 半场 & 全场 
import React, {Component, PropTypes} from 'react';
import {buildQuery} from '../../../../utils/url';
import BasePattern from '../BasePattern';

class HalfAllPattern extends BasePattern {

  render() {
    const event = this.props.score;
    return (
      <table className="sport score-board">
        <thead>
          <tr className="pink-board">
            <th>主 / 主</th>
            <th>主 / 和</th>
            <th>主 / 客</th>
          </tr>
        </thead>
        <tbody>
          <tr className="pink-board">
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'H_H', 'dy', 'H', 'f')}>{event.iorFhh}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'H_N', 'dy', 'H', 'f')}>{event.iorFhn}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'H_C', 'dy', 'H', 'f')}>{event.iorFhc}</a></span></td>
          </tr>
          <tr className="white-board">
            <td>和 / 主</td>
            <td>和 / 和</td>
            <td>和 / 客</td>
          </tr>
          <tr className="pink-board">
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'N_H', 'dy', 'H', 'f')}>{event.iorFnh}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'N_N', 'dy', 'H', 'f')}>{event.iorFnn}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'N_C', 'dy', 'H', 'f')}>{event.iorFnc}</a></span></td>
          </tr>
          <tr className="white-board">
            <td>客 / 主</td>
            <td>客 / 和</td>
            <td>客 / 客</td>
          </tr>
          <tr className="pink-board">
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'C_H', 'dy', 'H', 'f')}>{event.iorFch}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'C_N', 'dy', 'H', 'f')}>{event.iorFcn}</a></span></td>
            <td><span className="red"><a onClick={this.handleGoOrderClick.bind(this,'f', 'C_C', 'dy', 'H', 'f')}>{event.iorFcc}</a></span></td>
          </tr>
        </tbody>
      </table>
    )
  }
}; 

export default (HalfAllPattern);