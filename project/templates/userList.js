app.controller("userList", function ($scope, dataService) {
    $scope.allTypes = [
        { name: 'All', value: '' },
        { name: 'Admin', value: 'Admin' },
        { name: 'Manager', value: 'Manager' },
        { name: 'Consultant', value: 'Consultant' }
    ];

    $scope.userList = [];

    $scope.form = {
        gender: '',
        type: '',
    };
    $scope.filter = function (message) {
        for (var key in $scope.form) if ($scope.form.hasOwnProperty(key)) {
            if ($scope.form[key] && !message[key].includes($scope.form[key])) {
                return false;
            }
        }
        return true;
    }

    dataService.getUserList().then(d => {
        $scope.userList = d.data;
    }).catch(err => {
        $scope.error_message = err;
    });

    $scope.delete = function (index) {
        dataService.deleteUser({ index: index }).then(d => {
            $scope.userList = d.data;
        }).catch(err => {
            $scope.error_message = err;
        });
    }


});

