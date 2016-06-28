import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App'

import UserView from './components/UserView'

Vue.use(require('vue-resource'));
Vue.use(Router)

import Apis from './apis'

Vue.config.debug = true;


import { formatDate, dateBox } from './filters'

Vue.filter('formatDate', formatDate)

Vue.filter('dateBox', dateBox)

var router = new Router()

router.map({
    '/index': {
        component: UserView,
    },
})

router.beforeEach(function () {
    window.scrollTo(0, 0)
})

router.redirect({
    '*': '/index'
})

router.start(App, '#app')