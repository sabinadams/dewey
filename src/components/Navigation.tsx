import { NavLink } from 'react-router-dom';
import useOs from '../lib/hooks/useOs';
import * as DeweyLogo from '../assets/dewey.svg';

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
  const { isMac } = useOs();
  return (
    <aside className={`px-4 ${isMac ? 'mt-10' : ''}`}>
      <div className="space-y-6">
        <div className="flex justify-center">
          <img src={DeweyLogo.default} width={50} height={50} alt="Dewey Logo" />
        </div>
        <nav className="space-y-1">
          {/* <NavItem to="/">H</NavItem>
          <NavItem to="/dashboard">D</NavItem>
          <NavItem to="/settings">S</NavItem> */}
        </nav>
      </div>
    </aside>
  );
} 