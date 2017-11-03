(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework').controller('logAnswerCtrl', logAnswerCtrl);

    /** @ngInject */
    function logAnswerCtrl($scope, ipCookie, $stateParams, utilService, homeworkUrl) {
        var token = ipCookie('accessToken');
        $scope.homeworkId = $stateParams.homeworkId;
        $scope.courseId = $stateParams.courseId;
        var params = {
            access_token: token,
            courseId: $scope.courseId,
            homeworkId: $scope.homeworkId
        };

        $scope.nav = 0;
        $scope.titleList = ['第一次作答', '第二次作答'];
        $scope.getPaper = function(index) {
            $scope.nav = index;
            utilService.dataRes(homeworkUrl.testUrl, params).then(function(res) {

            })
        }
    }
})();