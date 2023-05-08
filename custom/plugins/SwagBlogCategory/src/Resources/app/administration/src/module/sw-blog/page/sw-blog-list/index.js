/*
 * @package inventory
 */

import template from './sw-blog-list.html.twig';
import "./sw-blog-list.scss";

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('sw-blog-list', {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            blog: null,
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
        blogRepository() {
            return this.repositoryFactory.create('blog_child');
        },

        blogColumns() {
            return [{
                property: 'name',
                dataIndex: 'name',
                allowResize: true,
                routerLink: 'sw.blog.detail',
                label: 'sw-blog.list.columnName',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'description',
                dataIndex: 'description',
                allowResize: true,
                routerLink: 'sw.blog.detail',
                label: 'sw-blog.list.columnDescription',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'author',
                dataIndex: 'author',
                allowResize: true,
                routerLink: 'sw.blog.detail',
                label: 'sw-blog.list.columnAuthorName',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'release_date',
                dataIndex: 'release_date',
                allowResize: true,
                routerLink: 'sw.blog.detail',
                label: 'sw-blog.list.columnDate',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'active',
                dataIndex: 'active',
                allowResize: true,
                routerLink: 'sw.blog.detail',
                label: 'sw-blog.list.columnActive',
                inlineEdit: 'string',
                primary: true,
            },{
                property: 'createdAt',
                dataIndex: 'createdAt',
                allowResize: true,
                routerLink: 'sw.blog.detail',
                label: 'sw-blog.list.columnCreatedAt',
                inlineEdit: 'string',
                primary: true,
            }];
        },

        blogCriteria() {
            const blogCriteria = new Criteria(this.page, this.limit);

            blogCriteria.setTerm(this.term);
            blogCriteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));

            return blogCriteria;
        },
    },

    methods: {
        onChangeLanguage(languageId) {
            this.getList(languageId);
        },

        async getList() {
            this.isLoading = true;

            const criteria = await this.addQueryScores(this.term, this.blogCriteria);

            if (!this.entitySearchable) {
                this.isLoading = false;
                this.total = 0;

                return false;
            }

            if (this.freshSearchTerm) {
                criteria.resetSorting();
            }

            return this.blogRepository.search(criteria)
                .then(searchResult => {
                    this.blog = searchResult;
                    this.total = searchResult.total;
                    this.isLoading = false;
                });
        },

        updateTotal({ total }) {
            this.total = total;
        },
    },
});
