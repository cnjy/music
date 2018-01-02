/**
 * Created by admin on 2017/11/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from  './actions'
//查看修改记录
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);
//添加vuex的检测
const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []

})
export default store;
