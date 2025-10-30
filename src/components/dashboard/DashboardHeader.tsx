import { Activity } from "lucide-react";

interface DashboardHeaderProps {
  currentTime: Date;
}

const DashboardHeader = ({ currentTime }: DashboardHeaderProps) => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elevated sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SmartStore AI Assistant</h1>
              <p className="text-sm text-primary-foreground/80">Real-time Operations Dashboard</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p className="text-2xl font-bold tabular-nums">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
