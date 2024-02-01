const Product = require("../models/Product");

const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "node-file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.CREATED).json({ image: { src: result.secure_url } });
};

// const uploadProductImageLocal = async (req, res) => {
//   if (!req.files) {
//     throw new CustomError.BadRequestError("No File Uploaded");
//   }
//   let productImage = req.files.image;
//   if (!productImage.mimetype.startsWith("image")) {
//     throw new CustomError.BadRequestError("Please upload image");
//   }
//   const maxSize = 1024 * 1024;
//   if (productImage.size > maxSize) {
//     throw new CustomError.BadRequestError(
//       "Please upload image smaller than 1MB"
//     );
//   }
//   const imagePath = path.join(
//     __dirname,
//     "../public/uploads/" + `${productImage.name}`
//   );
//   await productImage.mv(imagePath);
//   res
//     .status(StatusCodes.CREATED)
//     .json({ image: { src: `/uploads/${productImage.name}` } });
// };

module.exports = { uploadProductImage };
