import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Back from '../../../components/Back';
import InfoOrder from '../components/InfoOrder';
import FooterMenu from '../../../components/FooterMenu';
import {loadUserOrderItems} from '../actions/UserOrder';

class OrderContentContainer extends Component {
  constructor(props){
    super(props);
    this.flat = this.props.match.params.type;
  }
  componentWillMount(){
    
  }
  render() {
    const {order} = this.props.userModule;
    const {platform} = this.props.userModule;
    var platformList = platform.get('platformItems');
    var title = "";
    for(var i = 0;i < platformList.length;i++){
      if(this.flat == platformList[i]['flat']){
        title = platformList[i]['flatName'];
      }
    }
    return (
 		<div className="page oredr-page">
      <div className="inner">
        <Header {...this.props}>
          <Back />
          <h3>{title}</h3>
        </Header>
        <div className="page-body">
          <InfoOrder {...this.props} />
        </div>
      </div>
    </div>);
  }
};

function mapStateToProps(state) {
  const {userModule, app} = state;
  return {
    userModule,
    app
  };
}

export default connect(mapStateToProps)(OrderContentContainer);