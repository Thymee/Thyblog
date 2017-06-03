<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
   <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  .fade-transition{
    transition: opacity .2s ease;
  }
  .fade-enter, .fade-leave{
    opacity: 0;
  }
</style>
