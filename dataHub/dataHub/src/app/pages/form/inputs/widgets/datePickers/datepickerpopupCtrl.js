(function(){
    'use strict';

    angular.module('BlurAdmin.pages.form').controller('datepickerpopupCtrl', datepickerpopupCtrl);

    function datepickerpopupCtrl($scope) {

        $scope.open = open;
        $scope.opened = false;
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.options = {
            showWeeks: false
        };

        function open() {
            $scope.opened = true;
        }
    }
})();