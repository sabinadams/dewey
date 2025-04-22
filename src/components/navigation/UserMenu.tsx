import { useAuth, useUser } from '@clerk/clerk-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch as useAppDispatch } from 'react-redux';
import { setUser } from '@/store/slices/auth.slice';

export default function UserMenu() {
  const { signOut } = useClerk();
  const { userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!userId || !user) return null;

  const handleSignOut = async () => {
    await signOut();
    dispatch(setUser(null));
    navigate('/auth?mode=signin');
  };

  const primaryEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress;

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
              {user.firstName?.[0] || primaryEmail?.[0] || '?'}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-popover border-border">
        <DropdownMenuLabel>
          <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-muted-foreground">{primaryEmail}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={handleSignOut} className="text-foreground focus:bg-accent focus:text-accent-foreground">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 