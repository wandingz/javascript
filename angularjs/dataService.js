function now() {
    var currentdate = new Date();
    return currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + " "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
}

app.service("dataService", function ($timeout, $http, $q) {
    var user = new User(localStorage.getItem("currentUser"));
    if (user.isValid()) {
        this.user = user;
    } else {
        this.user = undefined;
    }
    this.auth = function () {
        var Q = $q.defer();
        if (this.user) {
            Q.resolve();
        } else {
            Q.reject('Not Authenticated');
        }
        return Q.promise;
    }

    this.registeredUsers = [];
    try {
        this.registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    } catch { }

    this.login = function (obj) {
        var Q = $q.defer();
        console.log(this.registeredUsers)
        var user = new User(this.registeredUsers.find(u => u.user === obj.user && u.pswd === obj.pswd));
        console.log(user)
        if (user.isValid()) {
            this.user = user;
            localStorage.setItem("currentUser", JSON.stringify(this.user.data));
            Q.resolve({
                status: 'success',
                data: user.data,
            });
        } else {
            Q.reject({
                status: 'falied',
                message: 'Incorrect username or password. Please try again. ',
            })
        }
        return Q.promise;
    };
    this.signup = function (obj) {
        var Q = $q.defer();
        var user = new User(obj);
        if (user.isValid()) {
            if (!this.registeredUsers.find(u => u.user === obj.user)) {
                this.registeredUsers.push(user.data);
                localStorage.setItem("registeredUsers", JSON.stringify(this.registeredUsers));
                this.user = user;
                localStorage.setItem("currentUser", JSON.stringify(this.user.data));
                Q.resolve({
                    status: 'success',
                    data: user.data,
                });
            } else {
                Q.reject({
                    status: 'falied',
                    message: 'Username already taken. Please choose another one',
                })
            }
        } else {
            Q.reject({
                status: 'falied',
                message: user.errors,
            })
        }
        return Q.promise;
    };
    this.logout = function (obj) {
        var Q = $q.defer();
        this.user = undefined;
        localStorage.removeItem("currentUser");
        Q.resolve({
            status: 'success',
        });
        return Q.promise;
    };
    this.getProfile = function (obj) {
        var Q = $q.defer();
        if (this.user) {
            Q.resolve({
                status: 'success',
                data: this.user.data,
            });
        } else {
            Q.reject({
                status: 'falied',
                message: 'Not logged in. ',
            })
        }
        return Q.promise;
    };
    this.setProfile = function (obj) {
        var Q = $q.defer();
        var userIndex = this.registeredUsers.findIndex(u => u.user === obj.user && u.pswd === obj.pswd);
        var userNew = new User(obj);
        if (!userNew.isValid()) {
            Q.reject({
                status: 'falied',
                message: userNew.errors,
            })
        } else if (userIndex >= 0) {
            this.registeredUsers[userIndex] = userNew.data;
            localStorage.setItem("registeredUsers", JSON.stringify(this.registeredUsers));
            this.user = userNew;
            localStorage.setItem("currentUser", JSON.stringify(this.user.data));
            Q.resolve({
                status: 'success',
                data: this.user.data,
            });
        } else {
            Q.reject({
                status: 'falied',
                message: 'Not logged in. ',
            })
        }
        return Q.promise;
    };

    var testMessageList = [];
    this.messages = [];
    try {
        this.messages = JSON.parse(localStorage.getItem("messages")) || testMessageList;
    } catch { }

    this.getMessageList = function (obj) {
        var Q = $q.defer();

        if (this.user && this.user.isValid()) {
            var user = this.user.data.user;
            Q.resolve({
                status: 'success',
                data: this.messages.filter(m => m.sender === user || m.recipient === user).filter(m => !m.deleted),
            })
        } else {
            Q.reject({
                status: 'failed',
                message: 'Not logged in. ',
            })
        }

        return Q.promise;
    };
    this.getMessageDetail = function (obj) {
        var Q = $q.defer();

        var index = obj.index;
        if (this.user && this.user.isValid()) {
            var user = this.user.data.user;
            var message = this.messages
                .filter(m => m.sender === user || m.recipient === user)
                .filter(m => !m.deleted)
                .find(m => m.index == index);
        }

        if (message) {
            Q.resolve({
                status: 'success',
                data: message,
            })
        } else {
            Q.reject({
                status: 'failed',
                message: 'Cannot find request message. Try login again. ',
            })
        }

        return Q.promise;
    };
    this.messageImportant = function (obj) {
        var Q = $q.defer();

        var index = obj.index;
        if (this.user && this.user.isValid()) {
            var user = this.user.data.user;
            var message = this.messages
                .filter(m => m.recipient === user)
                .find(m => m.index == index);
            message.important = "1";
            localStorage.setItem("messages", JSON.stringify(this.messages));
        }

        if (message) {
            Q.resolve({
                status: 'success',
                data: message,
            })
        } else {
            Q.reject({
                status: 'failed',
                message: 'Cannot find request message. Try login again. ',
            })
        }

        return Q.promise;
    };
    this.messageReply = function (obj) {
        var Q = $q.defer();

        if (this.user && this.user.isValid()) {
            var user = this.user.data.user;
            var message = {
                "index": this.messages.length,
                "recipient": obj.recipient,
                "recipient_img": "http://simpleicon.com/wp-content/uploads/user1.png",
                "sender": user,
                "sender_img": "http://simpleicon.com/wp-content/uploads/user1.png",
                "title": obj.title,
                "description": obj.description,
                "created_at": now(),
                "important": "0"
            };
            this.messages.push(message);
            localStorage.setItem("messages", JSON.stringify(this.messages));
        }

        if (message) {
            Q.resolve({
                status: 'success',
                data: message,
            })
        } else {
            Q.reject({
                status: 'failed',
                message: 'Not logged in. ',
            })
        }
        return Q.promise;
    };
    this.messageDeleted = function (obj) {
        var Q = $q.defer();

        var index = obj.index;
        if (this.user && this.user.isValid()) {
            var user = this.user.data.user;
            var message = this.messages
                .filter(m => m.recipient === user)
                .find(m => m.index == index);
            message.deleted = true;
            localStorage.setItem("messages", JSON.stringify(this.messages));
        }

        if (message) {
            Q.resolve({
                status: 'success',
            })
        } else {
            Q.reject({
                status: 'failed',
                message: 'Cannot find request message. Try login again. ',
            })
        }

        return Q.promise;
    };
});
