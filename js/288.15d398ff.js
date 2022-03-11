"use strict";(self["webpackChunkvue_live_week7"]=self["webpackChunkvue_live_week7"]||[]).push([[288],{9288:function(t,o,e){e.r(o),e.d(o,{default:function(){return dt}});var a=e(6252),i=e(9963),s=e(3577);const d={class:"container my-5"},c=(0,a._)("h1",null,"商品列表",-1),r=(0,a._)("option",{value:""},"全部商品",-1),n=(0,a._)("option",{value:"貓貓"},"貓貓",-1),l=(0,a._)("option",{value:"狗狗"},"狗狗",-1),u=[r,n,l],p={class:"text-center"},g={key:0},h={key:1},m={class:"row row-cols-2 row-cols-lg-4 g-3 mb-5"},_={class:"card h-100"},v={class:"card-body"},b={class:"card-title"},w={class:"card-subtitle mb-2 text-muted"},y={key:0,class:"h5"},k={key:1},C={class:"h6"},M={class:"h5"},f={class:"card-text"},L={class:"card-footer border-0 bg-white text-center"},z={class:"btn-group btn-group-sm mt-auto"},$=["onClick","disabled"],x=["onClick","disabled"],D={class:"spinner-grow spinner-grow-sm"},P=(0,a.Uk)(" 加到購物車 ");function I(t,o,e,r,n,l){const I=(0,a.up)("loading-component"),T=(0,a.up)("product-modal"),q=(0,a.up)("pagination-component");return(0,a.wg)(),(0,a.iD)("div",d,[c,(0,a.Wm)(I,{active:n.isLoading},null,8,["active"]),(0,a.Wm)(T,{product:n.product,ref:"productModal",onAddToCart:l.addToCart},null,8,["product","onAddToCart"]),(0,a.wy)((0,a._)("select",{id:"productSelect","onUpdate:modelValue":o[0]||(o[0]=t=>n.category=t),onChange:o[1]||(o[1]=t=>l.getProducts(1,n.category)),class:"form-select mb-3"},u,544),[[i.bM,n.category]]),(0,a._)("h3",p,[n.category?((0,a.wg)(),(0,a.iD)("span",g,(0,s.zw)(n.category),1)):((0,a.wg)(),(0,a.iD)("span",h,"全部商品"))]),(0,a._)("div",m,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.products,(t=>((0,a.wg)(),(0,a.iD)("div",{class:"col",key:t.id},[(0,a._)("div",_,[(0,a._)("div",{class:"card-img-top",style:(0,s.j5)(`height:200px; background-image: url(${t.imageUrl}); background-size: cover; background-position:center`)},null,4),(0,a._)("div",v,[(0,a._)("h5",b,(0,s.zw)(t.title),1),(0,a._)("h6",w,[t.price===t.origin_price?((0,a.wg)(),(0,a.iD)("div",y,(0,s.zw)(t.origin_price)+" 元 ",1)):((0,a.wg)(),(0,a.iD)("div",k,[(0,a._)("del",C,"原價 "+(0,s.zw)(t.origin_price)+" 元",1),(0,a._)("div",M,"現在只要 "+(0,s.zw)(t.price)+" 元",1)]))]),(0,a._)("p",f,(0,s.zw)(t.description),1)]),(0,a._)("div",L,[(0,a._)("div",z,[(0,a._)("button",{type:"button",class:"btn btn-outline-secondary",onClick:o=>l.openProductModal(t),disabled:n.isLoadingItem===t.id}," 查看更多 ",8,$),(0,a._)("button",{type:"button",class:"btn btn-danger",onClick:o=>l.addToCart(t.id),disabled:n.isLoadingItem===t.id},[(0,a.wy)((0,a._)("span",D,null,512),[[i.F8,n.isLoadingItem===t.id]]),P],8,x)])])])])))),128))]),(0,a.Wm)(q,{pages:n.pagination,onGetItems:l.getProducts},null,8,["pages","onGetItems"])])}const T={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},q={class:"modal-dialog",role:"document"},U={class:"modal-content border-0"},S={class:"modal-header bg-dark text-white"},W={class:"modal-title",id:"exampleModalLabel"},Z={class:"modal-body"},A={class:"row"},G={class:"col-sm-6"},V=["src"],j={class:"col-sm-6"},F={class:"badge bg-primary rounded-pill"},H={key:0,class:"h5"},K={key:1},Y={class:"h6"},B={class:"h5"},E={class:"input-group"},J=(0,a.Uk)("查看更多細節");function N(t,o,e,d,c,r){const n=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",T,[(0,a._)("div",q,[(0,a._)("div",U,[(0,a._)("div",S,[(0,a._)("h5",W,[(0,a._)("span",null,(0,s.zw)(e.product.title),1)]),(0,a._)("button",{type:"button",class:"btn-close",onClick:o[0]||(o[0]=(...t)=>r.closeModal&&r.closeModal(...t))})]),(0,a._)("div",Z,[(0,a._)("div",A,[(0,a._)("div",G,[(0,a._)("img",{class:"img-fluid",src:e.product.imageUrl,alt:""},null,8,V)]),(0,a._)("div",j,[(0,a._)("span",F,(0,s.zw)(e.product.category),1),(0,a._)("p",null,"商品描述："+(0,s.zw)(e.product.description),1),(0,a._)("p",null,"商品內容："+(0,s.zw)(e.product.content),1),e.product.price===e.product.origin_price?((0,a.wg)(),(0,a.iD)("div",H,(0,s.zw)(e.product.price)+" 元",1)):((0,a.wg)(),(0,a.iD)("div",K,[(0,a._)("del",Y,"原價 "+(0,s.zw)(e.product.origin_price)+" 元",1),(0,a._)("div",B,"現在只要 "+(0,s.zw)(e.product.price)+" 元",1)])),(0,a._)("div",null,[(0,a._)("div",E,[(0,a.wy)((0,a._)("input",{ref:"input",type:"number",class:"form-control","onUpdate:modelValue":o[1]||(o[1]=t=>c.qty=t),min:"1",step:"1",onkeypress:"return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"},null,512),[[i.nr,c.qty,void 0,{number:!0}]]),(0,a._)("button",{type:"button",class:"btn btn-primary",onClick:o[2]||(o[2]=(...t)=>r.addToCart&&r.addToCart(...t))},"加入購物車")])]),(0,a.Wm)(n,{to:`/product/${e.product.id}`,onClick:r.closeModal},{default:(0,a.w5)((()=>[J])),_:1},8,["to","onClick"])])])])])])],512)}var O=e(7424),Q=e.n(O),R={name:"ProductModal",props:["product"],data(){return{modal:{},qty:1}},watch:{id(){this.getProduct()}},methods:{openModal(){this.modal.show()},closeModal(){this.modal.hide(),setTimeout((()=>{this.qty=1}),500)},addToCart(){this.$emit("add-to-cart",this.product.id,this.qty)}},mounted(){this.modal=new(Q())(this.$refs.modal)}},X=e(3744);const tt=(0,X.Z)(R,[["render",N]]);var ot=tt,et=e(2148),at=e(4902),it={data(){return{cartData:{carts:[]},products:[],product:{},category:"",pagination:{},currentPage:1,isLoading:!1,isLoadingItem:""}},components:{ProductModal:ot,PaginationComponent:et.Z},methods:{getProducts(t=1,o=""){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/yclu/products/?page=${t}&category=${o}`).then((t=>{this.products=t.data.products,this.pagination=t.data.pagination,this.isLoading=!1})).catch((t=>{this.$httpMessageState(t.response,"錯誤訊息"),this.isLoading=!1}))},openProductModal(t){this.isLoading=!0,this.product=t,this.$refs.productModal.openModal(),this.isLoading=!1},addToCart(t,o=1){if(o<1||o%1!==0)return void this.emitter.emit("push-message",{style:"success",title:"錯誤訊息",content:"輸入數量錯誤"});const e={product_id:t,qty:o};this.isLoadingItem=t,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/yclu/cart",{data:e}).then((t=>{this.$httpMessageState(t,"加入購物車"),at.Z.emit("get-cart"),this.$refs.productModal.closeModal(),this.isLoadingItem=""})).catch((t=>{this.$httpMessageState(t.response,"加入購物車"),this.isLoadingItem=""}))}},mounted(){this.getProducts()}};const st=(0,X.Z)(it,[["render",I]]);var dt=st}}]);
//# sourceMappingURL=288.15d398ff.js.map