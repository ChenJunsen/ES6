/**
 * 测试类
 */
class A {
    prop1: number
    prop2: string

    /**
     * 构造函数
     * @param prop1 属性1
     * @param prop2 属性2
     */
    constructor(prop1: number, prop2?: string) {
        this.prop1 = prop1
        this.prop2 = prop2
    }

    tostring() {
        return `[prop1:${this.prop1},prop2:${this.prop2}]`
    }
}

const a: A = new A(123)
const b: A = new A(123, 'dd')

console.log(a.tostring())
console.log(b + '')

const list: Array<number> = [12, 44, 567, -1, 89]
console.log(list.find((val) => val === 12))
