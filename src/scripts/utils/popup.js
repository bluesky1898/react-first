import Popup from 'react-popup';

export function alert(msg, title = '提示', cb = null) {
  if (typeof title == 'function') {
    cb = title;
    title = '提示';
  }
  Popup.create({
    title: title,
    content: msg,
    className: 'popup popup-alert',
    buttons: {
      right: [{
        text: '确定',
        className: 'alert-btn',
        action: (popup) => {
          if (cb) {
            cb(popup);
          } else {
            popup.close();
          }
        }
      }]
    },
    wildClasses: false,
  });
}
export function message(msg) {
  Popup.create({
    content: msg,
    className: 'popup popup-alert popup-message',
    buttons: {
      right: [{
        action: (popup) => {
          setTimeout(function(){
            popup.close();
          },800)
        }
      }]
    },
    wildClasses: false,
  });
}
export function loading() {
  return Popup.register({
    title: null,
    content: '',
    className: 'popup popup-loading',
    buttons: [],
    wildClasses: false,
    position(box) {
      const bodyRect      = document.body.getBoundingClientRect();
      const scroll        = document.documentElement.scrollTop || document.body.scrollTop;
      const boxRect = box.getBoundingClientRect();
      
      let bodyHeight = window.innerHeight;

      let left = (bodyRect.width - boxRect.width) / 2;
      let top = (bodyHeight - boxRect.height) /2;
      box.style.top  = top + scroll + 'px';
      box.style.left = left + 'px';
      box.style.margin = 0;
      box.style.opacity = 1;
      box.className += " animate-loading";
      // console.log([top, box.style.top, bodyRect]);
    }
  });
}