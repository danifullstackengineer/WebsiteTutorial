import { GraphQLNonNull, GraphQLString } from "graphql";
import UserQL from "../types/User";

/**
 * 
 * 
 * 
 */

const createUser = {
    type: UserQL,
    args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
    },
    async resolve(_:undefined, args:any){

    }
}

export {createUser};