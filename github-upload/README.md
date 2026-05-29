# 微信小程序电商 UI 套件

一个基于 React + TypeScript + Vite 构建的微信小程序电商界面组件库。

## ✨ 特性

- 🎨 现代化的 UI 设计
- ⚡ 基于 Vite 构建，开发体验极佳
- 📱 响应式设计，适配各种屏幕尺寸
- 🛠️ TypeScript 支持，类型安全
- 🎯 微信小程序风格界面

## 🚀 快速开始

### 本地运行

**前置要求：** Node.js

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中打开 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📦 项目结构

```
├── src/
│   ├── components/     # 组件目录
│   │   ├── PageRenderer.tsx
│   │   ├── ProductImage.tsx
│   │   └── WeChatFrame.tsx
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 应用入口
│   ├── data.ts         # 数据文件
│   ├── types.ts        # 类型定义
│   └── index.css       # 全局样式
├── dist/               # 构建输出目录
├── index.html          # HTML 模板
├── package.json        # 项目配置
└── vite.config.ts      # Vite 配置
```

## 🛠️ 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - CSS 框架
- **Lucide React** - 图标库

## 📄 许可证

MIT License
