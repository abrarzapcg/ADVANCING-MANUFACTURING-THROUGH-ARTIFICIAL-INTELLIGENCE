import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'timestamp'>) => void;
  completeTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Restock Shelf 4-D (Critical - 15% stock)", priority: 'high', timestamp: new Date(), completed: false },
    { id: 2, title: "Monitor Entrance Zone (63 people - high traffic)", priority: 'high', timestamp: new Date(), completed: false },
    { id: 3, title: "Check Shelf 2-B inventory (Low stock warning)", priority: 'medium', timestamp: new Date(), completed: false },
    { id: 4, title: "Clean Aisle 5 (Low footfall - optimal time)", priority: 'low', timestamp: new Date(), completed: false },
  ]);

  const addTask = (task: Omit<Task, 'id' | 'timestamp'>) => {
    setTasks(prev => [{
      ...task,
      id: Date.now(),
      timestamp: new Date(),
    }, ...prev].slice(0, 10));
  };

  const completeTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: true } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
