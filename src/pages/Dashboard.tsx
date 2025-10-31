import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FootfallMonitor from "@/components/dashboard/FootfallMonitor";
import ShelfStatus from "@/components/dashboard/ShelfStatus";
import KPISummary from "@/components/dashboard/KPISummary";
import AIInsights from "@/components/dashboard/AIInsights";
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { useTasks } from "@/contexts/TaskContext";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { tasks } = useTasks();

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

        <div className="mb-6">
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Assigned to: <span className="font-medium text-primary">{task.assignedTo}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      task.status === 'completed' 
                        ? 'bg-success/10 text-success' 
                        : task.status === 'in_progress'
                        ? 'bg-blue-500/10 text-blue-600'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {task.status === 'completed' ? 'Completed' : task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
