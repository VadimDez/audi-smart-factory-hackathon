'use strict';

angular.module('audiSmartFactoryHackathonApp.auth', ['audiSmartFactoryHackathonApp.constants',
    'audiSmartFactoryHackathonApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
