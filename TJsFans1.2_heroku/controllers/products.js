const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { categories } = req.query;
  const categoryList = categories ? categories.split(',') : [];

  const products =
    (await Product.find(
      categoryList.length > 0
        ? { categories: { $in: categoryList } }
        : undefined
    )) || [];

  res.send(products);
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(404).end();
  }
};
