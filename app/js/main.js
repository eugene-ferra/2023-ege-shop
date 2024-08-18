import Swiper, { Navigation, Thumbs, FreeMode, Pagination, Grid } from 'swiper';
import "simplebar"
import tabs from "./modules/tabs"
import changeWiew from './modules/catalogView';
import dropdown from './modules/dropDowns';
import noUiSlider from 'nouislider';
import Choices from 'choices.js';
import magnify from './modules/magnifier';
import enableScroll from './modules/enableScroll';
import getData from './modules/serverModules';
import Card from './modules/card';
import FilterItem from './modules/filter-item';
import filterCards from './modules/filter';
import CartItem from './modules/cart-item';
import FullCard from './modules/full-card';
import CompareTable from './modules/compareTable';
import Cleave from 'cleave.js';





document.addEventListener('DOMContentLoaded', function () {

    // VISUAL PART
    let filter = document.querySelector('.filter')

    try {
        enableScroll(document.querySelector('.compare__bottom'))
    } catch { }


    try {
        function toggleDropDown(contentSelector) {
            const content = document.querySelector(contentSelector);
            content.classList.toggle('opened')
        }
        document.querySelector('#catalog-btn').addEventListener('click', (e) => {
            e.target.classList.toggle('opened')
            toggleDropDown('.nav-dropdown')
        })
        document.querySelector('.burger').addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('opened')
            toggleDropDown('.nav-dropdown')
            if (filter.classList.contains('active')) {
                filter.classList.remove('active');
                document.body.classList.remove('opened')
            }
            toggleDropDown('body')

        })
    } catch { }

    try {
        tabs('.nav-dropdown__list-item', '.nav-dropdown__subcategories', 'active')
    } catch { }

    try {
        tabs('.delivery-tab', '.delivery-content', 'active')
    } catch { }


    try {
        document.querySelector('.nav-dropdown__title').addEventListener('click', (e) => {
            document.querySelector('.nav-dropdow__subcategories').classList.remove('active')
        })
    } catch { }

    try {
        const element = document.querySelector('.catalog__sort-select');
        const choices = new Choices(element, {
            searchEnabled: false,
            itemSelectText: ''
        });
    } catch { }

    try {
        changeWiew("catalog__cards", "card", "catalog__template-btn")
    } catch { }







    try {
        document.querySelector('.filter__cross').addEventListener("click", () => {
            filter.classList.remove('active');
            document.body.classList.remove("opened")
        })
        document.querySelector(".catalog__filter-trigger").addEventListener("click", () => {
            filter.classList.add('active');
            document.body.classList.add("opened")
        })
    } catch { }




    try {
        document.querySelectorAll('.faq__question').forEach(item => {
            item.addEventListener('click', (e) => {
                // console.log(e.currentTarget.nextElementSibling)
                item.classList.toggle('non-opened')
            })
        })
    } catch { }







    // LOGIC PART

    document.querySelectorAll('.header__liked span').forEach(item => {
        item.textContent = JSON.parse(localStorage.getItem('likedCards')) ? JSON.parse(localStorage.getItem('likedCards')).length : 0
    })

    document.querySelectorAll('.header__cart').forEach(item => {
        item.textContent = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).length : 0
    })

    document.querySelectorAll('.header__compare span').forEach(item => {
        item.textContent = JSON.parse(localStorage.getItem('comparedCards')) ? JSON.parse(localStorage.getItem('comparedCards')).length : 0
    })



    let allCardsData = []

    getData(`http://127.0.0.1:3004/market?category=all`).then(res => {

        res.forEach(item => {
            allCardsData.push(item)
        })


    }).then(() => {

        let searches = document.querySelectorAll('.header__search-input')
        let lists = document.querySelectorAll('.header__search-list')


        let timerId;


        searches.forEach((search, i) => {

            search.addEventListener('input', () => {

                clearTimeout(timerId);
                timerId = setTimeout(function () {
                    if (search.value.length == 0) {
                        document.querySelectorAll('.header__search-list').forEach(item => {
                            item.innerHTML = ''
                        })
                    } else {
                        let inputWords = search.value.trim().toLowerCase().split(/\s+/);

                        let cards = allCardsData.filter(card => {
                            let nameWordsArr = card.name.toLowerCase();
                            return inputWords.every(item => nameWordsArr.includes(item))
                        })

                        lists[i].innerHTML = ''


                        if (cards.length == 0) {
                            lists[i].innerHTML =
                                `
                                <li class="header__search-list-item" style="pointer-events:none;">Товаров не найдено!</li>
        
                                `
                        } else {
                            let autocompleteItems = cards.map(item => {
                                let name = item.name;

                                let highlightedName = name;
                                inputWords.forEach(substring => {
                                    highlightedName = highlightedName.replace(new RegExp(`(${substring})`, "gi"), "<mark>$1</mark>");
                                });


                                let listItem = document.createElement('li')
                                listItem.classList.add('header__search-list-item')
                                listItem.setAttribute('data-product', item.id)
                                listItem.innerHTML =
                                    `
                                <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null; this.src='db/placeholder.png'">
                                <h3>${highlightedName}</h3>
                                `

                                listItem.addEventListener('click', (e) => {

                                    e.preventDefault()

                                    localStorage.setItem('currentCard', e.currentTarget.getAttribute('data-product'))
                                    document.location.pathname = '/product.html'
                                })


                                return listItem
                            })



                            if (autocompleteItems.length > 0) {

                                autocompleteItems.forEach(item => {
                                    lists[i].append(item)
                                })


                                let currentIndex = -1;

                                document.addEventListener('keydown', function (event) {
                                    switch (event.key) {
                                        case 'ArrowUp': // Клавиша вверх
                                            event.preventDefault();
                                            if (currentIndex > 0) {
                                                autocompleteItems[currentIndex].classList.remove('active');
                                                autocompleteItems[currentIndex - 1].classList.add('active');
                                                autocompleteItems[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                                currentIndex--;
                                            }
                                            break;
                                        case 'ArrowDown': // Клавиша вниз
                                            event.preventDefault();
                                            if (currentIndex < autocompleteItems.length - 1) {
                                                if (currentIndex !== -1) {
                                                    autocompleteItems[currentIndex].classList.remove('active');
                                                }
                                                currentIndex++;
                                                autocompleteItems[currentIndex].classList.add('active');
                                                autocompleteItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                            }
                                            break;
                                        case 'Enter':

                                            event.preventDefault()
                                            localStorage.setItem('currentCard', autocompleteItems[currentIndex].getAttribute('data-product'))



                                            document.location.pathname = '/product.html'


                                            break
                                        default:
                                            break;
                                    }
                                });

                            }


                        }
                    }
                }, 500);



            })
        })
    })





    if (document.location.pathname == '/catalog.html') {

        let cat = localStorage.getItem('category')

        switch (cat) {
            case 'emal': cat = 'Эмали'; break
            case 'kraska': cat = 'Краски'; break
            case 'rastvoritel': cat = 'Растворители'; break
            case 'ruletka': cat = 'Рулетки'; break
            case 'uroven': cat = 'Строительные уровни'; break
            case 'shtangen': cat = 'Штангенциркули'; break
            case 'valik': cat = 'Валики'; break
            case 'kist': cat = 'Кисти'; break
            case 'sverlo': cat = 'Сверла'; break
            case 'bur': cat = 'Буры'; break
            case 'koronka': cat = 'Коронки'; break
            case 'homut': cat = 'Хомуты'; break
            case 'bita': cat = 'Биты'; break
            case 'izolenta': cat = 'Изолента'; break
            case 'krug': cat = 'Круги (диски)'; break
            case 'electrod': cat = 'Сварочные электроды'; break
            case 'nabor-sverlo': cat = 'Наборы сверл'; break
            case 'nabor-kluch': cat = 'Наборы ключей'; break
            case 'nabor-instrument': cat = 'Наборы инструментов'; break
            case 'lampa': cat = 'Лампы'; break
            case 'led-lampa': cat = 'LED лампы'; break
            case 'led-svet': cat = 'LED светильники'; break
            case 'contactor': cat = 'Контакторы'; break
            case 'vilka': cat = 'Вилки'; break
            case 'udlinnitel': cat = 'Удлинители'; break
            case 'rozetka': cat = 'Розетки'; break
            case 'gazoblok': cat = 'Газоблок'; break
            case 'shlakoblok': cat = 'Шлакоблок'; break
        }

        document.querySelector('#bread-cat').textContent = cat
        document.title = `EGE - ${cat}`

        let category = localStorage.getItem('category')
        let allCards = []
        let filteredCards = []
        let page = 0;

        let noCards = document.createElement('div')
        noCards.classList.add('no-card')
        noCards.textContent = 'Товаров по выбраным фильтрам не найдено!'

        let loader = document.createElement('div')
        loader.classList.add('loader')
        loader.innerHTML = `
            <div class="ldio-790xsk1vmo7">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
            </div>
        `

        let parent = document.querySelector('.catalog__cards')




        let filterItemsArr = []
        let selectedFilters = []


        getData(`http://127.0.0.1:3004/market?category=${category}`).then(res => {

            parent.innerHTML = ''
            res.forEach(item => {
                let card = new Card(item, '.catalog__cards')
                allCards.push(card)

            })


            filteredCards = filterCards(allCards, selectedFilters)
            filteredCards = sortArr(filteredCards, '.catalog__sort-select')




            paginate(filteredCards)


        }).then(() => {
            getData(`http://127.0.0.1:3004/market?filters=${category}`).then(filters => {

                filters.filterNames.forEach((name, i) => {
                    let filter
                    if (i < 3) {
                        filter = new FilterItem(name, filters.filterValues[i], '.filter__top', true)
                    } else {
                        filter = new FilterItem(name, filters.filterValues[i], '.filter__top')
                    }
                    filter.render()
                    filterItemsArr.push(filter)
                })
                dropdown('.filter__title', '.filter__options', 'active')


                document.querySelectorAll('.filter__select-contain').forEach((item, i) => {
                    item.addEventListener('click', (e) => {
                        let input = item.querySelector('input')
                        if (e.target !== input) {
                            let filterItem = { name: input.getAttribute('data-filterTitle'), values: [input.getAttribute('value')] }

                            if (input.checked) {

                                selectedFilters.forEach((item, i) => {
                                    if (item.name == filterItem.name) {
                                        let index = selectedFilters[i].values.indexOf(filterItem.values[0])
                                        selectedFilters[i].values.splice(index, 1)
                                        if (selectedFilters[i].values.length == 0) selectedFilters.splice(i, 1)
                                    }
                                })
                            } else {
                                let isAdded = false
                                selectedFilters.forEach((item, i) => {
                                    if (item.name == filterItem.name) {
                                        selectedFilters[i].values.push(filterItem.values.toString())
                                        isAdded = true;
                                    }
                                })
                                if (!isAdded) {
                                    selectedFilters.push(filterItem)
                                }

                            }

                            parent.innerHTML = ''
                            parent.append(loader)

                            setTimeout(() => {
                                filteredCards = filterCards(allCards, selectedFilters)
                                filteredCards = sortArr(filteredCards, '.catalog__sort-select')

                                parent.innerHTML = ''

                                page = 0

                                filteredCards.length != 0 ? paginate(filteredCards) : parent.append(noCards)
                            }, Math.random() * 1000)



                        }
                    })


                })




                let cardPrices = new Set()
                allCards.forEach(item => {
                    cardPrices.add(item.chars.Скидка)
                })

                document.querySelectorAll('.filter__price-text span')[0].textContent = `От: ${formatPrice(Math.min(...cardPrices))}`
                document.querySelectorAll('.filter__price-text span')[1].textContent = `До: ${formatPrice(Math.max(...cardPrices))}`

                selectedFilters.push({ name: "Цена", values: [Math.min(...cardPrices), Math.max(...cardPrices)] })

                let slider = document.getElementById('slider');

                let formatForSlider = {
                    from: function (formattedValue) {
                        return Number(formattedValue);
                    },
                    to: function (numericValue) {
                        return numericValue
                    }
                };


                let priceSlider = noUiSlider.create(slider, {
                    start: [Math.min(...cardPrices).toFixed(2), Math.max(...cardPrices).toFixed(2)],
                    connect: true,
                    format: formatForSlider,
                    tooltips: {
                        to: function (numericValue) {
                            return `${formatPrice(numericValue.toFixed(2))}`;
                        }
                    },
                    range: {
                        'min': Math.min(...cardPrices),
                        'max': Math.max(...cardPrices)
                    },
                    step: 0.01
                });
                priceSlider.on('change', () => {
                    selectedFilters.forEach((item, i) => {
                        if (item.name == 'Цена') {
                            selectedFilters[i].values[0] = priceSlider.get()[0]
                            selectedFilters[i].values[1] = priceSlider.get()[1]
                        }
                    })
                    document.querySelectorAll('.filter__price-text span')[0].textContent = `От: ${formatPrice(priceSlider.get()[0])}`
                    document.querySelectorAll('.filter__price-text span')[1].textContent = `До: ${formatPrice(priceSlider.get()[1])}`

                    parent.innerHTML = ''
                    parent.append(loader)

                    setTimeout(() => {
                        filteredCards = filterCards(allCards, selectedFilters)
                        filteredCards = sortArr(filteredCards, '.catalog__sort-select')

                        parent.innerHTML = ''

                        page = 0

                        filteredCards.length != 0 ? paginate(filteredCards) : parent.append(noCards)
                    }, Math.random() * 1000)

                })



                document.querySelector('.catalog__sort-select').addEventListener('change', () => {

                    filteredCards = filterCards(allCards, selectedFilters)
                    filteredCards = sortArr(filteredCards, '.catalog__sort-select')

                    parent.innerHTML = ''


                    page = 0
                    filteredCards.length != 0 ? paginate(filteredCards) : parent.append(noCards)


                })

            })
        })



    }

    if (document.location.pathname == '/like.html') {

        let likedCards = []
        if (JSON.parse(localStorage.getItem('likedCards'))) {
            likedCards = JSON.parse(localStorage.getItem('likedCards'))
        }

        let renderedCards = [];

        if (likedCards.length > 0) {
            likedCards.forEach((item, i) => {
                getData(`http://127.0.0.1:3004/market?id=${item}`).then(res => {
                    if (i == 0) document.querySelector('.catalog__cards').innerHTML = ''
                    let card = new Card(res, '.catalog__cards')
                    card.render()
                    renderedCards.push(card)
                })
            })



            setInterval(() => {
                let newState = JSON.parse(localStorage.getItem('likedCards'))
                if (newState.toString() != likedCards.toString()) {

                    const removedItem = likedCards.filter(item => !newState.includes(item));
                    let card = removedItem.find(item => item.id == removedItem)
                    renderedCards.find(item => item.id == removedItem).removeItem()

                    if (likedCards.length == 1) {
                        document.querySelector('.catalog__cards').innerHTML = ''
                        let noCards = document.createElement('div')
                        noCards.classList.add('no-card')
                        noCards.textContent = 'Вы не добавили ни одного товара в избранное!'
                        document.querySelector('.catalog__cards').append(noCards)
                    }

                    likedCards = newState

                }
            }, 100)
        } else {
            document.querySelector('.catalog__cards').innerHTML = ''
            let noCards = document.createElement('div')
            noCards.classList.add('no-card')
            noCards.textContent = 'Вы не добавили ни одного товара в избранное!'
            document.querySelector('.catalog__cards').append(noCards)
        }
    }

    if (document.location.pathname == '/cart.html') {

        let cartCards = []
        if (JSON.parse(localStorage.getItem('cart'))) {

            cartCards = JSON.parse(localStorage.getItem('cart'))
        }

        let renderedCards = [];

        document.querySelector('#order').addEventListener('click', (e) => {
            if (renderedCards.length > 0) {
                let cardOBJ = renderedCards.map(item => item.getOrderData())
                localStorage.setItem('orderData', JSON.stringify(cardOBJ))
            } else {
                e.preventDefault()

                let modal = document.createElement('div')
                modal.classList.add('modal')
                modal.innerHTML =
                    `
                <div class="modal__overflow">
                    <div class="modal__window">
                        <div class="modal__close">&#10006;</div>
                        <div class="modal__title">Корзина пуста!</div>
                        <div class="modal__body">Пожалуйста, добавьте хотя бы 1 товар в корзину.</div>
                        </div>
                    </div>
                </div>
                `
                modal.addEventListener('click', (e) => {
                    if (e.target == document.querySelector('.modal__close') || e.target == document.querySelector('.modal__overflow')) {
                        modal.classList.remove('active');
                        setTimeout(() => {
                            modal.remove()
                        }, 300);
                    }
                })
                this.body.append(modal)

                setTimeout(() => {
                    modal.classList.add('active');
                }, 100);
            }

        })
        if (cartCards.length > 0) {
            cartCards.forEach((item, i) => {
                getData(`http://127.0.0.1:3004/market?id=${item.id}`).then(res => {
                    if (i == 0) document.querySelector('.cart-cards').innerHTML = ''
                    let card = new CartItem(res, item.count, '.cart-cards')
                    card.render()
                    renderedCards.push(card)
                }).then(() => {
                    setInterval(() => {
                        let newState = JSON.parse(localStorage.getItem('cart'))
                        if (newState.toString() != cartCards.toString()) {
                            const removedItem = cartCards.filter(item => {
                                let ids = newState.map(item => item.id)
                                return !ids.includes(item.id)
                            });

                            renderedCards.find(item => item.id == removedItem[0].id).removeItem()
                            renderedCards.splice(renderedCards.indexOf(renderedCards.find(item => item.id == removedItem[0].id)), 1)

                            if (cartCards.length == 1) {
                                document.querySelector('.cart-cards').innerHTML = ''
                                let noCards = document.createElement('div')
                                noCards.classList.add('no-card')
                                noCards.textContent = 'Вы не добавили ни одного товара в корзину!'
                                document.querySelector('.cart-cards').append(noCards)
                            }
                        }

                        cartCards = newState

                        let sum = 0;
                        renderedCards.forEach(card => {
                            cartCards.forEach(item => {
                                if (card.id == item.id) sum += card.getSum()
                            })
                        })


                        document.querySelector('#sum').textContent = formatPrice(sum)
                    }, 100)
                })
            })





        } else {
            document.querySelector('.cart-cards').innerHTML = ''
            let noCards = document.createElement('div')
            noCards.classList.add('no-card')
            noCards.textContent = 'Вы не добавили ни одного товара в корзину!'
            document.querySelector('.cart-cards').append(noCards)

            document.querySelector('#sum').textContent = formatPrice(0)
        }
    }

    if (document.location.pathname == '/product.html') {

        JSON.parse(localStorage.getItem('currentCard'))
        let cardId = JSON.parse(localStorage.getItem('currentCard'))

        getData(`http://127.0.0.1:3004/market?id=${cardId}`).then((res) => {
            let card = new FullCard(res, '.product__inner')
            card.render()

            document.title = `EGE - ${card.name}`
            document.querySelector('#bread-item').textContent = card.name



            let thumbs = new Swiper(".product-slider__thumbs", {
                modules: [FreeMode],
                breakpoints: {
                    768: {
                        direction: 'horizontal',
                        slidesPerView: 3,
                        watchSlidesProgress: true,
                    },
                    1200: {
                        slidesPerView: 3,
                        watchSlidesProgress: true,
                        direction: 'vertical',
                    }
                }

            });
            let productSlider = new Swiper(".product-slider__slider", {
                modules: [Navigation, Thumbs],
                speed: 200,
                navigation: {
                    nextEl: ".product-slider__thumbs .swiper-button-next",
                    prevEl: ".product-slider__thumbs .swiper-button-prev",
                },
                spaceBetween: 0,
                thumbs: {
                    swiper: thumbs,
                },
            });

            let sliderImages = document.querySelectorAll(".product-slider__slider img");
            magnify({
                images: sliderImages,
                activeIndex: productSlider.activeIndex,
                container: sliderImages[productSlider.activeIndex].parentElement,
                containerImg: sliderImages[productSlider.activeIndex],
                containerMove: document.querySelector(".product__descr"),
                magnifierClass: 'magnifier',
                containerMoveActiveClass: 'active'
            })


            let mobProductSlider = new Swiper(".mob-slider", {
                modules: [Pagination],
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                speed: 200,
                slidesPerView: 1
            });

            productSlider.on('slideChange', function () {
                magnify({
                    images: document.querySelectorAll(".product-slider__slider img"),
                    activeIndex: productSlider.activeIndex,
                    container: sliderImages[productSlider.activeIndex].parentElement,
                    containerImg: sliderImages[productSlider.activeIndex],
                    containerMove: document.querySelector(".product__descr"),
                    magnifierClass: 'magnifier',
                    containerMoveActiveClass: 'active'
                })

            });

            tabs('.product__tabs-item', '.product__content', 'active')
        })
    }

    if (document.location.pathname == '/index.html' || document.location.pathname == '/') {
        getData('http://127.0.0.1:3004/market?sale=sale').then(res => {
            let parent = document.querySelector('#popular-cards')
            res.forEach((item, i) => {

                let slide = document.createElement('div')
                slide.classList.add('swiper-slide')
                slide.setAttribute('data-card', i)
                parent.append(slide)

                let card = new Card(item, `[data-card="${i}"]`).render()
            })

            let slider = document.querySelector('.popular-slider');
            new Swiper(slider, {
                modules: [Navigation],
                slidesPerView: 4,
                grabCursor: true,
                autoHeight: true,
                navigation: {
                    nextEl: slider.nextElementSibling.nextElementSibling,
                    prevEl: slider.nextElementSibling,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2
                    },
                    576: {
                        slidesPerView: 2
                    }
                    ,
                    768: {
                        slidesPerView: 2
                    },
                    992: {
                        slidesPerView: 3
                    },
                    1400: {
                        slidesPerView: 4,
                    }
                }
            });

        })

        getData('http://127.0.0.1:3004/market?new=new').then(res => {
            let parent = document.querySelector('#new-cards')
            res.forEach((item, i) => {

                let slide = document.createElement('div')
                slide.classList.add('swiper-slide')
                slide.setAttribute('data-card-new', i)
                parent.append(slide)

                let card = new Card(item, `[data-card-new="${i}"]`).render()
            })

            let slider = document.querySelector('.new-slider');
            new Swiper(slider, {
                modules: [Navigation],
                slidesPerView: 4,
                grabCursor: true,
                autoHeight: true,
                navigation: {
                    nextEl: slider.nextElementSibling.nextElementSibling,
                    prevEl: slider.nextElementSibling,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2
                    },
                    576: {
                        slidesPerView: 2
                    }
                    ,
                    768: {
                        slidesPerView: 2
                    },
                    992: {
                        slidesPerView: 3
                    },
                    1400: {
                        slidesPerView: 4,
                    }
                }
            });
        })


    }

    if (document.location.pathname == '/compare.html') {

        let allCardsIds = []
        if (JSON.parse(localStorage.getItem('comparedCards'))) {
            allCardsIds = JSON.parse(localStorage.getItem('comparedCards'))

        }


        let allCards = []
        let choosenCategory = ''
        let filteredCards = [];
        let categories = new Set()

        if (allCardsIds.length > 0) {
            allCardsIds.forEach((item, i) => {
                getData(`http://127.0.0.1:3004/market?id=${item}`).then(res => {
                    allCards.push(res)
                    if (i == allCardsIds.length - 1) {
                        allCards.forEach(item => {
                            categories.add(item.category)
                        })

                        categories = Array.from(categories)

                        // 

                        document.querySelector('.modal__body').innerHTML = ''

                        categories.forEach(item => {
                            let categoryItem = document.createElement('span')
                            categoryItem.classList.add('category-item')

                            categoryItem.setAttribute('data-compare', item)

                            let text = ''

                            switch (item) {
                                case 'emal': text = 'Эмали'; break
                                case 'kraska': text = 'Краски'; break
                                case 'rastvoritel': text = 'Растворители'; break
                                case 'ruletka': text = 'Рулетки'; break
                                case 'uroven': text = 'Строительные уровни'; break
                                case 'shtangen': text = 'Штангенциркули'; break
                                case 'valik': text = 'Валики'; break
                                case 'kist': text = 'Кисти'; break
                                case 'sverlo': text = 'Сверла'; break
                                case 'bur': text = 'Буры'; break
                                case 'koronka': text = 'Коронки'; break
                                case 'homut': text = 'Хомуты'; break
                                case 'bita': text = 'Биты'; break
                                case 'izolenta': text = 'Изолента'; break
                                case 'krug': text = 'Круги (диски)'; break
                                case 'electrod': text = 'Сварочные электроды'; break
                                case 'nabor-sverlo': text = 'Наборы сверл'; break
                                case 'nabor-kluch': text = 'Наборы ключей'; break
                                case 'nabor-instrument': text = 'Наборы инструментов'; break
                                case 'lampa': text = 'Лампы'; break
                                case 'led-lampa': text = 'LED лампы'; break
                                case 'led-svet': text = 'LED светильники'; break
                                case 'contactor': text = 'Контакторы'; break
                                case 'vilka': text = 'Вилки'; break
                                case 'udlinnitel': text = 'Удлинители'; break
                                case 'rozetka': text = 'Розетки'; break
                                case 'gazoblok': text = 'Газоблок'; break
                                case 'shlakoblok': text = 'Шлакоблок'; break
                            }
                            categoryItem.textContent = text

                            categoryItem.addEventListener('click', () => {
                                localStorage.setItem('compareCategory', item)
                                document.querySelector('.modal').classList.remove('active');
                                setTimeout(() => {
                                    document.querySelector('.modal').remove()
                                }, 300);

                                choosenCategory = localStorage.getItem('compareCategory')

                                categories.forEach((item, i) => {
                                    let categoryItem = document.createElement('div')
                                    categoryItem.classList.add('compare__category-item')
                                    if (item == choosenCategory) categoryItem.classList.add('compare__category-item--active')

                                    let text = ''

                                    switch (item) {
                                        case 'emal': text = 'Эмали'; break
                                        case 'kraska': text = 'Краски'; break
                                        case 'rastvoritel': text = 'Растворители'; break
                                        case 'ruletka': text = 'Рулетки'; break
                                        case 'uroven': text = 'Строительные уровни'; break
                                        case 'shtangen': text = 'Штангенциркули'; break
                                        case 'valik': text = 'Валики'; break
                                        case 'kist': text = 'Кисти'; break
                                        case 'sverlo': text = 'Сверла'; break
                                        case 'bur': text = 'Буры'; break
                                        case 'koronka': text = 'Коронки'; break
                                        case 'homut': text = 'Хомуты'; break
                                        case 'bita': text = 'Биты'; break
                                        case 'izolenta': text = 'Изолента'; break
                                        case 'krug': text = 'Круги (диски)'; break
                                        case 'electrod': text = 'Сварочные электроды'; break
                                        case 'nabor-sverlo': text = 'Наборы сверл'; break
                                        case 'nabor-kluch': text = 'Наборы ключей'; break
                                        case 'nabor-instrument': text = 'Наборы инструментов'; break
                                        case 'lampa': text = 'Лампы'; break
                                        case 'led-lampa': text = 'LED лампы'; break
                                        case 'led-svet': text = 'LED светильники'; break
                                        case 'contactor': text = 'Контакторы'; break
                                        case 'vilka': text = 'Вилки'; break
                                        case 'udlinnitel': text = 'Удлинители'; break
                                        case 'rozetka': text = 'Розетки'; break
                                        case 'gazoblok': text = 'Газоблок'; break
                                        case 'shlakoblok': text = 'Шлакоблок'; break
                                    }
                                    categoryItem.innerHTML = `${text} <span> &#10006;</span>`
                                    categoryItem.setAttribute('data-compare', item)

                                    categoryItem.addEventListener('click', () => {
                                        localStorage.setItem('compareCategory', item)
                                    })
                                    document.querySelector('.compare__category-items').append(categoryItem)
                                })

                                document.querySelectorAll('.compare__category-item span').forEach(item => {
                                    item.addEventListener('click', (e) => {
                                        let category = item.parentElement.getAttribute('data-compare')
                                        if (item.parentElement.classList.contains('compare__category-item--active')) {
                                            e.stopPropagation()
                                            let index = categories.indexOf(category)
                                            categories.splice(index, 1)

                                            if (categories[index - 1]) {
                                                let activeCategory = categories[index - 1]
                                                localStorage.setItem('compareCategory', activeCategory)

                                                document.querySelector([`[data-compare="${activeCategory}"]`]).classList.add('compare__category-item--active')
                                                allCards = allCards.filter(item => item.category != category)

                                                let newComparedCards = allCards.map(item => item.id)
                                                localStorage.setItem('comparedCards', JSON.stringify(newComparedCards))

                                            } else if (categories[index]) {
                                                let activeCategory = categories[index]
                                                localStorage.setItem('compareCategory', activeCategory)

                                                document.querySelector([`[data-compare="${activeCategory}"]`]).classList.add('compare__category-item--active')

                                                allCards = allCards.filter(item => item.category != category)

                                                let newComparedCards = allCards.map(item => item.id)
                                                localStorage.setItem('comparedCards', JSON.stringify(newComparedCards))

                                            } else {
                                                document.querySelector('.compare__bottom').textContent = 'Не выбраны товары для сравнения!'
                                                localStorage.setItem('comparedCards', JSON.stringify([]))

                                                document.querySelectorAll('.header__compare span').forEach(item => {
                                                    item.textContent = JSON.parse(localStorage.getItem('comparedCards')).length || 0
                                                })


                                            }

                                        } else {
                                            e.stopPropagation()
                                            let index = categories.indexOf(category)
                                            categories.splice(index, 1)

                                            allCards = allCards.filter(item => item.category != category)

                                            let newComparedCards = allCards.map(item => item.id)
                                            localStorage.setItem('comparedCards', JSON.stringify(newComparedCards))



                                            document.querySelectorAll('.header__compare span').forEach(item => {
                                                item.textContent = JSON.parse(localStorage.getItem('comparedCards')).length || 0
                                            })
                                        }

                                        item.parentElement.remove()
                                    })
                                })

                                filteredCards = allCards.filter(item => item.category == choosenCategory)

                                let table = new CompareTable(filteredCards, '.compare__bottom')
                                if (filteredCards.length > 1) {
                                    table.render()
                                    document.querySelector('.compare__count').textContent = `Добавлено товаров: ${filteredCards.length}`
                                } else {
                                    document.querySelector('.compare__bottom').innerHTML = 'В выбраной категории находится менее 2 товаров! <br> <br> Пожалуйста, выберите другую категорию или выберите больше товаров для сравнения в каталоге.'
                                }



                                setInterval(() => {
                                    let newState = localStorage.getItem('compareCategory')
                                    let newCardsState = JSON.parse(localStorage.getItem('comparedCards'))

                                    if ((newState != choosenCategory) && (newCardsState.toString() == allCards.map(item => item.id).toString())) {

                                        filteredCards = allCards.filter(item => item.category == newState)

                                        document.querySelectorAll('.compare__category-item').forEach(item => {
                                            item.classList.remove('compare__category-item--active')
                                            if (item.getAttribute('data-compare') == newState) item.classList.add('compare__category-item--active')
                                        })


                                        if (filteredCards.length > 0) {
                                            document.querySelector('.compare__bottom').innerHTML = ''
                                            table = new CompareTable(filteredCards, '.compare__bottom')
                                            if (filteredCards.length > 1) {
                                                table.render()
                                            }
                                            else {
                                                document.querySelector('.compare__bottom').innerHTML = 'В выбраной категории находится менее 2 товаров! <br> <br> Пожалуйста, выберите другую категорию или выберите больше товаров для сравнения в каталоге.'
                                            }
                                        } else {
                                            document.querySelector('.compare__bottom').innerHTML = 'Не выбраны товары для сравнения!'
                                        }

                                        choosenCategory = newState

                                    } else if ((newState == choosenCategory) && (newCardsState.toString() != allCards.map(item => item.id).toString())) {

                                        let removedItem = allCards.map(item => item.id).filter(item => !newCardsState.includes(item));



                                        removedItem.forEach(it => {
                                            filteredCards.splice(filteredCards.indexOf(filteredCards.find(item => item.id == it)), 1)
                                            allCards.splice(allCards.indexOf(allCards.find(item => item.id == it)), 1)
                                            table.remove(it)

                                            if (filteredCards.length < 2) {
                                                document.querySelector('.compare__bottom').innerHTML = 'В выбраной категории находится менее 2 товаров! <br> <br> Пожалуйста, выберите другую категорию или выберите больше товаров для сравнения в каталоге.'
                                            }
                                        })

                                        if (filteredCards.length == 0) {
                                            document.querySelector('.compare__bottom').innerHTML = 'Не выбраны товары для сравнения!'

                                            let index = categories.indexOf(choosenCategory)
                                            categories.splice(index, 1)
                                            document.querySelector(`[data-compare=${choosenCategory}]`).remove()

                                            if (categories[index - 1]) {
                                                let activeCategory = categories[index - 1]
                                                localStorage.setItem('compareCategory', activeCategory)

                                                document.querySelector([`[data-compare="${activeCategory}"]`]).classList.add('compare__category-item--active')


                                            } else if (categories[index]) {
                                                let activeCategory = categories[index]
                                                localStorage.setItem('compareCategory', activeCategory)

                                                document.querySelector([`[data-compare="${activeCategory}"]`]).classList.add('compare__category-item--active')


                                            } else {
                                                document.querySelector('.compare__bottom').textContent = 'Не выбраны товары для сравнения!'
                                                localStorage.setItem('comparedCards', JSON.stringify([]))

                                                document.querySelectorAll('.header__compare span').forEach(item => {
                                                    item.textContent = JSON.parse(localStorage.getItem('comparedCards')).length || 0
                                                })
                                            }
                                        }
                                    } else if (newState != choosenCategory) {
                                        filteredCards = allCards.filter(item => item.category == newState)

                                        document.querySelectorAll('.compare__category-item').forEach(item => {
                                            item.classList.remove('compare__category-item--active')
                                            if (item.getAttribute('data-compare') == newState) item.classList.add('compare__category-item--active')
                                        })


                                        if (filteredCards.length > 0) {
                                            document.querySelector('.compare__bottom').innerHTML = ''
                                            table = new CompareTable(filteredCards, '.compare__bottom')
                                            if (filteredCards.length > 1) {
                                                table.render()
                                            }
                                            else {
                                                document.querySelector('.compare__bottom').innerHTML = 'В выбраной категории находится менее 2 товаров! <br> <br> Пожалуйста, выберите другую категорию или выберите больше товаров для сравнения в каталоге.'
                                            }
                                        } else {
                                            document.querySelector('.compare__bottom').innerHTML = 'Не выбраны товары для сравнения!'
                                        }

                                        choosenCategory = newState

                                    }


                                    document.querySelectorAll('.header__compare span').forEach(item => {
                                        item.textContent = JSON.parse(localStorage.getItem('comparedCards')).length || 0
                                    })
                                    document.querySelector('.compare__count').textContent = `Добавлено товаров: ${filteredCards.length}`
                                }, 100)

                            })

                            document.querySelector('.modal__body').append(categoryItem)
                            setTimeout(() => {
                                document.querySelector('.modal').classList.add('active');
                            }, 100);
                        })


                    }
                })
            })

        } else {
            document.querySelector('.modal__title').textContent = 'Не выбраны товары для сравнения!'
            document.querySelector('.modal__body').innerHTML = `<a href="catalog.html">Вернуться к просмотру товаров</a>`
        }
    }

    if (document.location.pathname == '/order.html') {

        let orderdata = JSON.parse(localStorage.getItem('orderData'))
        let orderSum = 0

        orderdata.forEach(item => {
            let orderItem = document.createElement('div')
            orderItem.classList.add('order-reciept__item')

            orderItem.innerHTML =
                `
                <h5 class="order-reciept__item-title">
                    ${item.title}
                </h5>
                <div class="order-reciept__item-info">
                    <span class="order-reciept__item-count">${item.count} шт.</span>
                    <span class="order-reciept__item-price">${formatPrice(item.sum)}</span>
                </div>
            `
            document.querySelector('.order-reciept__body').append(orderItem);
            orderSum += item.sum
        })


        document.querySelector('#sum').textContent = formatPrice(orderSum)


        validateForm('#form', '#name', '#surname', '#patronymic', '#phone', '#mail')

        document.querySelector('#confirm').addEventListener('click', (e) => {
            e.preventDefault()

            let isValid = false


            let modal = document.createElement('div')
            modal.classList.add('modal')
            modal.innerHTML =
                `
                <div class="modal__overflow">
                    <div class="modal__window">
                        <div class="modal__close">&#10006;</div>
                        <div class="modal__title"></div>
                        <div class="modal__body">
            
                        </div>
                    </div>
                </div>

            `

            if (/^[а-яіЇєё]+(?:[ -]{1}[а-яЇієё]*)?$/i.test(document.querySelector('#name').value)) {

                if (/^[а-яіЇєё]+(?:[ -]{1}[а-яЇієё]*)?$/i.test(document.querySelector('#surname').value)) {

                    if (/^[а-яіЇєё]+(?:[ -]{1}[а-яЇієё]*)?$/i.test(document.querySelector('#patronymic').value)) {

                        if (/[+38][ ][(]\d{3}[)][ ]\d{2}[ ]\d{2}[ ]\d{3}/.test(document.querySelector('#phone').value)) {

                            if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(document.querySelector('#mail').value)) {

                                isValid = true
                            }
                        }
                    }

                }
            }


            if (isValid) {

                localStorage.setItem('cart', JSON.stringify([]))

                localStorage.setItem('orderData', JSON.stringify([]))

                document.querySelectorAll('.header__cart').forEach(item => {
                    item.textContent = 0
                })
                modal.querySelector('.modal__title').textContent = 'Ваш заказ принят!'
                modal.querySelector('.modal__body').textContent = 'Наши менеджеры обработают заказ в течении часа и свяжутся с Вами для подтверждения заказа.'

                modal.addEventListener('click', (e) => {
                    if (e.target == document.querySelector('.modal__close') || e.target == document.querySelector('.modal__overflow')) {
                        modal.classList.remove('active')
                        setTimeout(() => {
                            modal.remove()
                        }, 300)
                        document.location.pathname = '/index.html'
                    }
                })
                this.body.append(modal)

                setTimeout(() => {
                    modal.classList.add('active');
                }, 100);


            } else {
                modal.querySelector('.modal__title').textContent = 'Ой... Что-то пошло не так'
                modal.querySelector('.modal__body').textContent = 'Пожалуйста, укажите коректные данные в форме оформления заказа, чтобы наши менеджеры смогли связаться с Вами как можно быстрее.'
                modal.addEventListener('click', (e) => {
                    if (e.target == document.querySelector('.modal__close') || e.target == document.querySelector('.modal__overflow')) {
                        modal.classList.remove('active')
                        setTimeout(() => {
                            modal.remove()
                        }, 300)

                    }
                })
                this.body.append(modal)

                setTimeout(() => {
                    modal.classList.add('active');
                }, 100);
            }

        })

    }

    let dataLinks = document.querySelectorAll('[data-catalog]')
    dataLinks.forEach(item => {
        item.addEventListener('click', () => {
            localStorage.setItem('category', item.getAttribute('data-catalog'))
        })
    })

})


