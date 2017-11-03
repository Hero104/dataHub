(function () {
    'use strict';
    
    angular.module('BlurAdmin.pages.countActivity').controller('countActivityInfoCtrl', countActivityInfoCtrl);

    /** @ngInject */
    function countActivityInfoCtrl($scope, ipCookie, $stateParams, utilService, activityUrl, chartService, baConfig, $timeout) {
        var token = ipCookie('accessToken'),
            layoutColors = baConfig.colors,
            courseId = $stateParams.courseId,
            activityId = $stateParams.activityId;
        $scope.activityId = activityId;
        $scope.courseId = courseId;
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        var baseParams = {
            access_token: token,
            course_Id: courseId,
            activity_id: activityId
        };

        // 发帖分布
        utilService.dataRes(activityUrl.postUrl, baseParams).then(function(res) {
            if(res.data.data && res.data.data.length !== 0) {
                var postInfo = res.data.data[0];
                console.log(postInfo);
                var typeSortList = [],
                    typeSortName = ['1条', '2条', '3条', '4条', '5条以上'],
                    typeSortNum = [postInfo.join_level_1, postInfo.join_level_2, postInfo.join_level_3, postInfo.join_level_4, postInfo.join_level_5],
                    typeSortColor = [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning],
                    sum = 0;
                for(var i = 0; i < typeSortNum.length; i++) {
                    sum += typeSortNum[i];
                }
                for(var i = 0; i < typeSortName.length; i++) {
                    typeSortList.push({
                        name: typeSortName[i],
                        num: typeSortNum[i],
                        percent: Math.round(typeSortNum[i]/sum * 100) + '%',
                        color: typeSortColor[i]
                    })
                }
                $scope.typeSortList = typeSortList;
                chartService.barAmchart('sortPost', typeSortList);
            }else {
                $('.postsort-wrap .postsort-content').hide();
                $('.postsort-wrap .none-data').show();
            }
        }, function() {
            $('.postsort-wrap .postsort-content').hide();
            $('.postsort-wrap .none-data').html('数据请求出错了...').show();
        });

        // 分数分布
        utilService.dataRes(activityUrl.scoreUrl, baseParams).then(function(res) {
            if(res.data.data && res.data.data.length !== 0) {
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
                for(var i = 0; i < gradeTypeNum.length; i++) {
                    sum += gradeTypeNum[i];
                }
                for(var i = 0; i < gradeTypeNum.length; i++) {
                    gradeTypeList.push({
                        name: lableScore.legendData[i],
                        value: gradeTypeNum[i],
                        percent: Math.round(gradeTypeNum[i]/sum * 100) + '%'
                    })
                }
                chartService.pieEchart('sortScore', gradeTypeList, lableScore);
                $scope.gradeSortTableData = gradeTypeList;
            }else {
                $('.grade-type .grade-content').hide();
                $('.grade-type .none-data').show();
            }
        }, function() {
            $('.grade-type .grade-content').hide();
            $('.grade-type .none-data').html('数据请求出错了...').show();
        });

        // 学生成绩
        function getTableData(status) {
            var tableParams = {
                access_token: token,
                course_Id: courseId,
                activity_id: activityId,
                is_join: status,
                pageNo: $scope.page.currentPage,
                pageSize: $scope.page.pageSize
            };
            utilService.dataRes(activityUrl.stuTableUrl, tableParams).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableRes = res.data.data,
                        tableInfo = tableRes.list;
                    // console.log(tableInfo)
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: ($scope.page.currentPage - 1) * $scope.page.pageSize + i + 1,
                                name: tableInfo[i].nickname,
                                userId: tableInfo[i].user_id,
                                postNum: tableInfo[i].join_count,
                                // class: '八班',
                                grade: tableInfo[i].max_score,
                                status: tableInfo[i].is_join==1 ? '未参加': '已参加'
                            })
                        }
                        $scope.page.total = tableRes.totalRecords;
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

        $scope.dateList = ['全部学生', '未参加', '已参加'];
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