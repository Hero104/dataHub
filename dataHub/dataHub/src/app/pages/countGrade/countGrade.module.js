(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countGrade',[]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('countGrade', {
                url: '/countGrade',
                templateUrl: 'app/pages/countGrade/countGrade.html',
                controller: 'countGradeCtrl',
                module: '成绩统计',
                moduleUrl: 'countGrade',
                title: '成绩统计',
                sidebarMeta: {
                    icon: 'ion-social-foursquare',
                    order: 70
                }
            })
            .state('countGradeInfo', {
                url: '/countGradeInfo?courseId',
                templateUrl: 'app/pages/countGrade/countGradeInfo/countGradeInfo.html',
                controller: 'countGradeInfoCtrl',
                module: '成绩统计',
                moduleUrl: 'countGrade',
                title: '成绩详情'
            })
            .state('gradeInfo', {
                url: '/gradeInfo?courseId',
                templateUrl: 'app/pages/countGrade/gradeInfo/gradeInfo.html',
                controller: 'gradeInfoCtrl',
                module: '成绩统计',
                moduleUrl: 'countGrade',
                title: '成绩明细'
            })
    }
})();