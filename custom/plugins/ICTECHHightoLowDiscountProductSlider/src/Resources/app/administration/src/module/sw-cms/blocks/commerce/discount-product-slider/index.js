import './component';
import './preview';

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsBlock({
    name: 'discount-product-slider',
    label: 'sw-cms.blocks.commerce.discountProductSlider.label',
    category: 'commerce',
    component: 'sw-cms-block-discount-product-slider',
    previewComponent: 'sw-cms-preview-discount-product-slider',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        discountProductSlider: 'discount-product-slider',
    },
});
