import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectAuthUser } from '@/store/selectors';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { setUnauthenticated } from '@/store/slices/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';

export default function UserMenu() {
  const user = useAppSelector(selectAuthUser);
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    dispatch(setUnauthenticated());
    navigate('/auth?mode=signin');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-colors p-1">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt="Profile" 
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground text-sm">
              {user.firstName?.[0] || user.email?.[0] || '?'}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-popover border-border">
        <DropdownMenuLabel>
          <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={handleSignOut} className="text-foreground focus:bg-accent focus:text-accent-foreground">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 