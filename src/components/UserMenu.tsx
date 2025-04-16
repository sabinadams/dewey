import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { setUnauthenticated } from '../store/slices/authSlice';

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
    <div className="relative group">
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

      <div className="absolute bottom-full left-0 mb-2 w-48 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 