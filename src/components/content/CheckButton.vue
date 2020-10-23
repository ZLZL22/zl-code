<template>
  <div class="check-button" :class="{check: isChecked }">
  <img src="~assets/img/cart/tick.svg" alt="" class="img">
  </div>
</template>

<script>
export default {
    name:"CheckButton",
      props: {
		  isChecked: {
		    type: Boolean,
        default:false
      }
    },
}
</script>

<style >


.check-button{
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #ccc;

}
.img{
  position: relative;
  top: -5 px;
   }

.check{
    background-color: #ff8198;
    border-color: #ff8198;
}
</style>
