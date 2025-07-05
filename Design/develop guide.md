# 杨瀚森官方网站开发指南

本文档基于[ApostropheCMS官方文档](https://docs.apostrophecms.org/)和[Astro官方文档](https://docs.astro.build/en/guides/cms/apostrophecms/)，为开发团队提供针对本项目的技术指导，重点关注ApostropheCMS和Astro集成开发的关键技术点。

## 一、ApostropheCMS + Astro 核心架构概述

### 1. 基础技术栈

- **后端**: ApostropheCMS (Node.js)
- **前端**: Astro
- **数据库**: MongoDB
- **样式框架**: Bulma CSS
- **部署**: 支持Apostrophe托管或第三方服务器

### 2. 项目结构

本项目采用前后端分离的结构，分为两个主要部分：
- `/backend` - ApostropheCMS内容管理系统
- `/frontend` - Astro前端应用

## 二、模块配置与组织

### 1. ApostropheCMS模块体系

ApostropheCMS采用模块化架构，每个功能都封装在一个模块中。本项目中的模块类型包括：

- **页面类型模块** (Page Types): 如`home-page`、`about-page`、`career-page`等
- **内容片段模块** (Piece Types): 如`personal-info-piece`、`career-stats-piece`、`article`等
- **组件模块** (Widget Types): 如`hero-widget`、`stats-widget`、`timeline-widget`等
- **核心系统模块**: 如`@apostrophecms/page`、`@apostrophecms/global`等

### 2. 模块文件结构

每个自定义模块通常包含以下文件结构：

```
modules/module-name/
  ├── index.js          # 主模块配置
  ├── lib/              # 辅助函数和工具
  ├── public/           # 静态资源
  └── views/            # 模板文件（仅用于后端渲染）
```

### 3. 模块配置示例

```javascript
// modules/personal-info-piece/index.js
module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Personal Info',
    pluralLabel: 'Personal Info'
  },
  fields: {
    add: {
      fullName: {
        type: 'string',
        label: {
          zh: '全名',
          en: 'Full Name'
        },
        required: true
      },
      // 其他字段...
    },
    group: {
      basics: {
        label: '基本信息',
        fields: ['fullName', 'birthDate', 'position']
      },
      // 其他分组...
    }
  }
};
```

## 三、内容模型设计

### 1. 字段类型

ApostropheCMS提供多种内置字段类型，本项目将主要使用：

- `string`: 文本字段，用于姓名、标题等
- `area`: 富内容区域，可包含多种组件
- `attachment`: 文件上传，用于图片、视频等媒体
- `relationship`: 内容关联，如文章与作者的关联
- `array`: 数组字段，用于统计数据等重复内容
- `date`: 日期字段，用于比赛日期、出生日期等
- `object`: 复合对象字段，用于复杂数据结构

### 2. 关系型数据

对于关联数据（如文章与作者），使用`relationship`字段：

```javascript
// modules/article/index.js
module.exports = {
  // ...
  fields: {
    add: {
      // ...
      author: {
        type: 'relationship',
        label: '作者',
        withType: 'author',
        max: 1
      }
    }
  }
};
```

### 3. 条件字段

对于需要根据其他字段值动态显示的内容，使用条件字段：

```javascript
// 例：根据背景类型显示不同字段
backgroundType: {
  type: 'select',
  choices: [
    { label: '图片', value: 'image' },
    { label: '视频', value: 'video' },
    { label: '渐变色', value: 'gradient' }
  ]
},
backgroundImage: {
  type: 'attachment',
  if: {
    backgroundType: 'image'
  }
},
// 类似的视频和渐变色字段...
```

## 四、多语言实现

### 1. 静态内容国际化

在Astro前端，使用i18n扩展处理静态UI内容：

```javascript
// frontend/astro.config.mjs
export default defineConfig({
  // ...
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
```

### 2. 动态内容国际化

ApostropheCMS中的内容字段可以设置为多语言：

```javascript
module.exports = {
  // ...
  options: {
    i18n: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: {
          zh: '标题',
          en: 'Title'
        }
      }
      // 其他字段...
    }
  }
};
```

### 3. 语言切换实现

在前端实现语言切换组件，需保持URL结构一致：
- 中文URL: `/about`
- 英文URL: `/en/about`

## 五、Astro与ApostropheCMS集成详解

### 1. 先决条件

要集成ApostropheCMS和Astro，需要满足以下条件：

1. **设置按需渲染的Astro项目**：
   - 安装Node.js适配器
   - 在`astro.config.mjs`中配置`output: 'server'`

2. **配置ApostropheCMS项目**：
   - 设置环境变量`APOS_EXTERNAL_FRONT_KEY`（可以是任意随机字符串）
   - 推荐使用Apostrophe CLI工具快速设置

### 2. 设置项目通信

Astro项目和ApostropheCMS项目需要使用相同的`APOS_EXTERNAL_FRONT_KEY`环境变量值来实现相互通信：

```bash
# 在两个项目中设置相同的环境变量
export APOS_EXTERNAL_FRONT_KEY=hansen-website-key
```

### 3. 安装依赖

在Astro项目中安装以下依赖：

```bash
npm install @apostrophecms/apostrophe-astro dayjs
```

### 4. 配置Astro

修改`astro.config.mjs`文件，添加Apostrophe集成：

```javascript
// frontend/astro.config.mjs
import { defineConfig } from 'astro';
import node from '@astrojs/node';
import apostrophe from '@apostrophecms/apostrophe-astro';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    apostrophe({
      // ApostropheCMS服务器地址，默认为localhost:3000
      aposHost: process.env.APOS_HOST || 'http://localhost:3000'
    })
  ]
});
```

### 5. 组件映射系统

在Astro项目中创建组件映射文件，将ApostropheCMS中的组件类型与Astro组件关联：

```javascript
// frontend/src/widgets/index.js
import RichTextWidget from './RichTextWidget.astro';
import ImageWidget from './ImageWidget.astro';
import HeroWidget from './HeroWidget.astro';
import StatsWidget from './StatsWidget.astro';

export default {
  '@apostrophecms/rich-text': RichTextWidget,
  '@apostrophecms/image': ImageWidget,
  'hero-widget': HeroWidget,
  'stats-widget': StatsWidget,
  // 其他组件映射...
};
```

### 6. 创建组件示例

富文本组件示例：

```astro
// frontend/src/widgets/RichTextWidget.astro
---
const { widget } = Astro.props;
---

<div class="rich-text" set:html={widget.content}></div>
```

图片组件示例：

```astro
// frontend/src/widgets/ImageWidget.astro
---
import { getAttachmentUrl } from '../lib/attachments.js';

const { widget } = Astro.props;
const image = widget.image;
---

{image && (
  <img 
    src={getAttachmentUrl(image)} 
    alt={image.alt || image.title || 'Image'} 
    width={image.width}
    height={image.height}
  />
)}
```

### 7. 页面类型映射

创建页面模板并映射到ApostropheCMS的页面类型：

```javascript
// frontend/src/templates/index.js
import HomePage from './HomePage.astro';
import DefaultPage from './DefaultPage.astro';
import AboutPage from './AboutPage.astro';
import CareerPage from './CareerPage.astro';
import ArticleIndexPage from './ArticleIndexPage.astro';
import ArticleShowPage from './ArticleShowPage.astro';

export default {
  '@apostrophecms/home-page': HomePage,
  '@apostrophecms/default-page': DefaultPage,
  'about-page': AboutPage,
  'career-page': CareerPage,
  '@apostrophecms/article-page:index': ArticleIndexPage,
  '@apostrophecms/article-page:show': ArticleShowPage
};
```

### 8. 创建动态路由组件

在`src/pages`目录创建`[...slug].astro`文件，用于处理所有动态路由并获取ApostropheCMS数据：

```astro
---
import { getAposData } from '@apostrophecms/apostrophe-astro';
import templates from '../templates/index.js';
import Layout from '../layouts/MainLayout.astro';

export const prerender = false;

// 获取请求路径
const { slug } = Astro.params;
const path = '/' + (slug || '');

// 从ApostropheCMS获取数据
const aposData = await getAposData(path, Astro.locals);
const { page, piece } = aposData;

// 如果页面不存在，返回404
if (!page) {
  return Astro.redirect('/404');
}

// 根据页面类型确定模板
const templateType = piece 
  ? page.type + ':show' 
  : page.type;
const Template = templates[templateType];

// 如果找不到对应模板，使用默认页面
if (!Template) {
  return Astro.redirect('/404');
}
---

<Layout title={page.title}>
  <Template aposData={aposData} />
</Layout>
```

## 六、实现特定功能

### 1. 创建博客功能

定义博客内容类型（在ApostropheCMS后端）：

```javascript
// modules/article/index.js
module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '文章',
    pluralLabel: '文章'
  },
  fields: {
    add: {
      authorName: {
        type: 'string',
        label: '作者名称'
      },
      publicationDate: {
        type: 'date',
        label: '发布日期'
      },
      content: {
        type: 'area',
        label: '内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            'hero-widget': {}
            // 其他可用组件...
          }
        }
      }
    },
    group: {
      basics: {
        label: '基本信息',
        fields: ['authorName', 'publicationDate', 'content']
      }
    }
  }
};
```

创建博客列表页模板：

```astro
// frontend/src/templates/ArticleIndexPage.astro
---
import dayjs from 'dayjs';

const { page, pieces } = Astro.props.aposData;
---

<section class="article-list">
  <h1>{page.title}</h1>
  
  <div class="articles">
    {pieces.map(article => (
      <div class="article-card">
        <h4>发布于 {dayjs(article.publicationDate).format('YYYY年MM月DD日')}</h4>
        <h3>
          <a href={article._url}>{article.title}</a>
        </h3>
        <p>作者：{article.authorName}</p>
      </div>
    ))}
  </div>
</section>
```

创建博客详情页模板：

```astro
// frontend/src/templates/ArticleShowPage.astro
---
import AposArea from '@apostrophecms/apostrophe-astro/components/AposArea.astro';
import dayjs from 'dayjs';

const { piece } = Astro.props.aposData;
const { content } = piece;
---

<article class="article-detail">
  <h1>{piece.title}</h1>
  <div class="article-meta">
    <p>作者：{piece.authorName}</p>
    <p>发布于：{dayjs(piece.publicationDate).format('YYYY年MM月DD日')}</p>
  </div>
  
  <div class="article-content">
    <AposArea area={content} />
  </div>
</article>
```

### 2. 图片和媒体处理

配置ApostropheCMS的图片尺寸预设：

```javascript
// modules/@apostrophecms/attachment/index.js
module.exports = {
  options: {
    // 定义上传时创建的尺寸
    imageSizes: {
      'custom-banner': { width: 1200, height: 400 },
      'square-thumb': { width: 300, height: 300 },
      'small': { width: 300 },
      'medium': { width: 600 },
      'large': { width: 900 }
    }
  }
};
```

在Astro中使用图片辅助函数：

```javascript
import {
  getAttachmentUrl,
  getAttachmentSrcset,
  getFocalPoint
} from '../lib/attachments.js';

// 使用示例
<img
  src={getAttachmentUrl(image, { size: 'medium' })}
  srcset={getAttachmentSrcset(image)}
  sizes="(max-width: 800px) 100vw, 800px"
  alt={image.alt || image.title || 'Image description'}
  style={`object-position: ${getFocalPoint(image)};`}
/>
```

## 七、部署与优化

### 1. 部署选项

#### A. Apostrophe官方托管

- 自动处理数据库配置和管理
- 资产存储和交付
- SSL证书管理
- 自动备份
- 安全更新

#### B. 自托管部署

**后端环境变量配置**:
```
NODE_ENV=production
APOS_MONGODB_URI=YOUR_mongodb_connection_string
APOS_EXTERNAL_FRONT_KEY=a_random_string
```

**前端部署**(如Netlify):
- 基础目录: `frontend`
- 构建命令: `npm run build`
- 发布目录: `frontend/dist`
- 环境变量: `APOS_EXTERNAL_FRONT_KEY=与后端相同的字符串`

在生产环境中，前端Astro项目需要设置`APOS_HOST`环境变量，指向ApostropheCMS部署的URL地址。

### 2. 性能优化

- **中文字体优化**:
  - 使用字体子集化技术
  - 实现字体文件的异步加载
  - 使用系统字体作为备选

- **图片优化**:
  - 使用适当的图片格式(WebP等)
  - 实现懒加载
  - 使用响应式图片

- **缓存策略**:
  - 配置合理的缓存策略
  - 使用CDN分发静态资源

## 八、测试与调试

### 1. 开发环境

在本地开发环境中运行项目：

```bash
# 设置环境变量
export APOS_EXTERNAL_FRONT_KEY=hansen-website-key

# 启动后端
cd backend
npm run dev

# 启动前端(新终端)
cd frontend
npm run dev
```

### 2. 调试技巧

- 使用`apos.util.log()`进行后端日志输出
- 利用ApostropheCMS内置的分析工具查看性能
- 使用Astro开发服务器的热重载功能加快开发
- 检查ApostropheCMS的admin界面登录状态（通常在`/login`路径）

## 九、扩展与定制

### 1. 自定义管理界面

可通过扩展`@apostrophecms/ui`模块定制管理界面：

```javascript
// modules/@apostrophecms/ui/index.js
module.exports = {
  options: {
    themeStyles: {
      primary: '#E03A3E', // 开拓者红
      // 其他样式...
    }
  }
};
```

### 2. 添加自定义API端点

为特定功能（如数据统计API）添加自定义REST端点：

```javascript
// modules/career-stats-piece/index.js
module.exports = {
  // ...
  apiRoutes(self) {
    return {
      get: {
        // GET /api/v1/career-stats-piece/aggregate
        aggregate: async (req) => {
          // 实现聚合统计逻辑
          return { /* 统计结果 */ };
        }
      }
    };
  }
};
```

## 十、参考资源

- [ApostropheCMS官方文档](https://docs.apostrophecms.org/)
- [Astro官方文档](https://docs.astro.build/)
- [ApostropheCMS与Astro集成指南](https://docs.astro.build/en/guides/cms/apostrophecms/)
- [apostrophe-astro扩展文档](https://github.com/apostrophecms/apostrophe-astro)
- [Astro集成ApostropheCMS示例项目](https://github.com/apostrophecms/apostrophe-astro)
- [Bulma CSS文档](https://bulma.io/documentation/)

### 额外社区资源

- [Integrating ApostropheCMS with Astro, Pt. 1](https://apostrophecms.com/blog/integrating-apostrophecms-with-astro-part-1) by Antonello Zaini
- [Integrating ApostropheCMS with Astro, Pt. 2](https://apostrophecms.com/blog/integrating-apostrophecms-with-astro-part-2) by Antonello Zaini

---

本指南将随项目进展不断更新，为开发团队提供技术参考和最佳实践。 