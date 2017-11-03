(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework').directive('homeworkNav', homeworkNav);

    /** @ngInject */
    function homeworkNav($stateParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/countHomework/homeworkNav/homeworkNav.html',
            scope: {
                nav: '@'
            },
            link: function($scope) {
                $scope.homeworkId = $stateParams.homeworkId;
                $scope.courseId = $stateParams.courseId;
                $scope.resource = $stateParams.resource;
            }
        }
    }
})();