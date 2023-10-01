import express, { Express, NextFunction, Request, Response } from "express";

export default function middleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  error.name = error.name || "500";
  res.status(Number(error.name)).json(error.message);
  next();
}
