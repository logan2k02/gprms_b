import { StaffRole } from "@prisma/client";
import { Router } from "express";
import { bodyValidatorMiddleware } from "../../middlewares/body-validator";
import { staffAuthRequiredMiddleware } from "../../middlewares/staff-auth-required";
import { adminRouter } from "./admin/_router";
import { createInitialAdminHandler } from "./create-initial-admin";
import { staffLoginHandler, staffLoginHandlerBodySchema } from "./login";
import { staffLogoutHandler } from "./logout";
import { staffRefreshAuthHandler } from "./refresh-auth";
import { kitchenManagerRouter } from "./kitchen-manager/_router";

export const staffRouter = Router();

staffRouter.post("/create-initial-admin", createInitialAdminHandler);
staffRouter.post(
  "/login",
  bodyValidatorMiddleware(staffLoginHandlerBodySchema),
  staffLoginHandler
);
staffRouter.post("/logout", staffLogoutHandler);
staffRouter.post("/refresh-auth", staffRefreshAuthHandler);

staffRouter.use(
  "/admin",
  staffAuthRequiredMiddleware(StaffRole.Admin),
  adminRouter
);

staffRouter.use(
  "/kitchen-manager",
  staffAuthRequiredMiddleware(StaffRole.KitchenManager),
  kitchenManagerRouter
);
