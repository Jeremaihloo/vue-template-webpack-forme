import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App'

import UserView from './components/UserView'

Vue.use(require('vue-resource'));
Vue.use(Router)

import Apis from './apis'

if (document.domain == "localhost" || document.domain == "192.168.1.40") {
    Vue.use(Apis, { domain: "" });
} else {
    Vue.use(Apis, { domain: "http://hq.gench.edu.cn/app2016/student_bus_order" });
}

Vue.config.debug = true;

var dateFormat = require('date-format');

Vue.filter('formatDate', {
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
})

Vue.filter('dateBox', {
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
})

var router = new Router()

router.map({
    '/index': {
        component: UserView,
    }
})

router.beforeEach(function () {
    window.scrollTo(0, 0)
})

router.redirect({
    '*': '/login'
})

router.start(App, '#app')