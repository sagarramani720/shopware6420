import './component';
import './config';
import './preview';

/**
 * @private since v6.5.0
 * @package content
 */
Shopware.Service('cmsService').registerCmsElement({
    name: 'blog-text',
    label: 'sw-cms.elements.blog-text.label',
    component: 'sw-cms-el-blog-text',
    configComponent: 'sw-cms-el-config-blog-text',
    previewComponent: 'sw-cms-el-preview-blog-text',
    defaultConfig: {
        content: {
            source: 'static',
            value: `
                <h2>First blog cms</h2>
                In this cms block show storefront side.
                        Very simple process to add and show cms text field in storefront.</i></p>`.trim(),
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
    },
});
