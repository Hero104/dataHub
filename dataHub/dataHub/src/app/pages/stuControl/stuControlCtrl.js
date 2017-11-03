(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stuControl').controller('stuControlCtrl', stuControlCtrl);

    /** @ngInject */
    function stuControlCtrl($scope, ipCookie, utilService, stuControlUrl) {
        var token = ipCookie('accessToken'),
            userId = ipCookie('teacherInfo').userId;
        $scope.page={
            currentPage: 1,
            pageSize: 12
        };
        var baseParams = {
            access_token: token,
            userId: userId
        };

        // 男女比例
        utilService.dataRes(stuControlUrl.baseInfoUrl, baseParams).then(function(res) {
            if(res.data.data && res.data.data.length !== 0) {
                var baseInfo = res.data.data,
                    numBoy, numGirl;
                console.log(baseInfo);
                for(var i = 0; i < baseInfo.length; i++) {
                    if(baseInfo[i].LearnerGender==0) {
                        numBoy = baseInfo[i].personNum
                    }else {
                        numGirl = baseInfo[i].personNum;
                    }
                }
                $scope.baseNum = [{
                    color: 'rgba(77, 192, 215, 0.2)',
                    description: '男生',
                    stats: utilService.formatNum(numBoy) + '人',
                    icon: 'boy'
                }, {
                    color: 'rgba(219, 144, 197, 0.2)',
                    description: '女生',
                    stats: utilService.formatNum(numGirl) + '人',
                    icon: 'girl'
                }];
                var sum = numGirl + numBoy;
                var basePercent = [Math.round(numBoy/sum * 100), Math.round(numGirl/sum * 100)];
                utilService.perAnimation(basePercent);
            }
        });

        // 学生统计
        function countStuTable(status) {
            var params = {
                access_token: token,
                courseIds: ipCookie('courseStr'),
                status: status
            };
            utilService.dataRes(stuControlUrl.courseTableUrl, params).then(function(res) {
                if(res.data.code == 0 && res.data.data) {
                    var tableInfo = res.data.data;
                    // console.log(tableInfo);
                    if(tableInfo.length !== 0) {
                        $('#countTable .horizontal-scroll').show();
                        $('#countTable .none-data').hide();
                        var peopleTableData = [];
                        for(var i = 0; i < tableInfo.length; i++) {
                            peopleTableData.push({
                                id: i + 1,
                                courseId: tableInfo[i].courseId,
                                name: tableInfo[i].courseName,
                                stuNum: tableInfo[i].userCount,
                                studyTime: utilService.formatSeconds(tableInfo[i].totalStudyTime),
                                lookNum: tableInfo[i].sumStudyCount,
                                studyTimeAvg: utilService.formatSeconds(tableInfo[i].avgStudyTime),
                                lookNumAvg: tableInfo[i].avgStudyCount,
                                progressAvg: tableInfo[i].avgProgress + '%'
                            })
                        }
                        $scope.page.total = peopleTableData.length;
                        $scope.peopleTableData = peopleTableData.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
                        $scope.changePage = function(page) {
                            $scope.peopleTableData = peopleTableData.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
                        };
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
        $scope.dateList = ['全部课程', '未过期', '已过期'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            $scope.page.currentPage = 1;
            countStuTable(index);
        };
        $scope.filtrate(0);
    }
})();
