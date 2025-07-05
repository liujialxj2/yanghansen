export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: {
      zh: '职业生涯数据',
      en: 'Career Stats'
    },
    pluralLabel: {
      zh: '职业生涯数据',
      en: 'Career Stats'
    },
    quickCreate: false
  },
  commands: {
    add: {
      label: 'Add Career Stats',
      type: 'item'
    },
    edit: {
      label: 'Edit Career Stats',
      type: 'item'
    },
    manage: {
      label: 'Manage Career Stats',
      type: 'item'
    }
  },
  fields: {
    add: {
      season: {
        type: 'string',
        label: {
          zh: '赛季',
          en: 'Season'
        },
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
      league: {
        type: 'string',
        label: {
          zh: '联赛',
          en: 'League'
        },
        required: true
      },
      gamesPlayed: {
        type: 'integer',
        label: {
          zh: '出场次数',
          en: 'Games Played'
        },
        required: true
      },
      gamesStarted: {
        type: 'integer',
        label: {
          zh: '首发次数',
          en: 'Games Started'
        }
      },
      minutesPerGame: {
        type: 'float',
        label: {
          zh: '场均时间',
          en: 'Minutes Per Game'
        }
      },
      pointsPerGame: {
        type: 'float',
        label: {
          zh: '场均得分',
          en: 'Points Per Game'
        },
        required: true
      },
      reboundsPerGame: {
        type: 'float',
        label: {
          zh: '场均篮板',
          en: 'Rebounds Per Game'
        },
        required: true
      },
      offensiveReboundsPerGame: {
        type: 'float',
        label: {
          zh: '场均进攻篮板',
          en: 'Offensive Rebounds Per Game'
        }
      },
      defensiveReboundsPerGame: {
        type: 'float',
        label: {
          zh: '场均防守篮板',
          en: 'Defensive Rebounds Per Game'
        }
      },
      assistsPerGame: {
        type: 'float',
        label: {
          zh: '场均助攻',
          en: 'Assists Per Game'
        },
        required: true
      },
      stealsPerGame: {
        type: 'float',
        label: {
          zh: '场均抢断',
          en: 'Steals Per Game'
        }
      },
      blocksPerGame: {
        type: 'float',
        label: {
          zh: '场均盖帽',
          en: 'Blocks Per Game'
        }
      },
      turnoversPerGame: {
        type: 'float',
        label: {
          zh: '场均失误',
          en: 'Turnovers Per Game'
        }
      },
      foulsPerGame: {
        type: 'float',
        label: {
          zh: '场均犯规',
          en: 'Fouls Per Game'
        }
      },
      fieldGoalsMade: {
        type: 'float',
        label: {
          zh: '投篮命中数',
          en: 'Field Goals Made'
        }
      },
      fieldGoalsAttempted: {
        type: 'float',
        label: {
          zh: '投篮出手数',
          en: 'Field Goals Attempted'
        }
      },
      fieldGoalPercentage: {
        type: 'float',
        label: {
          zh: '投篮命中率',
          en: 'Field Goal Percentage'
        }
      },
      threePointsMade: {
        type: 'float',
        label: {
          zh: '三分命中数',
          en: 'Three Points Made'
        }
      },
      threePointsAttempted: {
        type: 'float',
        label: {
          zh: '三分出手数',
          en: 'Three Points Attempted'
        }
      },
      threePointPercentage: {
        type: 'float',
        label: {
          zh: '三分命中率',
          en: 'Three Point Percentage'
        }
      },
      freeThrowsMade: {
        type: 'float',
        label: {
          zh: '罚球命中数',
          en: 'Free Throws Made'
        }
      },
      freeThrowsAttempted: {
        type: 'float',
        label: {
          zh: '罚球出手数',
          en: 'Free Throws Attempted'
        }
      },
      freeThrowPercentage: {
        type: 'float',
        label: {
          zh: '罚球命中率',
          en: 'Free Throw Percentage'
        }
      },
      plusMinus: {
        type: 'float',
        label: {
          zh: '正负值',
          en: 'Plus/Minus'
        }
      },
      highlights: {
        type: 'array',
        label: {
          zh: '赛季亮点',
          en: 'Season Highlights'
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
            description: {
              type: 'string',
              label: {
                zh: '描述',
                en: 'Description'
              },
              textarea: true
            },
            date: {
              type: 'date',
              label: {
                zh: '日期',
                en: 'Date'
              }
            },
            image: {
              type: 'attachment',
              label: {
                zh: '图片',
                en: 'Image'
              },
              fileGroup: 'images'
            },
            videoUrl: {
              type: 'url',
              label: {
                zh: '视频链接',
                en: 'Video URL'
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
        fields: ['season', 'team', 'league', 'gamesPlayed', 'gamesStarted', 'minutesPerGame']
      },
      mainStats: {
        label: {
          zh: '主要数据',
          en: 'Main Stats'
        },
        fields: ['pointsPerGame', 'reboundsPerGame', 'assistsPerGame', 'stealsPerGame', 'blocksPerGame']
      },
      advancedStats: {
        label: {
          zh: '高级数据',
          en: 'Advanced Stats'
        },
        fields: [
          'offensiveReboundsPerGame',
          'defensiveReboundsPerGame',
          'turnoversPerGame',
          'foulsPerGame',
          'plusMinus'
        ]
      },
      shootingStats: {
        label: {
          zh: '投篮数据',
          en: 'Shooting Stats'
        },
        fields: [
          'fieldGoalsMade',
          'fieldGoalsAttempted',
          'fieldGoalPercentage',
          'threePointsMade',
          'threePointsAttempted',
          'threePointPercentage',
          'freeThrowsMade',
          'freeThrowsAttempted',
          'freeThrowPercentage'
        ]
      },
      highlights: {
        label: {
          zh: '赛季亮点',
          en: 'Season Highlights'
        },
        fields: ['highlights']
      }
    }
  }
}; 