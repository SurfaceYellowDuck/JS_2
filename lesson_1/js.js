class ProductsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    };

    createRenderProductItem() {
        return `<div class="catalog-goods-item"><h3>${this.title}</h3><p class='good-price'>${this.price}</p><button class='basket-item-append ${this.title}'>Добавить</button></div>`;
    };

};

class ProductsList {
    constructor() {
        this.goodlist = []
    };

    fetchGoods() {
        this.goodlist = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    };

    renderProductList() {
        let listHtml = ''
        this.goodlist.forEach(good => {
            const goodItem = new ProductsItem(good.title, good.price);
            listHtml += goodItem.createRenderProductItem();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    findItem() { }
};

class BasketItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    };

    createRenderBasketItem() {
        return `<div class="basket-goods-item ${this.title}"><h3>${this.title}</h3><p class='good-price'>цена: ${this.price}</p><p class='good-price'>количество: ${this.quantity}</p> 
        <button class='basket-item-delete ${this.title}'>Удалить</button></div>`;
    };
}

class BasketList {
    constructor() {
        this.basketList = [];
        this.totalCost = 0;
        this.totalQuantity = 0;
    };

    // appendItem() {

    //     this.basketList = [
    //         { title: 'Shirt', price: 150, quantity: 5 },
    //         { title: 'Socks', price: 50, quantity: 4 },
    //     ];
    // };

    renderBasketItems() {
        // $( ".cart-button" ).click(function(){

        // };
        let listHtml = '';
        this.basketList.forEach(good => {
            const goodItem = new BasketItem(good.title, good.price, good.quantity);
            listHtml += goodItem.createRenderBasketItem();
        });
        document.querySelector('.basket-goods-items').innerHTML = '';
        document.querySelector('.basket-goods-items').innerHTML = listHtml;
    }

    _totalQuantity() {
        this.basketList.forEach(item => {
            this.totalQuantity += item.quantity
        })
    }
    _totalCost() {
        this.basketList.forEach(item => {
            this.totalCost += item.price * item.quantity
        })
    }
    renderBasketInfo() {
        this.totalCost = 0
        this.totalQuantity = 0
        this._totalQuantity()
        this._totalCost()
        document.querySelector('.info-basket').innerHTML = '';
        document.querySelector('.info-basket').insertAdjacentHTML('beforeend', `<div class='info-basket'>В корзине ${this.totalQuantity} товаров на сумму ${this.totalCost} руб</div>`)
    }




}




const Productlist = new ProductsList();
Productlist.fetchGoods()
const basket = new BasketList();
// basket.appendItem();

window.onload = () => {  // При клике по кнопке корзина рендерятся её элементы, стоимость и количество элементов
    Productlist.renderProductList()
    $(".cart-button").click(function () {
        basket.renderBasketItems();
        basket.renderBasketInfo();
    });
    function PushItemToBasket() {
        $(".catalog-goods-item").click(function (event) {
            let targetName = event.target.className
            console.log(targetName)
            if (targetName.includes('append')) {
                // console.log(target_name)
                itemName = targetName.split(' ')[1];
                bigFor: for (productItem of Productlist.goodlist) {
                    if (productItem.title == itemName) {
                        if (basket.basketList.length == 0) {
                            productItem.quantity = 1
                            basket.basketList.push(productItem)
                            console.log(basket.basketList)
                        }
                        else {
                            for (basketItem of basket.basketList) {
                                if (productItem.title === basketItem.title) {
                                    basketItem.quantity += 1
                                    console.log(basket.basketList)
                                    break bigFor;
                                }

                            }
                            productItem.quantity = 1
                            basket.basketList.push(productItem)
                            console.log(basket.basketList)
                            // break bigFor;
                        }

                    }
                }
            }
        })
    }
    function DeleteItemFromBasket() {
        $(".basket-items").click(function (event) {
            let targetName = event.target.className
            console.log(targetName)
            if (targetName.includes('delete')) {
                // console.log(target_name)
                itemName = targetName.split(' ')[1];
                basket.basketList.forEach((productItem, indexItem) => {
                    if (productItem.title == itemName) {
                        basket.basketList.splice(indexItem, 1)
                        console.log(basket.basketList)
                    }
                })
            }
        })
    }
    PushItemToBasket()
    DeleteItemFromBasket();
};


let makeGETRequestPromice = (url) => {
    return new Promise((success, error) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = () => {
            setTimeout(() => {
                if (xhr.readyState === 4) {
                    success(xhr)
                }
                else if (xhr.status == 404) {
                    error('resourse not found')
                }
                else if (xhr.status == 500) {
                    error('error')
                }
            }, 250)

        }
        if (url) {
            xhr.open('GET', url, true);
            xhr.send()
        }
        else {
            error('url does not exists')
        }
    })
}
let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

makeGETRequestPromice(`${url}/catalogData.json`)
    .then((xhr) => {
        console.log(xhr.responseText);
    }),
    (error) => {
        console.log(error)
    };

const app = new Vue({
    el: '#app',
    data: {
        name: 'nik'
    },
    methods: {
        clickHandler() {
            console.log('click');
        }
    },
    computed: {
        upperCaseName() {
            return this.name.toUpperCase()
        }
    }
});
