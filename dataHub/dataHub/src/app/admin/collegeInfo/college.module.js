(function() {
    'use strict';

    angular.module('BlurAdmin.pages.collegeInfo', []).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('collegeInfo', {
                url: '/collegeInfo',
                cache: false,
                templateUrl: 'app/admin/collegeInfo/collegeInfo.html',
                controller: 'collegeInfoCtrl',
                title: '学院简介',
                type: 'admin',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 10
                }
            })
    }
})();