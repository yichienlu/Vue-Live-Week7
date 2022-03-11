<template>
  <div class="container my-5">
    <h1>商品列表</h1>
    <loading-component :active="isLoading"></loading-component>
    <!-- 產品Modal -->
    <product-modal :product="product" ref="productModal" @add-to-cart="addToCart"></product-modal>
    <!-- 產品Modal -->
    <select id="productSelect" v-model="selectedCategory" @change="getProducts(1,selectedCategory)" class="form-select mb-3">
      <option value="" disabled>請選擇商品分類</option>
      <option value="">全部商品</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <h3 class="text-center">
      <span v-if="selectedCategory">{{selectedCategory}}</span>
      <span v-else>全部商品</span>
    </h3>
    <div class="row row-cols-2 row-cols-lg-4 g-3 mb-5">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <div class="card-img-top" :style="`height:200px; background-image: url(${product.imageUrl}); background-size: cover; background-position:center`"></div>
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              <div class="h5" v-if="product.price===product.origin_price">
                  {{ product.origin_price }} 元
              </div>
              <div v-else>
                  <del class="h6">原價 {{ product.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </h6>
            <p class="card-text">{{ product.description }}</p>
          </div>
          <div class="card-footer border-0 bg-white text-center">
            <div class="btn-group btn-group-sm mt-auto">
              <button type="button" class="btn btn-outline-secondary"
                  @click="openProductModal(product)" :disabled="isLoadingItem===product.id">
                  查看更多
              </button>
              <button type="button" class="btn btn-danger" @click="addToCart(product.id)"
                  :disabled="isLoadingItem===product.id">
                  <span class="spinner-grow spinner-grow-sm"
                      v-show="isLoadingItem===product.id"></span>
                  加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination-component :pages="pagination" @get-items="getProducts"></pagination-component>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      products: [],
      product: {},
      categories: [],
      selectedCategory: '',
      pagination: {},
      currentPage: 1,
      isLoading: false,
      isLoadingItem: ''
    }
  },
  components: {
    ProductModal,
    PaginationComponent
  },
  methods: {
    getProducts (page = 1, selectedCategory = '') {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${selectedCategory}`)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.isLoading = false
          console.log(this.products)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    },
    getCategories () {
      console.log(this.products)
      // this.categories = Array.from(new Set(this.products.map(i => i.category)))
    },
    openProductModal (product) {
      this.isLoading = true
      this.product = product
      this.$refs.productModal.openModal()
      this.isLoading = false
    },
    addToCart (id, qty = 1) {
      if (qty < 1 || qty % 1 !== 0) {
        // alert('輸入數量錯誤')
        this.emitter.emit('push-message', {
          style: 'success',
          title: '錯誤訊息',
          content: '輸入數量錯誤'
        })
        return
      }
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '加入購物車')
          emitter.emit('get-cart')
          this.$refs.productModal.closeModal()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '加入購物車')
          this.isLoadingItem = ''
        })
    }
  },
  mounted () {
    this.getProducts()
    setTimeout(function () {
      this.categories = Array.from(new Set(this.products.map(i => i.category)))
      // console.log(this.products)
    }, 0)
  }
}

</script>
