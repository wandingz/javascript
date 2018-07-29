var app = angular.module('myapp', []);
var localStorage = window.localStorage;

app.factory("dataService", function ($timeout, $http) {
    var data = JSON.parse(localStorage.getItem('data'));
    
    if (!data || !data.posts) {
        data = {
            loaded: "loading",
        };

        var promisePosts = $http.get("https://jsonplaceholder.typicode.com/posts");
        var promiseComments = $http.get("https://jsonplaceholder.typicode.com/comments");
        var promiseUsers = $http.get("https://jsonplaceholder.typicode.com/users");
        Promise.all([promisePosts, promiseComments, promiseUsers]).then(value => {
            data.loaded = "rendering";
            
            data.posts = value[0].data;
            data.posts.forEach(p => {
                p.comments = [];
                p.user = undefined;
                // p.showComments = {'display':'none'};
            });

            data.comments = value[1].data;
            data.comments.forEach(c => {
                data.posts.filter(p => p.id === c.postId).forEach(p => {
                    p.comments.push(c);
                });
            });

            data.user = value[2].data;
            data.comments.forEach(u => {
                data.posts.filter(p => p.userId === u.id).forEach(p => {
                    p.user = u;
                });
            });

            localStorage.setItem('data', JSON.stringify(data));            
            data.loaded = "finished";
        }).catch(error => {
            console.log(error);
            data.loaded = "failed";
        });
    }

    return data;
});

app.factory("dataService2", function ($timeout, $http) {
    var data = {};

    $timeout(() => {
        data.loaded = "finished"
    }, 3000);

    return data;
});

app.controller("FirstCtrl", function ($scope, dataService, dataService2) {
    $scope.data = dataService;
    $scope.addTag = function (elem, tag, val) {
        elem[tag] = (val ? val : true);
        localStorage.setItem('data', JSON.stringify($scope.data));
    }
    $scope.editing = {};
    $scope.editPost = function (post) {
        $scope.editing.post = {
            userId: post.userId,
            title: post.title,
            body: post.body,
            submit: function () {
                post.userId = $scope.editing.post.userId;
                post.title = $scope.editing.post.title;
                post.body = $scope.editing.post.body;

                $scope.edit_finish();
            },
        };
    }
    $scope.createPost = function () {
        $scope.editing.post = {
            userId: '',
            title: '',
            body: '',
            submit: function () {
                var post = {
                    id: $scope.data.posts.length + 1,
                    userId: $scope.editing.post.userId,
                    title: $scope.editing.post.title,
                    body: $scope.editing.post.body,
                    user: $scope.data.users.filter(u => post.userId === u.id)[0],
                    comments: [],
                };

                $scope.data.posts.push(post);

                $scope.edit_finish();
            },
        };
    }
    $scope.createComments = function (post) {
        $scope.editing.comment = {
            name: '',
            email: '',
            body: '',
            submit: function () {
                var comment = {
                    postId: post.id,
                    id: $scope.data.comments.length + 1,
                    name: $scope.editing.comment.name,
                    email: $scope.editing.comment.email,
                    body: $scope.editing.comment.body,
                };

                post.comments.push(comment);
                $scope.data.comments.push(comment);

                $scope.edit_finish();
            },
        };
    }
    $scope.edit_finish = function () {
        localStorage.setItem('data', JSON.stringify($scope.data));
        $scope.editing.post = undefined;
        $scope.editing.comment = undefined;
    };
    $scope.edit_cancel = function () {
        $scope.editing.post = undefined;
        $scope.editing.comment = undefined;
    }
});
