// parmeter 뒤의 ?는 해당 parameter가 optional 하다는 걸 알려준다.
const sayHi = (name: string, age: number, gender?: string): string => {
	return (`Hello ${name}, you are ${age}, you are a ${gender}`);
}

console.log(sayHi("envy", 27, "male"));

export { };