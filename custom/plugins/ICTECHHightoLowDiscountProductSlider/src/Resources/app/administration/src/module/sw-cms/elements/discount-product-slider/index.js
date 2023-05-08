import './component';
import './config';
import './preview';

const Criteria = Shopware.Data.Criteria;
const criteria = new Criteria(1, 25);

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsElement({
    name: 'discount-product-slider',
    label: 'sw-cms.elements.discountProductSlider.label',
    component: 'sw-cms-el-discount-product-slider',
    configComponent: 'sw-cms-el-config-discount-product-slider',
    previewComponent: 'sw-cms-el-preview-discount-product-slider',
    defaultConfig: {
        category: {
            source: 'static',
            value: '',
            required: false,
            entity: {
                name: 'category',
                criteria: criteria,
            },
        },
        title: {
            source: 'static',
            value: '',
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        boxLayout: {
            source: 'static',
            value: 'standard',
        },
        navigation: {
            source: 'static',
            value: true,
        },
        rotate: {
            source: 'static',
            value: false,
        },
        border: {
            source: 'static',
            value: false,
        },
        elMinWidth: {
            source: 'static',
            value: '300px',
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
    },
    collect: Shopware.Service('cmsService').getCollectFunction(),
});
