<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

<tab-control  :titles="['流行', '新款', '精选']" @tabClick="tabClick"
 ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>


<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScoll" :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control  :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
</scroll>
   <!--.native可以使组件也被监听--->
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'


import { getHomeMultidata,getHomeGoods } from "network/home";
import { debounce } from "common/utils"



export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
          banners: [],
          recommends: [],
          goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell':{page: 0, list: []},
        },
         currentType: 'pop',
         //一键回到顶部的显示与隐藏
         isShowBackTop:false,
         //tabControl的旋顶位移量
         tabOffsetTop: 0,
         //默认不吸顶
         isTabFixed: false,
         //记录页面激活scroll y轴滚动的距离
          saveY:0
    }
  },
  created() {
       this.getHomeMultidata()
       //请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
},
    mounted(){
        //监听item的图片加载完成
       const refresh = debounce(this.$refs.scroll.refresh)
       this.$bus.$on('itemImageLoad',()=>{
          refresh()
       })
     },
   computed:{
       showGoods(){
         return this.goods[this.currentType].list
         }
   },
   //页面激活时scroll y轴滚动的距离
   activated(){
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     //刷新一下页面
     this.$refs.scroll.refresh()
   },
   //对比 激活时y轴滚动的距离 和离开时y轴滚动的距离
   deactivated(){
    this.saveY = this.$refs.scroll.getscrollY()
    //console.log(this.saveY );
   },
    methods:{
        /**
       * 事件监听的方法
       */

      tabClick(index){
     // switch 后面括号内的“表达式”必须是整数类型  switch下的 case和 default必须用一对大括号{}括起来。
     //switch是“选择”语句，不是“循环”语句
        switch(index){
          case 0:
            this.currentType ='pop'
            break
            case 1:
            this.currentType = 'new'
            break
            case 2:
            this.currentType = 'sell'
            break
            }
            this.$refs.tabControl1.currentIndex =index
            this.$refs.tabControl2.currentIndex =index
      },
    //监听滚动的位置（使用scroll组件传过来的事件）
      contentScoll(position){
        // console.log(position);
        //判断BackTop 是否显示
        this.isShowBackTop =(-position.y) >1000
        //决定tabContral 是否吸顶
        this.isTabFixed= (-position.y) > this.tabOffsetTop
      },
      //回到顶部
      backClick(){
        //通过refs拿到scroll组件的scrollTO方法 并传入参数
       this.$refs.scroll.scrollTo(0,0)
      },
      //上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      //获取轮播图的移动距离
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
        /**,
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })

    },
      getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
      //console.log(res);
    //扩展运算符（spread）是三个点（...）它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //调用scroll组件的finishPullUp方法 完成上拉加载更多
        this.$refs.scroll.finshPullUp()
     })
  },
}

}
</script>

<style scoped>

#home {
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

}

.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
