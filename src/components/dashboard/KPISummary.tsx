import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Package, Activity, Smile } from "lucide-react";

interface KPI {
  label: string;
  value: number;
  unit: string;
  trend: number;
  icon: any;
}

const KPISummary = () => {
  const [kpis, setKpis] = useState<KPI[]>([
    { label: "Store Efficiency", value: 87, unit: "%", trend: 2.5, icon: Activity },
    { label: "Task Completion", value: 92, unit: "%", trend: 5.1, icon: CheckCircle },
    { label: "Avg. Restock Time", value: 12, unit: "min", trend: -3.2, icon: Package },
    { label: "Customer Satisfaction", value: 94, unit: "%", trend: 3.8, icon: Smile },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        value: Math.max(0, Math.min(100, kpi.value + (Math.random() * 4 - 2))),
        trend: (Math.random() * 10 - 5),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {kpis.map((kpi, index) => (
        <Card key={index} className="p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
              </div>
              <p className="text-4xl font-bold tabular-nums">
                {kpi.value.toFixed(kpi.unit === "min" ? 0 : 1)}
                <span className="text-xl text-muted-foreground ml-1">{kpi.unit}</span>
              </p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              kpi.trend > 0 ? 'text-success' : 'text-destructive'
            }`}>
              <TrendingUp className={`h-4 w-4 ${kpi.trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(kpi.trend).toFixed(1)}%
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default KPISummary;
