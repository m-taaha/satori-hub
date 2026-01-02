import React from 'react'
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Search, FileText, ExternalLink, Bookmark } from "lucide-react";

function Explore() {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchAllResources = async (query = "") => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/v1/resources/resources/search?search=${query}`
        );
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

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Discover Resources
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Explore community-shared roadmaps, notes, and guides for MERN, Web3,
          and more.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex max-w-md mx-auto gap-2">
        <Input
          placeholder="Search topics (e.g. React)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => fetchAllResources(search)}>
          <Search className="w-4 h-4 mr-2" /> Search
        </Button>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource._id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">
                  {resource.category}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400"
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-xl mt-3 line-clamp-1">
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-slate-600 line-clamp-3">
                {resource.description}
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex gap-3">
              <Button variant="default" className="flex-1" asChild>
                <a
                  href={resource.resourceLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.resourceType === "file" ? (
                    <FileText className="w-4 h-4 mr-2" />
                  ) : (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  Open
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Explore