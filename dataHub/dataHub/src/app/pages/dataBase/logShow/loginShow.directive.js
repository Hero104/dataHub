(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dataBase').directive('logShow', logShow);

    /** @ngInject */
    function logShow() {
        return {
            restrict: 'E',
            controller: 'logShowCtrl',
            templateUrl: 'app/pages/dataBase/logShow/logShow.html'
        };
    }
})();