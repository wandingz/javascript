define(function () {
    angular.module('myapp')
        .registerController('profile', function ($scope) {
            $scope.ctrlTitle = 'Profile Page';
        })
});