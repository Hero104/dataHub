(function(){
    'use strict';

    angular.module('BlurAdmin.theme').controller('datePickerCtrl', datePickCtrl);

    /** @ngInject */
    function datePickCtrl($scope) {

        $scope.openedBegin = false;
        $scope.openedOver = false;
        $scope.openBegin = openBegin;
        $scope.openOver = openOver;
        function openBegin() {
            $scope.openedBegin = true;
        }
        function openOver() {
            $scope.openedOver = true;
        }
        // $scope.searchLineChartDate = function() {
        //     console.log($scope.dateStart)
        //     console.log($scope.dateEnd)
        // }

    }
})();