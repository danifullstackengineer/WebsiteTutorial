import { Request, Response } from "express/ts4.0";
import products from "../../heroku_ignore/constants/products";
import { Product } from "../../mongoose/models/Product";

// Simple endpoint to post the required images in our database
const add_images_to_db = async (_: Request, res: Response): Promise<void> => {
  try {
    products.forEach(async (product, i) => {
      await new Product(product).save().then(() => {
        console.log("Saved product: ", i);
      });
    });
	res.status(200).json("OK");
  } catch (err) {
    // Just throwing the errors since these are single use endpoints so no need to worry
    // about user experience.
    throw new Error("Something went wrong: " + err);
  }
};

export default add_images_to_db;
