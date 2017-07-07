import React, {Component, PropTypes} from 'react';

class HS extends Component {

  constructor(props) {
    super(props);
  }

  onPeiyuSelected(item) {
    this.props.onPeiyuSelected(item);
  }

  getPeiyuWithGroup() {
    const {subpankou, peiyu, platformInfo} = this.props;
  
    if (!platformInfo.betInfo) {
      return []
    }

    let labelGroups = {
      BSHS: ['BSHS', 'BSHWS', 'BSHSSM'],
      BGHS: ['BGHS', 'BGHWS', 'BGHSSM'],
      SGHS: ['SGHS', 'SGHWS' ,'SGHSSM'],
      BSGHS: ['BSGHS', 'BSGHWS', 'BSGHSSM'],
    };
    let labelGroup = labelGroups[subpankou.xzlxCode];
    let groups = [];
    for (let groupName of labelGroup) {
      let prefix = `HS-${groupName}-`;
      let groupItems = [];
      for (let peiyuItem of peiyu) {
        if (peiyuItem.id.indexOf(prefix) != -1 ) {
          groupItems.push(peiyuItem);
        }
      }
      groups.push({
        name: platformInfo.betInfo.oddinfo[1][groupName],
        items: groupItems
      });
    }

    return groups;
  }

  render() {
    const {peiyu, selectedPeiyu} = this.props;
    if (peiyu.length <= 0) {
      return <p>加载中</p>;
    }
    return (
      <div className="table4-column">
        <div className="table4-body">
          {this.getPeiyuWithGroup().map( group => {
            return ( <div className="pure-g" key={group.name}>
              <div className="pure-u-1-1">
                <div className="ui-item-son ui-header">{group.name}</div>
              </div>
              {group.items.map( (item, index) => {
                return <div className="pure-u-1-2" key={item.number + ":"+index}>
                  <div className="pure-u-1-2">
                    <div className="ui-item-son">{item.number}</div>
                  </div>
                  <div className="pure-u-1-2">
                    <div onClick={this.onPeiyuSelected.bind(this, item)} className="ui-item-son"> <span className={"peiyu " + (!selectedPeiyu[item.id] ? '': 'selected') }>{item.pl}</span></div>
                  </div>
                </div>
              })}
            </div>);
          })}
          
        </div>
      </div>
    );
  }
};

HS.defaultProps = {
  peiyu: [],
  onPeiyuSelected: () => {},
  selectedPeiyu: {},
};

HS.propTypes = {
  peipy: PropTypes.array,
  onPeiyuSelected: PropTypes.func,
  selectedPeiyu: PropTypes.object
};

export default HS;