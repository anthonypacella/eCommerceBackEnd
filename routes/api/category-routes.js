const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCat  = await Category.findAll(
      {
        include: [{ model: Product}],
      });
      res.status(200).json(allCat);
    }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cat = await Category.findOne(
      {
        where: {
          id: req.params.id
        },
        include: [{ model: Product}]
      }
    )
    res.status(200).json(cat)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body); 
    res.status(200).json(catData);
  } 
  catch (err) {
      res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}});
    res.status(200).json("Entry Updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json("Entry Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
