(function() {
    'use strict';

    angular.module('BlurAdmin.pages.adDataBase', []).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            // .state('countCourse', {
            //     url: '/countCourse',
            //     templateUrl: 'app/pages/countCourse/countCourse.html',
            //     module: '资源统计',
            //     moduleUrl: 'countCourse',
            //     title: '资源统计',
            //     controller: 'countCourseCtrl',
            //     sidebarMeta: {
            //         icon: 'ion-ios-book',
            //         order: 30
            //     }
            // })
            .state('adDataBase', {
                url: '/adDataBase',
                templateUrl: 'app/admin/adDataBase/adDataBase.html',
                controller: 'adDataBaseCtrl',
                title: '基本数据',
                type: 'admin'
            })
    }
})();