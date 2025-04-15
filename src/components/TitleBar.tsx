import { Window } from '@tauri-apps/api/window';
import { Minus, Square, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TitleBar() {
  const win = Window.getCurrent();
  const [isMacOS, setIsMacOS] = useState(false);

  useEffect(() => {
    // Check if we're on macOS
    if (navigator.platform.toLowerCase().includes('mac')) {
      setIsMacOS(true);
    }
  }, []);

  return (
    <div 
      data-tauri-drag-region 
      className={`h-10 px-4 flex items-center justify-between select-none ${
        isMacOS ? 'bg-transparent' : 'bg-zinc-900'
      }`}
    >
      <div data-tauri-drag-region className="text-sm font-semibold text-white">
        🧠 Dewey
      </div>
      <div className={`flex gap-1.5 ${isMacOS ? 'order-first pl-2' : ''}`}>
        {isMacOS ? (
          <>
            <button 
              onClick={() => win.close()}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
              title="Close"
            />
            <button 
              onClick={() => win.minimize()}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
              title="Minimize"
            />
            <button 
              onClick={() => win.toggleMaximize()}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"
              title="Maximize"
            />
          </>
        ) : (
          <>
            <button 
              onClick={() => win.minimize()}
              className="hover:bg-zinc-700 p-1.5 rounded text-gray-400 hover:text-white"
              title="Minimize"
            >
              <Minus size={14} />
            </button>
            <button 
              onClick={() => win.toggleMaximize()}
              className="hover:bg-zinc-700 p-1.5 rounded text-gray-400 hover:text-white"
              title="Maximize"
            >
              <Square size={14} />
            </button>
            <button 
              onClick={() => win.close()}
              className="hover:bg-red-500 p-1.5 rounded text-gray-400 hover:text-white"
              title="Close"
            >
              <X size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}