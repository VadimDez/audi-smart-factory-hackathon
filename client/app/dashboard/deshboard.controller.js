'use strict';
'use strict';

(function() {

  class DashboardController {

    constructor($http, $scope, socket, $interval) {
      this.$http = $http;
      this.socket = socket;
      this.actual = 0;
      this.max = 34;
      this.avg = 87;
      this.car = 1;
      this.isDetailsShown = false;
      this.isBADetailsShown = false;
      this.isPlaying = true;
      this.activeIndex = null;
      this.nextData = [];
      this.nextLabels = [];
      this.nextSeries = [];
      this.workplaces = [
        [],
        // [],
      ];

      for (var i = 0; i < this.max; i++) {
        let obj = {
          id: i,
          name: 'name...' + i,
          times: []
          // time: parseInt(Math.floor(Math.random() * (150 - 30)) + 30, 10)
        };

        this.workplaces[0].push(obj);
        // this.workplaces[1].push(obj);
      }

      $interval(() => {
        if (!this.isPlaying) {
          return;
        }


        if (this.actual < this.max) {
          this.actual++;
        }

        // add time
        for (var i = 0; i < this.actual; i++) {
          // let value = Math.floor(Math.random() * (150 - 30)) + 30;
          // this.workplaces[0][i].times.unshift(value);
          this.setCar(i, this.car++);
        }

        if (this.activeIndex !== null) {
          this.showDetails(this.activeIndex);

          this.getNextCarsData(this.activeIndex);
        }
      }, 2000);


      this.labels = [];
      this.series = ['Accumulated times'];
      this.data = [
        []
      ];
      this.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      var ctx = document.createElement('canvas').getContext('2d');

      /*** Gradient ***/
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(250,174,50,1)');
      gradient.addColorStop(1, 'rgba(250,174,50,0)');

      this.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        },
        animation: false
      };
    }

    getNextCarsData(index) {
      index += 1;
      this.$http.get('/api/processes/next5/' + index + '/F2' + ('0' + index).substr(-2))
        .then(res => {
          this.nextData = [res.data.map(value => {
            return value.real_time;
          })];
          this.nextLabels = res.data.map(value => {
            return value.LFD_NR;
          });
          this.nextSeries = ['Next cars'];

          // console.log(this.nextData);
        });
    }

    getCar(id) {
      this.$http.get('/api/cars/' + id)
        .then(res => {
          this.car = res.data;
        });
    }

    setCar(index, car) {
      this.getWorkstation(car, 'F2' + ('0' + (index + 1)).substr(-2))
        .then((res) => {
          let total = 0;
          res.data.forEach((value) => {
            total += value.real_time;
          });

          if (total !== 0) {
            total = total / res.data.length;
            total -= this.avg;
          }

          if (index === 0) {
            // console.log(total);
          }
          this.workplaces[0][index].times.push(total);
        });
    }

    getWorkstation(car, workstation) {
      console.log('CAR NUMBER');
      console.log(car);
      return this.$http.get('/api/processes/' + car + '/' + workstation);
    }

    showDetails(index) {
      this.isDetailsShown = true;
      this.activeIndex = index;
      this.labels = [];
      this.data = [];
      let init = 0;

      this.data = this.workplaces[0][index].times.map((value, i) => {
        this.labels.push(i);
        return value - this.avg;
      }).map((value) => {
        init += value;
        return init;
      });

      this.getCar(index + 1);
    }

    showBADetails() {
      this.isBADetailsShown = true;

      this.overAll(1);
    }

    toggleDetail() {
      this.activeIndex = null;
      this.isDetailsShown = false;
    }

    toggleBADetail() {
      this.isBADetailsShown = false;
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

    getCapacity(index) {
      let length = this.workplaces[0][index].times.length || 1;

      let sum = this.workplaces[0][index].times.reduce((all, value) => {
        return all + value;
      }, 0) || 0;

      return sum / length;
    }

    overAll(id) {
      this.$http.get('/api/processes/overall/' + id)
        .then(result => {
          this.carData = result.data.map(v => [v.sum]);
          this.carLabels = result.data.map(v => v.LFD_NR)
        });
    }
  }

  angular.module('audiSmartFactoryHackathonApp')
    .component('dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: '$ctrl'
    });
})();
