import { NextFunction, Request, Response } from "express";
import * as UserService from "../Service";
import jwt from "jsonwebtoken";
const secretKey =
  "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4";

// Login
export const apiLogin = (req: Request, res: Response) => {
  try {
    res.status(200).json(UserService.apiLogin(req.body));
  } catch (e) {
    res.status(400).json(e);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await UserService.register(req.body));
  } catch (e) {
    // res.status(500).json("registration failed");
    next(e);
  }
};

export const dbLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    res.status(200).json(await UserService.login(username, password));
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const dbSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { username, password, email } = req.body;
  try {
    res.status(200).json(await UserService.dbSignup(req.body));
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    res.status(200).json(await UserService.forgetPassword(email));
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { id, token } = req.params;
  const { password } = req.body;
  console.log(password);
  try {
    const result = await UserService.ResetPassword(req.user, password);
    res.status(result.status).json({ message: result.message });
    console.log(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const showProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.showProduct();
    res.status(200).json(result);
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const changeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await UserService.changeStatus(id);
    res.status(200).json(result);
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const changeOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await UserService.changeOrderStatus(id);
    res.status(200).json(result);
  } catch (e: any) {
    // res.status(500).json("Login failed");
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const AdminPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body;
  console.log(username);
  try {
    const result = await UserService.AdminPage(username);

    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderData = req.body;
  console.log(orderData);
  try {
    const result = await UserService.addOrder(orderData);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const showOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.showOrder();
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ProductData = req.body;
  console.log(ProductData);
  try {
    const result = await UserService.addProduct(ProductData);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ProductData = req.body;
  console.log(ProductData);
  try {
    const result = await UserService.deleteProduct(ProductData);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order_id = req.body;
  console.log("deleteOrder", order_id.id);
  try {
    const result = await UserService.deleteOrder(order_id.id);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};

export const count = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.count();
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const changeQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.body;
  // console.log("shxbsh", req.body);
  try {
    const result = await UserService.changeQuantity(id);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const ProductData = req.body;

  try {
    const result = await UserService.editProduct(id, ProductData);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
export const checkOrderTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ProductData = req.body;

  try {
    const result = await UserService.checkOrderTable(ProductData);
    res.status(200).json(result);
  } catch (e: any) {
    console.log("Controller", e.message);
    next(e);
    //throw e;
  }
};
