import React, {Component, PropTypes} from 'react';
import Lucky28Ball from '../../../OpenResultStyle/Lucky28Ball';

import {range} from '../../../../utils/helper';

class TM extends Component {

  constructor(props) {
    super(props);
  }

  onPeiyuSelected(item) {
    this.props.onPeiyuSelected(item);
  }

  onTMBSChange(item) {
    let num1 = this.refs.tmbs_1.value;
    let num2 = this.refs.tmbs_2.value;
    let num3 = this.refs.tmbs_3.value;
    item.number = [num1, num2, num3].join(',');
  }
  
  renderBall(peiyuItem) {
    let number = peiyuItem.number;
    if (isNaN(number * 1 )) {
      return <span className={peiyuItem.id}>{number}</span>
    } else {
      return <Lucky28Ball num={peiyuItem.number*1}/>;
    }
  }

  renderTMBS(item) {
    const {peiyu, selectedPeiyu} = this.props;
    return (
      <div key={item.id} className="pure-u-1-1">
        <div className="pure-u-1-4"><div className="ui-item-son ui-item-son-ball">特码包三</div></div>
        <div className="pure-u-1-2">
          <div className="ui-item-son">
            <select onChange={this.onTMBSChange.bind(this, item)} ref="tmbs_1">
              {range(0, 27).map( num => {
                return <option key={num} value={num}>{num}</option>
              })}
            </select>
            <select onChange={this.onTMBSChange.bind(this, item)} ref="tmbs_2">
              {range(0, 27).map( num => {
                return <option key={num} value={num}>{num}</option>
              })}
            </select>
            <select onChange={this.onTMBSChange.bind(this, item)} ref="tmbs_3">
              {range(0, 27).map( num => {
                return <option key={num} value={num}>{num}</option>
              })}
            </select>
          </div>
        </div>
        <div className="pure-u-1-4">
          <div onClick={this.onPeiyuSelected.bind(this, item)} className="ui-item-son"> <span className={"peiyu " + (!selectedPeiyu[item.id] ? '': 'selected') }>{item.pl}</span></div>
        </div>
      </div>
    );
  }

  render() {
    const {peiyu, selectedPeiyu} = this.props;
    if (peiyu.length <= 0) {
      return <p>加载中</p>;
    }
    return (
      <div className="table4-column">
        <div className="head-2_2">
          <ul className="clearfix">
            <li>号码</li>
            <li>赔率</li>
            <li>号码</li>
            <li>赔率</li>
          </ul>
        </div>
        <div className="table4-body">
          <div className="pure-g">
            {peiyu.map((item, index) => {
              if (item.id == 'TM-KL8TM-TMSB') {
                return this.renderTMBS(item);
              }
              return (<div key={index} className="pure-u-1-2">
                <div className="pure-u-1-2">
                  <div className="ui-item-son ui-item-son-ball">
                    {this.renderBall(item)}
                  </div>
                </div>
                <div className="pure-u-1-2">
                  <div onClick={this.onPeiyuSelected.bind(this, item)} className="ui-item-son"> <span className={"peiyu " + (!selectedPeiyu[item.id] ? '': 'selected') }>{item.pl}</span></div>
                </div>
              </div>);
            })}
          </div>
        </div>
      </div>
    );
  }
};

TM.defaultProps = {
  peiyu: [],
  onPeiyuSelected: () => {},
  selectedPeiyu: {},
};

TM.propTypes = {
  peipy: PropTypes.array,
  onPeiyuSelected: PropTypes.func,
  selectedPeiyu: PropTypes.object
};

export default TM;