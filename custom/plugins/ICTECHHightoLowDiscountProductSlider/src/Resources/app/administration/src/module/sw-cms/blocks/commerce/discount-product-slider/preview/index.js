import template from './sw-cms-preview-discount-product-slider.html.twig';
import './sw-cms-preview-discount-product-slider.scss';

const { Component } = Shopware;

/**
 * @private since v6.5.0
 * @package content
 */
Component.register('sw-cms-preview-discount-product-slider', {
    template,
});
