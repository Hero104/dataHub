(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countNote', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('countNote', {
                url: '/countNote',
                templateUrl: 'app/pages/countNote/countNote.html',
                controller: 'countNoteCtrl',
                module: '答疑统计',
                moduleUrl: 'countNote',
                title: '答疑统计',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 60
                }
            })
            .state('byStudent', {
                url: '/byStudent?courseId',
                templateUrl: 'app/pages/countNote/byStudent/byStudent.html',
                controller: 'byStudentCtrl',
                module: '答疑统计',
                moduleUrl: 'countNote',
                title: '按学生统计'
            })
            .state('byContent', {
                url: '/byContent?courseId',
                templateUrl: 'app/pages/countNote/byContent/byContent.html',
                controller: 'byContentCtrl',
                module: '答疑统计',
                moduleUrl: 'countNote',
                title: '按内容统计'
            })
            .state('postNote', {
                url: '/postNote',
                templateUrl: 'app/pages/countNote/postNote/postNote.html',
                controller: 'postNoteCtrl',
                module: '答疑统计',
                moduleUrl: 'countNote',
                title: '发帖明细'
            })
    }
})();