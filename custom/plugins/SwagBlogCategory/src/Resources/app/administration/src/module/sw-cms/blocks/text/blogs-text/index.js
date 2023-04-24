import './preview';
import './component';

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsBlock({
    name: 'done',
    label: 'sw-cms.blocks.text.blogs-text.label',
    category: 'text',
    component: 'sw-cms-block-blogs-text',
    previewComponent: 'sw-cms-preview-blogs-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        content: 'text',
    },
});
