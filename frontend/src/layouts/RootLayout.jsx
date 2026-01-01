import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />{" "}
        {/* this is where (Home,login) pages will be rendered here */}
      </main>
      {/* //we'll add a footer here later */}
      <Toaster position="topr-right" richColors />
    </div>
  );
}

export default RootLayout; 