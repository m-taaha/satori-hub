import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

function Register() {

  const [formData , setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.password !== formData.confirmPassword);
    toast.error("Password do not match!", {
      description: "Please check your password entries again."
    });
    return;
  }

  try{
    toast.success("Account Created", {
      description: "Weclome to Satori Hub," + formData.firstName,
    })
  }catch(error){
    toast.error("Registeration failed", {
      description: "Something went wrong. Please try again."
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to join Satori Hub
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">First Name</label>
                <Input
                  placeholder="Spidy"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  placeholder="Man"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* --- Added Username Field --- */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                placeholder="spidyman"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="spidy@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* --- Password and Confirm Password --- */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full mt-2">
              Sign Up
            </Button>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register