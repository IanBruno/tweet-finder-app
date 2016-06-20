var myApp = angular.module('tweetModule', []);

myApp.controller('tweetController', ['$scope','$http', function($scope,$http) {
    $scope.wordToSearch = '';
    $scope.searchTweetFunc = function(parametro) {
        console.log("BUSQUEDA EN ANGULAR: "+escape(parametro));
        $scope.wordToSearch = parametro;
        $http({
          method: 'GET',
          url: '/search?q=%40'+escape(parametro)
        }).then(function successCallback(response) {
            console.log(response);
            $scope.tweets=response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    };
}]);

myApp.controller('tweetController2', ['$scope','$http', function($scope,$http) {
    $scope.wordToSearch2 = '';
    $scope.searchTweetFunc2 = function(parametro) {
        $scope.wordToSearch2 = parametro;
        $http({
          method: 'GET',
          url: '/search?q=%40'+escape(parametro)
        }).then(function successCallback(response) {
            console.log(response);
            $scope.tweets2=response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    };
}]);