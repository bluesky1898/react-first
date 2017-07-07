import es6Promise from 'es6-promise';
es6Promise.polyfill();
import fetch from 'isomorphic-fetch';

export function loginUrl() {
  return '';
}

export function codeUrl() {
  return '/resources-code.jpg';
}

export function buildQuery(query = {}) {
  let esc = encodeURIComponent;
  return Object.keys(query).map( (key) => {
    return esc(key) + '=' + esc(query[key])
  }).join('&');
}

export function parseQuery(qstr) {
  if (qstr.trim().length <= 0) {
    return {};
  }
  var query = {};
  var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
  for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      let v = b[1] || '';
      try {
        v = decodeURIComponent(b[1] || '');
      } catch (e) {
        // TODO::
      }

      query[decodeURIComponent(b[0])] = v;
  }
  return query;
}

let baseOptions = {
  credentials: 'same-origin'
};

export const get =  (url, query = {}, options = {}) => {

  let queryUrl = url;
  if (buildQuery(query) != '') {
    queryUrl += '?' + buildQuery(query);
  }

  return fetch(queryUrl, Object.assign({}, baseOptions, options))
}

export const post =  (url, form = {}, options = {}, query = {}) => {
  
  let formbody = Object.keys(form).map( key =>  encodeURIComponent(key)+'='+encodeURIComponent(form[key]) ).join('&');
  let _baseOptions = Object.assign({}, baseOptions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formbody
  });

  let queryUrl = url;
  if (buildQuery(query) != '') {
    queryUrl += '?' + buildQuery(query);
  }
  return fetch(queryUrl, Object.assign({}, _baseOptions, options)).then(res => {

    let json = res.json();
      
    json.then(data => {
      if (typeof data.datas == 'undefined') {
        data.datas = {};
      }
      data.from = queryUrl;

      return data;
    })

    res.json = () => {
      return json;
    };

    json.then((data) => {
      let url = res.url;
      if (data.errorCode == '000007' || data.errorCode == '000005') {
        post(userLogoutAPI())
        .then(res => res.json())
        .then(data => {
          window._userName = '';
         
          if ( ( window.location.href.indexOf('login') != -1 ) 
            || ( window.location.href.indexOf('hgsport') != -1 ) ) {
          } else {
            window.location.href = '/';
          }
        });
      }
    });

    return res;
  });
}

export const put =(url, form, options, query ={}) => {
  let formbody = Object.keys(form).map( key =>  encodeURIComponent(key)+'='+encodeURIComponent(form[key]) ).join('&');
  let _baseOptions = Object.assign({}, baseOptions, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formbody
  });3

  let queryUrl = url;
  if (buildQuery(query) != '') {
    queryUrl += '?' + buildQuery(query);
  }

  return fetch(queryUrl, Object.assign({}, _baseOptions, options));
};

export function siteInfoAPI() {
  return `/main/getSiteInfo`;
}

export function pageTemplateAPI() {
  return `/main/template/list`;
}

export function staticURL(uri) {
  //const domain = 'http://103.243.181.58:8082';
  const domain = '';
  return `${domain}${uri}`;
}

export function liveGameUrl() {
  return `/electronic/list`;
}

export function liveGameLoginURL() {
  return `/flat/loginH5`;
}

export function electGameItemsURL() {
  return `/electronic/gamelist`;
}

export function collectGame(){
  return `/electronic/favourite`;
}

export function promotionListAPI() {
  return `/member/promo/list`;
}

export function getCenterListAPI() {
  return `/electronic/centerList`;
}

export function userLogoutAPI() {
  return `/user/logout`;
}

export function dynamicBrickAPI() {
  return `/main/module/list`;
}

export function dynamicArticleListAPI() {
  return `/main/articleType/list`;
}

export function homeElectricMenuAPI() {
  return `/electronic/menu`;
}

export function formNoticeAPI() {
  return `/commons/getMobileInformation`;
}

export function formInputHolderAPI() {
  return `/commons/getWebPanel`;
}

export function mainHomeAPI() {
  return `/main/home`;
}