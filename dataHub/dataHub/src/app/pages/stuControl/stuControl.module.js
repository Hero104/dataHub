(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('stuControl', {
                url: '/stuControl',
                templateUrl: 'app/pages/stuControl/stuControl.html',
                controller: 'stuControlCtrl',
                module: '学生管理',
                moduleUrl: 'stuControl',
                title: '学生管理',
                sidebarMeta: {
                    icon: 'ion-clipboard',
                    order: 20
                }
            })
            .state('studentInfo', {
                url: '/studentInfo?courseId',
                templateUrl: 'app/pages/stuControl/studentInfo/studentInfo.html',
                controller: 'studentInfoCtrl',
                module: '学生管理',
                moduleUrl: 'stuControl',
                title: '学生详情'
            })
            .state('stuReport', {
                url: '/stuReport?courseId&userId',
                templateUrl: 'app/pages/stuControl/stuReport/stuReport.html',
                controller: 'stuReportCtrl',
                module: '学生管理',
                moduleUrl: 'stuControl',
                title: '学习报告'
            })
            .state('loginBehavior', {
                url: '/loginBehavior?courseId&userId',
                templateUrl: 'app/pages/stuControl/loginBehavior/loginBehavior.html',
                controller: 'loginBehaviorCtrl',
                module: '学生管理',
                moduleUrl: 'stuControl',
                title: '登录行为'
            })
            .state('studyBehavior', {
                url: '/studyBehavior?courseId&userId',
                templateUrl: 'app/pages/stuControl/studyBehavior/studyBehavior.html',
                controller: 'studyBehaviorCtrl',
                module: '学生管理',
                moduleUrl: 'stuControl',
                title: '学习分析'
            })



            .state('stuInfo', {
                url: '/stuInfo',
                templateUrl: 'app/pages/stuControl/stuInfo/stuInfo.html',
                controller: 'stuInfoCtrl',
                module: '学生管理',
                moduleUrl: 'stuControl',
                title: '学生详情'
            })
    }
})();
