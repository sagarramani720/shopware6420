import './preview';
import './config';
import './component';

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsElement({
    name: 'blog-images',
    label: 'sw-cms.elements.image.label',
    component: 'sw-cms-el-blog-images',
    configComponent: 'sw-cms-el-config-blog-images',
    previewComponent: 'sw-cms-el-preview-blog-images',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media',
            },
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        url: {
            source: 'static',
            value: null,
        },
        newTab: {
            source: 'static',
            value: false,
        },
        minHeight: {
            source: 'static',
            value: '340px',
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
    },
});
