'use strict';

angular.module('audiSmartFactoryHackathonApp', ['audiSmartFactoryHackathonApp.auth',
    'audiSmartFactoryHackathonApp.admin', 'audiSmartFactoryHackathonApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'chart.js'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
