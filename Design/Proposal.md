# 杨瀚森官方双语个人资讯网站 | Hansen Yang Official Bilingual Website

一个基于Astro、Bulma CSS和ApostropheCMS构建的现代化、响应式双语（中/英）官方网站，专为NBA球员杨瀚森（Hansen Yang）设计。网站采用暗色主题，突出杨瀚森的个人品牌和职业生涯亮点。

## 项目结构 | Project Structure

项目由两个主要部分组成：

1. **后端CMS** - 基于ApostropheCMS构建的内容管理系统
2. **前端网站** - 基于Astro构建的客户端应用程序

## 技术栈 | Technology Stack

- **前端框架**: Astro
- **样式解决方案**: Bulma CSS
- **内容管理**: ApostropheCMS
- **动画**: CSS和Astro内置转场
- **国际化**: Astro内置i18n
- **图标**: Iconify/其他兼容图标库

## 如何安装和运行 | Installation and Setup

### 基础设置

1. 安装依赖:

```bash
npm install
```

2. 配置环境变量:

```bash
export APOS_EXTERNAL_FRONT_KEY=your_secret_key
```

3. 运行开发服务器:

```bash
# 启动后端CMS
cd backend
npm run dev

# 启动前端网站
cd frontend
npm run dev
```

4. 加载初始内容:

```bash
npm run load-starter-content
```

5. 或创建管理员账户:

```bash
cd backend
node app @apostrophecms/user:add admin admin
```

6. 构建生产版本:

```bash
# 构建前端
cd frontend
npm run build

# 预览构建结果
npm run preview
```

## 内容结构 | Content Structure

CMS包含以下主要内容类型：

- **个人信息 (Personal Info)**: 基本个人资料
- **关于页面 (About Page)**: 个人传记、成长故事等
- **职业生涯 (Career)**: 时间线、数据统计、奖项和球探报告
- **新闻 (News)**: 新闻文章和公告
- **媒体 (Media)**: 视频、图片库、新闻稿
- **粉丝内容 (Fan Content)**: 粉丝活动、粉丝作品、壁纸等
- **联系信息 (Contact Info)**: 联系方式和社交媒体链接

## 国际化 | Internationalization

网站支持中文和英文，所有内容都可以通过CMS以两种语言进行管理。访问者可以通过页面顶部的语言切换器在两种语言之间切换。

## 自定义与扩展 | Customization & Expansion

- 所有网站风格可以通过Bulma变量进行定制
- 可以在ApostropheCMS中添加新的内容类型和字段
- 可以根据需要添加更多语言支持

## 部署 | Deployment

### 使用Apostrophe托管

Apostrophe可为ApostropheCMS-Astro项目提供简单的托管方案:

1. 自动处理数据库配置和管理
2. 资产存储和交付
3. SSL证书管理
4. 自动备份
5. 安全更新

### 使用第三方托管

第三方托管通常需要为ApostropheCMS和Astro部分设置独立服务器:

#### 后端部署

后端ApostropheCMS需要:
- Node.js环境(v18或更高版本)
- MongoDB数据库
- 资产存储解决方案

环境变量配置:
```
NODE_ENV=production
APOS_MONGODB_URI=YOUR_mongodb_connection_string
APOS_EXTERNAL_FRONT_KEY=a_random_string
```

#### 前端部署

Astro前端可部署在支持SSR的静态托管服务上:
- Netlify
- Vercel
- Cloudflare Pages

示例(Netlify):
- 基础目录: frontend
- 构建命令: npm run build
- 发布目录: frontend/dist
- 环境变量: APOS_EXTERNAL_FRONT_KEY=与后端相同的字符串

## 组件系统

网站利用Apollo模板提供的丰富组件系统:

### 布局组件
- rows-widget: 响应式行列布局
- grid-layout-widget: CSS网格布局

### 内容组件
- hero-widget: 英雄区块(支持色彩渐变、图片或视频背景)
- slideshow-widget: 轮播图
- accordion-widget: 手风琴折叠面板
- card-widget: 卡片组件
- link-widget: 链接/按钮组件

这些组件将用于构建杨瀚森网站的各个页面和功能区块。 