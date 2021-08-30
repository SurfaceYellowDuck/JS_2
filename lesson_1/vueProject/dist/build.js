/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./basket-list.js":
/*!************************!*\
  !*** ./basket-list.js ***!
  \************************/
/***/ (() => {

eval("// import module from \"./basket-item\";\r\n// const _basketItem = module\r\nconst basketItem = Vue.component('basket-item', {\r\n    props: ['good'],\r\n    template: `\r\n      <div class=\"basket-item\">\r\n        <h3>{{ good.product_name }}</h3>\r\n        <p>{{ good.price }}<br>{{good.quantity}}\r\n        </p>\r\n        <p></p>\r\n        <button class=\"basket-delete-button\" @click='deleteItemFromCart'>Удалить</button>\r\n      </div>\r\n    `,\r\n    methods: {\r\n        deleteItemFromCart() {\r\n            // console.log((this.good))\r\n            this.$emit('deleteFromCart', this.good)\r\n            // console.log(this.good)\r\n        }\r\n    }\r\n});\r\n\r\nconst basketList = Vue.component('basket-list', {\r\n    props: ['goods', 'basket'],\r\n    template: `\r\n      <div class=\"basket-list\">\r\n        <h3>Корзина</h3>\r\n        <basket-item \r\n            v-for=\"good in basket\" \r\n            :good=\"good\"\r\n            :key=\"good.product_name\"\r\n            @deleteFromCart=\"deleteFromCart\">\r\n        </basket-item>\r\n\r\n      </div>\r\n    `,\r\n    methods: {\r\n        _deleteFromCart(data) {\r\n            for (el in this.basket) {\r\n                if (this.basket[el].product_name == data.product_name) {\r\n                    this.basket.splice(el, 1)\r\n                    break\r\n                }\r\n            }\r\n        },\r\n        deleteFromCart(data) {\r\n            return fetch('/delFromCart', {\r\n                method: 'POST',\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                , this._deleteFromCart(data)\r\n        },\r\n    }\r\n})\r\n\n\n//# sourceURL=webpack://vueproject/./basket-list.js?");

/***/ }),

/***/ "./goods-list.js":
/*!***********************!*\
  !*** ./goods-list.js ***!
  \***********************/
