'use strict';

angular.module('app.services', [])

  .factory('MarvelAPI', ['$http', '$q', function($http, $q) {
    var apiUrl = 'http://gateway.marvel.com/v1/public/';
    var apiKey = 'yourPublicKey';

    // limit to top 5 results
    var limit = 5;

    var getChar = function(character) {
      var def = $q.defer();
      var url = apiUrl + 'characters?limit=' + limit + '&nameStartsWith=' + character + '&apikey=' + apiKey;
      $http.get(url).success(def.resolve).error(def.reject);

      return def.promise;
    };

    return { getChar: getChar };
  }])

  .factory('_', [function() {
    // assumes underscore has already been loaded on the page
    return window._;
  }]);