(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countGrade').controller('countGradeCtrl', countGradeCtrl);

    /** @ngInject */
    function countGradeCtrl($scope, ipCookie, baUtil, baConfig, utilService, gradeUrl) {
        var token = ipCookie('accessToken'),
            courseIds = ipCookie('courseStr'),
            teacherId = ipCookie('teacherInfo').userId,
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        var baseParams = {
            access_token: token,
            teacherId: teacherId
        };

        // 基本数据
        utilService.dataRes(gradeUrl.baseInfoUrl, baseParams).then(function(res) {
            if(res.data.code==0 && res.data.data) {
                var baseInfo = res.data.data;
                // console.log(baseInfo);
                var chartName = ['平均分80以上课程', '平均分60-80课程', '平均分60以下课程'],
                    chartNum = [
                        utilService.formatNum(baseInfo.score80U) + ' 门',
                        utilService.formatNum(baseInfo.score60_80) + ' 门',
                        utilService.formatNum(baseInfo.score60D) + ' 门'],
                    Charts = [];
                for(var i = 0; i < chartName.length; i++) {
                    Charts.push({
                        color: pieColor,
                        description: chartName[i],
                        stats: chartNum[i],
                        icon: 'course'
                    })
                }
                $scope.Charts = Charts;
            }
        });

        // 成绩
        function getTableData(status) {
            var tableParams = {
                access_token: token,
                teacherId: teacherId,
                expireFlag: status,
                page: $scope.page.currentPage,
                max: $scope.page.pageSize
            };
            utilService.dataRes(gradeUrl.gradeTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if(tableInfo.rows && tableInfo.rows.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.rows.length; i++) {
                            tableData.push({
                                id: ($scope.page.currentPage - 1) * $scope.page.pageSize + i + 1,
                                courseId: tableInfo.rows[i].BatchCoursesId,
                                name: tableInfo.rows[i].CourseName,
                                peopleNum: tableInfo.rows[i].coursesNum,
                                gradeHeightest: tableInfo.rows[i].maxScore,
                                gradeLowest: tableInfo.rows[i].minScore,
                                gradeAverage: tableInfo.rows[i].avgScore
                            })
                        }
                        $scope.page.total = tableInfo.totalRecord;
                        $scope.tableData = tableData;
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

        $scope.dateList = ['全部课程', '已过期', '未过期'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            $scope.page.currentPage = 1;
            getTableData(index);
        };
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            getTableData($scope.logNav);
        };
        $scope.filtrate(0);


    }
})();