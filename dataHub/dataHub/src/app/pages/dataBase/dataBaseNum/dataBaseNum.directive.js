(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dataBase').directive('databaseNum', databaseNum);

    /** @ngInject */
    function databaseNum() {
        return {
            restrict: 'E',
            controller: 'dataBaseNumCtrl',
            templateUrl: 'app/pages/dataBase/dataBaseNum/dataBaseNum.html'
        };
    }
})();