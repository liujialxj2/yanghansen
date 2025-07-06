const heroFields = require('../../lib/schema-mixins/hero-fields.js');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Hero Section',
    icon: 'sign-text-icon',
    previewImage: 'svg',
    description: 'A full-width or split hero section with background image or video.'
  },
  fields: {
    add: heroFields
  }
};
