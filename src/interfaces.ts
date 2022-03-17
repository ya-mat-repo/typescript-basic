// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

interface Named {
  readonly name: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;
  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

// let user1: Person;
let user1 = new Person("Max");

// user1 = {
//   name: "Max",
//   age: 30,
//   greet(phrase) {
//     console.log(phrase + " " + this.name);
//   }
// };

user1.greet("Hello, I am");
