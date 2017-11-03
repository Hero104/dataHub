(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dataBase').controller('logShowCtrl', logShowCtrl);

    /** @ngInject */
    function logShowCtrl($scope, ipCookie, utilService, chartService, dataBaseUrl) {
        var token = ipCookie('accessToken');
        $scope.dateList = ['最近七天', '最近一个月', '最近三个月'];

        function getLogInfo() {
            utilService.dataInfo(dataBaseUrl.testUrl, token).then(function(res) {
                var loginDate = ['2017-06-01', '2017-06-02', '2017-06-03', '2017-06-04', '2017-06-05', '2017-06-06', '2017-06-07'],
                    loginNum = [100, 200, 500, 600, 300, 200, 500],
                    chartData = [],
                    dateNow = utilService.getLocalDate();
                for(var i = 0; i < loginDate.length; i++) {
                    chartData.push({
                        date: loginDate[i],
                        value: loginNum[i]
                    })
                }
                chartService.lineChart('amchart',chartData)
            });
        }
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            getLogInfo();
        };
        $scope.filtrate(0);


    }
})();