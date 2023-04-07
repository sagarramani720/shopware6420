import './page/sw-swag-testdemo-list';
import './page/sw-swag-testdemo-detail';
import './acl';
import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';
import defaultSearchConfiguration from './default-search-configuration';

const { Module } = Shopware;

// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
Shopware.Module.register('sw-swag-testdemo', {
    type: 'core',
    name: 'FirstTestDemo',
    title: 'sw-swag-testdemo.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#57D9A3',
    icon: 'regular-products',
    favicon: 'icon-module-products.png',
    entity: 'test_demo',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'sw-swag-testdemo-list',
            },
            path: 'list',
        },
        detail: {
            component: 'sw-swag-testdemo-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'sw.swag.testdemo.list',
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
        label: 'sw-swag-testdemo.general.mainMenuItemGeneral',
        color: '#bcc9dc',
        id: 'sw-swag-testdemo-list',
        path: 'sw.swag.testdemo.list',
        parent: 'sw-catalogue',
        icon: 'default-shopping-paper-bag-product',
        position: 50
    }],

    defaultSearchConfiguration,
});
