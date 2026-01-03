import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function ResourceDetails() {
    const {id} = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchResource = async () => {
            try{
                const res = await fetch(`/api/v1/resources/${id}`);
                const data = await res.json();

                if(res.ok) {
                    setResource(data.resource);
                }
            } catch(error){
                console.log("Error fetching details:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchResource();
    }, [id]);

    if(loading) return <div className="p-20 text-center">Loading details...</div>;;
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
    </div>
  );
}

export default ResourceDetails;
