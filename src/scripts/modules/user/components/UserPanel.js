import React, {PropTypes, Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserPanel extends Component {
  
  fundLinks() {
    return {
      'deposit': '/user/charge/quick',
      'withdraw': '/user/withdraw',
      'edu': '/user/Transfer',
    };
  }

  groupModuleLinks(path) {
    return {
      'message': {
        'message': path + '/message/system',
      },
      'record': {
        'deposit': path +'/chargerecord',
        'withdraw': path +'/withdraw/log',
        'edu': path +'/transferlog',
        'order': path +'/order',
      },
      'bank': {
        bindbank: path +'/bankcard',
      },
      info: {
        userinfo: '/user/info',
        password: path+ '/modifypw/ModifyAccountPsw',
        security: '/user/security'
      },
      agent: {
        agent: '/user/agent',
      }
    };
  }

  renderMessageGroup() {
    let menuItem = (menus['menuList'][''])
  }

  render() {
    const {path} = this.props.match;
    const {menus} = this.props;
    let fundItems = menus['fundsList'] || [];
    console.log(['menu items', menus['fundsList']]);
    let fundLinks = this.fundLinks();
    let moduleLinkTos = this.groupModuleLinks(path);
    return (
     <div className="user-panel">
        <div className="list-sty1">
          {fundItems.map((item, index) => {
            let fundTo = fundLinks[item.menuCode];
            return (<div key={index} className="items">
              <Link to={fundTo}><div style={ {background: 'url('+item.smallPic+')' } } className={"list-sty-icon " + item.menuCode}></div><p>{item.menuName}</p></Link>
            </div> ) 
          })}
        </div>

        <div className="list-sty2 margin-bottom-scroll">
          {menus['menuList'] && menus['menuList'].map( (module, index) => {
            let linkTos = moduleLinkTos[module.menuModuleCode];
            console.log(['links to', linkTos, moduleLinkTos]);
            let menuLinks = module.list;
            return (<ul key={index}>
              {menuLinks.map( (menuLink, index2) => {
                return <li key={index2+':'+index}><Link to={ linkTos[menuLink['menuCode']] }><i style={ { backgroundImage: 'url('+menuLink['smallPic']+')' } }></i><span>{menuLink['menuName']}</span><span className="arrow-icon"><img src="./misc/images/userCenter/arrow-icon.png" alt="" /></span></Link></li>
              })}
            </ul>);
          })}
        </div>

      </div>
    );
  }
};

UserPanel.propTypes = {
  menus: PropTypes.object
};


export default UserPanel;

