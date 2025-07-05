/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "zh",
  locales: ["zh", "en"],
  load: ["server", "client"],
  i18nextServer: {
    debug: true,
    // 明确指定翻译文件加载路径
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json"
    }
  },
  i18nextClient: {
    debug: true
  },
  routing: {
    prefixDefaultLocale: false
  }
}; 