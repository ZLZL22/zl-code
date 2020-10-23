<template>
 <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的信息</div></nav-bar>
    <user-info></user-info>
    <account-info></account-info>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
   </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import UserInfo from '@/views/profile/childComps/UserInfo'
import AccountInfo from '@/views/profile/childComps/AccountInfo'
import ListView from '@/views/profile/childComps/ListView'
export default {
  name:'Profile',
  components:{
    NavBar,
    UserInfo,
    AccountInfo,
    ListView
  },
     data(){
        return {
		    orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      }
    }
  }
</script>

<style>
  #profile {
    background-color: #f2f2f2;
  }
 .nav-bar{
   background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    font-size: 18px;
 }
   .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
