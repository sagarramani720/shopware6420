import './component';
import './preview';
/**
 * @private since v6.5.0
 * @package content
 */
Shopware.Service('cmsService').registerCmsBlock({
    name: 'ictech-product-slider',
    label: 'sw-cms.blocks.commerce.ictechProductSlider.label',
    category: 'commerce',
    component: 'sw-cms-block-ictech-product-slider',
    previewComponent: 'sw-cms-preview-ictech-product-slider',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        productSlider: 'ictech-product-slider',
    },
});
