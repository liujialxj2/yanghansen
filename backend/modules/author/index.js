export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: {
      zh: '作者',
      en: 'Author'
    },
    pluralLabel: {
      zh: '作者',
      en: 'Authors'
    },
    commands: {
      add: {
        label: 'Add Author',
        type: 'item'
      },
      edit: {
        label: 'Edit Author',
        type: 'item'
      },
      manage: {
        label: 'Manage Authors',
        type: 'item'
      }
    }
  },
  fields: {
    add: {
      name: {
        type: 'string',
        label: {
          zh: '姓名',
          en: 'Name'
        },
        required: true
      },
      title: {
        type: 'string',
        label: {
          zh: '职位',
          en: 'Title'
        }
      },
      bio: {
        type: 'string',
        label: {
          zh: '简介',
          en: 'Biography'
        },
        textarea: true
      },
      _image: {
        type: 'relationship',
        label: {
          zh: '头像',
          en: 'Profile Image'
        },
        withType: '@apostrophecms/image',
        max: 1
      },
      email: {
        type: 'string',
        label: {
          zh: '电子邮件',
          en: 'Email'
        }
      },
      socialMedia: {
        type: 'array',
        label: {
          zh: '社交媒体',
          en: 'Social Media'
        },
        fields: {
          add: {
            platform: {
              type: 'select',
              label: {
                zh: '平台',
                en: 'Platform'
              },
              choices: [
                {
                  label: 'Twitter',
                  value: 'twitter'
                },
                {
                  label: 'Instagram',
                  value: 'instagram'
                },
                {
                  label: 'LinkedIn',
                  value: 'linkedin'
                },
                {
                  label: 'Weibo',
                  value: 'weibo'
                }
              ]
            },
            url: {
              type: 'url',
              label: {
                zh: '链接',
                en: 'URL'
              }
            }
          }
        }
      },
      _articles: {
        type: 'relationshipReverse',
        label: {
          zh: '文章',
          en: 'Articles'
        },
        withType: 'article',
        reverseOf: '_author'
      }
    },
    group: {
      basics: {
        label: {
          zh: '基本信息',
          en: 'Basic Info'
        },
        fields: ['name', 'title', '_image']
      },
      content: {
        label: {
          zh: '内容',
          en: 'Content'
        },
        fields: ['bio', 'email', 'socialMedia']
      },
      relationships: {
        label: {
          zh: '关联',
          en: 'Relationships'
        },
        fields: ['_articles']
      }
    }
  }
};
