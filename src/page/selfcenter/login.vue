<template>
  <div class="selfcenter-register">
    <div class="self-container">
      <div class="input-groups">
        <form  action="" v-on:submit.prevent="onSubmit">
          <div class="email"><input type="text" placeholder="用户名" v-model="username" ></div>
          <div class="password"><input type="password" placeholder="密码" v-model="password"></div>
          <div class="submit"><input type="submit" value="登录" ></div>
        </form>
        <div class="toRegister" @click="goToRegister">注册账号></div>
      </div>
    </div>
  </div>
</template>
<script>
import regex from '@/util/regex'
import { Toast } from 'mint-ui'
import qs from 'qs'
import api from '@/fetch/api'
export default {
  name: 'index',
  data () {
    return {
      loginType: 2,
      username: '',
      verifyCode: '',
      countdown: 0,
      email: '',
      password: ''
    }
  },
  components: {
  },
  methods: {
    onSubmit () {
      console.log('表单提交了')
      let that = this
      if (this.checkIsDisabled()) {
        let params = {
          username: this.username,
          password: this.password
        }
        api.userLogin(params).then(res => {
          console.log(res)
          if(res.status == 201 || res.status == 200) {
              Toast('账号登陆成功!')
              localStorage.setItem("token", res.data.token);
              that.$router.push({path: '/'})
          }else {
              Toast('登陆失败!该账号可能未被注册或密码错误!');
          }
        })
      }
    },
    goToRegister () {
      this.$router.push({path: '/register'})
    },
    checkIsDisabled () {
      if (!this.username || !regex.isUsername(this.username)) {
        Toast('请填写正确的用户名！')
        return false
      }  else if (!this.password) {
        Toast('请填写密码！')
        return false
      } else {
        return true
      }
    }
  },

  computed: {
    isDisabled_sms: function () {
      return !regex.isPhone(this.phoneNum) || this.verifyCode.length <= 0
    },
    isDisabled_psw: function () {
      return !regex.isPhone(this.phoneNum) || this.password.length <= 0
    }
  }
}
</script>
<style  lang="less" scoped>
  @import "../../assets/style/common.less";

  .selfcenter-register{
    width: 100%;
    height: 100vh;
    background-image: url("/static/images/bg_3.jpg");
    position: fixed;
    .bg-cover
  }
  .self-container{
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
      height: 6rem;
      position: fixed;
      bottom: 0;
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
        margin-left: 0.2rem;
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
      .toRegister{
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

