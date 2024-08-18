class FilterItem {
    constructor(name, values, parestSelector, isOpen) {
        this.name = name
        this.values = this.bubbleSort(values)
        this.isOpen = isOpen

        this.parentElement = document.querySelector(parestSelector)

        this.selects = []

        this.renderSelects()
    }

    renderSelects() {
        this.values.forEach(char => {
            let select = document.createElement('div')
            select.classList.add('filter__select')
            select.innerHTML = `
                <label class="filter__select-contain">
                    <span class="filter__select-span">${char} ${this.name === 'Номанальный ток' ? "А" :
                        this.name === 'Вес' ? "кг" :
                            this.name === 'Объем' ? "л" :
                                this.name === 'Ширина' ? "мм" :
                                    this.name === 'Высота' ? "мм" :
                                        this.name === 'Диаметр' ? "мм" :
                                            this.name === 'Толщина' ? "мм" :
                                                this.name === 'Мощность' ? "Вт" :
                                                    this.name === 'Длина' &&
                                                        !(localStorage.getItem('category') === 'ruletka' || localStorage.getItem('category') === 'uroven'
                                                            || localStorage.getItem('category') === 'izolenta' || localStorage.getItem('category') === 'udlinnitel')
                                                        ? "мм" :
                                                        this.name === 'Длина' &&
                                                            (localStorage.getItem('category') === 'ruletka' || localStorage.getItem('category') === 'uroven'
                                                                || localStorage.getItem('category') === 'izolenta' || localStorage.getItem('category') === 'udlinnitel')
                                                            ? "м" : ''
                    }</span>
                    <input type="checkbox" data-filtertitle="${this.name}" value="${char}" />
                    <div class="filter__select-input"></div>
                </label>`
                
                this.selects.push(select)
        })
    }


    render() {
        const filterItem = document.createElement('div')
        filterItem.classList.add('filter__block')
        filterItem.innerHTML =
            `
            <h4 class="filter__title ${this.isOpen? 'active': ''}">
                ${this.name}
            </h4>
            <div class="filter__options ${this.isOpen? 'active': ''}">
            </div>
        `
        this.selects.forEach(item => {
            filterItem.querySelector('.filter__options').append(item)
        })
        

        this.parentElement.append(filterItem)

    }

    bubbleSort(arr) {
        const len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }

    // getFilters(e) {
    //     let input = (this.selects.find(e)).querySelector('input')

    //     let filterName = input.getAttribute('data-filterTitle')
    //     let filterValue = input.getAttribute('value')

    //     let isChecked = input.checked

    //     return {filterName, filterValue, isChecked}
    // }
}


export default FilterItem