import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

interface ShelfData {
  id: string;
  location: string;
  aisle: string;
  productType: string;
  stockLevel: number;
  status: 'normal' | 'low' | 'critical';
}

const ShelfStatus = () => {
  const [shelves, setShelves] = useState<ShelfData[]>([
    { id: '1-A', location: 'Shelf 1-A', aisle: 'Aisle 1', productType: 'Produce', stockLevel: 85, status: 'normal' },
    { id: '2-B', location: 'Shelf 2-B', aisle: 'Aisle 2', productType: 'Dairy', stockLevel: 45, status: 'low' },
    { id: '3-C', location: 'Shelf 3-C', aisle: 'Aisle 3', productType: 'Beverages', stockLevel: 92, status: 'normal' },
    { id: '4-D', location: 'Shelf 4-D', aisle: 'Aisle 4', productType: 'Snacks', stockLevel: 15, status: 'critical' },
    { id: '5-E', location: 'Shelf 5-E', aisle: 'Aisle 5', productType: 'Household', stockLevel: 78, status: 'normal' },
    { id: '6-F', location: 'Shelf 6-F', aisle: 'Entrance Zone', productType: 'Seasonal/Promotional', stockLevel: 38, status: 'low' },
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
    if (status === 'critical') return 'bg-destructive text-destructive-foreground';
    if (status === 'low') return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'critical') return 'Critical';
    if (status === 'low') return 'Low Stock';
    return 'Normal';
  };

  return (
    <Card className="p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4">Shelf Status Board</h2>
      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3">
        {shelves.map((shelf) => (
          <div
            key={shelf.id}
            className={`p-4 border rounded-lg transition-all ${
              shelf.status === 'critical' ? 'border-destructive bg-destructive/5 animate-pulse-glow' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">{shelf.location}</div>
                  <div className="text-xs text-muted-foreground">{shelf.aisle} • {shelf.productType}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(shelf.status)}`}>
                {getStatusLabel(shelf.status)}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stock Level</span>
                <span className="font-medium tabular-nums">{shelf.stockLevel}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    shelf.status === 'critical'
                      ? 'bg-destructive'
                      : shelf.status === 'low'
                      ? 'bg-warning'
                      : 'bg-success'
                  }`}
                  style={{ width: `${shelf.stockLevel}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ShelfStatus;
