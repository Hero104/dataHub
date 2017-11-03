(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework').controller( 'countHomeworkCtrl', countHomeworkCtrl);

    /** @ngInject */
    function countHomeworkCtrl($scope, ipCookie, baUtil, baConfig, utilService, homeworkUrl) {
        var token = ipCookie('accessToken'),
            courseIds = ipCookie('courseStr'),
            userId = ipCookie('teacherInfo').userId,
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.status = '0';
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };

        // 基本数据
        var baseParams = {
            access_token: token,
            courseIds: courseIds
        };
        utilService.dataRes(homeworkUrl.baseInfoUrl, baseParams).then(function(res) {
            if(res.data.code==0 && res.data.data) {
                var baseInfo = res.data.data[0];
                // console.log(baseInfo);
                var chartName = ['作业', '人数', '次数'],
                    chartNum = [
                        utilService.formatNum(baseInfo.homeWrokTimes) + ' 个',
                        utilService.formatNum(baseInfo.personNum) + ' 人',
                        utilService.formatNum(baseInfo.visitCount) + ' 条'],
                    chartIcon = ['homework', 'person', 'num'],
                    homeworkCharts = [];
                for(var i = 0; i < chartName.length; i++) {
                    homeworkCharts.push({
                        color: pieColor,
                        description: chartName[i],
                        stats: chartNum[i],
                        icon: chartIcon[i]
                    })
                }
                $scope.homeworkCharts = homeworkCharts;
            }
        });

        // 作业统计
        function getTableData(params) {
            utilService.dataRes(homeworkUrl.homeTableUrl, params).then(function(res) {
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
                                homeworkId: tableInfo[i].homeworkId,
                                name: tableInfo[i].homeworkName,
                                course: tableInfo[i].courseName,
                                courseId: tableInfo[i].courseId,
                                setNum: tableInfo[i].finishedUserCount + '/' + tableInfo[i].userCount,
                                gradeHeightest: tableInfo[i].highestScore,
                                gradeLowest: tableInfo[i].lowestScore,
                                gradeAverage: tableInfo[i].avgtScore,
                                passRate: tableInfo[i].passRate + '%'
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
        $scope.getCountHomework = function(status, courseId, homeworkName, flag) {
            $scope.page.currentPage = 1;
            if(flag) {
                homeworkName = '';
                $('#HomeworkName').val('');
            }
            $scope.page.status = status;
            $scope.page.courseId = !courseId ? courseIds : courseId;
            $scope.page.homeworkName = homeworkName;
            $scope.page.flag = flag;
            var tableParams = {
                access_token: token,
                courseIds: !courseId ? courseIds : courseId,
                status: status,
                homeworkName: homeworkName,
                pageNo: $scope.page.currentPage,
                pageSize: $scope.page.pageSize
            };
            // console.log(tableParams);
            getTableData(tableParams);
        };
        $scope.getCountHomework($scope.status, '', '');
        // 分页点击
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            var tableParams = {
                access_token: token,
                courseIds: $scope.page.courseId,
                status: $scope.page.status,
                homeworkName: $scope.page.homeworkName,
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
        utilService.dataRes(homeworkUrl.courseListUrl, courseParams).then(function(res) {
            if(res.data.code == 0 && res.data.data) {
                $scope.courseDrop = res.data.data;
            }
        })

    }
})();