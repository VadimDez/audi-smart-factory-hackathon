'use strict';

angular.module('audiSmartFactoryHackathonApp', ['audiSmartFactoryHackathonApp.auth',
    'audiSmartFactoryHackathonApp.admin', 'audiSmartFactoryHackathonApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'chart.js'
  ])
  .config(function($urlRouterProvider, $locationProvider, ChartJsProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    console.log(ChartJsProvider);
    ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  });
