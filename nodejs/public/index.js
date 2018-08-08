var app = angular.module('myapp', []);

app.controller('myctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.form = {};
    $scope.submit = function() {
        $http({
            method: 'GET',
            url: '/api/mongodb',
            params: $scope.form,
        }).then(data => {
            console.log(data.data)
            $scope.user = data.data;
        }).catch(err => {
            console.log(err);
            alert(err.status + " " + err.data);
        });
    } 
}]);
