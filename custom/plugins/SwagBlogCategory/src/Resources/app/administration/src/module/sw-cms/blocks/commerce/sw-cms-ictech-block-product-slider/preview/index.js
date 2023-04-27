import template from './sw-cms-ictech-preview-product-slider.html.twig';
import './sw-cms-ictech-preview-product-slider.scss';

const { Component } = Shopware;

/**
 * @private since v6.5.0
 * @package content
 */

Component.register('sw-cms-preview-ictech-product-slider', {
    template,
});
