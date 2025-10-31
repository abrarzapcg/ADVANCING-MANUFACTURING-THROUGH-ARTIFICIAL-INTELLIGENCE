import { useState, useEffect } from "react";
import { useTasks } from "@/contexts/TaskContext";

interface ShelfData {
  id: string;
  location: string;
  aisle: string;
  productType: string;
  stockLevel: number;
  status: string;
}

interface FootfallData {
  zone: string;
  count: number;
  trend: string;
}

interface KPIData {
  label: string;
  value: number;
  unit: string;
  trend: number;
}

export const useStoreData = () => {
  const { tasks, employees } = useTasks();
  
  const [shelves] = useState<ShelfData[]>([
    { id: '1-A', location: 'Shelf 1-A', aisle: 'Aisle 1', productType: 'Produce', stockLevel: 85, status: 'normal' },
    { id: '2-B', location: 'Shelf 2-B', aisle: 'Aisle 2', productType: 'Dairy', stockLevel: 45, status: 'low' },
    { id: '3-C', location: 'Shelf 3-C', aisle: 'Aisle 3', productType: 'Beverages', stockLevel: 92, status: 'normal' },
    { id: '4-D', location: 'Shelf 4-D', aisle: 'Aisle 4', productType: 'Snacks', stockLevel: 15, status: 'critical' },
    { id: '5-E', location: 'Shelf 5-E', aisle: 'Aisle 5', productType: 'Household', stockLevel: 78, status: 'normal' },
    { id: '6-F', location: 'Shelf 6-F', aisle: 'Entrance Zone', productType: 'Seasonal/Promotional', stockLevel: 38, status: 'low' },
  ]);

  const [footfall] = useState<FootfallData[]>([
    { zone: 'Aisle 1 (Produce)', count: 42, trend: 'up' },
    { zone: 'Aisle 2 (Dairy)', count: 38, trend: 'stable' },
    { zone: 'Aisle 3 (Beverages)', count: 56, trend: 'up' },
    { zone: 'Aisle 4 (Snacks)', count: 51, trend: 'down' },
    { zone: 'Aisle 5 (Household)', count: 19, trend: 'down' },
    { zone: 'Entrance Zone', count: 63, trend: 'up' },
  ]);

  const [kpis] = useState<KPIData[]>([
    { label: "Store Efficiency", value: 87, unit: "%", trend: 2.5 },
    { label: "Task Completion", value: 92, unit: "%", trend: 5.1 },
    { label: "Avg. Restock Time", value: 12, unit: "min", trend: -3.2 },
    { label: "Customer Satisfaction", value: 94, unit: "%", trend: 3.8 },
    { label: "Sales", value: 15200, unit: "$", trend: 4.2 },
  ]);

  return {
    shelves,
    footfall,
    kpis,
    tasks: tasks.map(t => ({
      id: t.id,
      title: t.title,
      priority: t.priority,
      status: t.status,
      assignedTo: t.assignedTo,
      completed: t.completed
    })),
    employees
  };
};
