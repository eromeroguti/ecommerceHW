const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch(err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (!category) {
      res.status(400).json({ message: 'No category found with that id!' });
      return
    }
  res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find one category by its `id` value

  // be sure to include its associated Products


router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const category = await Category.update(req.body);  
    if(!category) {
      res.status(400).json({message: 'No category found with that id!'});
      return;
    }
    await category.update(req.body);
    res.status(200).json(category);
  } catch(err) {
    res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {
  try {
  // delete a category by its `id` value
  const category = await Category.destroy(req.body);
  if(!category) {
    res.status(400).json({message: 'No category found with that id!'});
    return;
  }
  await category.destroy(req.body);
  res.status(200).json(category);
} catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
