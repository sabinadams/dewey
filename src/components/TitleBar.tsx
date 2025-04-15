import { Window } from '@tauri-apps/api/window';
import { Minus, Square, X } from 'lucide-react';
import { useState } from 'react';
import useOs from '../lib/hooks/useOs';
function MacOSControls({ win }: { win: ReturnType<typeof Window.getCurrent> }) {
  return (
    <div className="flex gap-1.5 order-first px-1.5">
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
    </div>
  );
}

function WindowsControls({ win }: { win: ReturnType<typeof Window.getCurrent> }) {
  return (
    <div className="flex gap-1.5">
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
    </div>
  );
}

export function TitleBar() {
  const win = Window.getCurrent();
  const { isMac } = useOs();

  return (
    <div 
      data-tauri-drag-region 
      className={`h-10 px-2 flex items-center justify-between select-none ${
        isMac ? 'bg-transparent absolute top-0 left-0' : 'bg-zinc-900 w-full'
      }`}
    >
      {isMac ? <MacOSControls win={win} /> : <WindowsControls win={win} />}
    </div>
  );
}