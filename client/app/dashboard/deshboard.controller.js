'use strict';
'use strict';

(function() {

  class DashboardController {

    constructor($http, $scope, socket, $interval) {
      this.$http = $http;
      this.socket = socket;
      this.actual = 0;
      this.max = 34;
      this.isDetailsShown = false;
      this.selectedSector = null;
      this.isPlaying = true;
      this.workplaces = [
        [],
        // [],
      ];

      for (var i = 0; i < this.max; i++) {
        let obj = {
          id: i,
          name: 'name...' + i,
          time: parseInt(i * Math.random(), 10)
        };

        this.workplaces[0].push(obj);
        // this.workplaces[1].push(obj);
      }

      $interval(() => {
        if (!this.isPlaying) {
          return;
        }

        this.actual++;

        if (this.actual >= this.max) {
          this.actual = 0;
        }
      }, 1000);


      this.labels = ["January", "February", "March", "April", "May", "June", "July"];
      this.series = ['Series A', 'Series B'];
      this.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      this.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      this.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };
    }

    showDetails(sector) {
      this.isDetailsShown = true;
      this.selectedSector = sector;
    }

    toggleDetail() {
      this.isDetailsShown = false;
    }

    onClick(points, evt) {
      console.log(points, evt);
    }

    togglePlay() {
      this.isPlaying = !this.isPlaying;
    }

    back() {
      this.isPlaying = false;
      this.actual--;
    }

    forward() {
      this.isPlaying = false;
      this.actual++;
    }
  }

  angular.module('audiSmartFactoryHackathonApp')
    .component('dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: '$ctrl'
    });
})();
