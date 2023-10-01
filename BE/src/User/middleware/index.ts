// // import jwt from "jsonwebtoken";
// import express, { Express, Request, Response, NextFunction } from "express";
// const jwt = require("jsonwebtoken");
// const secretKey =
//   "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4";

// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // const { username } = req.body;
//   const authHeader = req.headers["authorization"];
//   const token = authHeader ? authHeader : "";
//   if (token == null) {
//     res.sendStatus(401).json("Authentication failed");
//   }
//   jwt.verify(token, secretKey, (err: any, decoded: any) => {
//     // console.log(decoded);
//     if (err) return res.status(403).json("Forbidden access");
//     req.user = decoded;
//     next(); //can directly send user as argument to next
//   });
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey =
  "5ad7235379e726b5c8c3e8ab394c1f10230e78b8a2e8b5a692c5ab42f1f7d8e4"; // Replace with your actual secret key

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = authHeader.split(" ")[1]; // Assuming the header is in the format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden access" });
    }

    req.user = decoded;
    next();
  });
};
