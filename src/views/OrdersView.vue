<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <h1>訂單列表</h1>
    <div>
      <table class="table align-middle">
        <thead>
        <th>訂單編號</th>
        <th>訂單日期/時間</th>
        <th>訂單內容</th>
        <th>訂購人資訊</th>
        <th>付款狀態</th>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            {{ $filters.date(order.create_at) }} <br>
            {{ $filters.time(order.create_at) }}
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="product, key in Object.values(order.products)" :key="key">
                {{ product.product.title}} x {{ product.qty }}
              </li>
            </ul>
            金額：{{ order.total }}
          </td>
          <td>
            {{ order.user.name }} <br>
            {{ order.user.email }} <br>
            {{ order.user.tel }} <br>
            {{ order.user.address }}
          </td>
          <td>
            <div v-if="!order.is_paid">
              尚未付款
              <router-link :to="`/checkout/${order.id}`">
                <button class="btn btn-secondary">去付款</button>
              </router-link>
            </div>
            <div v-else class="text-success">付款完成
              <router-link :to="`/checkout/${order.id}`">
                <button class="btn btn-outline-secondary">查看訂單</button>
              </router-link>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <pagination-component :pages="pagination" @get-items="getOrders"></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    getOrders () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`)
        .then((response) => {
          this.orders = response.data.orders
          this.pagination = response.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
