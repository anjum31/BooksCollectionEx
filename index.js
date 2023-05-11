var express = require("express");
var bodyParser = require("body-parser");
app = express();

app.use(bodyParser.json());
var books = [];
var id;

var bookcount = 1;
app.get("/", function (req, res) {
  res.end("book-collection");
});
app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/books", function (req, res) {
  res.json(books);
});
app.post("/books", function (req, res) {
  const { title, author, publishedDate } = req.body;
  id = bookcount++;
  const cbook = { id, title, author, publishedDate };

  books.push(cbook);

  res.json(cbook);
});
app.delete("/books/:id ", function (req, res) {
  const id = parseInt(req.params.id);

  const index = books.findIndex((cbook) => cbook.id == id);

  if (index == -1) {
    res.status(404).json({ message: "Book not found.Deletion unsuccessfull" });
  } else {
    books.splice(index, 1);
    res.json({ message: "Book deleted successfully." });
  }
});

app.listen(8000, function () {
  console.log("server run successful");
});
