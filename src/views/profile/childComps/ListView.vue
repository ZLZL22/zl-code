<template>
  <div class="normal-list">
    <div v-for="(item, index) in listData" :key="index" class="item">
        <span class="icon">
          <img :src="iconURL(item)" alt="">
        </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
   name:"ListView",
   props: {
			listData: {
				type: Array,
        default() {
					return []
        }
      }
    },
    methods: {
			iconURL(item) {
				return require('assets/img/profile/' + item.icon)
      }
    }
	}
</script>

<style>
  .normal-list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
    margin-top: 15px;
  }
  .icon img{
    width: 20px;
    height: 20px;
  }
   .normal-list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
    margin-left: 15px;

  }
   .item .info{
     position: absolute;
     top: -5px;
     left: 25px;

  }



</style>
