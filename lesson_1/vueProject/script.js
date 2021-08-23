Vue.component('goods-list', {
    props: ['goods'],
    template: `
      <div class="goods-list">
        <goods-item v-for="good in goods" :good="good"></goods-item>
      </div>
    `
})

Vue.component('goods-item', {
    props: ['good'],
    template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button class={{good.product_name}}>Добавить</button>
      </div>
    `
});

Vue.component('basket-items', {
    props: ['goods'],
    data() {
        return {
            basket: []
        }
    },
    methods: {

    }
})

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
      <div class="find-item" v-on:find-item='find(searchLine)'>
        <input v-model="searchLine">
        
        <button @click="find(searchLine)">Найти</button>
        <item-found :searchLine='searchLine'></item-found>
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
        // goodsStatusView: 1,
        // searchLine: '',
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
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            // this.filteredGoods = goods;
            console.log(this.goods)
        });
    }
});