'use strict';

angular.module('marvelApp', [
  'ngRoute',
  'ngAnimate',
  'app.services',
  'app.controllers'
])

.config(function ($routeProvider) {
  // set routes
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});