(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countNote').controller('countNoteCtrl', countNoteCtrl);

    /** @ngInject */
    function countNoteCtrl($scope, ipCookie, utilService, chartService, noteUrl, baConfig, baUtil, colorHelper) {
        var token = ipCookie('accessToken'),
            courseIds = ipCookie('courseStr'),
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        var baseParams = {
            access_token: token,
            courseIds: courseIds
        };

        // 基本数据
        utilService.dataRes(noteUrl.baseInfoUrl, baseParams).then(function(res) {
            if(res.data.code==0 && res.data.data) {
                var baseInfo = res.data.data;
                // console.log(baseInfo);
                var chartName = [ '提问数', '回复数', '回复率'],
                    chartNum = [
                        utilService.formatNum(baseInfo.ask_count) + ' 个',
                        utilService.formatNum(baseInfo.answer_count) + ' 个',
                        utilService.formatNum(baseInfo.answer_rate) + ' %'],
                    chartIcon = ['question', 'reply', 'replyRage'],
                    noteCharts = [];
                for(var i = 0; i < chartName.length; i++) {
                    noteCharts.push({
                        color: pieColor,
                        description: chartName[i],
                        stats: chartNum[i],
                        icon: chartIcon[i]
                    })
                }
                $scope.noteCharts = noteCharts;
            }
        });

        // 资源提问分布
        utilService.dataRes(noteUrl.resTypeUrl, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var resType = res.data.data;
                // console.log(resType);
                if(resType.length !== 0) {
                    var resource = {
                        name: ['视频', '文档', '作业', '活动', '外链接', '富文本'],
                        num: [],
                        percent: []
                    };
                    var sum = 0;
                    for(var i = 0; i < resType.length; i++) {
                        resource.num.push(resType[i].ask_count);
                        sum += resType[i].ask_count;
                    }
                    for(var i = 0 ; i < resType.length; i++) {
                        resource.percent.push(Math.round(Number(resType[i].ask_count/sum*100)))
                    }
                    $scope.sum = sum;
                    $scope.sumCode = '个';
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
                                colorHelper.shade(dashboardColors.gossip, 15)
                            ],
                            percentage: resource.percent
                        }]
                    };
                    chartService.pieAmChart('chart-area', $scope.doughnutData)
                }else {
                    $('#courseType .channels-block').hide();
                    $('#courseType .none-data').show();
                }
            }else {
                $('#courseType .channels-block').hide();
                $('#courseType .none-data').html('数据请求出错了...').show();
            }
        }, function() {
            $('#courseType .channels-block').hide();
            $('#courseType .none-data').html('数据请求出错了...').show();
        });

        // 提问统计
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        function getTableData(status) {
            var tableParams = {
                access_token: token,
                courseIds: courseIds,
                status: status
            };
            utilService.dataRes(noteUrl.askTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var countQuestionTableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            countQuestionTableData.push({
                                id: i + 1,
                                courseId: tableInfo[i].course_id,
                                name: tableInfo[i].course_name,
                                askPeopleNum: tableInfo[i].ask_user_count + '/' + tableInfo[i].user_count,
                                askNum: tableInfo[i].ask_count,
                                answerNum: tableInfo[i].answer_count,
                                answerRate: tableInfo[i].answer_rate + '%'
                            })
                        }
                        $scope.page.total = countQuestionTableData.length;
                        $scope.countQuestionTableData = countQuestionTableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                        $scope.changePage = function(page) {
                            $scope.countQuestionTableData = countQuestionTableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
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