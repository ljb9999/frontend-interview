import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded'
let baseUrl = "https://todo.lanternfish.ai"
export function fetchPost (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res)
    }).catch((error) => {
      resolve(error)
    })
  })
}
export function fetchTokenGet (url, params = {}) {
  return new Promise((resolve, reject) => {
    console.log(axios.defaults)
    axios.defaults.headers.get['Authorization'] = 'JWT '+localStorage.getItem("token")
    axios.get(url).then(res => {
      resolve(res)
    }).catch((error) => {
      reject(error);
    })
  })
}
export function fetchTokenPost (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.post['Authorization'] = 'JWT '+localStorage.getItem("token")
    axios.post(url, params).then(res => {
      resolve(res)
    }).catch((error) => {
      reject(error);
    })
  })
}
export function fetchGet (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      console.log(res)
      resolve(res.data)
    }).catch((error) => {
      console.log("666666");
      reject(error);
    })
  })
}
export function fetchDel (url) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.delete['Authorization'] = 'JWT '+localStorage.getItem("token")
    console.log(axios.defaults);
    axios.delete(url).then(res => {
      resolve(res)
    }).catch((error) => {
      console.log(url);
      reject(error);
    })   
  })
}
export function fetchPut (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.put['Authorization'] = 'JWT '+localStorage.getItem("token")
    axios.put(url, params).then(res => {
      resolve(res)
    }).catch((error) => {
      reject(error);
    })   
  })
}


export default {
  // 注册
  userRegister (params) {
    console.log(params)
    return fetchPost(baseUrl+`/user`, params)
  },
  // 登录
  userLogin (params) {
    return fetchPost(baseUrl+`/auth`, params)
  },
  // 获取用户信息
  userContent (params) {
    return fetchTokenGet(baseUrl+`/auth`)
  },
  // 获取所有的备忘录
  getLists () {
    console.log(baseUrl+`/user/todo`)
    return fetchTokenGet(baseUrl+`/user/todo`)
  },
  // 添加备忘录
  addCont (params){
    return fetchTokenPost(baseUrl+`/todo`, params)
  },
  // 删除备忘录
  del (id){
    return fetchDel(baseUrl+`/todo/`+id)
  },
  // 修改备忘录
  setCorrect (id, params){
    console.log(params);
    return fetchPut(baseUrl+`/todo/`+id, params)
  }
}
