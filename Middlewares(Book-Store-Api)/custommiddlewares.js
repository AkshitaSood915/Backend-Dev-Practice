const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8000;

const books = [
    { id: 1, title: 'Book One', author: 'Author One' },
    { id: 2, title: 'Book Two', author: 'Author Two' },
];

// Logger Middleware
function loggerMiddleware(req, res, next) {
    const log = `[${Date.now()}] ${req.method} ${req.path}\n`;
    fs.appendFileSync('logs.txt', log, 'utf-8');
    next();
}

// Custom Middleware
function customMiddleware(req, res, next) {
    console.log('I am a custom middleware');
    next();
}

// Middlewares (Plugins)
app.use(express.json());

app.use(loggerMiddleware);

// Routes
app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', customMiddleware,(req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
});

app.listen(PORT, () => {
    console.log(`HTTP server is running on PORT ${PORT}`);
});