import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';

import TopBar from './TopBar';

class Header extends Component {

  static headerLinks(user) {
  
    return null;

    if (user.get('auth').get('isLogin')) {
      return null;
    } else {
      return (
        <ul className="header-qlink">
          <li>
            <Link to="/login">登录</Link>
          </li>
          <li>
            <Link to="/register">注册</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    const {app} = this.props;
    // console.log({app})
    const className = this.props.className;
    return (
      <TopBar className={className}>
        {this.props.children}
        {this.constructor.headerLinks(this.props.userModule.user)}
      </TopBar>
    );
  }
};

Header.propTypes = {
  userModule: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

Header.defaultProps = {
  className: '',
};

export default Header;