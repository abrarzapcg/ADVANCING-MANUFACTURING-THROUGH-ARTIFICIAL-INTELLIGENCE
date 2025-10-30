import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your SmartStore AI Assistant. I can help you with store operations, footfall analysis, inventory checks, and task management. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate proactive AI alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85 && isOpen) {
        const alerts = [
          "Alert: High footfall detected in Entrance Zone (63 people). Consider deploying additional staff.",
          "Notice: Shelf 4-D is critically low (15% stock). Immediate restocking recommended.",
          "Update: Task completion rate has improved to 92%. Great work team!",
          "Recommendation: Aisle 5 has low traffic. This is an optimal time for cleaning and maintenance.",
        ];
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          role: 'assistant',
          content: randomAlert,
          timestamp: new Date(),
        }]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let response = "I'm processing your request...";
      
      if (input.toLowerCase().includes('footfall') || input.toLowerCase().includes('aisle')) {
        response = "Currently monitoring 6 zones. Entrance Zone has the highest footfall at 63 people. Aisle 4 (Snacks) has 51 people, while Aisle 5 (Household) has the lowest at 19 people.";
      } else if (input.toLowerCase().includes('shelf') || input.toLowerCase().includes('stock')) {
        response = "Shelf status update: Shelf 4-D is critical at 15% stock and requires immediate attention. Shelves 2-B and 6-F are at low stock levels (45% and 38%). All other shelves are at normal levels.";
      } else if (input.toLowerCase().includes('task')) {
        response = "Current task queue shows 4 active tasks. Top priority: Restock Shelf 4-D and monitor Entrance Zone traffic. Task completion rate is currently at 92%.";
      } else if (input.toLowerCase().includes('efficiency') || input.toLowerCase().includes('kpi')) {
        response = "Store efficiency is at 87%, with a positive trend of +2.5%. Task completion rate is strong at 92% (+5.1%). Average restock time has improved to 12 minutes (-3.2%).";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elevated"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-elevated flex flex-col animate-slide-up">
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about store operations..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatPanel;
