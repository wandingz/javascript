// localStorage = window.localStorage;

var form_Attrs = ['name', 'pswd', 'first_name', 'last_name', 'email', 'gender', 'location'];

function appendtable(User) {
    var tr = document.createElement("tr");
    form_Attrs.forEach(a => {
        var td = document.createElement("td");
        td.textContent = User[a];
        tr.appendChild(td);
    });
    document.getElementById('myTable').appendChild(tr);
}

try {
    var data = JSON.parse(localStorage.getItem('data') || "[]");
}catch {
    var data = [];
}
data.forEach(d => appendtable(d));

document.getElementById("myForm").addEventListener("submit", formSubmit);

var validText = {}

function showValidation(attr, v) {
    if (!v && !validText[attr]) {
        validText[attr] = true;

        var parent = document.getElementById(attr);

        var p = document.createElement("div");
        p.id = "invalid_" + attr;
        p.setAttribute('style', "color: red; ");
        p.textContent = "The field " + attr + " is not valid. ";

        parent.appendChild(p);
    }
    if (v) {
        validText[attr] = false;

        var dom = document.getElementById("invalid_" + attr);
        if (dom) dom.remove();
    }
}

function checkValidate(User) {
    var res = true;

    form_Attrs.forEach(a => {
        showValidation(a, User[a]);
        res = res && User[a];
    });

    var incl = ['male', 'female', 'other'].includes(User['gender']);
    showValidation('gender', incl);
    res = res && incl;

    // simplified RFC 2822 standard
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var recl = re.test(String(User['email'].toLowerCase()));
    showValidation('email', recl);
    res = res && recl;

    return res;
}

function formSubmit(event) {
    event.preventDefault();
    var User = form_Attrs.reduce((acc, val) => {
        acc[val] = event.currentTarget[val].value;
        return acc;
    }, {});
    if (checkValidate(User)) {
        data.push(User);
        localStorage.setItem('data', JSON.stringify(data));
        appendtable(User);
    }
}
