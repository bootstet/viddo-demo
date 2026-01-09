# Viddo AI Clone

这是一个基于 [viddo.ai](https://viddo.ai/) 原网站创建的克隆版本，实现了相同的视觉效果和动画交互。

## 🎨 特性

### 动画效果
- ✨ **页面加载动画** - 平滑的淡入效果
- 🎬 **Hero区域视频背景** - 全屏背景视频与渐变叠加
- 📱 **导航栏滚动效果** - 滚动时背景渐变和阴影效果
- 🎭 **渐入动画** - 标题、副标题和按钮的逐层淡入
- 🎪 **模型轮播** - 无限循环的水平滚动展示
- 👁️ **滚动触发动画** - 元素进入视窗时的淡入效果
- 🔢 **数字计数动画** - 统计数据的动态增长效果
- ✨ **按钮点击涟漪效果** - Material Design风格的涟漪动画
- 🎯 **卡片悬停效果** - 3D倾斜和光泽扫过效果
- 🌊 **视差滚动效果** - Hero区域的深度滚动体验
- 🎨 **渐变背景** - 多彩的渐变色使用
- 🌈 **彩蛋** - Konami代码触发的彩虹效果

### 响应式设计
- 📱 移动端适配
- 💻 平板适配
- 🖥️ 桌面端优化

### 交互特性
- 🖱️ 平滑滚动导航
- ⏸️ 鼠标悬停暂停轮播
- 🎯 IntersectionObserver API优化性能
- 🎨 动态样式调整

## 📁 文件结构

```
viddo/
├── index.html      # 主HTML文件
├── styles.css      # 样式表和动画定义
├── script.js       # JavaScript交互和动画逻辑
└── README.md       # 项目说明文档
```

## 🚀 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器运行：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server

# PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

## 🎯 主要动画实现

### 1. 淡入动画 (Fade In Up)
```css
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 2. 轮播滚动动画
```css
@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
```

### 3. 计数器动画
使用 JavaScript 实现数字从 0 到目标值的平滑增长。

### 4. 视差效果
根据滚动位置动态调整元素的 transform 和 opacity。

### 5. 3D卡片倾斜
根据鼠标位置计算旋转角度，创造 3D 悬浮效果。

## 🎨 颜色主题

```css
--primary-color: #6366f1     /* 主色调 - 靛蓝色 */
--secondary-color: #8b5cf6   /* 次要色 - 紫色 */
--bg-dark: #0f0f1e           /* 深色背景 */
--bg-darker: #0a0a14         /* 更深色背景 */
--text-primary: #ffffff      /* 主文本颜色 */
--text-secondary: #a8a8b8    /* 次要文本颜色 */
```

## 🌟 核心技术

- **HTML5** - 语义化标签
- **CSS3** - Flexbox、Grid、动画、渐变
- **JavaScript (ES6+)** - 现代JavaScript特性
- **IntersectionObserver API** - 性能优化的滚动监听
- **CSS Variables** - 主题颜色管理
- **Backdrop Filter** - 毛玻璃效果

## 📱 响应式断点

- **桌面端**: > 768px
- **平板**: 768px - 480px
- **移动端**: < 480px

## 🎭 动画时序

- 导航栏: 0.5s
- Hero标题: 0.8s
- Hero副标题: 1.0s (延迟 0.2s)
- Hero徽章: 1.2s (延迟 0.4s)
- Hero按钮: 1.4s (延迟 0.6s)
- Hero描述: 1.6s (延迟 0.8s)
- 模型轮播: 2.0s (延迟 1.0s)

## 🔧 自定义

### 修改颜色主题
编辑 `styles.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### 修改动画速度
调整动画持续时间：

```css
animation: fadeInUp 0.8s ease-out forwards;
```

### 添加新内容
在 `index.html` 中添加新的 section，并在相应元素上添加 `.scroll-fade` 类以启用滚动动画。

## 🌐 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE 11 (部分特性不支持)

## 📝 注意事项

- 视频背景使用了 viddo.ai 的 CDN 资源
- 如需离线使用，请下载视频文件并修改路径
- 部分动画效果可能在低性能设备上影响流畅度
- 建议在现代浏览器中查看以获得最佳体验

## 🎉 额外功能

- 🎮 **Konami 代码**: 输入 ↑↑↓↓←→←→BA 触发彩虹效果
- 🖱️ **鼠标悬停**: 卡片和按钮有丰富的悬停交互
- 📊 **控制台信息**: 打开浏览器控制台查看彩色日志

## 📄 许可

本项目仅用于学习和演示目的。原网站版权归 viddo.ai 所有。

## 👨‍💻 开发信息

- 开发时间: 2025
- 技术栈: HTML5 + CSS3 + Vanilla JavaScript
- 设计灵感: viddo.ai

---

**享受探索这个动画丰富的网站吧！** ✨
