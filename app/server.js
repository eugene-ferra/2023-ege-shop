const http = require('http');
const fs = require('fs');
const url = require('url');
const { off } = require('process');
const { all } = require('awesomplete');

const port = 3004;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;

    if (path === '/market') {
        let data = fs.readFileSync('market.json');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (query.new) {
            let cards = JSON.parse(data)
            cards = cards.cards.filter((card) => card.new);
            let randomCards = []
            for (let i = 0; i < 50; i++) {
                let randomIndex = Math.floor(Math.random() * cards.length);
                var randomElement = cards[randomIndex];
                randomCards.push(randomElement);
            }
            res.end(JSON.stringify(randomCards));

        } else if (query.sale) {
            let cards = JSON.parse(data)
            cards = cards.cards.filter((card) => card.sale);
            let randomCards = []
            for (let i = 0; i < 50; i++) {
                let randomIndex = Math.floor(Math.random() * cards.length);
                var randomElement = cards[randomIndex];
                randomCards.push(randomElement);
            }
            res.end(JSON.stringify(randomCards));

        } else if (query.category) {
            let cards = JSON.parse(data)

            if (query.category == 'all') {

                let allCards = JSON.parse(data)

                let cards = allCards.cards.map(item => {
                    return {name: item.name, id: item.id, img: item.imageSet[1]}
                })

                res.end(JSON.stringify(cards))
            } else {
                cards = cards.cards.filter((card) => card.category == query.category)
                res.end(JSON.stringify(cards))
            }

        } else if (query.id) {
            const id = parseInt(query.id);
            let card = JSON.parse(data)
            card = card.cards.find((card) => card.id == id);
            res.end(JSON.stringify(card));

        } else if (query.filters) {
            let filters = JSON.parse(data).filters;
            let cat = query.filters;

            res.end(JSON.stringify(filters[cat]))
        }
        else {
            res.end('Incorrect request!')
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});