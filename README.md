# 🔐 CIPHER NEXUS - 密码枢纽

> 专业的密码学工具平台 | 50+ 加密算法 | 赛博朋克风格

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

## 📌 项目简介

**CIPHER NEXUS（密码枢纽）** 是一个专业的在线密码学工具平台，提供50+种古典密码、现代加密、编码转换和特殊编码功能。采用赛博朋克视觉风格设计，配备丰富的微交互动画，为用户带来沉浸式的使用体验。

## ✨ 核心特性

### 🔐 加密算法
- **古典密码**: 凯撒密码、维吉尼亚密码、栅栏密码、Atbash、Polybius、培根密码、仿射密码等12种
- **现代加密**: AES、DES、3DES、RC4、SM4国密、Rabbit、AES-GCM、ChaCha20等8种
- **编码转换**: Base64、Base32、Base58、Base91、Base100、URL、HTML、Unicode、ASCII、UTF-8、Hex、Octal等14种
- **特殊编码**: 摩斯电码、二进制、猪圈密码、敲击码、ROT47、键盘密码、LeetSpeak等8种
- **工具类**: MD5、SHA-1、SHA-256、SHA-512、RIPEMD、UUID生成等

### 🎨 视觉设计
- 赛博朋克风格（Neon Cyberpunk）
- 玻璃拟态（Glassmorphism）
- 动态粒子背景
- 50+ CSS动画效果
- GSAP平滑过渡动画

### ⚡ 核心功能
- 📝 实时字符计数
- 🔍 自动内容识别
- 🔄 转换链（连续转换）
- 📋 一键复制
- 💾 历史记录（本地存储）
- 📤 导出/导入历史
- 🌗 明暗主题切换
- 📱 完整响应式支持

## 🛠️ 技术栈

### 前端框架
- **HTML5** - 语义化标记
- **CSS3** - 现代布局与动画
- **JavaScript (ES6+)** - 核心逻辑

### 依赖库
| 库 | 用途 |
|---|---|
| Tailwind CSS | 实用优先CSS框架 |
| CryptoJS | 加密解密算法 |
| GSAP | 高级动画引擎 |
| Canvas Confetti | 庆祝动画效果 |
| Typed.js | 打字机效果 |
| Lucide Icons | 图标库 |
| Font Awesome 6 | 图标库 |

### 设计规范
- **字体**: Orbitron (标题) + JetBrains Mono (代码)
- **主色调**: 霓虹蓝 (#00f0ff) + 霓虹紫 (#bf00ff)
- **背景**: 深空黑 (#05080f)
- **间距系统**: 8px 基础倍数

## 📁 项目结构

```
cipher-nexus/
├── index.html              # 主入口页面
├── src/
│   ├── css/
│   │   └── styles.css      # 完整样式表
│   └── js/
│       └── main.js         # 核心逻辑 (1400+ 行)
├── .gitignore
└── LICENSE
```

## 🚀 快速开始

### 本地运行
```bash
# 克隆项目
git clone https://github.com/badhope/cipher-nexus.git

# 进入目录
cd cipher-nexus

# 使用任意HTTP服务器打开
# 方法1: Python
python -m http.server 8000

# 方法2: Node.js
npx serve .

# 方法3: VS Code Live Server
# 右键 index.html -> Open with Live Server
```

### 访问方式
打开浏览器访问: `http://localhost:8000`

## 🎯 使用流程

1. **进入系统** - 点击"进入系统"或按Enter
2. **输入内容** - 在输入框中输入需要转换的文本
3. **选择算法** - 从下拉菜单选择加密/编码类型
4. **设置参数** - 根据需要设置密钥或偏移量
5. **执行转换** - 点击转换按钮
6. **复制结果** - 点击复制按钮或使用Ctrl+C

## 📱 响应式支持

| 设备类型 | 断点 | 适配策略 |
|---------|------|---------|
| 手机 | < 480px | 单列布局，大触摸区域 |
| 平板 | 481-768px | 自适应网格 |
| 桌面 | > 768px | 完整布局 |

## 🔮 未来扩展

### 计划功能
- [ ] 🔄 解密功能支持
- [ ] 📤 API接口开放
- [ ] 📱 PWA离线支持
- [ ] 🌐 多语言支持
- [ ] 👥 用户登录/收藏
- [ ] 📊 转换统计分析
- [ ] 🎮 加密游戏模块

### 扩展方向
1. **移动端App** - React Native / Flutter
2. **桌面应用** - Electron
3. **浏览器插件** - Chrome Extension
4. **后端服务** - Node.js API服务

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 开源协议

本项目基于 MIT 协议开源 - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [CryptoJS](https://github.com/brix/crypto-js) - 加密算法库
- [GSAP](https://greensock.com/gsap/) - 动画引擎
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Font Awesome](https://fontawesome.com/) - 图标库

---

<p align="center">
  <strong>CIPHER NEXUS</strong><br>
  密码枢纽 · 数据核心
</p>
