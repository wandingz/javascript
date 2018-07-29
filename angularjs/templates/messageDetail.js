app.controller("messageDetail", function ($scope, $location, dataService, $routeParams) {
    $scope.messageList = [];
    
    dataService.getMessageDetail({index: $routeParams}).then(d => {
        $scope.messageList.push(d.data);
    }).catch(err => {
        $scope.error_message = err;
    });

    $scope.messageReply = function() {
        dataService.messageReply($scope.formReply).then(d => {
            $scope.messageList.push(d.data);
        }).catch(err => {
            $scope.error_message = err;
        });
    }

    $scope.messageImportant = function() {
        $scope.oldImportant = $scope.messageList[0].important;
        $scope.messageList[0].important = "1";
        dataService.messageImportant($scope.form).then(d => {
            $scope.messageList[0].important = d.data.important;
        }).catch(err => {
            $scope.messageList[0].important = $scope.oldImportant;
            $scope.error_message = err;
        });
    }

    $scope.messageDeleted = function() {
        dataService.messageDeleted($scope.form).then(d => {
            $location.path('messageList');
        }).catch(err => {
            $scope.error_message = err;
        });
    }
});

