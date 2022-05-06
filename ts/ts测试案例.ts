class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    get desc() {
        return `我叫${this.name},今年${this.age}岁`
    }

    set desc(name: string) {
        this.name = name
    }

    show() {
        console.log(`name:${this.name} age:${this.age}`)
    }
}

const p = new Person('张三', 14)
p.show()
p.desc = '小明'
console.log(p.desc)
