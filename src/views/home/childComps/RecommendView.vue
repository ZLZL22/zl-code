<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item" :key="item.id">
     <a link="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
     </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
   props:{
     recommends:{
       type:Array,
       dafault(){
         return[]
       }
     }
   }
}
</script>

<style>
.recommend{
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 10px 0 17px;
  border-bottom: 8px solid #eee;
}
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 7px;
  }
.recommend-item {
    flex: 1;
  }
</style>
