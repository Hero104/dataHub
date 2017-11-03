(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dataBase', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dataBase', {
                url: '/dataBase',
                templateUrl: 'app/pages/dataBase/dataBase.html',
                module: '基础数据',
                moduleUrl: 'dataBase',
                title: '基础数据',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 10
                }
            });
    }
})();
