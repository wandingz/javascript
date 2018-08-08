var app = angular.module('myapp', ["ngRoute"]);
var localStorage = window.localStorage;

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
        })
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "login",
        })
        .when("/signup", {
            templateUrl: "templates/signup.html",
            controller: "signup",
        })
        .when("/profile", {
            templateUrl: "templates/profile.html",
            controller: "profile",
            resolve: {
                'auth': ['dataService', function (dataService) {
                    return dataService.auth();
                }]
            },
        })
        .when("/messageList", {
            templateUrl: "templates/messageList.html",
            controller: "messageList",
            resolve: {
                'auth': ['dataService', function (dataService) {
                    return dataService.auth();
                }]
            },
        })
        .when("/messageDetail/:index", {
            templateUrl: "templates/messageDetail.html",
            controller: "messageDetail",
            resolve: {
                'auth': ['dataService', function (dataService) {
                    return dataService.auth();
                }]
            },
        });
}).run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (rejection === 'Not Authenticated') {
            $location.path('/login');
        }
    })
})

// app.factory("dataService2", function ($timeout, $http) {
//     return {
//         user: undefined,
//         login: function(user, pswd) {

//         }
//     }
// });
app.controller("navBar", function ($scope, $window, dataService, $rootScope, $location) {
    $scope.data = dataService;

    $scope.logout = function () {
        dataService.logout();
    };
    $scope.consolelog = function () {
        console.log($scope.data.user);
    }
});

function initLocalStorage() {
    localStorage.clear();
    var messages = [{
        "index": 0,
        "recipient": "User 1",
        "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
        "sender": "User 2",
        "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
        "title": "Title user 2 to user 1",
        "description": "hello world",
        "created_at": "today",
        "important": "0"
    }, {
        "index": 1,
        "recipient": "zhaoyi",
        "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
        "sender": "User 1",
        "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
        "title": "Title user 1 to zhaoyi",
        "description": "hello world",
        "created_at": "today",
        "important": "0"
    }]
    localStorage.setItem("messages", JSON.stringify(messages));
    return true;
}