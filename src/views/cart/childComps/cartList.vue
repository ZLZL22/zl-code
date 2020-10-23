<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item  v-for="(item, index) in cartList" :key="index" :itemInfo="item">

      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "@/components/common/scroll/Scroll";
import cartListItem from "@/views/cart/childComps/cartListItem";

export default {
  name: "cartList",
  computed: {
    //将vuex中的getters映射到组件的计算属性当中，映射到的数据能够直接使用
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    cartListItem,
  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.car-list {
  height: calc(100%- 44px- 49px);
}

</style>
