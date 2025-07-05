/**
 * ApostropheCMS API连接库
 * 提供与后端CMS的数据交互功能
 */

import apostrophe from '@apostrophecms/apostrophe-astro';

// 创建ApostropheCMS API客户端
export const apos = apostrophe.createApi({
  baseUrl: 'http://localhost:3000'
});

/**
 * 获取全局设置
 * @returns {Promise<Object>} 全局设置对象
 */
export async function getGlobalSettings() {
  try {
    const global = await apos.global.find();
    return global || {};
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return {};
  }
}

/**
 * 获取个人信息
 * @returns {Promise<Object>} 个人信息对象
 */
export async function getPersonalInfo() {
  try {
    const result = await apos['personal-info-piece'].find({
      limit: 1
    });
    return result.results[0] || null;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
}

/**
 * 获取职业生涯统计数据
 * @param {Object} options 查询选项
 * @returns {Promise<Array>} 职业生涯数据数组
 */
export async function getCareerStats(options = {}) {
  try {
    const result = await apos['career-stats-piece'].find({
      sort: { year: -1 },
      ...options
    });
    return result.results || [];
  } catch (error) {
    console.error('Error fetching career stats:', error);
    return [];
  }
}

/**
 * 获取页面数据
 * @param {string} slug 页面路径
 * @returns {Promise<Object>} 页面数据对象
 */
export async function getPage(slug) {
  try {
    const page = await apos.page.find({ slug });
    return page || null;
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return null;
  }
}

/**
 * 格式化图片URL
 * @param {Object} attachment 附件对象
 * @param {Object} options 选项
 * @returns {string} 格式化后的URL
 */
export function formatImageUrl(attachment, options = {}) {
  if (!attachment) return '';
  return apos.attachment.url(attachment, options);
} 