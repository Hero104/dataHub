(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components').controller('BaSidebarCtrl', BaSidebarCtrl);

    function BaSidebarCtrl($scope, baSidebarService, ipCookie) {
        var userType = ipCookie('userType');

        $scope.$watch(function() {
            $scope.nav = ipCookie('nav');
        });
        $scope.clickMine = function(index) {
            $scope.nav = index;
            ipCookie('nav', index);
        };

        var menuItems = baSidebarService.getMenuItems();
        var menuAdmin = [],
            menuTeacher = [];
        for(var i = 0; i < menuItems.length; i++) {
            if(menuItems[i].type == 'admin') {
                menuAdmin.push(menuItems[i]);
            }else {
                menuTeacher.push(menuItems[i]);
            }
        }
        $scope.menuItems = userType==2 ? menuTeacher : menuAdmin;

        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

        $scope.hoverItem = function ($event) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $scope.$on('$stateChangeSuccess', function () {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });



    }
})();