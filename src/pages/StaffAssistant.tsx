import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TaskQueue from "@/components/dashboard/TaskQueue";
import ChatPanel from "@/components/chat/ChatPanel";
import Navigation from "@/components/layout/Navigation";

const StaffAssistant = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-24">
      <DashboardHeader currentTime={currentTime} />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Staff Assistant</h2>
          <p className="text-muted-foreground">Your operational task center and AI support</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TaskQueue />
        </div>

        <div className="mt-8 bg-card rounded-lg p-6 border shadow-card">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium mb-1">Need Help?</p>
              <p className="text-sm text-muted-foreground">Click the chat icon below to ask the AI assistant</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium mb-1">Complete Tasks</p>
              <p className="text-sm text-muted-foreground">Mark tasks as done to improve store KPIs</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium mb-1">Priority First</p>
              <p className="text-sm text-muted-foreground">Focus on high-priority tasks in red</p>
            </div>
          </div>
        </div>
      </main>

      <ChatPanel />
    </div>
  );
};

export default StaffAssistant;
