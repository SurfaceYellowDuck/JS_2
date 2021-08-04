class ProductsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    };

    createRenderProductItem() {
        return `<div class="goods-item"><h3>${this.title}</h3><p class='good-price'>${this.price}</p></div>`;
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
};

class BasketItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    };

    createRenderBasketItem() {
        return `<div class="goods-item"><h3>${this.title}</h3><p class='good-price'>цена: ${this.price}</p><p class='good-price'>количество: ${this.quantity}</p></div>`;
    };
}

class BasketList {
    constructor() {
        this.basketList = [];
        this.totalCost = 0;
        this.totalQuantity = 0;
    };

    appendItem() {
        this.basketList = [
            { title: 'Shirt', price: 150, quantity: 5 },
            { title: 'Socks', price: 50, quantity: 4 },
        ];
    };

    renderBasketItems() {
        // $( ".cart-button" ).click(function(){

        // };
        let listHtml = '';
        this.basketList.forEach(good => {
            const goodItem = new BasketItem(good.title, good.price, good.quantity);
            listHtml += goodItem.createRenderBasketItem();
        });
        document.querySelector('.basket-items').innerHTML = '';
        document.querySelector('.basket-items').innerHTML = listHtml;
    }
    renderBasketInfo() {
        this.TotalCost()
        this.TotalQuantity()
        document.querySelector('.basket-info').innerHTML = '';
        document.querySelector('.basket-info').insertAdjacentHTML('beforeend', `В корзине ${this.totalQuantity} товаров на сумму ${this.totalCost} руб`)
        this.totalCost = 0
        this.TotalQuantity = 0
    }

    TotalCost() {
        this.basketList.forEach(item => {
            this.totalCost += item.price * item.quantity
        })
    }

    TotalQuantity() {
        this.basketList.forEach(item => {
            this.totalQuantity += item.quantity
        })
    }
}




const Productlist = new ProductsList();
Productlist.fetchGoods()
const basketList = new BasketList();
basketList.appendItem();

window.onload = () => {  // При клике по кнопке корзина рендерятся её элементы, стоимость и количество элементов
    Productlist.renderProductList()
    $(".cart-button").click(function () {
        basketList.renderBasketItems();
        basketList.renderBasketInfo();
    });
};
