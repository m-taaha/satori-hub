import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Dashboard() {
  const [loading, setLoading] = useState(false);
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
    data.append("resourceType", formData.resourceType)

    if(formData.resourceType === "file") {
      data.append("resourceFile", file)
    } else {
      data.append("resourceLink", formData.resourceLink)
    }

    try{
      const res = await fetch("/api/v1/resources/upload", {
        method: "POST",
        //note for me for my learning --- not setting content-type header when using formdata becasue the browser will set automatically with the boundary

        body: data,
      });

      const result = await res.json();

      if(!res.ok){
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

    } catch(error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>

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
                setFormData(prev => ({ ...prev, title: e.target.value }));
              }}
              required
            />

            <textarea
              className="w-full border rounded-md p-2 mt-1 text-sm"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Category (e.g. Frontend)"
                value={formData.category}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                required
              />
              <select
                className="border rounded-md p-2 text-sm"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, difficulty: e.target.value }))
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
                checked={formData.resourceType === 'link'}
                onChange={() => setFormData(prev => ({...prev, resourceType: 'link'}))}
                 /> Link
              </label>

              <label className="flex items-center gap-1 text-sm">
                <input 
                type="radio"
                name="type"
                value="file"
                checked={formData.resourceType === 'file'}
                onChange={() => setFormData(prev => ({...prev, resourceType: 'file'}))}
                 />
                File
              </label>
            </div>


            {formData.resourceType === 'link' ? (
              <Input
              placeholder="https://..."
              value={formData.resourceLink}
              onChange={(e) => setFormData(prev => ({...prev, resourceLink: e.target.value}))}

              required
               />
            ) : (
              <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
               />
            )}

            <Button  type="submit" className="w-full mt-1" disabled={loading}>
              {loading ? "Uploading..." : "Share Resource"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
