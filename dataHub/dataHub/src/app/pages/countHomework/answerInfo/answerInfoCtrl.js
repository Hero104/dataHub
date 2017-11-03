(function() {
    'use strict';

    angular.module('BlurAdmin.pages.countHomework').controller('answerInfoCtrl', answerInfoCtrl);

    /** @ngInject */
    function answerInfoCtrl($scope, ipCookie, baConfig, baUtil, homeworkUrl, utilService) {
        var token = ipCookie('accessToken'),
            pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        var baseParams = {
            access_token: token,
            homeworkId: 123
        };

        utilService.dataRes(homeworkUrl.testUrl, baseParams).then(function(res) {
            var baseName = ['最长作答时长', '最短作答时长', '平均作答时长'],
                baseNum = ['57,820 秒', '89,745 秒', '178,391 秒'],
                baseIcon = ['time', 'time', 'time'],
                baseCharts = [];
            for(var i = 0; i < baseName.length; i++) {
                baseCharts.push({
                    color: pieColor,
                    description: baseName[i],
                    stats: baseNum[i],
                    icon: baseIcon[i]
                })
            }
            $scope.baseCharts = baseCharts;
        });

        // 试卷分析
        utilService.dataRes(homeworkUrl.testUrl, baseParams).then(function(res) {
            $scope.examList = {
                ask: '什么是幸福？',
                select: {

                }
            }
        });
    }
})();