(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dataBase').controller('timeSortCtrl', timeSortCtrl);

    /** @ngInject */
    function timeSortCtrl($scope, ipCookie, baConfig, colorHelper, dataBaseUrl, utilService, chartService) {
        var token = ipCookie('accessToken'),
            dashboardColors = baConfig.colors.dashboard;

            utilService.dataInfo(dataBaseUrl.testUrl, token).then(function(res) {
            var timeSortName = ['课程建设', '作业管理', '答疑解惑', '活动互动', '其他'],
                timeSortNum = [20, 20, 50, 10, 60],
                timeSortPercent = [10, 20, 30, 20, 20];
            $scope.doughnutData = {
                labels: timeSortName,
                datasets: [{
                    data: timeSortNum,
                    backgroundColor: [
                        dashboardColors.white,
                        dashboardColors.blueStone,
                        dashboardColors.surfieGreen,
                        dashboardColors.silverTree,
                        dashboardColors.gossip
                    ],
                    hoverBackgroundColor: [
                        colorHelper.shade(dashboardColors.white, 15),
                        colorHelper.shade(dashboardColors.blueStone, 15),
                        colorHelper.shade(dashboardColors.surfieGreen, 15),
                        colorHelper.shade(dashboardColors.silverTree, 15),
                        colorHelper.shade(dashboardColors.gossip, 15)
                    ],
                    percentage: timeSortPercent
                }]
            };
            chartService.pieAmChart('chart-area', $scope.doughnutData);
            $scope.timeSortSum = 500;
        })

    }
})();