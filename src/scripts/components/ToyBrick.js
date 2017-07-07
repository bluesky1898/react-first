import React, {Component, PropTypes} from 'react';

import Card from './Card';
import PosterImg from './PosterImg';
import PosterMsg from './PosterMsg';
import Avatar from './Avatar';
import {alert} from '../utils/popup';
import {RES_OK_CODE} from '../constants/AppConstant';
import {buildQuery} from '../utils/url';

import {getLiveLoginData, getElectGameLoginData, viewArticle} from '../actions/AppAction';

const EXTERN_LINK = 1;
const INTERN_LINK = 2;
const GROUP_LINK = 3;
const DETAIL_LINK = 4;
const PROMO_LINK = 5; // 推广页面

export function renderTemplateType1(items, article, handleClick = () => {}, context = null) {
  if (!context) {
    context = this;
  }
  return (
    <div className="template-type-1 template-type-group">
      {items.map( (item, index) => {
        return <Card key={index} 
          onClick={handleClick.bind(context, item, article)}
          title={item.articleTitle}
          image={item.articleSmallImages}
          summary={item.articleSubTitle} />
      })}
    </div>
  );
}

export function renderTemplateType2(items, article, handleClick = () => {}, context = null) {
  if (!context) {
    context = this;
  }
  return <div className="template-type-2 template-type-group">
    { items.map( (item, index) => {
      return <Card key={index} 
        light={true}
        onClick={handleClick.bind(context, item, article)}
        title={item.articleTitle}
        image={item.articleSmallImages}
        summary={item.articleSubTitle} />
    })}
  </div>
}

export function renderTemplateType3(items, article, handleClick = () => {}, context = null) {
  if (!context) {
    context = this;
  }
  return <div className="template-type-3 template-type-group">
    { items.map( (item, index) => {
        return <Card key={index} 
          light={true}
          onClick={handleClick.bind(context, item, article)}
          title={item.articleTitle}
          image={item.articleSmallImages} />
      })
    }
  </div>
}

export function renderTemplateType4(items, article, handleClick = () => {}, context = null) {
  if (!context) {
    context = this;
  }
  return <div className="template-type-4 template-type-group">
    { items.map( (item, index) => {
        return <PosterMsg key={index} 
          title={item.articleTitle}
          onClick={handleClick.bind(context, item, article)}
          image={item.articleSmallImages} />
      })
    }
  </div>
}

export function renderTemplateType5(items, article, handleClick = () => {}, context = null) {
  if (!context) {
    context = this;
  }
  return <div className="template-type-5 template-type-group">
    { items.map( (item, index) => {
        return <PosterImg key={index} 
          onClick={handleClick.bind(context, item, article)}
          image={item.articleSmallImages} />
      })
    }
  </div>
}

export function renderTemplateType6(items, article, handleClick = () => {}, context = null) {
  if (!context) {
    context = this;
  }
  return <div className="template-type-6 template-type-group">
  { items.map( (item, index) => {
      return <Avatar key={index} 
        name={item.articleTitle}
        onClick={handleClick.bind(context, item, article)}
        avatar={item.articleSmallImages} />
    })
  }
  </div>
}

export function getRenderMethod(moduleType) {
  switch (moduleType) {
    case 1:
      return renderTemplateType1;
    case 2: 
      return renderTemplateType2;
    case 3: 
      return renderTemplateType3;
    case 4: 
      return renderTemplateType4;
    case 5: 
      return renderTemplateType5;
    case 6: 
      return renderTemplateType6;
  }
}

