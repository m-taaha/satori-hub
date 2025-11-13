import {Review} from "../models/review.model.js"
import {Resource} from "../models/resource.model.js"

export const createReview = async (req, res) => {
    try{
      const { rating, comment } = req.body;
      const { resourceId } = req.params;
      const userId = req.user._id;

      //checking if resource exist or not
      const resource = await Resource.findById(resourceId);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      //check if user has already reviwed this resource
      // We look for a review where 'user' is ME and 'resource' is THIS ONE
      const exitngReview = await Review.findOne({
          user: userId,
          resource: resourceId
      })

      if(exitngReview){
          return res.status(409).json({message: "You have already reviewed this resource "})
      }

      //create the new review 
      const newReview = await Review.create({
        comment,
        rating,
        user: userId,
        resource: resourceId,
      });

      return res.status(201).json({
        message: "Review Added Successfully",
        review: newReview,
      });
    } catch(error) {
         console.log("Create Review Error", error);
         return res.status(500).json({
           message: `Sever Error`,
         });
    }
}