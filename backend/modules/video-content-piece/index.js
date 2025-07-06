module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Video Content',
    pluralLabel: 'Video Contents',
    alias: 'video',
    commandsLabel: 'Video Content'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Video Title',
        required: true
      },
      videoUrl: {
        type: 'string',
        label: 'Video URL',
        help: 'YouTube, Vimeo or TikTok URL',
        required: true
      },
      description: {
        type: 'string',
        textarea: true,
        label: 'Description'
      },
      category: {
        type: 'select',
        label: 'Category',
        choices: [
          {
            label: 'Game Highlights',
            value: 'highlights'
          },
          {
            label: 'Interview',
            value: 'interview'
          },
          {
            label: 'Training',
            value: 'training'
          },
          {
            label: 'Behind the Scenes',
            value: 'behind-the-scenes'
          }
        ]
      },
      featuredVideo: {
        type: 'boolean',
        label: 'Featured Video'
      }
    },
    group: {
      basics: {
        label: 'Video Info',
        fields: ['title', 'videoUrl', 'description', 'category', 'featuredVideo']
      }
    }
  }
}; 