export function handleClick(item, module) {
  const {isLogin, dispatch, history, region} = this.props;
  console.log(['module', region, isLogin, item, this.props, module]);
  let _this = this;
  if (item.linkType == EXTERN_LINK || item.linkType == PROMO_LINK) {
    let referenwindow = window.open();
    referenwindow.location = item.linkUrl;
  } else if (item.linkType == INTERN_LINK) {

    let innerLink = item.innerLink;

    let platform = innerLink.cateCode;
    let gameCode = innerLink.gameCode;
    let windowReference;

    if (innerLink.typeCode == 'live') {
      // 真人
      if (!isLogin) {
        alert('请先登录');
      } else {
        _this.openLoading();
        dispatch(getLiveLoginData(platform, (data) => {
          _this.closeLoading();
          if (data.errorCode != RES_OK_CODE) {
            alert(data.msg);
          } else {
            windowReference = window.open();
            if (live.flat == 'sa') {
              windowReference.location = `/user/saLogin?url=${data.datas}`;
            } else {
              windowReference.location = data.datas;
            }
          }
        }, gameCode));
      }
    } else if (innerLink.typeCode == 'slot') {
      // 电子游戏
      if (!isLogin) {
        alert('请先登录');
      } else {
        _this.openLoading();
        dispatch(getElectGameLoginData(platform, gameCode, (data) => {
          _this.closeLoading();
          if (data.errorCode != RES_OK_CODE) {
            alert(data.msg);
          } else {
            windowReference = window.open();
            windowReference.location = data.datas;
          }
        }));
      }
    } else if (innerLink.typeCode == 'sport') {
      if (platform == 'sb') {
        // 沙巴体育
        if (!isLogin) {
          alert('请先登录');
        } else {
          _this.openLoading();
          dispatch(getLiveLoginData(platform, (data) => {
            _this.closeLoading();
            if (data.errorCode == RES_OK_CODE) {
              windowReference = window.open();
              windowReference.location = data.datas;
            } else {
              alert(data.msg);
            }
          }));
        }
      } else if (platform == 'huangguan') {
        // 皇冠体育
        history.push('/sport/hgsport');
      }
    } else if (innerLink.typeCode == 'cp') {
      // 彩票
      history.push(`/lottery/betcenter/${platform}/home`);
    } else if (innerLink.typeCode == 'card') {
      // 棋牌游戏
      if (!isLogin) {
        alert('请先登录');
      } else {
        _this.openLoading();
        dispatch(getLiveLoginData(platform, (data) => {
          _this.closeLoading();
          if (data.errorCode == RES_OK_CODE) {
            windowReference = window.open();
            windowReference.location = data.datas;
          } else {
            alert(data.msg);
          }
        }, gameCode));
      }
    }
  } else if (item.linkType == GROUP_LINK) {
    // 显示文章列表
    let url = `/dynamic/module/${region}`;
    let query = buildQuery({articleType: item.articleType, title: item.articleTitle, moduleId: module.moduleId});
    history.push(url+'?' + query);
  } else if (item.linkType == DETAIL_LINK) {
    // 显示文章详情
    let url = `/dynamic/detail/${region}`;
    dispatch(viewArticle(item));
    let query = buildQuery({module: module.moduleId, article: item.articleId});
    history.push(url+'?' + query);
  } else if (item.linkType == PROMO_LINK) {
    
  }
}

class HomeBrick extends Component {

  constructor(props) {
    super(props);
    this.loadingUI = null;
  }

  closeLoading() {
    Popup.close(this.loadingUI);
  }

  openLoading() {
    this.loadingUI = loading();
    Popup.queue(this.loadingUI);  
  }

  render() {
    const {brick} = this.props;
    let _this = this;

    return ( <div className="dynamic-templates">
      <div className="wrap">
        {brick.map( (article, index) => {
          if (article.artList.length <= 0) return null;
          let renderMethod = getRenderMethod(article.moduleType);
          return <div className="dynamic-group" key={index}>
            {renderMethod(article.artList, article, handleClick, _this)}
          </div>
        })}
    </div></div> );
  }
}

HomeBrick.propTypes = {
  brick: PropTypes.array,
  isLogin: PropTypes.bool,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  region: PropTypes.string.isRequired
};

export default HomeBrick;