import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <div>
        {/* //we'll add a navbar later here */}
        <main>
            <Outlet /> {/* this is where (Home,login) pages will be rendered here */}
        </main>
        {/* //we'll add a footer here later */}
        <Toaster position="topr-right" richColors/>
    </div>
  )
}

export default RootLayout; 