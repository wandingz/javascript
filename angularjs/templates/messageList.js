app.controller("messageList", function ($scope, $location, dataService) {
    $scope.messageList = [];
    
    dataService.getMessageList().then(d => {
        $scope.messageList = d.data;
    }).catch(err => {
        $scope.error_message = err;
    });

});

