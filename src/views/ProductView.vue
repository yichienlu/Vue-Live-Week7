<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/products">商品列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-6">
        <h2>{{ product.title }}</h2>
        <div>{{ product.description }}</div>
        <div>{{ product.content }}</div>
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id)">
          加到購物車
        </button>
      </article>
      <div class="col-6">
        <div class="text-center">
          <img :src="product.shownUrl" class="m-2" style="height: 300px; object-fit: cover; width:100%">
        </div>
        <template v-for="image in product.imagesUrl" :key="image">
          <img :src="image" alt="商品照片" class="images m-2"
                style="height: 150px;" @mouseenter="product.shownUrl=image" @mouseout="product.shownUrl=product.imageUrl">
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      product: {},
      isLoading: false
    }
  },
  methods: {
    addToCart (id, qty = 1) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty
      }
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '加入購物車')
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '加入購物車')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.isLoading = true
    this.$http
      .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`)
      .then((response) => {
        this.product = response.data.product
        this.product.shownUrl = this.product.imageUrl
        this.isLoading = false
      })
      .catch((error) => {
        // console.dir(error)
        // alert(error.response.data.message)
        this.$httpMessageState(error.response, '錯誤訊息')
        this.isLoading = false
      })
  }
}
</script>
