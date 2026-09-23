import Header from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-screen">
      {/* Sidebar, header, nav go here later */}
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
