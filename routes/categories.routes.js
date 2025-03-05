const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

const categoryValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(10).max(255),
});

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error, value } = categoryValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newCategory = new Category(value);
    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json(category);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error, value } = categoryValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ error: "Category not found" });

    return res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ error: "Category not found" });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
