module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '数据统计组件 / Stats Widget'
  },
  fields: {
    add: {
      statItems: {
        type: 'array',
        label: '数据项 / Stat Items',
        titleField: 'label',
        min: 1,
        max: 8,
        fields: {
          add: {
            label: {
              type: 'string',
              label: '标签 / Label',
              required: true
            },
            value: {
              type: 'string',
              label: '数值 / Value',
              required: true
            },
            icon: {
              type: 'string',
              label: '图标类名 / Icon Class',
              help: '例如: fas fa-basketball-ball / Example: fas fa-basketball-ball'
            }
          }
        }
      },
      layout: {
        type: 'select',
        label: '布局 / Layout',
        choices: [
          {
            label: '网格 / Grid',
            value: 'grid'
          },
          {
            label: '行 / Row',
            value: 'row'
          }
        ],
        def: 'grid'
      },
      backgroundColor: {
        type: 'select',
        label: '背景颜色 / Background Color',
        choices: [
          {
            label: '透明 / Transparent',
            value: 'transparent'
          },
          {
            label: '深色 / Dark',
            value: 'dark'
          },
          {
            label: '主色调 / Primary',
            value: 'primary'
          }
        ],
        def: 'transparent'
      },
      title: {
        type: 'string',
        label: '标题 / Title'
      }
    },
    group: {
      basics: {
        label: '基本设置 / Basic Settings',
        fields: ['title', 'statItems']
      },
      appearance: {
        label: '外观 / Appearance',
        fields: ['layout', 'backgroundColor']
      }
    }
  }
}; 