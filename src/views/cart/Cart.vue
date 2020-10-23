<template>
<div class="cart">
   <nav-bar class="cart-nav"><div slot="center">购物车({{length}})</div></nav-bar>
   <cart-list></cart-list>
   <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import cartList from '@/views/cart/childComps/cartList'
import cartBottomBar from '@/views/cart/childComps/cartBottomBar'

import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    components:{
      NavBar,
      cartList,
      cartBottomBar
    },
    computed:{
      //将vuex中的getters映射到组件的计算属性当中，映射到的数据能够直接使用
      ...mapGetters({length:'cartLength'})
    }
}
</script>

<style>
.cart-nav{
  background-color: var(--color-tint);
  color: #fff;

}

.cart{
  height: 1000px;
}
</style>
