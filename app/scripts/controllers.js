'use strict';

angular.module('app.controllers', [])

  .controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }])

  .controller('MainCtrl', ['$scope', 'MarvelAPI', '_', function($scope, MarvelAPI, _) {
    $scope.formData = {};

    $scope.processForm = function() {
      $scope.characters = [];

      MarvelAPI.getChar($scope.formData.name).then(function (response) {
        _.each(response.data.results, function(data) {
            var temp = [];
            temp.name = data.name;
            temp.url = (data.urls[1] ? data.urls[1].url : data.urls[0].url);
            temp.image = data.thumbnail.path + '.' + data.thumbnail.extension;
            temp.description =  (data.description === '' ? 'No description listed for this character.' : temp.description = data.description);
            $scope.characters.push(temp);
          }
        );

        if (typeof $scope.characters[0] !== 'undefined') {
          $scope.searchChar = 'success';
        }
        else {
          $scope.errorMsg = 'Unable to find that character.';
          $scope.searchChar = 'fail';
        }
      });
    };
  }]);