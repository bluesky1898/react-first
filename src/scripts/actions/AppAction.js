import {appFinishedStartup as _afs, setSiteTitle} from '../utils/site';
import * as AppConstant from '../constants/AppConstant';
import {siteInfoAPI, 
  formInputHolderAPI,
  post, 
  get, 
  put, 
  pageTemplateAPI, 
  liveGameUrl, 
  liveGameLoginURL,
  electGameItemsURL,
  promotionListAPI,
  collectGame,
  dynamicBrickAPI,
  dynamicArticleListAPI,
  homeElectricMenuAPI,
  formNoticeAPI,
  mainHomeAPI,
  getCenterListAPI} from '../utils/url';

export function appFinishedStartup() {
  _afs(true);
  return {
    type: AppConstant.APP_FINISHED_STARTUP,
    data: true
  };
}

export function loadFormInformation() {
  return (dispatch) => {
    post(formInputHolderAPI())
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_FORM_INFORMATION,
        data
      });
    });
  };
}

export function loadHome() {
  return (dispatch) => {
    post(mainHomeAPI())
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_MAIN_HOME,
        data
      });
    });
  }
}

function createShortcut(siteInfo) {
  // <link rel="shortcut icon" href="http://yourdomain.com/path/icon57.png" />
  // <link rel="apple-touch-icon" href="http://yourdomain.com/path/icon57.png" />
  // <link rel="apple-touch-icon" sizes="72x72" href="http://yourdomain.com/path/icon72.png" />
  // <link rel="apple-touch-icon" sizes="114x114" href="http://yourdomain.com/path/icon114.png" />
  if (window.initDestopShortcut) {
    return ;
  }
  let links = [{
      href: siteInfo.deskTopUrl,
      ref: 'shortcut icon'
    },{
      href: siteInfo.deskTopUrl,
      ref: 'apple-touch-icon'
    }, {
      href: siteInfo.deskTopUrl,
      sizes: '72x72',
      ref: 'apple-touch-icon'
    }, {
      href: siteInfo.deskTopUrl,
      sizes: '114x114',
      ref: 'apple-touch-icon'
    }];
  
  for (let linkData of links) {
    let link = document.createElement('link');
    link.rel = linkData.ref;
    if (linkData.sizes) {
      link.sizes = linkData.sizes;
    }
    link.href = linkData.href;
    document.head.appendChild(link);
  }

  window.initDestopShortcut = true;

}

export function loadSiteInfo() {
  return (dispatch, getState) => {
    post(siteInfoAPI())
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_SITE_INFO,
        data
      });
        
      createShortcut(data.datas);
      
    });
  };
}

export function loadPageTemplate(name) {
  return (dispatch, getState) => {
    post(pageTemplateAPI(), {
      pageCode: name
    })
    .then(res => res.json())
    .then(data => {
      data.name = name;
      dispatch({
        type: AppConstant.REQUEST_PAGE_TEMPLATE,
        data
      });
    });
  };
}

export function loadLiveSportElectGames() {
  return (dispatch, getState) => {
    const {userModule} = getState();
    let isLogin = userModule.user.get('auth').get('isLogin');
    let userName = userModule.user.get('auth').get('userName');
    let postData = {};
    if (isLogin) {
      postData['userName'] = userName
    }

    post(homeElectricMenuAPI(), postData)
    .then( res => res.json())
    .then(data => {

      dispatch({
        type: AppConstant.REQUEST_HOME_ELECTRIC_MENU,
        data
      });

      dispatch({
        type: AppConstant.GET_CENTER_GAME_LIST,
        data,
      });

      dispatch({
        type: AppConstant.REQUEST_LIVE_GAME_ITEMS,
        data
      });

      dispatch(_loadSportItems(data));
      dispatch(_loadElectTypes(data));

      dispatch({
        type: AppConstant.REQUEST_BBIN_ITEMS,
        data: data
      });

      dispatch({
        type: AppConstant.REQUEST_CARDS_ITEMS,
        data: data
      });

    });
  };
}

