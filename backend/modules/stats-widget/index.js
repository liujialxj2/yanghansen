export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: {
      zh: '数据统计组件',
      en: 'Stats Widget'
    },
    icon: 'chart-line-icon',
    description: 'Display career stats with interactive visualizations.'
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
      layout: {
        type: 'select',
        label: {
          zh: '布局样式',
          en: 'Layout Style'
        },
        choices: [
          {
            label: {
              zh: '卡片网格',
              en: 'Card Grid'
            },
            value: 'cards'
          },
          {
            label: {
              zh: '图表',
              en: 'Chart'
            },
            value: 'chart'
          },
          {
            label: {
              zh: '表格',
              en: 'Table'
            },
            value: 'table'
          }
        ],
        def: 'cards'
      },
      statsSource: {
        type: 'select',
        label: {
          zh: '数据来源',
          en: 'Stats Source'
        },
        choices: [
          {
            label: {
              zh: '自动（使用最新赛季）',
              en: 'Auto (Latest Season)'
            },
            value: 'auto'
          },
          {
            label: {
              zh: '选择特定赛季',
              en: 'Select Specific Season'
            },
            value: 'specific'
          },
          {
            label: {
              zh: '职业生涯平均',
              en: 'Career Average'
            },
            value: 'career'
          },
          {
            label: {
              zh: '手动输入',
              en: 'Manual Input'
            },
            value: 'manual'
          }
        ],
        def: 'auto'
      },
      _specificSeason: {
        type: 'relationship',
        label: {
          zh: '选择赛季',
          en: 'Select Season'
        },
        withType: 'career-stats-piece',
        max: 1,
        required: true,
        if: {
          statsSource: 'specific'
        }
      },
      manualStats: {
        type: 'array',
        label: {
          zh: '手动数据',
          en: 'Manual Stats'
        },
        fields: {
          add: {
            label: {
              type: 'string',
              label: {
                zh: '标签',
                en: 'Label'
              },
              required: true
            },
            value: {
              type: 'float',
              label: {
                zh: '数值',
                en: 'Value'
              },
              required: true
            },
            unit: {
              type: 'string',
              label: {
                zh: '单位',
                en: 'Unit'
              }
            },
            icon: {
              type: 'string',
              label: {
                zh: '图标',
                en: 'Icon'
              },
              help: {
                zh: 'Font Awesome图标名称，例如"basketball"',
                en: 'Font Awesome icon name, e.g., "basketball"'
              }
            },
            color: {
              type: 'string',
              label: {
                zh: '颜色',
                en: 'Color'
              },
              help: {
                zh: '输入有效的CSS颜色值，例如：#E03A3E',
                en: 'Enter a valid CSS color value, e.g., #E03A3E'
              }
            }
          }
        },
        if: {
          statsSource: 'manual'
        }
      },
      statsToShow: {
        type: 'checkboxes',
        label: {
          zh: '要显示的统计数据',
          en: 'Stats to Show'
        },
        choices: [
          {
            label: {
              zh: '得分',
              en: 'Points'
            },
            value: 'pointsPerGame'
          },
          {
            label: {
              zh: '篮板',
              en: 'Rebounds'
            },
            value: 'reboundsPerGame'
          },
          {
            label: {
              zh: '助攻',
              en: 'Assists'
            },
            value: 'assistsPerGame'
          },
          {
            label: {
              zh: '抢断',
              en: 'Steals'
            },
            value: 'stealsPerGame'
          },
          {
            label: {
              zh: '盖帽',
              en: 'Blocks'
            },
            value: 'blocksPerGame'
          },
          {
            label: {
              zh: '投篮命中率',
              en: 'Field Goal %'
            },
            value: 'fieldGoalPercentage'
          },
          {
            label: {
              zh: '三分命中率',
              en: 'Three Point %'
            },
            value: 'threePointPercentage'
          },
          {
            label: {
              zh: '罚球命中率',
              en: 'Free Throw %'
            },
            value: 'freeThrowPercentage'
          }
        ],
        def: ['pointsPerGame', 'reboundsPerGame', 'assistsPerGame', 'blocksPerGame'],
        if: {
          statsSource: { $in: ['auto', 'specific', 'career'] }
        }
      },
      chartType: {
        type: 'select',
        label: {
          zh: '图表类型',
          en: 'Chart Type'
        },
        choices: [
          {
            label: {
              zh: '柱状图',
              en: 'Bar Chart'
            },
            value: 'bar'
          },
          {
            label: {
              zh: '折线图',
              en: 'Line Chart'
            },
            value: 'line'
          },
          {
            label: {
              zh: '雷达图',
              en: 'Radar Chart'
            },
            value: 'radar'
          },
          {
            label: {
              zh: '饼图',
              en: 'Pie Chart'
            },
            value: 'pie'
          }
        ],
        def: 'bar',
        if: {
          layout: 'chart'
        }
      },
      columns: {
        type: 'integer',
        label: {
          zh: '列数',
          en: 'Number of Columns'
        },
        min: 1,
        max: 4,
        def: 4,
        if: {
          layout: 'cards'
        }
      },
      colorScheme: {
        type: 'select',
        label: {
          zh: '配色方案',
          en: 'Color Scheme'
        },
        choices: [
          {
            label: {
              zh: '主题默认',
              en: 'Theme Default'
            },
            value: 'default'
          },
          {
            label: {
              zh: '红色主题',
              en: 'Red Theme'
            },
            value: 'red'
          },
          {
            label: {
              zh: '蓝色主题',
              en: 'Blue Theme'
            },
            value: 'blue'
          },
          {
            label: {
              zh: '梯度色',
              en: 'Gradient'
            },
            value: 'gradient'
          }
        ],
        def: 'default'
      }
    },
    group: {
      basic: {
        label: {
          zh: '基本设置',
          en: 'Basic Settings'
        },
        fields: ['title', 'description', 'layout']
      },
      data: {
        label: {
          zh: '数据设置',
          en: 'Data Settings'
        },
        fields: ['statsSource', '_specificSeason', 'manualStats', 'statsToShow']
      },
      appearance: {
        label: {
          zh: '外观设置',
          en: 'Appearance'
        },
        fields: ['chartType', 'columns', 'colorScheme']
      }
    }
  }
}; 