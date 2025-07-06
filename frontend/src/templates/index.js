// 导入页面模板组件
import HomePage from './HomePage.astro';
import DefaultPage from './DefaultPage.astro';
import AboutPage from './AboutPage.astro';
import CareerPage from './CareerPage.astro';
import ArticleIndexPage from './ArticleIndexPage.astro';
import ArticleShowPage from './ArticleShowPage.astro';
import VideoPage from './VideoPage.astro';
import FanZonePage from './FanZonePage.astro';
import ArticleDetail from './ArticleDetail.astro';
import ArticlesPage from './ArticlesPage.astro';
import VideoDetail from './VideoDetail.astro';

// 将ApostropheCMS页面类型映射到Astro组件
const templateComponents = {
  // 核心页面类型
  '@apostrophecms/home-page': HomePage,
  '@apostrophecms/default-page': DefaultPage,
  
  // 自定义页面类型
  'about-page': AboutPage,
  'career-page': CareerPage,
  
  // 内容片段页面
  '@apostrophecms/article-page:index': ArticleIndexPage,
  '@apostrophecms/article-page:show': ArticleShowPage,
  'article-page': ArticlesPage,
  'article:show': ArticleDetail,
  'video-page': VideoPage,
  'video-content-piece': VideoDetail,
  'fan-zone-page': FanZonePage
};

export default templateComponents;
