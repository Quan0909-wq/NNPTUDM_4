const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');

// Yêu cầu: getall truy vấn theo name
router.get('/', async (req, res) => {
    const { name } = req.query;
    const data = await categoryService.getAll(name);
    res.json(data);
});

// Yêu cầu: getbyID
router.get('/:id', async (req, res) => {
    const data = await categoryService.getById(req.params.id);
    res.json(data);
});

// Yêu cầu: /api/v1/categories/{id}/products
router.get('/:id/products', async (req, res) => {
    const data = await categoryService.getProductsByCategory(req.params.id);
    res.json(data);
});

// Các hàm khác: create, edit, delete
router.post('/', async (req, res) => {
    const data = await categoryService.create(req.body);
    res.json(data);
});

router.put('/:id', async (req, res) => {
    const data = await categoryService.edit(req.params.id, req.body);
    res.json(data);
});

router.delete('/:id', async (req, res) => {
    const data = await categoryService.delete(req.params.id);
    res.json(data);
});

module.exports = router;