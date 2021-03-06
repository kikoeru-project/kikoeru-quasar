<template>
  <q-form @submit="onSubmit" style="width: 260px;" class="absolute-center	q-gutter-md">
    <q-input filled v-model="name" label="用户名" class="fit"
             lazy-rules
             :rules="[ val => val && val.length >= 5 || '用户名长度至少为 5' ]"
    />

    <q-input filled type="password" v-model="password" label="密码" class="fit"
             lazy-rules
             :rules="[ val => val && val.length >= 5 || '密码长度至少为 5' ]"
             clearable
    />

    <!-- 仅在注册界面出现 -->
    <q-input filled type="password" v-model="passwordConfirm" label="请再次输入密码" class="fit"
             lazy-rules
             bottom-slots
             :rules="[ val => val && val === password || '两次密码必须一致' ]"
             clearable
             v-if="showRegisterForm"
    />

    <!-- 入口界面按钮 -->
    <q-btn label="注册" color="secondary" class="fit" @click="navigateToRegister" v-if="this.$store.state.User.reg && !showRegisterForm"/>
    <q-btn label="登录" type="submit" color="primary" class="fit" v-if="!showRegisterForm"/>

    <!-- 注册界面按钮 -->
    <q-btn label="去看看！" type="submit" color="secondary" class="fit" v-if="showRegisterForm"/>
    <q-btn label="返回" color="primary" class="fit" @click="navigateBack" v-if="showRegisterForm"/>
  </q-form>
</template>

<script>
import {setAxiosHeaders} from 'boot/axios'
import NotifyMixin from '../mixins/Notification.js'

export default {
  mixins: [NotifyMixin],

  data() {
    return {
      name: '',
      password: '',
      passwordConfirm: '',
      // false: login form
      showRegisterForm: false
    }
  },
  mounted() {
    this.checkRegEnable();
  },
  methods: {
    navigateToRegister() {
      this.showRegisterForm = true;
    },
    navigateBack() {
      this.showRegisterForm = false;
    },
    onSubmit(){
      if (this.showRegisterForm) {
        this.reg();
      } else {
        this.login();
      }
    },
    checkRegEnable () {
      this.$axios.get('/api/auth/reg')
        .then((res) => {
          this.$store.commit('User/SET_REG', res.data.reg)
        });
    },
    login() {
      let response = this.$axios.post('/api/auth/me', {
        name: this.name,
        password: this.password
      })
      this.handleResponse(response, "login")
    },
    reg() {
      let response = this.$axios.post('/api/auth/reg', {
        name: this.name,
        password: this.password
      })
      this.handleResponse(response, "reg")
    },
    handleResponse(response, type) {
      response.then((res) => {
        try {
          this.$q.localStorage.set('jwt-token', res.data.token)
          setAxiosHeaders(res.data.token)
          this.showSuccNotif(type === "reg" ? "注册成功." : "登录成功.")
          this.$router.push('/')
        } catch (error) {
          // 由于Web Storage API错误，
          // 数据未成功保存
          this.showErrNotif(error.message)
        }
      })
        .catch((error) => {
          if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            if (error.response.status === 401) {
              this.showWarnNotif(error.response.data.error)
            } else {
              this.showErrNotif(error.response.data.error || `${error.response.status} ${error.response.statusText}`)
            }
          } else {
            this.showErrNotif(error.message || error)
          }
        })
    }
  }
}
</script>
