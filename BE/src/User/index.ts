import { Router } from "express";

import * as UserController from "./Controller";
import * as Middleware from "./middleware";

const router = Router();

const routes = () => {
  router.post("/api/login", UserController.apiLogin);

  // login and register
  router.post("/db/api/register", UserController.register);
  router.post("/db/api/login", UserController.dbLogin);
  router.post("/db/api/signup", UserController.dbSignup);
  router.post("/db/api/forgetpw", UserController.forgetPassword);
  router.post(
    "/db/api/reset",
    Middleware.authenticate,
    UserController.ResetPassword
  );
  router.post("/auth", Middleware.authenticate);

  // For inventory
  router.get("/showProduct", UserController.showProduct);
  // router.put("/changeStatus/:id", UserController.changeStatus);//status of product
  router.put("/changeOrderStatus/:id", UserController.changeOrderStatus);
  router.get("/checkOrderTable", UserController.checkOrderTable);
  // router.get("/admin", UserController.AdminPage);//local storage
  router.post("/addOrder", UserController.addOrder);
  router.get("/showOrder", UserController.showOrder);
  router.post("/addProduct", UserController.addProduct);
  router.put("/editProduct/:id", UserController.editProduct);
  router.delete("/deleteProduct", UserController.deleteProduct);
  router.delete("/deleteOrder", UserController.deleteOrder);
  router.put("/changeQuantity", UserController.changeQuantity);
  router.get("/count", UserController.count);

  return router;
};

export default routes;
