import moment from 'moment';

export function format(date = null, format="Y.m.d HH:mm") {
  
  if (date == null) date = new Date();
  else if (typeof date != 'object') {
    date = moment(date).toDate();
  }
  let year = date.getFullYear();
  let month = ("0" + ( date.getMonth()  + 1 ) ).substr(-2);
  let day = ("0" + date.getDate()).substr(-2);
  let hour = ("0" + date.getHours()).substr(-2);
  let min = ("0" + date.getMinutes()).substr(-2);
  let second = date.getSeconds();
  let strOfDate = "";
  

  strOfDate = format;
  if (hour * 1 < 12) {
    strOfDate = format.replace('Time', 'A');
  } else{
    strOfDate = format.replace('Time', 'P');
  }
  strOfDate = strOfDate.replace("mm", min);
  strOfDate = strOfDate.replace("HH", hour);
  strOfDate = strOfDate.replace("ii", second);
  strOfDate = strOfDate.replace("Y", year);
  strOfDate = strOfDate.replace("m", month);
  strOfDate = strOfDate.replace("d", day);
  
  return strOfDate;
}

export function DateFromString(str) {
  return moment(str).toDate();
}