/*
 * @package inventory
 */

import './page/sw-blog-detail';
import './page/sw-blog-list';
import './acl';
// import './snippet/en-GB.json';
// import '/snippet/de-DE.json';

import defaultSearchConfiguration from './default-search-configuration';
import deDE from "../sw-blogcategory/snippet/de-DE.json";
import enGB from "../sw-blogcategory/snippet/en-GB.json";

const { Module } = Shopware;

Module.register('sw-blog',{
    type: "core",
    name: "blog",
    title: "sw-blog.general.mainMenuItemGeneral",
    description: 'Add blogs of the application',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#57D9A3',
    icon: 'regular-products',
    favicon: 'icon-module-products.png',
    entity: 'blog_child',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'sw-blog-list',
            },
            path: 'index',
            meta: {
                privilege: 'blog_child.viewer',
            },
        },
        create: {
            component: 'sw-blog-detail',
            path: 'create',
            meta: {
                parentPath: 'sw.blog.index',
                privilege: 'blog_child.creator',
            },
        },
        detail: {
            component: 'sw-blog-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'sw.blog.index',
                privilege: 'blog_child.viewer',
            },
            props: {
                default(route) {
                    return {
                        blogId: route.params.id,
                    };
                },
            },
        },
    },

    navigation: [{
        path: 'sw.blog.index',
        privilege: 'blog_child.viewer',
        label: 'sw-blog.general.mainMenuItemGeneral',
        id: 'sw-blog',
        parent: 'sw-catalogue',
        color: '#57D9A3',
        position: 51,
    }],

    defaultSearchConfiguration,
});


