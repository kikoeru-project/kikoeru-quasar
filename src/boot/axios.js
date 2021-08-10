import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'
import { baseURL } from '../../package.json'

axios.defaults.headers['Content-Type'] = "application/json"
// 从 LocalStorage 中读取 token
axios.defaults.headers['Authorization'] = LocalStorage.getItem('jwt-token') ? 'Bearer ' + LocalStorage.getItem('jwt-token') : ''
// asmr.one 自定义接口域名
axios.defaults.baseURL = baseURL;

export function setAxiosHeaders (token) {
  axios.defaults.headers['Authorization'] = 'Bearer ' + token
}

Vue.prototype.$axios = axios
