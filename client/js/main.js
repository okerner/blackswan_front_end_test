var my_app = angular.module('GithubSearchApp',[]);

my_app.controller('SearchController', [
  '$scope',
  '$http',
  '$q',
  function(
    $scope,
    $http,
    $q
  ) {
    $scope.search = function(repo_name){
        var deferred = $q.defer();

        $http.get('https://api.github.com/search/repositories?q=' + repo_name)
            .then(function (serverData) {
                $scope.repos =  serverData.data;
                console.log($scope.repos);
            }, function( err ) {
                deferred.reject( err );
            });
    };
  }
  ]);