import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  completed: boolean;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'timestamp' | 'status' | 'assignedTo'>) => void;
  completeTask: (id: number) => void;
  startTask: (id: number) => void;
  employees: string[];
}

const employees = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Helen'];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Restock Shelf 4-D (Critical - 15% stock)", priority: 'high', timestamp: new Date(), completed: false, status: 'pending', assignedTo: 'Alice' },
    { id: 2, title: "Monitor Entrance Zone (63 people - high traffic)", priority: 'high', timestamp: new Date(), completed: false, status: 'in_progress', assignedTo: 'Bob' },
    { id: 3, title: "Check Shelf 2-B inventory (Low stock warning)", priority: 'medium', timestamp: new Date(), completed: false, status: 'pending', assignedTo: 'Charlie' },
    { id: 4, title: "Clean Aisle 5 (Low footfall - optimal time)", priority: 'low', timestamp: new Date(), completed: false, status: 'pending', assignedTo: 'Diana' },
  ]);

  const addTask = (task: Omit<Task, 'id' | 'timestamp' | 'status' | 'assignedTo'>) => {
    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    setTasks(prev => [{
      ...task,
      id: Date.now(),
      timestamp: new Date(),
      status: 'pending' as const,
      assignedTo: randomEmployee,
    }, ...prev].slice(0, 10));
  };

  const completeTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: true, status: 'completed' } : task
    ));
  };

  const startTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: 'in_progress' } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask, startTask, employees }}>
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
