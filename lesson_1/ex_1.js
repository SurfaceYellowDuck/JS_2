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
    let goods_items = document.querySelector('.goods-list')
    for (el of goodsList) {                                  //Первый вариант избавиться от запятых - поместить всё в цикл. Всё дело в том, 
        goods_items.insertAdjacentHTML('afterbegin', el)     // что когда массив преобразуется в строку методы innerHTML и insertAdjacentHTML добавляют
    }                                                        // запятую после каждого элемента массива.                           

    goods_items.innerHTML = goodsList.join(' ')             //Второй вариант избавиться от запятых - можно добавить метод join, который заменит все
}                                                            //запятые на пробелы.    


window.onload = () => renderGoodsList(goods);


