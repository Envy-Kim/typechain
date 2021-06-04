interface Human {
	name: string
	age: number
	gender: string
}

const person = {
	name: "Kyoungsik",
	age: 27,
	gender: "male"
}

class Human2 {
	public name: string
	public age: number
	public gender: string
	
	constructor(name: string, age: number, gender: string) {
		this.name = name
		this.age = age
		this.gender = gender
	}
}

const envy = new Human2("Envy", 26, "male")

const sayHi = (person: Human): string => {
	return (`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`)
}

console.log(sayHi(person));
console.log(sayHi(envy));

export { }