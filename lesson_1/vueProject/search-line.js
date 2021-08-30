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

Vue.component('goods-finder', {
    props: ['goods', 'searchLine'],
    data() {
        return {
            lineOfSearch: this.searchLine,
            filteredGoods: []
        }
    },
    methods: {
        find(lineOfSearch) {
            const searchProductText = new RegExp(`${lineOfSearch}`);
            this.filteredGoods = []
            if (lineOfSearch == ' ' || lineOfSearch == '') {
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
      v-on:find-item='find(lineOfSearch)'>
      <h3>
       Поиск
      </h3>
        <input v-model="lineOfSearch">
        
        <button @click="find(lineOfSearch)">Найти</button>
        <div class='goods-list' v-for='item in filteredGoods'></div>
        <found-item v-for='item in filteredGoods' :item='item'></found-item>
      </div>
    `
})