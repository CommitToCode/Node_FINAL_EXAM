const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const slugify = require("slugify");


const categoryValidationSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.boolean().required(),
});


const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

CategorySchema.pre("validate", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = {
  categoryValidationSchema,
  CategoryModel,
};
