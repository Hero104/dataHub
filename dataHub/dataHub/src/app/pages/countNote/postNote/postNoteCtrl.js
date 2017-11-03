(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countNote').controller('postNoteCtrl', postNoteCtrl);

    /** @ngInject */
    function postNoteCtrl($scope, ipCookie, utilService, noteUrl) {
        var token = ipCookie('accessToken');

        // 学生统计
        $scope.page = {
            current: 1,
            pageSize: 6
        };
        utilService.dataInfo(noteUrl.testUrl, token).then(function(res) {
            var postList = [];
            for(var i = 0; i < 36; i++) {
                postList.push({
                    id: i + 1,
                    content: '同学们最近怎么样？',
                    teacher: '高老师',
                    time: '2017-01-' + i,
                    photo: 'assets/img/face.svg',
                    reply: [{
                        student: '小明',
                        ask: '挺好的，最近收获很多。',
                        time: '2017-02-' + i,
                        photo: 'assets/img/face.svg'
                    },{
                        student: '小红',
                        ask: '挺好的，最近收获也很多。',
                        time: '2017-03-' + i,
                        photo: 'assets/img/face.svg'
                    }]
                })
            }
            $scope.page.total = postList.length;
            $scope.postList = postList.slice(($scope.page.currentPage-1)*$scope.page.pageSize, $scope.page.currentPage*$scope.page.pageSize);
            $scope.changePage = function(page) {
                $scope.postList = postList.slice((page-1)*$scope.page.pageSize, page*$scope.page.pageSize)
            };
        });
        $scope.replayShow = function(index) {
            $('.replyList').eq(index).fadeToggle();
        };
        $scope.back = function() {
            history.back();
        }

    }
})();