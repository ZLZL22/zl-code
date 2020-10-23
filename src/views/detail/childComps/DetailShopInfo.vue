<template>
   <div class="shop-info">
     <div class="shop-top">
         <img :src="shop.logo">
        <span class="title">{{shop.name}}</span>
    </div>

     <div class="shop-middle">
       <div class="shop-middle-item shop-middle-left">

          <div class="info-sells">
                 <div class="sells-count">{{shop.sells}}</div>
                 <div class="sells-text">总销量</div>
          </div>
          <div class="info-goods">
                 <div class="goods-count">{{shop.goodsCount}}</div>
                <div class="goods-text">全部宝贝</div>
          </div>
       </div>

      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
        </div>
     </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
</template>

<script>
export default {
   name:"DetailShopInfo",
   props:{
     shop:{
       type:Object,
       dafault(){
         return {}
       }
     }
   }
}
</script>

<style>
.shop-info{
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;

}
.shop-top{
  display: flex;
  line-height: 45px;
  }
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.1);
  margin-right: 15px;
}
.shop-middle{
  display: flex;
  margin-top: 26px;
  align-items: center;

}
 .shop-middle-item {
    flex: 1;
  }
  .shop-middle-left{
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .shop-middle-left{
    display: flex;
    align-items: center;
    color: black;
    text-align: center;
  }

  .info-goods{
    margin-left: 25px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }
  .shop-middle-right table {
     width: 130px;
    margin-left: 20px;
  }
  .shop-middle-right table td {
    padding: 5px 5px;
  }
   .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }
  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }




</style>
