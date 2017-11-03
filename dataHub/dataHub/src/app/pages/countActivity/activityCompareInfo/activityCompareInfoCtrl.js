(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countActivity').controller('activityCompareInfoCtrl', activityCompareInfoCtrl);

    /** @ngInject */
    function activityCompareInfoCtrl($scope, $stateParams, ipCookie, baConfig, utilService, chartService, activityUrl) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId,
            activityId = $stateParams.activityId;
        var baseParams = {
            access_token: token,
            course_id: courseId,
            activity_id: activityId
        };
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };

        utilService.dataRes(activityUrl.classTableUrl, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var tableInfo = res.data.data;
                // console.log(tableInfo);
                if(tableInfo.length !== 0) {
                    var scoreChartData = {
                        name: [],
                        gradeHightest: [],
                        gradeAverage: [],
                        gradeLowest: []
                    };
                    var postChartData = {
                        name: [],
                        postNum: []
                    };
                    var tableData = [];
                    for(var i = 0; i < tableInfo.length; i++) {
                        if(tableInfo[i].avgScore !== 0) {
                            scoreChartData.name.push(tableInfo[i].class_name);
                            scoreChartData.gradeHightest.push(tableInfo[i].max_score);
                            scoreChartData.gradeAverage.push(tableInfo[i].avg_max_score);
                            scoreChartData.gradeLowest.push(tableInfo[i].min_max_score);
                        }
                        postChartData.name.push(tableInfo[i].class_name);
                        postChartData.postNum.push(tableInfo[i].total_user_count);
                        tableData.push({
                            id: i + 1,
                            className: tableInfo[i].class_name,
                            classPeopleNum: tableInfo[i].join_user_count,
                            postNum: tableInfo[i].total_user_count,
                            postNumAverage: tableInfo[i].avg_join_count,
                            gradeAverage: tableInfo[i].avg_max_score
                        })
                    }

                    // 成绩对比
                    $scope.sortList = {
                        name: ['最高成绩', '平均分', '最低成绩'],
                        type: ['gradeHightest', 'gradeAverage', 'gradeLowest'],
                        color: [baConfig.colors.primary, baConfig.colors.success, baConfig.colors.danger]
                    };
                    scoreChartData.all = [scoreChartData.gradeHightest, scoreChartData.gradeAverage, scoreChartData.gradeLowest];
                    chartService.barChart('stacked-bar', scoreChartData, $scope.sortList);

                    // 发帖统计
                    $scope.postHint = {
                        name: ['发帖数量'],
                        type: ['postNum'],
                        color: [baConfig.colors.primary]
                    };
                    postChartData.all = [postChartData.postNum];
                    chartService.barChart('countPost', postChartData, $scope.postHint);



                    // 班级统计
                    $scope.page.total = tableData.length;
                    $scope.tableData = tableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                    $scope.changePage = function(page) {
                        $scope.tableData = tableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                    };
                }else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#gradeHomework').hide();
                    $('#avtivityPost').hide();
                    $('#countTable .none-data').html('暂时没有数据...').show();
                }
            }else {
                $('#countTable .horizontal-scroll').hide();
                $('#gradeHomework').hide();
                $('#avtivityPost').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            }
        }, function() {
            $('#countTable .horizontal-scroll').hide();
            $('#gradeHomework').hide();
            $('#avtivityPost').hide();
            $('#countTable .none-data').html('数据请求出错了...').show();
        });
    }
})();