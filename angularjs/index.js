var app = angular.module('App', [])

app.controller("FirstCtrl", function($scope){
    $scope.data = {
      message : "Hello",
      list : [
          'list1', 'list2', 'list3'
      ],
      name : "name",
      id: 1,
    };
});