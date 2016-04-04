my_app.directive("mySpinner", function(){
    return {
        templateUrl: 'templates/ajax_loader.html'
    };
});

my_app.directive("mySpinnerSmall", function(){
    return {
        templateUrl: 'templates/ajax_loader_small.html'
    };
});