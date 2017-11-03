    (function () {
    'use strict';

    angular.module('BlurAdmin.pages.countGrade').controller('countGradeInfoCtrl', countGradeInfoCtrl);

    /** @ngInject */
    function countGradeInfoCtrl($scope, ipCookie, $stateParams, utilService, gradeUrl, chartService, baConfig) {
        var token = ipCookie('accessToken'),
            layoutColors = baConfig.colors,
            courseId = $stateParams.courseId;
        var baseParams = {
            access_token: token,
            courseId: courseId
        };
        $scope.courseId = courseId;
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };

        // 分数分布
        utilService.dataRes(gradeUrl.gradeSortUrl, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                var gradeInfo = res.data.data,
                    gradeTypeList = [],
                    gradeTypeName = ['0-59', '60-69', '70-79', '80-89', '90-100'],
                    grade = [gradeInfo.personNum0059, gradeInfo.personNum6069, gradeInfo.personNum7079, gradeInfo.personNum8089, gradeInfo.personNum90100],
                    sum = 0;
                for(var i = 0; i < grade.length; i++) {
                    sum += grade[i];
                }
                for(var i = 0; i < gradeTypeName.length; i++) {
                    gradeTypeList.push({
                        name: gradeTypeName[i],
                        value: grade[i],
                        percent: Math.round(grade[i] / sum * 10000) / 100 + '%'
                    })
                }
                var lableScore = {
                    text: '',
                    subtext: '',
                    legendData: ['0-59', '60-69', '70-79', '80-89', '90-100'],
                    colorData: [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning],
                    size: ['55%', '72%'],
                    textPositon: '',
                    positionTip: 'left'
                };
                chartService.pieEchart('sortScore', gradeTypeList, lableScore);
                $scope.gradeSortTableData = gradeTypeList;
            }else {
                $('#gradeType .grade-type').hide();
                $('#gradeType .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('#gradeType .grade-type').hide();
            $('#gradeType .none-data').html('数据请求出错了...').show();
        });

        // 学生统计
        function getTableData(scoreStart, scoreEnd) {
            $scope.a = scoreStart;
            $scope.b = scoreEnd;
            var tableParams = {
                access_token: token,
                courseId: courseId,
                startScore: scoreStart,
                endScore: scoreEnd,
                page: $scope.page.currentPage,
                max: $scope.page.pageSize
            };
            utilService.dataRes(gradeUrl.stuTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if(tableInfo.rows.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.rows.length; i++) {
                            tableData.push({
                                id: ($scope.page.currentPage - 1) * $scope.page.pageSize + i + 1,
                                name: tableInfo.rows[i].UserName,
                                stuId: tableInfo.rows[i].UserId,
                                grade: tableInfo.rows[i].Scoe,
                                number: tableInfo.rows[i].ranking
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
        $scope.filtrate = function(scoreStart, scoreEnd) {
            scoreStart ? scoreStart=scoreStart : scoreStart=0;
            scoreEnd ? scoreEnd=scoreEnd : scoreEnd=100;
            if(scoreEnd < scoreStart) {
                utilService.alert($scope, 'app/theme/alert/gradeErr.html', 'sm');
                return;
            }
            $scope.page.currentPage = 1;
            getTableData(scoreStart, scoreEnd);
        };
        $scope.filtrate(0, 100);
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            getTableData($scope.a, $scope.b)
        }

    }
})();