export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: {
      zh: '数据统计组件',
      en: 'Stats Widget'
    }
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: {
          zh: '标题',
          en: 'Title'
        }
      },
      description: {
        type: 'string',
        label: {
          zh: '描述',
          en: 'Description'
        },
        textarea: true
      },
      statCards: {
        type: 'array',
        label: {
          zh: '统计卡片',
          en: 'Stat Cards'
        },
        titleField: 'statLabel',
        schema: [
          {
            name: 'statLabel',
            type: 'string',
            label: {
              zh: '标签',
              en: 'Label'
            },
            required: true
          },
          {
            name: 'statValue',
            type: 'string',
            label: {
              zh: '数值',
              en: 'Value'
            },
            required: true
          },
          {
            name: 'icon',
            type: 'string',
            label: {
              zh: '图标',
              en: 'Icon'
            },
            help: {
              zh: '使用Font Awesome图标名称，例如：fa-basketball',
              en: 'Use Font Awesome icon name, e.g.: fa-basketball'
            }
          },
          {
            name: 'color',
            type: 'select',
            label: {
              zh: '颜色',
              en: 'Color'
            },
            choices: [
              {
                label: {
                  zh: '主题色',
                  en: 'Primary'
                },
                value: 'primary'
              },
              {
                label: {
                  zh: '成功色',
                  en: 'Success'
                },
                value: 'success'
              },
              {
                label: {
                  zh: '信息色',
                  en: 'Info'
                },
                value: 'info'
              },
              {
                label: {
                  zh: '警告色',
                  en: 'Warning'
                },
                value: 'warning'
              },
              {
                label: {
                  zh: '危险色',
                  en: 'Danger'
                },
                value: 'danger'
              }
            ],
            def: 'primary'
          },
          {
            name: 'trend',
            type: 'select',
            label: {
              zh: '趋势',
              en: 'Trend'
            },
            choices: [
              {
                label: {
                  zh: '上升',
                  en: 'Up'
                },
                value: 'up'
              },
              {
                label: {
                  zh: '下降',
                  en: 'Down'
                },
                value: 'down'
              },
              {
                label: {
                  zh: '持平',
                  en: 'Neutral'
                },
                value: 'neutral'
              },
              {
                label: {
                  zh: '不显示',
                  en: 'None'
                },
                value: 'none'
              }
            ],
            def: 'none'
          },
          {
            name: 'trendValue',
            type: 'string',
            label: {
              zh: '趋势值',
              en: 'Trend Value'
            },
            help: {
              zh: '例如：+5.2%',
              en: 'e.g.: +5.2%'
            },
            if: {
              $or: [
                { trend: 'up' },
                { trend: 'down' },
                { trend: 'neutral' }
              ]
            }
          }
        ],
        min: 1,
        max: 8
      },
      layout: {
        type: 'select',
        label: {
          zh: '布局',
          en: 'Layout'
        },
        choices: [
          {
            label: {
              zh: '两列',
              en: 'Two Columns'
            },
            value: 'two-columns'
          },
          {
            label: {
              zh: '三列',
              en: 'Three Columns'
            },
            value: 'three-columns'
          },
          {
            label: {
              zh: '四列',
              en: 'Four Columns'
            },
            value: 'four-columns'
          }
        ],
        def: 'four-columns'
      },
      viewAllLink: {
        type: 'url',
        label: {
          zh: '查看全部链接',
          en: 'View All Link'
        }
      },
      viewAllText: {
        type: 'string',
        label: {
          zh: '查看全部文本',
          en: 'View All Text'
        },
        if: {
          viewAllLink: { $exists: true }
        },
        def: {
          zh: '查看详细数据',
          en: 'View detailed stats'
        }
      }
    },
    group: {
      basics: {
        label: {
          zh: '基本设置',
          en: 'Basic Settings'
        },
        fields: [
          'title',
          'description',
          'layout'
        ]
      },
      content: {
        label: {
          zh: '内容',
          en: 'Content'
        },
        fields: [
          'statCards'
        ]
      },
      links: {
        label: {
          zh: '链接',
          en: 'Links'
        },
        fields: [
          'viewAllLink',
          'viewAllText'
        ]
      }
    }
  }
}; 