export default {
    //mutations的唯一目的是修改state的状态
    //mutations中的方法比较简单
    addCounter(state, payload) {
        payload.count += 1
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}