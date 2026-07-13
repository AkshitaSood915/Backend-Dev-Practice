const express = require("express");
const app = express();
const PORT = 8000;

// In-Memory Database
const BOOKS = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
];

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

