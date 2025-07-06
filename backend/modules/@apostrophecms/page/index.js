// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
    builders: {
      children: true,
      ancestors: {
        children: {
          depth: 2,
          relationships: false
        }
      }
    },
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'article-page',
        label: 'Article Page'
      },
      {
        name: 'about-page',
        label: '关于页面 / About Page'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
