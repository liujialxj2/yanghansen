/**
 * 多语言支持工具库
 * 为杨瀚森官网提供中英文双语支持
 */

/**
 * 从URL中获取当前语言信息
 * @param {URL} url 当前页面URL
 * @returns {Object} 语言信息对象，包含语言代码和是否为默认语言
 */
export function getLangInfo(url) {
  // 通过URL路径分析当前语言
  const pathname = url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  // 如果路径以/en开头，则当前语言为英文
  if (segments.length > 0 && segments[0] === 'en') {
    return {
      lang: 'en',
      isDefault: false
    };
  }
  
  // 默认语言为中文
  return {
    lang: 'zh',
    isDefault: true
  };
}

/**
 * 获取当前语言对应的翻译内容
 * @param {Object} content 包含多语言内容的对象
 * @param {string} lang 当前语言代码
 * @returns {string|Object} 当前语言的内容
 */
export function getLocalizedContent(content, lang) {
  if (!content) {
    return '';
  }
  
  // 如果内容是字符串或没有语言特定版本，直接返回
  if (typeof content === 'string' || !content[lang]) {
    return content;
  }
  
  // 返回当前语言对应的内容，或默认语言内容
  return content[lang] || content['zh'] || '';
}

/**
 * 生成另一种语言的URL
 * @param {URL} currentUrl 当前URL
 * @returns {string} 切换语言后的URL路径
 */
export function getAlternateLangUrl(currentUrl) {
  const { lang } = getLangInfo(currentUrl);
  const pathname = currentUrl.pathname;
  
  // 当前为默认语言(中文)，切换到英文
  if (lang === 'zh') {
    return `/en${pathname}`;
  }
  
  // 当前为英文，切换到中文
  return pathname.replace(/^\/en/, '');
}

/**
 * 判断给定URL是否为当前语言
 * @param {string} lang 语言代码
 * @param {URL} url 当前URL
 * @returns {boolean} 是否为当前语言
 */
export function isCurrentLang(lang, url) {
  const currentLang = getLangInfo(url).lang;
  return lang === currentLang;
}

/**
 * 根据当前语言获取日期格式化选项
 * @param {string} lang 语言代码
 * @returns {Object} 日期格式化选项
 */
export function getDateFormatOptions(lang) {
  if (lang === 'zh') {
    return {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
  }
  
  // 英文日期格式
  return {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
}

/**
 * 获取语言切换按钮文本
 * @param {string} lang 当前语言
 * @returns {string} 切换按钮文本
 */
export function getLanguageSwitchLabel(lang) {
  return lang === 'zh' ? 'English' : '中文';
} 