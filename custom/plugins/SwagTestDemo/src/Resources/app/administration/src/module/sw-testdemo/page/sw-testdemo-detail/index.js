/*
 * @package inventory
 */

import template from './sw-testdemo-detail.html.twig';
import './sw-testdemo-detail.scss';

const { Component, Mixin, Data: { Criteria } } = Shopware;

const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

Component.register('sw-testdemo-detail', {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification'),
        Mixin.getByName('discard-detail-page-changes')('testdemo'),
    ],

    shortcuts: {
        'SYSTEMKEY+S': 'onSave',
        ESCAPE: 'onCancel',
    },

    props: {
        testdemoId: {
            type: Object,
            required: false,

        },

        disabled: {
            type: Boolean,
            required: false,
            default: null,
        },
    },

    data() {
        return {
            testdemo: [],
            country: [],
            states: [],
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
            return this.placeholder(this.testdemo, 'name');
        },

        countryRepository() {
            return this.repositoryFactory.create('country');
        },

        countryStateRepository() {
            return this.repositoryFactory.create('country_state');
        },

        testdemoIsLoading() {
            return this.isLoading || this.testdemo == null;
        },

        testdemoRepository() {
            return this.repositoryFactory.create('test_demo');
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
                Criteria.equals('relations.entityName', 'test_demo'),
            );

            return criteria;
        },

        mediaUploadTag() {
            return `sw-testdemo-detail--${this.testdemo.id}`;
        },

        tooltipSave() {
            if (this.acl.can('test_demo.editor')) {
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

        ...mapPropertyErrors('testdemo', [
            'name',
            'city',
            'active',
            'countryId',
            'countryStateId',
            'imageId',
        ]),

        countryId: {
            get() {
                return this.testdemo.countryId;
            },

            set(countryId) {
                this.testdemo.countryId = countryId;
            },
        },

        countryCriteria() {
            const criteria = new Criteria(1, 25);
            criteria.addSorting(Criteria.sort('position', 'ASC'));
            return criteria;
        },

        stateCriteria() {
            if (!this.countryId) {
                return null;
            }

            const criteria = new Criteria(1, 25);
            criteria.addFilter(Criteria.equals('countryId', this.countryId));
            return criteria;
        },

        hasStates() {
            return this.states.length > 0;
        },
    },

    watch: {
        countryId: {
            immediate: true,
            handler(newId, oldId) {
                if (typeof oldId !== 'undefined') {
                    this.testdemo.countryStateId = null;
                }

                if (!this.countryId) {
                    this.country = null;
                    return Promise.resolve();
                }

                return this.countryRepository.get(this.countryId).then((country) => {
                    this.country = country;
                    this.getCountryStates();
                });
            },
        },

        testdemoId() {
            this.createdComponent();
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            Shopware.ExtensionAPI.publishData({
                id: 'sw-testdemo-detail__testdemo',
                path: 'testdemo',
                scope: this,
            });
            if (this.testdemoId) {
                this.loadEntityData();
                return;
            }

            Shopware.State.commit('context/resetLanguageToDefault');
            this.testdemo = this.testdemoRepository.create();
        },

        async loadEntityData() {
            this.isLoading = true;

            const [testdemoResponse, customFieldResponse] = await Promise.allSettled([
                this.testdemoRepository.get(this.testdemoId),
                this.customFieldSetRepository.search(this.customFieldSetCriteria),
            ]);

            if (testdemoResponse.status === 'fulfilled') {
                this.testdemo = testdemoResponse.value;
            }

            if (customFieldResponse.status === 'fulfilled') {
                this.customFieldSets = customFieldResponse.value;
            }

            if (testdemoResponse.status === 'rejected' || customFieldResponse.status === 'rejected') {
                this.createNotificationError({
                    message: this.$tc(
                        'global.notification.notificationLoadingDataErrorMessage',
                    ),
                });
            }

            this.isLoading = false;
        },

        getCountryStates() {
            if (!this.country) {
                return Promise.resolve();
            }

            return this.countryStateRepository.search(this.stateCriteria).then((response) => {
                this.states = response;
            });
        },

        abortOnLanguageChange() {
            return this.testdemoRepository.hasChanges(this.testdemo);
        },

        saveOnLanguageChange() {
            return this.onSave();
        },

        onChangeLanguage() {
            this.loadEntityData();
        },

        setMediaItem({ targetId }) {
            this.testdemo.mediaId = targetId;
        },

        setMediaFromSidebar(media) {
            this.testdemo.mediaId = media.id;
        },

        onUnlinkLogo() {
            this.testdemo.mediaId = null;
        },

        openMediaSidebar() {
            this.$refs.mediaSidebarItem.openContent();
        },

        onDropMedia(dragData) {
            this.setMediaItem({ targetId: dragData.id });
        },

        onSave() {
            if (!this.acl.can('test_demo.editor')) {
                return;
            }

            this.isLoading = true;

            this.testdemoRepository.save(this.testdemo).then(() => {
                this.isLoading = false;
                this.isSaveSuccessful = true;
                if (this.testdemoId === null) {
                    this.$router.push({ name: 'sw.testdemo.detail', params: { id: this.testdemo.id } });
                    return;
                }

                this.loadEntityData();
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
            this.$router.push({ name: 'sw.testdemo.index' });
        },
    },
});
