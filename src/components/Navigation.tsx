import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import * as DeweyLogo from '@/assets/dewey.svg';
import { UserMenu } from '@/components/UserMenu';
import { Separator } from "@/components/ui/separator"
import { Home, LayoutDashboard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
          "hover:bg-zinc-800 hover:text-white",
          "data-[state=active]:bg-zinc-700 data-[state=active]:text-white",
          isActive ? "bg-zinc-700 text-white" : "text-zinc-300"
        )
      }
      title={label}
    >
      {icon}
    </NavLink>
  );
}

export function Navigation() {
  const { isMac } = useAppSelector(state => state.system);
  return (
    <aside className={`p-4 pt-0 flex flex-col ${isMac ? 'mt-10' : ''}`}>
      {/* Top Section with Logo */}
      <div className="flex justify-center mb-4">
        <img src={DeweyLogo.default} className="w-12 h-12" alt="Dewey Logo" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col">
        <div className="flex flex-col items-center space-y-2">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </div>
      </nav>

      {/* User Menu */}
      <div className="flex justify-center mb-3">
        <UserMenu />
      </div>
    </aside>
  );
} 