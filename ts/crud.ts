abstract class Animal {
    name: string
    age: number
    abstract action: () => void

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

class Dog extends Animal {
    action = (): void => {
        console.log(this.name + '会跑，汪汪叫！')
    }
}

class Bird extends Animal {
    action = (): void => {
        console.log(this.name + '会飞，叽叽喳喳!')
    }
}

interface CRUD<T> {
    create: (obj: T) => T
    read: (name: string) => T
    update: (obj: T) => T
    delete: (name: string) => T
}

class AnimalCRUB implements CRUD<Animal> {
    data: Array<Animal> = []

    create(obj: Animal): Animal {
        this.data.push(obj)
        return obj;
    }

    delete(name: string): Animal {
        let index: number = -1
        let delObj: Animal = undefined
        for (let i: number = 0; i < this.data.length; i++) {
            if (this.data[i].name === name) {
                index = i
                break
            }
        }
        if (index > -1) {
            delObj = this.data.splice(index, 1)[0]
        }
        return delObj;
    }

    read(_name: string): Animal {
        // @ts-ignore
        return this.data.find(({name}) => name === _name);
    }

    update(obj: Animal): Animal {
        // 暂时不实现
        return undefined;
    }

}

const crub: AnimalCRUB = new AnimalCRUB()
crub.create(new Dog('旺财', 5))
crub.create(new Dog('小黄', 7))
crub.create(new Bird('鹦鹉', 2))

console.log(crub.data)

console.log(crub.read('旺财'))

crub.delete('小黄')

console.log(crub.data)


