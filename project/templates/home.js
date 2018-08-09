app.controller("home", function ($scope, $location, dataService) {
    if (dataService.user) {
        $scope.logout = function() {
            dataService.logout();
        };
        
    } else {
        $location.path('login');
    }
});

