import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
} from "graphql";

const ProductQL = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    // price needs to be float since int in graphql !== number but int === integer number;
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    reviews: { type: ProductReviewsType },
    is_in_stock: { type: new GraphQLNonNull(GraphQLBoolean) },
    // keep it as int since we will be working with integer discounts ranging from 0 to 100
    discount: { type: new GraphQLNonNull(GraphQLInt) },
    refurbished: { type: new GraphQLNonNull(GraphQLBoolean) },
    type_sword: { type: new GraphQLNonNull(SwordTypeENUM) },
    description: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    metal_type: { type: new GraphQLNonNull(MetalTypeENUM) },
    total_length: { type: new GraphQLNonNull(GraphQLFloat) },
    blade_length: { type: new GraphQLNonNull(GraphQLFloat) },
    blade_width: { type: new GraphQLNonNull(GraphQLFloat) },
    sword_weight: { type: new GraphQLNonNull(GraphQLFloat) },
    point_of_balance: { type: new GraphQLNonNull(GraphQLFloat) },
    sword_edge: { type: new GraphQLNonNull(SwordEdgeENUM) },
    engraving: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

// Need to create a custom graphql enum type for the enum MetalType
const MetalTypeENUM = new GraphQLEnumType({
  name: "MetalTypeENUMType",
  values: {
    HIGH_CARBON_STEEL_1045: {
      value: 0,
    },
    HIGH_CARBON_STEEL_1060: {
      value: 1,
    },
    HIGH_CARBON_STEEL_1075: {
      value: 2,
    },
    HIGH_CARBON_STEEL_1095: {
      value: 3,
    },
    SPRING_STEEL: {
      value: 4,
    },
  },
});
// Need to create a custom graphql enum type for the enum type Sword Edge
const SwordEdgeENUM = new GraphQLEnumType({
  name: "SwordEdgeType",
  values: {
    SHARPENED: {
      value: 0,
    },
    UNSHARPENED: {
      value: 1,
    },
  },
});
// Need to create a custom graphql enum type for the enum type Sword Type
export const SwordTypeENUM = new GraphQLEnumType({
  name: "SwordTypeType",
  values: {
    BROADSWORD: {
      value: 0,
    },
    CUTLASS: {
      value: 1,
    },
    KATANA: {
      value: 2,
    },
    KNIFE: {
      value: 3,
    },
    LONGSWORD: {
      value: 4,
    },
    RAPIER: {
      value: 5,
    },
    WAKIZASHI: {
      value: 6,
    },
  },
});

const ProductReviewsType = new GraphQLObjectType({
  name: "ProductReviewsType",
  fields: () => ({
    ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
    value: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export default ProductQL;
