(function () {
    'use strict';

    angular.module('BlurAdmin.theme').run(themeRun);

    /** @ngInject */
    function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings, ipCookie) {

        var token = ipCookie('accessToken'),
            teacherInfo = ipCookie('teacherInfo'),
            courseStr = ipCookie('courseStr'),
            course = ipCookie('course'),
            nav = ipCookie('nav'),
            userType = ipCookie('userType');
        if(!token && !teacherInfo && !courseStr && !course && !nav && !userType) {
            location.href = './index.html';
        }
        $rootScope.$pageFinishedLoading = true;

        // var whatToWait = [
        //     preloader.loadAmCharts()
        //     //$timeout(3000)
        // ];
        //
        // var theme = themeLayoutSettings;
        // if (theme.blur) {
        //     if (theme.mobile) {
        //         whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
        //     } else {
        //         whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg.jpg'));
        //         whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred.jpg'));
        //     }
        // }
        // $q.all(whatToWait).then(function () {
        //     $rootScope.$pageFinishedLoading = true;
        // });
        // $timeout(function () {
        //     if (!$rootScope.$pageFinishedLoading) {
        //         $rootScope.$pageFinishedLoading = true;
        //     }
        // }, 3000);

        $rootScope.$baSidebarService = baSidebarService;
    }

})();