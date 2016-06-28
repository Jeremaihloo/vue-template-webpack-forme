const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function fromNow (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }

    return time + label + 's';
}

var dateFormat = require('date-format');

var formatDate = {
  // model -> view
  // 在更新 `<input>` 元素之前格式化值
  read: function(val) {
    let format = "yyyy/MM/dd hh:mm";
    return dateFormat(format, new Date(val));
  },
  // view -> model
  // 在写回数据之前格式化值
  write: function(val, oldVal) {
    let date = new Date(val).getTime()/1000;
    return date;
  }
}


var dateBox = {
  // model -> view
  // 在更新 `<input>` 元素之前格式化值
  read: function(val) {
    return new Date(val * 1000);
  },
  // view -> model
  // 在写回数据之前格式化值
  write: function(val, oldVal) {
    let date = new Date(val).getTime()/1000;
    return date;
  }
}

export { formatDate, dateBox }