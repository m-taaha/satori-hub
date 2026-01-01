import { useState } from "react";
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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

//checking validation
    if (formData.password !== formData.confirmPassword) {
    return toast.error("Password do not match!", {
      description: "Please check your password entries again."
    });
  }
    setLoading(true);
    try {
      //api call
      const res = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      })

      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
//success toast
      toast.success("Account Created", {
        description: `Welcome to Satori Hub,  ${formData.firstName}`,
      });

      navigate("/login")

    } catch (error) {
      toast.error("Registration failed", {
        description: error.message, //from backend
      });
    } finally {
      setLoading(false);
    }
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
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input
                id="firstName"
                  placeholder="Spidy"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input
                id="lastName"
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
              <label htmlFor="userName" className="text-sm font-medium">Username</label>
              <Input
              id="userName"
                placeholder="spidyman"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
              id="email"
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
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
              id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <Input
              id="confirmPassword"
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
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
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