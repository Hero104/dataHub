(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countNote').directive('noteNav', noteNav);

    /** @ngInject */
    function noteNav($stateParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/countNote/noteNav/noteNav.html',
            scope: {
                nav: '@'
            },
            link: function($scope) {
                $scope.courseId = $stateParams.courseId;
            }
        }
    }
})();