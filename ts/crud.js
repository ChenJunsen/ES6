var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.action = function () {
            console.log(_this.name + '会跑，汪汪叫！');
        };
        return _this;
    }
    return Dog;
}(Animal));
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.action = function () {
            console.log(_this.name + '会飞，叽叽喳喳!');
        };
        return _this;
    }
    return Bird;
}(Animal));
var AnimalCRUB = /** @class */ (function () {
    function AnimalCRUB() {
        this.data = [];
    }
    AnimalCRUB.prototype.create = function (obj) {
        this.data.push(obj);
        return obj;
    };
    AnimalCRUB.prototype.delete = function (name) {
        var index = -1;
        var delObj = undefined;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].name === name) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            delObj = this.data.splice(index, 1)[0];
        }
        return delObj;
    };
    AnimalCRUB.prototype.read = function (_name) {
        // @ts-ignore
        return this.data.find(function (_a) {
            var name = _a.name;
            return name === _name;
        });
    };
    AnimalCRUB.prototype.update = function (obj) {
        // 暂时不实现
        return undefined;
    };
    return AnimalCRUB;
}());
var crub = new AnimalCRUB();
crub.create(new Dog('旺财', 5));
crub.create(new Dog('小黄', 7));
crub.create(new Bird('鹦鹉', 2));
console.log(crub.data);
console.log(crub.read('旺财'));
crub.delete('小黄');
console.log(crub.data);
//# sourceMappingURL=crud.js.map