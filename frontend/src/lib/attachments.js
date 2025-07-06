const MISSING_ATTACHMENT_URL = '/images/missing-icon.svg';

/**
 * 获取附件URL，带可选的尺寸参数
 * @param {Object} attachment - 附件对象
 * @param {Object} options - 选项
 * @param {string} options.size - 尺寸名称（如'full'、'one-third'等）
 * @returns {string} 附件URL
 */
export function getAttachmentUrl(attachment, options = {}) {
  if (!attachment || !attachment._urls) {
    return '';
  }

  const size = options.size || 'full';
  return attachment._urls[size] || attachment._urls.full || attachment._url;
}

/**
 * 生成响应式图片srcset
 * @param {Object} attachment - 附件对象
 * @param {Object} options - 选项
 * @param {Array} options.sizes - 自定义尺寸配置
 * @returns {string} srcset字符串
 */
export function getAttachmentSrcset(attachment, options = {}) {
  if (!attachment || !attachment._urls) {
    return '';
  }

  const defaultSizes = [
    { name: 'one-sixth', width: 190 },
    { name: 'one-third', width: 380 },
    { name: 'one-half', width: 570 },
    { name: 'two-thirds', width: 760 },
    { name: 'full', width: 1140 },
    { name: 'max', width: 1600 }
  ];
  
  const sizes = options.sizes || defaultSizes;
  
  return sizes
    .filter(size => attachment._urls[size.name])
    .map(size => `${attachment._urls[size.name]} ${size.width}w`)
    .join(', ');
  }

/**
 * 获取图片焦点，用于object-position
 * @param {Object} attachment - 附件对象
 * @param {string} defaultValue - 默认值
 * @returns {string} 焦点坐标
 */
export function getFocalPoint(attachment, defaultValue = 'center center') {
  if (!attachment || !attachment._focal) {
    return defaultValue;
  }

  const { x, y } = attachment._focal;
  return `${x * 100}% ${y * 100}%`;
}

/**
 * 获取图片宽度，尊重裁剪设置
 * @param {Object} attachment - 附件对象
 * @returns {number} 宽度
 */
export function getWidth(attachment) {
  if (!attachment) {
    return 0;
  }
  
  return attachment._crop ? attachment._crop.width : attachment.width;
}

/**
 * 获取图片高度，尊重裁剪设置
 * @param {Object} attachment - 附件对象
 * @returns {number} 高度
 */
export function getHeight(attachment) {
  if (!attachment) {
    return 0;
  }

  return attachment._crop ? attachment._crop.height : attachment.height;
}