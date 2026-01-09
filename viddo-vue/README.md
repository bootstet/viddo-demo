# Viddo AI - Vue3 版本

简化的 Vue3 单页应用,包含 Spline 3D 组件。

## 功能特性

- ✨ Vue3 + TypeScript + Vite
- 🎨 主题切换 (6种主题)
- 📱 布局切换 (5种布局)
- 🎬 动画效果
- 📊 数据统计动画
- 🎪 3D Spline 展示

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
viddo-vue/
├── src/
│   ├── App.vue          # 主应用组件(包含所有内容)
│   ├── main.ts          # 入口文件
│   ├── styles/
│   │   └── main.css     # 全局样式
│   └── vite-env.d.ts    # TypeScript 声明
├── index.html           # HTML 模板
├── package.json         # 依赖配置
├── vite.config.ts       # Vite 配置
└── tsconfig.json        # TypeScript 配置
```

## 使用说明

1. 所有内容都在一个 `App.vue` 文件中
2. CSS 样式复用原有的 `styles.css`
3. 使用 Vue3 响应式系统管理状态
4. Spline 3D 通过 iframe 嵌入

## 下一步

如需使用 inspira-ui 的 Spline 组件,需要:
1. 安装 shadcn-vue
2. 安装 @splinetool/runtime
3. 添加 Spline 组件
