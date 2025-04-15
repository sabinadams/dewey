import { useEffect, useState } from "react";
import { type as getOSType } from '@tauri-apps/plugin-os';

export default function useOs() {
  const [isMac, setIsMac] = useState(false);
    useEffect(() => {
        const detectOS = async () => {
          const osType = await getOSType();
          setIsMac(osType === 'macos'); // macOS
        };
      
        detectOS();
      }, []);   

    return { isMac };
}