// function Logger(logString: string) {
//   return (constructor: Function) => {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// function WithTemplate(template: string, hookId: string) {
//   console.log("TEMPLATE ファクトリ");
//   return <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: any
//   ) => {
//     return class extends originalConstructor {
//       constructor(..._: any[]) {
//         super();
//         console.log("テンプレートを表示");
//         const hookEl = document.querySelector(hookId);
//         if (hookEl) {
//           hookEl.innerHTML = template;
//           hookEl.querySelector("h1")!.textContent = this.name;
//         }
//       }
//     };
//   };
// }

// // デコレーターはJavascriptがクラスの定義を見つけたタイミングで実行される
// // @Logger("ログ出力中 - Person")
// @WithTemplate("<h1>This is Person object!</h1>", "#app")
// class Person {
//   name = "Max";

//   constructor() {
//     console.log("Personオブジェクトを作成中...");
//   }
// }

// const pers = new Person();

// console.log(pers);

// // ---

// function Log(target: any, propertyName: string | Symbol) {
//   console.log("Property デコレータ");
//   console.log(target, propertyName);
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor デコレータ");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log3(
//   target: any,
//   name: string | Symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log("Method デコレータ");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log("Parameter デコレータ");
//   console.log(target);
//   console.log(name);
//   console.log(position);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error("不正な価格です - 0以下は設定できません");
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this.price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // このthisはAutobindデコレーターを付与したオブジェクトを参照する
      // このthisはイベントリスナーによって変更はされない
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = "クリックしました！";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button");
button?.addEventListener("click", p.showMessage);

interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[];
  };
}

const registerdValidators: ValidatorConfig = [];

function Required(target: any, propName: string) {
  registerdValidators[target.constructor.name] = {
    ...registerdValidators[target.constructor.name],
    [propName]: ["required"]
  };
}

function PositiveNumber(target: any, propName: string) {
  registerdValidators[target.constructor.name] = {
    ...registerdValidators[target.constructor.name],
    [propName]: ["positive"]
  };
}

function validate(obj: any) {
  const objValidatorConfig = registerdValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log("prop: ", prop);
    for (const validator of objValidatorConfig[prop]) {
      console.log("validator: ", validator);
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  // 先頭に + をつけることでnumber型に型キャストしている
  const price = +priceEl.value;

  const createCourse = new Course(title, price);

  if (!validate(createCourse)) {
    alert("正しく入力してください！");
    return;
  }
  console.log(createCourse);
});
