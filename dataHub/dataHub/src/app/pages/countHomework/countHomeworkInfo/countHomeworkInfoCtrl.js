(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework').controller('countHomeworkInfoCtrl', countHomeworkInfoCtrl);

    /** @ngInject */
    function countHomeworkInfoCtrl($scope, $stateParams, baConfig, ipCookie, utilService, chartService, homeworkUrl) {
        var token = ipCookie('accessToken'),
            homeworkId = $stateParams.homeworkId,
            courseId = $stateParams.courseId,
            layoutColors = baConfig.colors;
        $scope.homeworkId = homeworkId;
        $scope.courseId = courseId;
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        var baseParams = {
            access_token: token,
            homeworkId: homeworkId,
            courseIds: courseId
        };

        // // 难度分布
        // utilService.dataInfo(homeworkUrl.testUrl, token).then(function(res) {
        //     var sortDiff = [{
        //         name: '简单',
        //         value: 3661
        //     }, {
        //         name: '中等',
        //         value: 5713
        //     }, {
        //         name: '困难',
        //         value: 9938
        //     }];
        //     var lableDiff = {
        //         text: '52',
        //         subtext: '试题',
        //         legendData: ['简单', '中等', '困难'],
        //         colorData: ['#59ADF3', '#FF999A', '#FFCC67'],
        //         size: ['45%', '90%'],
        //         textPositon: 'inner'
        //     };
        //     chartService.pieEchart('sortDiff', sortDiff, lableDiff)
        // });
        //
        // // 题型分布
        // utilService.dataInfo(homeworkUrl.testUrl, token).then(function(res) {
        //     var typeSortList = [],
        //         typeSortName = ['单选', '多选', '填空', '判断', '问答'],
        //         typeSortNum = [60, 70, 70, 20, 10],
        //         typeSortColor = [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning];
        //     for(var i = 0; i < typeSortName.length; i++) {
        //         typeSortList.push({
        //             name: typeSortName[i],
        //             num: typeSortNum[i],
        //             color: typeSortColor[i]
        //         })
        //     }
        //     chartService.barAmchart('typeSort', typeSortList);
        // });

        // 分数分布
        utilService.dataRes(homeworkUrl.sortScoreUrl, baseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data && res.data.data.length !== 0) {
                var scoreInfo = res.data.data[0];
                console.log(scoreInfo);
                var gradeTypeList = [],
                    gradeTypePercent = [],
                    gradeTypeName = ['0-59', '60-69', '70-79', '80-89', '90-100'],
                    gradeTypeNum = [scoreInfo.score_level_1, scoreInfo.score_level_2, scoreInfo.score_level_3, scoreInfo.score_level_4, scoreInfo.score_level_5],
                    sum = 0;
                for(var i = 0; i < gradeTypeNum.length; i++) {
                    sum += gradeTypeNum[i];
                }
                for(var i = 0; i < gradeTypeName.length; i++) {
                    gradeTypeList.push({
                        name: gradeTypeName[i],
                        value: gradeTypeNum[i],
                        percent: Math.round(gradeTypeNum[i]/sum * 100) + '%'
                    })
                }
                var lableScore = {
                    text: '',
                    subtext: '',
                    legendData: ['0-59', '60-69', '70-79', '80-89', '90-100'],
                    colorData: [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning],
                    size: ['50%', '70%'],
                    textPositon: '',
                    positionTip: 'left'
                };
                chartService.pieEchart('sortScore', gradeTypeList, lableScore);
                $scope.gradeSortTableData = gradeTypeList;
            }else {
                $('#sortGrade .grade-type').hide();
                $('#sortGrade .none-data').html('暂时没有数据...').show();
            }
        }, function() {
            $('#sortGrade .grade-type').hide();
            $('#sortGrade .none-data').html('数据请求出错了...').show();
        });

        //  学生统计
        function getTableData(status) {
            var tableParams = {
                access_token: token,
                homeworkId: homeworkId,
                courseIds: courseId,
                answerStatus: status
            };
            utilService.dataRes(homeworkUrl.stuTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if(tableInfo.length !== 0) {
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: i + 1,
                                name: tableInfo[i].nickname,
                                answerNum: tableInfo[i].visit_count,
                                status: tableInfo[i].answerStatus==1 ? '未作答': '已作答',
                                heightest: tableInfo[i].max_score,
                                lowest: tableInfo[i].min_score,
                                average: tableInfo[i].avg_score
                            })
                        }
                        $scope.page.total = tableData.length;
                        $scope.tableData = tableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                        $scope.changePage = function(page) {
                            $scope.tableData = tableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                        };
                    }else {
                        $('#countTable .horizontal-scroll').hide();
                        $('#countTable .none-data').html('暂时没有数据...').show();
                    }
                }else {
                    $('#countTable .horizontal-scroll').hide();
                    $('#countTable .none-data').html('数据请求出错了...').show();
                }
            },function() {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            });
        }
        $scope.dateList = ['全部学生', '未作答', '已作答'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            $scope.page.currentPage = 1;
            getTableData(index);
        };
        $scope.filtrate(0);





    }
})();