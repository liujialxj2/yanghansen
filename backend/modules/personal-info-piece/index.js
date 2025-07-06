module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '个人信息 / Personal Info',
    pluralLabel: '个人信息 / Personal Info',
    alias: 'personal-info',
    commandsLabel: '个人信息 / Personal Info'
  },
  fields: {
    add: {
      fullName: {
        type: 'string',
        label: '全名 / Full Name',
        required: true
      },
      chineseName: {
        type: 'string',
        label: '中文名 / Chinese Name'
      },
      englishName: {
        type: 'string',
        label: '英文名 / English Name'
      },
      birthDate: {
        type: 'date',
        label: '出生日期 / Birth Date'
      },
      birthPlace: {
        type: 'string',
        label: '出生地 / Birth Place'
      },
      height: {
        type: 'string',
        label: '身高 / Height'
      },
      weight: {
        type: 'string',
        label: '体重 / Weight'
      },
      position: {
        type: 'string',
        label: '场上位置 / Position'
      },
      jerseyNumber: {
        type: 'string',
        label: '球衣号码 / Jersey Number'
      },
      team: {
        type: 'string',
        label: '当前球队 / Current Team'
      },
      bio: {
        type: 'area',
        label: '个人简介 / Biography',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {}
          }
        }
      },
      profileImage: {
        type: 'area',
        label: '个人照片 / Profile Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      socialMedia: {
        type: 'array',
        label: '社交媒体 / Social Media',
        titleField: 'platform',
        fields: {
          add: {
            platform: {
              type: 'string',
              label: '平台 / Platform'
            },
            handle: {
              type: 'string',
              label: '账号 / Handle'
            },
            url: {
              type: 'url',
              label: '链接 / URL'
            }
          }
        }
      }
    },
    group: {
      basic: {
        label: '基本信息 / Basic Info',
        fields: ['fullName', 'chineseName', 'englishName', 'birthDate', 'birthPlace']
      },
      physical: {
        label: '身体数据 / Physical Info',
        fields: ['height', 'weight', 'position', 'jerseyNumber', 'team']
      },
      content: {
        label: '内容 / Content',
        fields: ['bio', 'profileImage']
      },
      social: {
        label: '社交媒体 / Social Media',
        fields: ['socialMedia']
      }
    }
  }
}; 