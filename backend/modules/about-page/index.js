module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: '关于页面 / About Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            'hero': {},
            'stats': {},
            'card': {},
            'accordion': {}
          }
        }
      },
      timeline: {
        type: 'area',
        label: '成长历程 / Timeline',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            'accordion': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: '基本信息 / Basic Info',
        fields: ['title', 'main']
      },
      timeline: {
        label: '成长历程 / Timeline',
        fields: ['timeline']
      }
    }
  }
}; 