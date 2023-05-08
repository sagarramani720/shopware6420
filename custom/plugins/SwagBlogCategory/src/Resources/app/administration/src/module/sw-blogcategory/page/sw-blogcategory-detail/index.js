/*
 * @package inventory
 */

import template from './sw-blogcategory-detail.html.twig';
import './sw-blogcategory-detail.scss';

const { Component, Mixin, Data: { Criteria } } = Shopware;

const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

Component.register('sw-blogcategory-detail', {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification'),
        Mixin.getByName('discard-detail-page-changes')('blogcategory'),
    ],

    shortcuts: {
        'SYSTEMKEY+S': 'onSave',
        ESCAPE: 'onCancel',
    },

    props: {
        blogcategoryId: {
            type: String,
            required: false,
            default: null,
        },
    },


    data() {
        return {
            blogcategory: null,
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
            return this.placeholder(this.blogcategory, 'name');
        },

        blogcategoryIsLoading() {
            return this.isLoading || this.blogcategory == null;
        },

        blogcategoryRepository() {
            return this.repositoryFactory.create('blog_category');
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        customFieldSetRepository() {
            return this.repositoryFactory.create('custom_field_set');
        },

        customFieldSetCriteria() {
            const criteria = new Criteria(1, null);
            criteria.addFilter(
                Criteria.equals('relations.entityName', 'blog_category'),
            );

            return criteria;
        },

        mediaUploadTag() {
            return `sw-blogcategory-detail--${this.blogcategory.id}`;
        },

        tooltipSave() {
            if (this.acl.can('blog_category.editor')) {
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

        ...mapPropertyErrors('blogcategory', ['name']),
    },

    watch: {
        blogcategoryId() {
            this.createdComponent();
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            Shopware.ExtensionAPI.publishData({
                id: 'sw-blogcategory-detail__blogcategory',
                path: 'blogcategory',
                scope: this,
            });
            if (this.blogcategoryId) {
                this.loadEntityData();
                return;
            }

            Shopware.State.commit('context/resetLanguageToDefault');
            this.blogcategory = this.blogcategoryRepository.create();
        },

        async loadEntityData() {
            this.isLoading = true;

            const [blogcategoryResponse, customFieldResponse] = await Promise.allSettled([
                this.blogcategoryRepository.get(this.blogcategoryId),
                this.customFieldSetRepository.search(this.customFieldSetCriteria),
            ]);

            if (blogcategoryResponse.status === 'fulfilled') {
                this.blogcategory = blogcategoryResponse.value;
            }

            if (customFieldResponse.status === 'fulfilled') {
                this.customFieldSets = customFieldResponse.value;
            }

            if (blogcategoryResponse.status === 'rejected' || customFieldResponse.status === 'rejected') {
                this.createNotificationError({
                    message: this.$tc(
                        'global.notification.notificationLoadingDataErrorMessage',
                    ),
                });
            }

            this.isLoading = false;
        },

        abortOnLanguageChange() {
            return this.blogcategoryRepository.hasChanges(this.blogcategory);
        },

        saveOnLanguageChange() {
            return this.onSave();
        },

        onChangeLanguage() {
            this.loadEntityData();
        },

        setMediaItem({ targetId }) {
            this.blogcategory.mediaId = targetId;
        },

        setMediaFromSidebar(media) {
            this.blogcategory.mediaId = media.id;
        },

        onUnlinkLogo() {
            this.blogcategory.mediaId = null;
        },

        openMediaSidebar() {
            this.$refs.mediaSidebarItem.openContent();
        },

        onDropMedia(dragData) {
            this.setMediaItem({ targetId: dragData.id });
        },

        onSave() {
            if (!this.acl.can('blog_category.editor')) {
                return;
            }

            this.isLoading = true;

            this.blogcategoryRepository.save(this.blogcategory).then(() => {
                this.isLoading = false;
                this.isSaveSuccessful = true;
                if (this.blogcategoryId === null) {
                    this.$router.push({ name: 'sw.blogcategory.detail', params: { id: this.blogcategory.id } });
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
            this.$router.push({ name: 'sw.blogcategory.index' });
        },
    },
});
