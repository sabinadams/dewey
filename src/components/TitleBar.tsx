import { Window } from '@tauri-apps/api/window';
import { Minus, Square, X } from 'lucide-react';

export function TitleBar() {
  const win = Window.getCurrent();

  return (
    <div data-tauri-drag-region className="titlebar-drag bg-zinc-900 h-10 px-4 flex items-center justify-between text-white">
      <div data-tauri-drag-region className="text-sm font-semibold">🧠 Dewey</div>
      <div className="flex gap-2">
        <button 
          onClick={() => win.minimize()}
          className="hover:bg-zinc-700 p-1 rounded"
          title="Minimize"
        >
          <Minus size={16} />
        </button>
        <button 
          onClick={() => win.toggleMaximize()}
          className="hover:bg-zinc-700 p-1 rounded"
          title="Maximize"
        >
          <Square size={16} />
        </button>
        <button 
          onClick={() => win.close()}
          className="hover:bg-zinc-700 p-1 rounded text-red-500 hover:text-white"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}