import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

interface AisleData {
  id: number;
  name: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

const FootfallMonitor = () => {
  const [aisles, setAisles] = useState<AisleData[]>([
    { id: 1, name: "Aisle 1 - Produce", count: 42, trend: 'stable' },
    { id: 2, name: "Aisle 2 - Dairy", count: 28, trend: 'down' },
    { id: 3, name: "Aisle 3 - Beverages", count: 35, trend: 'up' },
    { id: 4, name: "Aisle 4 - Snacks", count: 51, trend: 'up' },
    { id: 5, name: "Aisle 5 - Household", count: 19, trend: 'stable' },
    { id: 6, name: "Entrance Zone", count: 63, trend: 'up' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAisles(prev => prev.map(aisle => {
        const change = Math.floor(Math.random() * 10) - 5;
        const newCount = Math.max(0, Math.min(100, aisle.count + change));
        const trend = change > 2 ? 'up' : change < -2 ? 'down' : 'stable';
        return { ...aisle, count: newCount, trend };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (count: number) => {
    if (count > 50) return 'text-destructive';
    if (count > 30) return 'text-warning';
    return 'text-success';
  };

  const getStatusBg = (count: number) => {
    if (count > 50) return 'bg-destructive/10 border-destructive/20';
    if (count > 30) return 'bg-warning/10 border-warning/20';
    return 'bg-success/10 border-success/20';
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Live Footfall Monitor</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {aisles.map((aisle) => (
          <div
            key={aisle.id}
            className={`p-4 rounded-lg border transition-all animate-slide-up ${getStatusBg(aisle.count)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{aisle.name}</p>
                <p className={`text-3xl font-bold tabular-nums animate-count-update ${getStatusColor(aisle.count)}`}>
                  {aisle.count}
                </p>
              </div>
              <div className="text-right">
                {aisle.trend === 'up' && (
                  <span className="text-destructive text-xs">↗ High</span>
                )}
                {aisle.trend === 'down' && (
                  <span className="text-success text-xs">↘ Low</span>
                )}
                {aisle.trend === 'stable' && (
                  <span className="text-muted-foreground text-xs">→ Normal</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FootfallMonitor;
