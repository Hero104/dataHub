(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components').controller('MsgCenterCtrl', MsgCenterCtrl);

    /** @ngInject */
    function MsgCenterCtrl($scope, $sce) {
        $scope.users = {
            0: {
                name: '小张',
            },
            1: {
                name: '小王',
            },
            2: {
                name: '小李',
            },
            3: {
                name: '小明',
            }
        };

        $scope.notifications = [
            {
                userId: 0,
                template: '&name 发表了一篇新的文章。',
                time: '1分钟前'
            },
            {
                userId: 1,
                template: '&name 改变了他的基本信息。',
                time: '2小时前'
            },
            {
                image: 'assets/img/shopping-cart.svg',
                template: '新的版本更新',
                time: '5小时前'
            },
            {
                userId: 2,
                template: '&name 给您留言',
                time: '1天前'
            },
            {
                userId: 3,
                template: '今天是 &name 的生日',
                time: '2天前'
            },
            {
                image: 'assets/img/comments.svg',
                template: '您的帖子有新的回复',
                time: '3天前'
            },
            {
                userId: 1,
                template: '&name 邀请你参加活动',
                time: '1星期前'
            }
        ];

        $scope.messages = [
            {
                userId: 3,
                text: '消息一',
                time: '1分钟前'
            },
            {
                userId: 0,
                text: '消息二',
                time: '2小时前'
            },
            {
                userId: 1,
                text: '消息三',
                time: '10小时前'
            },
            {
                userId: 2,
                text: '消息四',
                time: '1天前'
            },
            {
                userId: 3,
                text: '消息五',
                time: '1天前'
            },
            {
                userId: 1,
                text: '消息六',
                time: '2天前'
            },
            {
                userId: 0,
                text: '消息七',
                time: '1星期前'
            }
        ];

        $scope.getMessage = function (msg) {
            var text = msg.template;
            if (msg.userId || msg.userId === 0) {
                text = text.replace('&name', '<strong>' + $scope.users[msg.userId].name + '</strong>');
            }
            return $sce.trustAsHtml(text);
        };
    }
})();