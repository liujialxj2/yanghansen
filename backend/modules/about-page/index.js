export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: {
      zh: '关于页面',
      en: 'About Page'
    }
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            'hero-widget': {},
            'stats-widget': {},
            'timeline-widget': {},
            'rich-text-widget': {},
            '@apostrophecms/image': {}
          }
        }
      },
      profileSection: {
        type: 'area',
        label: {
          zh: '个人简介区域',
          en: 'Profile Section'
        },
        options: {
          widgets: {
            'rich-text-widget': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      },
      bio: {
        type: 'area',
        label: {
          zh: '生平经历',
          en: 'Biography'
        },
        options: {
          widgets: {
            'rich-text-widget': {},
            '@apostrophecms/image': {},
            'timeline-widget': {}
          }
        }
      },
      achievements: {
        type: 'area',
        label: {
          zh: '成就与荣誉',
          en: 'Achievements & Awards'
        },
        options: {
          widgets: {
            'awards-widget': {},
            'rich-text-widget': {},
            '@apostrophecms/image': {}
          }
        }
      },
      personalLife: {
        type: 'area',
        label: {
          zh: '个人生活',
          en: 'Personal Life'
        },
        options: {
          widgets: {
            'rich-text-widget': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            'gallery-widget': {}
          }
        }
      },
      relatedLinks: {
        type: 'array',
        label: {
          zh: '相关链接',
          en: 'Related Links'
        },
        titleField: 'title',
        schema: [
          {
            name: 'title',
            type: 'string',
            label: {
              zh: '标题',
              en: 'Title'
            }
          },
          {
            name: 'url',
            type: 'url',
            label: {
              zh: '链接',
              en: 'URL'
            }
          },
          {
            name: 'description',
            type: 'string',
            label: {
              zh: '描述',
              en: 'Description'
            },
            textarea: true
          }
        ]
      },
      metaDescription: {
        type: 'string',
        label: {
          zh: '元描述',
          en: 'Meta Description'
        },
        textarea: true,
        help: {
          zh: '用于搜索引擎优化的页面描述',
          en: 'Page description for SEO purposes'
        }
      }
    },
    group: {
      basics: {
        label: {
          zh: '基本内容',
          en: 'Basic Content'
        },
        fields: ['main', 'profileSection']
      },
      biography: {
        label: {
          zh: '传记内容',
          en: 'Biographical Content'
        },
        fields: ['bio', 'achievements', 'personalLife']
      },
      meta: {
        label: {
          zh: '元数据',
          en: 'Meta Data'
        },
        fields: ['relatedLinks', 'metaDescription']
      }
    }
  }
}; 