const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


// сократил запись функции путем её записи в одну строку.
const renderGoodsItem = (title = 'standart product', price = 0) => `<div class="goods-item"><h3>${title}</h3><p class='good-price'>${price}</p></div>`;
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    console.log(goodsList)
    document.querySelector('.goods-list').innerHTML = goodsList;
}

window.onload = () => renderGoodsList(goods);


