/*
 * @package inventory
 */

import template from './sw-blogcategory-list.html.twig';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('sw-blogcategory-list', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            blogcategory: null,
            isLoading: true,
            sortBy: 'name',
            sortDirection: 'ASC',
            total: 0,
            searchConfigEntity: 'blog_category',
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        blogcategoryRepository() {
            return this.repositoryFactory.create('blog_category');
        },

        blogcategoryColumns() {
            return [{
                property: 'name',
                dataIndex: 'name',
                allowResize: true,
                routerLink: 'sw.blogcategory.detail',
                label: 'sw-blogcategory.list.columnName',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'createdAt',
                dataIndex:'createdAt',
                allowResize: true,
                routerLink:'sw.blogcategory.detail',
                label:'sw-blogcategory.list.columnCreatedAt',
                inlineEdit:'string',
                primary:true,
            }];
        },

        blogcategoryCriteria() {
            const blogcategoryCriteria = new Criteria(this.page, this.limit);

            blogcategoryCriteria.setTerm(this.term);
            blogcategoryCriteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));
            blogcategoryCriteria.addAssociation('country');
            blogcategoryCriteria.addAssociation('countryState');
            blogcategoryCriteria.addAssociation('product');
            return blogcategoryCriteria;
        },
    },

    methods: {
        onChangeLanguage(languageId) {
            this.getList(languageId);
        },

        async getList() {
            this.isLoading = true;

            const criteria = await this.addQueryScores(this.term, this.blogcategoryCriteria);

            if (!this.entitySearchable) {
                this.isLoading = false;
                this.total = 0;

                return false;
            }

            if (this.freshSearchTerm) {
                criteria.resetSorting();
            }

            return this.blogcategoryRepository.search(criteria)
                .then(searchResult => {
                    this.blogcategory = searchResult;
                    this.total = searchResult.total;
                    this.isLoading = false;
                });
        },

        updateTotal({ total }) {
            this.total = total;
        },
    },
});
