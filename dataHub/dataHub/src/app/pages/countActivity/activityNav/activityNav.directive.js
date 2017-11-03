(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countActivity').directive('activityNav', activityNav);

    /** @ngInject */
    function activityNav($stateParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/countActivity/activityNav/activityNav.html',
            scope: {
                nav: '@'
            },
            link: function($scope) {
                $scope.activityId = $stateParams.activityId;
                $scope.courseId = $stateParams.courseId;
            }
        }
    }
})();