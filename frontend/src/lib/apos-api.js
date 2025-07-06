/**
 * ApostropheCMS API客户端
 * 提供与后端CMS的数据交互功能，包括getAposData函数
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
 * 获取ApostropheCMS页面数据
 * 替代useApostropheData函数
 */
export async function getAposData({ req, slug }) {
  try {
    // 获取页面数据
    const page = await fetchApi(`/api/v1/@apostrophecms/page/${encodeURIComponent(slug || 'index')}`);
    
    // 获取全局设置
    let global = {};
    try {
      global = await fetchApi('/api/v1/@apostrophecms/global');
    } catch (error) {
      console.error('Error fetching global settings:', error);
    }
    
    return {
      page,
      global,
      notFound: false
    };
  } catch (error) {
    console.error(`Error fetching page data for ${slug}:`, error);
    return {
      page: null,
      global: {},
      notFound: true
    };
  }
}

/**
 * 获取全局设置
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
 * 获取页面数据
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
 */
export function formatImageUrl(attachment, options = {}) {
  if (!attachment || !attachment._id) return '';
  
  const size = options.size || 'full';
  return `${baseUrl}/uploads/attachments/${attachment._id}-${size}.${attachment.extension}`;
}

/**
 * 测试API连接
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