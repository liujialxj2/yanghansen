export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: {
      zh: '个人信息',
      en: 'Personal Information'
    },
    pluralLabel: {
      zh: '个人信息',
      en: 'Personal Information'
    },
    // 最多只允许一条记录
    singleton: true
  },
  fields: {
    add: {
      fullName: {
        type: 'string',
        label: {
          zh: '全名',
          en: 'Full Name'
        },
        required: true,
        def: '杨瀚森 (Hansen Yang)'
      },
      chineseName: {
        type: 'string',
        label: {
          zh: '中文名',
          en: 'Chinese Name'
        },
        def: '杨瀚森'
      },
      englishName: {
        type: 'string',
        label: {
          zh: '英文名',
          en: 'English Name'
        },
        def: 'Hansen Yang'
      },
      birthDate: {
        type: 'date',
        label: {
          zh: '出生日期',
          en: 'Birth Date'
        },
        def: '2005-06-26'
      },
      birthPlace: {
        type: 'string',
        label: {
          zh: '出生地',
          en: 'Birth Place'
        },
        def: '中国山东省淄博市'
      },
      height: {
        type: 'float',
        label: {
          zh: '身高 (米)',
          en: 'Height (m)'
        },
        def: 2.16
      },
      heightFeet: {
        type: 'string',
        label: {
          zh: '身高 (英尺)',
          en: 'Height (ft)'
        },
        def: "7'1\""
      },
      weight: {
        type: 'float',
        label: {
          zh: '体重 (公斤)',
          en: 'Weight (kg)'
        },
        def: 113
      },
      weightLbs: {
        type: 'float',
        label: {
          zh: '体重 (磅)',
          en: 'Weight (lbs)'
        },
        def: 249
      },
      position: {
        type: 'select',
        label: {
          zh: '位置',
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
            value: 'power-forward'
          },
          {
            label: {
              zh: '小前锋',
              en: 'Small Forward'
            },
            value: 'small-forward'
          },
          {
            label: {
              zh: '得分后卫',
              en: 'Shooting Guard'
            },
            value: 'shooting-guard'
          },
          {
            label: {
              zh: '控球后卫',
              en: 'Point Guard'
            },
            value: 'point-guard'
          }
        ],
        def: 'center'
      },
      jerseyNumber: {
        type: 'integer',
        label: {
          zh: '球衣号码',
          en: 'Jersey Number'
        },
        def: 16
      },
      team: {
        type: 'string',
        label: {
          zh: '现役球队',
          en: 'Current Team'
        },
        def: '波特兰开拓者队 (Portland Trail Blazers)'
      },
      wingspan: {
        type: 'float',
        label: {
          zh: '臂展 (米)',
          en: 'Wingspan (m)'
        },
        def: 2.20
      },
      wingspanFeet: {
        type: 'string',
        label: {
          zh: '臂展 (英尺)',
          en: 'Wingspan (ft)'
        },
        def: "7'2.75\""
      },
      profilePhoto: {
        type: 'area',
        label: {
          zh: '个人照片',
          en: 'Profile Photo'
        },
        options: {
          widgets: {
            '@apostrophecms/image': {}
          },
          max: 1
        }
      },
      actionPhotos: {
        type: 'area',
        label: {
          zh: '比赛照片',
          en: 'Action Photos'
        },
        options: {
          widgets: {
            '@apostrophecms/image': {}
          },
          max: 10
        }
      },
      shortBio: {
        type: 'string',
        label: {
          zh: '简介',
          en: 'Short Bio'
        },
        textarea: true
      },
      fullBio: {
        type: 'area',
        label: {
          zh: '详细介绍',
          en: 'Full Bio'
        },
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'strike',
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
                  tag: 'h3',
                  label: {
                    zh: '小标题',
                    en: 'Heading 3'
                  }
                },
                {
                  tag: 'h4',
                  label: {
                    zh: '小标题',
                    en: 'Heading 4'
                  }
                }
              ]
            },
            '@apostrophecms/image': {}
          }
        }
      },
      hometown: {
        type: 'string',
        label: {
          zh: '家乡',
          en: 'Hometown'
        },
        def: '中国山东省淄博市'
      },
      familyBackground: {
        type: 'area',
        label: {
          zh: '家庭背景',
          en: 'Family Background'
        },
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'strike',
                'link',
                'bullet_list',
                'ordered_list'
              ]
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
        fields: [
          'fullName',
          'chineseName',
          'englishName',
          'birthDate',
          'birthPlace',
          'hometown'
        ]
      },
      physical: {
        label: {
          zh: '身体数据',
          en: 'Physical Data'
        },
        fields: [
          'height',
          'heightFeet',
          'weight',
          'weightLbs',
          'wingspan',
          'wingspanFeet'
        ]
      },
      basketball: {
        label: {
          zh: '篮球信息',
          en: 'Basketball Info'
        },
        fields: [
          'position',
          'jerseyNumber',
          'team'
        ]
      },
      media: {
        label: {
          zh: '媒体资源',
          en: 'Media'
        },
        fields: [
          'profilePhoto',
          'actionPhotos'
        ]
      },
      bio: {
        label: {
          zh: '个人简介',
          en: 'Biography'
        },
        fields: [
          'shortBio',
          'fullBio',
          'familyBackground'
        ]
      }
    }
  }
}; 