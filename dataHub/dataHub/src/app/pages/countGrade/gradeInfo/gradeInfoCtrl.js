(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countGrade').controller('gradeInfoCtrl', gradeInfoCtrl);

    /** @ngInject */
    function gradeInfoCtrl($scope, ipCookie, $stateParams, utilService) {

        $scope.row = 4;
        $scope.back = function() {
            history.back();
        };
    }
})();