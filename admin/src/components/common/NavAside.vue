<template>
 <el-row class="tac">
  <el-col >
    <img src="../../assets/logo.png" alt="" class="sidebar-logo">
    <el-menu default-active="1" class="el-menu-vertical-demo" > 
       <el-menu-item index="1"><router-link class="aside-nav-button" to="/posts"> <i class="fa fa-file-text " aria-hidden="true"></i></router-link></el-menu-item>
      <el-menu-item index="2"><router-link class="aside-nav-button" to="/tags"><i class="fa fa-tags " aria-hidden="true"></i></router-link></el-menu-item>
      <el-menu-item index="3"><router-link class="aside-nav-button" to="/me"><i class="fa fa-user " aria-hidden="true"></i></router-link></el-menu-item>
      <!--<el-menu-item index="4" class="aside-nav-bottom"><a class="aside-nav-button "><i class="fa fa-sign-out " aria-hidden="true"></i></a></el-menu-item>-->
    </el-menu>
     <nav class="aside-menu">
      <el-menu default-active="1" class="el-menu-vertical-demo" > 
        <el-menu-item index="4" class="aside-nav-bottom"><a class="aside-nav-button " href="javascript:void(0);" @click="deleteToken()"><i class="fa fa-sign-out " aria-hidden="true"></i></a></el-menu-item>
      </el-menu>
      </nav>



  </el-col>
  
 
</el-row>

</template>

<script>


import {
  mapActions
} from 'vuex'
export default {
  methods: { ...mapActions(['deleteToken'])
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='stylus' scoped>
.el-col {
    box-sizing: border-box;
    border-right: 1px solid #ececec;
    background-color: #f8f8f8;
    text-align:center;
    color: white;
    position: fixed;
    height: 100%;
    width:70px;
    padding: 12px 12px 24px 12px;
    left: 0;
    top: 0;
    .el-menu{
      margin-top: 30px;
    }
}
.el-menu{
  border-top: 1px solid #ececec;
  background-color: #f8f8f8;
  
  
}

.sidebar-logo {
    margin-top: 5px;
    width:36px;
}
.el-menu-item {
   padding: 15px 0 !important;
   height: 75px;
  //  line-height: 75px;
}
.aside-nav-button{
    cursor:pointer;
    display: inline-block;
     box-sizing: border-box;
    width: 45px;
    height: 45px;
    background:#fff;
    // padding-bottom: 10px;
    border: 1px solid #ececec;
    border-radius: 50%;
    color: #13ce66;
    .fa{
      font-size: 22px;
    }
}
.aside-menu{
    position: absolute;
    width:100%;
    left:0;
    bottom: 0;
    }
 
</style>

    