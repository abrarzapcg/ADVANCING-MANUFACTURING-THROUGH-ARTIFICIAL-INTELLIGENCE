import { NavLink } from "react-router-dom";
import { Activity, Clipboard, Home } from "lucide-react";

const Navigation = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? "bg-white/20 text-primary-foreground font-semibold"
        : "text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
    }`;

  return (
    <nav className="bg-gradient-primary border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1">
          <NavLink to="/" className={linkClasses}>
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/staff-assistant" className={linkClasses}>
            <Clipboard className="h-4 w-4" />
            <span>Staff Assistant</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
