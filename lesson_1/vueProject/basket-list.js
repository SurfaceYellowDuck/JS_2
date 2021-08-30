// import module from "./basket-item";
// const _basketItem = module
const basketItem = Vue.component('basket-item', {
    props: ['good'],
    template: `
      <div class="basket-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}<br>{{good.quantity}}
        </p>
        <p></p>
        <button class="basket-delete-button" @click='deleteItemFromCart'>Удалить</button>
      </div>
    `,
    methods: {
        deleteItemFromCart() {
            // console.log((this.good))
            this.$emit('deleteFromCart', this.good)
            // console.log(this.good)
        }
    }
});

const basketList = Vue.component('basket-list', {
    props: ['goods', 'basket'],
    template: `
      <div class="basket-list">
        <h3>Корзина</h3>
        <basket-item 
            v-for="good in basket" 
            :good="good"
            :key="good.product_name"
            @deleteFromCart="deleteFromCart">
        </basket-item>

      </div>
    `,
    methods: {
        _deleteFromCart(data) {
            for (el in this.basket) {
                if (this.basket[el].product_name == data.product_name) {
                    this.basket.splice(el, 1)
                    break
                }
            }
        },
        deleteFromCart(data) {
            return fetch('/delFromCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                , this._deleteFromCart(data)
        },
    }
})
