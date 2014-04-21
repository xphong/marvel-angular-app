'use strict';

angular.module('app.controllers', [])

  .controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }])

  .controller('MainCtrl', ['$scope', 'MarvelAPI', '_', function($scope, MarvelAPI, _) {
    // object to hold character info
    $scope.formData = {};

    $scope.processForm = function() {
      $scope.characters = [];

      // call from factory
      MarvelAPI.getChar($scope.formData.name).then(function (response) {
        // loop through results and set to scope (limit is 5)
        for (var i=0, j = response.data.count; i < j; i++) {
          // variable to store results for easier access
          var data = response.data.results[i];
          // temporary variable to store current character data
          var temp = [];
          temp.name = data.name;
          // if exists, set to universe page
          if (data.urls[1]) {
            temp.url = data.urls[1].url;
          }
          else {
            temp.url = data.urls[0].url;
          }
          temp.image = data.thumbnail.path + '.' + data.thumbnail.extension;
          // check for description
          if (data.description === '') {
            temp.description = 'No description listed for this character.';
          }
          else {
            temp.description = data.description;
          }
          $scope.characters.push(temp);
        }

        // determine view output
        if (typeof $scope.characters[0] !== 'undefined') {
          // load view if success
          $scope.searchChar = 'success';
        }
        else {
          // load view when fail
          $scope.errorMsg = 'Unable to find that character.';
          $scope.searchChar = 'fail';
        }
      });
    };
  }]);