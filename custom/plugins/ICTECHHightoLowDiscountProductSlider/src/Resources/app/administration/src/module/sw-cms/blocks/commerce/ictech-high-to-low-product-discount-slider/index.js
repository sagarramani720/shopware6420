import './component';
import './preview';
/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsElement({
    name: "ictech-product-discount-slider",
    label: "sw-cms.blocks.commerce.discountProductSlider.label",
    category: "commerce",
    component: "sw-cms-block-ictech-high-to-low-product-discount-slider",
    previewComponent: "sw-cms-preview-ictech-high-to-low-product-discount-slider",
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        discountProductSlider: 'ictech-product-discount-slider',
    }
});
