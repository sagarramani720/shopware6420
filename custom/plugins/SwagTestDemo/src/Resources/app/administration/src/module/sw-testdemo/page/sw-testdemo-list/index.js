/*
 * @package inventory
 */

import template from './sw-testdemo-list.html.twig';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('sw-testdemo-list', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            testdemo: null,
            isLoading: true,
            sortBy: 'name',
            sortDirection: 'ASC',
            total: 0,
            searchConfigEntity: 'test_demo',
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        testdemoRepository() {
            return this.repositoryFactory.create('test_demo');
        },

        testdemoColumns() {
            return [{
                property: 'name',
                dataIndex: 'name',
                allowResize: true,
                routerLink: 'sw.testdemo.detail',
                label: 'sw-testdemo.list.columnName',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'city',
                dataIndex:'city',
                allowResize: true,
                routerLink:'sw.testdemo.detail',
                label:'sw-testdemo.list.columnCity',
                inlineEdit:'string',
                primary:true,
            },{
                property: 'active',
                dataIndex:'active',
                allowResize: true,
                routerLink:'sw.testdemo.detail',
                label:'sw-testdemo.list.columnActive',
                inlineEdit:'bool',
                primary:true,
            },{
                property: 'country',
                dataIndex:'country',
                allowResize: true,
                routerLink:'sw.testdemo.detail',
                label:'sw-testdemo.list.columnCountry',
                inlineEdit:'bool',
                primary:true,
            },{
                property: 'state',
                dataIndex:'state',
                allowResize: true,
                routerLink:'sw.testdemo.detail',
                label:'sw-testdemo.list.columnState',
                inlineEdit:'string',
                primary:true,
            },{
                property: 'image',
                dataIndex:'image',
                allowResize: true,
                routerLink:'sw.testdemo.detail',
                label:'sw-testdemo.list.columnMedia',
                inlineEdit:'string',
                primary:true,
            },{
                property: 'product',
                dataIndex:'product',
                allowResize: true,
                routerLink:'sw.testdemo.detail',
                label:'sw-testdemo.list.columnProduct',
                inlineEdit:'string',
                primary:true,
            }];
        },

        testdemoCriteria() {
            const testdemoCriteria = new Criteria(this.page, this.limit);

            testdemoCriteria.setTerm(this.term);
            testdemoCriteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));

            return testdemoCriteria;
        },
    },

    methods: {
        onChangeLanguage(languageId) {
            this.getList(languageId);
        },

        async getList() {
            this.isLoading = true;

            const criteria = await this.addQueryScores(this.term, this.testdemoCriteria);

            if (!this.entitySearchable) {
                this.isLoading = false;
                this.total = 0;

                return false;
            }

            if (this.freshSearchTerm) {
                criteria.resetSorting();
            }

            return this.testdemoRepository.search(criteria)
                .then(searchResult => {
                    this.testdemo = searchResult;
                    this.total = searchResult.total;
                    this.isLoading = false;
                });
        },

        updateTotal({ total }) {
            this.total = total;
        },
    },
});
