export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: {
      zh: '个人信息',
      en: 'Personal Info'
    },
    pluralLabel: {
      zh: '个人信息',
      en: 'Personal Info'
    },
    quickCreate: false,
    sort: { createdAt: -1 },
    // 只允许一个个人信息实例
    singleton: true
  },
  commands: {
    add: {
      type: 'item',
      label: 'Add Personal Info'
    },
    edit: {
      type: 'item',
      label: 'Edit Personal Info'
    },
    manage: {
      type: 'item',
      label: 'Manage Personal Info'
    }
  },
  fields: {
    add: {
      fullName: {
        type: 'string',
        label: {
          zh: '全名',
          en: 'Full Name'
        },
        required: true
      },
      englishName: {
        type: 'string',
        label: {
          zh: '英文名',
          en: 'English Name'
        }
      },
      birthDate: {
        type: 'date',
        label: {
          zh: '出生日期',
          en: 'Birth Date'
        },
        required: true
      },
      birthPlace: {
        type: 'string',
        label: {
          zh: '出生地',
          en: 'Birth Place'
        },
        required: true
      },
      height: {
        type: 'float',
        label: {
          zh: '身高 (米)',
          en: 'Height (m)'
        },
        required: true
      },
      heightFeet: {
        type: 'string',
        label: {
          zh: '身高 (英尺)',
          en: 'Height (ft-in)'
        }
      },
      weight: {
        type: 'float',
        label: {
          zh: '体重 (公斤)',
          en: 'Weight (kg)'
        },
        required: true
      },
      weightPounds: {
        type: 'float',
        label: {
          zh: '体重 (磅)',
          en: 'Weight (lbs)'
        }
      },
      position: {
        type: 'select',
        label: {
          zh: '场上位置',
          en: 'Position'
        },
        choices: [
          {
            label: {
              zh: '中锋',
              en: 'Center'
            },
            value: 'center'
          },
          {
            label: {
              zh: '大前锋',
              en: 'Power Forward'
            },
            value: 'pf'
          },
          {
            label: {
              zh: '小前锋',
              en: 'Small Forward'
            },
            value: 'sf'
          },
          {
            label: {
              zh: '得分后卫',
              en: 'Shooting Guard'
            },
            value: 'sg'
          },
          {
            label: {
              zh: '控球后卫',
              en: 'Point Guard'
            },
            value: 'pg'
          }
        ],
        required: true
      },
      jerseyNumber: {
        type: 'integer',
        label: {
          zh: '球衣号码',
          en: 'Jersey Number'
        },
        required: true
      },
      team: {
        type: 'string',
        label: {
          zh: '所属球队',
          en: 'Team'
        },
        required: true
      },
      wingspan: {
        type: 'float',
        label: {
          zh: '臂展 (米)',
          en: 'Wingspan (m)'
        }
      },
      wingspanFeet: {
        type: 'string',
        label: {
          zh: '臂展 (英尺)',
          en: 'Wingspan (ft-in)'
        }
      },
      bio: {
        type: 'area',
        label: {
          zh: '个人简介',
          en: 'Biography'
        },
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {}
          }
        }
      },
      profileImage: {
        type: 'attachment',
        label: {
          zh: '个人照片',
          en: 'Profile Image'
        },
        fileGroup: 'images'
      },
      heroImage: {
        type: 'attachment',
        label: {
          zh: '英雄形象照',
          en: 'Hero Image'
        },
        fileGroup: 'images'
      },
      actionImages: {
        type: 'array',
        label: {
          zh: '动作照片集',
          en: 'Action Images'
        },
        fields: {
          add: {
            image: {
              type: 'attachment',
              label: {
                zh: '照片',
                en: 'Image'
              },
              fileGroup: 'images'
            },
            caption: {
              type: 'string',
              label: {
                zh: '说明',
                en: 'Caption'
              }
            }
          }
        }
      },
      hometown: {
        type: 'string',
        label: {
          zh: '家乡',
          en: 'Hometown'
        }
      },
      nationality: {
        type: 'string',
        label: {
          zh: '国籍',
          en: 'Nationality'
        }
      },
      education: {
        type: 'string',
        label: {
          zh: '教育背景',
          en: 'Education'
        }
      },
      socialMedia: {
        type: 'array',
        label: {
          zh: '社交媒体',
          en: 'Social Media'
        },
        titleField: 'platform',
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
                  label: 'Weibo',
                  value: 'weibo'
                },
                {
                  label: 'Instagram',
                  value: 'instagram'
                },
                {
                  label: 'Twitter',
                  value: 'twitter'
                },
                {
                  label: 'YouTube',
                  value: 'youtube'
                },
                {
                  label: 'TikTok / Douyin',
                  value: 'tiktok'
                },
                {
                  label: 'Facebook',
                  value: 'facebook'
                }
              ],
              required: true
            },
            url: {
              type: 'url',
              label: {
                zh: '链接',
                en: 'URL'
              },
              required: true
            },
            username: {
              type: 'string',
              label: {
                zh: '用户名',
                en: 'Username'
              }
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: {
          zh: '基本信息',
          en: 'Basic Information'
        },
        fields: ['fullName', 'englishName', 'birthDate', 'birthPlace', 'position', 'jerseyNumber', 'team']
      },
      physical: {
        label: {
          zh: '身体数据',
          en: 'Physical Attributes'
        },
        fields: ['height', 'heightFeet', 'weight', 'weightPounds', 'wingspan', 'wingspanFeet']
      },
      background: {
        label: {
          zh: '背景信息',
          en: 'Background'
        },
        fields: ['hometown', 'nationality', 'education']
      },
      media: {
        label: {
          zh: '媒体资源',
          en: 'Media'
        },
        fields: ['profileImage', 'heroImage', 'actionImages']
      },
      content: {
        label: {
          zh: '内容',
          en: 'Content'
        },
        fields: ['bio']
      },
      social: {
        label: {
          zh: '社交媒体',
          en: 'Social Media'
        },
        fields: ['socialMedia']
      }
    }
  }
}; 