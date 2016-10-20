'use strict';

angular.module('audiSmartFactoryHackathonApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>'
    });
  });
