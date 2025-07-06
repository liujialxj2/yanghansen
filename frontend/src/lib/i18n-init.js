import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 配置i18next
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    defaultNS: 'translation',
    ns: ['translation', 'common'],
    resources: {
      zh: {
        translation: {
          nav: {
            home: "首页",
            about: "关于",
            career: "职业生涯",
            news: "新闻",
            videos: "视频",
            fanZone: "粉丝社区"
          },
          footer: {
            description: "杨瀚森官方网站，提供最新的新闻、统计数据和粉丝互动",
            quickLinks: "快速链接",
            followMe: "关注我",
            copyright: "© 2025 杨瀚森 Hansen Yang. All Rights Reserved."
          },
          home: {
            hero: {
              title: "杨瀚森官方网站",
              subtitle: "NBA新秀 | 开拓者队前锋",
              cta: "了解更多"
            },
            stats: {
              title: "赛季数据",
              description: "2023-2024赛季表现",
              points: "场均得分",
              rebounds: "场均篮板",
              assists: "场均助攻",
              blocks: "场均盖帽",
              vsPrevious: "较上赛季"
            },
            news: {
              title: "最新动态",
              viewAll: "查看全部"
            },
            media: {
              title: "精彩视频",
              viewAll: "查看全部"
            }
          }
        }
      },
      en: {
        translation: {
          nav: {
            home: "Home",
            about: "About",
            career: "Career",
            news: "News",
            videos: "Videos",
            fanZone: "Fan Zone"
          },
          footer: {
            description: "Hansen Yang's official website, providing the latest news, statistics and fan interactions",
            quickLinks: "Quick Links",
            followMe: "Follow Me",
            copyright: "© 2025 Hansen Yang. All Rights Reserved."
          },
          home: {
            hero: {
              title: "Hansen Yang Official Website",
              subtitle: "NBA Rookie | Portland Trail Blazers Forward",
              cta: "Learn More"
            },
            stats: {
              title: "Season Stats",
              description: "2023-2024 Season Performance",
              points: "Points Per Game",
              rebounds: "Rebounds Per Game",
              assists: "Assists Per Game",
              blocks: "Blocks Per Game",
              vsPrevious: "vs Previous Season"
            },
            news: {
              title: "Latest News",
              viewAll: "View All"
            },
            media: {
              title: "Featured Videos",
              viewAll: "View All"
            }
          }
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

export default i18next; 