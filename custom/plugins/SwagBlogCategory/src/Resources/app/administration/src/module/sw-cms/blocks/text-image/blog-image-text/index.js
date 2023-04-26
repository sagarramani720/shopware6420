import CMS from '../../../constant/sw-cms.constant';
import './component';
import './preview';

/**
 * @private since v6.5.0
 * @package content
 */
Shopware.Service('cmsService').registerCmsBlock({
    name: 'blog-image-text',
    label: 'sw-cms.blocks.text-image.blog-text-image.label',
    category: 'text-image',
    component: 'sw-cms-block-blog-image-text',
    previewComponent: 'sw-cms-preview-blog-image-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        left: {
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
        right: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h2 style="text-align: center;">First Image Cms Blog</h2>
                        <hr>
                        <p style="text-align: center;">An image is a visual representation of something, while a digital image is a binary representation of visual data. These images can take the form of photographs, graphics and individual video frames. For this purpose, an image is a picture that was created or copied and stored in electronic form.</p>`.trim(),
                    },
                },
            },
        },
    },
});
