# Apollo模板迁移指南

## 概述

本指南详细说明如何将现有杨瀚森官方网站项目迁移到官方Apollo模板。迁移的主要目标是解决当前项目中的技术问题，包括ApostropheCMS与Astro集成中的模块系统冲突、API通信失败和翻译占位符问题。

## 前提条件

- Node.js v18或更高版本
- MongoDB v6.0或更高版本
- Git

## 项目架构对比

### 当前架构
```
项目根目录
├── backend/            # ApostropheCMS后端
│   ├── app.js          # 后端入口文件
│   └── modules/        # 内容模型定义
├── frontend/           # Astro前端
│   ├── src/            # 源代码
│   ├── astro.config.mjs # Astro配置
│   └── package.json    # 依赖配置
└── dev-server.js       # 开发服务器管理脚本
```

### Apollo模板架构
```
项目根目录
├── modules/            # 内容模型定义
├── src/                # Astro前端源代码
├── app.js              # ApostropheCMS入口文件
├── astro.config.mjs    # Astro配置
└── package.json        # 统一依赖管理
```

## 迁移步骤

### 1. 环境准备

1. 克隆官方Apollo模板
   ```bash
   git clone https://github.com/apostrophecms/apollo apollo-project
   cd apollo-project
   npm install
   ```

2. 配置环境变量
   ```bash
   export APOS_EXTERNAL_FRONT_KEY=hansen-website-key
   ```

3. 创建管理员账户
   ```bash
   node app @apostrophecms/user:add admin admin
   ```

### 2. 内容模型迁移

将当前项目中的内容模型定义迁移到Apollo模板中：

1. **页面类型(Page Types)迁移**
   
   对于每个页面类型，需要从`backend/modules/`目录复制到Apollo项目的`modules/`目录，并进行必要的调整：
   
   例如，迁移首页模型：
   ```javascript
   // modules/home-page/index.js
   module.exports = {
     extend: '@apostrophecms/page-type',
     options: {
       label: 'Home Page'
     },
     fields: {
       add: {
         // 原有字段定义
       }
     }
   };
   ```

2. **内容片段类型(Piece Types)迁移**

   类似地，迁移所有内容片段类型：
   
   ```javascript
   // modules/article-piece/index.js
   module.exports = {
     extend: '@apostrophecms/piece-type',
     options: {
       label: 'Article'
     },
     fields: {
       add: {
         // 原有字段定义
       }
     }
   };
   ```

3. **组件类型(Widget Types)迁移**

   迁移所有组件类型：
   
   ```javascript
   // modules/hero-widget/index.js
   module.exports = {
     extend: '@apostrophecms/widget-type',
     options: {
       label: 'Hero Section'
     },
     fields: {
       add: {
         // 原有字段定义
       }
     }
   };
   ```

### 3. 前端模板迁移

1. **页面模板迁移**
   
   Apollo模板使用Astro组件作为页面模板。将现有Astro组件迁移到Apollo项目的`src/pages/`目录：
   
   ```javascript
   // src/pages/index.astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   import { getAposCMSData } from '../lib/api';

   const page = await getAposCMSData('home-page');
   ---

   <BaseLayout title={page.title}>
     <!-- 页面内容 -->
   </BaseLayout>
   ```

2. **组件迁移**
   
   将所有组件迁移到Apollo项目的`src/components/`目录：
   
   ```javascript
   // src/components/Hero.astro
   ---
   const { data } = Astro.props;
   ---

   <section class="hero">
     <!-- 组件内容 -->
   </section>
   ```

3. **样式文件迁移**
   
   将SCSS文件迁移到Apollo项目的`src/styles/`目录：
   
   ```scss
   // src/styles/main.scss
   @use 'bulma/sass/utilities/initial-variables' as * with (
     $primary: #E03A3E,
     $dark: #101010,
     // 其他变量
   );
   ```

### 4. 多语言支持迁移

1. **ApostropheCMS多语言配置**
   
   在Apollo项目中配置ApostropheCMS的多语言支持：
   
   ```javascript
   // modules/apostrophecms-i18n/index.js
   module.exports = {
     options: {
       defaultLocale: 'zh',
       locales: ['zh', 'en']
     }
   };
   ```

2. **Astro i18n配置**
   
   在Apollo项目的`astro.config.mjs`中配置多语言支持：
   
   ```javascript
   // astro.config.mjs
   export default defineConfig({
     i18n: {
       defaultLocale: 'zh',
       locales: ['zh', 'en'],
       routing: {
         prefixDefaultLocale: false
       }
     }
   });
   ```

3. **翻译文件迁移**
   
   将翻译文件迁移到Apollo项目的适当位置。

### 5. API集成

使用Apollo模板推荐的API集成方式：

```javascript
// src/lib/api.js
export async function getAposCMSData(type, query = {}) {
  const apiUrl = import.meta.env.PUBLIC_APOS_API_URL || 'http://localhost:3000';
  const url = new URL(`${apiUrl}/api/v1/${type}`);
  
  // 添加查询参数
  Object.keys(query).forEach(key => {
    url.searchParams.append(key, query[key]);
  });
  
  // 添加共享密钥
  url.searchParams.append('aposExternalFrontKey', 
    import.meta.env.PUBLIC_APOS_EXTERNAL_FRONT_KEY || 'hansen-website-key');
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status}`);
  }
  
  return await response.json();
}
```

### 6. 数据迁移

1. **MongoDB数据导出**
   
   从当前项目导出MongoDB数据：
   
   ```bash
   mongodump --db hansen-website --out ./db-backup
   ```

2. **MongoDB数据导入**
   
   将数据导入到Apollo项目的MongoDB数据库：
   
   ```bash
   mongorestore --db apollo-hansen ./db-backup/hansen-website
   ```

## 部署流程

1. **开发环境部署**
   
   ```bash
   # 启动Apollo项目
   node app
   
   # 启动Astro开发服务器
   cd src
   npx astro dev
   ```

2. **生产环境部署**
   
   ```bash
   # 构建Astro项目
   cd src
   npx astro build
   
   # 启动ApostropheCMS生产服务
   NODE_ENV=production node app
   ```

## 常见问题与解决方案

1. **API通信失败**
   
   检查共享密钥配置和API URL是否正确。

2. **模块加载错误**
   
   确保模块路径和命名符合Apollo模板的规范。

3. **内容显示不正确**
   
   检查内容模型定义是否匹配，确保字段名称一致。

4. **多语言切换问题**
   
   确保两种语言的内容都已填写，检查多语言路由配置。

## 迁移检查清单

- [ ] 环境准备完成
- [ ] 内容模型迁移完成
- [ ] 前端模板迁移完成
- [ ] 多语言支持配置完成
- [ ] API集成完成
- [ ] 数据迁移完成
- [ ] 基础功能测试通过
- [ ] 性能测试通过

## 相关资源

- [Apollo模板官方文档](https://github.com/apostrophecms/apollo)
- [ApostropheCMS文档](https://docs.apostrophecms.org)
- [Astro文档](https://docs.astro.build) 