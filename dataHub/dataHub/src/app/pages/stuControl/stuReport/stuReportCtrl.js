(function() {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').controller('stuReportCtrl', stuReportCtrl);

    /** @ngInject */
    function stuReportCtrl($scope, $stateParams, chartService, ipCookie, baConfig, baUtil, utilService, stuControlUrl) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId,
            userId = $stateParams.userId,
            layoutColors = baConfig.colors;
        var baseParams = {
            access_token: token,
            course_id: courseId,
            user_id: userId
        };

        // 基础数据
        // utilService.dataRes(stuControlUrl.reprotBaseUrl, baseParams).then(function(res) {
        utilService.dataPost(stuControlUrl.reprotBaseUrl, baseParams).then(function(res) {
            console.log(res);
            if(res.data && res.data.length !== 0) {
                var baseInfo = res.data[0];
                $scope.progress = baseInfo.progress;
                $scope.courseName = baseInfo.course_name;
                var finishedChart = [ {
                    "title": "完成",
                    "value": $scope.progress,
                    "color": layoutColors.primary
                }, {
                    "title": "未完成",
                    "value": 100 - $scope.progress,
                    "color": layoutColors.border
                } ];
                chartService.percentChart('amchartPercent', finishedChart);

                var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
                $scope.baseNum = [{
                    color: pieColor,
                    description: '学习时长',
                    stats: utilService.formatNum(utilService.goMinute(baseInfo.total_study_time)) + ' 分',
                    icon: 'time'
                }, {
                    color: pieColor,
                    description: '浏览次数',
                    stats: utilService.formatNum(baseInfo.study_count) + ' 次',
                    icon: 'view'
                }, {
                    color: pieColor,
                    description: '笔记数量',
                    stats: utilService.formatNum(baseInfo.note_count) + ' 个',
                    icon: 'homework'
                }, {
                    color: pieColor,
                    description: '答疑数量',
                    stats: utilService.formatNum(baseInfo.ask_count) + ' 个',
                    icon: 'question'
                }];

                // 学习时长分布
                var studyTotal = utilService.goMinute(baseInfo.total_study_time),
                    videoTime = utilService.goMinute(baseInfo.video_study_time),
                    docuTime = utilService.goMinute(baseInfo.document_study_time),
                    homeworkTime = studyTotal - videoTime - docuTime,
                    videoPercent = videoTime ? Math.round(videoTime/studyTotal*100) : 0,
                    docuPercent = docuTime ? Math.round(docuTime/studyTotal*100) : 0,
                    homeworkPercent = homeworkTime ? 100-videoPercent-docuPercent : 0;
                if(studyTotal !== 0) {
                    $scope.labels = ["视频", "文档", "作业"];
                    $scope.time = [videoTime, docuTime, homeworkTime];
                    $scope.percent = [videoPercent, docuPercent, homeworkPercent];
                    $scope.options = chartService.pieChart();
                    var studyTimeList = [];
                    for(var i = 0; i < 3; i++) {
                        studyTimeList.push({
                            id: i,
                            name: $scope.labels[i],
                            time:  $scope.time[i],
                            percent: $scope.percent[i] + '%'
                        })
                    }
                    $scope.metricsTableData = studyTimeList;
                }else {
                    $('.study-time').hide();
                }
            }else {
                $('.study-time .chartjs-canvas-holder-first-row').hide();
                $('#courseBaseData').hide();
                $('#courseFirst').hide();
                $('.study-time .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('.study-time .chartjs-canvas-holder-first-row').hide();
            $('#courseBaseData').hide();
            $('#courseFirst').hide();
            $('.study-time .none-data').html('数据请求出错了...').show();
        });

        // 作业成绩分析
        $scope.pageScore = {
            currentPage: 1,
            pageSize: 5
        };
        // utilService.dataRes(stuControlUrl.homeScoreUrl, baseParams).then(function(res) {
        utilService.dataPost(stuControlUrl.homeScoreUrl, baseParams).then(function(res) {
            // console.log(res);
            if(res.data && res.data.length !== 0) {
                var homework = res.data,
                    homeworkName = [],
                    homeworkGrade = [],
                    homeworkAvgGrade = [],
                    sortHomework = [];
                for(var i = 0; i < homework.length; i++) {
                    homeworkName.push(homework[i].homework_name);
                    homeworkGrade.push(homework[i].max_score);
                    homeworkAvgGrade.push(homework[i].avg_score);
                    sortHomework.push({
                        id: i + 1,
                        time: homework[i].study_time,
                        name: homework[i].homework_name,
                        avgGrade: homework[i].avg_score,
                        grade: homework[i].max_score,
                        mistakes: homework[i].error_count
                    });
                }
                var homeworkChart = [{
                    name:'个人成绩',
                    type:'bar',
                    barWidth: '70%',
                    data: homeworkGrade
                }, {
                    name: '平均成绩',
                    type: 'line',
                    data: homeworkAvgGrade,
                    label: {
                        normal: {
                            show: true,
                            position: 'top' //值显示
                        }
                    }
                }];
                var lableHomework = {
                    dataName: homeworkName,
                    chartName: ['个人成绩', '平均成绩']
                };
                chartService.compareEchart('zoomAxisChart', homeworkChart, lableHomework);
                $scope.pageScore.total = sortHomework.length;
                $scope.homeworkTableData = sortHomework.slice(($scope.pageScore.currentPage-1)*$scope.pageScore.pageSize, $scope.pageScore.currentPage*$scope.pageScore.pageSize);
                $scope.changePageScore = function(page) {
                    $scope.homeworkTableData = sortHomework.slice((page-1)*$scope.pageScore.pageSize, page*$scope.pageScore.pageSize)
                }
            }else {
                $('.home-grade .horizontal-scroll, .home-grade #zoomAxisChart').hide();
                $('.home-grade .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('.home-grade .horizontal-scroll, .home-grade #zoomAxisChart').hide();
            $('.home-grade .none-data').html('数据请求出错了...').show();
        });

        // 活动活跃度
        // utilService.dataRes(stuControlUrl.activityUrl, baseParams).then(function(res) {
        utilService.dataPost(stuControlUrl.activityUrl, baseParams).then(function(res) {
            // console.log(res);
            if(res.data && res.data.length !== 0) {
                var progressData = res.data,
                    progress = [];
                for(var i = 0; i < progressData.length; i++) {
                    progress.push({
                        id: i + 1,
                        course: progressData[i].activity_name,
                        liveness: progressData[i].join_count
                    })
                }
                $scope.progressLiveness = progress
            }else {
                $('#progressLiveness .horizontal-scroll').hide();
                $('#progressLiveness .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('#progressLiveness .horizontal-scroll').hide();
            $('#progressLiveness .none-data').html('数据请求出错了...').show();
        });

        // 资源统计
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        // utilService.dataRes(stuControlUrl.resTableUrl, baseParams).then(function(res) {
        utilService.dataPost(stuControlUrl.resTableUrl, baseParams).then(function(res) {
            console.log(res);
            if(res.data && res.data.length !== 0) {
                var tableInfo = res.data;
                var resourceTableData = [];
                for(var i = 0; i < tableInfo.length; i++) {
                    resourceTableData.push({
                        id: i + 1,
                        name: tableInfo[i].resource_name,
                        progress: tableInfo[i].progress + '%',
                        studyTime: utilService.goMinute(tableInfo[i].study_time),
                        noteNum: tableInfo[i].note_count,
                        questionNum: tableInfo[i].ask_count,
                        loginNum: tableInfo[i].study_count
                    });
                    $scope.page.total = resourceTableData.length;
                    $scope.resourceTableData = resourceTableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                    $scope.changePage = function(page) {
                        $scope.resourceTableData = resourceTableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                    };
                }
            }else {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('#countTable .horizontal-scroll').hide();
            $('#countTable .none-data').html('数据请求出错了...').show();
        });

    }
})();