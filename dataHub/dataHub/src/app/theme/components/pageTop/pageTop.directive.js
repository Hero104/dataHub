(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components').directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop(ipCookie) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/pageTop/pageTop.html',
            link: function($scope) {
                $scope.logout = function() {
                    var list = document.cookie.split('; ');
                    for(var i = 0; i < list.length; i ++) {
                        var name = list[i].split('=')[0];
                        ipCookie.remove(name);
                    }
                    location.href = './index.html';
                };
            }
        };
    }

})();