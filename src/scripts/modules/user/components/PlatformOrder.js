import React, {PropTypes, Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class PlatformOrder extends Component {
  render() {
    const {path} = this.props.match;
    const {items} = this.props;
    if(!items){
      return false;
    }
    return (
      <div className="user-order-list">
        <ul>
          {items.map( (item, index) => {
            return <li key={index}><i><img src={item.smallPic} alt=""/></i><span>{item.flatName}</span><Link to={path+'/'+item.flat}>查询</Link></li>;
          })}
        </ul>
      </div>
    );
  }
};

PlatformOrder.propTypes = {
  items: PropTypes.array.isRequired
};

export default withRouter(PlatformOrder);
