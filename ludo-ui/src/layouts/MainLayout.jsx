import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function MainLayout() {
  return (
    <>
      <Toaster position="top-right" />

      <main className="min-h-screen bg-[#0F0F1A] text-white">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;