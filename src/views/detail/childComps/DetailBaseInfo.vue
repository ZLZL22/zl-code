<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
   <div class="info-title">{{goods.title}}</div>
   <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
  </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

     <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

</div>
</template>

<script>

export default {
   name:"DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
}
</script>

<style>
.info-title{
  padding: 0 8px;
  color:black;

}
.info-price{
  margin-top: 10px;
  position: relative;
  margin-left: 13px;
}
.n-price{
   font-size: 24px;
    color: var(--color-high-text);
}
.o-price{
    font-size: 13px;
    margin-left: 11px;
    text-decoration: line-through;
}
.discount{
    background-color: var(--color-high-text);
    color: white;
    font-size: 15px;
    border-radius: 8px;
    margin-left: 6px;
    position: absolute;
    top: 2px;
}
.info-other{
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 14px;
  border-bottom: 2px solid rgba(100,100,100,.1);
  justify-content: space-around;
}
 .info-service {
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    border-bottom: 2px solid rgba(100,100,100,.1);
  }

  .info-service-item span {
    font-size: 13px;

  }
 .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
    .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
