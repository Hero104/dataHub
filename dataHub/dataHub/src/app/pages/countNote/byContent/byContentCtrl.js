(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countNote').controller('byContentCtrl', byContentCtrl);

    /** @ngInject */
    function byContentCtrl($scope, ipCookie, $stateParams, utilService, noteUrl, baConfig, chartService) {
        var token = ipCookie('accessToken'),
            courseId = $stateParams.courseId,
            layoutColors = baConfig.colors;
        var baseParams = {
            access_token: token,
            courseId: courseId
        };
        $scope.page={
            currentPage: 1,
            pageSize: 6
        };

        // // 问题类型分布
        // utilService.dataRes(noteUrl.testUrl, baseParams).then(function(res) {
        //     var gradeTypeList = [],
        //         gradeTypeName = ['心里问题', '专业问题', '生活问题', '情感问题', '其他问题'],
        //         gradeTypeNum = [10, 20, 30, 20, 10],
        //         gradeTypePercent = ['10%', '15%', '40%', '20%', '10%'];
        //     for(var i = 0; i < gradeTypeName.length; i++) {
        //         gradeTypeList.push({
        //             name: gradeTypeName[i],
        //             value: gradeTypeNum[i],
        //             percent: gradeTypePercent[i]
        //         })
        //     }
        //     var lableScore = {
        //         text: '',
        //         subtext: '',
        //         legendData: gradeTypeName,
        //         colorData: [layoutColors.primary, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.warning],
        //         size: ['60%', '80%'],
        //         textPositon: '',
        //         positionTip: 'left'
        //     };
        //     chartService.pieEchart('sortScore', gradeTypeList, lableScore);
        //     $scope.gradeSortTableData = gradeTypeList;
        // });

        // 学生统计
        function getListData(status) {
            var listParams = {
                access_token: token,
                courseId: courseId,
                queryFlag: status,
                page: $scope.page.currentPage,
                max: $scope.page.pageSize
            };
            utilService.dataRes(noteUrl.askListUrl, listParams).then(function(res) {
                if(res.data.code == 0 && res.data.data && res.data.data.totalRecord !== 0) {
                    $('#postList .post-wrapper').show();
                    $('#postList .none-data').hide();
                    $scope.postList = res.data.data.rows[0].askAnswers;
                    $scope.page.total = res.data.data.totalRecord;
                }else {
                    $('#postList .post-wrapper').hide();
                    $('#postList .none-data').show();
                }
            }, function() {
                $('#postList .post-wrapper').hide();
                $('#postList .none-data').html('请求数据出错了...').show();
            });
        }
        $scope.changePage = function(page) {
            $scope.page.currentPage = page;
            getListData($scope.logNav);
        };
        $scope.replayShow = function(index) {
            $('.replyList').eq(index).fadeToggle();
        };
        $scope.dateList = ['全部问题', '两天内回复', '超过两天回复', '未回复'];
        $scope.filtrate = function(index) {
            $scope.logNav = index;
            $scope.page.currentPage = 1;
            getListData(index);
        };
        $scope.filtrate(0);
    }
})();