import { getWidgetGroups } from '../../lib/helpers/area-widgets.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: {
      zh: '默认页面',
      en: 'Default Page'
    }
  },
  fields: {
    add: {
      main: {
        type: 'area',
        label: {
          zh: '主要内容',
          en: 'Main Content'
        },
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            hero: {},
            stats: {},
            rows: {},
            'grid-layout': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: {
          zh: '基础',
          en: 'Basics'
        },
        fields: ['title', 'main']
      }
    }
  }
};
