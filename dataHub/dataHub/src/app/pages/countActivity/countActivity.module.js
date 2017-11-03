(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countActivity', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('countActivity', {
                url: '/countActivity',
                templateUrl: 'app/pages/countActivity/countActivity.html',
                controller: 'countActivityCtrl',
                module: '活动统计',
                moduleUrl: 'countActivity',
                title: '活动统计',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 50
                }
            })
            .state('countActivityInfo', {
                url: '/countActivityInfo?activityId&courseId',
                templateUrl: 'app/pages/countActivity/countActivityInfo/countActivityInfo.html',
                controller: 'countActivityInfoCtrl',
                module: '活动统计',
                moduleUrl: 'countActivity',
                title: '活动分析'
            })
            .state('ActivityCompareInfo', {
                url: '/ActivityCompareInfo?activityId&courseId',
                templateUrl: 'app/pages/countActivity/activityCompareInfo/activityCompareInfo.html',
                controller: 'activityCompareInfoCtrl',
                module: '活动统计',
                moduleUrl: 'countActivity',
                title: '活动对比'
            })
            .state('postInfo', {
                url: '/postInfo?activityId&courseId&userId',
                templateUrl: 'app/pages/countActivity/postInfo/postInfo.html',
                controller: 'postInfoCtrl',
                controllerAs: "tabCtrl",
                module: '活动统计',
                moduleUrl: 'countActivity',
                title: '发帖明细'
            })
    }
})();