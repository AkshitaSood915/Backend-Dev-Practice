const express = require("express");
const app = express();
const PORT = 8000;
const fs=require('node:fs');

// In-Memory Database
const BOOKS = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
];

// Middlewares (Plugins)
app.use(express.json());

app.use(function (req, res, next) {
    const log = `[${Date.now()}] ${req.method} ${req.path}\n`;
    fs.appendFileSync('logs.txt', log, 'utf-8');
    next();
});

// Get all books
app.get("/", (req, res) => {
  res.json(BOOKS);
});

// Get book by ID
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "id must be of type number",
    });
  }

  const book = BOOKS.find((e) => e.id === id);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${id} does not exist!`,
    });
  }

  return res.json(book);
});

app.post('/', (req, res) => {
  const { title, author } = req.body;

  if (!title || title === '')
    return res.status(400).json({ error: 'title is required' });

  if (!author || author === '')
    return res.status(400).json({ error: 'author is required' });

  const id = BOOKS.length + 1;

  const book = { id, title, author };
  BOOKS.push(book);

  return res.status(201).json({ message: 'Book created success', id });
});


app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ error: `id must be of type number` });

  const indexToDelete = BOOKS.findIndex((e) => e.id === id);

  if (indexToDelete < 0)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });

  BOOKS.splice(indexToDelete, 1);

  return res.status(200).json({ message: 'book deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
