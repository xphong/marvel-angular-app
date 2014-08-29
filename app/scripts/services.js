'use strict';

angular.module('app.services', [])

  .factory('MarvelAPI', ['$http', '$q', function($http, $q) {
    var apiUrl = 'http://gateway.marvel.com/v1/public/';
    var apiKey = '0b72980a074358f7c6565bd7efc480ca';

    // limit to top 10 results
    var limit = 10;

    var getChar = function(character) {
      var def = $q.defer();
      var url = apiUrl + 'characters?limit=' + limit + '&nameStartsWith=' + character + '&apikey=' + apiKey;
      $http.get(url)
        .success(function (response) {
          if (response.data.results.length > 0) {
            def.resolve({
              characters: response.data.results
            });
          }
          else {
            def.reject({
              message: 'Unable to find that character'
            });
          }
        }).error(function () {
          def.reject({
            message: 'API error'
          });
        });

      return def.promise;
    };

    return { getChar: getChar };
  }])

  .factory('_', [function() {
    // assumes underscore has already been loaded on the page
    return window._;
  }]);