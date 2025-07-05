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
      heroTitle: {
        type: 'string',
        label: {
          zh: '英雄区标题',
          en: 'Hero Title'
        },
        required: true
      },
      heroSubtitle: {
        type: 'string',
        label: {
          zh: '英雄区副标题',
          en: 'Hero Subtitle'
        },
        textarea: true
      },
      heroImage: {
        type: 'attachment',
        label: {
          zh: '英雄区图片',
          en: 'Hero Image'
        },
        fileGroup: 'images'
      },
      biography: {
        type: 'area',
        label: {
          zh: '个人传记',
          en: 'Biography'
        },
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'link',
                'bullet_list',
                'ordered_list',
                'blockquote'
              ],
              styles: [
                {
                  tag: 'p',
                  label: {
                    zh: '段落',
                    en: 'Paragraph'
                  }
                },
                {
                  tag: 'h2',
                  label: {
                    zh: '标题2',
                    en: 'Heading 2'
                  }
                },
                {
                  tag: 'h3',
                  label: {
                    zh: '标题3',
                    en: 'Heading 3'
                  }
                }
              ]
            },
            '@apostrophecms/image': {}
          }
        }
      },
      careerTimeline: {
        type: 'array',
        label: {
          zh: '职业生涯时间线',
          en: 'Career Timeline'
        },
        titleField: 'title',
        fields: {
          add: {
            year: {
              type: 'string',
              label: {
                zh: '年份',
                en: 'Year'
              },
              required: true
            },
            title: {
              type: 'string',
              label: {
                zh: '标题',
                en: 'Title'
              },
              required: true
            },
            description: {
              type: 'string',
              label: {
                zh: '描述',
                en: 'Description'
              },
              textarea: true
            },
            image: {
              type: 'attachment',
              label: {
                zh: '图片',
                en: 'Image'
              },
              fileGroup: 'images'
            }
          }
        }
      },
      quote: {
        type: 'object',
        label: {
          zh: '引述',
          en: 'Quote'
        },
        fields: {
          add: {
            content: {
              type: 'string',
              label: {
                zh: '引述内容',
                en: 'Quote Content'
              },
              textarea: true
            },
            author: {
              type: 'string',
              label: {
                zh: '作者',
                en: 'Author'
              }
            },
            authorTitle: {
              type: 'string',
              label: {
                zh: '作者职位',
                en: 'Author Title'
              }
            }
          }
        }
      },
      personalInterests: {
        type: 'area',
        label: {
          zh: '个人兴趣爱好',
          en: 'Personal Interests'
        },
        options: {
          widgets: {
            '@apostrophecms/rich-text': {}
          }
        }
      },
      galleryTitle: {
        type: 'string',
        label: {
          zh: '图库标题',
          en: 'Gallery Title'
        },
        def: {
          zh: '照片墙',
          en: 'Photo Gallery'
        }
      },
      galleryDescription: {
        type: 'string',
        label: {
          zh: '图库描述',
          en: 'Gallery Description'
        },
        textarea: true
      },
      gallery: {
        type: 'array',
        label: {
          zh: '照片集',
          en: 'Photo Gallery'
        },
        fields: {
          add: {
            image: {
              type: 'attachment',
              label: {
                zh: '图片',
                en: 'Image'
              },
              fileGroup: 'images',
              required: true
            },
            caption: {
              type: 'string',
              label: {
                zh: '图片说明',
                en: 'Caption'
              }
            }
          }
        }
      },
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
      hero: {
        label: {
          zh: '英雄区',
          en: 'Hero'
        },
        fields: ['heroTitle', 'heroSubtitle', 'heroImage']
      },
      biography: {
        label: {
          zh: '个人传记',
          en: 'Biography'
        },
        fields: ['biography']
      },
      timeline: {
        label: {
          zh: '时间线',
          en: 'Timeline'
        },
        fields: ['careerTimeline']
      },
      quotes: {
        label: {
          zh: '引述',
          en: 'Quotes'
        },
        fields: ['quote']
      },
      interests: {
        label: {
          zh: '兴趣爱好',
          en: 'Interests'
        },
        fields: ['personalInterests']
      },
      gallery: {
        label: {
          zh: '照片墙',
          en: 'Gallery'
        },
        fields: ['galleryTitle', 'galleryDescription', 'gallery']
      },
      content: {
        label: {
          zh: '主要内容区',
          en: 'Main Content'
        },
        fields: ['main']
      },
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