const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  dese: Joi.string().required(),
  category: Joi.string().required(),
  color: Joi.array().items(Joi.string()).required(),
  size: Joi.array().items(Joi.string()).required(),
  status: Joi.boolean().required(),
  brand_name: Joi.string().required(),
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      index: true,
    },
    dese: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
    },
    isDeleted:{
      type:Boolean,
      default:false
    },

     image: { type: String },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = {
  productValidationSchema,
  ProductModel,
};
