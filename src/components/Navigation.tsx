import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded transition-colors ${
          isActive 
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
  return (
    <nav className="space-y-1">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/dashboard">Dashboard</NavItem>
      <NavItem to="/settings">Settings</NavItem>
      {/* Add more navigation items as needed */}
    </nav>
  );
} 