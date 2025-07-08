import { Router } from "express";
import { getOrdersHandler } from "./get-orders";

export const kitchenManagerRouter = Router();

kitchenManagerRouter.get("/orders", getOrdersHandler);
