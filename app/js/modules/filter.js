
function filterCards(cards, filters) {
    let filteredCarts = cards.filter(card => {
        let passFilter = true;
        filters.forEach(filter => {
            if (filter.name === 'Цена') {
                let minPrice = filter.values[0];
                let maxPrice = filter.values[1];
                if (card.chars.Скидка < minPrice || card.chars.Скидка > maxPrice) {
                    passFilter = false;
                }



            }

            else if (filter.name === 'Скидки') {
                if (!card.sale) passFilter = false
            }
            else if (filter.name === 'Новинки') {
                if (!card.new) passFilter = false
            }
            else if (filter.name in card.chars) {
                if (filter.values.every(item => !isNaN(item))) {
                    filter.values = filter.values.map(item => item = +item)
                }
                if (!filter.values.includes(card.chars[filter.name])) passFilter = false;
            }
        });
        return passFilter;
    });
    return filteredCarts
}

export default filterCards;