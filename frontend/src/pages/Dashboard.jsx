import { useState, useEffect} from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, ExternalLink, Trash2 } from "lucide-react";


function Dashboard() {
  const [loading, setLoading] = useState(false);
    const [resources, setResources] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Medium",
    resourceType: "link", //default
    resourceLink: "",
  });

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //using form data for file uploads
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("difficulty", formData.difficulty);
    data.append("resourceType", formData.resourceType);

    if (formData.resourceType === "file") {
      data.append("resourceFile", file);
    } else {
      data.append("resourceLink", formData.resourceLink);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/resources/upload`,
        {
          method: "POST",
          //note for me for my learning --- not setting content-type header when using formdata becasue the browser will set automatically with the boundary

          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Upload failed");
      }

      toast.success("Resource uploaded successfully!");

      //reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "Medium",
        resourceType: "link",
        resourceLink: "",
      });

      setFile(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //file resouces
  const fetchMyResources = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/resources/my-resources`);
      const data = await res.json();
      if (res.ok) {
        setResources(data.resources);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchMyResources();
  }, []);

//handle delete
  const handleDelete = async (id) => {
    // Simple browser confirmation
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/resources/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Resource deleted successfully");
        // Refresh the list so the card disappears immediately
        fetchMyResources();
      } else {
        throw new Error(data.message || "Failed to delete");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>

      {/* status bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-blue-600 text-white shadow-md border-none">
          <p className="text-sm opacity-80">Total Resources</p>
          <h3 className="text-3xl font-bold">{resources.length}</h3>
        </Card>

        <Card className="p-4 border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Files Shared</p>
          <h3 className="text-3xl font-bold text-slate-800">
            {resources.filter((r) => r.resourceType === "file").length}
          </h3>
        </Card>

        <Card className="p-4 border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Links Shared</p>
          <h3 className="text-3xl font-bold text-slate-800">
            {resources.filter((r) => r.resourceType === "link").length}
          </h3>
        </Card>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Upload New Resource</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Title (e.g. React Hooks Guide)"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
              }}
              required
            />

            <textarea
              className="w-full border rounded-md p-2 mt-1 text-sm"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Category (e.g. Frontend)"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                required
              />
              <select
                className="border rounded-md p-2 text-sm"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    difficulty: e.target.value,
                  }))
                }
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="flex gap-4 items-center py-2">
              <label className="text-sm font-medium">Resource Type:</label>
              <label className="flex item-center gap-1 text-sm">
                <input
                  type="radio"
                  name="type"
                  value="link"
                  checked={formData.resourceType === "link"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, resourceType: "link" }))
                  }
                />{" "}
                Link
              </label>

              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="type"
                  value="file"
                  checked={formData.resourceType === "file"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, resourceType: "file" }))
                  }
                />
                File
              </label>
            </div>

            {formData.resourceType === "link" ? (
              <Input
                placeholder="https://..."
                value={formData.resourceLink}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    resourceLink: e.target.value,
                  }))
                }
                required
              />
            ) : (
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            )}

            <Button type="submit" className="w-full mt-1" disabled={loading}>
              {loading ? "Uploading..." : "Share Resource"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* fetched files - uploaded once */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Your Uploaded Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Card
                key={resource._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        resource.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : resource.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {resource.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 capitalize">
                      {resource.resourceType}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2 truncate">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button variant="outline" className="flex-1 text-xs" asChild>
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
                      View
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(resource._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-slate-500 col-span-full text-center py-10">
              No resources found. Try uploading your first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
