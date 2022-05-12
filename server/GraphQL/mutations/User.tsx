import { GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLCustomResponse } from "../../types/response";
import { IUser, User } from "../../mongoose/models/User";
import UserQL from "../types/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import patterns from "../../logic/regex";

/**
 *
 *
 *
 */

const createUser = {
  type: UserQL,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_: undefined, args: { email: string; password: string }) {
    // Test to see if email matches our regex if not then throw an error 
    if(!patterns.email.test(args.email)){
        return new GraphQLCustomResponse(`The email you have provided is invalid.`, false);
    }
    if(!patterns.password.test(args.password)){
        return new GraphQLCustomResponse(`The password you have provided is invalid.`, false);
    }
    const prev_user = await User.findOne({ email: args.email });
    // If user exists throw custom error that gets handled on the front-end
    if (prev_user) {
      return new GraphQLCustomResponse(
        `The user with email ${args.email} already exists.`,
        false
      );
    }
    // If user doesn't exist, then create the hashed password
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(args.password, salt);
    // If something happens when hashing or salting, throw custom error.
    if (!salt || !hash) {
      return new GraphQLCustomResponse(
        `Something went wrong while securing your password.`,
        false
      );
    }
    return await new User({
      _id: new mongoose.Types.ObjectId(),
      email: args.email,
      password: hash,
    })
      .save()
      .then(
        (
          user
        ) => {
          return user;
        }
      )
      .catch(() => {
        return new GraphQLCustomResponse(
          `Something went wrong while creating your account.`,
          false
        );
      });
  },
};

export { createUser };
