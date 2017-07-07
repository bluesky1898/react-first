import React ,{Component, PropsTypes} from 'react';
import {connect} from 'react-redux';
import {Link ,withRouter} from 'react-router';

class OrderRecord extends Component{
  constructor(props){
    super(props);

  }

  orderStatusText(order) {
    let betStatusLabels = {1: '赢', 2: '输', 3: '赢一半', 4: '输一半', 5: '和局退款', 6: '比赛取消', 7: '赔率错误', 8: '比分错误', 9:'盘口错误', 10: '队名错误', 11: '和局取消', 12: '赛事延赛', 13: '赛事腰斩', 14: '进球取消', 15: '正在确认', 16: '未接受注单', 17: '未结算'};
    
    let html = [];
    let betStatus = order['betStatus'];
    html.push(<font key={1}>{betStatusLabels[betStatus]}</font>);
    
    if (betStatus == 1 || betStatus == 2 || betStatus == 3 || betStatus == 4 ) {
      html.push(<font key={2}>{order.betUsrWin}</font>);
    }
    
    return html;
  }

  renderOrderOfP3(order) {
    let details = order.details;
    if (!details) {
      return null;
    }

    return (
      <div className="order-detail pl3-order-detail">
        <p className="item-name">[串关] {details.length} 订单号：<span>{order.betWagersId}</span></p>
        <table>
          <thead>
            <tr>
              <td className="nowrap">投注金额</td>
              <td className="nowrap">可赢金额</td>
              <td className="nowrap">状态</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="nowrap">{order.betIn}</td>
              <td className="nowrap">{order.betCanWin}</td>
              <td className="nowrap">{this.orderStatusText(order)}</td>
            </tr>
          </tbody>
        </table>

        <table className="pl3-table">
          <thead>
            <tr><td>下注内容</td></tr>
          </thead>
          <tbody>
            <tr>
              <td className="pl3-table-back">
                {details.map( (detail, index) => {
                  try {
                    detail.score = JSON.parse(detail['tmp1']); 
                  } catch (e) {
                    detail.score = {};
                  }
                  
                  let dtypeLabels = {
                    'dy': '独赢', 'rq': '让球', 'dx': '大小', 'ds': '单双', 'dx_big': '积分', 'dx_small': '积分', 'rf': '让分', 'pd': '波胆'
                  };
                  return (
                    <table key={index} className="pl3-table table-item">
                      <tbody>
                        <tr>
                          <td><span>{ detail.matchType == 'FT' ? '足球': (detail.matchType == 'BK' ? '篮球': '') } { dtypeLabels[detail.dtype] }</span></td>
                        </tr>
                        <tr>
                          <td>
                            <span dangerouslySetInnerHTML={ {__html: detail.league} }></span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <font dangerouslySetInnerHTML={ {__html: detail.betVs} }></font>
                            {order.status != 2 && detail.timeType == 'roll' && detail.betRqTeam == 'H' ? <span><font dangerouslySetInnerHTML={ {__html: detail.betScoreHCur} }></font>:<font dangerouslySetInnerHTML={ {__html: detail.betScoreCCur} }></font></span>: null}
                            {order.status != 2 && detail.timeType == 'roll' && detail.betRqTeam == 'C' ? <span><font dangerouslySetInnerHTML={ {__html: detail.betScoreCCur} }></font>:<font dangerouslySetInnerHTML={ {__html: detail.betScoreHCur} }></font></span>: null}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {order.status == 2 && detail.matchType == 'FT' && detail.betRqTeam == 'C' ? ( <span>上半场<font dangerouslySetInnerHTML={ {__html: detail.score.hrScoreC} }></font> : <font dangerouslySetInnerHTML={ {__html: detail.score.hrScoreH} }></font></span>): ''}
                            {order.status == 2 && detail.matchType == 'FT' && detail.betRqTeam == 'C' ? ( <span>全场<font dangerouslySetInnerHTML={ {__html: detail.score.flScoreC} }></font> : <font dangerouslySetInnerHTML={ {__html: detail.score.flScoreH } }></font></span>): '' }
                            {order.status == 2 && detail.matchType == 'FT' && detail.betRqTeam == 'H' ? ( <span>上半场<font dangerouslySetInnerHTML={ {__html: detail.score.hrScoreH } }></font> : <font dangerouslySetInnerHTML={ {__html: detail.score.flScoreC } }></font></span>): ''}
                            {order.status == 2 && detail.matchType == 'FT' && detail.betRqTeam == 'H' ? ( <span>全场<font dangerouslySetInnerHTML={ {__html: detail.score.flScoreH} }></font> : <font dangerouslySetInnerHTML={ {__html: detail.score.flScoreC } }></font></span>): ''}
                            {order.status == 2 && detail.matchType != 'FT' && detail.betRqTeam == 'H' ? ( <span>全场<font dangerouslySetInnerHTML={ {__html: detail.score.stageHF} }></font> : <font dangerouslySetInnerHTML={ {__html: detail.score.stageCF } }></font></span>): ''}
                            {order.status == 2 && detail.matchType != 'FT' && detail.betRqTeam == 'C' ? ( <span>全场<font dangerouslySetInnerHTML={ {__html: detail.score.stageCF} }></font> : <font dangerouslySetInnerHTML={ {__html: detail.score.stageHF } }></font></span>): ''}
                          </td>
                        </tr>
                        <tr>
                          <td><font dangerouslySetInnerHTML={ {__html: detail.betOddsDes} }></font></td>
                        </tr>
                        <tr>
                          <td><font dangerouslySetInnerHTML={ {__html: detail.betOddsName} }></font>@ <font dangerouslySetInnerHTML={ {__html: detail.betOdds} }></font></td>
                        </tr>
                        <tr>
                          <td>
                            <span>比赛时间: {detail.matchTime}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderOrderDetail(order) {
    if (order.matchRtype != 'p3') {
      let details = order.details;

      if (!details) {
        return null; // TODO:: 有时候这个 details 为 undefined 需要怎样处理？？
      } else {
        return (
          <div className="order-detail">
            <p className="item-name">订单号：<span>{order.betWagersId}</span></p>
              {details.map( (detail, index) => {
                try {
                  detail.score = JSON.parse(detail.tmp1);  
                } catch (e) {
                  console.log(detail.tmp1);
                  detail.score = {};
                }
                
                return <table key={index}>
                  <thead>
                    <tr>
                      <td>下注内容</td>
                      <td className="nowrap">投注金额</td>
                      <td className="nowrap">可赢金额</td>
                      <td className="nowrap">状态</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p>{detail.league}</p>
                        <p className="color-style-1">
                          <span dangerouslySetInnerHTML={ {__html: detail.betVs} }></span>
                        </p>
                        <p className="color-style-2">
                          <span className="color-style-1" dangerouslySetInnerHTML={ {__html: detail.betOddsName } }></span> @ <span className="color-style-1" dangerouslySetInnerHTML={ {__html: detail.betOdds } }></span>
                        </p>
                        <p className="color-style-2">
                          { order.status != 2  && detail.timeType == 'roll' && detail.betRqTeam == 'H' &&  <span>{detail.betScoreHCur}:{detail.betScoreCCur}</span>}
                          { order.status != 2  && detail.timeType == 'roll' && detail.betRqTeam == 'C' &&  <span>{detail.betScoreCCur}:{detail.betScoreHCur}</span>}
                        </p>
                        <p className="color-style-2">
                          <span dangerouslySetInnerHTML={ { __html: detail.betOddsDes } }></span>
                        </p>
                        <p className="color-style-2">
                          { order.status == 2 && detail.matchType == 'FT' && (detail.betRqTeam == 'C' && detail.btype == 'rq' ) 
                          && <span className="color-green">上半场 : <font dangerouslySetInnerHTML={ { __html: detail.score.hrScoreC } } ></font>:<font dangerouslySetInnerHTML={ { __html: detail.score.hrScoreH }}></font></span>}
                        
                          { order.status == 2 && detail.matchType == 'FT' && (detail.betRqTeam == 'C' && detail.btype == 'rq' )
                          && <span className="color-green">全场 : <font dangerouslySetInnerHTML={ { __html: detail.score.flScoreC }}></font>:<font dangerouslySetInnerHTML={ { __html: detail.score.flScoreH } } ></font></span>}

                          { order.status == 2 && detail.matchType == 'FT' && !(detail.betRqTeam == 'C' && detail.btype == 'rq' ) 
                          && <span className="color-green">上半场 : <font dangerouslySetInnerHTML={ { __html: detail.score.hrScoreH} }></font>:<font dangerouslySetInnerHTML={ { __html: detail.score.hrScoreC } }></font></span>}

                          { order.status == 2 && detail.matchType == 'FT' && !(detail.betRqTeam == 'C' && detail.btype == 'rq' ) 
                          && <span className="color-green">全场 : <font dangerouslySetInnerHTML={ { __html: detail.score.flScoreH }}></font>:<font dangerouslySetInnerHTML={ {__html: detail.score.flScoreC }}></font></span>}

                          { order.status == 2 && detail.matchType != 'FT' && (detail.betRqTeam == 'C' && detail.btype == 'rf')
                          && <span className="color-green">全场 : <font dangerouslySetInnerHTML={ { __html: detail.score.stageCF } }></font>:<font dangerouslySetInnerHTML={ {__html: detail.score.stageHF } }></font></span>}

                          { order.status == 2 && detail.matchType != 'FT' && !(detail.betRqTeam == 'C' && detail.btype == 'rf')
                          && <span className="color-green">全场 : <font dangerouslySetInnerHTML={ { __html: detail.score.stageHF } }></font>:<font dangerouslySetInnerHTML={ { __html: detail.score.stageCF }}></font></span>}

                        </p>
                      
                      </td>
                      <td className="nowrap">{order.betIn}</td>
                      <td className="nowrap">{order.betCanWin}</td>
                      <td className="nowrap">{this.orderStatusText(order)}</td>
                    </tr>
                  </tbody>
                </table>
              })}
          </div>
        );
      }
      
    } else {
      return this.renderOrderOfP3(order);
    }
   
  }

  render(){
    const {items} = this.props;
    let _this = this;
    return(
      <div className="record-orders">
        {items.length <= 0 ? <p className="warning">暂无订单</p>: items.map(function(item, index){
          return(
            <div className="order-item" key={index}>
              {_this.renderOrderDetail(item)}
            </div>
          )
        })}
      </div>
    )
  }
}


export default OrderRecord;

