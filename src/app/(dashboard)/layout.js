import DashboardSidebar from "@/components/dashboard/dashboardSidebar/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* // show navbar in signup and signin page */}
      {/* <Navbar/> */}

      <div className="flex min-h-screen">
        {/* ── Left Sidebar ── */}
        <DashboardSidebar />

        {/* ── Main content area ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* ── Top bar ── */}
          {/* <DashboardTopbar /> */}

          {/* ── Page content ── */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>

      {/* //  show Footer in signup and signin page */}
      {/* <Footer /> */}
    </>
  );
}
