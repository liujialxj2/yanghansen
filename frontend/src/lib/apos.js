/**
 * ApostropheCMS API连接库
 * 提供与后端CMS的数据交互功能
 */

// 从环境变量获取API基础URL和密钥
const baseUrl = import.meta.env.APOS_HOST || 'http://localhost:3000';
const apiKey = import.meta.env.APOS_EXTERNAL_FRONT_KEY || 'hansen-website-key';

// 通用API请求函数
async function fetchApi(endpoint, options = {}) {
  try {
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'X-APOS-EXTERNAL-FRONT-KEY': apiKey,
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API错误: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API请求失败 ${endpoint}:`, error);
    throw error;
  }
}

/**
 * 获取全局设置
 * @returns {Promise<Object>} 全局设置对象
 */
export async function getGlobalSettings() {
  try {
    const data = await fetchApi('/api/v1/@apostrophecms/global');
    return data || {};
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
    const data = await fetchApi('/api/v1/personal-info-piece?limit=1');
    return data.results[0] || null;
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
    const queryParams = new URLSearchParams({
      sort: JSON.stringify({ year: -1 }),
      ...options
    }).toString();
    const data = await fetchApi(`/api/v1/career-stats-piece?${queryParams}`);
    return data.results || [];
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
    const data = await fetchApi(`/api/v1/@apostrophecms/page/${encodeURIComponent(slug)}`);
    return data || null;
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
  if (!attachment || !attachment._id) return '';
  
  const size = options.size || 'full';
  return `${baseUrl}/uploads/attachments/${attachment._id}-${size}.${attachment.extension}`;
}

/**
 * 测试API连接
 * @returns {Promise<boolean>} 连接是否成功
 */
export async function testApiConnection() {
  try {
    await fetchApi('/api/v1/@apostrophecms/page/index');
    console.log('API连接成功!');
    return true;
  } catch (error) {
    console.error('API连接失败:', error);
    return false;
  }
}

/**
 * ApostropheCMS API客户端
 */
export const apos = {
  global: {
    find: async () => {
      return await getGlobalSettings();
    }
  },
  page: {
    find: async (slug) => {
      return await getPage(slug);
    }
  },
  personalInfo: {
    find: async () => {
      return await getPersonalInfo();
    }
  },
  careerStats: {
    find: async (options) => {
      return await getCareerStats(options);
    }
  },
  formatImageUrl,
  testConnection: testApiConnection
}; 