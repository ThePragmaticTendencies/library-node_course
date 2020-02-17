var express = require('express');
var sql = require('mssql');

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
      var request = new sql.Request();
      request.query('select * from books', (err, recordsets) => {
          console.log(recordsets.recordset);
          res.render('bookListView', {
            title: 'Hello from render',
            nav: nav,
            books: recordsets.recordset
          });
      });
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      var id = req.params.id;
      var ps = new sql.PreparedStatement();
      ps.input('id', sql.Int);
      ps.prepare('select * from books where id= @id',
        err => {
          ps.execute({
              id: req.params.id
            }, (err, recordsets) => {
              if (!recordsets.recordset || recordsets.recordset.length === 0)
              {
                res.status(404).send('Not Found');
              } else {
                req.book = recordsets.recordset[0];
                next();
              }
            });
        });
    })
    .get((req, res) => {
      res.render('bookView', {
        title: 'Book',
        nav: nav,
        book: req.book
      });
    });
    return bookRouter;
};

module.exports = router;
