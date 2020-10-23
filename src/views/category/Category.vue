<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
        <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import TabMenu from '@/views/category/childComps/TabMenu'
  import TabControl from '@/components/content/tabControl/TabControl'
  import Scroll from '@/components/common/scroll/Scroll'
  import TabContentCategory from '@/views/category/childComps/TabContentCategory'
  import TabContentDetail from '@/views/category/childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";

  export default {
		name: "Category",
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
		  return {
        //16条总数据
        categories: [],
        //初始化后的数据
        categoryData: {},
       //定义一个侧边栏的索引
        currentIndex: -1
      }
    },
    created() {
		  //请求分类数据
      this._getCategory()
    },
    computed: {
      //左侧分类的具体数据
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      //右下角三个分类的具体数据
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell':[]
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
         })
      },
       //通过索引获取左侧子类别的数据
      _getSubcategories(index) {
        this.currentIndex = index;
       //通过索引和序号确定子类别
        const mailKey = this.categories[index].maitKey;
       getSubcategory(mailKey).then(res => {
          //左侧分类的数据
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    //获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        //发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
         //将获取的右下角数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
         //事件响应相关的方法
       selectItem(index) {
        this._getSubcategories(index)
      }
    }
	}
</script>

<style scoped>
  #category {
    height: 100%;
  }
 .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
