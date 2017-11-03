(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countNote').controller('byStudentCtrl', byStudentCtrl);

    /** @ngInject */
    function byStudentCtrl($scope, ipCookie, $stateParams, utilService, chartService, noteUrl) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId;

        // // 提问分布
        // var askParams = {
        //     access_token: token,
        //     courseId: courseId
        // };
        // utilService.dataRes(noteUrl.testUrl, askParams).then(function(resC) {
        //     var chartAsk = [{
        //         progress: 10,
        //         name: '提问率'
        //     },{
        //         progress: 40,
        //         name: '男生提问率'
        //     },{
        //         progress: 60,
        //         name: '女生提问率'
        //     }];
        //     chartService.pieEchartThree('askPercent', chartAsk);
        // });

        // 学生统计
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        function getTableData(status) {
            var tableParams = {
                access_token: token,
                courseId: courseId,
                askStatus: status,
                pageNo: $scope.page.currentPage,
                pageSize: $scope.page.pageSize
            };
            utilService.dataRes(noteUrl.stuTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableRes = res.data.data,
                        tableInfo = tableRes.list;
                    // console.log(tableInfo)
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: ($scope.page.currentPage - 1) * $scope.page.pageSize + i + 1,
                                name: tableInfo[i].user_name,
                                askNum: tableInfo[i].ask_count,
                                answerNum: tableInfo[i].answer_count,
                                status: tableInfo[i].ask_status==1 ? '未提问' : '已提问'
                            })
                        }
                        $scope.page.total = tableRes.totalRecords;
                        $scope.tableData = tableData;
                    }else {
                        $('#countTable .horizontal-scroll').hide();
                        $('#countTable .none-data').show();
                    }
                }else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#countTable .none-data').html('数据请求出错了...').show();
                }
            }, function() {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            });
        }

        $scope.dateList = ['全部学生', '未提问', '已提问'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            $scope.page.currentPage = 1;
            getTableData(index);
        };
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            getTableData($scope.logNav);
        };
        $scope.filtrate(0);
    }
})();