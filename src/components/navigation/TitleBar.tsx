import { appWindow } from '@tauri-apps/api/window';
import { useDetectOSQuery } from '@/store/api/system.api';

export default function TitleBar() {
  const { data: osInfo } = useDetectOSQuery();
  const isMac = osInfo?.isMac ?? false;

  if (!isMac) {
    return null;
  }

  return (
    <div
      data-tauri-drag-region
      className="fixed top-0 left-0 right-0 h-10 bg-background"
    />
  );
}