/**
 * 测试类
 */
var A = /** @class */ (function () {
    /**
     * 构造函数
     * @param prop1 属性1
     * @param prop2 属性2
     */
    function A(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
    A.prototype.tostring = function () {
        return "[prop1:".concat(this.prop1, ",prop2:").concat(this.prop2, "]");
    };
    return A;
}());
var a = new A(123);
var b = new A(123, 'dd');
console.log(a.tostring());
console.log(b + '');
var list = [12, 44, 567, -1, 89];
console.log(list.find(function (val) { return val === 12; }));
//# sourceMappingURL=xiaohua.js.map