(function() {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').controller('loginBehaviorCtrl', loginBehaviorCtrl);

    /** @ngInject */
    function loginBehaviorCtrl($scope, utilService, ipCookie, stuControlUrl, $stateParams) {
        var token = ipCookie('accessToken'),
            userId = $stateParams.userId;

        $scope.page = {
            current: 1,
            pageSize: 15
        };
        function getTableData() {
            var params = {
                access_token: token,
                aType: 7,
                userId: userId,
                page: $scope.page.current,
                max: $scope.page.pageSize
            };
            utilService.dataRes(stuControlUrl.loginBehaviorUrl, params).then(function(res) {
                if(res.data.data && res.data.data.length!==0) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo)
                    var tableData = [];
                    for(var i = 0; i < tableInfo.rows.length; i ++) {
                        tableData.push({
                            id: $scope.page.pageSize * ($scope.page.current - 1) + i + 1,
                            date: tableInfo.rows[i].loginTime,
                            address: tableInfo.rows[i].loginAddress
                        })
                    }
                    $scope.page.total = tableInfo.totalRecord;
                    $scope.tableData = tableData;
                }else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#countTable .none-data').show();
                }
            }, function() {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            });
        }
        $scope.changePage = function(page) {
            $scope.page.current = page;
            getTableData();
        };
        $scope.changePage($scope.page.current);


    }
})();