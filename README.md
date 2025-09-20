# AI+ 应用人才培训体系前端平台

一个基于 React + TypeScript + Vite 构建的现代化 AI 人才培训平台，提供个性化学习路径、AI 能力地图、进度跟踪等功能。

## ✨ 功能特性

### 🎯 核心功能
- **个性化学习路径引擎** - 基于用户角色、经验和目标生成定制化学习计划
- **AI 能力地图** - 可视化展示 AI 技能体系和发展路径
- **九段高手课程体系** - 从入门到专家的渐进式学习体系
- **实时进度跟踪** - 详细的学习进度和成就系统
- **多角色支持** - 支持学生、开发者、产品经理、企业管理者等不同角色

### 📝 内容管理
- **富文本文章编辑器** - 支持 Markdown、图片插入、代码高亮等功能
- **媒体文件上传** - 支持视频、音频、图片等多媒体内容上传
- **文章分类管理** - 支持标签、分类、搜索等内容组织功能
- **版本控制** - 文章草稿、发布、修订历史管理

### 🚀 性能优化
- **组件懒加载** - 基于路由和可见性的智能加载策略
- **虚拟滚动** - 大列表性能优化
- **缓存机制** - 智能数据缓存和状态管理
- **错误边界** - 全局错误处理和用户友好的错误提示

## 🛠️ 技术栈

### 前端框架
- **React 18** - 现代化 React 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 快速的构建工具和开发服务器

### UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 现代化图标库
- **React Router** - 客户端路由管理

### 状态管理
- **React Context** - 全局状态管理
- **Custom Hooks** - 可复用的状态逻辑

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 静态类型检查

## 📁 项目结构

```
src/
├── components/           # 可复用组件
│   ├── ErrorBoundary.tsx       # 全局错误边界
│   ├── MediaUpload.tsx          # 媒体文件上传
│   ├── ArticleEditor.tsx        # 文章编辑器
│   ├── LazyComponents.tsx       # 懒加载组件包装器
│   ├── OptimizedComponents.tsx  # 性能优化组件
│   ├── PathRecommendationEngine.tsx  # 路径推荐引擎
│   ├── FormSteps.tsx           # 表单步骤组件
│   ├── LearningPathEngine.tsx  # 学习路径引擎
│   ├── AICapabilityMap.tsx     # AI能力地图
│   └── Sidebar.tsx             # 侧边栏导航
├── pages/               # 页面组件
│   ├── Dashboard.tsx           # 仪表板
│   ├── LearningPaths.tsx       # 学习路径
│   ├── AICapabilities.tsx      # AI能力
│   ├── Progress.tsx            # 进度跟踪
│   ├── Settings.tsx            # 设置页面
│   └── Home.tsx               # 首页
├── services/            # API 服务层
│   └── api.ts                  # 统一API接口
├── hooks/               # 自定义 Hooks
│   └── usePerformance.ts       # 性能优化相关hooks
├── contexts/            # React Context
│   └── authContext.tsx         # 认证上下文
├── types/               # TypeScript 类型定义
└── utils/               # 工具函数
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产构建
```bash
npm run preview
# 或
yarn preview
```

## 📋 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行 ESLint 检查
- `npm run lint:fix` - 自动修复 ESLint 问题

## 🎨 组件使用示例

### 媒体文件上传
```tsx
import { MediaUpload } from './components/MediaUpload';

<MediaUpload
  accept="video/*,audio/*,image/*"
  maxSize={100 * 1024 * 1024} // 100MB
  onUpload={(files) => console.log('上传文件:', files)}
  onError={(error) => console.error('上传错误:', error)}
/>
```

### 文章编辑器
```tsx
import { ArticleEditor } from './components/ArticleEditor';

<ArticleEditor
  initialContent=""
  onSave={(article) => console.log('保存文章:', article)}
  onPublish={(article) => console.log('发布文章:', article)}
/>
```

### 懒加载组件
```tsx
import { LazyLearningPathEngine } from './components/LazyComponents';

<LazyLearningPathEngine />
```

## 🔧 配置说明

### Vite 配置
项目使用 Vite 作为构建工具，配置文件为 `vite.config.ts`：
- 路径别名配置 (`@` 指向 `src` 目录)
- React 插件集成
- 开发服务器配置

### TypeScript 配置
严格的 TypeScript 配置 (`tsconfig.json`)：
- 严格模式启用
- 路径映射配置
- 现代 ES 模块支持

### Tailwind CSS 配置
响应式设计和主题配置 (`tailwind.config.js`)：
- 自定义颜色主题
- 响应式断点
- 组件样式扩展

## 🌟 核心特性详解

### 学习路径引擎
- 基于用户画像的智能推荐算法
- 支持多种学习目标和行业背景
- 动态调整学习计划和难度

### AI 能力地图
- 可视化技能树展示
- 技能依赖关系图谱
- 个人能力评估和建议

### 性能优化策略
- 组件级别的懒加载和代码分割
- 虚拟滚动处理大数据列表
- 智能缓存和状态管理
- 防抖和节流优化用户交互

## 🔒 安全特性

- XSS 防护
- CSRF 保护
- 安全的文件上传验证
- 用户认证和授权机制

## 📱 响应式设计

- 移动端优先的设计理念
- 多设备适配 (手机、平板、桌面)
- 触摸友好的交互设计

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师。

## 📞 联系我们

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件
- 加入我们的社区讨论

---

**让 AI 学习更简单，让成长更高效！** 🚀

项目编号: 7548085971502317870

本项目是由 [网站开发专家](https://space.coze.cn/) 创建.

[**项目地址**](https://space.coze.cn/task/7548085971502317870)

## 本地开发

### 环境准备

- 安装 [Node.js](https://nodejs.org/en)
- 安装 [pnpm](https://pnpm.io/installation)

### 操作步骤

- 安装依赖

```sh
pnpm install
```

- 启动 Dev Server

```sh
pnpm run dev
```

- 在浏览器访问 http://localhost:3000
