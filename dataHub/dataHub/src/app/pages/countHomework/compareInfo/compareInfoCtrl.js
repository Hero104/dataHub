(function () {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework').controller('compareInfoCtrl', compareInfoCtrl);

    /** @ngInject */
    function compareInfoCtrl($scope, $stateParams, ipCookie, baConfig, baUtil, utilService, chartService, homeworkUrl) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId,
            homeworkId = $stateParams.homeworkId;
        var baseParams = {
            access_token: token,
            course_id: courseId,
            homework_id: homeworkId
        };
        $scope.page = {
            currentPage: 1,
            pageSize: 12
        };

        utilService.dataRes(homeworkUrl.classTableUrl, baseParams).then(function (res) {
            if (res.data.code == 0 && res.data.data) {
                var tableInfo = res.data.data;
                console.log(tableInfo);
                if (tableInfo.length !== 0) {
                    var scoreChartData = {
                        name: [],
                        gradeHightest: [],
                        gradeAverage: [],
                        gradeLowest: []
                    },
                        pieColor = [
                            baUtil.hexToRGB(baConfig.colors.info, 0.5),
                            baUtil.hexToRGB(baConfig.colors.success, 0.5),
                            baUtil.hexToRGB(baConfig.colors.warning, 0.5),
                            baUtil.hexToRGB(baConfig.colors.danger, 0.5)
                        ],
                        sumbitRageClass = [],
                        submitRageList = [],
                        passRageChart = [],
                        tableData = [];


                    for (var i = 0; i < tableInfo.length; i++) {
                        if (tableInfo[i].avgScore !== 0) {
                            scoreChartData.name.push(tableInfo[i].class_name);
                            scoreChartData.gradeHightest.push(tableInfo[i].max_score);
                            scoreChartData.gradeAverage.push(tableInfo[i].avg_max_score);
                            scoreChartData.gradeLowest.push(tableInfo[i].min_max_score);
                        }
                        passRageChart.push({
                            'name': tableInfo[i].class_name,
                            'percentSelf': tableInfo[i].pass_rate
                        });
                        submitRageList.push({
                            color: pieColor[i],
                            name: tableInfo[i].class_name
                        });
                        sumbitRageClass.push(tableInfo[i].submit_rate);
                        tableData.push({
                            id: i + 1,
                            className: tableInfo[i].class_name,
                            setPeopleNum: tableInfo[i].user_count,
                            subPeopleNum: tableInfo[i].sumbit_user_count,
                            passRage: tableInfo[i].pass_rate + '%',
                            subRage: tableInfo[i].submit_rate + '%',
                            gradeHeightest: tableInfo[i].max_score,
                            gradeLowest: tableInfo[i].min_max_score,
                            gradeAverage: tableInfo[i].avg_max_score
                        })
                    }

                    // 班级成绩对比
                    $scope.sortList = {
                        name: ['最高成绩', '平均分', '最低成绩'],
                        type: ['gradeHightest', 'gradeAverage', 'gradeLowest'],
                        color: [baConfig.colors.primary, baConfig.colors.success, baConfig.colors.danger]
                    };
                    scoreChartData.all = [scoreChartData.gradeHightest, scoreChartData.gradeAverage, scoreChartData.gradeLowest];
                    chartService.barChart('stacked-bar', scoreChartData, $scope.sortList);

                    // 班级及格率对比
                    var lable = {
                        lineText: "[[title]]<br/><b style='font-size: 130%'>[[value]]%</b>",
                        barName: '班级及格率',
                        barText: "[[title]]<br/><b style='font-size: 130%'>[[value]]%</b>"
                    };
                    chartService.campareChart('zoomAxisChart', passRageChart, lable);


                    // 班级提交率对比
                    $scope.submitRageList = submitRageList.slice(0, 4);
                    utilService.perAnimation(sumbitRageClass.slice(0, 4));

                    // 课程统计
                    $scope.page.total = tableData.length;
                    $scope.tableData = tableData.slice(($scope.page.currentPage - 1) * $scope.page.pageSize, $scope.page.currentPage * $scope.page.pageSize);
                    $scope.changePage = function (page) {
                        $scope.tableData = tableData.slice((page - 1) * $scope.page.pageSize, page * $scope.page.pageSize)
                    };
                } else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#gradeHomework').hide();
                    $('#rageCompare').hide();
                    $('#countTable .none-data').html('暂时没有数据...').show();
                }
            } else {
                $('#countTable .horizontal-scroll').hide();
                $('#gradeHomework').hide();
                $('#rageCompare').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            }
        });

        $scope.more = function() {
            document.getElementById('countTable').scrollIntoView();
            console.log($('.more-right').css({fontWeight:'bold',color:'#F4ABAB'}))
        };




    }
})();