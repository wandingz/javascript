function now() {
    var currentdate = new Date();
    return currentdate.getFullYear() + '-' + currentdate.getMonth() + '-' + currentdate.getDay() + " "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}

app.service("dataService", function ($timeout, $http, $q) {
    var user = new User(localStorage.getItem("currentUser"));
    if (user.isValid()) {
        this.user = user;
    } else {
        this.user = undefined;
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

    var testMessageList = [
        {
            "recipient":"zhaoyi",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"User 2",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to User 1 to zhaoyi.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        },{
            "recipient":"User 1",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"User 2",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message from User 2 to User 1.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        },{
            "recipient":"User 2",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"zhaoyi",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message from zhaoyi to User 2.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        }
    ];
    this.messages = [];
    try {
        this.messages = JSON.parse(localStorage.getItem("messages")) || testMessageList;
    } catch { }

    this.getMessageList = function (obj) {
        var Q = $q.defer();
        if(this.user && this.user.isValid()) {
            var user = this.user.data.user;
            Q.resolve({
                status: 'success',
                data: this.messages.filter(m => m.sender === user || m.recipient === user),
            })
        }else {
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
        if(this.user && this.user.isValid()) {
            var user = this.user.data.user;
            Q.resolve({
                status: 'success',
                data: this.messages.filter(m => m.sender === user || m.recipient === user)[index],
            })
        }else {
            Q.reject({
                status: 'failed',
                message: 'Not logged in. ',
            })
        }
        return Q.promise;
    };
    this.messageImportant = function (obj) {
        var Q = $q.defer();
        var index = obj.index;
        if(this.user && this.user.isValid()) {
            var user = this.user.data.user;
            var message = this.messages.filter(m => m.sender === user || m.recipient === user)[index];
            message.important = "1";
            localStorage.setItem("messages", JSON.stringify(this.messages));
            Q.resolve({
                status: 'success',
                data: message,
            })
        }else {
            Q.reject({
                status: 'failed',
                message: 'Not logged in. ',
            })
        }
        return Q.promise;
    };
    this.messageReply = function (obj) {
        var Q = $q.defer();
        if(this.user && this.user.isValid()) {
            var user = this.user.data.user;
            var message = {
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
            Q.resolve({
                status: 'success',
                data: message,
            })
        }else {
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
        if(this.user && this.user.isValid()) {
            var user = this.user.data.user;
            this.messages.filter(m => m.sender === user || m.recipient === user).splice(index, 1);
            localStorage.setItem("messages", JSON.stringify(this.messages));
            Q.resolve({
                status: 'success',
            })
        }else {
            Q.reject({
                status: 'failed',
                message: 'Not logged in. ',
            })
        }
        return Q.promise;
    };
});
