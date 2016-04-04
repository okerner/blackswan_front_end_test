var my_app = angular.module('GithubSearchApp',["ng-fusioncharts"]);

my_app.controller('SearchController', [
  '$scope',
  '$http',
  '$q',
  function(
    $scope,
    $http,
    $q
  ) {
    $scope.semafors = { 
        show_ajax_loader : false,
        show_ajax_loader_small : {},
        show_arrow_down : {},
        show_repos : false
    }
    $scope.repo_and_issues = {};
    $scope.chartData = {};
    
    $scope.search = function(repo_name){
        var deferred = $q.defer();
        
        $scope.semafors.show_ajax_loader = true;
        $scope.semafors.show_repos = false;

        $http.get('https://api.github.com/search/repositories?q=' + repo_name)
            .then(function (serverData) {
                $scope.repos =  serverData.data;
                console.log($scope.repos);
                $scope.semafors.show_ajax_loader = false;
                $scope.semafors.show_repos = true;
            }, function( err ) {
                deferred.reject( err );
            });
    };
    $scope.get_issues = function(repo_full_name,id){
        var deferred = $q.defer();

        if (!$scope.semafors.show_arrow_down[id]){
            $scope.semafors.show_ajax_loader_small[id] = true;
            $scope.semafors.show_arrow_down[id] = false;

            $http.get('https://api.github.com/search/issues?q=repo:' + repo_full_name+'+state:open')
                .then(function (serverData) {
                    $scope.repo_and_issues[id] = serverData.data;
                    $scope.semafors.show_ajax_loader_small[id] = false;
                    $scope.semafors.show_arrow_down[id] = true;
                }, function( err ) {
                    deferred.reject( err );
                });
        }
        else {
            $scope.semafors.show_arrow_down[id] = false;
            $scope.repo_and_issues[id] = null;
        }
    };
  }
]);
