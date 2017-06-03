<template>
<footer class="footer">
  <div class="subfooter">
    <div class="subfooter-container">
        <span>
            Copyrights <i class="fa fa-copyright" aria-hidden="true"></i> 2016-2017 <router-link to="/">Thy Tin</router-link>
        </span>
        <div class="menu-list"> 
            <span>
                <router-link to="/">Home</router-link>
            </span> 
            <span>
                <router-link to="/posts">Blog</router-link>
            </span>
            <span>
                <router-link to="/about">About</router-link>
            </span> 
            <span>
                <a herf="" blank="_target" >Github</a>
            </span>
        </div>
    </div>
  </div>
</footer>
</template>
<script>

export default {
 
}
</script>
<style lang="stylus" scoped>
@import  '../stylus/style.styl'
footer
    width:100%
    color:#666
    font:.7em/1.6 fontawesome
    a
        color:#999
        transition:color .3s
        &:hover
            color:#ddd

// .subfooter-topp
//     width:100%
//     padding:4em 0
//     min-height:300px
//     background:#1a1a1a

// .subfooter-top-containerp
//     fullWidth()
//     padding:0 20px
//     display:flex
//     justify-content:space-between
//     align-items:flex-start
//     @media (max-width:901px)
//         flex-flow:column

.subfooter
    height:38px
    background:#222
    line-height:@height

.subfooter-container
    fullWidth()
    padding:0 20px

.menu-list
    display:inline-block
    @media (max-width:601px)
        display:none
    float:right
    span
        margin:0 8px
</style>
