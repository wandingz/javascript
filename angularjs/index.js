var app = angular.module('myapp', ["ngRoute"]);
var localStorage = window.localStorage;

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
        })
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "login"
        })
        .when("/signup", {
            templateUrl: "templates/signup.html",
            controller: "signup"
        })
        .when("/profile", {
            templateUrl: "templates/profile.html",
            controller: "profile"
        })
        .when("/messageList", {
            templateUrl: "templates/messageList.html",
            controller: "messageList",
        })
        .when("/messageDetail/:index", {
            templateUrl: "templates/messageDetail.html",
            controller: "messageDetail",
        });
});

// app.factory("dataService2", function ($timeout, $http) {
//     return {
//         user: undefined,
//         login: function(user, pswd) {

//         }
//     }
// });
app.controller("navBar", function ($scope, $location, dataService) {
    $scope.data = dataService;

    // if (dataService.user) {
    $scope.logout = function () {
        dataService.logout();
    };
    $scope.consolelog = function() {
        console.log($scope.data.user);
    }

    // } else {
    //     // $location.path('login');
    // }
});

