const path = require('path');
const { readFileSync } = require('node:fs');
const { getWidgetGroups } = require('../../lib/helpers/area-widgets.js');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Grid Layout Widget',
    width: 'one-half',
    icon: 'view-grid',
    description: 'Create responsive CSS Grid-based layouts for your content.',
    previewImage: 'svg'
  },
  icons: {
    'view-grid': 'ViewGrid'
  },
  init(self) {
    self.apos.migration.add('fix-areas', self.migrateAreaNames);
  },
  // We need to pass fields as a function to allow for the preview HTML
  fields(self, options) {
    // Get base widget configuration for all areas
    const baseAreaConfig = getWidgetGroups({
      includeLayouts: true
    });

    // Read the preview HTML
    const previewHtml = readFileSync(
      path.join(__dirname, 'layoutPreviews.html'),
      'utf8'
    );

    const standardLayoutsCondition = {
      $or: [
        { layoutType: 'asideMain' },
        { layoutType: 'mainAside' },
        { layoutType: 'asideTwoMain' },
        { layoutType: 'twoMainAside' },
        { layoutType: 'headerTwoColFooter' },
        { layoutType: 'featuredThreeGrid' },
        { layoutType: 'magazineLayout' },
        { layoutType: 'contentHub' },
        { layoutType: 'galleryMasonry' },
        { layoutType: 'dashboardLayout' },
        { layoutType: 'productShowcase' }
      ]
    };

    return {
      add: {
        layoutType: {
          type: 'select',
          label: 'Layout Type',
          htmlHelp: previewHtml,
          required: true,
          choices: [
            {
              label: 'Aside + Main Content',
              value: 'asideMain'
            },
            {
              label: 'Main Content + Aside',
              value: 'mainAside'
            },
            {
              label: 'Aside + Two Main Sections',
              value: 'asideTwoMain'
            },
            {
              label: 'Two Main Sections + Aside',
              value: 'twoMainAside'
            },
            {
              label: 'Header + 2 Columns + Footer',
              value: 'headerTwoColFooter'
            },
            {
              label: 'Featured + 3 Column Grid',
              value: 'featuredThreeGrid'
            },
            {
              label: 'Magazine Layout',
              value: 'magazineLayout'
            },
            {
              label: 'Content Hub',
              value: 'contentHub'
            },
            {
              label: 'Gallery Masonry',
              value: 'galleryMasonry'
            },
            {
              label: 'Dashboard Layout',
              value: 'dashboardLayout'
            },
            {
              label: 'Product Showcase',
              value: 'productShowcase'
            },
            {
              label: 'Custom Grid',
              value: 'custom'
            }
          ]
        },
        maxWidth: {
          type: 'select',
          label: 'Maximum Content Width',
          choices: [
            { label: 'Full Width', value: '' },
            { label: 'Extra Narrow (768px)', value: 'max-width-768' },
            { label: 'Narrow (960px)', value: 'max-width-960' },
            { label: 'Medium (1152px)', value: 'max-width-1152' },
            { label: 'Wide (1344px)', value: 'max-width-1344' }
          ],
          def: ''
        },
        areaStyles: {
          type: 'object',
          label: 'Area Styling',
          if: standardLayoutsCondition,
          fields: {
            add: {
              minHeight: {
                type: 'string',
                label: 'Minimum Height',
                help: 'E.g., 200px, 50vh'
              },
              verticalAlign: {
                type: 'select',
                label: 'Vertical Alignment',
                choices: [
                  { label: 'Top', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'Bottom', value: 'end' },
                  { label: 'Stretch', value: 'stretch' }
                ],
                def: 'start'
              },
              horizontalAlign: {
                type: 'select',
                label: 'Horizontal Alignment',
                choices: [
                  { label: 'Left', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'end' },
                  { label: 'Stretch', value: 'stretch' }
                ],
                def: 'stretch'
              },
              gapOverride: {
                type: 'string',
                label: 'Custom Gap',
                help: 'Override default gap spacing'
              }
            }
          }
        },
        responsiveSettings: {
          type: 'object',
          label: 'Responsive Settings',
          fields: {
            add: {
              spacing: {
                type: 'object',
                label: 'Responsive Spacing',
                fields: {
                  add: {
                    tabletGap: {
                      type: 'string',
                      label: 'Grid Gap (Tablet) e.g., "10px" or "1rem"',
                      def: '0.75rem'
                    },
                    mobileGap: {
                      type: 'string',
                      label: 'Grid Gap (Mobile) e.g., "10px" or "1rem"',
                      def: '0.5rem'
                    }
                  }
                }
              }
            }
          }
        },
        mainContent: {
          type: 'area',
          label: 'Main Content Area',
          options: baseAreaConfig,
          if: standardLayoutsCondition
        },
        primaryAsideContent: {
          type: 'area',
          label: 'Primary Aside',
          options: baseAreaConfig,
          if: standardLayoutsCondition
        },
        secondaryAsideContent: {
          type: 'area',
          label: 'Secondary Aside or Main',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'twoMainAside' },
              { layoutType: 'asideTwoMain' },
              { layoutType: 'magazineLayout' },
              { layoutType: 'featuredThreeGrid' },
              { layoutType: 'galleryMasonry' },
              { layoutType: 'dashboardLayout' }
            ]
          }
        },
        // Layout-specific content areas
        headerContent: {
          type: 'area',
          label: 'Header Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'headerTwoColFooter'
          }
        },
        footerContent: {
          type: 'area',
          label: 'Footer Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'headerTwoColFooter'
          }
        },
        columnThreeContent: {
          type: 'area',
          label: 'Column Three',
          options: baseAreaConfig,
          if: {
            layoutType: 'featuredThreeGrid'
          }
        },
        headlineContent: {
          type: 'area',
          label: 'Headline Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        section1Content: {
          type: 'area',
          label: 'Footer Section 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        section2Content: {
          type: 'area',
          label: 'Footer Section 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        galleryBottomContent: {
          type: 'area',
          label: 'Bottom Footer Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'galleryMasonry'
          }
        },
        tertiaryAsideContent: {
          type: 'area',
          label: 'Tertiary Aside Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'dashboardLayout'
          }
        },
        related1Content: {
          type: 'area',
          label: 'Related Product 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        },
        related2Content: {
          type: 'area',
          label: 'Related Product 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        },
        related3Content: {
          type: 'area',
          label: 'Related Product 3',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        },
        customGrid: {
          type: 'object',
          label: 'Custom Grid Settings',
          if: {
            layoutType: 'custom'
          },
          fields: {
            add: {
              rows: {
                type: 'integer',
                label: 'Number of Rows',
                def: 2
              },
              columns: {
                type: 'integer',
                label: 'Number of Columns',
                def: 2
              },
              gap: {
                type: 'string',
                label: 'Grid Gap',
                help: 'Set the spacing between grid items, e.g., "10px" or "1rem".',
                def: '10px'
              },
              padding: {
                type: 'string',
                label: 'Grid Padding',
                help: 'Set the padding for the grid container, e.g., "20px" or "2rem".',
                def: '0px'
              },
              margin: {
                type: 'string',
                label: 'Grid Margin',
                help: 'Set the margin for the grid container, e.g., "20px" or "2rem".',
                def: '0px'
              },
              contentAreas: {
                type: 'array',
                label: 'Content Areas',
                titleField: 'name',
                fields: {
                  add: {
                    name: {
                      type: 'string',
                      label: 'Grid Area Name'
                    },
                    rowStart: {
                      type: 'integer',
                      label: 'Row Start'
                    },
                    rowSpan: {
                      type: 'integer',
                      label: 'Row Span',
                      def: 1
                    },
                    colStart: {
                      type: 'integer',
                      label: 'Column Start'
                    },
                    colSpan: {
                      type: 'integer',
                      label: 'Column Span',
                      def: 1
                    },
                    tabletColSpan: {
                      type: 'integer',
                      label: 'Column Span (Tablet)',
                      help: 'Number of columns this area should span on tablet devices',
                      def: null
                    },
                    minHeight: {
                      type: 'string',
                      label: 'Minimum Height'
                    },
                    verticalAlign: {
                      type: 'select',
                      label: 'Vertical Alignment',
                      choices: [
                        { label: 'Top', value: 'start' },
                        { label: 'Center', value: 'center' },
                        { label: 'Bottom', value: 'end' },
                        { label: 'Stretch', value: 'stretch' }
                      ],
                      def: 'start'
                    },
                    content: {
                      type: 'area',
                      label: 'Content',
                      options: baseAreaConfig
                    }
                  }
                }
              }
            }
          }
        },
        addOverride: {
          type: 'boolean',
          label: 'Add CSS target override?',
          help: 'Check this box to add an additional class for custom CSS targeting.',
        },
        overrideClass: {
          type: 'string',
          label: 'Override Class',
          help: 'Add a custom class for CSS targeting.',
          if: {
            addOverride: true
          }
        }
      }
    };
  },
  methods(self) {
    return {
      async migrateAreaNames() {
        // Track updates for logging
        let widgetsUpdated = 0;

        await self.apos.migration.eachWidget(
          {},
          async (doc, widget, dotPath) => {
            if (widget.type !== 'grid-layout') {
              return;
            };
            const updates = {};
            let hasUpdates = false;

            // Handle layout type changes
            if (widget.layoutType === 'asideMainThree') {
              updates[`${dotPath}.layoutType`] = 'asideMain';
              hasUpdates = true;

              // Map specific areas to standardized areas
              if (widget.asideContent) {
                updates[`${dotPath}.primaryAsideContent`] = widget.asideContent;
                updates[`${dotPath}.asideContent`] = null;
                hasUpdates = true;
              }
            }
            else if (widget.layoutType === 'mainAsideThree') {
              updates[`${dotPath}.layoutType`] = 'mainAside';
              hasUpdates = true;

              // Map specific areas to standardized areas
              if (widget.asideContent) {
                updates[`