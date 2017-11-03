(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').controller('stuInfoCtrl', stuInfoCtrl);

    /** @ngInject */
    function stuInfoCtrl($scope, ipCookie, baUtil, baConfig, utilService, stuControlUrl, chartService) {
        var token = ipCookie('accessToken'),
            layoutColors = baConfig.colors,
            pieColor = baUtil.hexToRGB(layoutColors.defaultText, 0.2);

        // 基本信息
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            $scope.stuBaseInfo = {
                name: "李子木",
                IDcard: 140112199012142411,
                sex: '男',
                specialty: '计算机',
                school: '上海大学',
                eduBg: '本科'
            };
            $scope.baseNum = [{
                color: pieColor,
                description: '课程数量',
                stats: '57,820门'
            }, {
                color: pieColor,
                description: '学习时长',
                stats: '89,745分'
            },{
                color: pieColor,
                description: '登录次数',
                stats: '89,745次'
            },{
                color: pieColor,
                description: '笔记数量',
                stats: '89,745个'
            }, {
                color: pieColor,
                description: '答疑数量',
                stats: '178,391个'
            }];
        });

        // 学习时长分布
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            $scope.labels = ["视频", "文档", "作业"];
            $scope.time = [20, 40, 5];
            $scope.percent = ['20%', '40%', '5%'];
            $scope.options = {
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: layoutColors.defaultText
                    }
                }
            };
            // 列表
            var studyTimeList = [];
            for(var i = 0; i < 3; i++) {
                studyTimeList.push({
                    id: i + 1,
                    name: $scope.labels[i],
                    time:  $scope.time[i],
                    percent: $scope.percent[i]
                })
            }
            $scope.metricsTableData = studyTimeList;
        });

        // 作业成绩分析
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            var homeworkName = ['作业1', '作业2', '作业3', '作业4', '作业5'],
                homeworkAvgGrade = [71, 75, 76, 70, 60, 60, 60, 60, 60, 60],
                homeworkGrade = [80, 90, 96, 88, 58];
            var homeworkChart = [{
                name:'我的成绩',
                type:'bar',
                barWidth: '0%',
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
                chartName: ['我的成绩', '平均成绩']
            };
            chartService.compareEchart('zoomAxisChart', homeworkChart, lableHomework);
        });

        // 课程进度
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            $scope.progressCourse = [{
                course: '大学英语',
                percent: '20%'
            }, {
                course: '高等数学',
                percent: '50%'
            }, {
                course: '计算机',
                percent: '70%'
            }];
        });

        // 答疑笔记
        $('#stuNote .panel-title').css({'fontSize': 0});
        $scope.dateList = ['最近七天', '最近一个月', '最近六个月'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
        };
        $scope.filtrate(1);
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            var noteChartData = {
                x: ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-07'],
                first: [70, 80, 90, 80, 70, 60, 50],
                second: [80, 90, 100, 90, 80, 70, 60]
            };
            chartService.lineEchart('notebookAnswer', noteChartData)
        });

        // 活动活跃度
        utilService.dataInfo(stuControlUrl.testUrl, token).then(function(res) {
            $scope.progressLiveness = [{
                    course: '大学英语',
                    liveness: '30%'
                }, {
                    course: '高等数学',
                    liveness: '60%'
                }, {
                    course: '计算机',
                    liveness: '90%'
                }];
        });


        // 课程详情统计
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        utilService.dataInfo(stuControlUrl.tableUrl, token).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var tableInfo = JSON.parse(res.data.data);
                // console.log(tableInfo);
                if(tableInfo.length !== 0) {
                    var courseInfoTableInfo = [];
                    for(var i = 0; i < tableInfo.length; i++) {
                        courseInfoTableInfo.push({
                            id: i + 1,
                            name: '计算机',
                            progress: 15 + i + '%',
                            grade: 39 + i,
                            time: 255 + i,
                            noteNum: 10 + i,
                            visitNum: 8 + i
                        })
                    }
                    $scope.page.total = courseInfoTableInfo.length;
                    $scope.courseInfoTableInfo = courseInfoTableInfo.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                    $scope.changePage = function(page) {
                        $scope.courseInfoTableInfo = courseInfoTableInfo.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                    };
                }else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#countTable .none-data').html('暂时没有数据...').show();
                }
            }else {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            }
        });
    }

})();
