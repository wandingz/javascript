class DataObject {

    constructor(data, params_custom_rules, custom_rule) {
        this.custom_rule = function (data) { return true };
        this.params_custom_rules = {};
        this.valid = true;
        this.errors = [];

        this.data = data;
        if (params_custom_rules) {
            this.params_custom_rules = params_custom_rules;
        }
        if (custom_rule) {
            this.custom_rule = custom_rule;
        }

        if (this.data === null || typeof (this.data) !== "object") {
            this.errors.push("Type Error: 'data' is not an object. ");
            this.valid = false;
            return;
        }

        var res = this.custom_rule(this.data);
        if (res !== true) {
            this.errors.push("Failed custom rule: 'data'. Details are as follows. ");
            this.errors.push(res);
            this.valid = false;
            return;
        }

        for (var key in this.params_custom_rules) {
            res = this.params_custom_rules[key](this.data[key]);
            if (res !== true) {
                this.errors.push({ [key]: res });
                this.valid = false;
            }
        }
    }

    isValid() {
        return this.valid;
    }
}

class User extends DataObject {
    constructor(param) {
        var params_custom_rules = {
            user: function (v) {
                return !!v;
            },
            pswd: function (v) {
                return !!v;
            },
            first_name: function (v) {
                return !!v;
            },
            last_name: function (v) {
                return !!v;
            },
            email: function (v) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return v && re.test(String(v.toLowerCase()));
            },
            phone: function (v) {
                return !!v;
            },
            location: function (v) {
                return !!v;
            },
        };
        if (typeof (param) === 'string') {
            try {
                param = JSON.parse(param);
            } catch {
                param = undefined;
            }
        }
        super(param, params_custom_rules);
    }
}