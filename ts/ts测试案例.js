var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Object.defineProperty(Person.prototype, "desc", {
        get: function () {
            return "\u6211\u53EB".concat(this.name, ",\u4ECA\u5E74").concat(this.age, "\u5C81");
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Person.prototype.show = function () {
        console.log("name:".concat(this.name, " age:").concat(this.age));
    };
    return Person;
}());
var p = new Person('张三', 14);
p.show();
p.desc = '小明';
console.log(p.desc);
//# sourceMappingURL=ts%E6%B5%8B%E8%AF%95%E6%A1%88%E4%BE%8B.js.map