(function() {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').directive('navSlide', navSlide);

    /** @ngInject */
    function navSlide($stateParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/stuControl/navSlide/navSlide.html',
            scope: {
                nav: '@'
            },
            link: function($scope) {
                $scope.userId = $stateParams.userId;
                $scope.courseId = $stateParams.courseId;
            }
        }
    }
})();