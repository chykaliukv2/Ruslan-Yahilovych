const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Дозволити CORS-запити
app.use(cors());

// Дозволити обробку JSON
app.use(express.json());

// Масив для зберігання відгуків
let reviews = [];

// GET-запит для отримання відгуків
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// POST-запит для додавання нового відгуку
app.post('/reviews', (req, res) => {
    const { name, text } = req.body;

    if (!name || !text) {
        return res.status(400).json({ error: 'Name und Text sind erforderlich.' });
    }

    const newReview = { name, text };
    reviews.push(newReview);
    res.status(201).json(newReview);
});

// Запустити сервер
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.send('Server läuft! Willkommen!');
});
