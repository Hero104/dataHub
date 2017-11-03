(function() {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').controller('studyBehaviorCtrl', studyBehaviorCtrl);

    /** @ngInject */
    function studyBehaviorCtrl($scope, ipCookie, $stateParams, utilService, chartService, stuControlUrl, baConfig, colorHelper, $timeout) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId,
            userId = $stateParams.userId,
            x = 0;
        var baseParams = {
            access_token: token,
            course_id: courseId,
            user_id: userId
        };

        // 学习行为
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            var nameArr = ['清晨型', '上午型', '下午型', '夜晚型'],
                studyArr = [110, 158, 123, 56],
                percentArr = [20, 30, 40, 10],
                max = Math.max.apply(null, studyArr),
                studyType = [],
                studyStyleTableData = [];
            for(var i = 0; i < nameArr.length; i++) {
                studyType.push({
                    name: nameArr[i],
                    max: max + parseInt(max/3)
                });
                studyStyleTableData.push({
                    id: i + 1,
                    name: nameArr[i],
                    studyTime: studyArr[i],
                    percent: percentArr[i] + '%'
                })
            }
            var studyChartData = {
                type: studyType,
                value: studyArr
            };
            $scope.studyStyleTableData = studyStyleTableData;
            chartService.radarEchart('stacked-bar', studyChartData);
        });

        // 学习内容分布
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            var dashboardColors = baConfig.colors.dashboard;
            var sortChartData = {
                studyContent: ['学习资源', '做作业', '参加活动', '答疑笔记', '其他'],
                studyContentData: [2000, 1500, 1000, 1200, 400],
                studyContentPercent: [87, 22, 70, 38, 17]
            };
            $scope.doughnutData = {
                labels: sortChartData.studyContent,
                datasets: [{
                    data: sortChartData.studyContentData,
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
                    percentage: sortChartData.studyContentPercent
                }]
            };
            chartService.pieAmChart('chart-area', $scope.doughnutData)
        });

        // 时间轴
        utilService.dataRes(stuControlUrl.timeLineUrl, baseParams).then(function(res) {
            if(res.data.code==0 && res.data.data && res.data.data.length!==0) {
                var timeLineInfo = res.data.data;
                $scope.colorBgArr = ['warning', 'primary', 'danger'];
                $scope.timeLineData = timeLineInfo.reverse();
                console.log(timeLineInfo);
                var strArr = [];
                for(var i = 0; i < timeLineInfo.length; i++) {
                    var str = '';
                    for(var j = 0; j < timeLineInfo[i].study.length; j++) {
                        if(timeLineInfo[i].study[j].study_time !== 0 || timeLineInfo[i].study[j].ask_count !==0 || timeLineInfo[i].study[j].note_count) {x ++;}
                        switch (timeLineInfo[i].study[j].statis_type + '') {
                            case '1':
                                if(timeLineInfo[i].study[j].study_time !== 0) {
                                    str += '观看了' + utilService.formatSeconds(timeLineInfo[i].study[j].study_time) + '视频，';
                                }
                                break;
                            case '2':
                                if(timeLineInfo[i].study[j].study_time !== 0) {
                                    str += '学习了' + utilService.formatSeconds(timeLineInfo[i].study[j].study_time) + '文档，';
                                }
                                break;
                            case '3':
                                if(timeLineInfo[i].study[j].study_time !== 0) {
                                    str += '耗时' + utilService.formatSeconds(timeLineInfo[i].study[j].study_time) + '做了' + timeLineInfo[i].study[j].resource_count + '个作业，';
                                }
                                break;
                            case '4':
                                if(timeLineInfo[i].study[j].resource_count !==0) {
                                    str += '参加了' + timeLineInfo[i].study[j].resource_count + '个活动并发了'+ timeLineInfo[i].study[j].join_count +'个帖子，';
                                }
                                break;
                            case '7':
                                if(timeLineInfo[i].study[j].resource_count !== 0) {
                                    str += '提了' + timeLineInfo[i].study[j].resource_count + '个问题，'
                                }
                                break;
                            case '8':
                                if(timeLineInfo[i].study[j].resource_count !== 0) {
                                    str += '记了' + timeLineInfo[i].study[j].resource_count +  '个笔记，';
                                }
                            default:
                                break;
                        }
                    }
                    str = str.slice(0, str.length - 1);
                    strArr.push(str);
                }
                $scope.content = strArr;
                $timeout(function() {
                    utilService.timeShaftAnimation();
                }, 2000);
                if(x == 0) {
                    $('#timeLine #cd-timeline').hide();
                    $('#timeLine .none-data').html('暂时没有学习记录..').show();
                }
            }else {
                $('#timeLine #cd-timeline').hide();
                $('#timeLine .none-data').html('暂时没有学习记录..').show();
            }
        }, function() {
            $('#timeLine #cd-timeline').hide();
            $('#timeLine .none-data').html('请求数据出错了..').show();
        });



    }
})();