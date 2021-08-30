Vue.component('goods-item', {
  props: ['good'],
  template:
    `
    <div class="goods-item" >
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      
      <button 
          @click='addToCart'>
      Добавить</button>
    </div>
  `,
  methods: {
    addToCart() {
      this.$emit('addToCart', this.good);

    }
  }
});

Vue.component('goods-list', {
  props: ['goods', 'basket'],
  template: `
    <div class="goods-list">
      <goods-item 
      v-for="good in goods" 
      :good="good" 
      :key="good.product_name"
      @addToCart="addToCart">
      </goods-item>
    </div>
  `,
  methods: {
    _addToCart(data) {
      for (el in this.basket) {
        if (this.basket[el].product_name == data.product_name) {
          this.basket[el].quantity += 1
          return
        }
      }
      data.quantity = 1
      this.basket.push(data)

    },
    addToCart(data) {
      return fetch('/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        , this._addToCart(data)
    },

  },


})
