app.controller("login", function ($scope, $location, dataService) {
    $scope.form = {}
    $scope.login = function () {
        dataService.login($scope.form).then(d => {
            $location.path('home');
        }).catch(err => {
            $scope.error_message = err;
        });
    }
});

