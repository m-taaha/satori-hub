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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/resources/bookmarks/my-saved`,{
              credentials: "include"
            });
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/resources/${id}/bookmark`, {
                method: "POST",
                credentials: "include"
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
            <Card
              key={resource._id}
              className="flex flex-col h-full hover:shadow-md transition-shadow"
            >
              {/* --- FIX HERE: Wrap CardTitle inside CardHeader --- */}
              <CardHeader>
                <CardTitle className="text-lg truncate hover:text-blue-600 transition-colors">
                  <Link to={`/resource/${resource._id}`}>{resource.title}</Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase">
                    {resource.category}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 italic">
                  {resource.description}
                </p>
              </CardContent>

              <CardFooter className="flex gap-2 pt-4 border-t">
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
                  className="hover:bg-red-50"
                  onClick={() => removeBookmark(resource._id)}
                >
                  <BookmarkX className="w-4 h-4 text-red-500" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* ... Empty state remains the same ... */
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-slate-400 mb-4">
            You haven't saved any resources yet.
          </p>
          <Button variant="outline" asChild>
            <Link to="/explore">Go to Explore</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Saved;
