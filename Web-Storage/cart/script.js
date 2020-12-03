// находим товары и корзину
let itemBox = document.querySelectorAll('.item'),
    cart = document.getElementById('content');

// получаем данные из localStorage
function getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
}

// записываем данные в хранилище
function setCartData(o) {
    localStorage.setItem('cart', JSON.stringify(o));
}

// добавление товара в корзину
function addToCart() {
    // блокируем кнопку на время работы с корзиной
    this.disabled = true;
    // получаем данные из корзины или создаем новый объект, если данные отсутствуют
    let cartData = getCartData() || {},
        // родительский элемент кнопки "Buy"
        parentBox = this.parentNode,
        // id товара
        itemId = this.getAttribute('data-id'),
        // название товара
        itemTitle = parentBox.querySelector('.title').innerHTML,
        // стоимость товара
        itemPrice = parentBox.querySelector('.price').innerHTML;
    // +1 к товару
    if (cartData.hasOwnProperty(itemId)) {
        cartData[itemId][2] += 1;
    } else {
        // + товар
        cartData[itemId] = [itemTitle, itemPrice, 1];
    }
    // обновляем данные в localStorage
    if (!setCartData(cartData)) {
        // снимаем блокировку кнопки
        this.disabled = false;
    }
}

// устанавливаем обработчик событий на каждую кнопку "Buy"
for (let i = 0; i < itemBox.length; i++) {
    itemBox[i].querySelector('.add').addEventListener('click', addToCart)
}

// содержимое корзины
function openCart() {
    // получаем данные из хранилища
    let cartData = getCartData(),
        totalItems = '',
        totalGoods = 0,
        totalPrice = 0;
    // формируем данные для вывода
    if (cartData !== null) {
        totalItems = '<table><tr><th>Name</th><th>Price</th><th>Amount</th></tr>';
        for (let items in cartData) {
            totalItems += '<tr>';
            for (let i = 0; i < cartData[items].length; i++) {
                totalItems += '<td>' + cartData[items][i] + '</td>';
            }
            totalItems += '</tr>';
            totalGoods += cartData[items][2];
            totalPrice += cartData[items][1] * cartData[items][2];
        }
        totalItems += '</table>';
        cart.innerHTML = totalItems;
        cart.append(document.createElement('p').innerHTML = 'Goods: ' + totalGoods + '. Price: ' + totalPrice);
    } else {
        // если в корзине пусто
        cart.innerHTML = 'empty';
    }
}
// открываем корзину
document.getElementById('open').addEventListener('click', openCart);

// очищаем корзину
document.getElementById('clear').addEventListener('click', () => {
    localStorage.removeItem('cart');
    cart.innerHTML = 'сleared';
});
