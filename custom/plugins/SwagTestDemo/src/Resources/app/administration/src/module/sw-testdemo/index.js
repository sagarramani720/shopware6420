/*
 * @package inventory
 */

import './page/sw-testdemo-list';
import './page/sw-testdemo-detail';
import './acl';
import deGB from './snippet/de-DE';
import enGB from './snippet/en-GB';

import defaultSearchConfiguration from './default-search-configuration';

const { Module } = Shopware;

Module.register('sw-testdemo', {
    type: 'core',
    name: 'testdemo',
    title: 'sw-testdemo.general.mainMenuItemGeneral',
    description: 'This is a test demo of the application',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#57D9A3',
    icon: 'regular-products',
    favicon: 'icon-module-products.png',
    entity: 'test_demo',

    // snippets: {
    //     'de-DE': deDE,
    //     'de-GB': enGB
    // },

    routes: {
        index: {
            components: {
                default: 'sw-testdemo-list',
            },
            path: 'index',
            meta: {
                privilege: 'test_demo.viewer',
            },
        },
        create: {
            component: 'sw-testdemo-detail',
            path: 'create',
            meta: {
                parentPath: 'sw.testdemo.index',
                privilege: 'test_demo.creator',
            },
        },
        detail: {
            component: 'sw-testdemo-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'sw.testdemo.index',
                privilege: 'test_demo.viewer',
            },
            props: {
                default(route) {
                    return {
                        testdemoId: route.params.id,
                    };
                },
            },
        },
    },

    navigation: [{
        path: 'sw.testdemo.index',
        privilege: 'test_demo.viewer',
        label: 'sw-testdemo.general.mainMenuItemGeneral',
        id: 'sw-testdemo',
        parent: 'sw-catalogue',
        color: '#57D9A3',
        position: 50,
    }],

    defaultSearchConfiguration,
});
