<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a href="#" class="page-link" @click.prevent="updatePage(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item"
      :class="{active: page===pages.current_page}"
      v-for="page in pages.total_pages"
      :key="page + 'page'">
          <a href="#" class="page-link" @click.prevent="updatePage(page)">{{page}}</a>
      </li>

      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a class="page-link" @click="updatePage(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// import emitter from '@/libs/emitter'

export default {
  name: 'PaginationComponent',
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('get-Items', page)
    }
  }
}
</script>
