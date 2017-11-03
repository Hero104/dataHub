(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts', [
        'BlurAdmin.pages.charts.amCharts',
        'BlurAdmin.pages.charts.chartJs',
        'BlurAdmin.pages.charts.chartist',
        'BlurAdmin.pages.charts.morris'
    ]).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('charts', {
                url: '/charts',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: 'Charts',
                // sidebarMeta: {
                //     icon: 'ion-stats-bars',
                //     order: 150
                // }
            });
    }

})();
