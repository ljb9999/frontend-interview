<template>
  <div class="selfcenter-register">
    <div class="self-container">
      <div class="input-groups">
        <form action="" v-on:submit.prevent="onSubmit">
          <div class="email"><input type="text" placeholder="用户名" v-model="username" ></div>
          <div class="password"><input type="password" placeholder="密码" v-model="password" class=""></div>
          <div class="password"><input type="password" placeholder="密码" v-model="password2" class=""></div>
          <div class="email"><input type="text" placeholder="昵称" v-model="name" ></div>
          <div class="submit">
              <input type="submit" value="注册" >
          </div>
        </form>
        <div class="toLogin" @click="goToLogin">返回登录></div>
      </div>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import qs from 'qs'
import regex from '@/util/regex'
import api from '@/fetch/api'
const innerWidth = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
const size = innerWidth / 7.50
document.documentElement.style.fontSize = `${size}px`
export default {
  name: 'register',
  data () {
    return {
      username: '',
      name: '',
      password: '',
      password2: ''
    }
  },
  components: {
    
  },
  methods: {
    onSubmit () {
      console.log('表单提交了')
      let that = this
      if (that.checkIsDisabled()) {
          console.log(that.username);
        let params = {
          "username": that.username,
          "password": that.password
        }
        if(that.name != '') {
          params.name = that.name
        }
        api.userRegister(params).then(res => {
          console.log(res)
          if(res.status == 201 || res.status == 200) {
              Toast('您的账号注册成功!')
              that.$router.push({path: '/login'})
          }else {
              Toast('注册失败!该账号可能已被注册!');
          }
        })
      }
    },
    checkIsDisabled () {
      if (!this.username || !regex.isUsername(this.username)) {
        Toast('请填写正确的用户名！用户名为5-12位的数字和字母的组合')
        return false
      } else if (!this.password || !regex.isPassword(this.password)) {
        Toast('请填写正确的密码！密码为8-20位的数字和字母的组合！')
        return false
      }else if (!this.password || this.password !== this.password2) {
        Toast('两次密码不一致!')
        return false
      }else {
        return true
      }
    },
    goToLogin () {
      this.$router.push({path: '/login'})
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
    .input-groups{
      width: 100%;
      height: 7rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.6rem;
      background-color: rgba(255,255,255,0.1);
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
      .toLogin{
        display: table;
        font-size: 0.28rem;
        margin: 0 auto;
        margin-top: 0.1rem;
        color: white;
      }
      .agree{
        background-image: url("/static/images/select.png");
        background-size: 90% 90%;
        background-position: center;
      }
    }
  }


  /*.email::after, .password::after{*/
  /*position: absolute;*/
  /*left: -50%;*/
  /*bottom: 0;*/
  /*content: '';*/
    /*width: 200%;*/
    /*height: 1px;*/
    /*background: #d9d9d9;*/
    /*transform: scale(0.5);*/
    /*display: block;*/
/*}*/


</style>
