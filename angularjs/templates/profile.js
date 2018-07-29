app.controller("profile", function ($scope, $location, dataService) {
    $scope.form = {};
    
    dataService.setProfile().then(d => {
        $scope.form = d.data;
    }).catch(err => {
        $scope.error_message = err;
    });

    $scope.setProfile = function () {
        dataService.setProfile($scope.form).then(d => {
            // pass
        }).catch(err => {
            $scope.error_message = err;
        });
    }
});

