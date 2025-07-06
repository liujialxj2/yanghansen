# ApostropheCMS与Astro集成开发指南

## 1. 项目架构概述

本项目采用现代化前后端分离架构，具体构成如下：

- **后端**：ApostropheCMS内容管理系统
  - 负责内容管理、用户权限和数据存储
  - 提供API接口供前端获取内容
  - 使用MongoDB作为数据库

- **前端**：Astro前端框架
  - 负责内容渲染和用户界面
  - 支持部分组件的岛屿架构(Islands Architecture)
  - 集成Bulma CSS框架进行样式管理

- **国际化**：支持中英文双语内容
  - 使用i18next管理翻译
  - 内容和UI元素双语支持

## 2. 环境设置

### 前提条件

- Node.js 18+
- MongoDB 6.0+
- Git

### 关键环境变量

两个项目必须共享相同的密钥以确保安全通信：

```bash
# 在后端和前端项目中都需要设置相同的值
export APOS_EXTERNAL_FRONT_KEY=hansen-website-key
```

其他重要环境变量：

前端环境变量(`frontend/.env`)：
```
PORT=4321
APOS_HOST="http://localhost:3000"
PUBLIC_DEV_MODE=true
PUBLIC_LOG_LEVEL="debug"
PUBLIC_LOCALE="zh"
```

后端环境变量(`backend/.env`)：
```
APOS_MONGODB_URI=mongodb://127.0.0.1:27017/hansenyang
NODE_ENV=development
PORT=3000
LANG=zh
APOS_SESSION_SECRET=hansenyangwebsite
APOS_API_KEY=dev_api_key_hansenyangwebsite
```

## 3. ApostropheCMS后端配置

### 内容模型设计

ApostropheCMS使用模块化设计，通过以下几种主要类型构建内容：

1. **页面类型(Page Types)**：定义网站不同类型的页面
   ```javascript
   // 例：后端/modules/about-page/index.js
   module.exports = {
     extend: '@apostrophecms/page-type',
     options: {
       label: '关于页面'
     },
     fields: {
       add: {
         main: {
           type: 'area',
           options: {
             widgets: {
               'hero-widget': {},
               'timeline-widget': {}
             }
           }
         }
       }
     }
   };
   ```

2. **内容片段类型(Piece Types)**：可重复使用的内容单元
   ```javascript
   // 例：后端/modules/career-stats-piece/index.js
   module.exports = {
     extend: '@apostrophecms/piece-type',
     options: {
       label: {
         zh: '职业数据',
         en: 'Career Stats'
       }
     },
     fields: {
       add: {
         season: {
           type: 'string',
           label: {
             zh: '赛季',
             en: 'Season'
           }
         },
         // 其他字段...
       }
     }
   };
   ```

3. **组件类型(Widget Types)**：可在页面区域中添加的可视化组件
   ```javascript
   // 例：后端/modules/hero-widget/index.js
   module.exports = {
     extend: '@apostrophecms/widget-type',
     options: {
       label: {
         zh: '英雄区块',
         en: 'Hero Section'
       }
     },
     fields: {
       add: {
         heading: {
           type: 'string',
           label: {
             zh: '标题',
             en: 'Heading'
           }
         },
         // 其他字段...
       }
     }
   };
   ```

### 多语言配置

在字段定义中使用语言对象：

```javascript
fields: {
  add: {
    title: {
      type: 'string',
      label: {
        zh: '标题',
        en: 'Title'
      }
    }
  }
}
```

## 4. Astro前端配置

### 基本配置

在`astro.config.mjs`中设置：

```javascript
export default defineConfig({
  output: 'server', // 启用服务端渲染
  adapter: node({
    mode: 'standalone'
  }),
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  // 其他配置...
});
```

### 连接ApostropheCMS与Astro组件

1. **组件映射**：将ApostropheCMS小部件映射到Astro组件

```javascript
// frontend/src/widgets/index.js
import HeroWidget from './HeroWidget.astro';
import StatsWidget from './StatsWidget.astro';

const widgetComponents = {
  'hero-widget': HeroWidget,
  'stats-widget': StatsWidget
  // 其他组件映射...
};

export default widgetComponents;
```

2. **页面模板映射**：将ApostropheCMS页面类型映射到Astro模板

```javascript
// frontend/src/templates/index.js
import HomePage from './HomePage.astro';
import AboutPage from './AboutPage.astro';
import CareerPage from './CareerPage.astro';

const templateComponents = {
  '@apostrophecms/home-page': HomePage,
  'about-page': AboutPage,
  'career-page': CareerPage,
  // 其他模板...
};

export default templateComponents;
```

### 通用路由组件

使用Astro动态路由获取任何页面的数据：

```astro
---
// frontend/src/pages/[...slug].astro
import { useApostropheData } from '@apostrophecms/apostrophe-astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import templateComponents from '../templates';

const { slug } = Astro.params;
const aposData = await useApostropheData({
  req: Astro.request,
  slug: slug || 'index'
});

// 根据页面类型选择模板组件
const Template = templateComponents[aposData.page.type];
---

<BaseLayout title={aposData.page.title}>
  <Template aposData={aposData} />
</BaseLayout>
```

## 5. 页面组件开发

