/*
 * @package inventory
 */

import template from './sw-blog-detail.html.twig';
import './sw-blog-detail.scss';

const { Component,Context, Mixin, Data: { Criteria } } = Shopware;
const { EntityCollection } = Shopware.Data;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

Component.register('sw-blog-detail', {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification'),
        Mixin.getByName('discard-detail-page-changes')('blog'),
    ],

    shortcuts: {
        'SYSTEMKEY+S': 'onSave',
        ESCAPE: 'onCancel',
    },

    props: {
        blogId: {
            type: String,
            required: false,
            default: null,
        },
    },

    data() {
        return {
            blog: null,
            category: [],
            product: [],
            billingCategories: null,
            billingProducts: null,
            customFieldSets: [],
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(this.identifier),
        };
    },

    computed: {
        identifier() {
            return this.placeholder(this.blog, 'name');
        },

        productRepository(){
            return this.repositoryFactory.create('product');
        },

        categoryRepository(){
            return this.repositoryFactory.create('blog_category');
        },

        blogIsLoading() {
            return this.isLoading || this.blog == null;
        },

        blogRepository() {
            return this.repositoryFactory.create('blog_child');
        },

        customFieldSetRepository() {
            return this.repositoryFactory.create('custom_field_set');
        },

        customFieldSetCriteria() {
            const criteria = new Criteria(1, null);
            criteria.addFilter(
                Criteria.equals('relations.entityName', 'blog_child'),
            );

            return criteria;
        },

        tooltipSave() {
            if (this.acl.can('blog_child.editor')) {
                const systemKey = this.$device.getSystemKey();

                return {
                    message: `${systemKey} + S`,
                    appearance: 'light',
                };
            }

            return {
                showDelay: 300,
                message: this.$tc('sw-privileges.tooltip.warning'),
                disabled: this.acl.can('order.editor'),
                showOnDisabledElements: true,
            };
        },

        tooltipCancel() {
            return {
                message: 'ESC',
                appearance: 'light',
            };
        },

        ...mapPropertyErrors(
            'blog', [
                'name',
                'authorName',
                'releaseDate',
                'category',
                'product',
                'description'
            ]),
    },

    watch: {
        blogId() {
            this.createdComponent();
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.billingCategories = new EntityCollection(
                this.categoryRepository.route,
                this.categoryRepository.entityName,
                Context.api,
            );

            this.billingProducts = new EntityCollection(
                this.productRepository.route,
                this.productRepository.entityName,
                Context.api,
            );

            Shopware.ExtensionAPI.publishData({
                id: 'sw-blog-detail__blog',
                path: 'blog',
                scope: this,
            });
            if (this.blogId) {
                this.loadEntityData();
                return;
            }

            Shopware.State.commit('context/resetLanguageToDefault');
            this.blog = this.blogRepository.create();
        },

        setCategoryIds(categories) {
            this.categoryIds = categories.getIds();
            this.billingCategories = categories;
            this.blog.categoryIds=categories.getIds();
            this.blog.blogCategories=categories;
        },

        setProductIds(products) {
            this.productIds = products.getIds();
            this.billingProducts = products;
            this.blog.productIds=products.getIds();
            this.blog.productCategories=products;
        },

        async loadEntityData() {
            this.isLoading = true;
            const blogCriteria = new Criteria();
            blogCriteria.addFilter(Criteria.equals('id',this.blogId))
            blogCriteria.addAssociation('blogCategories');
            blogCriteria.addAssociation('productCategories');
            this.blogRepository.search(blogCriteria,Context.api).then((res)=>{
                this.blog=res[0];
                this.billingCategories=this.blog.blogCategories;
                this.billingProducts=this.blog.productCategories;
            })

            // const [blogResponse, customFieldResponse] = await Promise.allSettled([
            //     this.blogRepository.get(this.blogId),
            //     this.customFieldSetRepository.search(this.customFieldSetCriteria),
            // ]);
            //
            // if (blogResponse.status === 'fulfilled') {
            //     this.blog = blogResponse.value;
            // }
            //
            // if (customFieldResponse.status === 'fulfilled') {
            //     this.customFieldSets = customFieldResponse.value;
            // }
            //
            // if (blogResponse.status === 'rejected' || customFieldResponse.status === 'rejected') {
            //     this.createNotificationError({
            //         message: this.$tc(
            //             'global.notification.notificationLoadingDataErrorMessage',
            //         ),
            //     });
            // }

            this.isLoading = false;
        },

        abortOnLanguageChange() {
            return this.blogcategoryRepository.hasChanges(this.blog);
        },

        saveOnLanguageChange() {
            return this.onSave();
        },

        onChangeLanguage() {
            this.loadEntityData();
        },

        onSave() {

            if (!this.acl.can('blog_child.editor')) {
                return;
            }
            this.isLoading = true;
            this.blogRepository.save(this.blog).then(() => {
                this.isLoading = false;
                this.isSaveSuccessful = true;
                if (this.blogId === null) {
                    this.$router.push({ name: 'sw.blog.detail', params: { id: this.blog.id } });
                    return;
                }

                this.loadEntityData();
            }).catch((exception) => {
            }).catch((exception) => {
                this.isLoading = false;
                this.createNotificationError({
                    message: this.$tc(
                        'global.notification.notificationSaveErrorMessageRequiredFieldsInvalid',
                    ),
                });
                throw exception;
            });
        },

        onCancel() {
            this.$router.push({ name: 'sw.blog.index' });
        },
    },
});
