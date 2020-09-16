<template>
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom ai-center">
            <div class="iconfont iconback text-blue"></div>
            <strong class="flex-1 fs-md text-blue pl-1 text-ellipsis">
                {{model.title}}
            </strong>
            <div class="text-grey fs-xs">
                2020-8-29
            </div>
        </div>
        <div v-html="model.body" class="px-4 body fs-lg"></div>
        <div class="border-top">
            <div class="d-flex ai-center py-3 ">
                <div class="iconfont iconicon-  px-3"></div>
                <div class="text-blue fs-xl">相关资讯</div>
            </div>
            <div class="fs-lg pt-3 pl-2">
                <router-link 
                tag="div"
                :to="`/article/${item._id}`"
                v-for="item in model.related"
                :key="item._id"
                class="py-2"
                >
                {{item.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id:{required: true}
        },
        data(){
            return {
                model: null
            }
        },
        watch: {
            id: 'fetch',
            // id(){
            //   this.fetch()
            // }
        },
        methods:{
            async fetch(){
                const res = await this.$http.get(`articles/${this.id}`)
                this.model = res.data
            }
        },
        created(){
            this.fetch()
        }
    }
</script>

<style lang='scss' scoped>
    .page-article{
        .iconback{
            font-size: 1.6923rem;
        }
        .body{
            img{
                width: 100%;
                height: auto;
            }
        }
    }
</style>