import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

interface ShelfData {
  id: number;
  location: string;
  stockLevel: number;
  status: 'normal' | 'low' | 'critical';
}

const ShelfStatus = () => {
  const [shelves, setShelves] = useState<ShelfData[]>([
    { id: 1, location: "Shelf 1-A", stockLevel: 85, status: 'normal' },
    { id: 2, location: "Shelf 2-B", stockLevel: 45, status: 'low' },
    { id: 3, location: "Shelf 3-C", stockLevel: 92, status: 'normal' },
    { id: 4, location: "Shelf 4-D", stockLevel: 15, status: 'critical' },
    { id: 5, location: "Shelf 5-E", stockLevel: 67, status: 'normal' },
    { id: 6, location: "Shelf 6-F", stockLevel: 38, status: 'low' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShelves(prev => prev.map(shelf => {
        const change = Math.floor(Math.random() * 15) - 7;
        const newLevel = Math.max(0, Math.min(100, shelf.stockLevel + change));
        const status = newLevel < 25 ? 'critical' : newLevel < 50 ? 'low' : 'normal';
        return { ...shelf, stockLevel: newLevel, status };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === 'critical') return 'bg-destructive';
    if (status === 'low') return 'bg-warning';
    return 'bg-success';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'critical') return 'Out of Stock';
    if (status === 'low') return 'Low Stock';
    return 'Normal';
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Shelf Status Board</h2>
      </div>
      
      <div className="space-y-3">
        {shelves.map((shelf) => (
          <div
            key={shelf.id}
            className="p-4 bg-muted/50 rounded-lg animate-slide-up"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{shelf.location}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                shelf.status === 'critical' 
                  ? 'bg-destructive text-destructive-foreground animate-pulse-glow' 
                  : shelf.status === 'low'
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-success text-success-foreground'
              }`}>
                {getStatusLabel(shelf.status)}
              </span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getStatusColor(shelf.status)} transition-all duration-500 ease-out`}
                style={{ width: `${shelf.stockLevel}%` }}
              />
            </div>
            <div className="mt-1 text-right">
              <span className="text-sm font-semibold tabular-nums">{shelf.stockLevel}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ShelfStatus;
