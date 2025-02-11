# 数字矩阵雨效果 - React 实现

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

一个基于 React 实现的《黑客帝国》风格数字雨动画效果组件,包含以下特性:

## ✨ 功能特性

- 自动适配容器尺寸的流动矩阵效果
- 可配置的动画速度(快/慢模式)
- 随机生成的十六进制字符流
- 渐隐效果实现数字轨迹
- 响应式设计适配不同屏幕尺寸
- 自定义 CSS 变量支持主题颜色调整

## 🚀 快速开始

### 前置要求
- Node.js 16+
- npm 8+

### 安装步骤
```bash
git clone https://github.com/your-repo/matrix-digital-rain.git
cd matrix-digital-rain
npm install
```

### 启动开发服务器
```bash
npm start
```

### 生产构建
```bash
npm run build
```

## 🛠 技术栈
- React 18
- CSS3 动画
- CSS 自定义属性(变量)
- ES6 语法

## 🎨 样式配置
通过修改 `src/DigitalRain.css` 中的 CSS 变量自定义效果:
```css
:root {
  --matrix-green: #20c20e;  /* 矩阵绿色 */
  --background: rgba(0, 0, 0, 0.8);  /* 背景色 */
  --animation-speed: 0.6s;  /* 基础动画速度 */
}
```

## 📄 使用示例
```jsx
import DigitalRain from './DigitalRain';

function App() {
  return (
    <div className="app-container">
      <DigitalRain speed="fast" />
    </div>
  );
}
```

## 📜 开源协议
本项目采用 [MIT 许可证](LICENSE)