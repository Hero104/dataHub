(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countActivity').controller('countActivityCtrl', countActivityCtrl);

    /** @ngInject */
    function countActivityCtrl($scope, ipCookie, baConfig, baUtil,utilService, activityUrl) {
        var token = ipCookie('accessToken'),
            courseIds = ipCookie('courseStr'),
            userId = ipCookie('teacherInfo').userId,
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.status = '0';
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        var baseParams = {
            access_token: token,
            course_Ids: courseIds
        };

        // 基本数据
        utilService.dataRes(activityUrl.baseInfoUrl, baseParams).then(function(res) {
            if(res.data.code==0 && res.data.data) {
                var baseInfo = res.data.data;
                // console.log(baseInfo);
                var chartName = ['活动', '参与人次', '发帖'],
                    chartNum = [
                        utilService.formatNum(baseInfo.total_activity_count) + ' 个',
                        utilService.formatNum(baseInfo.total_user_count) + ' 次',
                        utilService.formatNum(baseInfo.total_join_count) + ' 条'],
                    chartIcon = ['activity', 'person', 'post'],
                    activityCharts = [];
                for(var i = 0; i < chartName.length; i++) {
                    activityCharts.push({
                        color: pieColor,
                        description: chartName[i],
                        stats: chartNum[i],
                        icon: chartIcon[i]
                    })
                }
                $scope.activityCharts = activityCharts;
            }
        });

        // 活动统计
        function getTableData(params) {
            utilService.dataRes(activityUrl.ActivityTableUrl, params).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableRes = res.data.data,
                        tableInfo =tableRes.list;
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var tableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            tableData.push({
                                id: ($scope.page.currentPage - 1) * $scope.page.pageSize + i + 1,
                                name: tableInfo[i].activityname,
                                activityId: tableInfo[i].activity_id,
                                course: tableInfo[i].course_name,
                                courseId: tableInfo[i].course_ids,
                                setNum: tableInfo[i].total_user_join_count + '/' + tableInfo[i].total_user_count,
                                postNum: tableInfo[i].total_join_count,
                                gradeHeightest: tableInfo[i].maxScore,
                                gradeLowest: tableInfo[i].minScore,
                                gradeAverage: tableInfo[i].avgScore
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
                    $('#countTable .none-data').html('没有查询到相关数据...').show();
                }
            }, function() {
                $('#countTable .horizontal-scroll').hide();
                $('#countTable .none-data').html('数据请求出错了...').show();
            });
        }
        // 条件筛选
        $scope.getCountActivity = function(status, courseId, activityName, flag) {
            $scope.page.currentPage = 1;
            if(flag) {
                activityName = '';
                $('#activityName').val('');
            }
            $scope.page.status = status;
            $scope.page.courseId = !courseId ? courseIds : courseId;
            $scope.page.activityName = activityName;
            $scope.page.flag = flag;
            var tableParams = {
                access_token: token,
                course_Ids: !courseId ? courseIds : courseId,
                status: status,
                activity_name: activityName,
                pageNo: $scope.page.currentPage,
                pageSize: $scope.page.pageSize
            };
            getTableData(tableParams);
        };
        $scope.getCountActivity($scope.status, '', '');
        // 分页点击
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            var tableParams = {
                access_token: token,
                course_Ids: $scope.page.courseId,
                status: $scope.page.status,
                activity_name: $scope.page.activityName,
                pageNo: $scope.page.currentPage,
                pageSize: $scope.page.pageSize
            };
            getTableData(tableParams);
        };

        // 下拉课程列表
        var courseParams = {
            access_token: token,
            status: 1,
            teacherId: userId,
            start: 1,
            rows: 999
        };
        utilService.dataRes(activityUrl.courseListUrl, courseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                $scope.courseDrop = res.data.data;
            }
        })


    }
})();