/***/ (() => {

eval("Vue.component('goods-item', {\r\n  props: ['good'],\r\n  template:\r\n    `\r\n    <div class=\"goods-item\" >\r\n      <h3>{{ good.product_name }}</h3>\r\n      <p>{{ good.price }}</p>\r\n      \r\n      <button \r\n          @click='addToCart'>\r\n      Добавить</button>\r\n    </div>\r\n  `,\r\n  methods: {\r\n    addToCart() {\r\n      this.$emit('addToCart', this.good);\r\n\r\n    }\r\n  }\r\n});\r\n\r\nVue.component('goods-list', {\r\n  props: ['goods', 'basket'],\r\n  template: `\r\n    <div class=\"goods-list\">\r\n      <goods-item \r\n      v-for=\"good in goods\" \r\n      :good=\"good\" \r\n      :key=\"good.product_name\"\r\n      @addToCart=\"addToCart\">\r\n      </goods-item>\r\n    </div>\r\n  `,\r\n  methods: {\r\n    _addToCart(data) {\r\n      for (el in this.basket) {\r\n        if (this.basket[el].product_name == data.product_name) {\r\n          this.basket[el].quantity += 1\r\n          return\r\n        }\r\n      }\r\n      data.quantity = 1\r\n      this.basket.push(data)\r\n\r\n    },\r\n    addToCart(data) {\r\n      return fetch('/addToCart', {\r\n        method: 'POST',\r\n        headers: {\r\n          'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(data)\r\n      })\r\n        , this._addToCart(data)\r\n    },\r\n\r\n  },\r\n\r\n\r\n})\r\n\n\n//# sourceURL=webpack://vueproject/./goods-list.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ (() => {

eval("let API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\r\nconst app = new Vue({\r\n    el: '#app',\r\n    data: {\r\n        goods: [],\r\n        // filteredGoods: [],\r\n        basket: [],\r\n        searchLine: ''\r\n    },\r\n    methods: {\r\n        makeGETRequest(url, callback) {\r\n            var xhr;\r\n\r\n            if (window.XMLHttpRequest) {\r\n                xhr = new XMLHttpRequest();\r\n            } else if (window.ActiveXObject) {\r\n                xhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n            }\r\n\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState === 4) {\r\n                    callback(xhr.responseText);\r\n                }\r\n            }\r\n\r\n            xhr.open('GET', url, true);\r\n            xhr.send();\r\n        },\r\n        makePOSTRequest(url, data, callback) {\r\n            let xhr;\r\n\r\n            if (window.XMLHttpRequest) {\r\n                xhr = new XMLHttpRequest();\r\n            } else if (window.ActiveXObject) {\r\n                xhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n            }\r\n\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState === 4) {\r\n                    callback(xhr.responseText);\r\n                }\r\n            }\r\n\r\n            xhr.open('POST', url, true);\r\n            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');\r\n\r\n            xhr.send(data);\r\n        }\r\n    },\r\n    mounted() {\r\n        this.makeGETRequest(`/catalogData`, (goods) => {\r\n            this.goods = JSON.parse(goods);\r\n            // this.filteredGoods = goods;\r\n            console.log(this.goods)\r\n        });\r\n        this.makeGETRequest(`/cartData`, (goods) => {\r\n            this.basket = JSON.parse(goods);\r\n            // this.filteredGoods = goods;\r\n            console.log(this.goods)\r\n        });\r\n    }\r\n});\n\n//# sourceURL=webpack://vueproject/./script.js?");

/***/ }),

/***/ "./search-line.js":
/*!************************!*\
  !*** ./search-line.js ***!
  \************************/
/***/ (() => {

eval("Vue.component('found-item', {\r\n    props: ['item'],\r\n    template:\r\n        `\r\n    <div class=\"goods-item\">\r\n        <h3>{{ item.product_name }}</h3>\r\n        <p>{{ item.price }}</p>\r\n    </div>\r\n    `\r\n})\r\n\r\nVue.component('goods-finder', {\r\n    props: ['goods', 'searchLine'],\r\n    data() {\r\n        return {\r\n            lineOfSearch: this.searchLine,\r\n            filteredGoods: []\r\n        }\r\n    },\r\n    methods: {\r\n        find(lineOfSearch) {\r\n            const searchProductText = new RegExp(`${lineOfSearch}`);\r\n            this.filteredGoods = []\r\n            if (lineOfSearch == ' ' || lineOfSearch == '') {\r\n                return this.filteredGoods = []\r\n            }\r\n            this.goods.forEach(good => {\r\n                if (searchProductText.test(good.product_name)) {\r\n                    this.filteredGoods.push(good)\r\n                    console.log(good)\r\n                }\r\n            });\r\n        }\r\n    },\r\n    template:\r\n        `\r\n      <div class=\"find-item\" \r\n      v-on:find-item='find(lineOfSearch)'>\r\n      <h3>\r\n       Поиск\r\n      </h3>\r\n        <input v-model=\"lineOfSearch\">\r\n        \r\n        <button @click=\"find(lineOfSearch)\">Найти</button>\r\n        <div class='goods-list' v-for='item in filteredGoods'></div>\r\n        <found-item v-for='item in filteredGoods' :item='item'></found-item>\r\n      </div>\r\n    `\r\n})\n\n//# sourceURL=webpack://vueproject/./search-line.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./goods-list.js"]();
/******/ 	__webpack_modules__["./basket-list.js"]();
/******/ 	__webpack_modules__["./search-line.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./script.js"]();
/******/ 	
/******/ })()
;