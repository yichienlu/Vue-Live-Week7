<template>
  <div class="container my-5">
    <Loading-component :active="isLoading"></Loading-component>
    <h1>PetPet資訊站</h1>
     <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/blog">PetPet資訊站</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ article.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ article.title }}</h2>
        <p>
          <small class="text-muted">{{ $filters.date(article.create_at) }}</small> -
          <small class="text-muted">作者：{{ article.author }}</small>
        </p>
        <img :src="article.imageUrl" alt="" class="img-fluid mb-3">
        <div v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      article: {},
      isLoading: false
    }
  },
  methods: {
    getArticle () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.$route.params.articleId}`
      this.$http.get(api).then((response) => {
        this.article = response.data.article
        this.isLoading = false
      }).catch((error) => {
        // alert(error.response.data.message)
        this.$httpMessageState(error.response, '錯誤訊息')
        this.isLoading = false
      })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>
