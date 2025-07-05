/**
 * 多语言工具库
 * Multilingual utilities for Hansen Yang website
 */

/**
 * 从URL路径中获取当前语言
 * Get current locale from URL path
 * @param {string} pathname - URL路径
 * @returns {string} 当前语言代码 'zh' 或 'en'
 */
export function getLocale(pathname) {
  // 如果路径以 '/en' 开头，则返回英语
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  // 默认为中文
  return 'zh';
}

/**
 * 根据当前语言获取本地化内容
 * Get localized content based on current language
 * @param {Object} content - 包含语言键的内容对象
 * @param {string} locale - 当前语言代码
 * @returns {string} 本地化内容
 */
export function getLocalizedContent(content, locale = 'zh') {
  if (!content) return '';
  
  // 如果内容是字符串，直接返回
  if (typeof content === 'string') {
    return content;
  }
  
  // 如果内容是对象，检查是否包含语言键
  if (typeof content === 'object' && content !== null) {
    if (content[locale]) {
      return content[locale];
    }
    
    // 如果找不到当前语言的内容，返回默认语言或第一个可用键
    if (content.zh) return content.zh;
    if (content.en) return content.en;
    
    // 如果都没有，返回第一个可用值
    const firstKey = Object.keys(content)[0];
    if (firstKey) return content[firstKey];
  }
  
  return '';
}

/**
 * 格式化日期为本地化格式
 * Format date to localized format
 * @param {string|Date} date - 日期字符串或Date对象
 * @param {string} locale - 当前语言代码
 * @returns {string} 格式化后的日期字符串
 */
export function formatLocalizedDate(date, locale = 'zh') {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  if (locale === 'zh') {
    return dateObj.toLocaleDateString('zh-CN', options);
  } else {
    return dateObj.toLocaleDateString('en-US', options);
  }
}

/**
 * 本地化数字格式
 * Format number to localized format
 * @param {number} num - 数字
 * @param {string} locale - 当前语言代码
 * @returns {string} 格式化后的数字字符串
 */
export function formatLocalizedNumber(num, locale = 'zh') {
  if (num === undefined || num === null) return '';
  
  if (locale === 'zh') {
    return num.toLocaleString('zh-CN');
  } else {
    return num.toLocaleString('en-US');
  }
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

/**
 * 获取当前URL的语言信息
 * @param {URL} url 当前URL
 * @returns {Object} 语言信息
 */
export function getLangInfo(url) {
  const pathname = url.pathname;
  const isEnglish = pathname.startsWith('/en');
  return {
    lang: isEnglish ? 'en' : 'zh',
    isDefault: !isEnglish
  };
}

/**
 * 本地化路径
 * @param {string} path 路径
 * @param {string} lang 语言代码
 * @returns {string} 本地化后的路径
 */
export function localizePath(path, lang) {
  if (lang === 'en') {
    // 如果路径已经以/en开头，则不需要添加
    if (path.startsWith('/en')) {
      return path;
    }
    // 否则添加/en前缀
    return `/en${path}`;
  }
  // 中文是默认语言，移除/en前缀
  return path.replace(/^\/en/, '');
} 