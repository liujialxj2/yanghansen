import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import apostrophe from 'apostrophe';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default apostrophe({
  root: __dirname,
  shortName: 'apollo',
  modules: {
    // Apostrophe module configuration
    // *******************************
    //
    // Most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`

    // *********************************
    '@apostrophecms/express': {
      options: {
        session: {
          // 必须提供一个安全的会话密钥
          secret: 'hansenyangwebsite'
        }
      }
    },
    
    '@apostrophecms/user': {
      options: {
        admin: {
          // 默认管理员账户
          add: [{
            username: 'admin',
            password: 'admin',
            title: 'Admin User',
            role: 'admin'
          }]
        }
      }
    },
    
    '@apostrophecms/vite': {},

    // `className` options set custom CSS classes for Apostrophe core widgets.
    '@apostrophecms/rich-text-widget': {},
    '@apostrophecms/image-widget': {},
    '@apostrophecms/video-widget': {},
    '@apostrophecms/asset': {},

    // Custom extensions
    // Make sure to set the `APOS_BASE_URL` environment variable to the base
    // URL of your Apostrophe site
    '@apostrophecms/seo': {},

    // pieces
    article: {},
    author: {},
    'career-stats-piece': {},
    'personal-info-piece': {},
    'video-content-piece': {},

    // pages
    'default-page': {},
    'article-page': {},
    'about-page': {},

    // widgets
    'grid-layout-widget': {},
    'accordion-widget': {},
    'card-widget': {},
    'hero-widget': {},
    'link-widget': {},
    'slideshow-widget': {},
    'rows-widget': {},
    'stats-widget': {}
  }
});
