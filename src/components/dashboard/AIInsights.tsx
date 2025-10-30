import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { useTasks } from "@/contexts/TaskContext";

interface Insight {
  id: number;
  title: string;
  description: string;
  urgency: 'high' | 'moderate' | 'info';
  product: string;
  quantity?: number;
}

const AIInsights = () => {
  const { addTask } = useTasks();
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: 1,
      title: "Low Inventory Alert: Candles",
      description: "Inventory for Candles is low (only 20 units left). Upcoming Diwali is expected to increase demand by 60%. Recommend restocking now.",
      urgency: 'high',
      product: 'Candles',
      quantity: 50
    },
    {
      id: 2,
      title: "Dairy Stock Threshold Alert",
      description: "Dairy stock dropping below threshold; auto-restock recommended to maintain optimal levels.",
      urgency: 'high',
      product: 'Dairy Products',
      quantity: 100
    },
    {
      id: 3,
      title: "Overstock Detected: Beverages",
      description: "Overstock detected in Beverages — reduce next restock order by 30% to optimize storage.",
      urgency: 'moderate',
      product: 'Beverages',
      quantity: 0
    }
  ]);

  const insightTemplates = [
    {
      title: "Seasonal Demand Spike: Winter Apparel",
      description: "Winter apparel demand predicted to increase by 45% next week. Consider increasing stock levels.",
      urgency: 'moderate' as const,
      product: 'Winter Apparel',
      quantity: 75
    },
    {
      title: "Fresh Produce Expiry Warning",
      description: "Fresh produce approaching expiry date. Recommend promotional pricing to clear inventory.",
      urgency: 'high' as const,
      product: 'Fresh Produce',
      quantity: 0
    },
    {
      title: "Electronics: Trending Product",
      description: "Smartphones showing increased demand trend. Stock levels sufficient but monitor closely.",
      urgency: 'info' as const,
      product: 'Smartphones',
      quantity: 30
    },
    {
      title: "Snacks Inventory Optimal",
      description: "Snacks category showing optimal inventory levels. No action required at this time.",
      urgency: 'info' as const,
      product: 'Snacks',
      quantity: 0
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTemplate = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];
      const newInsight = {
        id: Date.now(),
        ...randomTemplate
      };
      
      setInsights(prev => {
        const updated = [newInsight, ...prev];
        return updated.slice(0, 4); // Keep only 4 insights
      });
    }, 12000); // New insight every 12 seconds

    return () => clearInterval(interval);
  }, []);

  const handleApprove = (insight: Insight) => {
    if (insight.quantity && insight.quantity > 0) {
      toast.success(`Order placed successfully for ${insight.product} (${insight.quantity} units).`);
      
      // Create a task for restocking
      addTask({
        title: `Restock ${insight.product} (${insight.quantity} units ordered)`,
        priority: insight.urgency === 'high' ? 'high' : 'medium',
        completed: false
      });
    } else {
      toast.success(`Action approved for ${insight.product}.`);
      
      // Create a general task
      addTask({
        title: `Follow up on ${insight.product} - ${insight.title}`,
        priority: insight.urgency === 'high' ? 'high' : 'medium',
        completed: false
      });
    }
    
    setInsights(prev => prev.filter(i => i.id !== insight.id));
  };

  const handleReject = (insight: Insight) => {
    toast.info("Action dismissed.");
    setInsights(prev => prev.filter(i => i.id !== insight.id));
  };

  const getUrgencyBadge = (urgency: string) => {
    switch(urgency) {
      case 'high':
        return <Badge className="bg-destructive text-destructive-foreground">High Priority</Badge>;
      case 'moderate':
        return <Badge className="bg-warning text-warning-foreground">Moderate</Badge>;
      case 'info':
        return <Badge className="bg-muted text-muted-foreground">Informational</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">AI Suggestions & Inventory Actions</h2>
      </div>
      
      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No active suggestions at the moment
          </div>
        ) : (
          insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 bg-muted/50 rounded-lg border border-border animate-slide-up"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-base">{insight.title}</h3>
                {getUrgencyBadge(insight.urgency)}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {insight.description}
              </p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleApprove(insight)}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(insight)}
                  className="flex items-center gap-1"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default AIInsights;
