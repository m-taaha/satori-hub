import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {toast} from "sonner";

function ResourceDetails() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReview] = useState([]);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  //fetch refviews separately
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reviews/${id}/reviews`);
      const data = await res.json();

      if (res.ok) setReview(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  //fetch resources
  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/resources/${id}`);
        const data = await res.json();

        if (res.ok) {
          setResource(data.resource);
        }
      } catch (error) {
        console.log("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
    fetchReviews();
  }, [id]);

  
  //Submitting a review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reviews/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: Number(reviewData.rating),
          comment: reviewData.comment,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Review posted!");
        setReviewData({
          rating: 5,
          comment: "",
        });
        //refresh revies list here
        fetchReviews();
      } else {
        toast.error(result.message || "Failed to post review");
      }
    } catch (error) {
      toast.error("Failed to post review");
    }
  };

  if (loading)
    return <div className="p-20 text-center">Loading details...</div>;
  if (!resource)
    return <div className="p-20 text-center">Resource not found.</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <Link
        to="/explore"
        className="flex items-center text-sm text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Explore
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">{resource.title}</h1>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
            {resource.category}
          </span>
          <div className="flex items-center text-yellow-600 font-medium">
            <Star className="w-4 h-4 fill-current mr-1" />
            {resource.averageRating
              ? resource.averageRating.toFixed(1)
              : "No ratings"}
            <span className="text-slate-400 ml-1">
              ({resource.totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>

      <Card className="border-none bg-slate-50">
        <CardContent className="p-8">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">
            About this resource
          </h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
            {resource.description}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="flex-1" asChild>
          <a href={resource.resourceLink} target="_blank" rel="noreferrer">
            {resource.resourceType === "file" ? (
              <FileText className="mr-2" />
            ) : (
              <ExternalLink className="mr-2" />
            )}
            Access {resource.resourceType === "file" ? "File" : "Link"}
          </a>
        </Button>
      </div>

      {/* Later, we'll add a "Reviews" section here! */}
      <hr className="my-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Column 1: Review List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            Community Reviews ({reviews.length})
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="p-4 bg-white border rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-blue-600">
                      @{rev.user?.userName || "User"}
                    </span>
                    <div className="flex text-yellow-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">
                No reviews yet. Be the first to rate!
              </p>
            )}
          </div>
        </div>

        {/* Column 2: Post Review Form */}
        <div className="bg-slate-50 p-6 rounded-2xl h-fit border border-slate-100">
          <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Rating</label>
              <select
                className="w-full p-2 rounded-md border text-sm"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({ ...reviewData, rating: e.target.value })
                }
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Comment</label>
              <textarea
                className="w-full p-3 rounded-md border text-sm"
                placeholder="Share your experience with this resource..."
                rows={4}
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Post Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResourceDetails;
