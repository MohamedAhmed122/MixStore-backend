import express from "express";
import {
  CreateOrder,
  getOrder,
  getAllOrders,
  updatePaidOrder,
  getMyOrders
} from "../Controllers/OrderController.js";
import { protect, admin } from "../middleware/authMidleware.js";

const router = express.Router();
// getMyOrders
router.route("/").post(protect, CreateOrder).get(protect, getAllOrders);
router.route("/myOrders").post(protect, getMyOrders)
router.route("/:id").get(protect, getOrder);
router.route("/:id/pay").put(protect, updatePaidOrder);

export default router;
