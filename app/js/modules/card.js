class Card {
  constructor(obj, parentSelector) {
    this.id = obj.id;
    this.category = obj.category;
    this.name = obj.name;
    this.descr = obj.descr;
    this.imageSet = obj.imageSet;
    this.articul = obj.articul;
    this.count = obj.count;
    this.new = obj.new;
    this.sale = obj.sale;
    this.chars = obj.chars;

    this.parent = document.querySelector(parentSelector);

    this.counterNum = 1;

    this.liked = false;
    this.compared = false;
    this.inCart = false;

    this.card = document.createElement("div");
  }

  render() {
    this.card.classList.add("card");
    this.card.innerHTML = `
            <div class="card__inner">
                <div class="card__like">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="transparent"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M20.8401 4.61012C20.3294 4.09912 19.7229 3.69376 19.0555 3.4172C18.388 3.14064 17.6726 2.99829 16.9501 2.99829C16.2276 2.99829 15.5122 3.14064 14.8448 3.4172C14.1773 3.69376 13.5709 4.09912 13.0601 4.61012L12.0001 5.67012L10.9401 4.61012C9.90843 3.57842 8.50915 2.99883 7.05012 2.99883C5.59109 2.99883 4.19181 3.57842 3.16012 4.61012C2.12843 5.64181 1.54883 7.04108 1.54883 8.50012C1.54883 9.95915 2.12843 11.3584 3.16012 12.3901L4.22012 13.4501L12.0001 21.2301L19.7801 13.4501L20.8401 12.3901C21.3511 11.8794 21.7565 11.2729 22.033 10.6055C22.3096 9.93801 22.4519 9.2226 22.4519 8.50012C22.4519 7.77763 22.3096 7.06222 22.033 6.39476C21.7565 5.7273 21.3511 5.12087 20.8401 4.61012V4.61012Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    />
                </svg>
                </div>
                <div class="card__compare">
                <svg
                    fill="#3c3c3b"
                    height="200px"
                    width="200px"
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
                </div>
                <div class="card__cross">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.10002 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06055L4.88474 20.1871C4.98356 21.7682 6.29471 23 7.8789 23H16.1211C17.7053 23 19.0164 21.7682 19.1153 20.1871L19.9395 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0073C19.0018 4.99995 18.9963 4.99995 18.9908 5H16.9C16.4367 2.71776 14.419 1 12 1C9.58104 1 7.56329 2.71776 7.10002 5ZM9.17071 5H14.8293C14.4175 3.83481 13.3062 3 12 3C10.6938 3 9.58254 3.83481 9.17071 5ZM17.9355 7H6.06445L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1192 20.0624L17.9355 7ZM14.279 10.0097C14.83 10.0483 15.2454 10.5261 15.2068 11.0771L14.7883 17.0624C14.7498 17.6134 14.2719 18.0288 13.721 17.9903C13.17 17.9517 12.7546 17.4739 12.7932 16.9229L13.2117 10.9376C13.2502 10.3866 13.7281 9.97122 14.279 10.0097ZM9.721 10.0098C10.2719 9.97125 10.7498 10.3866 10.7883 10.9376L11.2069 16.923C11.2454 17.4739 10.83 17.9518 10.2791 17.9903C9.72811 18.0288 9.25026 17.6134 9.21173 17.0625L8.79319 11.0771C8.75467 10.5262 9.17006 10.0483 9.721 10.0098Z"
                        fill="#0F1729"
                    ></path>
                    </g>
                </svg>
                </div>

                <a href="product.html" class="card__img-block link">
                    <img src="${this.imageSet[1]}" alt="${
      this.name
    }" class="card__img" onerror="this.onerror=null; this.src='db/placeholder.png'"/>
                </a>

                <a href="product.html" class="card__title link">${this.name}</a>
                <span class="card__articul">Артикул ${this.articul}</span>
                <span class="card__price-title">Цена за штуку</span>

                <div class="card__center-block">
                <a href="product.html" class="card__title link">${this.name}</a>
                <p class="card__descr">
                    ${this.descr}
                </p>
                </div>

                <div class="card__price-block">
                <span class="card__articul">Артикул ${this.articul}</span>
                <span class="card__price-title">Цена за штуку</span>
                <span class="card__price card__price--old">${this.formatPrice(
                  this.chars.Цена
                )}</span>
                <span class="card__price">${this.formatPrice(this.chars.Скидка)}</span>
                <div class="card__counter">
                    <h6 class="card__counter-title">Количество</h6>
                    <div class="card__counter-block">
                    <span class="card__counter-minus">-</span>
                    <span class="card__counter-num">${this.counterNum}</span>
                    <span class="card__counter-plus">+</span>
                    </div>
                </div>
                <button class="card__button">В корзину</button>
                </div>
                <div class="card__footer">
                <div class="card__counter">
                    <h6 class="card__counter-title">Количество</h6>
                    <div class="card__counter-block">
                    <span class="card__counter-minus">-</span>
                    <span class="card__counter-num">${this.counterNum}</span>
                    <span class="card__counter-plus">+</span>
                    </div>
                </div>
                <button class="card__button">В корзину</button>
                </div>
            </div>
        `;

    this.card.querySelector(".card__like").addEventListener("click", () => {
      this.liked = !this.liked;
      this.card.classList.toggle("liked");

      this.card
        .querySelector(".card__like")
        .animate(
          [
            { transform: "translateY(0px) scale(100%)" },
            { transform: "translateY(-15px) scale(110%) rotateY(100deg)" },
            { transform: "translateY(0px) scale(100%)" },
          ],
          {
            duration: 500,
            iterations: 1,
            easing: "ease-in-out",
          }
        );

      if (localStorage.getItem("likedCards")) {
        let arr = JSON.parse(localStorage.getItem("likedCards"));
        if (!arr.includes(this.id)) {
          arr.push(this.id);
          localStorage.removeItem("likedCards");
          localStorage.setItem("likedCards", JSON.stringify(arr));
        } else {
          let index = arr.indexOf(this.id);
          arr.splice(index, 1);
          localStorage.removeItem("likedCards");
          localStorage.setItem("likedCards", JSON.stringify(arr));
        }
      } else {
        localStorage.setItem("likedCards", JSON.stringify([this.id]));
      }

      document.querySelectorAll(".header__liked span").forEach((item) => {
        item.textContent = JSON.parse(localStorage.getItem("likedCards")).length;
      });
    });

    this.card.querySelector(".card__compare").addEventListener("click", () => {
      this.compared = !this.compared;
      this.card.classList.toggle("compared");

      this.card
        .querySelector(".card__compare")
        .animate(
          [
            { transform: "translateY(0px) scale(100%)" },
            { transform: "translateY(-15px) scale(110%) rotateY(100deg)" },
            { transform: "translateY(0px) scale(100%)" },
          ],
          {
            duration: 500,
            iterations: 1,
            easing: "ease-in-out",
          }
        );

      if (localStorage.getItem("comparedCards")) {
        let arr = JSON.parse(localStorage.getItem("comparedCards"));
        if (!arr.includes(this.id)) {
          arr.push(this.id);
          localStorage.removeItem("comparedCards");
          localStorage.setItem("comparedCards", JSON.stringify(arr));
        } else {
          let index = arr.indexOf(this.id);
          arr.splice(index, 1);
          localStorage.removeItem("comparedCards");
          localStorage.setItem("comparedCards", JSON.stringify(arr));
        }
      } else {
        localStorage.setItem("comparedCards", JSON.stringify([this.id]));
      }

      document.querySelectorAll(".header__compare span").forEach((item) => {
        item.textContent = JSON.parse(localStorage.getItem("comparedCards")).length;
      });
    });

    this.card.querySelectorAll(".card__counter-plus").forEach((item) => {
      item.addEventListener("click", () => {
        if (this.counterNum < this.count) this.counterNum = ++this.counterNum;
        this.card.querySelectorAll(".card__counter-num").forEach((item) => {
          item.animate(
            [
              { transform: "translateY(0%)" },
              { transform: "translateY(120%)" },
              { transform: "translateY(-120%)" },
              { transform: "translateY(0%)" },
            ],
            {
              duration: 300,
              iterations: 1,
              easing: "ease-out",
            }
          );

          setTimeout(() => {
            item.textContent = this.counterNum;
          }, 150);
        });
      });
    });

    this.card.querySelectorAll(".card__counter-minus").forEach((item) => {
      item.addEventListener("click", () => {
        if (this.counterNum > 1) this.counterNum = --this.counterNum;
        this.card.querySelectorAll(".card__counter-num").forEach((item) => {
          this.card.querySelectorAll(".card__counter-num").forEach((item) => {
            item.animate(
              [
                { transform: "translateY(0%)" },
                { transform: "translateY(-120%)" },
                { transform: "translateY(120%)" },
                { transform: "translateY(0%)" },
              ],
              {
                duration: 300,
                iterations: 1,
                easing: "ease-out",
              }
            );

            setTimeout(() => {
              item.textContent = this.counterNum;
            }, 150);
          });
        });
      });
    });

    this.card.querySelectorAll(".card__button").forEach((item) => {
      item.addEventListener("click", () => {
        this.inCart = !this.inCart;

        this.card.querySelectorAll(".card__button").forEach((item) => {
          item.animate(
            [
              { transform: "scale(100%)" },
              { transform: "scale(90%) rotateX(100deg)" },
              { transform: "scale(100%)" },
            ],
            {
              duration: 300,
              iterations: 1,
              easing: "ease-in-out",
            }
          );
        });

        setTimeout(() => {
          if (localStorage.getItem("cart")) {
            let data = JSON.parse(localStorage.getItem("cart"));
            if (this.inCart) {
              data.push({ id: this.id, count: this.counterNum });
              localStorage.removeItem("cart");
              localStorage.setItem("cart", JSON.stringify(data));
              this.card.querySelectorAll(".card__button").forEach((item) => {
                this.card.style.borderColor = "#f0ba4e";
                item.textContent = "Удалить из корзины";
              });
            } else {
              let obj = data.find((item) => item.id == this.id);
              let index = data.indexOf(obj);
              data.splice(index, 1);
              localStorage.removeItem("cart");
              localStorage.setItem("cart", JSON.stringify(data));
              this.card.querySelectorAll(".card__button").forEach((item) => {
                this.card.style.borderColor = "#d6d6d6";
                item.textContent = "В корзину";
              });
            }
          } else {
            localStorage.setItem(
              "cart",
              JSON.stringify([{ id: this.id, count: this.counterNum }])
            );
            this.card.querySelectorAll(".card__button").forEach((item) => {
              this.card.style.borderColor = "#f0ba4e";
              item.textContent = "Удалить из корзины";
            });
          }

          document.querySelectorAll(".header__cart").forEach((item) => {
            item.textContent = JSON.parse(localStorage.getItem("cart")).length;
          });
        }, 300);
      });
    });

    this.card.querySelectorAll(".link").forEach((item) => {
      item.addEventListener("click", () => {
        localStorage.setItem("currentCard", this.id);
      });
    });

    if (this.sale) this.card.classList.add("card--sale");
    if (this.new) this.card.classList.add("card--new");
    if (this.parent.classList.contains("wide")) this.card.classList.add("card--wide");

    if (JSON.parse(localStorage.getItem("likedCards"))) {
      if (JSON.parse(localStorage.getItem("likedCards")).includes(this.id))
        this.card.classList.add("liked");
    }

    if (JSON.parse(localStorage.getItem("comparedCards"))) {
      if (JSON.parse(localStorage.getItem("comparedCards")).includes(this.id))
        this.card.classList.add("compared");
    }

    // if (this.compared) card.classList.add('compared')

    if (JSON.parse(localStorage.getItem("cart"))) {
      if (JSON.parse(localStorage.getItem("cart")).find((item) => item.id == this.id)) {
        this.inCart = true;
        this.card.querySelectorAll(".card__button").forEach((item) => {
          this.card.style.borderColor = "#f0ba4e";
          item.textContent = "Удалить из корзины";
        });
      }
    }

    this.parent.append(this.card);
  }

  formatPrice(price) {
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "UAH" }).format(
      price
    );
  }

  getId() {
    return this.id;
  }

  removeItem() {
    setTimeout(() => {
      this.card.remove();
    }, 300);

    this.card.animate([{ transform: "scale(100%)" }, { transform: "scale(0%)" }], {
      duration: 300,
      iterations: 1,
      easing: "ease-in-out",
    });
  }
}

export default Card;
