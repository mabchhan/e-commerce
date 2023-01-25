const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [{ model: Product }] })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, { include: [{ model: Product }] })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({ tag_name: req.body.tag_name })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((updatedTag) => {
      if (!updatedTag[0]) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(updatedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then((deleteTag) => {
      if (!deleteTag) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(deleteTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
