import React , { Component , PropTypes } from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from  'react-router';


class RaceResultFootball extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      view : {}
    }
  }

  onChangeView(index) {
    let view = this.state.view;
    view = Object.assign(view, {
      ['index_'+index]: !!!view['index_'+index]
    });
    this.setState({
      view
    });
  }

  render() {
    const state = this.state;
    let {items} = this.props;

    return (
      <div className="ball-item">
        {items.map( (item, index) => {
          let view = !!state.view['index_'+index];
          return (
            <div className="item" key={index}>
              <div className="megagame" onClick={this.onChangeView.bind(this, index)}><p>{this.props.name}</p><i className={view ? "arrow-down" : ""}></i></div>
              <table className={view ? "" : "hide"}>
                <tbody>
                  <tr>
                    <td rowSpan="8" className="background-style-1">
                      <p dangerouslySetInnerHTML={ {__html: item.matchRealTime} }></p>
                    </td>
                    <td colSpan="3">
                      <span>{item.teamH}</span> VS <span>{item.teamC}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>半场</td>
                    <td>{ item.hrScoreH}</td>
                    <td>{ item.hrScoreC }</td>
                  </tr>
                  <tr>
                    <td className="color-sty-red">全场</td>
                    <td>{ item.flScoreH }</td>
                    <td>{item.flScoreC}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  }
}

RaceResultFootball.defaultProps = {
  items: []
};

RaceResultFootball.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array
};

export default RaceResultFootball;