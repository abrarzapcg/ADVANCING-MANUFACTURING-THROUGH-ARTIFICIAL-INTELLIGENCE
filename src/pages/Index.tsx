import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FootfallMonitor from "@/components/dashboard/FootfallMonitor";
import ShelfStatus from "@/components/dashboard/ShelfStatus";
import TaskQueue from "@/components/dashboard/TaskQueue";
import KPISummary from "@/components/dashboard/KPISummary";
import ChatPanel from "@/components/chat/ChatPanel";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader currentTime={currentTime} />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <KPISummary />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FootfallMonitor />
          <ShelfStatus />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TaskQueue />
        </div>
      </main>

      <ChatPanel />
    </div>
  );
};

export default Index;