function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'UAH' }).format(price,)
}


function sortArr(arr, select) {

    let allCards = arr
    let element = document.querySelector(select);

    if (element.value === 'price') {
        allCards.sort((a, b) => a.chars.Скидка - b.chars.Скидка)
    }
    if (element.value === '-price') {
        allCards.sort((a, b) => b.chars.Скидка - a.chars.Скидка)
    }
    if (element.value == 'name') {
        allCards.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (element.value == '-name') {
        allCards.sort((a, b) => b.name.localeCompare(a.name))
    }

    return arr
}


function paginate(cards, page = 0, parent = document.querySelector('.catalog__cards')) {
    let cardsPerPage = 30
    let offset = cardsPerPage * page


    for (let i = offset; i < cardsPerPage + offset; i++) {
        try {
            cards[i].render()
        } catch (error) {
            continue
        }
    }


    if (Math.floor(cards.length / cardsPerPage) > page) {
        let btn = document.createElement('div')
        btn.classList.add('catalog__more')
        btn.innerHTML = `
        <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="margin-right: 5px"
        >
            <path
            d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
            stroke="#363853"
            stroke-width="1.5"
            />
            <path
            d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
            stroke="#363853"
            stroke-width="1.5"
            />
            <path
            d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
            stroke="#363853"
            stroke-width="1.5"
            />
        </svg>
        Загрузить еще`
        parent.append(btn)

        btn.addEventListener('click', () => {
            page++
            paginate(cards, page)
            btn.remove()
        })
    }


}


function validateForm(form, nameSelector, surnameSelector, patronymicSelector, phoneSelector, emailSelector) {
    let testedForm = document.querySelector(form);
    let phone = testedForm.querySelector(phoneSelector)
    let name = testedForm.querySelector(nameSelector)
    let surname = testedForm.querySelector(surnameSelector)
    let patronymic = testedForm.querySelector(patronymicSelector)
    let email = testedForm.querySelector(emailSelector)

    if (name) {
        let nameCleave = new Cleave(name, {
            blocks: [20],
            delimiter: '',
        })

        let regex = /^[а-яіЇєё]+(?:[ -]{1}[а-яЇієё]*)?$/i


        name.addEventListener('input', function () {

            if (!regex.test(name.value)) {
                name.parentElement.querySelector(".order-right__form-error").textContent = "Введите свое имя на кириллице"
                name.style.borderColor = '#fa5d69'
            } else {
                name.style.borderColor = '#08c785'
                name.parentElement.querySelector(".order-right__form-error").textContent = ""
            }
        })

    }
    if (surname) {
        let surnameCleave = new Cleave(name, {
            blocks: [30],
            delimiter: '',
        })

        let regex = /^[а-яіїєё]+(?:[ -]{1}[а-яіїєё]*)?$/i

        surname.addEventListener('input', function () {
            if (!regex.test(surname.value)) {
                surname.parentElement.querySelector(".order-right__form-error").textContent = "Введите свою фамилию на кириллице"
                surname.style.borderColor = '#fa5d69'
            } else {
                surname.style.borderColor = '#08c785'
                surname.parentElement.querySelector(".order-right__form-error").textContent = ""
            }
        })

    }

    if (patronymic) {
        let patronymicCleave = new Cleave(name, {
            blocks: [30],
            delimiter: '',
        })

        let regex = /^[а-яієїё]+(?:[ -]{1}[а-яієїё]*)?$/i

        patronymic.addEventListener('input', function () {
            if (!regex.test(patronymic.value)) {
                patronymic.parentElement.querySelector(".order-right__form-error").textContent = "Введите свое отчество на кириллице"
                patronymic.style.borderColor = '#fa5d69'
            } else {
                patronymic.style.borderColor = '#08c785'
                patronymic.parentElement.querySelector(".order-right__form-error").textContent = ""
            }
        })

    }

    if (phone) {
        let phoneCleave = new Cleave(phone, {
            prefix: '+38',
            delimiters: [" ", "(", ")", " ", ' ', ' '],
            blocks: [3, 0, 3, 0, 2, 2, 3]
        });
        let regex = /[+38][ ][(]\d{3}[)][ ]\d{2}[ ]\d{2}[ ]\d{3}/


        phone.addEventListener("input", function (event) {
            if (!regex.test(phone.value)) {
                phone.parentElement.querySelector(".order-right__form-error").textContent = "Введите Ваш телефон в формате +38 (xхх) хх хх ххх";
                phone.style.borderColor = '#fa5d69'
            } else {
                phone.parentElement.querySelector(".order-right__form-error").textContent = "";
                phone.style.borderColor = '#08c785'
            }
        })
    }
    if (email) {
        let regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

        email.addEventListener('input', function () {
            if (!regex.test(email.value)) {
                email.parentElement.querySelector(".order-right__form-error").textContent = 'Введите корректный e-mail'
                email.style.borderColor = '#fa5d69'
            } else {
                email.parentElement.querySelector(".order-right__form-error").textContent = ''
                email.style.borderColor = '#08c785'
            }
        })
    }
}

