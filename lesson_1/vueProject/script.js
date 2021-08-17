let API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        basket: [],
        searchLine: '',
        isVisibleCart: 0,
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
        FilterGoods(searchLine) {
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
        },

        showBasket() {
            this.isVisibleCart = 1
        },

        hideBasket() {
            this.isVisibleCart = 0
        },

        basketClickHandlerOpen() {
            this.showBasket()
        },

        basketClickHandlerClose() {
            this.hideBasket()
        },

        clickHandler() {
            this.FilterGoods(this.searchLine)
            // console.log('click');
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