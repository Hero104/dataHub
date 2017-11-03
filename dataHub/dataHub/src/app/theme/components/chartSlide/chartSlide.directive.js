(function() {
    'use strict';

    angular.module('BlurAdmin.theme').directive('chartSlide', chartSlide);

    /** @ngInject */
    function chartSlide() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/chartSlide/chartSlide.html',
            scope: {
                slidetitle: '@',
                sortlist: '='
            }
        }
    }
})();