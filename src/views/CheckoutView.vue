<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/orders">回訂單列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ order.id }}</li>
      </ol>
    </nav>
    <div class="my-3 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table align-middle">
          <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          </thead>
          <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-end">
          <router-link to="/orders">回訂單列表</router-link>
          <button v-if="order.is_paid === false" class="btn btn-danger">確認付款</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.order = response.data.order
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        this.$httpMessageState(error.response, '錯誤訊息')
        // alert(error.response.data.message)
      })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(url).then((response) => {
        // console.log(response.data)
        this.$httpMessageState(response, '付款')
        this.isLoading = false
        this.getOrder()
      }).catch((error) => {
        this.isLoading = false
        this.$httpMessageState(error.response, '錯誤訊息')
        // alert(error.response.data.message)
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
