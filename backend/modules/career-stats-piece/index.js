export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: {
      zh: '职业数据',
      en: 'Career Stats'
    },
    pluralLabel: {
      zh: '职业数据',
      en: 'Career Stats'
    },
    quickCreate: false,
    sort: { year: -1 } // 默认按年份降序排序
  },
  fields: {
    add: {
      year: {
        type: 'integer',
        label: {
          zh: '赛季年份',
          en: 'Season Year'
        },
        required: true
      },
      season: {
        type: 'string',
        label: {
          zh: '赛季',
          en: 'Season'
        },
        required: true,
        help: {
          zh: '例如: 2023-24',
          en: 'e.g. 2023-24'
        }
      },
      league: {
        type: 'select',
        label: {
          zh: '联赛',
          en: 'League'
        },
        choices: [
          {
            label: 'CBA',
            value: 'cba'
          },
          {
            label: 'NBA',
            value: 'nba'
          },
          {
            label: {
              zh: '国家队',
              en: 'National Team'
            },
            value: 'national'
          },
          {
            label: {
              zh: '青年国家队',
              en: 'Youth National Team'
            },
            value: 'youth-national'
          }
        ],
        required: true
      },
      team: {
        type: 'string',
        label: {
          zh: '球队',
          en: 'Team'
        },
        required: true
      },
      competitionType: {
        type: 'select',
        label: {
          zh: '比赛类型',
          en: 'Competition Type'
        },
        choices: [
          {
            label: {
              zh: '常规赛',
              en: 'Regular Season'
            },
            value: 'regular'
          },
          {
            label: {
              zh: '季后赛',
              en: 'Playoffs'
            },
            value: 'playoffs'
          },
          {
            label: {
              zh: '世界杯',
              en: 'World Cup'
            },
            value: 'world-cup'
          },
          {
            label: {
              zh: '奥运会',
              en: 'Olympics'
            },
            value: 'olympics'
          },
          {
            label: {
              zh: '亚洲杯',
              en: 'Asia Cup'
            },
            value: 'asia-cup'
          },
          {
            label: {
              zh: '亚运会',
              en: 'Asian Games'
            },
            value: 'asian-games'
          },
          {
            label: {
              zh: '其他赛事',
              en: 'Other'
            },
            value: 'other'
          }
        ],
        required: true
      },
      gamesPlayed: {
        type: 'integer',
        label: {
          zh: '出场次数',
          en: 'Games Played'
        },
        required: true,
        def: 0
      },
      gamesStarted: {
        type: 'integer',
        label: {
          zh: '首发次数',
          en: 'Games Started'
        },
        required: true,
        def: 0
      },
      minutesPerGame: {
        type: 'float',
        label: {
          zh: '场均上场时间',
          en: 'Minutes Per Game'
        },
        required: true,
        def: 0
      },
      pointsPerGame: {
        type: 'float',
        label: {
          zh: '场均得分',
          en: 'Points Per Game'
        },
        required: true,
        def: 0
      },
      reboundsPerGame: {
        type: 'float',
        label: {
          zh: '场均篮板',
          en: 'Rebounds Per Game'
        },
        required: true,
        def: 0
      },
      offensiveReboundsPerGame: {
        type: 'float',
        label: {
          zh: '场均进攻篮板',
          en: 'Offensive Rebounds Per Game'
        },
        def: 0
      },
      defensiveReboundsPerGame: {
        type: 'float',
        label: {
          zh: '场均防守篮板',
          en: 'Defensive Rebounds Per Game'
        },
        def: 0
      },
      assistsPerGame: {
        type: 'float',
        label: {
          zh: '场均助攻',
          en: 'Assists Per Game'
        },
        required: true,
        def: 0
      },
      stealsPerGame: {
        type: 'float',
        label: {
          zh: '场均抢断',
          en: 'Steals Per Game'
        },
        required: true,
        def: 0
      },
      blocksPerGame: {
        type: 'float',
        label: {
          zh: '场均盖帽',
          en: 'Blocks Per Game'
        },
        required: true,
        def: 0
      },
      turnoversPerGame: {
        type: 'float',
        label: {
          zh: '场均失误',
          en: 'Turnovers Per Game'
        },
        def: 0
      },
      foulsPerGame: {
        type: 'float',
        label: {
          zh: '场均犯规',
          en: 'Fouls Per Game'
        },
        def: 0
      },
      fieldGoalPercentage: {
        type: 'float',
        label: {
          zh: '投篮命中率',
          en: 'Field Goal Percentage'
        },
        required: true,
        def: 0,
        help: {
          zh: '以小数形式输入，例如0.485',
          en: 'Enter as decimal, e.g. 0.485'
        }
      },
      threePointPercentage: {
        type: 'float',
        label: {
          zh: '三分命中率',
          en: 'Three Point Percentage'
        },
        required: true,
        def: 0,
        help: {
          zh: '以小数形式输入，例如0.350',
          en: 'Enter as decimal, e.g. 0.350'
        }
      },
      freeThrowPercentage: {
        type: 'float',
        label: {
          zh: '罚球命中率',
          en: 'Free Throw Percentage'
        },
        required: true,
        def: 0,
        help: {
          zh: '以小数形式输入，例如0.750',
          en: 'Enter as decimal, e.g. 0.750'
        }
      },
      fieldGoalsAttemptedPerGame: {
        type: 'float',
        label: {
          zh: '场均投篮出手次数',
          en: 'Field Goals Attempted Per Game'
        },
        def: 0
      },
      fieldGoalsMadePerGame: {
        type: 'float',
        label: {
          zh: '场均投篮命中次数',
          en: 'Field Goals Made Per Game'
        },
        def: 0
      },
      threePointersAttemptedPerGame: {
        type: 'float',
        label: {
          zh: '场均三分出手次数',
          en: 'Three Pointers Attempted Per Game'
        },
        def: 0
      },
      threePointersMadePerGame: {
        type: 'float',
        label: {
          zh: '场均三分命中次数',
          en: 'Three Pointers Made Per Game'
        },
        def: 0
      },
      freeThrowsAttemptedPerGame: {
        type: 'float',
        label: {
          zh: '场均罚球出手次数',
          en: 'Free Throws Attempted Per Game'
        },
        def: 0
      },
      freeThrowsMadePerGame: {
        type: 'float',
        label: {
          zh: '场均罚球命中次数',
          en: 'Free Throws Made Per Game'
        },
        def: 0
      },
      plusMinus: {
        type: 'float',
        label: {
          zh: '场均正负值',
          en: 'Plus/Minus'
        },
        def: 0
      },
      highlights: {
        type: 'area',
        label: {
          zh: '赛季高光',
          en: 'Season Highlights'
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
            },
            '@apostrophecms/image': {}
          }
        }
      },
      awards: {
        type: 'array',
        label: {
          zh: '赛季荣誉',
          en: 'Season Awards'
        },
        titleField: 'title',
        fields: {
          add: {
            title: {
              type: 'string',
              label: {
                zh: '奖项名称',
                en: 'Award Title'
              }
            },
            description: {
              type: 'string',
              label: {
                zh: '奖项描述',
                en: 'Award Description'
              },
              textarea: true
            },
            date: {
              type: 'date',
              label: {
                zh: '获奖日期',
                en: 'Award Date'
              }
            }
          }
        }
      }
    },
    group: {
      basic: {
        label: {
          zh: '基本信息',
          en: 'Basic Info'
        },
        fields: [
          'year',
          'season',
          'league',
          'team',
          'competitionType'
        ]
      },
      games: {
        label: {
          zh: '出场数据',
          en: 'Game Stats'
        },
        fields: [
          'gamesPlayed',
          'gamesStarted',
          'minutesPerGame'
        ]
      },
      basicStats: {
        label: {
          zh: '基础统计',
          en: 'Basic Statistics'
        },
        fields: [
          'pointsPerGame',
          'reboundsPerGame',
          'offensiveReboundsPerGame',
          'defensiveReboundsPerGame',
          'assistsPerGame',
          'stealsPerGame',
          'blocksPerGame',
          'turnoversPerGame',
          'foulsPerGame'
        ]
      },
      shooting: {
        label: {
          zh: '投篮数据',
          en: 'Shooting Stats'
        },
        fields: [
          'fieldGoalPercentage',
          'threePointPercentage',
          'freeThrowPercentage',
          'fieldGoalsAttemptedPerGame',
          'fieldGoalsMadePerGame',
          'threePointersAttemptedPerGame',
          'threePointersMadePerGame',
          'freeThrowsAttemptedPerGame',
          'freeThrowsMadePerGame'
        ]
      },
      advanced: {
        label: {
          zh: '高级统计',
          en: 'Advanced Stats'
        },
        fields: [
          'plusMinus'
        ]
      },
      achievements: {
        label: {
          zh: '成就',
          en: 'Achievements'
        },
        fields: [
          'highlights',
          'awards'
        ]
      }
    }
  }
}; 