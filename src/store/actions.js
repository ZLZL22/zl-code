export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //查找数组中是否有该商品  返回符合的item
            //context.state来获取 state
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                //判断oldProduct是否存在
            if (oldProduct) {
                //调用context.commit 提交一个 mutation
                context.commit('addCounter', oldProduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('添加新的商品')
            }
        })
    }
}