app.controller("messageDetail", function ($scope, $location, dataService, $routeParams) {
    $scope.messageList = [];
    $scope.formReply = {}
    
    $scope.loading = 'get';
    dataService.getMessageDetail({index: $routeParams.index}).then(d => {
        $scope.messageList.push(d.data);
        $scope.selfMessage = d.data.recipient === dataService.user.data.user;
        $scope.formReply.recipient = d.data.sender;
        $scope.formReply.title = "Re: " + d.data.title;
    }).catch(err => {
        $scope.error_message = err;
    }).finally(() => {
        $scope.loading = undefined;
    });

    $scope.messageReply = function() {
        $scope.loading = 'reply';
        console.log('asdf');
        dataService.messageReply($scope.formReply).then(d => {
            console.log('a', d);
            $scope.messageList.push(d.data);
            console.log($scope.messageList);
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }

    $scope.messageImportant = function() {
        $scope.loading = 'important';
        dataService.messageImportant({index: $routeParams.index}).then(d => {
            $scope.messageList[0].important = d.data.important;
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }

    $scope.messageDeleted = function() {
        $scope.loading = 'delete';        
        dataService.messageDeleted({index: $routeParams.index}).then(d => {
            $location.path('messageList');
        }).catch(err => {
            $scope.error_message = err;
        }).finally(() => {
            $scope.loading = undefined;
        });
    }
});

