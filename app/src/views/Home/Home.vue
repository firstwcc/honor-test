<template>
  <div>

    <!-- strat-swiper -->
    <swiper  :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../../assets/images/2f4f389bc893dd15d99cd9221191a4f3.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../assets/images/5fea1e59d92f410284f3a66241831e44.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../assets/images/a5f9e9b86f9b28d331e3a1dafed99582.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" 
      slot="pagination">
      </div>
    </swiper>
    <!-- end of swiper -->

    <!-- start of  nav-icons-->
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-gray">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3"
        v-for="n in 10" 
        :key="n"
        >
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav-icons -->
    
    <!-- start of news-card -->
    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">

      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/article/${news._id}`"
        class="py-2 fs-lg d-flex"
        v-for="(news,i) in category.newsList"
        :key="i"
        >
          <span class="text-info">{{news.categoryName}}</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span clas="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>

      
    </m-list-card>

    <m-list-card icon="-superhero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center" 
          style="width:20%"
          v-for="(hero,i) in category.heroList"
          :key="i"
          >
          <img :src="hero.avatar" class="w-100">
          <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="Menu" title="英雄列表">
      
    </m-card>
    <m-card icon="Menu" title="英雄列表">
      
    </m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
  export default {
    filters:{
      date(val){
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        },
        newsCats: [],
        heroCats:[]
      }
    },
    methods:{
      //定义获取数据的方法接口获取数据
      async fetchNewsCats(){
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
        
      },
      async fetchHeroCats(){
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      }
    },
    created(){
      this.fetchNewsCats()
      this.fetchHeroCats()
    }
  }
</script>

<style lang='scss' scoped>
@import '../../assets/scss/variables';

  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem;
      background:map-get($colors, 'white');
      &.swiper-pagination-bullet-active {
        background:map-get($colors, 'info');
      }
    }
  }  
  .nav-icons{
    border-top:1px solid $border-color;
    border-bottom:1px solid $border-color;
    .nav-item{
      width:25%;
      border-right:1px solid $border-color;
      &:nth-child(4n){
        border-right:none;
      }
    } 
  }
</style>