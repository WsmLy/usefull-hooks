import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useDebounce } from '../hooks/useDebounce';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { usePermission } from '../hooks/usePermission';

function App() {
  // useCopyToClipboard Demo
  const { copy, isSuccess, isError, error } = useCopyToClipboard();
  const [copyText, setCopyText] = React.useState('Hello, World!');

  // useDebounce Demo
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // useLocalStorage Demo
  const [name, setName] = useLocalStorage('user-name', '');
  const [email, setEmail] = useLocalStorage('user-email', '');

  // useNetworkStatus Demo
  const networkStatus = useNetworkStatus();

  // usePermission Demo
  const cameraPermission = usePermission('camera');
  const microphonePermission = usePermission('microphone');
  const geolocationPermission = usePermission('geolocation');

  return (
    <div className="container">
      <header className="header">
        <h1>🪝 React Hooks Demo</h1>
        <p>展示5个实用的自定义 React Hooks</p>
      </header>

      <div className="hooks-grid">
        {/* useCopyToClipboard Demo */}
        <div className="hook-card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            useCopyToClipboard
          </h2>
          <p>一键复制文本到剪贴板，支持成功/失败状态</p>
          <div className="hook-demo">
            <div className="input-group">
              <input
                type="text"
                value={copyText}
                onChange={(e) => setCopyText(e.target.value)}
                placeholder="输入要复制的文本"
              />
              <button onClick={() => copy(copyText)}>复制</button>
            </div>
            {isSuccess && (
              <div className="status success">✓ 复制成功！</div>
            )}
            {isError && (
              <div className="status error">✗ 复制失败: {error?.message}</div>
            )}
          </div>
        </div>

        {/* useDebounce Demo */}
        <div className="hook-card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            useDebounce
          </h2>
          <p>防抖处理，延迟执行搜索等操作</p>
          <div className="hook-demo">
            <div className="input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="输入搜索内容"
              />
            </div>
            <div className="status info">
              <div>输入值: {searchTerm}</div>
              <div>防抖值: {debouncedSearchTerm}</div>
              <div>延迟: 500ms</div>
            </div>
          </div>
        </div>

        {/* useLocalStorage Demo */}
        <div className="hook-card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            useLocalStorage
          </h2>
          <p>自动同步状态到 localStorage</p>
          <div className="hook-demo">
            <div className="input-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="输入姓名"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入邮箱"
              />
            </div>
            <div className="status info">
              <div>姓名: {name || '未设置'}</div>
              <div>邮箱: {email || '未设置'}</div>
            </div>
          </div>
        </div>

        {/* useNetworkStatus Demo */}
        <div className="hook-card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
            useNetworkStatus
          </h2>
          <p>实时监听网络连接状态</p>
          <div className="hook-demo">
            <div className={`status ${networkStatus.online ? 'success' : 'error'}`}>
              {networkStatus.online ? '🟢 在线' : '🔴 离线'}
            </div>
            <div className="network-info">
              <div><strong>网络类型:</strong> {networkStatus.type || '未知'}</div>
              <div><strong>下行速度:</strong> {networkStatus.downlink ? `${networkStatus.downlink} Mbps` : '未知'}</div>
              <div><strong>往返时间:</strong> {networkStatus.rtt ? `${networkStatus.rtt} ms` : '未知'}</div>
              <div><strong>省流模式:</strong> {networkStatus.saveData ? '开启' : '关闭'}</div>
              <div><strong>有效类型:</strong> {networkStatus.effectiveType || '未知'}</div>
              <div><strong>最大下行:</strong> {networkStatus.downlinkMax ? `${networkStatus.downlinkMax} Mbps` : '未知'}</div>
            </div>
          </div>
        </div>

        {/* usePermission Demo */}
        <div className="hook-card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            usePermission
          </h2>
          <p>检查和请求系统权限</p>
          <div className="hook-demo">
            <div className="permission-buttons">
              <button onClick={() => cameraPermission.requestPermission()}>
                摄像头权限
              </button>
              <button onClick={() => microphonePermission.requestPermission()}>
                麦克风权限
              </button>
              <button onClick={() => geolocationPermission.requestPermission()}>
                定位权限
              </button>
            </div>
            <div className="permission-status granted">
              <div>摄像头: {cameraPermission.state || '未知'}</div>
              <div>麦克风: {microphonePermission.state || '未知'}</div>
              <div>定位: {geolocationPermission.state || '未知'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
