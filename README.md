# React Hooks Demo

这是一个展示5个实用自定义 React Hooks 的演示项目。

## 包含的 Hooks

1. **useCopyToClipboard** - 一键复制文本到剪贴板
2. **useDebounce** - 防抖处理，延迟执行搜索等操作
3. **useLocalStorage** - 自动同步状态到 localStorage
4. **useNetworkStatus** - 实时监听网络连接状态
5. **usePermission** - 检查和请求系统权限

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

项目将在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

## 功能说明

### useCopyToClipboard
- 支持一键复制文本到剪贴板
- 提供成功/失败状态反馈
- 自动降级方案（支持旧浏览器）

### useDebounce
- 防抖处理用户输入
- 可配置延迟时间
- 适用于搜索、表单验证等场景

### useLocalStorage
- 自动同步状态到 localStorage
- 支持函数式更新
- 类型安全

### useNetworkStatus
- 实时监听网络连接状态
- 显示网络类型、速度等信息
- 自动检测网络变化

### usePermission
- 检查摄像头、麦克风、定位等权限
- 支持请求权限
- 实时监听权限状态变化

## 技术栈

- React 18
- TypeScript
- Vite

## 项目结构

```
MyHooks/
├── hooks/              # 自定义 Hooks
│   ├── useCopyToClipboard.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useNetworkStatus.ts
│   └── usePermission.ts
├── src/                # 源代码
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 入口文件
│   └── index.css       # 样式文件
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
```
