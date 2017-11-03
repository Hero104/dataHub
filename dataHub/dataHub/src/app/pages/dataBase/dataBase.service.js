(function() {
    'use strict';

    angular.module('BlurAdmin.pages.dataBase').service('dataBaseUrl', dataBaseUrl);

    /** @ngInject */
    function dataBaseUrl(sysConstant) {
        return {
            testUrl: 'data/test.json'
        }
    }
})();