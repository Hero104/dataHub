(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countStu', []).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('countStu', {
                url: '/countStu',
                cache: false,
                templateUrl: 'app/admin/countStu/countStu.html',
                controller: 'countStuCtrl',
                title: '学生统计',
                type: 'admin',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 20
                }
            })
    }
})();