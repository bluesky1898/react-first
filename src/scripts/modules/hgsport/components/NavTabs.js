import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import {Link ,NavLink} from 'react-router-dom';

class NavTabs extends Component {
  
  constructor(props) {
    super(props);
    this.tabLinks = [{
      to: '/hgsport' ,
      title: '滚球',
      exact: true,
    }, {
      to: '/hgsport/today',
      title: '今日',
      exact: false,
    }, {
      to: '/hgsport/tom',
      title: '早盘',
      exact: false,
    }, {
      to: '/hgsport/raceresult',
      title: '赛果',
      exact: false,
    }, {
      to: '/hgsport/orders',
      title: '注单',
      exact: false,
    }];
    this.state = {
      crttab: 0,
    };

    const {match, location} = this.props;
    this.state = {
      crtpath: match.path
    };
  }

  render() {    // 把query 参数放到 to 上面
    const {location,match} = this.props;
    let query = location.search;
    return (
    <div className="nav-tabs">
      <ul className="clearfix">
        {this.tabLinks.map( (tabLink, index) => {
          return (
            <li className={ this.state.crtpath == tabLink.to ? 'active': '' } key={index}><NavLink to={tabLink.to + query }>{tabLink.title}</NavLink></li>
          )
        })}
      </ul>
    </div>);
  }
};
export default withRouter(NavTabs);