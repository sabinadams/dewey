import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import * as DeweyLogo from '../assets/dewey.svg';
import { UserMenu } from './UserMenu';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded transition-colors ${isActive
          ? 'bg-zinc-700 text-white'
          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export function Navigation() {
  const { isMac } = useAppSelector(state => state.system);
  return (
    <aside className={`px-4 flex flex-col ${isMac ? 'mt-10' : ''}`}>
      {/* Top Section with Logo */}
      <div className="py-4 flex justify-center">
        <img src={DeweyLogo.default} className="w-12 h-12" alt="Dewey Logo" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center">
        <div className="space-y-2 w-full">
          <NavItem to="/">H</NavItem>
          <NavItem to="/dashboard">D</NavItem>
          <NavItem to="/settings">S</NavItem>
        </div>
      </nav>

      {/* User Menu */}
      <div className="py-4">
        <UserMenu />
      </div>
    </aside>
  );
} 