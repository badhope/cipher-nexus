# CIPHER NEXUS 设计系统规范 v2.0

## 🎨 1. 色彩系统

### 1.1 核心色系

#### 主色调
```css
--neon-blue: #00f0ff;      /* 主色 - 科技、加密 */
--neon-purple: #bf00ff;    /* 辅助色 - 神秘、解密 */
--neon-green: #00ff9d;     /* 成功色 - 完成、安全 */
--neon-gold: #ffd700;      /* 强调色 - 重要、警告 */
--neon-red: #ff2a6d;       /* 错误色 - 危险、删除 */
```

#### 背景色系
```css
--void: #05080f;           /* 最深背景 */
--void-light: #0a1020;     /* 次级背景 */
--glass: rgba(10, 16, 32, 0.7);  /* 玻璃态背景 */
```

#### 中性色
```css
--white: #ffffff;
--gray-100: #e0e0e0;       /* 主要文字 */
--gray-400: #9ca3af;       /* 次要文字 */
--gray-500: #6b7280;       /* 提示文字 */
--gray-700: #374151;       /* 边框 */
--gray-800: #1f2937;       /* 深色边框 */
--black: #000000;
```

### 1.2 色彩使用规范

#### 功能色语义
- **neon-blue**: 主要操作、加密模式、活动状态
- **neon-purple**: 解密模式、密码选择、知识内容
- **neon-green**: 成功提示、安全状态、可解密标识
- **neon-gold**: 历史记录、重要提示、可配置标识
- **neon-red**: 错误提示、单向加密、危险操作

#### 渐变规范
```css
/* 主渐变 */
--gradient-primary: linear-gradient(135deg, #00f0ff, #bf00ff);

/* 背景渐变 */
--gradient-bg: linear-gradient(135deg, rgba(10, 16, 32, 0.9) 0%, rgba(5, 8, 15, 0.95) 100%);

/* 卡片渐变 */
--gradient-card: linear-gradient(145deg, rgba(10, 16, 32, 0.6), rgba(5, 8, 15, 0.8));

/* 按钮渐变 */
--gradient-button: linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(191, 0, 255, 0.15));
```

## 📐 2. 间距系统

### 2.1 基础间距单位
基于 4px 基准：
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### 2.2 组件间距规范

#### 卡片内边距
- 小卡片：`padding: 16px` (space-4)
- 中卡片：`padding: 24px` (space-6)
- 大卡片：`padding: 32px` (space-8)

#### 元素间距
- 紧凑：`gap: 8px` (space-2)
- 标准：`gap: 16px` (space-4)
- 宽松：`gap: 24px` (space-6)

## 🔤 3. 字体系统

### 3.1 字体家族
```css
--font-display: 'Orbitron', sans-serif;  /* 标题、强调文字 */
--font-mono: 'JetBrains Mono', monospace; /* 代码、数据 */
--font-body: 'JetBrains Mono', monospace; /* 正文 */
```

### 3.2 字号规范
```css
--text-xs: 0.65rem;   /* 10.4px - 标签 */
--text-sm: 0.875rem;  /* 14px - 辅助文字 */
--text-base: 1rem;    /* 16px - 正文 */
--text-lg: 1.125rem;  /* 18px - 大正文 */
--text-xl: 1.25rem;   /* 20px - 小标题 */
--text-2xl: 1.5rem;   /* 24px - 标题 */
--text-3xl: 1.875rem; /* 30px - 大标题 */
--text-4xl: 2.25rem;  /* 36px - 超大标题 */
--text-5xl: 3rem;     /* 48px - 主标题 */
```

### 3.3 字重规范
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

## 🎭 4. 圆角系统

```css
--radius-sm: 4px;      /* 小元素 */
--radius-md: 8px;      /* 按钮、输入框 */
--radius-lg: 12px;     /* 卡片 */
--radius-xl: 16px;     /* 大卡片 */
--radius-2xl: 20px;    /* 超大卡片 */
--radius-full: 9999px; /* 圆形 */
```

## ✨ 5. 阴影系统

