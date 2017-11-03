
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard').directive('dashboardPieChart', dashboardPieChart);

  function dashboardPieChart() {
    return {
      restrict: 'E',
      controller: 'DashboardPieChartCtrl',
      templateUrl: 'app/pages/dashboard/dashboardPieChart/dashboardPieChart.html'
    };
  }
})();