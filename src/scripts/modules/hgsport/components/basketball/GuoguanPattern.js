// 综合过关入球
import React, {Component, PropTypes} from 'react';
import {buildQuery} from '../../../../utils/url';
import BasePatter from '../BasePattern';

class GuoguanPattern extends BasePatter {

  render() {
    const event = this.props.score;
    return (
      <table className="sport score-board">
        <thead>
          <tr className="pink-board">
            <th>场次</th>
            <th>独赢</th>
            <th>让球</th>
            <th>大小</th>
            <th>单双</th>
          </tr>
        </thead>
        <tbody>
          <tr className="white-board">
            <td rowSpan="3">全场</td>
            <td><span><a  onClick={this.handleGoOrderClick.bind(this ,'p3', 'dy', 'dy', 'H', 'f') }>{event.iorMh}</a></span></td>
            <td>{event.strong == 'H' ? event.ratio:'' } <span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3', 'rq', 'rq', 'H', 'f')}>{event.iorPrh}</a></span></td>
            <td>{ event.iorPouc != '' && <span><span>大{event.ratioU }</span><span className="red"><a  onClick={this.handleGoOrderClick.bind(this, 'p3','dx','dx','H','f')}>{event.iorPouc}</a></span></span> } </td>
            <td><span></span><span className="red"><a  onClick={this.handleGoOrderClick.bind(this, 'p3','ds','ds','H','f')}>{event.iorPeoo }</a></span></td>
          </tr>
          <tr className="white-board">
            <td><span><a  onClick={this.handleGoOrderClick.bind(this,'p3','dy','dy','C','f')}>{event.iorMc }</a></span></td>
            <td><span>{event.strong == 'C' ? event.ratioO : '' }</span> <span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3','rq','rq','C','f')}>{event.iorPrc }</a></span></td>
            <td>{event.iorPouh != '' &&  <span>小{event.ratioO }<span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3','dx','dx','C','f')}>{event.iorPouh }</a></span></span> }</td>
            <td><span className="red"><a  onClick={this.handleGoOrderClick.bind(this, 'p3','ds','ds','C','f')}>{event.iorPeoe}</a></span></td>
          </tr>
          <tr className="white-board">
            <td><span><a  onClick={this.handleGoOrderClick.bind(this,'p3','dy','dy','N','f')}>{event.iorMn}</a></span></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="pink-board">
            <td rowSpan="3">下半</td>
            <td><span><a  onClick={this.handleGoOrderClick.bind(this,'p3','dy','dy','H','h')}>{event.iorHmh}</a></span></td>
            <td>{event.hstrong == 'H' ? event.hratio: ''} <span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3','rq','rq','H','h')}>{event.iorHprh}</a></span></td>
            <td><span>大{event.hratioU }</span><span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3','dx','dx','H','h')}>{event.iorHpouc}</a></span></td>
            <td></td>
          </tr>
          <tr className="pink-board">
            <td><span><a  onClick={this.handleGoOrderClick.bind(this,'p3','dy','dy','C','h')}>{event.iorHmc}</a></span></td>
            <td>{event.hstrong == 'C' ? event.hratio: ''} <span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3','rq','rq','C','h')}>{event.iorHprc}</a></span></td>
            <td><span>小{event.hratioO }</span><span className="red"><a  onClick={this.handleGoOrderClick.bind(this,'p3','dx','dx','C','h')}>{event.iorHpouh}</a></span></td>
            <td></td>
          </tr>
          <tr className="pink-board">
            <td><span><a  onClick={this.handleGoOrderClick.bind(this,'p3','dy','dy','N','h')}>{event.iorHmn}</a></span></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default GuoguanPattern;