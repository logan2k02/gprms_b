import { Order, StaffActivityLog } from "@prisma/client";
import { RequestHandler } from "express";
import { prisma } from "../../../prisma";

export const getOrdersHandler: RequestHandler<Order[], {}, {}> = async (
  req,
  res
) => {
  console.log("Fetching orders");

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(orders);
};
