import { ISignup, IUser, IuserRegister } from "./User.types";

import jwt from "jsonwebtoken";
const secretKey =
  "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4";
const nodemailer = require("nodemailer");

const sendMail = async (token: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        email: "barsashyaula13@mail.com",
        password: process.env.password,
      },
    });
    const mailOptions = {
      from: "barsashyaula13@gmail.com",
      to: "learnlearn10101@gmail.com",
      subject: "for password reset",
      html: "<p>this is for password reset<p/>",
    };
    transporter.sendMail(mailOptions, function (error: any, infor: string) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been sent");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

// for database connection
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://barsha:test123@cluster0.4rnjqa0.mongodb.net/";
const client = new MongoClient(uri);

export const apiLogin = (value: IUser) => {
  const { firstName, password } = value;
  if (firstName === "gritfeat" && password === "fellowship") {
    return "Login successful";
  } else {
    return "Login failed";
  }
};

export const connectDb = () => {
  try {
    return "database is connected";
  } catch (e) {
    return e;
  }
};

async function getAdminRoleId() {
  const db = client.db("Login");
  const roles = db.collection("roles");
  const roleData = await roles.findOne({ name: "ADMIN" });
  return roleData ? roleData._id : null;
}

export const register = async (value: IuserRegister) => {
  const db = client.db("Login");
  const { firstName, lastName, email, password, username } = value;
  try {
    const user = db.collection("login");
    const roleId = await getAdminRoleId();
    const userData: IuserRegister = {
      firstName,
      lastName,
      email,
      username,
      password,
      role: roleId,
    };
    const result = await user.insertOne(userData);
    return result;
  } catch (e) {
    throw e;
  }
};

export const login = async (
  username: IuserRegister,
  password: IuserRegister
) => {
  try {
    const db = client.db("Login");
    const users = db.collection("login");
    const product = db.collection("login");

    return await users.findOne({ username, password });
  } catch (e) {
    console.log("repository", e);
    throw e;
  }
};

export const dbSignup = async (value: ISignup) => {
  const db = client.db("Login");
  const { name, email, password, username } = value;
  try {
    const user = db.collection("login");
    const userData: ISignup = {
      name,
      email,
      username,
      password,
      role: "user",
    };
    const result = await user.insertOne(userData);
    return result;
  } catch (e) {
    throw e;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const db = client.db("Login");
    const users = db.collection("login");
    // throw new Error("repo error");
    return await users.findOne({ email });
  } catch (e) {
    console.log("repository", e);
    throw e;
  }
};

export const ResetPassword = async (email: string, password: any) => {
  try {
    const db = client.db("Login");
    const users = db.collection("login");
    const user = await users.findOne({ email: "barsashyaula13@gmail.com" });
    console.log("repo reset", user);
    console.log(password.password);
    if (user) {
      await users.updateOne(
        { email: "barsashyaula13@gmail.com" },
        { $set: { password: password } }
      );
      return { status: 200, message: "Reset password sucessfull" };
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    console.log("repository", e);
    throw e;
  }
};
export const showProduct = async () => {
  try {
    const db = client.db("inventory");
    const product = db.collection("ProductTable");
    const data = product.find().toArray();
    return data;
  } catch (e) {
    return e;
  }
};

export const changeStatus = async (id: string) => {
  console.log("id from repo", id);
  try {
    const db = client.db("inventory");
    const product = db.collection("ProductTable");
    const updatedProduct = await product.findOneAndUpdate(
      { ProductID: id },
      { $set: { Status: "Requested" } }
    );
    if (!updatedProduct) {
      console.log("Product not found");
    }
    return updatedProduct;
  } catch (e) {
    return e;
  }
};
export const changeOrderStatus = async (id: string) => {
  try {
    console.log("error test", id);
    const db = client.db("inventory");
    const product = db.collection("orderTable");
    const newid = new ObjectId(id);
    const updatedProduct = await product.findOneAndUpdate(
      { _id: newid },
      { $set: { approvalStatus: "Approved" } }
    );
    if (!updatedProduct) {
      console.log("Product not found");
    }
    return updatedProduct;
  } catch (e) {
    return e;
  }
};

export const AdminPage = async (username: string) => {
  console.log(username);
  try {
    const db = client.db("Login");
    const product = db.collection("login");
    const user = await product.findOne(username);
    console.log(user.role);

    return user.role;
  } catch (e) {
    throw e;
  }
};

export const addOrder = async (orderData: any) => {
  console.log("this is orderdata", orderData);
  const data = {
    product_id: new ObjectId(orderData.product_id),
    user_id: new ObjectId(orderData.user_id),
    approvalStatus: "Pending",
    orderDate: new Date(),
  };
  try {
    const db = client.db("inventory");
    // const product = db.collection("OrderTable");
    const product = db.collection("orderTable");
    const result = await product.insertOne(data);
    return result;
  } catch (e) {
    throw e;
  }
};

export const showOrder = async () => {
  try {
    const db = client.db("inventory");
    const orderTable = db.collection("orderTable");
    const products = await orderTable
      .aggregate([
        {
          $lookup: {
            from: "ProductTable", //joining product and login table
            localField: "product_id",
            foreignField: "_id",
            as: "order",
          },
        },
        {
          $lookup: {
            from: "login",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$order",
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 1,
            "order.ProductID": 1, //from producttable
            "order._id": 1,
            "order.ImageURL": 1,
            "order.ProductName": 1,
            "order.Quantity": 1,

            "user.name": 1,
            orderDate: 1,
            approvalStatus: 1,
            status: 1, //???
            // approvalStatus: "Pending", //???
          },
        },
      ])
      .toArray();
    return products;
  } catch (e) {
    throw e;
  }
};

export const addProduct = async (orderData: any) => {
  console.log(orderData);
  const { ProductID, ImageURL, ProductName, Quantity } = orderData;
  try {
    const db = client.db("inventory");
    const product = db.collection("ProductTable");
    const newData = {
      ProductID,
      ImageURL,
      ProductName,
      Quantity,
      Status: "Request",
    };
    const result = await product.insertOne(newData);
    return result;
  } catch (e) {
    throw e;
  }
};
export const deleteProduct = async (productID: string) => {
  try {
    const db = client.db("inventory");
    const product = db.collection("ProductTable");
    const result = await product.deleteOne(productID);
    return result;
  } catch (e) {
    throw e;
  }
};

export const deleteOrder = async (id: string) => {
  const _id = new ObjectId(id);
  console.log("objId", _id);
  try {
    const db = client.db("inventory");
    const product = db.collection("orderTable");
    const result = await product.deleteOne({ _id });
    return result;
  } catch (e) {
    throw e;
  }
};

export const count = async () => {
  try {
    const db = client.db("Login");
    const users = db.collection("login");
    // const result = await users.find().toArray();
    const userCount = await users.countDocuments();

    const db2 = client.db("inventory");
    const product = db2.collection("ProductTable");
    const productCount = await product.countDocuments();

    const approved = db2.collection("orderTable");
    const approvedCount = await approved.countDocuments({
      approvalStatus: "Approved",
    });
    const pendingCount = await approved.countDocuments({
      approvalStatus: "Pending",
    });
    const OutOfStock = await product.countDocuments({
      Quantity: "0",
    });

    return { userCount, productCount, approvedCount, pendingCount, OutOfStock };
  } catch (e) {
    throw e;
  }
};

export const changeQuantity = async (id: string) => {
  const newId = new ObjectId(id);
  console.log("quantity id ", newId);
  try {
    const db = client.db("inventory");
    const product = db.collection("ProductTable");
    const currentProduct = await product.findOne({ _id: newId });
    console.log("currentProduct", currentProduct);
    if (currentProduct && currentProduct.Quantity) {
      // Converting the current quantity to a number, decrement it, and convert it back to a string
      const newQuantity = String(Number(currentProduct.Quantity) - 1);
      // Updating the document with the new quantity
      const updatedProduct = await product.findOneAndUpdate(
        { _id: newId },
        { $set: { Quantity: newQuantity } }
      );
      return updatedProduct;
    }
  } catch (e) {
    throw e;
  }
};

export const editProduct = async (id: string, productData: any) => {
  console.log(id, productData);
  const db = client.db("inventory");
  const product = db.collection("ProductTable");
  const result = await product.updateOne(
    { _id: new ObjectId(id) },
    { $set: productData }
  );
  return result;
};
export const checkOrderTable = async (productData: any) => {
  console.log(productData);
  const db = client.db("inventory");
  const product = db.collection("orderTable");
  const result = product.findOne(productData);
  if (result) {
    return true;
  }
};

// export const forgetPassword = async (
//   email: string
//   // password: IuserRegister
// ) => {
//   try {
//     const db = client.db("Login");
//     const users = db.collection("login");
//     const userData = await users.findOne({ email });
//     // throw new Error("repo error");
//     // return await users.findOne({ email });
//     if (userData) {
//       console.log("mail exists");
//       const accessToken = jwt.sign(email, secretKey);
//       const user = await users.updateOne(
//         { email },
//         { $set: { token: accessToken } }
//       );
//       sendMail(accessToken);
//       console.log("mail updated", user);
//     } else {
//       console.log("no email exist");
//     }
//   } catch (e) {
//     console.log("repository", e);
//     throw e;
//   }
// };
