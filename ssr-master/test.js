class A {
    constructor(value) {
        this.value = value;
    }
    getName() {
        return 'A';
    }
}

class B extends A {
    constructor(value) {
        super(value);
        this.value += " from B";
    }
    getName() {
        return "B";
    }
}

var b = new B();