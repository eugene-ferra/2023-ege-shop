class FullCard {
  constructor(obj, parentSelector) {
    this.id = obj.id
    this.category = obj.category
    this.name = obj.name
    this.descr = obj.descr

    this.imageSet = obj.imageSet
    this.chars = obj.chars
    this.slidesHTML = '';
    this.charsHTML = ''
    this.imageSet.map((item, i) => {
      if (!(i == 0 || i == this.imageSet.length - 1)) {
        this.slidesHTML += `<div class="swiper-slide"> <img src="${item}" alt="${this.name}" /></div>`
      }
    })

    Object.keys(this.chars).forEach((item, i) => {
      if (Object.keys(this.chars)[i] == 'Цена' || Object.keys(this.chars)[i] == 'Скидка') {
        this.charsHTML += ''
      } else {
        this.charsHTML += `
      <div class="product__char">
          <span class="product__char-title">${Object.keys(this.chars)[i]}</span>
          <span class="product__char-value">${this.chars[Object.keys(this.chars)[i]]} ${this.chars[Object.keys(this.chars)[i]] === 'Вес' ? "кг" :
            Object.keys(this.chars)[i] === 'Объем' ? "л" :
              Object.keys(this.chars)[i] === 'Ширина' ? "мм" :
                Object.keys(this.chars)[i] === 'Высота' ? "мм" :
                  Object.keys(this.chars)[i] === 'Диаметр' ? "мм" :
                    Object.keys(this.chars)[i] === 'Толщина' ? "мм" :
                      Object.keys(this.chars)[i] === 'Мощность' ? "Вт" :
                        Object.keys(this.chars)[i] === 'Длина' &&
                          !(localStorage.getItem('category') === 'ruletka' || this.category === 'uroven'
                            || this.category === 'izolenta' || this.category === 'udlinnitel')
                          ? "мм" :
                          Object.keys(this.chars)[i] === 'Длина' &&
                            (this.category === 'ruletka' || this.category === 'uroven'
                              || this.category === 'izolenta' || this.category === 'udlinnitel')
                            ? "м" : ''
          }</span>
        </div>`
      }

    })

    this.articul = obj.articul
    this.count = obj.count
    this.new = obj.new
    this.sale = obj.sale

    this.parent = document.querySelector(parentSelector)

    this.counterNum = 1

    this.liked = false
    this.compared = false
    this.inCart = false

    this.card = document.createElement('div')
  }

  render() {

    this.card.innerHTML =
      `
        <div class="product__top">
        <div class="product-slider">
          <div class="swiper product-slider__thumbs">
            <div class="swiper-wrapper">
                ${this.slidesHTML}
            </div>
            <div class="swiper-button-next">
              <img
                src="images/icons/arrow-next.svg"
                alt="next"
                class="slider__button-img"
              />
            </div>
            <div class="swiper-button-prev">
              <img
                src="images/icons/arrow-prev.svg"
                alt="next"
                class="slider__button-img"
              />
            </div>
          </div>
          <div class="swiper product-slider__slider">
            <div class="swiper-wrapper">
            ${this.slidesHTML}
            </div>
          </div>
        </div>
        <div class="product__descr">
          <div class="product__descr-content">
            <h2 class="product__title">
                ${this.name}
            </h2>
            <span class="product__articul">Артикул ${this.articul}</span>
            <span class="product__ammount">В наличии: ${this.count} шт.</span>
            <div class="product__mob-slider">
              <div class="slider__inner swiper mob-slider">
                <div class="swiper-wrapper">
                ${this.slidesHTML}
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>
            <div class="product__price-block">
              <span class="product__price-title">Цена за штуку :</span>
              <div class="product__price-nums">
                <span class="product__price-num old">${this.formatPrice(this.chars.Цена)}</span>
                <span class="product__price-num new">${this.formatPrice(this.chars.Скидка)}</span>
              </div>
            </div>
            <div
              class="card__counter"
              style="width: max-content; margin-bottom: 15px"
            >
              <div class="card__counter-block">
                <span class="card__counter-minus">-</span>
                <span class="card__counter-num">1</span>
                <span class="card__counter-plus">+</span>
              </div>
            </div>
            <button class="product__btn">В корзину</button>
            <div class="product__favourite">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8401 4.61012C20.3294 4.09912 19.7229 3.69376 19.0555 3.4172C18.388 3.14064 17.6726 2.99829 16.9501 2.99829C16.2276 2.99829 15.5122 3.14064 14.8448 3.4172C14.1773 3.69376 13.5709 4.09912 13.0601 4.61012L12.0001 5.67012L10.9401 4.61012C9.90843 3.57842 8.50915 2.99883 7.05012 2.99883C5.59109 2.99883 4.19181 3.57842 3.16012 4.61012C2.12843 5.64181 1.54883 7.04108 1.54883 8.50012C1.54883 9.95915 2.12843 11.3584 3.16012 12.3901L4.22012 13.4501L12.0001 21.2301L19.7801 13.4501L20.8401 12.3901C21.3511 11.8794 21.7565 11.2729 22.033 10.6055C22.3096 9.93801 22.4519 9.2226 22.4519 8.50012C22.4519 7.77763 22.3096 7.06222 22.033 6.39476C21.7565 5.7273 21.3511 5.12087 20.8401 4.61012V4.61012Z"
                  stroke="#3c3c3b"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Добавить в избранное</span>
            </div>

            <div class="product__compare">
            <svg
            fill="#3c3c3b"
            height="24px"
            width="24px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 224.726 224.726"
            xml:space="preserve"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
            <path
                d="M223.612,109.586L190.5,35.752c-0.001-0.002-0.002-0.004-0.003-0.006l-0.043-0.096c-0.111-0.247-0.243-0.479-0.389-0.7 c-0.039-0.06-0.086-0.114-0.127-0.171c-0.131-0.182-0.272-0.353-0.424-0.514c-0.06-0.063-0.121-0.125-0.184-0.185 c-0.168-0.159-0.345-0.306-0.533-0.44c-0.049-0.036-0.094-0.076-0.145-0.11c-0.236-0.156-0.486-0.29-0.746-0.405 c-0.074-0.033-0.151-0.057-0.227-0.086c-0.204-0.078-0.411-0.143-0.625-0.194c-0.088-0.021-0.175-0.042-0.264-0.058 c-0.293-0.054-0.591-0.09-0.896-0.09h-58.428c-1-3.111-2.943-5.794-5.485-7.737v-7.262c0-2.761-2.239-5-5-5h-9.334 c-2.761,0-5,2.239-5,5v7.381c-2.465,1.933-4.347,4.572-5.326,7.619H38.734c-0.305,0-0.602,0.037-0.896,0.09 c-0.09,0.016-0.176,0.037-0.264,0.058c-0.214,0.051-0.422,0.116-0.625,0.194c-0.076,0.029-0.153,0.053-0.227,0.086 c-0.26,0.115-0.51,0.248-0.746,0.405c-0.051,0.034-0.096,0.074-0.145,0.11c-0.188,0.134-0.365,0.28-0.533,0.44 c-0.064,0.06-0.124,0.122-0.185,0.185c-0.153,0.161-0.293,0.333-0.424,0.514c-0.042,0.058-0.088,0.112-0.127,0.171 c-0.146,0.221-0.278,0.453-0.389,0.7l-0.043,0.096c-0.001,0.002-0.002,0.004-0.003,0.006L0.897,109.848 C0.335,110.657,0,111.636,0,112.696c0,21.358,17.376,38.734,38.734,38.734c21.358,0,38.734-17.376,38.734-38.734 c0-1.06-0.334-2.038-0.897-2.847L46.456,42.696h50.986c1.007,2.905,2.831,5.424,5.204,7.286v125.381H58.308 c-1.871,0-3.586,1.045-4.444,2.708L40.11,204.738c-0.799,1.55-0.733,3.405,0.174,4.894c0.908,1.489,2.525,2.398,4.27,2.398h135.519 c0.006-0.001,0.012,0,0.02,0c2.761,0,5-2.239,5-5c0-0.98-0.282-1.894-0.769-2.665l-13.563-26.294 c-0.858-1.663-2.573-2.708-4.444-2.708H121.98V50.101c2.449-1.873,4.334-4.436,5.363-7.405h50.828l-30.475,67.954 c-0.008,0.018-0.012,0.036-0.02,0.054c-0.023,0.054-0.04,0.11-0.062,0.165c-0.09,0.229-0.162,0.463-0.217,0.699 c-0.014,0.062-0.032,0.122-0.044,0.184c-0.055,0.287-0.083,0.576-0.087,0.866c0,0.027-0.008,0.051-0.008,0.078 c0,21.358,17.376,38.734,38.734,38.734s38.734-17.376,38.734-38.734C224.726,111.514,224.298,110.442,223.612,109.586z M64.646,107.696H12.822l25.912-57.781L64.646,107.696z M118.226,37.53c0,3.217-2.617,5.833-5.833,5.833 c-3.217,0-5.834-2.617-5.834-5.833c0-3.217,2.617-5.833,5.834-5.833C115.609,31.696,118.226,34.313,118.226,37.53z M159.98,107.696 l25.913-57.781l25.912,57.781H159.98z"
            ></path>
            </g>
        </svg>
              <span>Добавить в сравнение</span>
            </div>

            <div class="product__delivery-block">
              <span>Самовывоз в день заказа</span>
              <span>Бесплатно</span>
            </div>
            <div class="product__delivery-block">
              <span>Доставка, 2 -3 дня со дня доставки</span>
              <span>Бесплатно</span>
            </div>
          </div>
        </div>
      </div>
      <div class="product__bottom">
        <ul class="product__tabs">
          <li class="product__tabs-item active" data-category="1">
            Характиристики
          </li>
          <li class="product__tabs-item" data-category="2">
            Описание
          </li>
        </ul>
        <div class="product__content" data-category="1">
          <h4 class="product__char-bigtitle">Характеристики</h4>

          <div class="product__char-block">
            ${this.charsHTML}
          </div>
        </div>
          
        <div class="product__content" data-category="2">
          <h4 class="product__char-bigtitle">Описание</h4>
          <p class="product__article">
            ${this.descr}
          </p>
        </div>
          
        </div>
        `



    this.card.querySelectorAll('.card__counter-plus').forEach(item => {
      item.addEventListener('click', () => {
        if (this.counterNum < this.count) this.counterNum = ++this.counterNum
        this.card.querySelectorAll('.card__counter-num').forEach(item => {
          item.animate([
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
            item.textContent = this.counterNum
          }, 150)
        })
      })
    })

    this.card.querySelectorAll('.card__counter-minus').forEach(item => {
      item.addEventListener('click', () => {
        if (this.counterNum > 1) this.counterNum = --this.counterNum
        this.card.querySelectorAll('.card__counter-num').forEach(item => {
          item.animate([
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
            item.textContent = this.counterNum
          }, 150)

        })
      })
    })

    this.card.querySelectorAll('.product__btn').forEach(item => {
      item.addEventListener('click', () => {
        this.inCart = !this.inCart

        this.card.querySelectorAll('.product__btn').forEach(item => {
          item.animate([
              { transform: "scale(100%)" },
              { transform: "scale(90%) rotateX(100deg)" },
              { transform: "scale(100%)" },
          ], {
              duration: 300,
              iterations: 1,
              easing: 'ease-in-out'
          });
      })

        if (localStorage.getItem('cart')) {
          let data = JSON.parse(localStorage.getItem('cart'))
          if (this.inCart) {
            data.push({ id: this.id, count: this.counterNum })
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(data))
            this.card.querySelectorAll('.product__btn').forEach(item => {
              item.textContent = 'Удалить из корзины'
            })

          } else {
            let obj = data.find(item => item.id == this.id)
            let index = data.indexOf(obj)
            data.splice(index, 1)
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(data))
            this.card.querySelectorAll('.product__btn').forEach(item => {
              item.textContent = 'В корзину'
            })
          }


        } else {
          localStorage.setItem('cart', JSON.stringify([{ id: this.id, count: this.counterNum }]))
          this.card.querySelectorAll('.card__button').forEach(item => {
            item.textContent = 'Удалить из корзины'
          })
        }

        document.querySelectorAll('.header__cart').forEach(item => {
          item.textContent = JSON.parse(localStorage.getItem('cart')).length
        })

      })
    })

    this.card.querySelector('.product__favourite').addEventListener('click', () => {
      this.liked = !this.liked
      this.card.querySelector('.product__top').classList.toggle('liked')

      this.card.querySelector('.product__favourite svg').animate([
        { transform: "translateY(0px) scale(100%)" },
        { transform: "translateY(-15px) scale(110%) rotateY(100deg)" },
        { transform: "translateY(0px) scale(100%)" },
      ], {
        duration: 500,
        iterations: 1,
        easing: 'ease-in-out'
      });

      if (localStorage.getItem('likedCards')) {
        let arr = JSON.parse(localStorage.getItem('likedCards'))
        if (!arr.includes(this.id)) {
          arr.push(this.id)
          localStorage.removeItem('likedCards')
          localStorage.setItem('likedCards', JSON.stringify(arr))
          this.card.querySelector('.product__favourite span').textContent = 'Удалить из избранного'
        } else {
          let index = arr.indexOf(this.id)
          arr.splice(index, 1)
          localStorage.removeItem('likedCards')
          localStorage.setItem('likedCards', JSON.stringify(arr))
          this.card.querySelector('.product__favourite span').textContent = 'Добавить в избранное'
        }


      } else {
        localStorage.setItem('likedCards', JSON.stringify([this.id]))
        this.card.querySelector('.product__favourite span').textContent = 'Удалить из избранного'
      }

      document.querySelectorAll('.header__liked span').forEach(item => {
        item.textContent = JSON.parse(localStorage.getItem('likedCards')).length
      })

    })


    this.card.querySelector('.product__compare').addEventListener('click', () => {
      this.compared = !this.compared
      this.card.querySelector('.product__top').classList.toggle('compared')

      this.card.querySelector('.product__compare svg').animate([
        { transform: "translateY(0px) scale(100%)" },
        { transform: "translateY(-15px) scale(110%) rotateY(100deg)" },
        { transform: "translateY(0px) scale(100%)" },
      ], {
        duration: 500,
        iterations: 1,
        easing: 'ease-in-out'
      });

      if (localStorage.getItem('comparedCards')) {
        let arr = JSON.parse(localStorage.getItem('comparedCards'))
        if (!arr.includes(this.id)) {
          arr.push(this.id)
          localStorage.removeItem('comparedCards')
          localStorage.setItem('comparedCards', JSON.stringify(arr))
          this.card.querySelector('.product__compare span').textContent = 'Удалить из сравнения'
        } else {
          let index = arr.indexOf(this.id)
          arr.splice(index, 1)
          localStorage.removeItem('comparedCards')
          localStorage.setItem('comparedCards', JSON.stringify(arr))
          this.card.querySelector('.product__compare span').textContent = 'Добавить в сравнение'
        }


      } else {
        localStorage.setItem('comparedCards', JSON.stringify([this.id]))
        this.card.querySelector('.product__compare span').textContent = 'Удалить из избранного'
      }

      document.querySelectorAll('.header__compare span').forEach(item => {
        item.textContent = JSON.parse(localStorage.getItem('comparedCards')).length
      })

    })


    if (this.sale) this.card.querySelector('.product__top').classList.add('sale')
    if (JSON.parse(localStorage.getItem('cart'))) {
      if (JSON.parse(localStorage.getItem('cart')).find(item => item.id == this.id)) {
        this.inCart = true
        this.card.querySelectorAll('.product__btn').forEach(item => {
          item.textContent = 'Удалить из корзины'
        })

      }
    }
    if (JSON.parse(localStorage.getItem('likedCards'))) {
      if (JSON.parse(localStorage.getItem('likedCards')).includes(this.id)) {
        this.card.querySelector('.product__top').classList.add('liked')
        this.card.querySelector('.product__favourite span').textContent = 'Удалить из избранного'
      }
    }

    if (JSON.parse(localStorage.getItem('comparedCards'))) {
      if (JSON.parse(localStorage.getItem('comparedCards')).includes(this.id)) {
        this.card.querySelector('.product__top').classList.add('compared')
        this.card.querySelector('.product__compare span').textContent = 'Удалить из сравнения'
      }
    }

    this.parent.append(this.card)
  }

  formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'UAH' }).format(price)
  }
}

export default FullCard