/*
 * @package inventory
 */

import './page/sw-blogcategory-list';
import './page/sw-blogcategory-detail';
import './acl';
import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

import defaultSearchConfiguration from './default-search-configuration';

const { Module } = Shopware;

Module.register('sw-blogcategory', {
    type: 'core',
    name: 'blogcategory',
    title: 'sw-blogcategory.general.mainMenuItemGeneral',
    description: 'Add blog category of the application',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#57D9A3',
    icon: 'regular-products',
    favicon: 'icon-module-products.png',
    entity: 'blog_category',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'sw-blogcategory-list',
            },
            path: 'index',
            meta: {
                privilege: 'blog_category.viewer',
            },
        },
        create: {
            component: 'sw-blogcategory-detail',
            path: 'create',
            meta: {
                parentPath: 'sw.blogcategory.index',
                privilege: 'blog_category.creator',
            },
        },
        detail: {
            component: 'sw-blogcategory-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'sw.blogcategory.index',
                privilege: 'blog_category.viewer',
            },
            props: {
                default(route) {
                    return {
                        blogcategoryId: route.params.id,
                    };
                },
            },
        },
    },

    navigation: [{
        path: 'sw.blogcategory.index',
        privilege: 'blog_category.viewer',
        label: 'sw-blogcategory.general.mainMenuItemGeneral',
        id: 'sw-blogcategory',
        parent: 'sw-catalogue',
        color: '#57D9A3',
        position: 52,
    }],

    defaultSearchConfiguration,
});
