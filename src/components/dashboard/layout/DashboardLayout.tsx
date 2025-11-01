// src/layouts/DashboardLayout.tsx
import SidebarMenu from "@/components/dashboard/layout/SidebarMenu";
import TopBar from "@/components/dashboard/layout/TopBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-default-50">
      <SidebarMenu />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
