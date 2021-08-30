class CreateHamburger {
    constructor() {
        self.hamburgerSize = '';
        self.hamburgerStuffings = [];
        self.hamburgerToppings = [];
        self.hamburgerSizeList = [{ 'большой': { 'цена': 100, 'калории': 40 } }, { 'маленький': { 'цена': 50, 'калории': 20 } }];
        self.stuffingsList = [{ 'сыр': { 'цена': 10, 'калории': 20 } }, { 'салат': { 'цена': 20, 'калории': 5 } }, { 'картошка': { 'цена': 15, 'калории': 10 } }];
        self.toppingsList = [{ 'приправа': { 'цена': 15, 'калории': 0 } }, { 'майонез': { 'цена': 20, 'калории': 5 } }];
    };

    chooseBurgerSize(BurgerSize) {  //Выбрать размер бургера
        self.hamburgerSizeList.forEach(itemBurger => {
            // console.log(Object.keys(itemBurger))
            if (Object.keys(itemBurger) == BurgerSize) {
                self.hamburgerSize = itemBurger;
            }
        })
    };



    addStuffing(stuffing) {         // Добавить начинку }
        self.stuffingsList.forEach(itemStuffing => {
            if (Object.keys(itemStuffing) == stuffing) {
                self.hamburgerStuffings.push(itemStuffing);
            }
        })
    };

    addTopping(topping) { // Добавить добавку }
        self.toppingsList.forEach(itemTopping => {
            if (Object.keys(itemTopping) == topping) {
                self.hamburgerToppings.push(itemTopping);
            }
        })
    };
};

class Hamburger extends CreateHamburger {
    removeTopping(topping) {                    // Убрать добавку }
        self.hamburgerToppings.forEach((itemTopping, indexTopping) => {
            if (Object.keys(itemTopping) == topping) {
                hamburgerToppings.splice(indexTopping, 1);
            }
        })
    };

    getToppings() {                            // Получить список добавок }
        let toppList = []
        let toppItem
        self.hamburgerToppings.forEach(toppingItem => {
            toppItem = toppingItem[Object.keys(toppingItem)]
            toppList.push(toppItem)
            // console.log(Object.keys(toppingItem))
        })
        return toppList
    };

    getSize() {                                 // Узнать размер гамбургера }
        let burgerSize = Object.keys(self.hamburgerSize)
        // console.log(burgerSize)
        return burgerSize
    };

    getStuffing() {                             // Узнать начинку гамбургера }
        let stuffList = []
        let stuffItem
        self.hamburgerStuffings.forEach(stuffingItem => {
            stuffItem = stuffingItem[Object.keys(stuffingItem)]
            stuffList.push(stuffItem)
            // console.log(Object.keys(stuffingItem))
        })
        return stuffList
    };

    toppingsPrice() {
        let toppingItems = this.getToppings()
        // console.log(toppingItems)
        let toppingPrice = 0
        let toppingItemPrice = toppingItems.forEach(toppItem => {
            toppingPrice += toppItem['цена']
        })
        // console.log(toppingPrice)
        return toppingPrice
    }

    stuffingPrice() {
        let stuffingItems = this.getStuffing()
        // console.log(stuffingItems)
        let stuffingPrice = 0
        let stuffingItemPrice = stuffingItems.forEach(stuffItem => {
            stuffingPrice += stuffItem['цена']
        })
        // console.log(stuffingPrice)
        return stuffingPrice
    }

    burgerPrise() {
        let burgerPrice = self.hamburgerSize[this.getSize()]['цена']
        return burgerPrice
    }

    calculatePrice() {                          // Узнать цену }
        let totalSum = this.burgerPrise() + this.toppingsPrice() + this.stuffingPrice()
        console.log(`Общая стоимость ${totalSum}`)
        return totalSum
    };

    getBurgerCalories() {
        let burgerCalories = self.hamburgerSize[this.getSize()]['калории']
        // console.log(burgerCalories)
        return burgerCalories
    }

    getStuffingCallories() {
        let stuffingItems = this.getStuffing()
        let stuffingCalories = 0
        let stuffingItemCalories = stuffingItems.forEach(stuffItem => {
            stuffingCalories += stuffItem['калории']
        })
        // console.log(stuffingCalories)
        return stuffingCalories
    }

    getToppingsCallories() {
        let toppingItems = this.getToppings()
        let toppingCalories = 0
        toppingItems.forEach(toppItem => {
            toppingCalories += toppItem['калории']
        })
        // console.log(toppingCalories)
        return toppingCalories
    }

    calculateCalories() {
        let totalCalories = this.getBurgerCalories() + this.getStuffingCallories() + this.getToppingsCallories()
        console.log(`Всего калорий ${totalCalories}`)
        return totalCalories
    };
};

CheezeBureger = new Hamburger();
CheezeBureger.chooseBurgerSize('маленький')
// CheezeBureger.getSize()
CheezeBureger.addStuffing('сыр')
CheezeBureger.addStuffing('салат')
CheezeBureger.addTopping('майонез')
CheezeBureger.addTopping('приправа')
CheezeBureger.removeTopping('приправа')
// CheezeBureger.stuffingPrice()
// CheezeBureger.getStuffing()
// CheezeBureger.getToppings()
CheezeBureger.calculatePrice()
// CheezeBureger.stuffingPrice()
// CheezeBureger.getToppingsCallories()
CheezeBureger.calculateCalories()

