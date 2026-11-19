import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../component/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F4F7FC]">
        {/* Compact top header bar */}
        <header className="flex h-12 shrink-0 items-center border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-sm sm:h-14 sm:px-6">
          <SidebarTrigger className="-ml-1" />
        </header>

        {/* Full width content area */}
        <div className="flex-1 w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
