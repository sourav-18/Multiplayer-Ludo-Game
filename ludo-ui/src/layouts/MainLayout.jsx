import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { AllState } from "../context/Context";

function MainLayout() {
  const { state: { loading } } = AllState();
  return (
    <>
      <Toaster position="top-right" />
      <LoadingOverlay loading={loading?.isLoading} text={loading?.text} />
      <main className="min-h-screen bg-[#0F0F1A] text-white">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;