(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dataBase').controller('dataBaseNumCtrl', dataBaseNumCtrl);

    /** @ngInject */
    function dataBaseNumCtrl($scope, ipCookie, baConfig, baUtil, dataBaseUrl, utilService) {
        var token = ipCookie('accessToken'),
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        utilService.dataInfo(dataBaseUrl.testUrl, token).then(function(res) {
            var baseName = ['学生', '课程', '登录'],
                baseNum = ['57,820 人', '89,745 门', '178,391 次'],
                baseIcon = ['person', 'course', 'login'],
                baseCharts = [];
            for(var i = 0; i < baseName.length; i++) {
                baseCharts.push({
                    color: pieColor,
                    description: baseName[i],
                    stats: baseNum[i],
                    icon: baseIcon[i]
                })
            }
            $scope.baseCharts = baseCharts;
        });

    }
})();