import template from './sw-cms-el-config-discount-product-slider.html.twig';
import './sw-cms-el-config-discount-product-slider.scss';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

/**
 * @private since v6.5.0
 */
Component.register('sw-cms-el-config-discount-product-slider', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('category');
        },
        categorySelectContext() {
            return {
                ...Shopware.Context.api,
                inheritance: true,
            };
        },
        isProductPageType() {
            return this.cmsPageState?.currentPage?.type === 'product_detail';
        },
    },
    created() {
        this.createdComponent();
    },

    methods: {
        emitChanges(content) {
            if (content !== this.element.config.content.value) {
                this.element.config.content.value = content;
                this.$emit('element-update', this.element);
            }
        },

        createdComponent() {
            this.initElementConfig('discount-product-slider');
        },

        onChangeCategory(categoryId) {
            if (!categoryId) {
                this.element.config.category.value = null;
                this.$set(this.element.data, 'category', null);
            } else {
                this.categoryRepository.get(categoryId, this.categorySelectContext)
                    .then((category) => {
                        this.element.config.category.value = categoryId;
                        this.$set(this.element.data, 'category', category);
                    });
            }
            this.$emit('element-update', this.element);
        },
    },
});
