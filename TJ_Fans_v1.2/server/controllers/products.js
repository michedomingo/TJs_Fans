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
