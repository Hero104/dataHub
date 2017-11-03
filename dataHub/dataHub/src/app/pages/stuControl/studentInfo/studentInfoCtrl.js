(function() {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').controller('studentInfoCtrl', studentInfoCtrl);

    /** @ngInject */
    function studentInfoCtrl($scope, ipCookie, $stateParams, stuControlUrl, utilService, chartService) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId;
        $scope.courseId = courseId;
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        // 数据请求
        function lineChartData(startDate, endDate) {
            var params = {
                access_token: token,
                courseId: courseId,
                startDate: startDate,
                endDate: endDate ? endDate : utilService.getLocalDate()
            };
            utilService.dataRes(stuControlUrl.studyTrendUrl, params).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var trendInfo = res.data.data;
                    if(trendInfo.length !== 0) {
                        $('.chartShow #amchart').show();
                        $('.chartShow .none-data').hide();
                        var chartData = [];
                        for(var i = 0; i < trendInfo.length; i++) {
                            chartData.push({
                                date: trendInfo[i].statisDate,
                                value: trendInfo[i].user_study_count
                            })
                        }
                        chartService.lineChart('amchart', chartData);
                    }else {
                        $('.chartShow #amchart').hide();
                        $('.chartShow .none-data').html('暂时没有数据...').show();
                    }
                }else {
                    $('.chartShow #amchart').hide();
                    $('.chartShow .none-data').html('数据请求出错了...').show();
                }
            }, function() {
                $('.chartShow #amchart').hide();
                $('.chartShow .none-data').html('数据请求出错了...').show();
            });
        }

        // 时间选择
        $scope.dateList = ['最近七天', '最近一个月', '最近三个月', '自定义时间'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            if(index == 3) {
                $scope.datePickerShow = true;
                return;
            }
            lineChartData(utilService.getLocalDate(index));
            $scope.datePickerShow = false;
        };
        $scope.filtrate(2);

        // 查询点击
        $scope.searchLineChartDate = function() {
            var formDateStart = $('#formDateStart')[0].value,
                formDateEnd = $('#formDateEnd')[0].value,
                startNum = new Date(formDateStart).getTime(),
                endNum = new Date(formDateEnd).getTime();
            if(!formDateStart || !formDateEnd) {
                utilService.alert($scope, 'app/theme/alert/empty.html', 'sm');
                return;
            }
            if(startNum > endNum) {
                utilService.alert($scope, 'app/theme/alert/timeErr.html', 'sm');
                return;
            }
            lineChartData(formDateStart, formDateEnd);
            $scope.datePickerShow = false;
        };

        // 详情统计
        function getTableData() {
            var tableParams = {
                access_token: token,
                courseId: courseId,
                pageNo: $scope.page.currentPage,
                pageSize: $scope.page.pageSize
            };
            utilService.dataRes(stuControlUrl.stuTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableRes = res.data.data,
                        tableInfo = tableRes.list;
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: ($scope.page.currentPage - 1) * $scope.page.pageSize + i + 1,
                                name: tableInfo[i].nickName,
                                userId: tableInfo[i].userId,
                                studyTime: utilService.formatSeconds(tableInfo[i].totalStudyTime),
                                loginNum: tableInfo[i].studyCount,
                                resource: tableInfo[i].courseResourceCount,
                                homework: tableInfo[i].finishedHomeworkCount + '/' + tableInfo[i].homeworkCount,
                                activity: tableInfo[i].finishedActivityCount + '/' + tableInfo[i].activityCount
                            })
                        }
                        $scope.page.total = tableRes.totalRecords;
                        $scope.tableData = tableData;
                    }else {
                        $('#countTable .horizontal-scroll').hide();
                        $('#countTable .none-data').html('暂时没有数据...').show();
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
        getTableData();
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            getTableData();
        };


    }
})();