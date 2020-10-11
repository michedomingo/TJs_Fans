const Store = require('../models/Store');

// @desc    Get all stores
// @route   GET /api/v1/stores
// @access  Public
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find();

        res.status(200).json({ success: true, data: stores })
    } catch (err) {
        res.staus(400).json({ success: false });
    }
};

// @desc    Get single Store
// @route   GET /api/v1/stores/:id
// @access  Public
exports.getStore = async (req, res, next) => {
    try {
        const store = await Store.findById(req.params.id);

        if(!store) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: store })
    } catch (err) {
        res.staus(400).json({ success: false });
    }
};

// @desc    Create new Store
// @route   POST /api/v1/stores
// @access  Private
exports.createStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body);

        res.status(201).json({
            success: true,
            data: store
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Update Store
// @route   POST /api/v1/stores/:id
// @access  Private
exports.updateStore = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Update store ${req.params.id}` });
};

// @desc    Delete Store
// @route   POST /api/v1/stores/:id
// @access  Private
exports.deleteStore = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete store ${req.params.id}` });
};
