'use strict';

angular.module('app.controllers', [])

  .controller('HeaderController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }])

  .controller('MainController', ['$scope', 'MarvelAPI', '_', function($scope, MarvelAPI, _) {
    $scope.formData = {};

    $scope.processForm = function() {
      $scope.characters = [];

      MarvelAPI.getChar($scope.formData.name)
        .then(function (response) {
          if (response) {
            _.each(response.characters, function(data) {
                var temp = [];
                temp.name = data.name;
                temp.url = (data.urls[1] ? data.urls[1].url : data.urls[0].url);
                temp.image = data.thumbnail.path + '.' + data.thumbnail.extension;
                temp.description =  (data.description === '' ? 'No description listed for this character.' : temp.description = data.description);
                $scope.characters.push(temp);
              }
            );

            $scope.searchChar = 'success';
          }
        }, function (response) {
            $scope.errorMsg = response.message;
            $scope.searchChar = 'fail';
          }
        );
    };
  }]);