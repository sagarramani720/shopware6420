import './component';
import './preview';

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsBlock({
    name: 'blog-text',
    label: 'sw-cms.blocks.text.blog-text.label',
    category: 'text',
    component: 'sw-cms-block-blog-text',
    previewComponent: 'sw-cms-preview-blog-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        content: {
            type: 'blog-text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h2 style="text-align: center;">First blog-text cms</h2>
                        <p style="text-align: center;"><i>This is a first text-field cms block add in backend and show in storefront.
                        In this cms block show storefront side.
                        Very simple process to add and show cms text-field in storefront.</i></p>`.trim(),
                    },
                },
            },
        },
    },
});
