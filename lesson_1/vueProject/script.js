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

Vue.component('basket-list', {
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

Vue.component('basket-item', {
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

Vue.component('goods-finder', {
    props: ['goods'],
    data() {
        return {
            searchLine: '',
            filteredGoods: []
        }
    },
    methods: {
        find(searchLine) {
            const searchProductText = new RegExp(`${searchLine}`);
            this.filteredGoods = []
            if (searchLine == ' ' || searchLine == '') {
                return this.filteredGoods = []
            }
            this.goods.forEach(good => {
                if (searchProductText.test(good.product_name)) {
                    this.filteredGoods.push(good)
                    console.log(good)
                }
            });
        }
    },
    template:
        `
      <div class="find-item" 
      v-on:find-item='find(searchLine)'>
        <input v-model="searchLine">
        
        <button @click="find(searchLine)">Найти</button>
        <div class='goods-list' v-for='item in filteredGoods'></div>
        <found-item v-for='item in filteredGoods' :item='item'></found-item>
      </div>
    `
})

Vue.component('found-item', {
    props: ['item'],
    template:
        `
    <div class="goods-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
    </div>
    `
})

let API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basket: [],
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },
        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        }
    },
    mounted() {
        this.makeGETRequest(`/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            // this.filteredGoods = goods;
            console.log(this.goods)
        });
        this.makeGETRequest(`/cartData`, (goods) => {
            this.basket = JSON.parse(goods);
            // this.filteredGoods = goods;
            console.log(this.goods)
        });
    }
});