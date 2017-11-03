(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dataBase').directive('timeSort', timeSort);

    /** @ngInject */
    function timeSort() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/dataBase/timeSort/timeSort.html',
            controller: 'timeSortCtrl'
        };
    }
})();