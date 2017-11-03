(function() {
    'use strict';
    
    angular.module('BlurAdmin.theme').directive('datePicker', datePicker);

    /** @ngInject */
    function datePicker() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/datePicker/datePicker.html'
        }
    }
})();