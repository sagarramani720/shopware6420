import template from './sw-cms-block-blog-image-text.html.twig';
import './sw-cms-block-blog-image-text.scss';

const { Component } = Shopware;

/**
 * @private since v6.5.0
 * @package content
 */
Component.register('sw-cms-block-blog-image-text', {
    template,
});
