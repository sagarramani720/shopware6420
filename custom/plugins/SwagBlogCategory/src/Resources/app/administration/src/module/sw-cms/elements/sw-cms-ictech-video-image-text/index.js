import './component';
import './preview';
import './config';

/**
 * @private since v6.5.0
 * @package content
 */

Shopware.Service('cmsService').registerCmsElement({
    name: 'video-image-text',
    label: 'sw-cms.elements.videoImageText.label',
    component: 'sw-cms-el-ictech-video-image-text',
    configComponent: 'sw-cms-el-ictech-config-video-image-text',
    previewComponent: 'sw-cms-el-ictech-preview-video-image-text',
    defaultConfig: {
        videoID: {
            source: 'static',
            value: '',
            required: true,
        },
        autoPlay: {
            source: 'static',
            value: false,
        },
        loop: {
            source: 'static',
            value: false,
        },
        showControls: {
            source: 'static',
            value: true,
        },
        start: {
            source: 'static',
            value: null,
        },
        end: {
            source: 'static',
            value: null,
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        advancedPrivacyMode: {
            source: 'static',
            value: true,
        },
        needsConfirmation: {
            source: 'static',
            value: false,
        },
        previewMedia: {
            source: 'static',
            value: null,
            entity: {
                name: 'media',
            },
        },
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media',
            },
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
