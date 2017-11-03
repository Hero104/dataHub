(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countCourse').controller('detailLeanCtrl', detailLeanCtrl);

    /** @ngInject */
    function detailLeanCtrl($scope, ipCookie, $stateParams, baUtil, baConfig, utilService, courseUrl, chartService, $timeout) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId,
            resType = $stateParams.resType,
            resourceId = $stateParams.resourceId,
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        var baseParams = {
            access_token: token,
            courseId: courseId,
            resourceId: resourceId,
            resourceType: resType
        };
        $scope.resType = resType;
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };

        // 基本数据
        function getTimeData() {
            utilService.dataRes(courseUrl.baseTimeUrl, baseParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var baseInfo = res.data.data;
                    var baseName = ['最长学习时长', '最短学习时长', '平均学习时长'],
                        baseNum = [
                            utilService.formatSeconds(baseInfo.maxTotalStudyTime),
                            utilService.formatSeconds(baseInfo.minTotalStudyTime),
                            utilService.formatSeconds(baseInfo.avgTotalStudyTime)],
                        baseCharts = [];
                    for(var i = 0; i < baseName.length; i++) {
                        baseCharts.push({
                            color: pieColor,
                            description: baseName[i],
                            stats: baseNum[i],
                            icon: 'time'
                        })
                    }
                    $scope.baseCharts = baseCharts;
                }
            });
        }
        function getNumData() {
            utilService.dataRes(courseUrl.baseNumUrl, baseParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var baseInfo = res.data.data;
                    var baseName = ['最多学习次数', '最少学习次数', '平均学习次数'],
                        baseNum = [baseInfo.maxTotalStudyCount + ' 次', baseInfo.minTotalStudyCount + ' 次', baseInfo.avgTotalStudyCount + ' 次'],
                        baseCharts = [];
                    for(var i = 0; i < baseName.length; i++) {
                        baseCharts.push({
                            color: pieColor,
                            description: baseName[i],
                            stats: baseNum[i],
                            icon: 'num'
                        })
                    }
                    $scope.baseCharts = baseCharts;
                }
            });
        }

        // 学生统计
        function getTableData(url) {
            utilService.dataRes(url, baseParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    console.log(tableInfo);
                    if(tableInfo.length !== 0) {
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: i + 1,
                                name: tableInfo[i].nickname,
                                num: tableInfo[i].studyCount,
                                time: utilService.formatSeconds(tableInfo[i].studyTime)
                            })
                        }
                        $scope.page.total = tableData.length;
                        $scope.tableData = tableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                        $scope.changePage = function(page) {
                            $scope.tableData = tableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                        };
                    }else {
                        $('.countTable .horizontal-scroll').hide();
                        $('.countTable .none-data').show();
                    }
                }else {
                    $('.countTable .horizontal-scroll').hide();
                    $('.countTable .none-data').html('数据请求出错了...').show();
                }
            }, function() {
                $('.countTable .horizontal-scroll').hide();
                $('.countTable .none-data').html('数据请求出错了...').show();
            });
        }

        switch (resType) {
            case '1':       // 视频
                getTimeData();
                getTableData(courseUrl.VDTableUrl);
                // sortVideo();
                break;
            case '2':       // 文档
                getTimeData();
                getTableData(courseUrl.VDTableUrl);
                break;
            case '5':       // 链接
                getNumData();
                getTableData(courseUrl.RHTableUrl);
                break;
            case '6':       // 富文本
                getNumData();
                getTableData(courseUrl.RHTableUrl);
                break;
            case '66':      // 章节统计明细
                break;
            default:
                break;
        }

        // 视频播放分布(视频)
        // function sortVideo() {
        //     utilService.dataRes(courseUrl.testUrl, baseParams).then(function(res) {
        //         var chartData = {
        //             name: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
        //             num: [30, 50, 40, 50, 60, 40, 20]
        //         };
        //         chartService.videoEchart('videoEchart', chartData);
        //         $scope.numDrag = 50 + '次';
        //
        //         $timeout(function() {
        //             var numDragW = $('#numDrag .popular-app-img').width(),
        //                 numDragH = $('#numDrag .popular-app-img').height(),
        //                 numW = $('#numDrag .num-drag').width(),
        //                 numH = $('#numDrag .num-drag').height();
        //             $('#numDrag').css({visibility: 'visible'});
        //             $('#numDrag .num-drag').css({
        //                 left: numDragW/2 - numW/2 + 'px',
        //                 top: numDragH/2 - numH/2 + 'px'
        //             })
        //         },1000)
        //     })
        // }




        // 资源统计/章节统计
        // function getTableDataTab(status) {
        //     utilService.dataRes(courseUrl.askTableUrl, baseParams).then(function(res) {
        //         if(res.data.code == 0 && res.data.data) {
        //             var tableInfo = res.data.data;
        //             // console.log(tableInfo);
        //             if(tableInfo.length !== 0) {
        //                 $('#countTable .horizontal-scroll').show();
        //                 $('#countTable .none-data').hide();
        //                 var courseInfoTableData = [];
        //                 for(var i = 0; i < tableInfo.length; i++) {
        //                     courseInfoTableData.push({
        //                         id: i + 1,
        //                         name: '李子木',
        //                         studyTime: utilService.formatSeconds(1200 + i),
        //                         studyCount: (i + 45) + '/' + (i + 46),
        //                         studyNum: 21 + i,
        //                         noteNum: 300 + i,
        //                         askNum: 300 + i,
        //                         averageStudyTime: utilService.formatSeconds(100 + i),
        //                         resType: 1
        //                     })
        //                 }
        //                 $scope.page.total = courseInfoTableData.length;
        //                 $scope.courseInfoTableData = courseInfoTableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
        //                 $scope.changePage = function(page) {
        //                     $scope.courseInfoTableData = courseInfoTableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
        //                 };
        //             }else {
        //                 $('#countTableTab .horizontal-scroll').hide();
        //                 $('#countTableTab .none-data').show();
        //             }
        //         }else {
        //             $('#countTableTab .horizontal-scroll').hide();
        //             $('#countTableTab .none-data').html('数据请求出错了...').show();
        //         }
        //     }, function() {
        //         $('#countTableTab .horizontal-scroll').hide();
        //         $('#countTableTab .none-data').html('数据请求出错了...').show();
        //     });
        // }
        //

    }
})();