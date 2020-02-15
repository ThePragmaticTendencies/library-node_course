var express = require('express');

var bookRouter = express.Router();

var router = nav => {
  var books = [
    {
      title: 'Lord Of The Rings',
      genre: 'Fantasy',
      author: 'J. R. R. Tolkien',
      read: false
    },
    {
      title: 'The Witcher',
      genre: 'Fantasy',
      author: 'A. Sapkowski',
      read: false
    },
    {
      title: 'Guards! Guards!',
      genre: 'Fantasy',
      author: 'T. Pratchett',
      read: false
    },
    {
      title: 'Immortality',
      genre: 'Drama',
      author: 'M. Kundera',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        title: 'Hello from render',
        nav: nav,
        books: books
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      var id = req.params.id;
      res.render('bookView', {
        title: 'Book',
        nav: nav,
        book: books[id]
      });
    });
    return bookRouter;
};

module.exports = router;
