import { useState, useEffect } from 'react';

type PermissionName = 'camera' | 'geolocation' | 'microphone';

type PermissionState = 'granted' | 'denied' | 'prompt' | null;

interface UsePermissionReturn {
  state: PermissionState;
  requestPermission: () => Promise<PermissionState>;
}

/**
 * 权限检查 Hook
 * 用于检查摄像头、定位等权限状态
 * @param permissionName 权限名称：'camera' | 'geolocation' | 'microphone'
 * @returns { state, requestPermission } - 权限状态和请求权限的函数
 */
export function usePermission(permissionName: PermissionName): UsePermissionReturn {
  const [state, setState] = useState<PermissionState>(null);

  useEffect(() => {
    let mounted = true;

    const checkPermission = async () => {
      try {
        if (typeof navigator === 'undefined' || !navigator.permissions) {
          setState(null);
          return;
        }

        const permission = await navigator.permissions.query({
          name: permissionName as PermissionName
        });

        if (mounted) {
          setState(permission.state as PermissionState);
        }

        const listener = () => {
          if (mounted) {
            setState(permission.state as PermissionState);
          }
        };

        permission.addEventListener('change', listener);

        return () => {
          permission.removeEventListener('change', listener);
        };
      } catch (error) {
        console.error(`Error checking ${permissionName} permission:`, error);
        if (mounted) {
          setState(null);
        }
      }
    };

    checkPermission();

    return () => {
      mounted = false;
    };
  }, [permissionName]);

  const requestPermission = async (): Promise<PermissionState> => {
    try {
      let result: PermissionState;

      switch (permissionName) {
        case 'camera':
        case 'microphone':
          const stream = await navigator.mediaDevices.getUserMedia({
            video: permissionName === 'camera',
            audio: permissionName === 'microphone'
          });
          stream.getTracks().forEach(track => track.stop());
          result = 'granted';
          break;
        case 'geolocation':
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              () => resolve(undefined),
              (error) => reject(error)
            );
          });
          result = 'granted';
          break;
        default:
          result = null;
      }

      setState(result);
      return result;
    } catch (error) {
      console.error(`Error requesting ${permissionName} permission:`, error);
      const deniedState: PermissionState = 'denied';
      setState(deniedState);
      return deniedState;
    }
  };

  return { state, requestPermission };
}
