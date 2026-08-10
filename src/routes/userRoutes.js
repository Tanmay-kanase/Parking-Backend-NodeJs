import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as userController from "../controllers/userController.js";

const router = Router();

router.put("/:userId", asyncHandler(userController.updateUser));
router.get("/email/:email", asyncHandler(userController.getUserByEmail));
router.get("/hello", userController.sayHello);
router.post("/signup", asyncHandler(userController.signup));
router.post("/login", asyncHandler(userController.loginUser));
router.get("/me", asyncHandler(userController.getCurrentUser));
router.post("/send-otp", asyncHandler(userController.sendOtp));
router.post("/verify-otp", asyncHandler(userController.verifyOtp));
router.get("/getAllUsers", asyncHandler(userController.getAllUsers));
router.post("/google-login", asyncHandler(userController.googleLogin));
router.delete("/delete/:userId", asyncHandler(userController.deleteUser));
router.put("/make-admin/:userId", asyncHandler(userController.makeAdmin));
router.post("/logout", userController.logoutUser);
router.get("/:userId/email", asyncHandler(userController.getEmailByUserId));
router.get("/:userId", asyncHandler(userController.getUserById));

export default router;
