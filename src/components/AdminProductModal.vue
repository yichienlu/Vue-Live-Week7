<template>
  <div id="adminProductModal" ref="adminProductModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="tempProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearRefs()"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <h3 class="mb-2">主要圖片</h3>
              <div class="mb-4">
                <label for="imageUrl" class="form-label">圖片網址</label>
                <input id="imageUrl" v-model="tempProduct.imageUrl" type="text" class="form-control form-control-sm mb-2" placeholder="請輸入圖片連結">
                <div class="input-group input-group-sm mb-2">
                  <input type="file" class="form-control" id="input-imageUrl" aria-label="Upload" ref="file">
                  <button class="btn btn-outline-secondary" :disabled="!this.imageData" type="button" id="upload-imageUrl" @click="uploadImage">上傳</button>
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl">
              </div>
              <h3 class="mb-2">次要圖片</h3>
              <!-- 網址+圖片 -->
              <div class="mb-3" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                  <label :for="`imageUrl${key}`" class="form-label">圖片網址</label>
                  <input :id="`imageUrl${key}`" v-model="tempProduct.imagesUrl[key]" type="text" class="form-control form-control-sm mb-2"
                    placeholder="請輸入圖片連結">
                <div class="input-group input-group-sm mb-2">
                  <input type="file" class="form-control" id="`input-imagesUrl${key}`" aria-label="Upload" :ref="`file${key}`" data-images="imagesUrl">
                  <button class="btn btn-outline-secondary" type="button" id="`upload-imagesUrl${key}`" @click="uploadImages(key)">上傳</button>
                </div>
                <img class="img-fluid" :src="image">
              </div>
              <!-- 按鍵 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <button class="btn btn-outline-primary btn-sm d-block w-100 mb-1"
                  @click="tempProduct.imagesUrl.push('')">
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button class="btn btn-primary btn-sm d-block w-100 mb-1"
                  @click="createImages">
                  新增圖片
                </button>
              </div>
              <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                    刪除圖片
              </button>
            </div>
            <div class="col-lg-8 mt-5 mt-lg-0">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"  v-model.number="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tempProduct.description">
                  </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tempProduct.content">
                  </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="clearRefs()">
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="tempProduct.id" @click="editProduct">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else @click="addProduct">
            確認新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  name: 'AdminProductModal',
  props: ['product', 'currentPage'],
  data () {
    return {
      modal: {},
      tempProduct: {},
      images: [],
      imageData: null
    }
  },
  inject: ['emitter'],
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  methods: {
    clearRefs () {
      this.$refs.file.value = null
      if (Array.isArray(this.tempProduct.imagesUrl)) {
        this.images = [...document.querySelectorAll('[data-images]')]
        this.images.forEach(function (item) {
          item.value = null
        })
      }
    },
    addProduct () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, { data: this.tempProduct })
        .then((response) => {
          this.clearRefs()
          // alert(response.data.message)
          this.$httpMessageState(response, '新增商品')
          this.$emit('get-products', this.currentPage)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '新增商品')
        })
    },
    editProduct () {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
        .then((response) => {
          this.clearRefs()
          this.$httpMessageState(response, '編輯商品')
          // alert(response.data.message)
          this.$emit('get-products', this.currentPage)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '編輯商品')
        })
    },
    createImages () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },

    uploadImage () {
      // console.log(this.$refs.file.files[0])
      const uploadedFile = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          if (response.data.success) {
            this.tempProduct.imageUrl = response.data.imageUrl
            this.emitter.emit('push-message', {
              style: 'success',
              title: '圖片上傳結果',
              content: '圖片上傳成功'
            })
          } else {
            this.$refs.file.value = ''
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '圖片上傳結果',
              content: response.data.message
            })
          }
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '圖片失敗')
          // if (error.response?.data) {
          //   this.$httpMessageState(error.response, '圖片失敗')
          // } else {
          //   this.emitter.emit('push-message', {
          //     style: 'danger',
          //     title: '圖片上傳結果',
          //     content: '請確認是否正確選取圖片'
          //   })
          // }
        })
    },
    uploadImages (key) {
      const uploadedFile = this.$refs[`file${key}`][0].files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)

      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          this.tempProduct.imagesUrl[key] = response.data.imageUrl
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.adminProductModal)
  }
}
</script>