### 5.1 基础阴影
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);
```

### 5.2 发光效果
```css
--glow-blue: 0 0 20px rgba(0, 240, 255, 0.3);
--glow-purple: 0 0 20px rgba(191, 0, 255, 0.3);
--glow-green: 0 0 20px rgba(0, 255, 157, 0.3);
--glow-gold: 0 0 20px rgba(255, 215, 0, 0.3);
--glow-red: 0 0 20px rgba(255, 42, 109, 0.3);
```

### 5.3 玻璃态效果
```css
--glass-effect: 
  backdrop-filter: blur(20px);
  background: rgba(10, 16, 32, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

## 🎬 6. 动画系统

### 6.1 过渡时间
```css
--transition-fast: 0.15s;
--transition-base: 0.3s;
--transition-slow: 0.5s;
--transition-slower: 1s;
```

### 6.2 缓动函数
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 6.3 关键帧动画

#### 脉冲发光
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.6); }
}
```

#### 浮动
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

#### 扫描
```css
@keyframes scan {
  0% { top: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
```

#### 旋转
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### 成功脉冲
```css
@keyframes success-pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
```

#### 错误抖动
```css
@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

## 🧩 7. 组件库

### 7.1 按钮组件

#### 主要按钮
```css
.btn-primary {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(191, 0, 255, 0.15));
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: var(--radius-lg);
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
}
```

#### 次要按钮
```css
.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 8px 16px;
  transition: all 0.3s;
}
```

### 7.2 卡片组件

#### 基础卡片
```css
.card {
  background: var(--gradient-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(0, 240, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 240, 255, 0.15);
}
```

### 7.3 输入框组件

```css
.input {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  font-family: var(--font-mono);
  transition: all 0.3s;
}

.input:focus {
  outline: none;
  border-color: var(--neon-blue);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
}
```

### 7.4 Toast 组件

```css
.toast {
  background: var(--glass-effect);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: 12px 24px;
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.3s;
}

.toast.show {
  transform: translateX(0);
}
```

### 7.5 进度条组件

```css
.progress-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.3s;
}
```

## 🎯 8. 交互模式

### 8.1 悬停效果
- 卡片：上浮 8px + 缩放 1.02 倍 + 发光
- 按钮：上浮 2px + 发光增强
- 导航：背景渐变填充

### 8.2 点击效果
- 按钮：轻微缩放（0.98）
- 反馈：即时响应（<100ms）

### 8.3 加载状态
- 旋转加载器
- 进度条显示
- 骨架屏占位

### 8.4 空状态
- 图标 + 提示文字
- 引导操作按钮

## 📱 9. 响应式规范

### 9.1 断点定义
```css
--breakpoint-sm: 640px;   /* 手机横屏 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 小屏电脑 */
--breakpoint-xl: 1280px;  /* 标准桌面 */
--breakpoint-2xl: 1536px; /* 大屏 */
```

### 9.2 布局适配
- **移动端** (<768px): 单列布局，底部导航
- **平板端** (768px-1024px): 双列布局，顶部导航
- **桌面端** (>1024px): 多列布局，完整导航

## 🎨 10. 主题系统

### 10.1 主题变量
```css
/* 默认主题 - 赛博朋克 */
--theme-bg: #05080f;
--theme-primary: #00f0ff;
--theme-secondary: #bf00ff;

/* 暗色主题 - 深空 */
--theme-bg-dark: #0a0e1a;
--theme-primary-dark: #00d4ff;
--theme-secondary-dark: #9d00ff;

/* 亮色主题 - 极光 */
--theme-bg-light: #f0f4f8;
--theme-primary-light: #0066ff;
--theme-secondary-light: #6600ff;
```

## 📊 11. 数据可视化

### 11.1 图表颜色
```css
--chart-1: #00f0ff;
--chart-2: #bf00ff;
--chart-3: #00ff9d;
--chart-4: #ffd700;
--chart-5: #ff2a6d;
```

### 11.2 统计卡片
- 数值：大号字体 + 主题色
- 标签：小号字体 + 灰色
- 背景：半透明黑色

## ♿ 12. 无障碍规范

### 12.1 对比度要求
- 正文：至少 4.5:1
- 大标题：至少 3:1
- UI 组件：至少 3:1

### 12.2 焦点状态
- 明显的焦点框（2px 实线）
- 焦点色使用主题色
- 键盘导航支持

### 12.3 交互反馈
- 操作响应时间 <100ms
- 加载状态显示
- 错误提示清晰

---

## 版本历史

- **v2.0** (2026-03-06): 初始版本，完整设计系统规范
- **v2.1** (计划): 添加更多组件、暗色/亮色主题支持

## 使用指南

1. **开发时引用**：所有组件和样式应遵循本规范
2. **扩展时参考**：新增功能需保持设计一致性
3. **审查时对照**：UI 审查以本规范为标准

本设计系统持续演进，欢迎贡献建议！
