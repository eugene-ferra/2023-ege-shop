
import Card from "./card"

class CompareTable {
    constructor(cards, parentElement) {
        this.cards = cards
        this.classCards = []
        this.parent = document.querySelector(parentElement)


        this.renderIterator = 0
        this._headHTML = ``
        this._bodyHTML = ``

        this.cards.forEach((item, i) => {
            this._headHTML += `<th class="table__head-item" data-card=${i}></th>`
        })

        this.namesArr = Object.keys(cards[0].chars);

        this.valuesArr = cards.map(item => item.chars)

        this.namesArr.forEach((item, i) => {
            let tableRowHTML = '';
            if (!(item == 'Скидка' ^ item == "Цена")) {
                tableRowHTML = `
                <tr class="table__row table__char-name" >
                    <td >${item}${item === 'Номанальный ток' ? ", А" :
                        item === 'Вес' ? ", кг" :
                            item === 'Объем' ? ", л" :
                                item === 'Ширина' ? ", мм" :
                                    item === 'Высота' ? ", мм" :
                                        item === 'Диаметр' ? ", мм" :
                                            item === 'Толщина' ? ", мм" :
                                                item === 'Мощность' ? ", Вт" :
                                                    item === 'Длина' &&
                                                        !(localStorage.getItem('compareCategory') === 'ruletka' || localStorage.getItem('compareCategory') === 'uroven'
                                                            || localStorage.getItem('compareCategory') === 'izolenta' || localStorage.getItem('compareCategory') === 'udlinnitel')
                                                        ? ", мм" :
                                                        item === 'Длина' &&
                                                            (localStorage.getItem('compareCategory') === 'ruletka' || localStorage.getItem('compareCategory') === 'uroven'
                                                                || localStorage.getItem('compareCategory') === 'izolenta' || localStorage.getItem('compareCategory') === 'udlinnitel')
                                                            ? ", м" : ''}</td>`;

                cards.forEach((item, i) => {
                    if (i < cards.length - 1) tableRowHTML += `<td></td>`;
                });

                tableRowHTML += '</tr>';

                tableRowHTML += `<tr class="table__row table__char-value">`


                this.valuesArr.forEach((values, j) => {
                    tableRowHTML += `<td data-info="${j}">${values[item]
                        }</td > `;
                })
                tableRowHTML += '</tr>';


            } else {

                if (this.renderIterator == 0) {
                    tableRowHTML += `<tr class="table__row table__char-name">
                        <td>Цена</td>`

                    cards.forEach((item, i) => {
                        if (i < cards.length - 1) tableRowHTML += `<td></td>`;
                    });

                    tableRowHTML += '</tr>';

                    tableRowHTML += `<tr class="table__row table__char-value">`


                    this.valuesArr.forEach((values, j) => {
                        tableRowHTML += `<td data-info=${j}>${values['Скидка']
                            }</td > `;
                    })
                    tableRowHTML += '</tr>';

                    this.renderIterator++
                }

            }


            this._bodyHTML += tableRowHTML;
        })

        this.table = document.createElement('table')

    }

    render() {
        this.table.classList.add('table')

        this.table.innerHTML =
            `
            <thead class= "table__head" >
            <tr class="table__row">
                ${this._headHTML}
            </tr>
        </thead >
                <tbody class="table__body">
                    ${this._bodyHTML}
                </tbody>
        `



        this.parent.append(this.table)
        this.cards.forEach((item, i) => {
            let card = new Card(item, `[data-card="${i}"]`)
            card.render()
            this.classCards.push(card)
        })
    }

    remove(id) {
        let card = this.classCards.find(item => item.id == id)
        let index = card.parent.getAttribute("data-card")



        card.parent.remove()

        let comparedCards = JSON.parse(localStorage.getItem('comparedCards'));


        this.classCards.splice(this.classCards.indexOf(card), 1);

        this.table.querySelectorAll(`[data-info="${index}"]`).forEach(item => {
            item.remove()
        })

        let namesTds = this.table.querySelectorAll('.table__row.table__char-name')

        namesTds.forEach(item => {
            let tds = item.querySelectorAll('td')

            tds[tds.length - 1].remove()
        })

        if (this.classCards.length == 0) {
            this.table.remove()
        }

    }
}




export default CompareTable