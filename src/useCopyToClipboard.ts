import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * 复制到剪贴板 Hook
 * 支持一键复制文本，带成功/失败状态
 * @returns { copy, isSuccess, isError, error } - 复制函数和状态
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    setIsSuccess(false);
    setIsError(false);
    setError(null);

    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        // 降级方案：使用 document.execCommand
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error('Failed to copy text');
        }

        setIsSuccess(true);
        return true;
      }

      // 使用 Clipboard API
      await navigator.clipboard.writeText(text);
      setIsSuccess(true);
      return true;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Failed to copy text');
      setError(errorObj);
      setIsError(true);
      return false;
    }
  }, []);

  return { copy, isSuccess, isError, error };
}
