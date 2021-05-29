import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc   Fetch all products
//@route   Get /api/products?keyword
//@Access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

//@desc   Fetch a single product by its id
//@route   Get /api/products/:id
//@Access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product has Been deleted" });
  } else {
    res.status(404);
    res.json({ message: "product Not Found" });
  }
});

// @desc    Create New product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { desc, image, name, price, ingredients, cal, liked } = req.body;

  const product = new Product({
    user: req.user._id,
    desc,
    image,
    name,
    price,
    ingredients,
    cal,
    liked,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { desc, image, name, price, ingredients, cal, liked } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.desc = desc;
    product.ingredients = ingredients;
    product.category = category;
    product.cal = cal;
    product.price = price;
    product.liked = liked;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
