const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('.'));
app.use(express.json())

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send(data)
        }
        // res.send(data);

    });
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send(data)
        }
    })
})

app.post('/addToCart', (req, res) => {
    // reqData = JSON.parse(req.body)
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = JSON.stringify(req.body);
            // console.log(item)
            cart.push(item);
            console.log(cart)
            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                    console.log(err)
                } else {
                    res.send('{"result": 1}');
                    console.log('{"result": 1}')
                }
            });
        }
    });
});

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});