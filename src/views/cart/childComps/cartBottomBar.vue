<template>
  <div class="bottom-bar" v-if="$store.state.cartList.length !==0">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="allChecked"></check-button>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product">去计算: {{checkedLengh}}</span>
    </div>

  </div>
</template>

<script>
import CheckButton from '@/components/content/CheckButton'
export default {
  name:"BottomBar",
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return this.$store.state.cartList.filter(item =>{
        return item.checked
        //reduce（callback,initialValue)会传入两个参数，回调函数（callback）preValue是item的第一个值和初始值（initialValue）
      }).reduce((preValue,item)=>{
          return preValue + item.price *item.count
      },0).toFixed(2)
    },

  checkedLengh(){
     return this.$store.state.cartList.filter(item =>item.checked).length
     },
  isSelectAll(){
     return !this.$store.state.cartList.find(item=>!item.checked)
     }

   },
    methods:{
         allChecked(){
         if(this.isSelectAll){ //全部选中
             this.$store.state.cartList.forEach(item =>item.checked =false);
         }else{//部分选中 或者全部不选中
             this.$store.state.cartList.forEach(item =>item.checked = true)
            }

        }
    }
}
</script>

<style>
.bottom-bar{
  height: 40px;
  background-color: white;
  position: sticky;
  bottom: 49px;
  line-height: 40px;
}
.check-content{
  display: flex;
  padding: 5px;
}
.check-button{
   position: relative;
   top: 10px;

}
.check-content span{
   position: relative;
   left: 5px;
}
  .check-content .total-price {
    margin-left: 22px;
    font-size: 15px;
    color: #666;
  }

  .check-content .buy-product {
    background-color: orangered;
    color: #fff;
    width: 85px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: relative;
    left: 60px;
  }
</style>
