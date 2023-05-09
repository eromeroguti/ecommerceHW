const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);    
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if(!tag) {
      res.status(400).json({message: 'No tag found with that id!'});
      return;
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if(!tag) {
      res.status(400).json({message: 'No tag found with that id!'});
      return;
    } else {
      await tag.update(req.body);
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if(!tag) {
      res.status(400).json({message: 'No tag found with that id!'});
      return;
    } else {
      await tag.destroy();
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
