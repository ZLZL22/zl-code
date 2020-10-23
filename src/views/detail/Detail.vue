<template>
  <div id="detail">
    <!-- <div>{{$store.state.cartList.length}}</div>
    <ul>
      <li v-for="item in $store.state.cartList" :key="item.id">{{item}}</li>
    </ul> -->

   <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
   <detail-swiper :images="topImages"></detail-swiper>
   <detail-base-info :goods="goods"></detail-base-info>
   <detail-shop-info :shop="shop"></detail-shop-info>
   <detail-goods-info :detail-info ="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
   <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
   <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
  <!-- <goods-list :goods="recommends"></goods-list> -->
 </scroll>
   <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  <toast :message="messages" :show="shows"></toast>
   </div>
</template>

<script>
 import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
 import detailSwiper from '@/views/detail/childComps/detailSwiper'
 import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
 import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
 import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
 import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
 import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
 import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import Toast from '@/components/common/toast/Toast'

// import GoodsList from '@/components/content/goods/GoodsList'

import {debounce} from '@/common/utils'
import  {getDetail,Goods,Shop, GoodsParam,getRecommend} from '@/network/detail'

export default {
    name:"Detail",
    components:{
      DetailNavBar,
      detailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      // GoodsList
      DetailBottomBar,
      BackTop,
      Toast
      },
    data(){
      return {
          iid:null,
          topImages: [],
          //定义商品信息
          goods:{},
          //商家信息
          shop:{},
          //商品详情数据
          detailInfo :{},
          //参数信息
          paramInfo:{},
          //评论信息
          commentInfo:{},
          //商品推荐信息
          recommends:[],
          //标题的y轴距离
          themeTopYs: [],
          getThemeTopY:null,
          currentIndex: 0,
        //一键回到顶部的显示与隐藏
         isShowBackTop:false,

         messages:'',
         shows:false
        }
    },
    created(){
      this.getThemeTopY=debounce(()=>{
        //console.log(1);
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //console.log(this.themeTopYs);
      },100)

        //保存详情页的id
      this.iid = this.$route.params.iid
      //根据id器请求参数
      getDetail(this.iid).then(res=>{
        //console.log(res);
         const data = res.result;
      // 获取顶部轮播图信息
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods ( data.itemInfo,data.columns,data.shopInfo.services)
      this.shop = new  Shop (data.shopInfo)
      // 获取商品详情数据信息
      this.detailInfo = data.detailInfo
      // 保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
     // 保存评论信息
        if (data.rate.cRate!==0) { this.commentInfo = data.rate.list[0]}
        //商品推荐信息
        getRecommend().then(res=>{
         // console.log(res);
          this.recommends =res.data.list
        })
      })
  },

    methods:{
       detailImageLoad(){
          this.$refs.scroll.refresh()
          this.getThemeTopY()
     },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        //console.log(position);
        const positionY =-position.y
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
         if(this.cucurrentIndex !==i && ((i <length-1 && positionY >= this.themeTopYs[i]&&positionY <this.themeTopYs[i+1] || i===length -1 && positionY >= this.themeTopYs[i] ))){
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
              //是否回到顶部
              this.isShowBackTop =(-position.y) >1000
         }
       }
      },
        backClick(){
        //通过refs拿到scroll组件的scrollTO方法 并传入参数
       this.$refs.scroll.scrollTo(0,0)
      },
      addToCart(){
        //获取购物车信息
        const product = {}
          product.image = this.topImages[0]
          product.title =this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.realPrice
          product.iid =this.iid
         //添加到购物车
         //this.$store.dispatch('xxx') 分发 action，
            this.$store.dispatch('addCart',product).then((res)=>{
              this.shows =true
              this.messages= res
              setTimeout(() => {
                this.shows =false,
                this.messages = ''
              }, 1500);
            })


      },
    },

}
</script>

<style  scoped>
 #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

.content{
  height: calc( 100% - 44px );
}
.detail-nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

</style>
