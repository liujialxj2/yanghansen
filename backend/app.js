import apostrophe from 'apostrophe';
import 'dotenv/config'; // 加载.env文件中的环境变量

export default apostrophe({
  root: import.meta,
  shortName: 'apollo',
  baseUrl: 'http://localhost:3000',
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
    '@apostrophecms/vite': {},
    '@apostrophecms/external-front': {
      options: {
        key: process.env.APOS_EXTERNAL_FRONT_KEY || 'hansen-website-key'
      }
    },

    // `className` options set custom CSS classes for Apostrophe core widgets.
    '@apostrophecms/rich-text-widget': {},
    '@apostrophecms/image-widget': {},
    '@apostrophecms/video-widget': {},
    '@apostrophecms/asset': {},

    // Custom extensions
    // Main content modules
    'default-page': {},
    'about-page': {},
    'personal-info-piece': {},
    'career-stats-piece': {},
    'author': {},
    
    // Widget modules
    'hero-widget': {},
    'stats-widget': {},
    'link': {},
    
    // This module enables the /api/v1/products endpoint
    'article': {},
    
    '@apostrophecms/page': {
      options: {
        park: [
          {
            title: 'About',
            slug: '/about',
            type: 'about-page',
            parkedId: 'aboutPage',
            _children: [
              {
                title: 'Career',
                slug: '/about/career',
                type: 'default-page',
                parkedId: 'careerPage'
              },
              {
                title: 'Media',
                slug: '/about/media',
                type: 'default-page',
                parkedId: 'mediaPage'
              }
            ]
          }
        ],
        types: [
          {
            name: '@apostrophecms/home-page',
            label: 'Home'
          },
          {
            name: 'default-page',
            label: 'Default Page'
          },
          {
            name: 'about-page',
            label: 'About Page'
          }
        ]
      }
    }
  }
});
