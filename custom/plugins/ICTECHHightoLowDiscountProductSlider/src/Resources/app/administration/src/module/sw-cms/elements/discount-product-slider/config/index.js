import template from './sw-cms-el-config-discount-product-slider.html.twig';
import './sw-cms-el-config-discount-product-slider.scss';

const { Component, Mixin } = Shopware;
const { Criteria, EntityCollection } = Shopware.Data;

/**
 * @private since v6.5.0
 * @package content
 */
Component.register('sw-cms-el-config-discount-product-slider', {
    template,

    inject: ['repositoryFactory', 'feature'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {

        };
    },

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
        categoryCriteria() {
            const criteria = new Criteria(1, 25);
            return criteria;
        },
        selectedCategoryCriteria() {
            const criteria = new Criteria(1, 25);
            return criteria;
        },
        isCategoryPageType() {
            return this.cmsPageState?.currentPage?.type === 'category_detail';
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('discount-product-slider');
        },
        onCategoryChange(categoryId) {
            if (!categoryId) {
                this.element.config.category.value = null;
                this.$set(this.element.data, 'category', null);
            } else {
                this.categoryRepository.get(categoryId, this.categorySelectContext, this.selectedCategoryCriteria)
                    .then((category) => {
                        this.element.config.category.value = categoryId;
                        this.$set(this.element.data, 'category', category);
                    });
            }

            this.$emit('element-update', this.element);
        },
    },
});
