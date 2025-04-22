import { Window } from '@tauri-apps/api/window';
import { X, Minus, Square } from 'lucide-react';
import { useOS } from '@/hooks/useOS';
import { useEffect } from 'react';

function MacOSControls({ win }: { win: ReturnType<typeof Window.getCurrent> }) {
  return (
    <div className="flex gap-1.5 order-first px-1.5">
      <button 
        onClick={() => win.close()}
        className="w-3 h-3 rounded-full bg-destructive hover:bg-destructive/90"
        title="Close"
      />
      <button 
        onClick={() => win.minimize()}
        className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600"
        title="Minimize"
      />
      <button 
        onClick={() => win.toggleMaximize()}
        className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600"
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
        className="hover:bg-accent p-1.5 rounded text-muted-foreground hover:text-accent-foreground"
        title="Minimize"
      >
        <Minus size={14} />
      </button>
      <button 
        onClick={() => win.toggleMaximize()}
        className="hover:bg-accent p-1.5 rounded text-muted-foreground hover:text-accent-foreground"
        title="Maximize"
      >
        <Square size={14} />
      </button>
      <button 
        onClick={() => win.close()}
        className="hover:bg-destructive p-1.5 rounded text-muted-foreground hover:text-destructive-foreground"
        title="Close"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default function TitleBar() {
  const win = Window.getCurrent();
  const { isMac } = useOS();

  useEffect(() => {
    console.log('TitleBar mounted, isMac:', isMac);
  }, [isMac]);

  return (
    <div 
      data-tauri-drag-region 
      className={`h-10 px-2 flex items-center justify-between select-none w-full z-50 ${
        isMac ? 'absolute top-0 left-0 bg-transparent' : 'bg-sidebar'
      }`}
    >
      {isMac ? <MacOSControls win={win} /> : <WindowsControls win={win} />}
    </div>
  );
}