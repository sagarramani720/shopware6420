import './preview';
import './config';
import './component';

const Criteria = Shopware.Data.Criteria;
const criteria = new Criteria(1, 25);
criteria.addAssociation('cover');

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsElement({
    name: 'ictech-product-slider',
    label: 'sw-cms.elements.ictech.productSlider.label',
    component: 'sw-cms-el-ictech-product-slider',
    configComponent: 'sw-cms-el-config-ictech-product-slider',
    previewComponent: 'sw-cms-el-preview-ictech-product-slider',
    defaultConfig: {
        products: {
            source: 'static',
            value: [],
            required: true,
            entity: {
                name: 'product',
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
        productStreamSorting: {
            source: 'static',
            value: 'name:ASC',
        },
        productStreamLimit: {
            source: 'static',
            value: 10,
        },
    },
    collect: Shopware.Service('cmsService').getCollectFunction(),
});