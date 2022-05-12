import { Router, RouterOptions } from "express";
import add_images_to_db from "./single_use/add_images_to_db";

// Some options for routing
// case sentivity means /Foo and /foo are not the same
// strict routing means /someroute/8/ will pass if it's supposed to pass but /someroute/8 will fail
const opts: RouterOptions = {
  caseSensitive: true,
  strict: true,
};

const router = Router(opts);

// Single Use Routes -- Comment them aftewards; Could even delete them for smaller
// bundle size during production.
if (process.env.NODE_ENV !== "production") {
  router.get("/single_use/add_images_to_db", add_images_to_db);
}

export default router;
