<template>
<div class="toast" v-show="show">
<div>{{message}}</div>
</div>

</template>

<script>
export default {
   name:"Toast",
   props:{
     message:{
       type:String,
       dafault(){
         return ''
       }
      },
      show:{
       type:Boolean,
       dafault(){
         return false
       }
    }
  }

}
</script>

<style>
.toast{
position: fixed;
top: 50%;
left: 50%;
background-color: rgba(0, 0, 0, 0.596);
transform: translate(-50%,-50%);
color:white;
padding: 8px 10px;
font-size: 20px;

}
</style>
