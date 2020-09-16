<template>
    <div class="page-hero" v-if="model"> 
        <div class="topbar bg-black py-2 text-white px-3 d-flex ai-center">
            <img src="../../assets/logo.png" height="30">
            <div class="px-2 flex-1">
                <span class="text-white">王者荣耀</span>
                <span class="text-white ml-2">攻略站</span>
            </div>
            <router-link to="/" tag="div">更多英雄 &gt;</router-link>
        </div>
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="info d-flex flex-cloumn p-3 h-100 jc-end text-white">
                <div class="fs-sm">{{model.title}}</div>
                <div class="fs-xl my-2">{{model.name}}</div>
                <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>

                <div class="d-flex jc-start">
                    <div class="d-flex jc-start flex-1">
                        <div>难度</div>
                        <div class="scroes bg-orange-diff mx-2">{{model.scores.difficult}}</div>
                        <div>技能</div>
                        <div class="scroes bg-red-attack mx-2">{{model.scores.skills}}</div>
                        <div>攻击</div>
                        <div class="scroes bg-blue-1 mx-2">{{model.scores.attack}}</div>
                        <div>生存</div>
                        <div class="scroes bg-gray-survive mx-2">{{model.scores.survive}}</div>
                    </div>
                    <router-link tag="div" to="/" class="text-gray">更多英雄 &gt;</router-link>
                </div>
                
            </div>
            <div class="nav jc-around pt-3 pb-2 border-bottom bg-white">
                <div class="nav-item active">英雄初识</div>
                <div >进阶攻略</div>
            </div>
            <swiper>
                <swiper-slide>
                    <div class="bg-white">
                        <div class="d-flex jc-around p-2 fs-primary bg-white">
                        <router-link tag="button" to="/" class="p-2 flex-1 ai-center mx-1">
                            <i class="iconfont iconMenu mr-4 text-primary"></i><span>英雄介绍视频</span>
                        </router-link> 
                        <router-link tag="button" to="/" class="p-2 flex-1 ai-center mx-1">
                            <i class="iconfont iconMenu mr-4 text-primary"></i><span>一图识别英雄</span>
                        </router-link>
                        </div>
                        <div class="skills bg-white mt-4">
                            <div class="d-flex jc-around skills-icon px-2">
                                <img 
                                class="icon"
                                :class="{active:currentSkillIndex === i}"
                                @click="currentSkillIndex = i"
                                v-for="(item,i) in model.skills" 
                                :key="item.name"
                                :src="item.icon" alt="">
                            </div>
                            <div v-if="currentSkill">
                                <div class="d-flex ai-center px-3">
                                    <h3>{{currentSkill.name}}</h3><span class="ml-3 text-gray">(冷却值：{{currentSkill.delay}} 消耗： {{currentSkill.cost}})</span>
                                </div>
                                <p class="px-2">
                                    {{currentSkill.description}}
                                </p>
                            </div>

                        </div>

                        <div class="equipment">
                        <m-card icon="Menu" title="出装推荐">
                            <div class="text-gray fs-lg">顺风出装</div>
                            <div class="d-flex jc-around mt-3 border-bottom">
                                <div 
                                class="d-flex flex-cloumn ai-center"
                                v-for="item in model.items1"
                                :key="item.name">
                                <img style="width:3rem;height:3rem;border-radius:50%" :src="item.icon">
                                <div class="fs-xxs my-2">{{item.name}}</div>
                                </div>
                            </div>
                            <div class="text-gray fs-lg mt-3">逆风出装</div>
                            <div class="d-flex jc-around mt-3">
                                <div 
                                class="d-flex flex-cloumn ai-center"
                                v-for="item in model.items2"
                                :key="item.name">
                                <img style="width:3rem;height:3rem;border-radius:50%" :src="item.icon">
                                <div class="fs-xxs my-2">{{item.name}}</div>
                                </div>
                            </div>
                        </m-card>
                    </div>
                    </div>
                    <m-card icon="Menu" title="使用技巧">
                        <p>
                            {{model.usageTips}}
                        </p>
                    </m-card>
                    <m-card icon="Menu" title="对抗技穷">
                        <p>
                            {{model.battleTips}}
                        </p>
                    </m-card>
                    <m-card icon="Menu" title="团战思路">
                        <p>
                            {{model.teamTips}}
                        </p>
                    </m-card>
                    
                    
                </swiper-slide>
                <swiper-slide>
                    2
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        id:{required:true}
    },
    data(){
        return {
            model:null,
            currentSkillIndex:0
        }
    },
    computed:{
        currentSkill(){
            return this.model.skills[this.currentSkillIndex]
        }
    },
    methods:{
        async fetch(){
            const res = await this.$http.get(`/heroes/${this.id}`)
            this.model = res.data
        }
        
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang='scss' scoped>
@import '../../assets/scss/_variables.scss';
    .page-hero{
        .top{
            height: 50vw;
            background: #fff no-repeat top center;
            background-size:auto 100% ;
        }
        .info{
             background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            .scroes{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            text-align: center;
            line-height: 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        }
        .skills{
            img.icon{
                border-radius: 50%;
                height:5rem;
                width:5rem;
                &.active{
                    border:3px solid map-get($colors, "primary" )
                }
            }
        }
        .equipment-icon{
            width:2rem;
            height: 2rem;
            border-radius: 50%;
        }
        
    }
</style>