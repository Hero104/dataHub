(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components').directive('contentTop', contentTop);

    /** @ngInject */
    function contentTop($state, $stateParams, $timeout, ipCookie) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/contentTop/contentTop.html',
            link: function ($scope) {
                $scope.userType = ipCookie('userType');
                var resource = $stateParams.resource;
                $timeout(function() {
                    $scope.$watch(function () {
                        if(resource == 1) {
                            $scope.activePageTitle = '学习明细';
                            $scope.module = '资源统计';
                            $scope.moduleUrl = 'countCourse';
                        }else {
                            $scope.activePageTitle = $state.current.title;
                            $scope.module = $state.current.module;
                            $scope.moduleUrl = $state.current.moduleUrl;
                        }
                        $scope.collegeName = ipCookie('college') ? ipCookie('college').name : '';
                    });
                    $scope.goModule = function() {
                        $state.go($scope.moduleUrl);
                    };

                })

            }
        };
    }

})();