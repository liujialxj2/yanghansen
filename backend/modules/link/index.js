export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: {
      zh: '链接按钮',
      en: 'Link Button'
    },
    icon: 'link-icon'
  },
  fields: {
    add: {
      label: {
        type: 'string',
        label: {
          zh: '按钮文字',
          en: 'Button Text'
        },
        required: true
      },
      url: {
        type: 'url',
        label: {
          zh: '链接地址',
          en: 'URL'
        },
        required: true
      },
      _page: {
        type: 'relationship',
        label: {
          zh: '内部页面',
          en: 'Internal Page'
        },
        withType: '@apostrophecms/page',
        max: 1,
        help: {
          zh: '如果选择了内部页面，将覆盖URL字段',
          en: 'If selected, this will override the URL field'
        }
      },
      style: {
        type: 'select',
        label: {
          zh: '按钮样式',
          en: 'Button Style'
        },
        choices: [
          {
            label: {
              zh: '主要',
              en: 'Primary'
            },
            value: 'primary'
          },
          {
            label: {
              zh: '次要',
              en: 'Secondary'
            },
            value: 'secondary'
          },
          {
            label: {
              zh: '文本链接',
              en: 'Text Link'
            },
            value: 'text'
          }
        ],
        def: 'primary'
      },
      size: {
        type: 'select',
        label: {
          zh: '按钮大小',
          en: 'Button Size'
        },
        choices: [
          {
            label: {
              zh: '小',
              en: 'Small'
            },
            value: 'small'
          },
          {
            label: {
              zh: '中',
              en: 'Medium'
            },
            value: 'medium'
          },
          {
            label: {
              zh: '大',
              en: 'Large'
            },
            value: 'large'
          }
        ],
        def: 'medium'
      },
      icon: {
        type: 'string',
        label: {
          zh: '图标',
          en: 'Icon'
        },
        help: {
          zh: '可选的Font Awesome图标名称，例如"arrow-right"',
          en: 'Optional Font Awesome icon name, e.g. "arrow-right"'
        }
      },
      iconPosition: {
        type: 'select',
        label: {
          zh: '图标位置',
          en: 'Icon Position'
        },
        choices: [
          {
            label: {
              zh: '左侧',
              en: 'Left'
            },
            value: 'left'
          },
          {
            label: {
              zh: '右侧',
              en: 'Right'
            },
            value: 'right'
          }
        ],
        def: 'right'
      },
      openInNewTab: {
        type: 'boolean',
        label: {
          zh: '在新标签页中打开',
          en: 'Open in New Tab'
        },
        def: false
      }
    }
  }
}; 