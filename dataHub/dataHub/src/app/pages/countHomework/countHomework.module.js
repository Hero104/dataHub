(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('countHomework', {
                url: '/countHomework',
                templateUrl: 'app/pages/countHomework/countHomework.html',
                controller: 'countHomeworkCtrl',
                module: '作业统计',
                moduleUrl: 'countHomework',
                title: '作业统计',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 40
                }
            })
            .state('countHomeworkInfo', {
                url: '/countHomeworkInfo?courseId&homeworkId&resource',
                templateUrl: 'app/pages/countHomework/countHomeworkInfo/countHomeworkInfo.html',
                controller: 'countHomeworkInfoCtrl',
                module: '作业统计',
                moduleUrl: 'countHomework',
                title: '作业分析'
            })
            .state('compareInfo', {
                url: '/compareInfo?courseId&homeworkId&resource',
                templateUrl: 'app/pages/countHomework/compareInfo/compareInfo.html',
                controller: 'compareInfoCtrl',
                module: '作业统计',
                moduleUrl: 'countHomework',
                title: '班级对比'
            })
            .state('answerInfo', {
                url: '/answerInfo?courseId&homeworkId',
                templateUrl: 'app/pages/countHomework/answerInfo/answerInfo.html',
                controller: 'answerInfoCtrl',
                module: '作业统计',
                moduleUrl: 'countHomework',
                title: '作答分析'
            })

            .state('logAnswer', {
                url: '/logAnswer?courseId&homeworkId',
                templateUrl: 'app/pages/countHomework/logAnswer/logAnswer.html',
                controller: 'logAnswerCtrl',
                module: '作业统计',
                moduleUrl: 'countHomework',
                title: '作答记录'
            })

    }
})();