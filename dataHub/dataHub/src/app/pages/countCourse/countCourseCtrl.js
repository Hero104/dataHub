(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countCourse').controller('countCourseCtrl', countCourseCtrl);

    /** @ngInject */
    function countCourseCtrl($scope, ipCookie, baUtil, baConfig, utilService, courseUrl, colorHelper, chartService) {
        var token = ipCookie('accessToken'),
            courseIds = ipCookie('courseStr'),
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        var baseParams = {
            access_token: token,
            courseIds: courseIds
        };
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };

        // 基本数据
        utilService.dataRes(courseUrl.baseDataUrl, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var baseData = res.data.data;
                // console.log(baseData)
                $scope.baseNum = [{
                    color: pieColor,
                    description: '学生人数',
                    stats: utilService.formatNum(baseData.userCount) + ' 人',
                    icon: 'person'
                }, {
                    color: pieColor,
                    description: '学习次数',
                    stats: utilService.formatNum(baseData.sumStudyCount) + ' 次',
                    icon: 'course'
                }, {
                    color: pieColor,
                    description: '人均时长',
                    stats: utilService.formatNum(utilService.goMinute(baseData.avgStudyTime)) + ' 分',
                    icon: 'time'
                }, {
                    color: pieColor,
                    description: '人均次数',
                    stats: utilService.formatNum(baseData.avgStudyCount) + ' 次',
                    icon: 'num'
                }];
            }
        });

        // 资源提问分布
        utilService.dataRes(courseUrl.resTypeUrl, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var resType = res.data.data;
                // console.log(resType);
                var resource = {
                    name: ['视频', '文档', '作业', '活动', '外链接', '富文本'],
                    num: [
                        resType.resourceTypeOne,
                        resType.resourceTypeTwo,
                        resType.resourceTypeThree,
                        resType.resourceTypeFour,
                        resType.resourceTypeFive,
                        resType.resourceTypeSix],
                    percent: []
                };
                var sum = 0;
                for(var i = 0; i < resource.num.length; i++) {
                    sum += Number(resource.num[i])
                }
                for(var i = 0 ; i < resource.num.length; i++) {
                    resource.percent.push(Math.round(Number(resource.num[i]) / sum * 100))
                }
                $scope.sum = sum;
                var dashboardColors = baConfig.colors.dashboard;
                $scope.transparent = baConfig.theme.blur;
                $scope.doughnutData = {
                    labels: resource.name,
                    datasets: [{
                        data: resource.num,
                        backgroundColor: [
                            dashboardColors.white,
                            dashboardColors.blueStone,
                            dashboardColors.surfieGreen,
                            dashboardColors.silverTree,
                            dashboardColors.gossip,
                            dashboardColors.greenBlur
                        ],
                        hoverBackgroundColor: [
                            colorHelper.shade(dashboardColors.white, 15),
                            colorHelper.shade(dashboardColors.blueStone, 15),
                            colorHelper.shade(dashboardColors.surfieGreen, 15),
                            colorHelper.shade(dashboardColors.silverTree, 15),
                            colorHelper.shade(dashboardColors.gossip, 15),
                            colorHelper.shade(dashboardColors.greenBlur, 15)
                        ],
                        percentage: resource.percent
                    }]
                };
                chartService.pieAmChart('chart-area', $scope.doughnutData)
            }else {
                $('#courseType .channels-block').hide();
                $('#courseType .none-data').html('数据请求出错了...').show();
            }
        }, function() {
            $('#courseType .channels-block').hide();
            $('#resType .none-data').html('数据请求出错了...').show();
        });

        // 资源统计
        function getTableData(status) {
            var tableParams = {
                access_token: token,
                courseIds: courseIds,
                status: status
            };
            utilService.dataRes(courseUrl.resTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: i + 1,
                                courseId: tableInfo[i].courseId,
                                name: tableInfo[i].courseName,
                                resNum: tableInfo[i].courseResourceCount,
                                studyNum: tableInfo[i].finisheduserCount + '/' + tableInfo[i].userCount,
                                peopleTotalNum: tableInfo[i].userCount,
                                studyTime: utilService.formatSeconds(tableInfo[i].totalStudyTime),
                                studyTimeAvg: utilService.formatSeconds(tableInfo[i].avgStudyTime),
                                note: tableInfo[i].noteCount,
                                ask: tableInfo[i].askCount
                            })
                        }
                        $scope.page.total = tableData.length;
                        $scope.tableData = tableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                        $scope.changePage = function(page) {
                            $scope.tableData = tableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                        };
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

        $scope.dateList = ['全部课程', '未过期', '已过期'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            $scope.page.currentPage = 1;
            getTableData(index);
        };
        $scope.filtrate(0);


    }
})();