'use strict';

angular.module('audiSmartFactoryHackathonApp')
  .config(function($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    });
  });
