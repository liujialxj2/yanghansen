# 杨瀚森官方网站 | Hansen Yang Official Website

## 项目概述

本项目是NBA球员杨瀚森的官方双语个人网站，采用混合式内容管理策略，结合静态页面的高性能和动态内容的灵活性：

- **架构**：混合式内容管理（静态页面 + 动态CMS）
- **后端**：ApostropheCMS用于动态内容管理
- **前端**：Astro前端框架构建静态与动态页面
- **样式**：Bulma CSS框架
- **数据库**：MongoDB（仅用于动态内容）
- **国际化**：支持中英文双语内容

## 混合式内容策略

本项目采用混合式内容管理方案，将内容分为两类：

### 静态实现（更高性能）
- **首页**：主要布局和设计元素
- **关于页面**：个人简介、成长经历
- **职业生涯页面**：基础布局和数据展示（数据来自JSON文件）

### CMS管理（更灵活）
- **新闻文章**：完整的文章管理、分类、筛选
- **视频中心**：视频内容管理和分类
- **媒体库**：图片管理
- **粉丝壁纸**：可下载壁纸资源管理

## 目录结构

```
project_yanghansen/
├── backend/                # ApostropheCMS内容管理系统
│   ├── modules/            # 系统与自定义模块
│   └── public/             # 静态资源
├── frontend/               # Astro前端应用
│   ├── public/             # 静态资源
│   │   ├── data/           # 静态JSON数据文件
│   │   └── locales/        # 翻译文件
│   └── src/                # 源代码目录
│       ├── components/     # 可复用组件
│       ├── layouts/        # 页面布局
│       ├── lib/            # 工具函数
│       ├── pages/          # 页面
│       ├── styles/         # 样式文件
│       ├── templates/      # 页面模板
│       └── widgets/        # 组件映射
├── Design/                 # 设计资源与文档
└── docs/                   # 项目文档
```

## 开发环境设置

### 前提条件

- Node.js 18+
- MongoDB 6.0+
- Git

### 安装步骤

1. 克隆项目仓库：
   ```bash
   git clone https://github.com/yourusername/hansen-yang-website.git
   cd hansen-yang-website
   ```

2. 安装后端依赖并启动（用于动态内容管理）：
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. 安装前端依赖并启动：
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. 访问开发环境：
   - 前端：http://localhost:4321
   - CMS管理界面：http://localhost:3000/apos/login

## 主要功能

### 静态页面功能
- 响应式英雄区域与首页展示
- 个人简介与成长历程
- 职业统计数据可视化（数据源：JSON文件）
- 球员资料与荣誉展示

### 动态管理功能
- 新闻文章发布、分类、筛选
- 视频内容管理与播放
- 图片库管理
- 粉丝壁纸下载区管理
- 完整的多语言支持

## 内容更新流程

### 静态内容更新
- 职业数据：更新 `frontend/public/data/` 目录中的JSON文件
- 页面结构和设计：修改相应的Astro组件文件

### 动态内容更新
- 通过CMS后台界面添加/编辑内容：http://localhost:3000/apos/login
- 支持富文本编辑、媒体管理和多语言切换

## 环境变量配置

前端环境变量（`frontend/.env`）：
```
PORT=4321
APOS_HOST="http://localhost:3000"
PUBLIC_DEV_MODE=true
PUBLIC_LOG_LEVEL="debug"
PUBLIC_LOCALE="zh"
```

后端环境变量（`backend/.env`）：
```
APOS_MONGODB_URI=mongodb://127.0.0.1:27017/hansenyang
NODE_ENV=development
PORT=3000
LANG=zh
APOS_SESSION_SECRET=hansenyangwebsite
APOS_API_KEY=dev_api_key_hansenyangwebsite
```

## 开发规范

1. **Git提交规范**
   - feat: 新功能
   - fix: 修复bug
   - docs: 文档更新
   - style: 代码格式调整
   - refactor: 重构
   - test: 测试
   - chore: 构建过程或辅助工具的变动

2. **命名规范**
   - 组件: PascalCase (如 `HeroSection.astro`)
   - 文件与函数: camelCase (如 `getAttachmentUrl.js`)
   - CSS类名: kebab-case (如 `hero-section`)

3. **多语言开发**
   - 所有用户可见的文本必须通过i18n系统，不要硬编码
   - 翻译文件位于 `frontend/public/locales/{zh,en}/translation.json`

## 部署流程

详见 [部署指南](docs/deployment.md)

## 相关资源

- [ApostropheCMS文档](https://docs.apostrophecms.org/)
- [Astro文档](https://docs.astro.build/)
- [ApostropheCMS与Astro集成指南](https://docs.astro.build/en/guides/cms/apostrophecms/)
- [开发指南](Design/develop%20guide.md)

## 贡献指南

详见 [贡献指南](docs/CONTRIBUTING.md)

## 许可证

本项目为杨瀚森官方网站，版权所有。
