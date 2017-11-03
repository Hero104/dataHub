(function () {
    'use strict';

    angular.module('BlurAdmin.pages.adDataBase').controller('adDataBaseCtrl', function ($scope, $state, $stateParams, $timeout, chartService, ipCookie, utilService, adDataBaseUrl, colorHelper, baUtil, baConfig) {
        var token = ipCookie('accessToken'),
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2),
            courseId = $stateParams.courseId;
        $scope.courseId = courseId;
        $scope.page = {
            currentPage: 1,
            pageSize: 12
        };
        var baseParams = {
            access_token: token
        };
        var screenY = window.innerHeight;
        $('.base-wrapper').height(screenY);

        // ---------------------------------------------- 基本数据 -----------------------------------------------------
        utilService.dataRes(adDataBaseUrl.testUrl, baseParams).then(function (res) {
            if (res.data.code == 0 && res.data.data) {
                var baseData = res.data.data;
                // console.log(baseData);
                $scope.baseNum = [
                    {
                        color: pieColor,
                        description: '学生人数',
                        stats: utilService.formatNum(123456) + ' 人',
                        icon: 'student'
                    }, {
                        color: pieColor,
                        description: '教师人数',
                        stats: utilService.formatNum(123456) + ' 人',
                        icon: 'teacher'
                    }, {
                        color: pieColor,
                        description: '开课数量',
                        stats: utilService.formatNum(123456) + ' 个',
                        icon: 'time'
                    }, {
                        color: pieColor,
                        description: '专业数量',
                        stats: utilService.formatNum(123456) + ' 个',
                        icon: 'num'
                    }, {
                        color: pieColor,
                        description: '学院数量',
                        stats: utilService.formatNum(123456) + ' 个',
                        icon: 'num'
                    }
                ];
            }
        });


        // ---------------------------------------------- 学生学习统计 --------------------------------------------------------
        $scope.dateList = ['最近七天', '最近一个月', '最近三个月', '自定义时间'];
        function lineChartData(startDate, endDate) {
            var params = {
                access_token: token,
                courseId: courseId,
                startDate: startDate,
                endDate: endDate ? endDate : utilService.getLocalDate()
            };
            utilService.dataRes(adDataBaseUrl.studyNum, params).then(function (res) {
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
                            chartData.login.push(studyNum[i].note_count);
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
        // 时间选择
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
        // 查询点击
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

        // ---------------------------------------------- 学员人数统计 -----------------------------------------------------
        utilService.dataRes(adDataBaseUrl.testUrl, baseParams).then(function (res) {
            var point = ['财会学院', '物理学院', '英语学院', '高职学院', '土建学院', '化学学院'];
            var positionArr = [
                [113.5432, 31.21165],
                [115.00461, 31.01165],
                [113.7432, 30.08395],
                [115.00461, 30.28395],
                [113.3400, 30.58395],
                [114.64717, 31.32063],
                [114.54717, 30.02063],
                [115.04717, 30.62063],
                [114.14717, 31.39063],
                [113.44717, 30.89063]
            ];
            var positionOrg = [114.24717, 30.72063];
            var chartData = {
                dataCoords: [],
                dataLine: [{
                    name: '机构',
                    value: positionOrg,
                    itemStyle: {
                        normal: {
                            color: 'orange'
                        }
                    },
                    symbol: 'image://assets/img/mine/org.svg',
                    symbolSize: 60
                }]
            };
            for (var i = 0; i < point.length; i++) {
                chartData.dataCoords.push({
                    coords: [positionArr[i], positionOrg]
                });
                chartData.dataLine.push({
                    'name': point[i],
                    'value': positionArr[i],
                    symbol: 'image://assets/img/mine/college.svg'
                })
            }
            chartService.collegeRelationChart('collegeChart', chartData)
        });

        // ---------------------------------------------- 学院学习时段分布 -----------------------------------------------------
        utilService.dataRes(adDataBaseUrl.testUrl, baseParams).then(function (res) {
            var chartData = {
                myData: ['财会学院', '物理学院', '英语学院', '高职学院', '土建学院', '化学学院'],
                timeLineData: ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                databeast: {
                    '09': [363, 396, 388, 108, 325, 120],
                    '10': [300, 350, 300, 250, 200, 150],
                    '11': [100, 350, 300, 250, 200, 150],
                    '12': [280, 128, 255, 254, 313, 143],
                    '13': [389, 259, 262, 324, 232, 176],
                    '14': [111, 315, 139, 375, 204, 352],
                    '15': [227, 210, 328, 292, 241, 110],
                    '16': [100, 350, 300, 250, 200, 150],
                    '17': [280, 128, 255, 254, 313, 143],
                    '18': [121, 388, 233, 309, 133, 308],
                    '19': [200, 350, 300, 250, 200, 150],
                    '20': [380, 129, 173, 101, 310, 393],
                    '21': [380, 129, 173, 101, 310, 393],
                    '22': [380, 129, 173, 101, 310, 393],
                    '23': [380, 129, 173, 101, 310, 393],
                },
                databeauty: {
                    '09': [121, 388, 233, 309, 133, 308],
                    '10': [200, 350, 300, 250, 200, 150],
                    '11': [380, 129, 173, 101, 310, 393],
                    '12': [363, 396, 388, 108, 325, 120],
                    '13': [300, 350, 300, 250, 200, 150],
                    '14': [100, 350, 300, 250, 200, 150],
                    '15': [280, 128, 255, 254, 313, 143],
                    '16': [389, 259, 262, 324, 232, 176],
                    '17': [111, 315, 139, 375, 204, 352],
                    '18': [227, 210, 328, 292, 241, 110],
                    '19': [100, 350, 300, 250, 200, 150],
                    '20': [280, 128, 255, 254, 313, 143],
                    '21': [100, 350, 300, 250, 200, 150],
                    '22': [227, 210, 328, 292, 241, 110],
                    '23': [111, 315, 139, 375, 204, 352],
                }
            };
            $('#contrastCollege').height(100 * chartData.myData.length);
            chartService.contrastChart('contrastCollege', chartData);
        });

        // ---------------------------------------------- 学院学习时段分布 -----------------------------------------------------
        $scope.collegeFilter = ['按学习时长', '按人均学习时长', '按教师学习时长', '按师生比'];
        function getStudentNum() {
            utilService.dataRes(adDataBaseUrl.testUrl, baseParams).then(function (res) {
                $scope.postHint = {
                    name: ['人数'],
                    type: ['postNum'],
                    color: [baConfig.colors.primary]
                };
                var postChartData = {
                    name: ['财会学院', '物理学院', '英语学院', '高职学院', '土建学院', '化学学院', '信息学院', '电子学院'],
                    postNum: [100, 80, 200, 500, 100, 50, 300, 220],
                    all: [[100, 80, 200, 500, 100, 50, 300, 220]]
                };
                chartService.barChart('countPost', postChartData, $scope.postHint);
            });
        }
        $scope.filtrateCollege = function (index) {
            $scope.collegeNav = index;
            getStudentNum();
        };
        $scope.filtrateCollege(0);

        // ---------------------------------------------- 学院课程开设对比 -----------------------------------------------------
        utilService.dataRes(adDataBaseUrl.compareCourse, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var resType = res.data.data;
                // console.log(resType);
                var collegeArr = ['财会学院', '物理学院', '英语学院', '高职学院', '土建学院', '化工学院'];
                $timeout(function() {
                    if(collegeArr.length > 5) {
                        $('#courseCompared .zoomIn').height(60 * collegeArr.length + 60);                                 // 背景白
                        $('#courseCompared #chart-area').css({marginTop:(60 * collegeArr.length - 300) / 2 + 'px'});    // 圈居中
                        $('#courseCompared .title').css({top:(60 * collegeArr.length - 30) / 2 + 'px'})                  // 圈中标题居中
                    }
                });

                var resource = {
                    name: collegeArr,
                    num: [
                        resType.resourceTypeOne,
                        resType.resourceTypeTwo,
                        resType.resourceTypeThree,
                        resType.resourceTypeFour,
                        resType.resourceTypeFive,
                        resType.resourceTypeSix
                    ],
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
                            dashboardColors.greenBlur,
                            dashboardColors.yellow,
                            dashboardColors.blue,
                            dashboardColors.orange,
                            dashboardColors.pink
                        ],
                        hoverBackgroundColor: [
                            colorHelper.shade(dashboardColors.white, 15),
                            colorHelper.shade(dashboardColors.blueStone, 15),
                            colorHelper.shade(dashboardColors.surfieGreen, 15),
                            colorHelper.shade(dashboardColors.silverTree, 15),
                            colorHelper.shade(dashboardColors.gossip, 15),
                            colorHelper.shade(dashboardColors.greenBlur, 15),
                            colorHelper.shade(dashboardColors.yellow, 15),
                            colorHelper.shade(dashboardColors.blue, 15),
                            colorHelper.shade(dashboardColors.orange, 15),
                            colorHelper.shade(dashboardColors.pink, 15),
                        ],
                        percentage: resource.percent
                    }]
                };
                chartService.pieAmChart('chart-area', $scope.doughnutData)
            }else {
                $('#courseCompared .channels-block').hide();
                $('#courseCompared .none-data').html('数据请求出错了...').show();
            }
        }, function() {
            $('#courseCompared .channels-block').hide();
            $('#courseCompared .none-data').html('数据请求出错了...').show();
        });

        // ---------------------------------------------- 排行榜 -----------------------------------------------------
        $scope.ranking = [
            {
                name: '学习排行榜',
                color: 'progress-bar-danger',
                list: [{
                    finish: '40%',
                    name: '李子木',
                    time: 1200,
                    college: '化学学院'
                }, {
                    finish: '60%',
                    name: '宋子成',
                    time: 1400,
                    college: '物理学院'
                }]
            }, {
                name: '课程排行榜',
                color: 'progress-bar-primary',
                list: [{
                    finish: '40%',
                    name: '李子木',
                    time: 1200,
                    college: '化学学院'
                }, {
                    finish: '60%',
                    name: '宋子成',
                    time: 1400,
                    college: '物理学院'
                }]
            }, {
                name: '老师排行榜',
                color: 'progress-bar-info',
                list: [{
                    finish: '40%',
                    name: '李子木',
                    time: 1200,
                    college: '化学学院'
                }, {
                    finish: '60%',
                    name: '宋子成',
                    time: 1400,
                    college: '物理学院'
                }]
            }
        ];

        // ---------------------------------------------- 学院统计 -----------------------------------------------------
        $scope.collegeTableData = [
            {
                id: 123,
                name: '财会学院',
                numStudent: 200,
                numTeacher: 15,
                numCourse: 16,
                numSpecial: 25
            }, {
                id: 456,
                name: '物理学院',
                numStudent: 240,
                numTeacher: 18,
                numCourse: 16,
                numSpecial: 25
            }, {
                id: 789,
                name: '英语学院',
                numStudent: 200,
                numTeacher: 15,
                numCourse: 16,
                numSpecial: 25
            }, {
                id: 147,
                name: '高职学院',
                numStudent: 200,
                numTeacher: 15,
                numCourse: 16,
                numSpecial: 25
            }, {
                id: 258,
                name: '土建学院',
                numStudent: 200,
                numTeacher: 15,
                numCourse: 16,
                numSpecial: 25
            }, {
                id: 369,
                name: '化学学院',
                numStudent: 200,
                numTeacher: 15,
                numCourse: 16,
                numSpecial: 25
            }
        ];
        $scope.collegeInfo = function() {
            ipCookie('college', $scope.collegeTableData[this.$index]);
            ipCookie('nav', 0);
            $state.go('collegeInfo', {reload:true});
        }

    })
})();