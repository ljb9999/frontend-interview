<template>
  <div class="selfcenter-register">
    <div class="self-container">
      <div class="content-groups">
        <div class="center">
            <div class="users">用户:{{name}}</div>
            <div class="create" @click="getShow">
                <span v-if="show">×</span>
                <span v-else>+</span>
            </div>
            <div class="toLogin" @click="goToLogin">退出登录</div>
        </div>
        <div class="content-list">
            <div v-show="show" class="add-list">
                <mt-field label="备忘内容" v-model="title"></mt-field>
                <button class="tjBtn" @click="addList">添加</button>
            </div>
            <div class="title-list">
                <ul>
                  <li is="todoList"  v-for="(list) in listdata" :key="list.id" :list="list"></li>
                </ul>
            </div>
        </div>
      </div>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Field } from 'mint-ui'
import qs from 'qs'
import regex from '@/util/regex'
import api from '@/fetch/api'
import todoList from "./todoList.vue"
const innerWidth = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
const size = innerWidth / 7.50
document.documentElement.style.fontSize = `${size}px`
export default {
  name: 'secretary',
  data () {
    return {
      show: false,
      username: '',
      name: '',
      token: '',
      id: '',
      title: '',
      listdata: []
    }
  },
  components: {
    todoList
  },
  created() {
      let that = this
      that.getUser()
      that.getList()
  },
  methods: {
    goToLogin () {
      localStorage.removeItem("token");
      this.$router.push({path: '/login'})
    },
    getShow() {
        this.show = !this.show
        this.title = ''
    },
    addList() {
        let that = this
        if(!this.title) {
            Toast('内容不能为空!')
        }else {
            let params = {
                'title': that.title
            }
            api.addCont(params).then(res => {
                if(res.status == 201 || res.status == 200) {
                    Toast('备忘录添加成功！')
                    that.getList()
                    that.getShow()
                }else {
                    Toast('备忘录添加失败!');
                }
            })
        }
    },
    getUser() {
        let that = this
        that.token = localStorage.getItem("token");
        api.userContent().then(res => {
            if(res.status == 201 || res.status == 200) {
                that.name = res.data.name
                that.id = res.data.id
                that.username = res.data.username
            }else {
                Toast('注册失败!该账号可能已被注册!');
            }
        })
    },
    getList() {
        let that = this
        api.getLists().then(res => {
            console.log(res);
            if(res.status == 201 || res.status == 200) {
                that.listdata = ''
                that.listdata = res.data
            }else {
                Toast('备忘录列表获取失败!');
            }
        })
    }
  }
}
</script>
<style  lang="less" scoped>
  @import "../../assets/style/common.less";
  .selfcenter-register{
    width: 100vw;
    height: 100vh;
    background-image: url("/static/images/bg_3.jpg");
    position: fixed;
    .bg-cover
  }
  .self-container{
    width: 100vw;
    height: 100vh;
    .logo-box{
      width: 3rem;
      height: 3rem;
      border-radius: 1.6rem;
      background-color: rgba(255,255,255,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      margin-top: 2.4rem;
      .logo{
        width: 80%;
        height: 80%;
        border-radius: 1.6rem;
        background-color: rgba(255,255,255,0.5);
      }
    }
    .content-groups{
      width: 100%;
      height: 100vh;
      position: relative;
      padding-left: 0.6rem;
      padding-right: 0.6rem;
      background-color: rgba(255,255,255,0.1);
    //   overflow-x: scroll ; 
      .center {
          width: calc(100% - 1.2rem);
          position: fixed;
          top: 0;
          height: 0.8rem;
      }
      .content-list {
          width: 100%;
          height: calc(100vh - 0.8rem);
          margin-top: 0.8rem;
          background-color: #444;
          overflow-x: scroll ; 
          position: relative;
          .add-list {
              width: 100%;
              height: auto;
              position: absolute;
              background-color: #fff;
              border-radius: 0.1rem;
              z-index: 999;
              .tjBtn {
                  display: block;
                  border-radius: 10%;
                  font-size: 0.35rem;
                  margin: 0 auto;
                  padding: 6px 8px 6px 8px;
                  color: #656b79;
                  background-color: #f6f8fa;
                  box-shadow: 0 0 1px #b8bbbf;
              }
             
          }
          .title-list {
              width: 100%;
              height: auto;
              ul {
                  display: block;
                  width: 100%;
                  height: auto;
                  li {
                      width: 90%;
                      margin: 0 auto;
                    //   padding-top: 0.2rem;
                      height: auto;
                      overflow: hidden;
                      .users-name {
                          color: #fff;
                          font-size: 0.4rem;
                      }
                      .user-title {
                         font-size: 0.5rem; 
                      }
                  }
              }
          }
      }




      form > div{
        border-radius: 1rem;
      }
      input{
        width: 100%;
        height: 0.8rem;
        font-size:0.32rem;
        line-height: 0.6rem;
        margin: 0.2rem 0;
        padding: 0 0.4rem;
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        color: #fff;
        &::placeholder{
          font-size: 0.28rem;
          color: white;
        }
      }
      input[type="submit"]{
        margin: 0.4rem 0 0.2rem;
        height: 0.8rem;
        display: block;
        width: 100%;
        cursor: pointer;
        text-align: center;
        background-color: @baseColor;
        color: #fff;
        border-radius: 0.5rem;
      }
      input[type="submit"].disabled{
        background-color: @baseColor;
      }
      .input-groups>p{
        text-align: center;
      }
      .email, .password{
        background-color: rgba(255,255,255,0.1);
        position: relative;
        .verifyCodeBtn{
          width: 1.7rem;
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.1rem;
          text-align: center;
          border: 0.02rem solid #ccc;
          color: #ccc;
          display: inline-block;
          border-radius: 0.1rem;
          position: absolute;
          right: 0.4rem;
          bottom: 0.14rem;
        }
        .countdown{
          border: 0.02rem solid #ccc;
          color: #ccc;
          pointer-events: none;
        }
      }
      .checkout{
        color: white;
      }
      .check-box{
        width: 0.3rem;
        height: 0.3rem;
        border: 0.02rem solid #999;
        border-radius: 0.1rem;
        margin:0.02rem 0.2rem 0 0;
        float: left;
        a{
          color: white;
        }
      }
      .users {
          height: 100%;
          float: left;
          font-size: 0.28rem;
          display: flex;
          align-items: center;
          color: white;
      }
      .create {
        // vertical-align: middle;display: table-cell;
        //   height: 100%;
          position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            
      }
      .toLogin{
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        float: right;
        // margin: 0 auto;
        // margin-top: 0.1rem;
        height: 100%;
        color: white;
      }
      .agree{
        background-image: url("/static/images/select.png");
        background-size: 90% 90%;
        background-position: center;
      }
    }
  }
</style>
