(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countCourse',[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('countCourse', {
                url: '/countCourse',
                templateUrl: 'app/pages/countCourse/countCourse.html',
                module: '资源统计',
                moduleUrl: 'countCourse',
                title: '资源统计',
                controller: 'countCourseCtrl',
                sidebarMeta: {
                    icon: 'ion-ios-book',
                    order: 30
                }
            })
            .state('countCourseInfo', {
                url: '/countCourseInfo?courseId&peopleTotalNum',
                templateUrl: 'app/pages/countCourse/countCourseInfo/countCourseInfo.html',
                controller: 'countCourseInfoCtrl',
                module: '资源统计',
                moduleUrl: 'countCourse',
                title: '资源详情'
            })
            .state('detailLean', {
                url: '/detailLean?courseId&resType&resourceId',
                templateUrl: 'app/pages/countCourse/detailLean/detailLean.html',
                controller: 'detailLeanCtrl',
                module: '资源统计',
                moduleUrl: 'countCourse',
                title: '学习明细'
            })
            .state('logList', {
                url: '/logList?courseId?resType?logType',
                templateUrl: 'app/pages/countCourse/logList/logList.html',
                controller: 'logListCtrl',
                module: '资源统计',
                moduleUrl: 'countCourse',
                title: '日志列表'
            })
    }
})();