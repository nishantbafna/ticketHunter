'use strict';

angular.module('ticketHunterApp', ['ticketHunterApp.auth', 'ticketHunterApp.admin',
    'ticketHunterApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
