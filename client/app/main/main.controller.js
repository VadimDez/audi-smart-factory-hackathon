'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
    }

    $onInit() {
    }
  }

  angular.module('audiSmartFactoryHackathonApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
