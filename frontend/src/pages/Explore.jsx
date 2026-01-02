import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Search, FileText, ExternalLink, Bookmark } from "lucide-react";

function Explore() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // We call the 'public' search route you built in the controller
  const fetchAllResources = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/resources/resources/search?search=${query}`);
      const data = await res.json();
      if (res.ok) setResources(data.resources);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllResources(search);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Discover Learning Resources
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Browse the best roadmaps, notes, and guides shared by the Satori Hub community.
        </p>
      </div>

      {/* Search Bar Section */}
      <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            className="pl-10"
            placeholder="Search topics (e.g. React, Solidity)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Grid of All Community Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center py-10 text-slate-500">Loading resources...</p>
        ) : resources.length > 0 ? (
          resources.map((resource) => (
            <Card key={resource._id} className="flex flex-col hover:border-blue-200 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                   <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                    {resource.category}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-yellow-500">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg mt-2 line-clamp-1">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-slate-500 line-clamp-2">{resource.description}</p>
              </CardContent>
              <CardFooter className="pt-4 border-t flex gap-2">
                 <Button variant="default" className="w-full text-xs h-9" asChild>
                    <a href={resource.resourceLink} target="_blank" rel="noreferrer">
                      {resource.resourceType === "file" ? <FileText className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                      Open Resource
                    </a>
                 </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-slate-400">No resources found matching "{search}"</p>
            <Button variant="link" onClick={() => {setSearch(""); fetchAllResources("");}}>Clear search</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;