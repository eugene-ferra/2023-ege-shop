class CartItem {
    constructor(obj, count, parentSelector) {
        this.id = obj.id
        this.count = obj.count
        this.img = obj.imageSet[1]
        this.name = obj.name
        this.counterNum = count
        this.chars = obj.chars
        this.parent = document.querySelector(parentSelector)

        this.sale = obj.sale
        this.new = obj.new

        this.priceSum = this.counterNum * this.chars.Скидка
        this.sum = this.counterNum * this.chars.Цена
        this.card = document.createElement('div')
    }

    render() {
        this.card.classList.add('mini-card')
        this.card.innerHTML =
            `
                <div class="mini-card__del">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10002 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06055L4.88474 20.1871C4.98356 21.7682 6.29471 23 7.8789 23H16.1211C17.7053 23 19.0164 21.7682 19.1153 20.1871L19.9395 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0073C19.0018 4.99995 18.9963 4.99995 18.9908 5H16.9C16.4367 2.71776 14.419 1 12 1C9.58104 1 7.56329 2.71776 7.10002 5ZM9.17071 5H14.8293C14.4175 3.83481 13.3062 3 12 3C10.6938 3 9.58254 3.83481 9.17071 5ZM17.9355 7H6.06445L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1192 20.0624L17.9355 7ZM14.279 10.0097C14.83 10.0483 15.2454 10.5261 15.2068 11.0771L14.7883 17.0624C14.7498 17.6134 14.2719 18.0288 13.721 17.9903C13.17 17.9517 12.7546 17.4739 12.7932 16.9229L13.2117 10.9376C13.2502 10.3866 13.7281 9.97122 14.279 10.0097ZM9.721 10.0098C10.2719 9.97125 10.7498 10.3866 10.7883 10.9376L11.2069 16.923C11.2454 17.4739 10.83 17.9518 10.2791 17.9903C9.72811 18.0288 9.25026 17.6134 9.21173 17.0625L8.79319 11.0771C8.75467 10.5262 9.17006 10.0483 9.721 10.0098Z" fill="#0F1729"></path> </g></svg>
                </div>
                <div class="mini-card__inner">
                <a href="product.html" class="mini-card__img-block link">
                    <img src="${this.img}" alt="${this.name}" class="mini-card__img">
                </a>
                <div class="mini-card__main">
                    <a href="product.html" class="mini-card__title link">${this.name}</a>
                    <h4 class="mini-card__price-title">Цена:</h4>
                    <div class="mini-card__price-block">
                    <div class="mini-card__price mini-card__price--old">${this.formatPrice(this.chars.Цена)}</div>
                    <div class="mini-card__price">${this.formatPrice(this.chars.Скидка)}</div>
                    </div>
                    <h5 class="mini-card__count-title">Количество:</h5>
                    <div class="card__counter-block">
                    <span class="card__counter-minus">-</span>
                    <span class="card__counter-num">${this.counterNum}</span>
                    <span class="card__counter-plus">+</span>
                    </div>
                </div>
                <div class="mini-card__summary">
                    <h5 class="mini-card__sum-title">Сумма:</h5>
                    <span class="mini-card__sum mini-card__sum--old old">${this.formatPrice(this.sum)}</span>
                    <span class="mini-card__sum new">${this.formatPrice(this.priceSum)}</span>
                </div>
                </div>
        `

        this.card.querySelectorAll('.link').forEach(item => {
            item.addEventListener('click', () => {
                localStorage.setItem('currentCard', this.id)
            })
        })

        this.card.querySelector('.mini-card__del').addEventListener('click', () => {
            let data = JSON.parse(localStorage.getItem('cart'))
            let obj = data.find(item => item.id == this.id)
            let index = data.indexOf(obj)
            data.splice(index, 1)
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(data))

            document.querySelectorAll('.header__cart').forEach(item => {
                item.textContent = JSON.parse(localStorage.getItem('cart')).length
            })
        })


        this.card.querySelector('.card__counter-plus').addEventListener('click', () => {
            if (this.counterNum < this.count) {

                this.card.querySelector('.card__counter-num').animate([
                    { transform: "translateY(0%)" },
                    { transform: "translateY(120%)" },
                    { transform: "translateY(-120%)" },
                    { transform: "translateY(0%)" },
                ], {
                    duration: 300,
                    iterations: 1,
                    easing: 'ease-out'
                });

                setTimeout(() => {
                    this.counterNum = this.counterNum + 1
                    let data = JSON.parse(localStorage.getItem('cart'))
                    let obj = data.find(item => item.id == this.id)
                    let index = data.indexOf(obj)
                    data[index].count = this.counterNum
                    localStorage.removeItem('cart')
                    localStorage.setItem('cart', JSON.stringify(data))

                    this.priceSum = this.counterNum * this.chars.Скидка
                    this.sum = this.counterNum * this.chars.Цена

                    this.card.querySelector('.card__counter-num').textContent = this.counterNum

                    this.card.querySelector('.old').textContent = `${this.formatPrice(this.sum)}`
                    this.card.querySelector('.new').textContent = `${this.formatPrice(this.priceSum)}`
                }, 150)


            }
        })

        this.card.querySelector('.card__counter-minus').addEventListener('click', () => {
            if (this.counterNum > 1) {

                this.card.querySelector('.card__counter-num').animate([
                    { transform: "translateY(0%)" },
                    { transform: "translateY(-120%)" },
                    { transform: "translateY(120%)" },
                    { transform: "translateY(0%)" },
                ], {
                    duration: 300,
                    iterations: 1,
                    easing: 'ease-out'
                });

                setTimeout(() => {
                    this.counterNum = this.counterNum - 1
                    let data = JSON.parse(localStorage.getItem('cart'))
                    let obj = data.find(item => item.id == this.id)
                    let index = data.indexOf(obj)
                    data[index].count = this.counterNum
                    localStorage.removeItem('cart')
                    localStorage.setItem('cart', JSON.stringify(data))

                    this.priceSum = this.counterNum * this.chars.Скидка
                    this.sum = this.counterNum * this.chars.Цена

                    this.card.querySelector('.card__counter-num').textContent = this.counterNum

                    this.card.querySelector('.old').textContent = `${this.formatPrice(this.sum)}`
                    this.card.querySelector('.new').textContent = `${this.formatPrice(this.priceSum)}`
                }, 150)


            }
        })

        if (this.sale) this.card.classList.add('mini-card--sale')
        if (this.new) this.card.classList.add('mini-card--new')

        this.parent.append(this.card)
    }

    formatPrice(price) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'UAH' }).format(price)
    }

    removeItem() {
        this.card.remove()
    }

    getSum() {
        return this.priceSum
    }

    getOrderData() {

        let obj = {
            sum: this.priceSum,
            title: this.name,
            count: this.counterNum
        }

        return obj
    }

}

export default CartItem