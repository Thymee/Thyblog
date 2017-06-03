<template>  
 <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <img src="../assets/logo.png">
      <el-alert :title="loginErrMsg" type="error" show-icon v-show="loginErr" class="flash-bar"></el-alert>
      <span class="title">
       欢迎登录
      </span>
      <el-row>
        <el-input
          v-model="username"
          placeholder="用户名"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
           @keyup.13="login">
        </el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>  


<script>
import{
  mapActions
}from 'vuex'
import md5 from 'md5'

export default {
    data() {
      return{
      username: '',
      password: '',
      loginErr: false,
      loginErrMsg: ''
      }
    },
    methods: {...mapActions(['createToken']),
    async login(){
      try {
        await this.createToken({
          username:this.username,
          password:md5(this.password).toUpperCase()
        })
      } catch (e) {
          console.log(e);
         this.loginErr = true
        this.loginErrMsg = e.error_message ? e.error_message.error : ''
      }
    }


      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // }
    }
  }
  








</script>


<style lang='stylus' scoped >
  // div{
  //   text-align: center;
  // } 
 x
 .el-row.content{
    padding: 16px;
 }
  img{
  display: block;
  margin: 10px auto;
  width: 50%;
  }
  .title{
    display: block;    
    font-size: 28px;
    margin-top: 20px;
  }
  .el-input{
    margin: 12px 0;
  }
  .el-button{
    width: 100%;
    margin-top: 12px;
  }

</style>