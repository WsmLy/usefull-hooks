import { useState, useEffect } from 'react';

interface NetworkStatus {
  online: boolean;
  offline: boolean;
  since: Date | null;
  rtt: number | null;
  type: string | null;
  downlink: number | null;
  saveData: boolean | null;
  downlinkMax: number | null;
  effectiveType: string | null;
}

/**
 * 网络状态 Hook
 * 监听网络连接状态变化
 * @returns 网络状态对象
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    offline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
    since: null,
    rtt: null,
    type: null,
    downlink: null,
    saveData: null,
    downlinkMax: null,
    effectiveType: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const updateOnlineStatus = () => {
      setStatus(prev => ({
        ...prev,
        online: navigator.onLine,
        offline: !navigator.onLine,
        since: new Date(),
      }));
    };

    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

      if (connection) {
        setStatus(prev => ({
          ...prev,
          rtt: connection.rtt,
          type: connection.type,
          downlink: connection.downlink,
          saveData: connection.saveData,
          downlinkMax: connection.downlinkMax,
          effectiveType: connection.effectiveType,
        }));
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    // 初始化连接信息
    updateConnectionInfo();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  return status;
}
