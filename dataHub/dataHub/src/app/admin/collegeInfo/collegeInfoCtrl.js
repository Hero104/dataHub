(function () {
    'use strict';

    angular.module('BlurAdmin.pages.collegeInfo').controller('collegeInfoCtrl', collegeInfoCtrl);

    function collegeInfoCtrl($scope, ipCookie, baConfig, baUtil, $timeout, utilService, collegeInfoUrl, adminChart, chartService) {
        var token = ipCookie('accessToken'),
            layoutColors = baConfig.colors;
        var baseParams = {
            access_token: token
        };

        // ---------------------------------- 基本数据 ---------------------------------------
        utilService.dataRes(collegeInfoUrl.testUrl, baseParams).then(function (res) {
            $scope.scoreData = {
                rankingAll: 30,
                score: 90,
                scoreType: [
                    {
                        name: '学生得分',
                        value: 25
                    }, {
                        name: '老师得分',
                        value: 45
                    }, {
                        name: '课程得分',
                        value: 20
                    }
                ]
            };
            adminChart.scoreScale('scoreScale', $scope.scoreData);
            $scope.timeData = [
                {
                    time: '2017-01'
                }, {
                    time: '2017-02'
                }, {
                    time: '2017-03'
                }, {
                    time: '2017-04'
                }, {
                    time: '2017-05'
                }, {
                    time: '2017-06'
                }
            ];
            $scope.studyInfoData = [
                {
                    img: '/assets/img/mine/student.svg',
                    type: '学生',
                    numLogin: 100,
                    numStudy: 150,
                    percent: '90%',
                    typeName: '完成率'
                }, {
                    img: '/assets/img/mine/teacher.svg',
                    type: '老师',
                    numLogin: 100,
                    numStudy: 150,
                    percent: '50分钟',
                    typeName: '每次时长'
                }, {
                    img: '/assets/img/mine/course.svg',
                    type: '课程',
                    numLogin: 100,
                    numStudy: 150,
                    percent: '60分钟',
                    typeName: '每次时长'
                }
            ];
        });

        // ---------------------------------- 学习趋势分析 ---------------------------------------
        $scope.dateList = ['最近七天', '最近一个月', '最近三个月', '自定义时间'];
        function lineChartData(startDate, endDate) {
            var params = {
                access_token: token,
                startDate: startDate,
                endDate: endDate ? endDate : utilService.getLocalDate()
            };
            utilService.dataRes(collegeInfoUrl.studyNum, params).then(function (res) {
                if (res.data.code == 0 && res.data.data) {
                    var studyNum = res.data.data;
                    // console.log(studyNum);
                    if (studyNum.length !== 0) {
                        $('.chartShow #amchart').show();
                        $('.chartShow .none-data').hide();
                        var chartData = {
                            dataSub: [],
                            login: [],
                            study: []
                        };
                        for (var i = 0; i < studyNum.length; i++) {
                            chartData.dataSub.push(studyNum[i].statis_date);
                            // chartData.login.push(studyNum[i].note_count);
                            chartData.study.push(studyNum[i].ask_count)
                        }
                        chartService.twoLineChart('amchart', chartData);
                    } else {
                        $('.chartShow #amchart').hide();
                        $('.chartShow .none-data').html('暂时没有数据...').show();
                    }
                } else {
                    $('.chartShow #amchart').hide();
                    $('.chartShow .none-data').html('数据请求出错了...').show();
                }
            }, function () {
                $('.chartShow #amchart').hide();
                $('.chartShow .none-data').html('数据请求出错了...').show();
            });
        }

        $scope.filtrate = function (index) {
            $scope.logNav = index;
            if (index == 3) {
                $scope.datePickerShow = true;
                return;
            }
            lineChartData(utilService.getLocalDate(index));
            $scope.datePickerShow = false;
        };
        $scope.filtrate(2);
        $scope.searchLineChartDate = function () {
            var formDateStart = $('#formDateStart')[0].value,
                formDateEnd = $('#formDateEnd')[0].value,
                startNum = new Date(formDateStart).getTime(),
                endNum = new Date(formDateEnd).getTime();
            if (!formDateStart || !formDateEnd) {
                utilService.alert($scope, 'app/theme/alert/empty.html', 'sm');
                return;
            }
            if (startNum > endNum) {
                utilService.alert($scope, 'app/theme/alert/timeErr.html', 'sm');
                return;
            }
            lineChartData(formDateStart, formDateEnd);
            $scope.datePickerShow = false;
        };

        // ---------------------------------- 统计 ---------------------------------------
        // 学习时段统计
        utilService.dataRes(collegeInfoUrl.timeFrame, baseParams).then(function (res) {
            if (res.data.data && res.data.data.length !== 0) {
                var postInfo = res.data.data[0];
                // console.log(postInfo);
                var typeSortList = [],
                    typeSortName = ['清晨', '上午', '下午', '傍晚', '夜晚'],
                    typeSortNum = [postInfo.join_level_1, postInfo.join_level_2, postInfo.join_level_3, postInfo.join_level_4, postInfo.join_level_5],
                    typeSortColor = [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning],
                    sum = 0;
                for (var i = 0; i < typeSortNum.length; i++) {
                    sum += typeSortNum[i];
                }
                for (var i = 0; i < typeSortName.length; i++) {
                    typeSortList.push({
                        name: typeSortName[i],
                        num: typeSortNum[i],
                        percent: Math.round(typeSortNum[i] / sum * 100) + '%',
                        color: typeSortColor[i]
                    })
                }
                $scope.typeSortList = typeSortList;
                chartService.barAmchart('sortPost', typeSortList);
            } else {
                $('.postsort-wrap .postsort-content').hide();
                $('.postsort-wrap .none-data').show();
            }
        }, function () {
            $('.postsort-wrap .postsort-content').hide();
            $('.postsort-wrap .none-data').html('数据请求出错了...').show();
        });
        // 课程成绩统计
        utilService.dataRes(collegeInfoUrl.scoreUrl, baseParams).then(function (res) {
            if (res.data.data && res.data.data.length !== 0) {
                var scoreInfo = res.data.data[0];
                // console.log(scoreInfo)
                var gradeTypeList = [],
                    gradeTypeNum = [scoreInfo.score_level_1, scoreInfo.score_level_2, scoreInfo.score_level_3, scoreInfo.score_level_4, scoreInfo.score_level_5],
                    sum = 0;
                var lableScore = {
                    text: '',
                    subtext: '',
                    legendData: ['0-59', '60-69', '70-79', '80-89', '90-100'],
                    colorData: [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning],
                    size: ['55%', '68%'],
                    textPositon: '',
                    positionTip: 'left'
                };
                for (var i = 0; i < gradeTypeNum.length; i++) {
                    sum += gradeTypeNum[i];
                }
                for (var i = 0; i < gradeTypeNum.length; i++) {
                    gradeTypeList.push({
                        name: lableScore.legendData[i],
                        value: gradeTypeNum[i],
                        percent: Math.round(gradeTypeNum[i] / sum * 100) + '%'
                    })
                }
                chartService.pieEchart('sortScore', gradeTypeList, lableScore);
                $scope.gradeSortTableData = gradeTypeList;
            } else {
                $('.grade-type .grade-content').hide();
                $('.grade-type .none-data').show();
            }
        }, function () {
            $('.grade-type .grade-content').hide();
            $('.grade-type .none-data').html('数据请求出错了...').show();
        });
        // 教师数据统计
        utilService.dataRes(collegeInfoUrl.testUrl, baseParams).then(function (res) {
            $scope.teacherData = [
                {
                    img: '/assets/img/mine/percent.svg',
                    name: '作业批阅率',
                    value: '80%'
                }, {
                    img: '/assets/img/mine/callback.svg',
                    name: '答疑回复率',
                    value: '90%'
                }, {
                    img: '/assets/img/mine/login.svg',
                    name: '登录次数',
                    value: '221次'
                }, {
                    img: '/assets/img/mine/time.svg',
                    name: '在线时长',
                    value: '360分钟'
                }
            ]
        });

        // ---------------------------------- 标签 ---------------------------------------
        utilService.dataRes(collegeInfoUrl.testUrl, baseParams).then(function (res) {
            var chartData = [
                    {
                        name: '学生标签',
                        data: [],
                        sort: [
                            {
                                name: '学生登录',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '学生学习',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '学生提问',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '学生笔记',
                                one: 200,
                                two: 200,
                                three: 10
                            }
                        ]
                    }, {
                        name: '老师标签',
                        data: [],
                        sort: [
                            {
                                name: '教师登录',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '教师在线',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '作业批阅',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '答疑回复',
                                one: 200,
                                two: 200,
                                three: 10
                            }
                        ]
                    }, {
                        name: '课程标签',
                        data: [],
                        sort: [
                            {
                                name: '浏览次数',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '课程学习',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '课程笔记',
                                one: 200,
                                two: 200,
                                three: 10
                            }, {
                                name: '课程答疑',
                                one: 200,
                                two: 200,
                                three: 10
                            }
                        ]
                    }
                ],
                max = 999;
            var arrStudent = ['爱学习', '参加活动', '登录', '做作业', '提问问题', '逻辑严谨', '图书馆', '看书', '上网', '爱学习', '参加活动', '登录', '做作业', '提问问题', '逻辑严谨', '图书馆', '看书', '上网'];
            var arrTeacher = ['责任老师', '批改作业', '心理辅导', '回复活动', '为人师表', '教书育人', '批改作业', '引导学生', '备课', '管理班级', '责任老师', '批改作业', '心理辅导', '回复活动', '为人师表', '教书育人', '批改作业', '引导学生', '备课', '管理班级'];
            var arrCourse = ['好课', '浏览次数', '学习人数', '人均学习', '逻辑严谨', '浏览', '多学多练', '结构清晰', '方便学习', '节奏合理', '好课', '浏览次数', '学习人数', '人均学习', '逻辑严谨', '浏览', '多学多练', '结构清晰', '方便学习', '节奏合理'];
            var arrValue = [];
            for (var i = 0; i < 40; i++) {
                max = max - Math.round(max / 8);
                arrValue.push(max);
            }
            for (var i = 0; i < arrStudent.length; i++) {
                chartData[0].data.push({
                    name: arrStudent[i],
                    value: arrValue[i]
                })
            }
            for (var i = 0; i < arrTeacher.length; i++) {
                max = max - Math.round(max / 8);
                chartData[1].data.push({
                    name: arrTeacher[i],
                    value: arrValue[i]
                })
            }
            for (var i = 0; i < arrCourse.length; i++) {
                max = max - Math.round(max / 8);
                chartData[2].data.push({
                    name: arrCourse[i],
                    value: arrValue[i]
                })
            }
            $scope.chartData = chartData;
            $timeout(function () {
                for (var i = 0; i < chartData.length; i++) {
                    adminChart.sign($('.sign')[i], chartData[i].data);
                }
            })

        });


    }
})();