import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入colorui cu-custom 组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

//使用Vue自定义组件：
import home from './pages/home/home.vue'
Vue.component('home', home)

import classify from './pages/classify/classify.vue'
Vue.component('classify', classify)

import girl from './pages/girl/girl.vue'
Vue.component('girl', girl)

import mine from './pages/mine/mine.vue'
Vue.component('mine', mine)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
