import { useAppSelector, useAppDispatch } from '@/store/hooks';
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
} from "@/components/ui/dropdown-menu"

export function UserMenu() {
  const { user } = useAppSelector(state => state.auth);
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
        <button className="block w-10 h-10 rounded-lg hover:bg-zinc-800 transition-colors p-1">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt="Profile" 
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-zinc-700 flex items-center justify-center text-white text-sm">
              {user.firstName?.[0] || user.email?.[0] || '?'}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-zinc-50 border-zinc-200">
        <DropdownMenuLabel>
          <p className="font-medium text-zinc-900">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-200" />
        <DropdownMenuItem onClick={handleSignOut} className="text-zinc-700 focus:bg-zinc-100 focus:text-zinc-900">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 