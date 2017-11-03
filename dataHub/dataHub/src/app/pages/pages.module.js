(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
            'ui.router',

            // 'BlurAdmin.pages.dashboard',
            // 'BlurAdmin.pages.components',
            //  'BlurAdmin.pages.form',
            // 'BlurAdmin.pages.tables',
            // 'BlurAdmin.pages.maps',
            // 'BlurAdmin.pages.profile'
            'BlurAdmin.pages.ui',
            'BlurAdmin.pages.charts',

            // 'BlurAdmin.pages.dataBase',
            'BlurAdmin.pages.stuControl',
            'BlurAdmin.pages.countCourse',
            'BlurAdmin.pages.countHomework',
            'BlurAdmin.pages.countActivity',
            'BlurAdmin.pages.countNote',
            'BlurAdmin.pages.countGrade',

            'BlurAdmin.pages.adDataBase',
            'BlurAdmin.pages.collegeInfo',
            'BlurAdmin.pages.countStu'


        ]).config(routeConfig);

    function routeConfig($urlRouterProvider, baSidebarServiceProvider, sysConstant) {
        function getCookie(name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
            } else{
                return null;
            }
        }
        var userType = getCookie('userType');
        if(userType == 2) {
            $urlRouterProvider.otherwise('/stuControl');
        }else {
            $urlRouterProvider.otherwise('/adDataBase');
        }

        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Pages',
        //     icon: 'ion-document',
        //     subMenu: [{
        //         title: 'Sign In',
        //         fixedHref: 'auth.html',
        //         blank: true
        //     }, {
        //         title: 'Sign Up',
        //         fixedHref: 'reg.html',
        //         blank: true
        //     }, {
        //         title: 'User Profile',
        //         stateRef: 'profile'
        //     }, {
        //         title: '404 Page',
        //         fixedHref: '404.html',
        //         blank: true
        //     }]
        // });
        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Menu Level 1',
        //     icon: 'ion-ios-more',
        //     subMenu: [{
        //         title: 'Menu Level 1.1',
        //         disabled: true
        //     }, {
        //         title: 'Menu Level 1.2',
        //         subMenu: [{
        //             title: 'Menu Level 1.2.1',
        //             disabled: true
        //         }]
        //     }]
        // });
    }


})();
