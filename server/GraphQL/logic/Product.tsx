// import { Product } from "../../mongoose/models/Product";
// import { IProductDoc } from "../../mongoose/models/Product";
// import { IOrderByProductArgs } from "../../GraphQL/queries/Product";
// import { Review } from "mongoose/models/Review";

// const order_main_fn = async (
//   args: IOrderByProductArgs
// ): Promise<IProductDoc[] | void> => {
//   if(args.order_by_review){
// 	  const products = await Product.find({});
// 	  products.forEach(async (product) => {
// 		const reviews = await Review.find({'_id': {$in: product.reviews}});
// 	  })
//   }
// };

// export default order_main_fn;