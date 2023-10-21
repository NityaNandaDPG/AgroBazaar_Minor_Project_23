const express = require('express');
const router = express.Router();

// Load Book model
const Product=require('../../models/Product.js');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('vegetable route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ nobooksfound: 'No Vegetable found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ nobookfound: 'No Vegetables found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Product.create(req.body)
    .then(product=>res.json({ msg: 'Vegetable added successfully' })
    )
    .catch(err => {res.status(400).json({ error: 'Unable to add this vegetable' });
    console.log(err);})
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Vegetable entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a Vegetable' }));
});

module.exports = router;