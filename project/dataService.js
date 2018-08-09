
app.service("dataService", function ($q) {
    this.validUser = function (obj) {
        var msg = [];
        if (!obj.username) {
            msg.push({ err: 'Missing required field', field: 'username' })
        }
        if (!obj.password) {
            msg.push({ err: 'Missing required field', field: 'password' })
        }
        if (!obj.email) {
            msg.push({ err: 'Missing required field', field: 'email' })
        }
        if (!obj.type || !['Admin', 'Manager', 'Consultant'].includes(obj.type)) {
            msg.push({ err: 'Missing or wrong in required field', field: 'type' })
        }
        if (!obj.gender || !['Male', "Female", 'Other'].includes(obj.gender)) {
            msg.push({ err: 'Missing or wrong in required field', field: 'gender' })
        }
        if (!obj.location) {
            msg.push({ err: 'Missing required field', field: 'location' })
        }
        if (msg.length > 0) {
            return msg;
        } else {
            return false;
        }
    }
    this.addUser = function (obj) {
        var defer = $q.defer();
        var list = localStorage.getItem('userList');
        if (list) {
            try {
                list = JSON.parse(list);
            } catch { }
        }
        if (!list) {
            list = [];
        }
        var msg = this.validUser(obj);
        if (msg) {
            defer.reject(msg);
        } else {
            list.push(obj);
            localStorage.setItem('userList', JSON.stringify(list));
            defer.resolve();
        }
        return defer.promise;
    }
    this.getUserList = function (filter) {
        var defer = $q.defer();
        var list = JSON.parse(localStorage.getItem('userList'));
        if (!list) {
            list = []
        }
        defer.resolve({ data: list });
        return defer.promise;
    }
    this.deleteUser = function (obj) {
        var index = obj.index;
        var defer = $q.defer();
        var list = JSON.parse(localStorage.getItem('userList'));
        list.splice(index, 1);
        localStorage.setItem('userList', JSON.stringify(list));
        defer.resolve({ data: list });
        return defer.promise;
    }
});
