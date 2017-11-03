(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countCourse').controller('logListCtrl', logListCtrl);

    function logListCtrl($scope, ipCookie, $stateParams, utilService, courseUrl) {
        var token = ipCookie('accessToken'),
            logType = $stateParams.logType,
            resType = $stateParams.resType;
        var params = {
            access_token: token,
            resType: resType
        };
        $scope.back = function() {
            history.back();
        };
        $scope.page = {
            current: 1,
            pageSize: 12
        };

        utilService.dataRes(courseUrl.askTableUrl, resType).then(function(res) {

        })
    }
})();