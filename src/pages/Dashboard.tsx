import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FootfallMonitor from "@/components/dashboard/FootfallMonitor";
import ShelfStatus from "@/components/dashboard/ShelfStatus";
import KPISummary from "@/components/dashboard/KPISummary";
import AIInsights from "@/components/dashboard/AIInsights";
import Navigation from "@/components/layout/Navigation";

const Dashboard = () => {
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
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Manager Dashboard</h2>
          <p className="text-muted-foreground">Real-time store analytics and AI-powered insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <KPISummary />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FootfallMonitor />
          <ShelfStatus />
        </div>

        <div className="mb-6">
          <AIInsights />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
