import heroFields from '../../lib/schema-mixins/hero-fields.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: {
      zh: '英雄区块',
      en: 'Hero Section'
    },
    icon: 'sign-text-icon',
    previewImage: 'svg',
    description: 'A full-width or split hero section with background image or video.'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: {
          zh: '标题',
          en: 'Title'
        },
        required: true
      },
      subtitle: {
        type: 'string',
        label: {
          zh: '副标题',
          en: 'Subtitle'
        },
        textarea: true
      },
      backgroundType: {
        type: 'select',
        label: {
          zh: '背景类型',
          en: 'Background Type'
        },
        choices: [
          {
            label: {
              zh: '图片',
              en: 'Image'
            },
            value: 'image'
          },
          {
            label: {
              zh: '视频',
              en: 'Video'
            },
            value: 'video'
          },
          {
            label: {
              zh: '渐变色',
              en: 'Gradient'
            },
            value: 'gradient'
          },
          {
            label: {
              zh: '纯色',
              en: 'Solid Color'
            },
            value: 'color'
          }
        ],
        def: 'image'
      },
      backgroundImage: {
        type: 'attachment',
        label: {
          zh: '背景图片',
          en: 'Background Image'
        },
        fileGroup: 'images',
        if: {
          backgroundType: 'image'
        }
      },
      backgroundVideo: {
        type: 'attachment',
        label: {
          zh: '背景视频',
          en: 'Background Video'
        },
        fileGroup: 'videos',
        if: {
          backgroundType: 'video'
        }
      },
      videoFallbackImage: {
        type: 'attachment',
        label: {
          zh: '视频占位图',
          en: 'Video Fallback Image'
        },
        fileGroup: 'images',
        if: {
          backgroundType: 'video'
        }
      },
      gradientStart: {
        type: 'string',
        label: {
          zh: '渐变起始颜色',
          en: 'Gradient Start Color'
        },
        help: {
          zh: '输入有效的CSS颜色值，例如：#E03A3E',
          en: 'Enter a valid CSS color value, e.g., #E03A3E'
        },
        if: {
          backgroundType: 'gradient'
        }
      },
      gradientEnd: {
        type: 'string',
        label: {
          zh: '渐变结束颜色',
          en: 'Gradient End Color'
        },
        help: {
          zh: '输入有效的CSS颜色值，例如：#101010',
          en: 'Enter a valid CSS color value, e.g., #101010'
        },
        if: {
          backgroundType: 'gradient'
        }
      },
      gradientDirection: {
        type: 'select',
        label: {
          zh: '渐变方向',
          en: 'Gradient Direction'
        },
        choices: [
          {
            label: {
              zh: '左到右',
              en: 'Left to Right'
            },
            value: 'to right'
          },
          {
            label: {
              zh: '右到左',
              en: 'Right to Left'
            },
            value: 'to left'
          },
          {
            label: {
              zh: '上到下',
              en: 'Top to Bottom'
            },
            value: 'to bottom'
          },
          {
            label: {
              zh: '下到上',
              en: 'Bottom to Top'
            },
            value: 'to top'
          },
          {
            label: {
              zh: '左上到右下',
              en: 'Top Left to Bottom Right'
            },
            value: 'to bottom right'
          },
          {
            label: {
              zh: '右上到左下',
              en: 'Top Right to Bottom Left'
            },
            value: 'to bottom left'
          }
        ],
        def: 'to bottom',
        if: {
          backgroundType: 'gradient'
        }
      },
      backgroundColor: {
        type: 'string',
        label: {
          zh: '背景颜色',
          en: 'Background Color'
        },
        help: {
          zh: '输入有效的CSS颜色值，例如：#101010',
          en: 'Enter a valid CSS color value, e.g., #101010'
        },
        if: {
          backgroundType: 'color'
        }
      },
      height: {
        type: 'select',
        label: {
          zh: '高度',
          en: 'Height'
        },
        choices: [
          {
            label: {
              zh: '标准',
              en: 'Standard'
            },
            value: 'standard'
          },
          {
            label: {
              zh: '大',
              en: 'Large'
            },
            value: 'large'
          },
          {
            label: {
              zh: '全屏高度',
              en: 'Full Height'
            },
            value: 'fullheight'
          }
        ],
        def: 'standard'
      },
      overlayOpacity: {
        type: 'range',
        label: {
          zh: '遮罩不透明度',
          en: 'Overlay Opacity'
        },
        min: 0,
        max: 100,
        step: 5,
        def: 50
      },
      alignment: {
        type: 'select',
        label: {
          zh: '内容对齐',
          en: 'Content Alignment'
        },
        choices: [
          {
            label: {
              zh: '居左',
              en: 'Left'
            },
            value: 'left'
          },
          {
            label: {
              zh: '居中',
              en: 'Center'
            },
            value: 'center'
          },
          {
            label: {
              zh: '居右',
              en: 'Right'
            },
            value: 'right'
          }
        ],
        def: 'center'
      },
      button: {
        type: 'object',
        label: {
          zh: '按钮',
          en: 'Button'
        },
        fields: {
          add: {
            text: {
              type: 'string',
              label: {
                zh: '按钮文本',
                en: 'Button Text'
              }
            },
            url: {
              type: 'string',
              label: {
                zh: '按钮链接',
                en: 'Button URL'
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
                    zh: '轮廓',
                    en: 'Outline'
                  },
                  value: 'outline'
                },
                {
                  label: {
                    zh: '文本',
                    en: 'Text'
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
            }
          }
        }
      }
    },
    group: {
      content: {
        label: {
          zh: '内容',
          en: 'Content'
        },
        fields: ['title', 'subtitle', 'button']
      },
      background: {
        label: {
          zh: '背景',
          en: 'Background'
        },
        fields: [
          'backgroundType', 
          'backgroundImage', 
          'backgroundVideo', 
          'videoFallbackImage', 
          'gradientStart', 
          'gradientEnd', 
          'gradientDirection', 
          'backgroundColor'
        ]
      },
      appearance: {
        label: {
          zh: '外观',
          en: 'Appearance'
        },
        fields: ['height', 'overlayOpacity', 'alignment']
      }
    }
  }
};
