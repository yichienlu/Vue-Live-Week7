<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand">Pet Pet 後臺管理</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
             <router-link to="/admin/products" class="nav-link">商品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/blog" class="nav-link">部落格管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coolStuff" class="nav-link">酷東西 (✧≖‿ゝ≖)</router-link>
          </li>
        </ul>
        <div class="nav-item">
          <router-link to="/"  class="nav-link link-light">回前台</router-link>
        </div>
      </div>
    </div>
  </nav>

  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
// 驗證
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = token

        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.checkSuccess = true
          })
          .catch((error) => {
            // console.dir(error)
            // alert(error.response.data.message)
            this.$httpMessageState(error.response, '錯誤訊息')
            this.$router.push('/login')
          }
          )
      } else {
        // alert('您尚未登入')
        this.emitter.emit('push-message', {
          style: 'success',
          title: '錯誤訊息',
          content: '您尚未登入'
        })
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
