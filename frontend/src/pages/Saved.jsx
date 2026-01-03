import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, BookmarkX } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Saved() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSaved = async () => {
        try{
            const res = await fetch("/api/v1/resources/bookmarks/my-saved");
            const data = await res.json();
            
            if(res.ok) {
                setBookmarks(data.bookmarks);
            }
        }catch(error){
            toast.error("Failed to fetch the bookmarks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSaved();
    }, []);

    //remove bookmark
    const removeBookmark = async (id) => {
        try {
            const res = await fetch(`/api/v1/resources/${id}/bookmark`, {
                method: "POST",
            })

            if(res.ok) {
                toast.success("Removed from saved");
                setBookmarks(prev => {
                   return prev.filter(item => item._id !== id)
                })
            }


        } catch(error) {
            toast.error("Error removing bookmark")
        }
    } 
 
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Saved Resources</h1>

      {loading ? (
        <p>Loading saved items...</p>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((resource) => (
            <Card key={resource._id}>
              <CardTitle className="text-lg truncate hover:text-blue-600 transition-colors">
                <Link to={`/resource/${resource._id}`}>{resource.title}</Link>
              </CardTitle>

              <CardContent className="grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase">
                    {resource.category}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {resource.description}
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <a
                    href={resource.resourceLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBookmark(resource._id)}
                >
                  <BookmarkX className="w-4 h-4 text-red-500" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-slate-400 mb-4">
            You haven't saved any resources yet.
          </p>
          <Button variant="outline" asChild>
            <a href="/explore">Go to Explore</a>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Saved;
