import './component';
import './preview';

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsBlock({
    name: 'ictech-video-image-text',
    label: 'sw-cms.blocks.commerce.ictechVideoImageText.label',
    category: 'commerce',
    component: 'sw-cms-block-ictech-video-image-text',
    previewComponent: 'sw-cms-preview-ictech-video-image-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        productSlider: 'ictech-video-image-text',
    },
});
