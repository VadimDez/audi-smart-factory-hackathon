'use strict';
'use strict';

(function() {

  class DashboardController {

    constructor($http, $scope, socket, $interval) {
      this.$http = $http;
      this.socket = socket;
      this.actual = 0;
      this.max = 16;
      this.workplaces = [
        [],
        [],
      ];

      for (var i = 0; i < this.max; i++) {
        this.workplaces[0].push({ id: i });
        this.workplaces[1].push({ id: i });
      }

      $interval(() => {
        this.actual++;

        if (this.actual >= this.max) {
          this.actual = 0;
        }
      }, 1000);
    }
  }

  angular.module('audiSmartFactoryHackathonApp')
    .component('dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: '$ctrl'
    });
})();
