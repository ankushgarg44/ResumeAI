import { SideNavbar } from "@/components/layout/side-navbar";
import { TopAppBar } from "@/components/layout/top-app-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 z-40">
        <SideNavbar />
      </div>

      {/* Main Content Area */}
      <div className={`flex flex-col min-h-screen md:pl-64`}>
        <TopAppBar />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
