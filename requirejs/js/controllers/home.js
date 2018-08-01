define(function () {
    angular.module('myapp')
        .registerController('home', function ($scope) {
            $scope.ctrlTitle = 'Home Page';
        })
});