app.controller("profile", function ($scope, $location, dataService) {
    $scope.form = {};
    
    $scope.loading = 'get';
    dataService.getProfile().then(d => {
        $scope.form = d.data;
    }).catch(err => {
        $scope.error_message = err;
    }).finally(() => {
        $scope.loading = undefined;
    });

    $scope.setProfile = function () {
        $scope.loading = 'set';
        dataService.setProfile($scope.form).then(d => {
            $scope.error_message = 'Saved!';
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }
});

