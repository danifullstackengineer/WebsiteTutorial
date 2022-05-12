import { IUser } from "../mongoose/models/User";

class CustomResponse {
  message: string;
  success: boolean;
  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}
class GraphQLCustomResponse extends CustomResponse {
  constructor(message: string, success: boolean) {
    super(message, success);
    if (!this.success) {
      this.throw_err();
    }
  }
  throw_err() {
    throw new Error(this.message);
  }
}

export { GraphQLCustomResponse};