### 模板组件结构

```astro
---
// frontend/src/templates/AboutPage.astro
import AposArea from '@apostrophecms/apostrophe-astro/components/AposArea.astro';

const { page } = Astro.props.aposData;
---

<section class="about-page">
  <h1 class="title">{page.title}</h1>
  
  <div class="main-content">
    <AposArea area={page.main} />
  </div>
</section>
```

### 小部件组件开发

```astro
---
// frontend/src/widgets/HeroWidget.astro
const { widget } = Astro.props;
---

<div class="hero-section" style={widget.backgroundStyle}>
  <div class="hero-content">
    <h1 class="title">{widget.heading}</h1>
    <p class="subtitle">{widget.subheading}</p>
    
    {widget.ctaEnabled && (
      <a href={widget.ctaLink} class="button is-primary is-large">
        {widget.ctaText}
      </a>
    )}
  </div>
</div>

<style>
  .hero-section {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
  }
  
  /* 其他样式 */
</style>
```

## 6. 多语言实现

### 配置Astro i18n

```javascript
// astro.config.mjs
i18n: {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
  routing: {
    prefixDefaultLocale: false
  }
}
```

### 翻译文件

```json
// frontend/public/locales/zh/translation.json
{
  "nav": {
    "home": "首页",
    "about": "关于杨瀚森",
    "career": "职业生涯"
  }
}

// frontend/public/locales/en/translation.json
{
  "nav": {
    "home": "Home",
    "about": "About Hansen Yang",
    "career": "Career"
  }
}
```

### 语言切换组件

```astro
---
// frontend/src/components/LanguageSwitcher.astro
const { pathname } = Astro.url;
const currentLang = Astro.currentLocale || 'zh';
---

<div class="language-switcher">
  <a href={`/en${pathname}`} class={currentLang === 'en' ? 'active' : ''}>English</a>
  <span class="separator">|</span>
  <a href={pathname.replace('/en', '')} class={currentLang === 'zh' ? 'active' : ''}>中文</a>
</div>
```

## 7. 常见问题与解决方案

### API通信问题

**问题**: `createApi is not a function`错误
**解决方案**: 重写API客户端代码，使用原生fetch代替有问题的createApi方法

```javascript
// frontend/src/lib/aposClient.js
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(`${import.meta.env.APOS_HOST || 'http://localhost:3000'}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'X-APOS-EXTERNAL-FRONT-KEY': process.env.APOS_EXTERNAL_FRONT_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API错误 ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
}
```

### Widget配置问题

**问题**: ApostropheCMS中的widget配置包含多余的"-widget"后缀
**解决方案**: 确保widget名称在定义和引用时保持一致

### SASS编译错误

**问题**: SASS导入路径问题
**解决方案**: 确保正确配置Bulma样式表导入路径

```scss
// 正确的导入方式
@use 'bulma/sass/utilities/initial-variables' as * with (
  $primary: #E03A3E,
  // 其他变量...
);
```

### URL和站点配置问题

**问题**: Invalid URL错误和Astro.site配置问题
**解决方案**: 正确配置site属性并为Astro.site提供默认值

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://hansenyang.com',
  // 其他配置...
});
```

## 8. 部署流程

1. **构建前端项目**:
   ```bash
   cd frontend
   npm run build
   ```

2. **构建后端项目**:
   ```bash
   cd backend
   npm run build
   ```

3. **配置生产环境变量**:
   - 确保设置正确的数据库连接
   - 配置适当的域名和URL
   - 设置生产环境的安全密钥

4. **部署后端ApostropheCMS**:
   - 部署到支持Node.js的服务器
   - 配置MongoDB生产环境
   - 设置环境变量
   - 配置反向代理(Nginx/Apache)

5. **部署前端Astro**:
   - 使用适合的适配器(如node)
   - 配置正确的APOS_HOST环境变量指向部署的CMS
   - 部署静态资源到CDN

## 9. 最佳实践

1. **内容模型设计**:
   - 保持字段命名一致性
   - 使用组件化思想设计widget
   - 合理设置必填字段和默认值

2. **前端开发**:
   - 组件复用最大化
   - 响应式设计覆盖所有设备
   - 懒加载非首屏内容提升性能

3. **多语言维护**:
   - 翻译文件结构统一
   - 避免硬编码文本
   - 为缺失翻译提供合理的回退策略

4. **性能优化**:
   - 图片使用合适的格式和尺寸
   - 实现高效的缓存策略
   - 使用Astro的部分水合优化交互体验 

## 十二、项目状态更新 (2024-06-xx)

尽管基础框架开发已完成，目前网站仍处于"建设中"状态，存在以下需要解决的问题：

### 1. 内容展示问题
- [ ] 修复翻译文件加载问题，替换占位符文本
- [ ] 确保CMS内容正确显示在前端页面
- [ ] 完成首页内容填充和排版

### 2. 功能完善
- [ ] 验证并修复API数据获取问题
- [ ] 确保多语言内容正确切换
- [ ] 完成各页面实际内容的展示逻辑

### 3. 上线准备
- [ ] 进行最终的内容审核与完善
- [ ] 进行全面的跨浏览器兼容性测试
- [ ] 配置生产环境的性能监控 