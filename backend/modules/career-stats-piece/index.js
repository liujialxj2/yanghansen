module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '职业生涯数据 / Career Stats',
    pluralLabel: '职业生涯数据 / Career Stats',
    alias: 'careerStats',
    // 添加命令标签
    commandsLabel: '职业生涯数据 / Career Stats'
  },
  fields: {
    add: {
      season: {
        type: 'string',
        label: '赛季 / Season',
        required: true
      },
      team: {
        type: 'string',
        label: '球队 / Team',
        required: true
      },
      gamesPlayed: {
        type: 'integer',
        label: '出场次数 / Games Played',
        required: true
      },
      gamesStarted: {
        type: 'integer',
        label: '首发次数 / Games Started'
      },
      minutesPerGame: {
        type: 'float',
        label: '场均上场时间 / Minutes Per Game'
      },
      pointsPerGame: {
        type: 'float',
        label: '场均得分 / Points Per Game',
        required: true
      },
      assistsPerGame: {
        type: 'float',
        label: '场均助攻 / Assists Per Game'
      },
      reboundsPerGame: {
        type: 'float',
        label: '场均篮板 / Rebounds Per Game'
      },
      stealsPerGame: {
        type: 'float',
        label: '场均抢断 / Steals Per Game'
      },
      blocksPerGame: {
        type: 'float',
        label: '场均盖帽 / Blocks Per Game'
      },
      fieldGoalPercentage: {
        type: 'float',
        label: '投篮命中率 / Field Goal %'
      },
      threePointPercentage: {
        type: 'float',
        label: '三分命中率 / Three Point %'
      },
      freeThrowPercentage: {
        type: 'float',
        label: '罚球命中率 / Free Throw %'
      },
      highlights: {
        type: 'area',
        label: '赛季亮点 / Season Highlights',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      }
    },
    group: {
      basic: {
        label: '基本信息 / Basic Info',
        fields: ['season', 'team', 'gamesPlayed', 'gamesStarted', 'minutesPerGame']
      },
      stats: {
        label: '数据统计 / Statistics',
        fields: ['pointsPerGame', 'assistsPerGame', 'reboundsPerGame', 'stealsPerGame', 'blocksPerGame']
      },
      shooting: {
        label: '投篮数据 / Shooting',
        fields: ['fieldGoalPercentage', 'threePointPercentage', 'freeThrowPercentage']
      },
      content: {
        label: '内容 / Content',
        fields: ['highlights']
      }
    }
  }
}; 