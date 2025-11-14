import {Router} from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {createReviewSchema } from "../validators/review.validator.js"
import { createReview, getResourceReviews } from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.post("/:resourceId/review",
    isAuthenticated,
    validate(createReviewSchema),
    createReview
)

// GET all reviews for a specific resource publically
reviewRouter.get("/:resourceId/reviews", getResourceReviews);

export default reviewRouter;