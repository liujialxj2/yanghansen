export default {
  options: {
    // 确保key与环境变量APOS_EXTERNAL_FRONT_KEY匹配
    key: 'hansen-website-key',
    cors: {
      // 允许前端访问的域名
      origin: [
        'http://localhost:4321'
      ]
    },
    // 指定需要暴露的API端点
    endpoints: {
      '@apostrophecms/page': {
        find: true
      },
      'article': {
        find: true
      },
      'personal-info-piece': {
        find: true
      },
      'career-stats-piece': {
        find: true
      },
      '@apostrophecms/global': {
        find: true
      }
    }
  }
}; 