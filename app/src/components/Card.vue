<template>
    <!-- start of news-card -->
    <div class="card bg-white p-3 mt-3">
        <div class="card-header d-flex ai-center pb-3">
        <i :class="['iconfont',`icon${icon}`]"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont iconmenu"></i>
        </div>
        <div class="card-body mt-3">
            <slot></slot>
        </div>

      </div>
</template>

<script>
    export default {
        props:{
            //required:true表示title这一项是必填的
            title:{type:String, required:true},
            icon:{type:String, required:true}
        }
    }
</script>

<style lang='scss' scoped>
@import '../assets/scss/_variables.scss';
    .card {
        border-bottom:1px solid $border-color;
        .card-header {
            border-bottom:1px solid $border-color;
        }
    }
</style>