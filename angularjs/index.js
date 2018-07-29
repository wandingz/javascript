var app = angular.module('myapp', ["ngRoute"]);
var localStorage = window.localStorage;

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html",
            controller: "home"
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
            controller: "messageList"
        })
        .when("/messageDetail/:index", {
            templateUrl: "templates/messageDetail.html",
            controller: "messageDetail"
        });
});

// app.factory("dataService2", function ($timeout, $http) {
//     return {
//         user: undefined,
//         login: function(user, pswd) {

//         }
//     }
// });

app.service("dataService", function ($timeout, $http) {
    this.user = {};
    this.login = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
            });
        });
    };
    this.signup = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
            });
        });
    };
    this.getProfile = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
                data: {},
            });
        });
    };
    this.setProfile = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
            });
        });
    };
    this.getMessageList = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
                data: [{
                    "recipient": "User 1",
                    "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
                    "sender": "User 2",
                    "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
                    "title": "This is a sample message to User 1.",
                    "description": "This is a sample description to the message which has the above title",
                    "created_at": "2017-01-19 09:45:00",
                    "important": "0"
                }]
            });
        });
    };
    this.getMessageDetail = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
                data: {
                    "recipient": "User 1",
                    "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
                    "sender": "User 2",
                    "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
                    "title": "This is a sample message to User 1.",
                    "description": "This is a sample description to the message which has the above title",
                    "created_at": "2017-01-19 09:45:00",
                    "important": "0"
                },
            });
        });
    };
    this.messageImportant = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
                data: {
                    important: '1',
                },
            });
        });
    };
    this.messageReply = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
                data: {},
            });
        });
    };
    this.messageDeleted = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
                data: {},
            });
        });
    };
    this.logout = function (obj) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 'success',
            });
        });
    };
});

app.controller("login", function ($scope, dataService) {
    dataService
});

