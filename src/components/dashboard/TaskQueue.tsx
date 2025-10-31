import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Play } from "lucide-react";
import { useTasks } from "@/contexts/TaskContext";

const TaskQueue = () => {
  const { tasks, addTask, completeTask, startTask } = useTasks();

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new tasks being added
      if (Math.random() > 0.7 && tasks.filter(t => !t.completed).length < 8) {
        const newTaskOptions = [
          "Restock shelf section",
          "Investigate stock discrepancy",
          "Adjust merchandising display",
          "Monitor high-traffic area",
          "Check temperature controls",
        ];
        const randomTask = newTaskOptions[Math.floor(Math.random() * newTaskOptions.length)];
        const randomPriority = Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low';
        
        addTask({
          title: `${randomTask} - Auto-generated alert`,
          priority: randomPriority as 'high' | 'medium' | 'low',
          completed: false
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [tasks, addTask]);

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'border-l-destructive bg-destructive/5';
    if (priority === 'medium') return 'border-l-warning bg-warning/5';
    return 'border-l-primary bg-primary/5';
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertCircle className="h-4 w-4 text-destructive" />;
    if (priority === 'medium') return <Clock className="h-4 w-4 text-warning" />;
    return <Clock className="h-4 w-4 text-primary" />;
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Task Queue</h2>
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {activeTasks.length} Active
          </span>
          <span className="px-3 py-1 bg-success/10 text-success rounded-full font-medium">
            {completedTasks.length} Completed
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {activeTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>All tasks completed! Great job.</p>
          </div>
        ) : (
          activeTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border-l-4 rounded-lg transition-all animate-slide-up ${getPriorityColor(task.priority)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {getPriorityIcon(task.priority)}
                    <span className="text-xs text-muted-foreground">
                      {task.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      task.priority === 'high' 
                        ? 'bg-destructive text-destructive-foreground' 
                        : task.priority === 'medium'
                        ? 'bg-warning text-warning-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                    {task.assignedTo && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">
                        {task.assignedTo}
                      </span>
                    )}
                    {task.status === 'in_progress' && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-600">
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  <p className="font-medium">{task.title}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {task.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startTask(task.id)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start Work
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => completeTask(task.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default TaskQueue;
