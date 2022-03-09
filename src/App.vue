<template>
  <ToastMessages></ToastMessages>
  <router-view/>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/libs/emitter'

export default {
  components: { ToastMessages },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style lang="scss">
  @import './assets/stylesheets/all'
</style>