function _loadSportItems(data) {
  return {
    type: AppConstant.REQUEST_SPORT_ITEMS,
    data
  };
}

function _loadElectTypes(data) {
  return {
    type: AppConstant.REQUEST_ELECT_TYPES,
    data
  };
}

export function _collectChange(flat,gameCode,status,callback=function(){},client = 1){
  return (dispatch , getState) => {
    const {userName, password} = getState().userModule.user.get('auth').toObject();
    post(collectGame(), {
      flat,
      userName,
      client,
      gameCode
    })
    .then(res => res.json()) 
    .then(data => {
      callback(data);
    })
  }
}

export function getLiveLoginData(flat, callback = () => {}, gameCode = null) {
  return (dispatch, getState) => {
    const {userName, password} = getState().userModule.user.get('auth').toObject();
    let body = {
      userName,
      flat
    };
    if (gameCode) {
      body = Object.assign(body, {gameCode});
    }
    post(liveGameLoginURL(), body)
    .then(res => res.json())
    .then(data => {
      callback(data);
    });
  }
}

export function getElectGameLoginData(flat, gameCode, callback = () => {}) {
  return (dispatch, getState) => {
    const {userName} = getState().userModule.user.get('auth').toObject();
    post(liveGameLoginURL(), {
      userName,
      flat,
      gameCode
    })
    .then(res => res.json())
    .then(data => {
      callback(data);
    });
  }
}

export function loadElectGameItems(flat, code = 'all', pageNo = 1, pageSize = 10, gameName = '', client = 1) {
  return (dispatch, getState) => {
    const {isLogin, userName} = getState().userModule.user.get('auth').toObject();
    let body = {
      flat,
      code,
      client,
      pageSize,
      pageNo
    };
    if(gameName != ""){
      body.gameName = gameName;
    }
    if (isLogin) {
      body.userName = userName;
    }
    post(electGameItemsURL(), body)
    .then(res => res.json())
    .then(data => {
      data.flat = flat;
      data.pageNo = pageNo;
      dispatch({
        type: AppConstant.REQUEST_ELECT_GAME_ITEMS,
        data
      });
    });
  };
}

export function loadPromotionItems() {
  return (dispatch, getState) => {
    post(promotionListAPI())
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_PROMOTION_ITEMS,
        data
      });
    });
  };
}

export function setGameCenterViewType(viewType) {
  return {
    type: AppConstant.SET_GAME_CENTER_TYPE,
    viewType
  };

}

export function bodyClass(className) {
  document.body.className = className;
}

export function resetBodyClass() {
  document.body.className = '';
}

export function loadDynamicBrick(regionCode = 'home') {
  return (dispatch, getState) => {
    post(dynamicBrickAPI(), {
      regionCode
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_REGION_BRICK,
        data,
      });
    });
  };
}

export function loadDynamicArticleList(articleType) {
  return (dispatch, getState) => {
    post(dynamicArticleListAPI(), {
      articleType
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_DYNAMIC_ARTICLE_LIST,
        data
      });
    });
  };
}

export function loadHomeElectricMenu() {
  return (dispatch, getState) => {
    post(homeElectricMenuAPI())
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: AppConstant.REQUEST_HOME_ELECTRIC_MENU,
        data
      });
    });
  };
}

export function viewArticle(article) {
  return {
    type: AppConstant.VIEW_ARTICLE,
    data: article
  };
}

export function loadFormNotice(code = null) {
  let body = {};
  if (code) body['panelSn'] = code;
  return (dispatch, getState) => {
    post(formNoticeAPI(), body)
    .then(res => res.json())
    .then(data => {
      if (data.errorCode == AppConstant.RES_OK_CODE) {
        dispatch({
          type: AppConstant.REQUEST_FORM_NOTICE,
          data
        });
      }
    });
  };
}