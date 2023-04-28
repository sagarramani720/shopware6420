import './component';
import './preview';
import CMS from "../../../constant/sw-cms.constant";

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
        image: {
            type: 'image',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'standard' },
                },
                data: {
                    media: {
                        value: CMS.MEDIA.previewMountain,
                        source: 'default',
                    },
                },
            },
        },
        content: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h2 style="text-align: center;">First Video Image Text Cms!</h2>
                        <hr>
                        <p style="text-align: center;"> Image result for simple textbox image text description
                        A text box is an object you can add to your document that lets you put and type
                        text anywhere in your file..</p>`.trim(),
                    },
                },
            },
        },
        video: 'youtube-video',
    },
});
